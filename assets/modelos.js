var U = 'uploads/', P = 'portada/';

var MODELS = [
  { name:'Esther Kuhnen', age:24, alt:'1,73', b:84, c:62, ca:94,
    cover:U+'Esther Kuhnen/WhatsApp Image 2026-08-18 at 08.07.27.jpeg', pos:'center 15%', dir:'Esther Kuhnen',
    fotos:['WhatsApp Image 2026-08-18 at 08.07.27.jpeg','WhatsApp Image 2026-08-18 at 08.07.27 (1).jpeg','WhatsApp Image 2026-08-18 at 08.07.28.jpeg','WhatsApp Image 2026-08-18 at 08.07.28 (1).jpeg','WhatsApp Image 2026-08-18 at 08.07.28 (2).jpeg'] },

  { name:'Fiona Otiñano', age:23, alt:'1,79', b:84, c:64, ca:97, ciudad:'Oberá, Misiones, Argentina',
    cover:P+'Fiona Otiñano 23 años.jpeg', pos:'center 20%', dir:'Fiona Otiñano',
    fotos:['_MG_6513.jpg.jpeg','_MG_6543.jpg.jpeg','_MG_6581.jpg.jpeg','_MG_7060.jpg.jpeg','_MG_7067.jpg.jpeg'] },

  { name:'Alejandra Ortiz', age:18, alt:'1,71', b:80, c:60, ca:90, calce:'35', ciudad:'Ciudad del Este',
    cover:P+'Alejandra Ortiz 18 años.jpeg', pos:'center 6%', dir:'Alejandra Ortiz',
    fotos:['1.jpeg','2.jpeg','WhatsApp Image 2026-08-13 at 16.16.04 (1).jpeg','WhatsApp Image 2026-08-13 at 16.16.04 (2).jpeg','WhatsApp Image 2026-08-13 at 16.16.05.jpeg'] },

  { name:'Anahí Ledezma', age:17, alt:'1,76', b:82, c:60, ca:90, ciudad:'Capitán Bado, Amambay',
    cover:P+'Anahí Ledezma 17 años.jpeg', pos:'center 22%', dir:'Anahí Ledezma',
    fotos:['IMG_7003.JPG.jpeg','IMG_7004.JPG.jpeg','IMG_7005.JPG.jpeg','IMG_7009.JPG.jpeg','IMG_7011.JPG.jpeg'] },

  { name:'Amy Benitez', age:null, alt:null, b:84, c:60, ca:100,
    cover:U+'Amy Benitez/5DA66058-AFCF-490D-9A80-9B622FBC6361.JPG.jpeg', pos:'center 15%', dir:'Amy Benitez',
    fotos:['5DA66058-AFCF-490D-9A80-9B622FBC6361.JPG.jpeg','080051CC-B05C-4DD1-920A-79BEE16FFB45.JPG.jpeg','634B7E55-1861-4C1D-BCA8-41629A7DBEB7.JPG.jpeg','IMG_3129.PNG'] },

  { name:'Antonia Lüdicke', age:20, alt:'1,80', b:86, c:66, ca:94, ciudad:'Emboscada',
    cover:P+'Antonia Lüdicke 20 años.jpeg', pos:'center 25%', dir:'Antonia Lüdicke',
    fotos:['WhatsApp Image 2026-08-13 at 16.13.37.jpeg','WhatsApp Image 2026-08-13 at 16.13.37 (1).jpeg','WhatsApp Image 2026-08-13 at 16.13.37 (2).jpeg','WhatsApp Image 2026-08-13 at 16.13.37 (3).jpeg'] },

  { name:'Araceli Cano', age:18, alt:'1,75', b:78, c:63, ca:95, calce:'39', ciudad:'Ciudad del Este, Paraguay',
    cover:P+'Araceli Cano 18 años.jpeg', pos:'center 20%', dir:'Araceli Cano',
    fotos:['WhatsApp Image 2026-08-13 at 16.12.04.jpeg','WhatsApp Image 2026-08-13 at 16.12.04 (1).jpeg','WhatsApp Image 2026-08-13 at 16.12.04 (2).jpeg','WhatsApp Image 2026-08-13 at 16.12.04 (3).jpeg','WhatsApp Image 2026-08-13 at 16.12.04 (4).jpeg'] },

  { name:'Belén Ramírez', age:20, alt:'1,70', b:84, c:64, ca:100, ciudad:'Presidente Franco',
    cover:U+'Belén Ramírez/IMG_3391.JPG.jpeg', pos:'center 25%', dir:'Belén Ramírez',
    fotos:['IMG_3391.JPG.jpeg','IMG_4396.JPG.jpeg','IMG_4397.JPG.jpeg','IMG_4653.PNG','IMG_4659.PNG'] },

  { name:'Cecilia Caffarena Clerch', age:20, alt:'1,74', b:84, c:63, ca:95, ciudad:'Ciudad del Este',
    cover:P+'Cecilia Caffarena 20 años.jpeg', pos:'center 18%', dir:'Celia Clerch',
    fotos:['IMG_0242.JPG.jpeg','IMG_0246.JPG.jpeg','IMG_0247.JPG.jpeg','IMG_0249.JPG.jpeg','IMG_0253.JPG.jpeg'] },

  { name:'Cecilia Lezcano', age:20, alt:'1,76', b:80, c:60, ca:95, ciudad:'Asunción',
    cover:P+'Cecilia Lezcano 20 años.jpeg', pos:'center 12%', dir:'Cecilia Lezcano',
    fotos:['WhatsApp Image 2026-08-13 at 16.13.35.jpeg','WhatsApp Image 2026-08-13 at 16.13.35 (1).jpeg','WhatsApp Image 2026-08-13 at 16.13.36.jpeg','WhatsApp Image 2026-08-13 at 16.13.36 (1).jpeg','WhatsApp Image 2026-08-13 at 16.13.36 (2).jpeg'] },

  { name:'Celeste Cibils Cabrera', age:19, alt:'1,83', b:75, c:60, ca:100, ciudad:'Encarnación, Itapúa',
    cover:U+'Celeste Cibils/WhatsApp Image 2026-08-17 at 16.19.15.jpeg', pos:'center 18%', dir:'Celeste Cibils',
    fotos:['WhatsApp Image 2026-08-17 at 16.19.15.jpeg','WhatsApp Image 2026-08-17 at 16.19.14.jpeg','WhatsApp Image 2026-08-17 at 16.19.14 (1).jpeg','WhatsApp Image 2026-08-17 at 16.19.15 (1).jpeg'] },

  { name:'Cielo Rodríguez', age:24, alt:'1,73', b:82, c:62, ca:93, calce:'38', vestido:'XP/P', pantalon:'36/38',
    cover:P+'Cielo Lezcano 24 años.JPEG', pos:'center 20%', dir:'Cielo Rodriguez',
    fotos:['IMG_1257.JPEG','IMG_1258.JPEG','IMG_1261.JPEG','IMG_1262.JPEG'] },

  { name:'Daila Crechi', age:22, alt:'1,70', b:80, c:61, ca:92, ciudad:'Ciudad del Este, Alto Paraná',
    cover:P+'Dalia Crechi 22 años.jpeg', pos:'center 14%', dir:'Daila Crechi',
    fotos:['IMG_4766.JPG.jpeg','IMG_4767.JPG.jpeg','IMG_4768.JPG.jpeg','IMG_4769.JPG.jpeg'] },

  { name:'Jamila González', age:20, alt:'1,72', b:75, c:60, ca:90, ciudad:'Ciudad del Este, Paraguay',
    cover:P+'Jamila González 20 años.JPEG', pos:'center 20%', dir:'Jamila González',
    fotos:['IMG_8806.JPEG','IMG_8811.JPEG','IMG_8817.JPEG','IMG_8818.JPEG','IMG_8820.JPEG'] },

  { name:'Jazmin Orihuela', age:21, alt:'1,68', b:82, c:58, ca:86, calce:'38', vestido:'P', pantalon:'36', ciudad:'Luque',
    cover:P+'Jazmin Orihuela 21 años.jpeg', pos:'center 25%', dir:'Jazmin Orihuela',
    fotos:['IMG_0034.JPEG','IMG_0039.JPEG','IMG_1917.JPG.jpeg','IMG_1920.JPG.jpeg','IMG_1921.JPG.jpeg'] },

  { name:'Jessica Brizuela', age:23, alt:'1,70', b:83, c:63, ca:98, calce:'38', vestido:'P', pantalon:'P', ciudad:'Caaguazú',
    cover:P+'Jessica Brizuela 23 años.jpeg', pos:'center 10%', dir:'Jessica Brizuela',
    fotos:['WhatsApp Image 2026-08-13 at 16.13.26.jpeg','WhatsApp Image 2026-08-13 at 16.13.27.jpeg','WhatsApp Image 2026-08-13 at 16.13.27 (1).jpeg','WhatsApp Image 2026-08-13 at 16.13.27 (2).jpeg','WhatsApp Image 2026-08-13 at 16.13.27 (3).jpeg'] },

  { name:'Kauany Feghera', age:25, alt:'1,74', b:83, c:66, ca:96, calce:'36/37', vestido:'P', pantalon:'36/38', ciudad:'Foz do Iguaçu',
    cover:U+'Kauany Feghera/IMG_7090.JPG.jpeg', pos:'center 15%', dir:'Kauany Feghera',
    // IMG_7935.HEIC queda afuera: ningun navegador lo muestra.
    fotos:['IMG_7090.JPG.jpeg','IMG_7063.JPG.jpeg','IMG_7065.JPG.jpeg','IMG_2782.JPG.jpeg','IMG_3040.JPG.jpeg'] },

  { name:'Laia Arnella', age:19, alt:'1,74', b:84, c:65, ca:97, calce:'38/39', vestido:'P', pantalon:'38 o M', ciudad:'Ciudad del Este',
    cover:P+'Laia Arnella 19 años.jpeg', pos:'center 12%', dir:'Laia Arnella',
    fotos:['02FAB026-807D-4A7B-980A-618768BF9063.JPG.jpeg','DA743BA0-B654-4940-AE6A-34BFBBFAF230.JPG.jpeg','IMG_3824.JPG.jpeg','IMG_4072.JPG.jpeg','IMG_4073.JPG.jpeg'] },

  { name:'Lucero Saldívar', age:20, alt:'1,78', b:89, c:64, ca:96, calce:'38', vestido:'P', ciudad:'Ciudad del Este',
    cover:P+'Lucero Saldivar 20 años.jpeg', pos:'center 50%', dir:'Lucero Saldivar',
    fotos:['IMG_3772.JPG.jpeg','IMG_3773.JPG.jpeg','IMG_3776.JPG.jpeg','IMG_3780.JPG.jpeg','IMG_3781.JPG.jpeg'] },

  { name:'Maria Eduarda Labres', age:19, alt:'1,77', b:78, c:60, ca:90, ciudad:'Foz do Iguaçu',
    cover:P+'Maria Labres 19 años.jpeg', pos:'center 15%', dir:'Maria Labres',
    fotos:['_MG_6888.jpg.jpeg','_MG_6895.jpg.jpeg','_MG_7294.jpg (1).jpeg','_MG_7328.jpg.jpeg'] },

  { name:'Nathalia Duarte', age:21, alt:'1,74', b:83, c:64, ca:95, ciudad:'Asunción',
    cover:P+'Nathalia Duarte 21 años.jpeg', pos:'center 26%', dir:'Nathalia Duarte',
    fotos:['IMG_0566.JPG.jpeg','IMG_0567.JPG.jpeg','IMG_0568.JPG.jpeg','IMG_0569.JPG.jpeg','IMG_3750.JPG.jpeg'] },

  { name:'Nayara Weiber', age:21, alt:'1,70', b:81, c:63, ca:95, calce:'37/38', vestido:'P', pantalon:'36/38', ciudad:'Foz do Iguaçu / Ciudad del Este',
    cover:U+'Nayara Weiber/IMG_8779.JPG.jpeg', pos:'center 20%', dir:'Nayara Weiber',
    fotos:['IMG_8779.JPG.jpeg','IMG_8781.JPG.jpeg','IMG_8782.JPG.jpeg','IMG_8786.JPG.jpeg','IMG_8787.JPG.jpeg'] },

  { name:'Paula Mendiola', age:21, alt:'1,75', b:82, c:64, ca:93, ciudad:'Asunción',
    cover:P+'Paula Mendiola 21 años.jpeg', pos:'center 10%', dir:'Paula Mendiola',
    fotos:['WhatsApp Image 2026-08-14 at 11.29.37.jpeg','WhatsApp Image 2026-08-14 at 11.29.38.jpeg','WhatsApp Image 2026-08-14 at 11.29.39.jpeg','WhatsApp Image 2026-08-14 at 11.29.40.jpeg','WhatsApp Image 2026-08-14 at 11.29.41.jpeg'] },

  { name:'Soledad Ríos', age:19, alt:'1,72', b:83, c:66, ca:98, ciudad:'Ciudad del Este',
    cover:P+'Soledad Rios 19 años.jpeg', pos:'center 16%', dir:'Soledad Rios',
    fotos:['IMG_2052.PNG','IMG_5367.JPEG','IMG_5369.JPEG','IMG_5372.JPEG','IMG_5378.JPG.jpeg'] },

  { name:'Sophia Jimenez', age:19, alt:'1,70', b:82, c:62, ca:92, ciudad:'Asunción',
    cover:P+'Sophia Jimenez 19 años.jpeg', pos:'center 12%', dir:'Sophia Jimenez',
    fotos:['WhatsApp Image 2026-08-13 at 16.11.00.jpeg','WhatsApp Image 2026-08-13 at 16.11.00 (1).jpeg','WhatsApp Image 2026-08-13 at 16.11.00 (2).jpeg','WhatsApp Image 2026-08-13 at 16.11.00 (3).jpeg','WhatsApp Image 2026-08-13 at 16.11.01.jpeg'] },

  { name:'Tais Espinola', age:20, alt:'1,76', b:84, c:64, ca:93, ciudad:'Asunción, Paraguay',
    cover:P+'Tais Espinola 20 años.JPEG', pos:'center 10%', dir:'Tais Espinola',
    fotos:['IMG_6188 (2).JPEG','IMG_6189.JPEG','IMG_6193.JPEG','IMG_9692.JPG.jpeg','_MG_1444.JPEG'] },

  { name:'Thamiris Ibarrola', age:20, alt:'1,69', b:84, c:62, ca:91, calce:'36/37', vestido:'P', pantalon:'36', ciudad:'Pdte. Franco, Alto Paraná',
    cover:P+'Thamiris Ibarrola.jpeg', pos:'center 28%', dir:'Thamiris Ibarrola',
    fotos:['IMG_3607.jpg.jpeg','IMG_8282.JPG.jpeg','IMG_8285.JPG.jpeg','IMG_8286.JPG.jpeg','_MG_8404.JPEG'] },

  { name:'Zueli Vazquez', age:21, alt:'1,72', b:86, c:63, ca:92, ciudad:'Luque',
    cover:P+'Zuelli Vazquez 21 años.jpeg', pos:'center 52%', dir:'Zueli Vazquez',
    // 1000863508.jpg.jpeg quedo afuera: pese al nombre es un HEIC de 512px
    // (firma ftypheic) que ningun navegador puede mostrar.
    fotos:['1000863510.jpg.jpeg','1000863513.jpg.jpeg','1000863514.jpg.jpeg','1000863515.jpg.jpeg','1000863517.jpg.jpeg'] },
  /* ---------- New Faces Models ---------- */
  { name:'Anahí Mosqueira', age:17, alt:'1,62', b:89, c:69, ca:86, calce:'37', ciudad:'Asunción',
    seg:'newface', base:'New Faces/', dir:'Anahí Mosqueira',
    cover:'New Faces/Anahí Mosqueira/_MG_3492.JPEG', pos:'center 18%',
    fotos:['_MG_3492.JPEG','IMG_3501_Original.jpg.jpeg','IMG_3505_Original.jpg.jpeg','IMG_3506_Original.jpg.jpeg'] },

  { name:'Dahiana Riquelme', age:20, alt:'1,67', b:83, c:64, ca:94, ciudad:'Villa Elisa',
    seg:'newface', base:'New Faces/', dir:'Dahiana Riquelme',
    cover:'New Faces/Dahiana Riquelme/IMG_7209.JPG.jpeg', pos:'center 20%',
    fotos:['IMG_7209.JPG.jpeg','IMG_7211.JPG.jpeg','IMG_7214.JPG.jpeg','IMG_7222.JPG.jpeg','IMG_9948.JPG.jpeg','IMG_9949.JPG.jpeg','IMG_9952.JPG.jpeg'] },

  { name:'Dulce Ramírez', age:16, alt:'1,65', b:75, c:60, ca:86, ciudad:'Mariano Roque Alonso',
    seg:'newface', base:'New Faces/', dir:'Dulce Ramirez',
    cover:'New Faces/Dulce Ramirez/WhatsApp Image 2026-08-18 at 11.06.57 (1).jpeg', pos:'center 18%',
    fotos:['WhatsApp Image 2026-08-18 at 11.06.57 (1).jpeg','WhatsApp Image 2026-08-18 at 11.06.57.jpeg','WhatsApp Image 2026-08-18 at 11.06.58.jpeg'] },

  { name:'Jenifer Segovia', age:19, alt:'1,60', b:83, c:63, ca:88, ciudad:'Asunción',
    seg:'newface', base:'New Faces/', dir:'Jenifer Segovia',
    cover:'New Faces/Jenifer Segovia/WhatsApp Image 2026-08-18 at 11.22.36 (1).jpeg', pos:'center 20%',
    fotos:['WhatsApp Image 2026-08-18 at 11.22.36 (1).jpeg','WhatsApp Image 2026-08-18 at 11.22.36 (2).jpeg','WhatsApp Image 2026-08-18 at 11.22.36 (3).jpeg','WhatsApp Image 2026-08-18 at 11.22.36.jpeg'] },

  { name:'Luz López', age:20, alt:'1,80', b:88, c:74, ca:97, calce:'40', vestido:'P/M', pantalon:'40/42', ciudad:'San Lorenzo',
    seg:'newface', base:'New Faces/', dir:'Luz López',
    cover:'New Faces/Luz López/1.JPEG', pos:'center 18%',
    fotos:['1.JPEG','2.JPEG','3.JPEG','4.JPEG','5.JPEG','6.JPEG','7.JPEG','8.JPEG'] },

  { name:'Meliza Villalba', age:18, alt:'1,73', b:80, c:65, ca:92, ciudad:'Luque',
    seg:'newface', base:'New Faces/', dir:'Meliza Villalba',
    cover:'New Faces/Meliza Villalba/WhatsApp Image 2026-08-18 at 11.06.27.jpeg', pos:'center 18%',
    fotos:['WhatsApp Image 2026-08-18 at 11.06.27.jpeg','WhatsApp Image 2026-08-18 at 11.06.27 (1).jpeg','WhatsApp Image 2026-08-18 at 11.06.28.jpeg','WhatsApp Image 2026-08-18 at 11.06.28 (1).jpeg','WhatsApp Image 2026-08-18 at 11.06.28 (2).jpeg','WhatsApp Image 2026-08-18 at 11.06.28 (3).jpeg','WhatsApp Image 2026-08-18 at 11.06.28 (4).jpeg','WhatsApp Image 2026-08-18 at 11.06.29.jpeg','WhatsApp Image 2026-08-18 at 11.06.56.jpeg','WhatsApp Image 2026-08-18 at 11.06.56 (1).jpeg','WhatsApp Image 2026-08-18 at 11.06.57.jpeg','WhatsApp Image 2026-08-18 at 11.06.57 (1).jpeg'] }
];

