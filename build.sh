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
cp index.html modelos.html privacidad.html 404.html support.js "$OUT"/
cp hero.mp4 hero-poster.jpg "$OUT"/
cp favicon.ico favicon-16.png favicon-32.png favicon-512.png apple-touch-icon.png "$OUT"/
cp .htaccess "$OUT"/ 2>/dev/null || true
cp robots.txt "$OUT"/ 2>/dev/null || true

echo "==> assets y carousel (ya optimizados)"
mkdir -p "$OUT/assets" && cp assets/*.png "$OUT/assets"/
cp -r carousel "$OUT"/

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

echo "==> uploads/ a 1400px (galeria del detalle)"
for d in uploads/*/; do
  [ -d "$d" ] || continue
  mkdir -p "$OUT/$d"
  for f in "$d"*; do
    [ -f "$f" ] || continue
    case "$f" in
      *Datos.txt) continue;;          # datos personales, no van al servidor
      *.HEIC|*.heic) continue;;       # los navegadores no los renderizan
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
