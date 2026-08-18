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

/* Subida de archivos al storage, sin usar sb.storage.upload().
 *
 * El cliente de Supabase manda las cabeceras x-upsert y cache-control en
 * cada subida. El CORS de esta instancia no las admite, asi que el
 * navegador corta la peticion en el preflight y devuelve un escueto
 * "Failed to fetch" que parece un problema de red.
 *
 * Con las cabeceras que si estan permitidas (apikey, Authorization y
 * Content-Type) la misma peticion responde 200. Esto hace exactamente eso.
 *
 * Se puede volver a sb.storage.upload() el dia que se agreguen x-upsert y
 * cache-control a Access-Control-Allow-Headers en el servidor.
 */
window.lsSubirArchivo = function (bucket, ruta, archivo, contentType) {
  var c = window.LS_SUPABASE || {};
  var sb = window.lsSupabase;
  if (!sb) return Promise.reject(new Error('sin conexion con Supabase'));

  var base = String(c.url || '').replace(/\/+$/, '');
  var destino = base + '/storage/v1/object/' + bucket + '/' +
                String(ruta).split('/').map(encodeURIComponent).join('/');

  // Con sesion iniciada hay que usar SU token: la anon key no tiene
  // permiso para escribir en el bucket de modelos.
  return sb.auth.getSession().then(function (r) {
    var sesion = r && r.data && r.data.session;
    return fetch(destino, {
      method: 'POST',
      body: archivo,
      headers: {
        apikey: c.anonKey,
        Authorization: 'Bearer ' + ((sesion && sesion.access_token) || c.anonKey),
        'Content-Type': contentType || archivo.type || 'application/octet-stream'
      }
    });
  }).then(function (resp) {
    if (resp.ok) return ruta;
    return resp.text().then(function (t) {
      throw new Error('HTTP ' + resp.status + ' — ' + t.slice(0, 200));
    });
  });
};

/* URL publica de un archivo ya subido. */
window.lsUrlPublica = function (bucket, ruta) {
  var c = window.LS_SUPABASE || {};
  return String(c.url || '').replace(/\/+$/, '') + '/storage/v1/object/public/' +
         bucket + '/' + String(ruta).split('/').map(encodeURIComponent).join('/');
};
