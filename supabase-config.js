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

/* Reduce una imagen antes de subirla.
 *
 * Las fotos de telefono llegan a 12 MP y 8 MB, y el sitio nunca las
 * muestra a mas de 1400 px. Subir el original tarda, gasta datos del
 * visitante y llena el almacenamiento sin que se vea mejor.
 *
 * Devuelve una promesa con el archivo a subir. Ante cualquier duda
 * devuelve el original: comprimir es una mejora, no un requisito, y
 * nunca tiene que impedir que una postulacion se envie.
 */
window.lsComprimirImagen = function (archivo, opciones) {
  var o = opciones || {};
  var maxLado = o.maxLado || 1400;
  var calidad = o.calidad || 0.82;
  // Por debajo de este peso, y ya en tamanio, re-comprimir solo degrada.
  var minPeso = o.minPeso || 400 * 1024;

  if (!archivo) return Promise.resolve(archivo);

  return new Promise(function (resolver) {
    var url;
    try { url = URL.createObjectURL(archivo); }
    catch (e) { return resolver(archivo); }

    var listo = false;
    function salir(resultado) {
      if (listo) return;
      listo = true;
      URL.revokeObjectURL(url);
      resolver(resultado);
    }
    // Un HEIC o un archivo raro no se puede decodificar: se sube tal cual.
    setTimeout(function () { salir(archivo); }, 20000);

    var img = new Image();
    img.onerror = function () { salir(archivo); };
    img.onload = function () {
      var w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) return salir(archivo);

      var f = Math.min(1, maxLado / Math.max(w, h));
      if (f === 1 && archivo.size && archivo.size <= minPeso) return salir(archivo);

      var cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(w * f));
      cv.height = Math.max(1, Math.round(h * f));
      var cx = cv.getContext('2d');
      // Fondo blanco: un PNG con transparencia quedaria negro en JPEG.
      cx.fillStyle = '#fff';
      cx.fillRect(0, 0, cv.width, cv.height);
      cx.imageSmoothingEnabled = true;
      cx.imageSmoothingQuality = 'high';
      // Al dibujar, el navegador ya aplico la rotacion EXIF: la copia
      // sale derecha y sin depender de la marca.
      cx.drawImage(img, 0, 0, cv.width, cv.height);

      cv.toBlob(function (b) {
        if (!b) return salir(archivo);
        // Si no gano nada, se queda el original.
        if (archivo.size && b.size >= archivo.size) return salir(archivo);
        var nombre = String(archivo.name || 'foto.jpg').replace(/\.[^.]+$/, '') + '.jpg';
        var salida;
        try { salida = new File([b], nombre, { type: 'image/jpeg' }); }
        catch (e) { salida = b; salida.name = nombre; }
        salir(salida);
      }, 'image/jpeg', calidad);
    };
    img.src = url;
  });
};

/* URL publica de un archivo ya subido. */
window.lsUrlPublica = function (bucket, ruta) {
  var c = window.LS_SUPABASE || {};
  return String(c.url || '').replace(/\/+$/, '') + '/storage/v1/object/public/' +
         bucket + '/' + String(ruta).split('/').map(encodeURIComponent).join('/');
};
