-- =====================================================================
-- LS Model Management — mover todo de "public" al schema propio "ls"
-- =====================================================================
--
-- CUANDO USAR ESTE ARCHIVO
--   Si ya ejecutaste una version anterior de supabase-schema.sql y las
--   tablas quedaron en "public".
--
--   Si tu proyecto de Supabase esta vacio, NO hace falta: ejecuta
--   directamente supabase-schema.sql, que ya crea todo en "ls".
--
-- COMO EJECUTARLO
--   1. Supabase → SQL Editor → New query → pegar todo → Run.
--   2. Despues ejecutar supabase-schema.sql completo. Ese archivo es
--      reejecutable y vuelve a dejar politicas, indices y permisos
--      donde corresponde, ya dentro de "ls".
--   3. Settings → API → Exposed schemas: agregar  ls
--
-- No borra datos: mueve las tablas con su contenido, sus indices y
-- sus politicas. Es seguro volver a ejecutarlo.
-- =====================================================================

create schema if not exists ls;


-- ---------------------------------------------------------------------
-- 1. Mover las tablas que hayan quedado en public
-- ---------------------------------------------------------------------
-- ALTER TABLE ... SET SCHEMA conserva las filas, la clave primaria, los
-- indices y las politicas RLS. Solo cambia de lugar.
--
-- Se mueve una por una y solo si existe en public y todavia no existe
-- en ls, para que el archivo se pueda correr dos veces sin romperse.
do $$
declare
  t text;
begin
  foreach t in array array['applications','event_requests','models']
  loop
    if exists (
         select 1 from pg_tables
          where schemaname = 'public' and tablename = t
       )
       and not exists (
         select 1 from pg_tables
          where schemaname = 'ls' and tablename = t
       )
    then
      execute format('alter table public.%I set schema ls', t);
      raise notice 'movida: public.% -> ls.%', t, t;

    elsif exists (
         select 1 from pg_tables
          where schemaname = 'public' and tablename = t
       )
    then
      -- Existe en los dos lados: no se toca nada, hay que revisarlo a mano.
      raise warning 'ATENCION: % existe en public Y en ls. No se movio. Revisar cual tiene los datos buenos.', t;

    else
      raise notice 'nada que mover para %', t;
    end if;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 2. Columna de segmento (por si venias de antes de la segmentacion)
-- ---------------------------------------------------------------------
alter table ls.models
  add column if not exists segmento text not null default 'staff';

alter table ls.models
  drop constraint if exists models_segmento_chk;

alter table ls.models
  add constraint models_segmento_chk
  check (segmento in ('staff','newface','scouting'));

update ls.models
   set segmento = 'staff'
 where segmento is null
    or segmento not in ('staff','newface','scouting');


-- ---------------------------------------------------------------------
-- 3. Permisos del schema nuevo
-- ---------------------------------------------------------------------
-- En "public" Supabase los otorga solo. En un schema propio hay que
-- darlos a mano, o la API responde "permission denied" aunque las
-- politicas RLS esten bien.
grant usage on schema ls to anon, authenticated, service_role;

grant insert on ls.applications   to anon;
grant insert on ls.event_requests to anon;
grant select on ls.models         to anon;

grant select, insert, update, delete on ls.applications   to authenticated;
grant select, insert, update, delete on ls.event_requests to authenticated;
grant select, insert, update, delete on ls.models         to authenticated;

grant all on all tables in schema ls to service_role;


-- ---------------------------------------------------------------------
-- 4. Comprobacion
-- ---------------------------------------------------------------------
-- Esperado: tres filas en "ls", las tres con rls = true,
-- y NINGUNA fila en "public".
select schemaname, tablename, rowsecurity as rls
  from pg_tables
 where tablename in ('applications','event_requests','models')
   and schemaname in ('public','ls')
 order by schemaname, tablename;


-- =====================================================================
-- SIGUIENTE PASO
--   Ejecutar supabase-schema.sql completo, y despues agregar  ls  en
--   Settings → API → Exposed schemas.
-- =====================================================================
