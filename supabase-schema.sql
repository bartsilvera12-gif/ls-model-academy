-- =====================================================================
-- LS Model Management — esquema de Supabase
--
-- Ejecutar UNA vez en: Supabase → SQL Editor → New query → Run
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. POSTULACIONES (quien quiere ser modelo)
-- ---------------------------------------------------------------------
create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  estado      text not null default 'nueva'
              check (estado in ('nueva','en_revision','aceptada','descartada')),
  nombre      text not null,
  edad        int,
  ciudad      text,
  whatsapp    text,
  email       text,
  instagram   text,
  altura      text,
  experiencia text,
  categoria   text,
  presentacion text,
  fotos       text[] default '{}',   -- rutas dentro del bucket 'postulaciones'
  -- Menores de edad: la ley exige autorizacion del tutor
  tutor       text,
  tutor_wa    text,
  tutor_auth  boolean default false,
  notas       text                    -- uso interno del equipo
);

-- ---------------------------------------------------------------------
-- 2. SOLICITUDES DE EMPRESAS
-- ---------------------------------------------------------------------
create table if not exists public.event_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  estado      text not null default 'nueva'
              check (estado in ('nueva','en_revision','cerrada','descartada')),
  empresa     text not null,
  responsable text,
  whatsapp    text,
  email       text,
  tipo        text,
  ciudad      text,
  fecha       date,
  horario     text,
  cantidad    int,
  perfil      text,
  presupuesto text,
  extra       text,
  modelo      text,                   -- si pidieron una modelo puntual
  notas       text
);

-- ---------------------------------------------------------------------
-- 3. MODELOS PUBLICADAS EN EL SITIO
-- ---------------------------------------------------------------------
create table if not exists public.models (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  edad        int,
  altura      text,
  busto       int,
  cintura     int,
  cadera      int,
  calce       text,
  vestido     text,
  pantalon    text,
  ciudad      text,
  cover       text,                   -- URL publica de la portada
  cover_pos   text default 'center 20%',
  fotos       text[] default '{}',    -- URLs publicas de la galeria, en el orden
                                     -- que define el panel: primero el book
                                     -- profesional, despues los trabajos nuevos
  orden       int  default 100,
  -- Bloque del sitio en el que aparece, cada uno se muestra por separado:
  --   staff    = staff profesional de la agencia
  --   newface  = caras nuevas del casting de LS Model Academy
  --   scouting = scouting y postulaciones recibidas desde la web
  segmento    text not null default 'staff',
  publicada   boolean default true
);

-- La columna y su restriccion se declaran aparte para que este archivo
-- se pueda volver a ejecutar sobre una base ya creada sin dar error.
alter table public.models add column if not exists segmento text not null default 'staff';
alter table public.models drop constraint if exists models_segmento_chk;
alter table public.models add constraint models_segmento_chk
  check (segmento in ('staff','newface','scouting'));

create index if not exists models_orden_idx on public.models (publicada, segmento, orden, nombre);
create index if not exists applications_fecha_idx on public.applications (created_at desc);
create index if not exists event_requests_fecha_idx on public.event_requests (created_at desc);

-- =====================================================================
-- SEGURIDAD (Row Level Security)
--
-- Sin esto, la clave anonima del sitio permitiria a cualquiera leer
-- todas las postulaciones. Se activa en las tres tablas.
-- =====================================================================
alter table public.applications   enable row level security;
alter table public.event_requests enable row level security;
alter table public.models         enable row level security;

-- Postulaciones: cualquiera puede ENVIAR, solo el equipo puede LEER
drop policy if exists "enviar postulacion" on public.applications;
create policy "enviar postulacion" on public.applications
  for insert to anon, authenticated with check (true);

drop policy if exists "equipo lee postulaciones" on public.applications;
create policy "equipo lee postulaciones" on public.applications
  for select to authenticated using (true);

drop policy if exists "equipo edita postulaciones" on public.applications;
create policy "equipo edita postulaciones" on public.applications
  for update to authenticated using (true) with check (true);

drop policy if exists "equipo borra postulaciones" on public.applications;
create policy "equipo borra postulaciones" on public.applications
  for delete to authenticated using (true);

-- Solicitudes de empresas: mismo criterio
drop policy if exists "enviar solicitud" on public.event_requests;
create policy "enviar solicitud" on public.event_requests
  for insert to anon, authenticated with check (true);

drop policy if exists "equipo lee solicitudes" on public.event_requests;
create policy "equipo lee solicitudes" on public.event_requests
  for select to authenticated using (true);

drop policy if exists "equipo edita solicitudes" on public.event_requests;
create policy "equipo edita solicitudes" on public.event_requests
  for update to authenticated using (true) with check (true);

drop policy if exists "equipo borra solicitudes" on public.event_requests;
create policy "equipo borra solicitudes" on public.event_requests
  for delete to authenticated using (true);

-- Modelos: el sitio publico lee solo las publicadas; el equipo hace todo
drop policy if exists "publico ve modelos publicadas" on public.models;
create policy "publico ve modelos publicadas" on public.models
  for select to anon using (publicada = true);

drop policy if exists "equipo ve todas las modelos" on public.models;
create policy "equipo ve todas las modelos" on public.models
  for select to authenticated using (true);

drop policy if exists "equipo administra modelos" on public.models;
create policy "equipo administra modelos" on public.models
  for all to authenticated using (true) with check (true);

-- =====================================================================
-- ALMACENAMIENTO DE FOTOS
-- =====================================================================
-- 'postulaciones' es PRIVADO: son fotos de personas que todavia no
-- forman parte de la agencia, y muchas veces de menores de edad.
insert into storage.buckets (id, name, public)
values ('postulaciones', 'postulaciones', false)
on conflict (id) do nothing;

-- 'modelos' es publico: son las fotos que se muestran en el sitio.
insert into storage.buckets (id, name, public)
values ('modelos', 'modelos', true)
on conflict (id) do nothing;

drop policy if exists "subir fotos de postulacion" on storage.objects;
create policy "subir fotos de postulacion" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'postulaciones');

drop policy if exists "equipo ve fotos de postulacion" on storage.objects;
create policy "equipo ve fotos de postulacion" on storage.objects
  for select to authenticated using (bucket_id = 'postulaciones');

drop policy if exists "equipo borra fotos de postulacion" on storage.objects;
create policy "equipo borra fotos de postulacion" on storage.objects
  for delete to authenticated using (bucket_id = 'postulaciones');

drop policy if exists "publico ve fotos de modelos" on storage.objects;
create policy "publico ve fotos de modelos" on storage.objects
  for select to anon, authenticated using (bucket_id = 'modelos');

drop policy if exists "equipo administra fotos de modelos" on storage.objects;
create policy "equipo administra fotos de modelos" on storage.objects
  for all to authenticated
  using (bucket_id = 'modelos') with check (bucket_id = 'modelos');

-- =====================================================================
-- DESPUES DE EJECUTAR ESTO:
--
-- 1. Authentication → Providers → Email: desactivar "Enable email
--    signups". Asi nadie puede crearse un usuario y entrar al panel.
-- 2. Authentication → Users → Add user: crear la cuenta del equipo
--    a mano, con su correo y contrasenia.
-- 3. Copiar Project URL y anon key en supabase-config.js
-- =====================================================================
