-- =====================================================================
-- LS Model Management — mover todo al schema propio "ismodel"
-- =====================================================================
--
-- CUANDO USAR ESTE ARCHIVO
--   Si ya ejecutaste una version anterior del esquema y las tablas
--   quedaron en "public" (o en "ls", de un intento anterior).
--
--   Si tu proyecto de Supabase esta vacio, NO hace falta: ejecuta
--   directamente supabase-schema.sql, que ya crea todo en "ismodel".
--
-- COMO EJECUTARLO
--   1. Supabase → SQL Editor → New query → pegar todo → Run.
--   2. Despues ejecutar supabase-schema.sql completo. Ese archivo es
--      reejecutable y vuelve a dejar politicas, indices y permisos
--      donde corresponde, ya dentro de "ismodel".
--   3. Settings → API → Exposed schemas: agregar  ismodel
--
-- No borra datos: mueve las tablas con su contenido, sus indices y
-- sus politicas. Es seguro volver a ejecutarlo.
-- =====================================================================

create schema if not exists ismodel;


-- ---------------------------------------------------------------------
-- 1. Mover las tablas esten donde esten
-- ---------------------------------------------------------------------
-- ALTER TABLE ... SET SCHEMA conserva las filas, la clave primaria, los
-- indices y las politicas RLS. Solo cambia de lugar.
--
-- Se buscan en "public" y tambien en "ls", que era el nombre de un
-- intento anterior. Solo se mueve si todavia no existe en el destino,
-- para que el archivo se pueda correr dos veces sin romperse.
do $$
declare
  t      text;
  origen text;
begin
  foreach t in array array['applications','event_requests','models']
  loop
    if exists (select 1 from pg_tables where schemaname = 'ismodel' and tablename = t) then
      raise notice 'ismodel.% ya existe, no se toca', t;
      continue;
    end if;

    select schemaname into origen
      from pg_tables
     where tablename = t
       and schemaname in ('public','ls')
     order by case schemaname when 'ls' then 0 else 1 end
     limit 1;

    if origen is null then
      raise notice 'nada que mover para %', t;
    else
      execute format('alter table %I.%I set schema ismodel', origen, t);
      raise notice 'movida: %.% -> ismodel.%', origen, t, t;
    end if;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 2. Columna de segmento (por si venias de antes de la segmentacion)
-- ---------------------------------------------------------------------
alter table ismodel.models
  add column if not exists segmento text not null default 'staff';

alter table ismodel.models
  drop constraint if exists models_segmento_chk;

alter table ismodel.models
  add constraint models_segmento_chk
  check (segmento in ('staff','newface','scouting'));

update ismodel.models
   set segmento = 'staff'
 where segmento is null
    or segmento not in ('staff','newface','scouting');


-- ---------------------------------------------------------------------
-- 3. Permisos del schema nuevo
-- ---------------------------------------------------------------------
-- En "public" Supabase los otorga solo. En un schema propio hay que
-- darlos a mano, o la API responde "permission denied" aunque las
-- politicas RLS esten bien.
grant usage on schema ismodel to anon, authenticated, service_role;

grant insert on ismodel.applications   to anon;
grant insert on ismodel.event_requests to anon;
grant select on ismodel.models         to anon;

grant select, insert, update, delete on ismodel.applications   to authenticated;
grant select, insert, update, delete on ismodel.event_requests to authenticated;
grant select, insert, update, delete on ismodel.models         to authenticated;

grant all on all tables in schema ismodel to service_role;


-- ---------------------------------------------------------------------
-- 4. Limpiar el schema "ls" si quedo vacio de un intento anterior
-- ---------------------------------------------------------------------
-- Se envuelve para que un fallo aca no aborte todo el archivo: si el
-- schema viejo todavia tiene algo, se avisa y se sigue.
do $$
begin
  drop schema if exists ls restrict;
  raise notice 'schema ls eliminado o inexistente';
exception when others then
  raise notice 'el schema ls NO se elimino, todavia tiene objetos: %', sqlerrm;
end $$;


-- ---------------------------------------------------------------------
-- 5. Comprobacion
-- ---------------------------------------------------------------------
-- Esperado: tres filas en "ismodel", las tres con rls = true,
-- y NINGUNA fila en "public" ni en "ls".
select schemaname, tablename, rowsecurity as rls
  from pg_tables
 where tablename in ('applications','event_requests','models')
   and schemaname in ('public','ls','ismodel')
 order by schemaname, tablename;


-- =====================================================================
-- SIGUIENTE PASO
--   Ejecutar supabase-schema.sql completo, y despues agregar  ismodel
--   en Settings → API → Exposed schemas.
-- =====================================================================
