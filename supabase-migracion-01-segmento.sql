-- =====================================================================
-- LS Model Management - Migracion 01: segmentacion de modelos
-- =====================================================================
--
-- CUANDO USAR ESTE ARCHIVO
--   Solo si ya ejecutaste supabase-schema.sql antes y la tabla
--   public.models existe sin la columna "segmento".
--
--   Si todavia no creaste nada en Supabase, NO uses este archivo:
--   ejecuta supabase-schema.sql completo, que ya trae todo esto.
--
-- COMO EJECUTARLO
--   Supabase -> SQL Editor -> New query -> pegar todo -> Run.
--
-- Es seguro volver a ejecutarlo: no borra datos ni duplica nada.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. La columna nueva
-- ---------------------------------------------------------------------
-- Bloque del sitio en el que aparece cada modelo. Los tres se muestran
-- por separado y no se mezclan:
--   staff    = staff profesional de la agencia
--   newface  = caras nuevas del casting de LS Model Academy
--   scouting = scouting y postulaciones recibidas desde la web
--
-- El default 'staff' hace que las modelos que ya estan cargadas queden
-- en el staff profesional, que es donde estaban hasta ahora.
alter table public.models
  add column if not exists segmento text not null default 'staff';


-- ---------------------------------------------------------------------
-- 2. Los valores permitidos
-- ---------------------------------------------------------------------
-- Se borra primero por si la restriccion ya existia con menos valores
-- (por ejemplo sin 'scouting'), asi el archivo se puede reejecutar.
alter table public.models
  drop constraint if exists models_segmento_chk;

alter table public.models
  add constraint models_segmento_chk
  check (segmento in ('staff','newface','scouting'));


-- ---------------------------------------------------------------------
-- 3. Por las dudas: normalizar filas viejas
-- ---------------------------------------------------------------------
-- Si alguna fila quedo con un valor fuera de la lista, vuelve al staff.
update public.models
   set segmento = 'staff'
 where segmento is null
    or segmento not in ('staff','newface','scouting');


-- ---------------------------------------------------------------------
-- 4. El indice, ahora ordenando tambien por segmento
-- ---------------------------------------------------------------------
-- El sitio pide las modelos con order by segmento, orden, nombre.
drop index if exists public.models_orden_idx;
create index models_orden_idx
  on public.models (publicada, segmento, orden, nombre);


-- ---------------------------------------------------------------------
-- 5. Comprobacion
-- ---------------------------------------------------------------------
-- Deberia devolver una fila por segmento con la cantidad de modelos.
-- Si nunca cargaste modelos por el panel, no devuelve nada: es normal.
select segmento, count(*) as modelos
  from public.models
 group by segmento
 order by segmento;
