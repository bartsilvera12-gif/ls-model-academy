-- =====================================================================
-- IS Model Management — Migracion 02: postulaciones -> Scouting Models
-- =====================================================================
--
-- Conecta el formulario del sitio con el tercer segmento: lo que llega
-- por la web queda marcado como "scouting" y desde el panel se puede
-- publicar como modelo dentro de esa categoria.
--
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- Es seguro volver a ejecutarlo.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. De que segmento viene cada postulacion
-- ---------------------------------------------------------------------
-- Por definicion, todo lo que entra por el formulario del sitio es
-- scouting. El equipo puede cambiarlo despues desde el panel si decide
-- mandar ese perfil a otro bloque.
alter table ismodel.applications
  add column if not exists segmento text not null default 'scouting';

alter table ismodel.applications
  drop constraint if exists applications_segmento_chk;

alter table ismodel.applications
  add constraint applications_segmento_chk
  check (segmento in ('staff','newface','scouting'));


-- ---------------------------------------------------------------------
-- 2. Enlace con la ficha publicada
-- ---------------------------------------------------------------------
-- Cuando el equipo publica una postulacion, se guarda aca el id de la
-- modelo creada. Sirve para no publicarla dos veces y para saber, desde
-- la postulacion, si ya esta en el sitio.
--
-- on delete set null: si se borra la ficha publicada, la postulacion
-- original NO se borra, solo se desvincula.
alter table ismodel.applications
  add column if not exists model_id uuid;

alter table ismodel.applications
  drop constraint if exists applications_model_fk;

alter table ismodel.applications
  add constraint applications_model_fk
  foreign key (model_id) references ismodel.models(id) on delete set null;

create index if not exists applications_model_idx
  on ismodel.applications (model_id);


-- ---------------------------------------------------------------------
-- 3. Origen de la ficha de modelo
-- ---------------------------------------------------------------------
-- Para distinguir en el panel una modelo cargada a mano de una que
-- vino de una postulacion.
alter table ismodel.models
  add column if not exists origen text;


-- ---------------------------------------------------------------------
-- 4. Permisos de las columnas nuevas
-- ---------------------------------------------------------------------
-- Los grants por tabla ya cubren las columnas nuevas, pero se vuelven a
-- aplicar por si esta migracion corre en una base donde no se ejecuto
-- supabase-schema.sql despues del cambio de schema.
grant insert on ismodel.applications to anon;
grant select, insert, update, delete on ismodel.applications to authenticated;
grant select, insert, update, delete on ismodel.models       to authenticated;


-- ---------------------------------------------------------------------
-- 5. Comprobacion
-- ---------------------------------------------------------------------
-- Esperado: segmento y model_id en applications, origen en models.
select table_name, column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'ismodel'
   and ((table_name = 'applications' and column_name in ('segmento','model_id'))
     or (table_name = 'models'       and column_name in ('segmento','origen')))
 order by table_name, column_name;
