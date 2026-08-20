#!/usr/bin/env bash
# Genera dist/ listo para subir a Hostinger.
#   bash build.sh
#
# Las imagenes originales llegan a 4160x6240 y pesan 315 MB en total.
# El sitio nunca las muestra a mas de ~900 px, asi que se reescalan.
# Tambien se excluyen los Datos.txt (datos personales que ya estan
# transcriptos en el HTML) y los videos fuente.

set -e
cd "$(dirname "$0")"

FF="$LOCALAPPDATA/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"
[ -x "$FF" ] || FF="ffmpeg"

OUT=dist
rm -rf "$OUT"
mkdir -p "$OUT"

echo "==> HTML, script y raiz"
cp index.html modelos.html staff.html new-faces.html scouted.html privacidad.html 404.html support.js "$OUT"/
# El panel y su configuracion tambien van al servidor: sin
# supabase-config.js el sitio no puede leer ni escribir nada.
cp admin.html supabase-config.js "$OUT"/
cp hero-720.mp4 hero-poster.jpg "$OUT"/
cp favicon.ico favicon-16.png favicon-32.png favicon-512.png apple-touch-icon.png "$OUT"/
cp .htaccess "$OUT"/ 2>/dev/null || true
cp robots.txt "$OUT"/ 2>/dev/null || true

echo "==> assets y carousel (ya optimizados)"
mkdir -p "$OUT/assets" && cp assets/*.png assets/*.css assets/*.js "$OUT/assets"/
cp -r carousel "$OUT"/

echo "==> huella de los archivos que se cachean"
# El navegador guarda css y js por un anio con "immutable", que quiere
# decir literalmente "no vuelvas a preguntar": ni un refresco forzado lo
# hace revalidar. En un navegador que ya visito el sitio, una credencial
# corregida podia no llegar nunca.
#
# La unica forma segura de que llegue una version nueva es cambiar la
# DIRECCION, porque eso es una entrada distinta en el cache. Asi que se
# le pega la huella del contenido. Si el archivo no cambio, la huella
# tampoco: se sigue aprovechando el cache.
#
# Antes el numero se escribia a mano (?v=2) y quedaba desactualizado en
# el primer descuido, que es justo lo que paso.
huella () {
  if command -v md5sum >/dev/null 2>&1; then
    # tr -d: segun la maquina, git deja los saltos de linea al estilo
    # Windows o Unix. Sin quitarlos, el mismo archivo daria dos huellas
    # distintas y se tiraria el cache sin motivo.
    tr -d '\r' < "$1" | md5sum | cut -c1-8
  else date +%s; fi   # sin md5sum: se pierde el cache, pero nunca sirve viejo
}
H_CONF=$(huella supabase-config.js)
H_JS=$(huella assets/modelos.js)
H_CSS=$(huella assets/modelos.css)
for f in "$OUT"/*.html; do
  sed -i -e "s|supabase-config\.js?v=[^\"']*|supabase-config.js?v=$H_CONF|g" \
         -e "s|assets/modelos\.js?v=[^\"']*|assets/modelos.js?v=$H_JS|g" \
         -e "s|assets/modelos\.css?v=[^\"']*|assets/modelos.css?v=$H_CSS|g" "$f"
done
echo "    supabase-config $H_CONF · modelos.js $H_JS · modelos.css $H_CSS"

# Reescala respetando la relacion de aspecto; nunca agranda.
# -map 0:v:0 es necesario: muchas fotos de telefono traen una miniatura
# incrustada como segundo stream y ffmpeg no sabe a cual aplicar el filtro.
FALLOS=0
shrink () { # $1 origen  $2 destino  $3 ancho maximo  $4 calidad
  if ! "$FF" -y -loglevel error -i "$1" -map 0:v:0 -frames:v 1 \
       -vf "scale='min($3,iw)':-2" -q:v "$4" "$2" 2>/dev/null; then
    echo "    ! no se pudo optimizar, se copia tal cual: $1"
    cp "$1" "$2"
    FALLOS=$((FALLOS+1))
  fi
}

echo "==> portada/ a 900px (se usa como miniatura de la grilla)"
mkdir -p "$OUT/portada"
for f in portada/*; do
  [ -f "$f" ] || continue
  case "$f" in *.HEIC|*.heic) continue;; esac
  shrink "$f" "$OUT/$f" 900 4
done

echo "==> New Faces/ a 1400px"
for d in "New Faces"/*/; do
  [ -d "$d" ] || continue
  mkdir -p "$OUT/$d"
  for f in "$d"*; do
    [ -f "$f" ] || continue
    case "$f" in *Datos.txt) continue;; esac
    sig=$(head -c 4 "$f" | od -An -tx1 | tr -d " 
")
    case "$sig" in
      ffd8ff*|89504e47|52494646) ;;
      *) echo "    ! no es una imagen web, se omite: $f"; continue;;
    esac
    base="${f##*/}"
    shrink "$f" "$OUT/$d$base" 1400 4
  done
done

echo "==> uploads/ a 1400px (galeria del detalle)"
for d in uploads/*/; do
  [ -d "$d" ] || continue
  mkdir -p "$OUT/$d"
  for f in "$d"*; do
    [ -f "$f" ] || continue
    case "$f" in
      *Datos.txt) continue;;          # datos personales, no van al servidor
    esac
    # Se descarta por CONTENIDO, no por extension: hay HEIC guardados
    # con nombre .jpeg que ningun navegador puede mostrar.
    sig=$(head -c 4 "$f" | od -An -tx1 | tr -d ' \n')
    case "$sig" in
      ffd8ff*|89504e47|52494646) ;;   # JPEG, PNG, WebP
      *) echo "    ! no es una imagen web, se omite: $f"; continue;;
    esac
    base="${f##*/}"
    shrink "$f" "$OUT/$d$base" 1400 4
  done
done

echo
echo "==> Listo"
du -sh "$OUT"
[ "$FALLOS" -gt 0 ] && echo "    ($FALLOS imagenes se copiaron sin optimizar)"
echo "Subir el CONTENIDO de $OUT/ a public_html/ en Hostinger."
