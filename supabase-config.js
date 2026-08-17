/* LS Model Management — conexion con Supabase
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
  url: '',      // ej: https://abcdefghijkl.supabase.co
  anonKey: ''   // ej: eyJhbGciOiJIUzI1NiIsInR5cCI6...
};

/* Devuelve el cliente, o null si todavia no se configuro.
   El sitio sigue funcionando sin credenciales: las secciones caen a los
   datos que ya estan escritos en el HTML. */
window.lsSupabase = (function () {
  var c = window.LS_SUPABASE || {};
  if (!c.url || !c.anonKey) return null;
  if (typeof window.supabase === 'undefined') return null;
  return window.supabase.createClient(c.url, c.anonKey);
})();
