-- =====================================================================
-- IS Model Management — Migracion 03: datos de contacto editables
-- =====================================================================
--
-- El numero de WhatsApp, el correo y el Instagram estaban escritos
-- dentro del HTML. Cambiar cualquiera de los tres obligaba a tocar el
-- codigo y volver a publicar el sitio.
--
-- Esta tabla los saca del codigo y los pone en el panel.
--
-- Ejecutar en: Supabase -> SQL Editor -> New query -> Run
-- Es seguro volver a ejecutarlo.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. La tabla
-- ---------------------------------------------------------------------
-- Una sola fila, siempre id = 1. El check lo garantiza: sin el, un
-- insert distraido crearia una segunda fila y el sitio mostraria una u
-- otra segun el orden en que la base las devuelva.
create table if not exists ismodel.ajustes (
  id smallint primary key default 1,

  -- Solo digitos y en formato internacional, que es lo que exige
  -- wa.me: 595973411125, no 0973411125 ni +595 973 411125.
  whatsapp        text,
  -- Como se muestra escrito en el sitio: 0973 411 125.
  whatsapp_label  text,

  email           text,
  -- Sin la arroba: se agrega al mostrarlo.
  instagram       text,
  -- Donde trabaja la agencia. Aparece junto a los datos de contacto.
  cobertura       text,

  actualizado_en  timestamptz not null default now(),

  constraint ajustes_fila_unica check (id = 1)
);


-- ---------------------------------------------------------------------
-- 2. Los valores que hoy estan escritos en el codigo
-- ---------------------------------------------------------------------
-- do nothing: si la fila ya existe, esto no pisa lo que el equipo haya
-- cargado desde el panel.
insert into ismodel.ajustes
  (id, whatsapp, whatsapp_label, email, instagram, cobertura)
values
  (1, '595973411125', '0973 411 125',
   'contacto@lsmodelacademy.com', 'lsmodelacademy', 'Paraguay')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------
-- 3. Permisos
-- ---------------------------------------------------------------------
-- El sitio publico necesita LEER esta tabla: de ahi saca los enlaces de
-- contacto. Escribir, solo el equipo.
grant select                          on ismodel.ajustes to anon;
grant select, insert, update, delete  on ismodel.ajustes to authenticated;
grant all                             on ismodel.ajustes to service_role;

alter table ismodel.ajustes enable row level security;

drop policy if exists "publico ve los datos de contacto" on ismodel.ajustes;
create policy "publico ve los datos de contacto" on ismodel.ajustes
  for select to anon, authenticated using (true);

drop policy if exists "equipo edita los datos de contacto" on ismodel.ajustes;
create policy "equipo edita los datos de contacto" on ismodel.ajustes
  for all to authenticated using (true) with check (true);


-- ---------------------------------------------------------------------
-- 4. Comprobacion
-- ---------------------------------------------------------------------
-- Esperado: una fila, con los datos de arriba o con los que ya hubiera.
select * from ismodel.ajustes;


-- =====================================================================
-- DESPUES DE EJECUTAR ESTO:
--
-- Supabase cachea el listado de tablas. Si el panel dice que no
-- encuentra "ajustes", ejecutar:
--
--   notify pgrst, 'reload schema';
-- =====================================================================
