/* IS Model Management — conexion con Supabase
 *
 * Completar con los datos de: Supabase → Project Settings → API
 *
 * La "anon key" esta pensada para ir en el navegador: es publica y no da
 * acceso a nada por si sola. Lo que protege los datos son las politicas
 * RLS definidas en supabase-schema.sql.
 *
 * NUNCA pegar aca la "service_role key": esa saltea todas las politicas.
 */
window.LS_SUPABASE = {
  url: 'https://api.neura.com.py/',      // ej: https://abcdefghijkl.supabase.co
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0MTAxNDYxLCJleHAiOjE5MzE3ODE0NjF9.7_wAph8IolPMXtgfpezSwS5XR62IdD__qhqCywLDp3Q'   // ej: eyJhbGciOiJIUzI1NiIsInR5cCI6...
};

/* Las tablas NO estan en "public" sino en un schema propio.
   Si se cambia aca, hay que cambiarlo tambien en supabase-schema.sql
   y volver a declararlo en Settings → API → Exposed schemas. */
window.LS_SCHEMA = 'ismodel';

/* Devuelve el cliente, o null si todavia no se configuro.
   El sitio sigue funcionando sin credenciales: las secciones caen a los
   datos que ya estan escritos en el HTML. */
window.lsSupabase = (function () {
  var c = window.LS_SUPABASE || {};
  if (!c.url || !c.anonKey) return null;
  if (typeof window.supabase === 'undefined') return null;
  // db.schema hace que .from('models') apunte a ismodel.models.
  // storage y auth no dependen de esto: viven en sus propios schemas.
  return window.supabase.createClient(c.url, c.anonKey, {
    db: { schema: window.LS_SCHEMA || 'ismodel' }
  });
})();