function pad(n){ return (n<10?'0':'')+n; }
// Supabase devuelve URLs completas; las locales son rutas relativas que hay
// que codificar por segmento, porque tienen espacios y acentos.
function esURL(p){ return /^https?:\/\//i.test(String(p)); }
function enc(p){ return esURL(p) ? p : String(p).split('/').map(encodeURIComponent).join('/'); }
function photo(m,f){ return esURL(f) ? f : enc((m.base || U) + m.dir + '/' + f); }

/* Supabase redimensiona al vuelo. Las fotos estan guardadas a 1400 px y la
   grilla las muestra a ~400: pedir el original es tirar bytes y tiempo de
   decodificacion. Una portada baja de 92 KB a 42 KB pidiendola a 600.
   Las rutas locales (sin Supabase) se devuelven tal cual. */
function alAncho(url, ancho){
  if (!url || !esURL(url)) return url;
  if (url.indexOf('/object/public/') < 0) return url;
  return url.replace('/object/public/', '/render/image/public/') +
         '?width=' + ancho + '&quality=80';
}

/* En una pantalla retina cada pixel CSS son dos fisicos: pedir 600 para
   una tarjeta de 410 se veia pixelado. Se sube por una escalera fija en
   vez de un numero exacto, para que la cache del servidor sirva de algo,
   y se corta en 2x: a 3x la diferencia ya no se nota y pesa el doble. */
function anchoPara(anchoCSS){
  var real = anchoCSS * Math.min(window.devicePixelRatio || 1, 2);
  var escalera = [480, 720, 960, 1200, 1400];
  for (var i = 0; i < escalera.length; i++) if (escalera[i] >= real) return escalera[i];
  return 1400;
}
function slug(s){
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
          .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

/* ---------- grid ---------- */
/* Dos bloques que no se mezclan: el staff profesional y las caras nuevas
   que salen del casting de IS Model Academy. Una modelo sin segmento
   definido se considera staff, que es como nacio el listado. */
var SEGMENTOS = [
  { id:'staff',    archivo:'staff.html',     chip:'tStaff' },
  { id:'newface',  archivo:'new-faces.html', chip:'tNew' },
  { id:'scouting', archivo:'scouted.html',   chip:'tScout' }
];
var SEG_IDS = SEGMENTOS.map(function(s){ return s.id; });
function segDe(m){ return SEG_IDS.indexOf(m.seg) > -1 ? m.seg : 'staff'; }
function archivoDe(id){
  for (var i = 0; i < SEGMENTOS.length; i++) if (SEGMENTOS[i].id === id) return SEGMENTOS[i].archivo;
  return 'staff.html';
}

/* Cada pagina muestra un unico segmento y lo declara en <body data-seg>.
   La lista completa igual se carga: hace falta para contar cuantas hay en
   cada vista y para resolver un enlace directo a un perfil de otra. */
var SEG_ACTUAL = document.body.getAttribute('data-seg') || 'staff';

/* Indices dentro de MODELS de las modelos de ESTA pagina, en el orden en
   que aparecen. Es lo que recorren las flechas del perfil. */
var LISTA = [];

function tarjeta(m, indiceGlobal, posEnBloque){
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'card';
  // data-i sigue siendo el indice dentro de MODELS: es lo que abre la ficha.
  b.setAttribute('data-reveal',''); b.setAttribute('data-i', indiceGlobal);
  b.style.transitionDelay = (posEnBloque%3)*0.09 + 's';

  var img = new Image();
  img.alt = m.name;
  img.loading = posEnBloque<6 ? 'eager' : 'lazy'; img.decoding = 'async';
  img.style.objectPosition = m.pos;
  img.onerror = function(){ b.style.display = 'none'; };
  // La portada se guarda sin transformar: el ancho se decide despues de
  // insertar, cuando ya se sabe cuanto mide la tarjeta en pantalla.
  b.__cover = enc(m.cover);

  var frame = document.createElement('div'); frame.className = 'frame';
  var num = document.createElement('span'); num.className = 'num'; num.textContent = pad(posEnBloque+1);
  var view = document.createElement('span'); view.className = 'view'; view.textContent = 'Ver perfil';
  frame.appendChild(img); frame.appendChild(num); frame.appendChild(view);

  var meta = document.createElement('div'); meta.className = 'meta';
  var h = document.createElement('h2'); h.className = 'name'; h.textContent = m.name;
  var sub = document.createElement('span'); sub.className = 'sub';
  sub.textContent = [m.age, m.alt ? m.alt + ' M' : null].filter(Boolean).join(' · ');
  meta.appendChild(h); meta.appendChild(sub);

  var rule = document.createElement('div'); rule.className = 'rule';
  b.appendChild(frame); b.appendChild(meta); b.appendChild(rule);
  b.__img = img;
  return b;
}

/* Se comparan sin tildes ni mayusculas: "otinano" encuentra a Otiñano. */
function normalizar(t){
  return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/* La grilla se arma UNA vez. Buscar solo muestra y esconde: reconstruirla
   en cada tecla creaba 27 nodos y 27 imagenes nuevas, y se notaba. */
function renderGrid(){
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  LISTA = [];
  MODELS.forEach(function(m, i){
    if (segDe(m) !== SEG_ACTUAL) return;
    var b = tarjeta(m, i, LISTA.length);
    b.__buscable = normalizar([m.name, m.ciudad].filter(Boolean).join(' '));
    grid.appendChild(b);
    LISTA.push(i);
  });

  // Los contadores de las otras dos vistas salen de la lista completa, no
  // del filtro: son enlaces a otras paginas, no resultados de la busqueda.
  SEGMENTOS.forEach(function(seg){
    var chip = document.getElementById(seg.chip);
    if (!chip) return;
    var n = MODELS.filter(function(m){ return segDe(m) === seg.id; }).length;
    chip.textContent = n < 10 ? '0' + n : String(n);
    var enlace = chip.closest('.segnav__b');
    if (enlace) { if (n) enlace.removeAttribute('data-vacio'); else enlace.setAttribute('data-vacio', ''); }
  });

  // Con las tarjetas ya en el documento se conoce su ancho real, y recien
  // ahi se piden las imagenes: antes de insertar, loading='lazy' no sirve
  // y todavia no se sabe que tamanio hace falta.
  var muestra = document.querySelector('.grid .card');
  var ancho = anchoPara(muestra ? muestra.getBoundingClientRect().width || 420 : 420);
  document.querySelectorAll('.grid .card').forEach(function(b){
    if (b.__img && b.__cover) b.__img.src = alAncho(b.__cover, ancho);
  });

  aplicarFiltro();
}

function aplicarFiltro(){
  var campo = document.getElementById('buscar');
  var q = campo ? normalizar(campo.value.trim()) : '';
  var terminos = q.split(/\s+/).filter(Boolean);
  var visibles = 0;

  var grid = document.getElementById('grid');
  var vacio = document.getElementById('empty');
  Array.prototype.forEach.call(grid.children, function(b){
    var pasa = terminos.every(function(t){ return b.__buscable.indexOf(t) > -1; });
    b.hidden = !pasa;
    if (pasa) {
      visibles++;
      var num = b.querySelector('.num');
      if (num) num.textContent = visibles < 10 ? '0' + visibles : String(visibles);
    }
  });
  document.getElementById('count').textContent = visibles;
  if (vacio) {
    // Buscando, el aviso dice otra cosa: no es que no haya perfiles, es
    // que ninguno coincide.
    vacio.hidden = visibles > 0;
    if (!visibles && terminos.length) { vacio.dataset.original = vacio.dataset.original || vacio.innerHTML; vacio.textContent = 'Ninguna coincidencia en esta vista.'; }
    else if (vacio.dataset.original) { vacio.innerHTML = vacio.dataset.original; }
  }

  var nota = document.getElementById('notaBusqueda');
  var limpiar = document.getElementById('limpiar');
  if (limpiar) limpiar.hidden = !terminos.length;
  if (nota) {
    nota.hidden = !terminos.length;
    nota.textContent = visibles === 1 ? '1 modelo encontrada' : visibles + ' modelos encontradas';
  }
  observe();
}

document.querySelectorAll('.segnav__b').forEach(function(b){
  b.addEventListener('click', function(){
    if (b.hasAttribute('data-vacio')) return;
    var destino = document.getElementById(b.dataset.ir);
    if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

(function(){
  var campo = document.getElementById('buscar');
  var limpiar = document.getElementById('limpiar');
  if (!campo) return;
  campo.addEventListener('input', aplicarFiltro);
  campo.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { campo.value = ''; aplicarFiltro(); }
  });
  if (limpiar) limpiar.addEventListener('click', function(){
    campo.value = ''; campo.focus(); aplicarFiltro();
  });
})();

/* ---------- detalle ---------- */
var cur = -1;

/* Las fotos del perfil no se mueven solas: cambian unicamente cuando la
   visitante toca una miniatura. Antes pasaban solas y al pasar el cursor,
   y la ficha se leia con la foto cambiando debajo. */
var photoIdx = 0, showPhoto = null;

function row(k,v){
  if (!v) return '';
  return '<div class="spec"><dt>'+k+'</dt><dd>'+v+'</dd></div>';
}

function openDetail(i, push){
  var n = MODELS.length;
  cur = ((i % n) + n) % n;
  var m = MODELS[cur];

  // La numeracion es la de esta vista, no la de la lista completa.
  var pos = LISTA.indexOf(cur);
  document.getElementById('dIndex').textContent = pos > -1
    ? 'Perfil ' + pad(pos+1) + ' / ' + pad(LISTA.length)
    : 'Perfil';
  document.getElementById('dName').textContent = m.name;
  document.getElementById('dAge').textContent = m.age ? m.age + ' AÑOS' : '';
  document.getElementById('dGhost').textContent = pad((pos > -1 ? pos : cur) + 1);

  document.getElementById('dMeasure').innerHTML =
    '<div><b>'+m.b+'</b><span>Busto</span></div>' +
    '<div><b>'+m.c+'</b><span>Cintura</span></div>' +
    '<div><b>'+m.ca+'</b><span>Cadera</span></div>';

  document.getElementById('dSpecs').innerHTML =
    row('Altura', m.alt ? m.alt + ' m' : '') +
    row('Ciudad', m.ciudad) +
    row('Calce', m.calce) +
    row('Vestido / remera', m.vestido) +
    row('Pantalón', m.pantalon);

  var main = document.getElementById('dMain');
  var thumbs = document.getElementById('dThumbs');
  var count = document.getElementById('dCount');
  var total = m.fotos.length;

  photoIdx = 0;

  // Cambia la foto principal y sincroniza miniatura + contador.
  showPhoto = function(k){
    photoIdx = ((k % total) + total) % total;
    main.src = alAncho(photo(m, m.fotos[photoIdx]), 1400);
    count.textContent = pad(photoIdx+1) + ' / ' + pad(total);
    [].forEach.call(thumbs.children, function(c, i){
      c.classList.toggle('sel', i === photoIdx);
    });
  };

  // Si una foto no se puede mostrar (formato no soportado, archivo roto),
  // se quita su miniatura en vez de dejar un hueco.
  main.onerror = function(){
    if (total > 1) showPhoto(photoIdx + 1);
  };

  thumbs.innerHTML = '';
  m.fotos.forEach(function(f, k){
    var t = document.createElement('button');
    t.type = 'button'; t.className = 'thumb' + (k===0 ? ' sel' : '');
    t.setAttribute('aria-label', 'Foto ' + (k+1) + ' de ' + m.name);
    var ti = new Image(); ti.src = alAncho(photo(m,f), 200); ti.alt = ''; ti.loading = 'lazy';
    ti.onerror = function(){ t.style.display = 'none'; };
    t.appendChild(ti);
    t.addEventListener('click', function(){ showPhoto(k); });
    thumbs.appendChild(t);
  });
  main.src = alAncho(photo(m, m.fotos[0]), 1400);
  main.alt = m.name;
  count.textContent = pad(1) + ' / ' + pad(total);

  var d = document.getElementById('detail');
  d.classList.add('open');
  d.setAttribute('aria-hidden','false');
  d.scrollTop = 0;
  document.body.classList.add('locked');
  if (push !== false) history.replaceState(null, '', '#' + slug(m.name));
}

/* Las flechas se mueven dentro de la vista actual, no por toda la lista. */
function vecino(paso){
  if (!LISTA.length) return;
  var pos = LISTA.indexOf(cur);
  pos = pos < 0 ? 0 : (pos + paso + LISTA.length) % LISTA.length;
  openDetail(LISTA[pos]);
}

function closeDetail(){
  var d = document.getElementById('detail');
  d.classList.remove('open');
  d.setAttribute('aria-hidden','true');
  document.body.classList.remove('locked');
  showPhoto = null;
  cur = -1;
  history.replaceState(null, '', location.pathname);
}


/* ---------- reveal ---------- */
/* Etiqueta los textos que aún no tienen animación de entrada. */
var ANIM_SEL = [
  '.band .label', '.band .dash'
  // El footer queda fuera a proposito: si el reveal no dispara, no se ve.
].join(',');

function tagAnimTargets(){
  document.querySelectorAll('footer [data-reveal]').forEach(function(el){
    el.removeAttribute('data-reveal');
    el.style.transitionDelay = '';
  });
  var groups = new Map();
  document.querySelectorAll(ANIM_SEL).forEach(function(el){
    if (el.hasAttribute('data-reveal')) return;
    el.setAttribute('data-reveal','');
    var p = el.parentElement;
    var n = groups.get(p) || 0;
    groups.set(p, n + 1);
    el.style.transitionDelay = Math.min(n,6) * 0.08 + 's';
  });
}

function checkReveal(){
  var h = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll('[data-reveal]:not(.in)').forEach(function(el){
    var r = el.getBoundingClientRect();
    if (r.top < h * 0.92 && r.bottom > 0) el.classList.add('in');
  });
}
var io = null;
function observe(){
  if ('IntersectionObserver' in window){
    if (!io){
      io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin:'0px 0px -8% 0px', threshold:0.06 });
    }
    document.querySelectorAll('[data-reveal]:not(.in)').forEach(function(el){ io.observe(el); });
  }
  checkReveal();
}
function onScroll(){
  document.body.classList.toggle('scrolled', window.pageYOffset > 20);
  checkReveal();
}

/* ---------- eventos ---------- */
document.addEventListener('click', function(e){
  var card = e.target.closest && e.target.closest('.card');
  if (card){ openDetail(+card.getAttribute('data-i')); return; }
  if (e.target.closest && e.target.closest('#dClose')){ closeDetail(); return; }
  if (e.target.closest && e.target.closest('#dPrev')){ vecino(-1); return; }
  if (e.target.closest && e.target.closest('#dNext')){ vecino(1); return; }
  if (e.target.closest && e.target.closest('#dCta')){
    location.href = 'index.html#contacto';
  }
});
document.addEventListener('keydown', function(e){
  if (cur < 0) return;
  if (e.key === 'Escape') closeDetail();
  else if (e.key === 'ArrowLeft') vecino(-1);
  else if (e.key === 'ArrowRight') vecino(1);
});

/* Menu movil */
(function(){
  var b = document.getElementById('burger');
  var m = document.getElementById('mmenu');
  var x = document.getElementById('mclose');
  if (!b || !m) return;
  function set(open){
    m.classList.toggle('open', open);
    m.setAttribute('aria-hidden', open ? 'false' : 'true');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('locked', open);
  }
  b.addEventListener('click', function(){ set(true); });
  x.addEventListener('click', function(){ set(false); });
  m.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ set(false); });
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') set(false); });
})();

/* Si Supabase esta configurado y tiene modelos cargadas, se usan esas.
   Si no, se mantiene la lista escrita en este archivo: asi el sitio nunca
   queda vacio por un problema de conexion. */
function desdeSupabase(){
  var sb = window.lsSupabase;
  if (!sb) return Promise.resolve(null);
  return sb.from('models').select('*').eq('publicada', true)
    .order('segmento').order('orden').order('nombre')
    .then(function(r){
      if (r.error || !r.data || !r.data.length) return null;
      return r.data.map(function(m){
        return {
          name: m.nombre, age: m.edad, alt: m.altura,
          b: m.busto, c: m.cintura, ca: m.cadera,
          calce: m.calce, vestido: m.vestido, pantalon: m.pantalon,
          ciudad: m.ciudad,
          seg: m.segmento,
          cover: m.cover || (m.fotos && m.fotos[0]) || '',
          pos: m.cover_pos || 'center 20%',
          dir: '', fotos: (m.fotos && m.fotos.length) ? m.fotos : (m.cover ? [m.cover] : [])
        };
      }).filter(function(m){ return m.cover; });
    })
    .catch(function(){ return null; });
}

document.getElementById('year').textContent = new Date().getFullYear();

/* Los datos de contacto del pie se editan en el panel. Si no llegan, se
   quedan los que ya estan escritos en la pagina. */
if (window.lsContacto) window.lsContacto().then(function(c){
  if (!c) return;
  var ig = document.getElementById('fIg');
  if (ig && c.instagram) ig.href = 'https://instagram.com/' + c.instagram;
  var correo = document.getElementById('fMail');
  if (correo && c.email) correo.href = 'mailto:' + c.email;
  var wa = document.getElementById('fWa');
  if (wa && c.whatsapp) {
    wa.href = 'https://wa.me/' + c.whatsapp;
    wa.target = '_blank'; wa.rel = 'noopener';
  }
});
renderGrid();
desdeSupabase().then(function(remotas){
  if (!remotas) return;             // se queda con la lista local

  // Si ya hay un perfil abierto se lo recuerda POR NOMBRE: cur es una
  // posicion dentro de la lista vieja y en la nueva puede caer en otra
  // modelo. Antes se quedaba ademas con la numeracion de la lista local
  // ("06 / 06" con ocho perfiles en pantalla).
  var abierta = cur > -1 && MODELS[cur] ? slug(MODELS[cur].name) : null;
  cur = -1;
  MODELS = remotas;
  renderGrid();

  if (abierta) {
    var i = -1;
    MODELS.forEach(function(m, k){ if (slug(m.name) === abierta) i = k; });
    if (i > -1) openDetail(i, false);
    else closeDetail();   // ya no esta publicada
    return;
  }
  // La lista de la base puede ubicar a la modelo del enlace en otra vista,
  // o traer una que no estaba en la lista local.
  abrirPorHash();
});
tagAnimTargets();
observe();
window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', checkReveal);
window.addEventListener('load', checkReveal);
onScroll();
setTimeout(checkReveal, 400);

/* Abre la ficha que pida el hash. El carrusel del inicio usa nombres mas
   cortos que el listado ("cecilia-caffarena" por "cecilia-caffarena-clerch"),
   asi que se acepta un prefijo mientras apunte a una sola modelo. */
function abrirPorHash(){
  var want = location.hash.slice(1);
  if (!want) return;
  var exacto = -1, porPrefijo = [];
  MODELS.forEach(function(m,i){
    var sl = slug(m.name);
    if (sl === want) exacto = i;
    else if (sl.indexOf(want + '-') === 0) porPrefijo.push(i);
  });
  var elegida = exacto > -1 ? exacto : (porPrefijo.length === 1 ? porPrefijo[0] : -1);
  if (elegida < 0) return;

  // El perfil puede ser de otra vista: se lo lleva a la pagina que le
  // toca. La marca en sessionStorage evita un ida y vuelta sin fin si la
  // lista local y la de la base no coinciden en el segmento.
  var seg = segDe(MODELS[elegida]);
  if (seg !== SEG_ACTUAL) {
    try {
      if (sessionStorage.getItem('ismodel-salto') !== want) {
        sessionStorage.setItem('ismodel-salto', want);
        location.replace(archivoDe(seg) + '#' + want);
        return;
      }
    } catch (e) { /* modo privado: se abre aca y listo */ }
  } else {
    // Llego a la pagina que le tocaba: se borra la marca. Si quedara
    // puesta, la segunda visita al mismo perfil en la misma sesion ya no
    // saltaria y se abriria en la vista equivocada.
    try { sessionStorage.removeItem('ismodel-salto'); } catch (e) {}
  }
  openDetail(elegida, false);
}
abrirPorHash();
// Tambien si el hash cambia con la pagina ya abierta.
window.addEventListener('hashchange', abrirPorHash);
