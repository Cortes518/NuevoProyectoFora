(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= CONTENIDO (de la sinopsis) ================= */
const CH = [
  { id: 'medellin', city: 'Medellín', xy: [475, 148], sub: 'La calle, la resistencia y el lenguaje urbano',
    role: 'El encuentro con la cultura urbana y las expresiones musicales de sus barrios.',
    story: 'Medellín introduce a Rioloz en el universo del rap colombiano: un territorio de creación, trabajo y transformación. Recorrerá escaleras y esquinas, se encontrará con raperos y productores locales y conversará sobre las diferencias y conexiones entre las escenas de Colombia y Estados Unidos.',
    bul: ['Recorridos por calles, escaleras y espacios de encuentro de la cultura urbana', 'Retratos de artistas locales en sus entornos de trabajo y creación', 'Sesiones de rap y encuentros musicales en locaciones reales', 'Una secuencia de performance que conecte al artista con la energía de la ciudad'],
    visual: 'Contrastes urbanos, concreto, grafiti, escaleras, arquitectura de barrio, luces nocturnas y energía de calle.',
    sound: 'Hip hop, rap local y expresiones musicales populares. La ciudad se escucha a través de sus artistas, sus ambientes y su vida cotidiana, sin limitarse a un único género.',
    color: 'Grises urbanos, negros profundos, tonos tierra y acentos de grafiti. De noche, contrastes marcados: rap cinematográfico.',
    pal: [['#1a1b1e', 'Concreto'], ['#4a4d52', 'Gris urbano'], ['#8a6a4a', 'Tierra'], ['#ff2e88', 'Grafiti'], ['#c8ff2e', 'Luz de neón']],
    q: '¿Qué significa encontrar una cultura que comparte tu lenguaje musical, pero que ha construido su propia historia en otro territorio?' },
  { id: 'cali', city: 'Cali', xy: [310, 623], sub: 'El movimiento, la salsa y la expresión afrocolombiana',
    role: 'La fuerza de la salsa y la relación histórica de la ciudad con el baile y la música.',
    story: 'Cali explora la relación entre música, cuerpo, memoria y expresión cultural. La salsa es la puerta de entrada: instrumentos, orquestas, ensayos y espacios donde se baila. No se impone una fusión; se deja que el encuentro genere preguntas y posibilidades creativas.',
    bul: ['Registros de ensayos y espacios vinculados a la salsa', 'Planos de instrumentos, manos, pies y movimientos de baile', 'Conversaciones con músicos y bailarines sobre la historia de sus prácticas', 'Una performance que dialogue con el entorno caleño'],
    visual: 'Luz cálida, arquitectura colorida, calles con movimiento, espacios culturales y cuerpos en movimiento.',
    sound: 'La salsa tiene presencia central, junto a las conexiones culturales afrocolombianas y las manifestaciones urbanas contemporáneas.',
    color: 'Paleta cálida: amarillos, ocres, terracotas, verdes tropicales y los colores de sus fachadas.',
    pal: [['#ffc21a', 'Amarillo'], ['#c9852a', 'Ocre'], ['#c4552e', 'Terracota'], ['#2fbf6b', 'Verde tropical'], ['#3b1708', 'Sombra']],
    q: '¿Qué puede descubrir un rapero sobre su propia manera de sentir la música cuando se encuentra con una ciudad cuya historia también se expresa a través del ritmo?' },
  { id: 'bogota', city: 'Bogotá', xy: [728, 409], sub: 'La escritura, la diversidad musical y la voz del rapero',
    role: 'La diversidad de escenas musicales y las formas de construir una voz propia.',
    story: 'Bogotá profundiza en el rap como lenguaje, oficio y forma de narrar la realidad: conversaciones entre artistas, proceso de escritura, producción y las distintas maneras de construir una voz, desde la letra hasta la base y la interpretación.',
    bul: ['Conversaciones con raperos y productores sobre escritura, influencias e identidad', 'Sesiones de estudio: de la escucha a la interpretación', 'Detalles de cuadernos, micrófonos, consolas e instrumentos', 'Performance en espacios de profundidad, geometría y contraste'],
    visual: 'Ladrillo, acero, concreto, cielos nublados, geometría urbana, interiores de estudio y atmósferas de ciudad.',
    sound: 'Hip hop, rap, escenas independientes y otras expresiones que reflejan la diversidad de Bogotá, construida desde encuentros reales.',
    color: 'Grises, azules fríos, tonos de ladrillo y verdes oscuros. Planos amplios de arquitectura frente a encuadres cerrados de la creación.',
    pal: [['#5d6b78', 'Cielo nublado'], ['#7fb0d6', 'Azul frío'], ['#a8452f', 'Ladrillo'], ['#1f3a2e', 'Verde oscuro'], ['#2a3138', 'Acero']],
    q: '¿Cómo se transforma la voz de un artista cuando pone su experiencia personal en diálogo con las historias de otros?' },
  { id: 'buenaventura', city: 'Buenaventura', xy: [225, 550], sub: 'El Pacífico, la memoria sonora y el territorio vivo',
    role: 'Las sonoridades del Pacífico: marimba, cununos, bombo, guasá y voces.',
    story: 'Buenaventura introduce una dimensión sonora y territorial: escuchar y observar cómo las personas crean, preservan y transforman sus expresiones culturales. Las músicas tradicionales no son acompañamiento; se conocen sus intérpretes, sus instrumentos y su sentido para la comunidad.',
    bul: ['Planos del agua, las embarcaciones y las estructuras portuarias', 'Retratos de músicos, familias y creadores que participan voluntariamente', 'Registros de instrumentos, ensayos y ambientes sonoros', 'Rioloz escucha, observa y dialoga antes de interpretar'],
    visual: 'Verdes profundos, azules, agua, madera, vegetación, espacios portuarios y luz natural con atmósfera húmeda.',
    sound: 'Marimba de chonta, cununos, bombo, guasá, voces y cantos tradicionales, junto al hip hop y las expresiones urbanas de la ciudad.',
    color: 'Verdes profundos, azules, madera y grises portuarios; reflejos, humedad y cielos cambiantes.',
    pal: [['#0a5d63', 'Agua'], ['#2fe0c4', 'Reflejo'], ['#1f6b3a', 'Verde profundo'], ['#8a6238', 'Madera'], ['#6b7a80', 'Gris portuario']],
    q: '¿Qué puede contar un territorio a través de sus sonidos, incluso antes de que alguien escriba una letra?' },
  { id: 'condoto', city: 'Condoto', xy: [290, 343], sub: 'El origen, la familia y la memoria de los ancestros',
    role: 'La memoria familiar, las raíces ancestrales y el territorio de origen.',
    story: 'Condoto conecta a Rioloz con sus raíces familiares. No se llega con una historia predeterminada: la cámara acompaña con apertura, escucha a los mayores, recorre los espacios de la memoria y deja que aparezcan recuerdos, preguntas y emociones genuinas.',
    bul: ['Encuentros familiares y conversaciones con los mayores, con tiempo y sensibilidad', 'Recorridos por los espacios vinculados a la historia de la familia', 'Imágenes del río, la vegetación, las viviendas y los caminos', 'Momentos íntimos de Rioloz escuchando, caminando y reflexionando'],
    visual: 'Verdes tropicales, tonos de tierra, madera, agua, luz natural, espacios familiares y paisajes ligados a la historia del territorio.',
    sound: 'Músicas tradicionales y comunitarias del Chocó: voces, percusiones y chirimías, siempre desde encuentros reales y respetando sus contextos.',
    color: 'Verdes de vegetación, tonos tierra y reflejos del agua. Luz natural y retratos cercanos, sin idealizar el paisaje.',
    pal: [['#2f6b2a', 'Vegetación'], ['#7a4e2d', 'Tierra'], ['#9a7048', 'Madera'], ['#4fa6a0', 'Río'], ['#e8cf86', 'Luz natural']],
    q: '¿Qué significa regresar a la tierra de tus ancestros cuando has construido tu vida y tu carrera lejos de ella?' },
];
const COLOR = { medellin: '#ff2e88', cali: '#ffc21a', bogota: '#7fb0d6', buenaventura: '#2fe0c4', condoto: '#86c25a' };

/* ================= FOTOS ================= */
// id: [ancho, alto, anchos exportados]. Lo genera optimizar-imagenes.py a partir de assets/
const PH = {bogota2:[1920,1823,[640,1280,1920]],bogota3:[1529,860,[640,1280,1529]],cali:[1200,800,[640,1200]],cali2:[1024,1024,[640,1024]],cali3:[1280,960,[640,1280]],cali4:[1600,1066,[640,1280,1600]],otra:[960,720,[640,960]],otra2:[512,512,[512]],bg:[1200,1600,[640,1200]],b:[1920,1229,[640,1280,1920]],b1:[1920,1280,[640,1280,1920]],b2:[1920,1282,[640,1280,1920]],b3:[1920,1280,[640,1280,1920]],b5:[1920,1280,[640,1280,1920]],c0:[1440,1920,[640,1440]],c:[1706,1279,[640,1280,1706]],c1:[1920,1441,[640,1280,1920]],c2:[1072,1921,[640,1072]],c5:[1920,1263,[640,1280,1920]],c6:[1920,990,[640,1280,1920]],med1:[1920,1280,[640,1280,1920]],med2:[1168,1556,[640,1168]],med3:[1920,1080,[640,1280,1920]],med4:[1168,1556,[640,1168]],med5:[1168,1556,[640,1168]],med6:[844,1500,[640,844]],med7:[1168,1556,[640,1168]],med8:[1280,1920,[640,1280]]};
// portada y galería de cada capítulo (el prefijo del archivo indica la ciudad: med, cali, bogota, b, c)
const SHOTS = {
  medellin: { cover: ['med1', 'Rodaje en una azotea de Medellín: dos hombres frente a un camarógrafo con estabilizador, con las montañas al fondo'], gal: [
    ['med2', 'Hombre con gorra y sudadera roja sobre un puente peatonal, con el tráfico y las montañas de Medellín al fondo'], ['med3', 'Guitarrista iluminado por una luz naranja mientras un camarógrafo lo graba'], ['med4', 'Atardecer sobre los tejados de Medellín, con un avión sobre una terraza y las montañas al fondo'],
    ['med5', 'Viaducto del metro junto al Hotel Nutibara, en el centro de Medellín'], ['med6', 'Camarógrafo con cámara sobre trípode subiendo por un callejón de ladrillo con grafitis'], ['med7', 'Valle de Medellín visto desde lo alto, entre montañas y nubes'], ['med8', 'Equipo de rodaje revisando una cámara sobre un cauce pedregoso, con un foco de luz y la vegetación al fondo']] },
  cali: { cover: ['cali4', 'Orquesta en escena con clarinete, tuba y cantante bajo las luces del escenario'], gal: [
    ['cali2', 'Pareja bailando salsa en un club frente a la orquesta, bajo un cartel de Salsa en vivo'], ['cali', 'Pareja bailando en plena calle, rodeada por el público'], ['cali3', 'Calle de casas coloridas con balcones y flores']] },
  bogota: { cover: ['bogota2', 'Edificios de ladrillo iluminados al anochecer, con la calle mojada por la lluvia'], gal: [
    ['bg', 'Callejón de ladrillo y adoquines mojados, con una escultura en lo alto y gente caminando'], ['bogota3', 'Hombre pintando con aerosol un muro cubierto de grafiti de colores']] },
  buenaventura: { cover: ['b3', 'Casas sobre palafitos junto al mar bajo un cielo de tormenta'], gal: [
    ['b5', 'Muelle de madera sobre el agua, con un niño caminando'], ['b1', 'Músicos tocando marimba y percusión, con un cantante en primer plano'], ['b', 'Cuatro cantoras con vestidos blancos y sombreros en un escenario'], ['b2', 'Cantante con atuendo azul estampado sobre un escenario amarillo']] },
  condoto: { cover: ['c1', 'Río con palmeras y casas de madera en la orilla'], gal: [
    ['c6', 'Vista aérea de un pueblo rodeado por un río'], ['c2', 'Músicos con marimba y tambores en un corredor frente al río'], ['c0', 'Niño frente a un mural en una pared'], ['otra2', 'Manos con pulseras de cuentas sobre el cuero de un tambor'], ['c', 'Gente reunida en la orilla arenosa de un río'], ['c5', 'Comparsa de bailarines con trajes verdes y naranjas desfilando por la calle']] },
};
const pic = (id, alt, sizes) => {
  const [w, h, ws] = PH[id];
  return `<img src="img/${id}-${ws[ws.length - 1]}.webp" srcset="${ws.map(x => `img/${id}-${x}.webp ${x}w`).join(',')}" sizes="${sizes}" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">`;
};
const cover = c => SHOTS[c.id]?.cover ? `<figure class="cover">${pic(...SHOTS[c.id].cover, '100vw')}</figure>` : '';
const gallery = c => SHOTS[c.id] ? `<div class="gal">${SHOTS[c.id].gal.map(([id, alt], k) =>
  `<figure class="ph rv" style="--r:${Math.max(PH[id][0] / PH[id][1], .75).toFixed(3)};--d:${k % 3 * 90}ms">${pic(id, alt, '(max-width:820px) 50vw,33vw')}</figure>`).join('')}</div>` : '';

const MOV = [
  ['El artista que llega', 'Conocemos a Rioloz, su historia, su música, sus influencias y las preguntas que lo traen a Colombia.', '#ff2e88'],
  ['El artista que escucha', 'Los encuentros con músicos, productores y comunidades amplían su perspectiva. Deja de ser el único centro de la narración.', '#ffc21a'],
  ['El artista que descubre', 'Los territorios y, sobre todo, el encuentro con su historia familiar en Condoto abren preguntas que no estaban previstas.', '#2fe0c4'],
  ['El artista que transforma', 'El material humano, sonoro y visual del recorrido se conecta con su proceso musical y con su obra.', '#86c25a'],
];
const ETAPAS = [
  ['Investigación y preproducción', 'Se reconstruye la historia artística y familiar de Rioloz, se investigan los territorios y se desarrollan los conceptos iniciales de los cinco visualizers.'],
  ['Rodaje y exploración territorial', 'El equipo acompaña al artista por las cinco ciudades: entrevistas, encuentros familiares, sesiones musicales y momentos inesperados.'],
  ['Construcción del universo musical y visual', 'Se organiza el material y se construye una identidad que conecte los visualizers sin que parezcan el mismo video en lugares distintos.'],
  ['Montaje y finalización', 'Montaje documental, diseño sonoro, música, color y acabados, en paralelo con la edición de los cinco visualizers.'],
];
const VZ = [
  ['medellin', 'El rapero y la calle', 'Performance urbano, grafiti, arquitectura y el movimiento de la ciudad.', '#ff2e88', '#1a1b1e'],
  ['cali', 'Ritmo y expresión corporal', 'Música, movimiento, espacios culturales y la riqueza cromática de la ciudad.', '#ffc21a', '#a8452f'],
  ['bogota', 'Escritura e interpretación', 'Geometría urbana, interiores de estudio y contrastes arquitectónicos.', '#7fb0d6', '#1b2a38'],
  ['buenaventura', 'Paisaje y sonoridad', 'El agua, el puerto y las texturas del territorio.', '#2fe0c4', '#06403f'],
  ['condoto', 'Memoria y pertenencia', 'Una pieza íntima: paisaje, espacios familiares e historia ancestral.', '#a6cf5f', '#2a3a14'],
];

/* ================= RENDER ================= */
$('#chapters').innerHTML = CH.map((c, i) => `
<section class="chap d-${c.id}" id="${c.id}" data-theme="${c.id}" data-label="Cap. 0${i + 1} · ${c.city}">
  <div class="deco" aria-hidden="true"></div>
  ${cover(c)}
  <div class="bigword" aria-hidden="true">${(c.city.toUpperCase() + ' ').repeat(4)}</div>
  <div class="wrap">
    <p class="label rv">Capítulo 0${i + 1} / 05</p>
    <h2 class="city rv">${c.city}</h2>
    <p class="tag rv">${c.sub}</p>
    <div class="grid">
      <div class="stag"><p class="story">${c.story}</p><ul class="bul">${c.bul.map(b => `<li>${b}</li>`).join('')}</ul></div>
      <div class="stag">
        <div class="box"><h3>Identidad visual</h3><p>${c.visual}</p></div>
        <div class="box"><h3>Identidad sonora</h3><p>${c.sound}</p></div>
        <div class="box"><h3>Color y fotografía</h3><p>${c.color}</p>
          <ul class="pal">${c.pal.map(([h, n]) => `<li style="--c:${h}" tabindex="0" aria-label="${n}"><span>${n}</span></li>`).join('')}</ul></div>
      </div>
    </div>
    ${gallery(c)}
    <details class="q rv"><summary>Pregunta narrativa</summary><p>${c.q}</p></details>
  </div>
</section>`).join('');

$('#rail').innerHTML = CH.map(c => `<a href="#${c.id}" data-t="${c.id}" aria-label="${c.city}"><span>${c.city}</span></a>`).join('');
$('#track').innerHTML = MOV.map(([t, d, c], i) => `<article class="mov" style="--c:${c}"><b>0${i + 1}</b><div><h3>${t}</h3><p>${d}</p></div></article>`).join('');
$('#steps').innerHTML = ETAPAS.map(([t, d], i) => `<li data-n="${i + 1}"><h3>${t}</h3><p>${d}</p></li>`).join('');
$('#cards').innerHTML = VZ.map(([id, t, d, c1, c2], i) => `<article class="vcard fd"style="--c1:${c1};--c2:${c2};--d:${i * 90}ms"><em>0${i + 1}</em><small>${CH.find(c => c.id === id).city}</small><h3>${t}</h3><p>${d}</p></article>`).join('');

/* letras del título */
$('#raices').innerHTML = [...'RAÍCES'].map((l, i) => `<span style="--i:${i}">${l}</span>`).join('');

/* texto de sinopsis palabra por palabra (conserva los <em>) */
const wrapWords = el => [...el.childNodes].forEach(n => {
  if (n.nodeType === 3) n.replaceWith(...n.textContent.split(/(\s+)/).map(t => {
    if (!/\S/.test(t)) return document.createTextNode(t);
    const s = document.createElement('span'); s.className = 'w'; s.textContent = t; return s;
  }));
  else wrapWords(n);
});
wrapWords($('#words'));
const words = $$('#words .w');

/* ================= REVELADO, TEMAS, CONTADORES ================= */
$$('.stag').forEach(g => [...g.children].filter(c => c.localName !== 'img').forEach((c, i) => { c.classList.add('rv'); c.style.setProperty('--d', i * 110 + 'ms'); }));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.rv,.fd').forEach(el => io.observe(el));

let cur = 'root', lock = false;
const now = $('#now');
const applyTheme = () => { document.body.dataset.theme = lock ? lock : cur; };
const themeIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  cur = e.target.dataset.theme; now.textContent = e.target.dataset.label; applyTheme(); syncSoon();
  $$('#rail a').forEach(a => a.classList.toggle('on', a.dataset.t === cur));
}), { rootMargin: '-49% 0px -49% 0px' });
$$('[data-theme]').forEach(s => s !== document.body && themeIO.observe(s));
// capítulos cerca de la pantalla: el resto pausa sus animaciones (ver .live en styles.css)
const liveIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('live', e.isIntersecting)), { rootMargin: '50% 0px' });
$$('.chap').forEach(c => liveIO.observe(c));

const countIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const to = +e.target.dataset.count, t0 = performance.now();
  const f = t => { const k = clamp((t - t0) / 1300); e.target.textContent = Math.round(to * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}), { threshold: .6 });
$$('[data-count]').forEach(el => countIO.observe(el));

/* ================= MAPA DEL RECORRIDO ================= */
const path = $('#path'), L = path.getTotalLength();
path.style.strokeDasharray = L;
$('#nodes').innerHTML = CH.map((c, i) => { const left = c.id === 'bogota' || c.id === 'buenaventura'; return `<g class="node" data-i="${i}" tabindex="0" role="link" aria-label="${c.city}" style="--k:${COLOR[c.id]}">
  <circle class="ring" cx="${c.xy[0]}" cy="${c.xy[1]}" r="12"/>
  <circle cx="${c.xy[0]}" cy="${c.xy[1]}" r="12"/>
  <text x="${c.xy[0] + (left ? -24 : 24)}" y="${c.xy[1] + 6}" ${left ? 'text-anchor="end"' : ''}>${c.city}</text></g>`; }).join('');
const nodes = $$('.node');
nodes.forEach(n => n.addEventListener('click', () => { location.hash = CH[n.dataset.i].id; }));
// posición de cada ciudad a lo largo de la ruta, para encenderla cuando el trazo llega
const frac = CH.map(c => { let best = 0, bd = 1e9; for (let i = 0; i <= 500; i++) { const p = path.getPointAtLength(L * i / 500); const d = (p.x - c.xy[0]) ** 2 + (p.y - c.xy[1]) ** 2; if (d < bd) { bd = d; best = i / 500; } } return best; });
const stopEl = $('#stop'); let lastStop = -2;
const setStop = i => {
  if (i === lastStop) return; lastStop = i;
  stopEl.innerHTML = i < 0 ? '<p>Desliza para iniciar el viaje.</p>' : `<b>0${i + 1}</b><h3>${CH[i].city}</h3><p>${CH[i].role}</p>`;
  stopEl.classList.remove('swap'); void stopEl.offsetWidth; stopEl.classList.add('swap');
};
const route = p => {
  const q = clamp(p / .9);
  path.style.strokeDashoffset = L * (1 - q);
  let last = -1;
  nodes.forEach((n, i) => { const on = q > frac[i] + .0001; n.classList.toggle('on', on); if (on) last = i; });
  setStop(last);
};
setStop(-1);

/* ================= LOOP DE SCROLL ================= */
const pins = $$('.pin'), progs = $$('.prog');
const synEl = $('#sinopsis'), routeEl = $('#recorrido');
let ticking = false;
const bar = $('.bar');
const update = () => {
  ticking = false;
  const H = innerHeight;
  // primero todas las lecturas de layout y después las escrituras: evita recalcular estilos varias veces por fotograma
  const sp = clamp(scrollY / (document.documentElement.scrollHeight - H));
  const ps = pins.map(el => { const r = el.getBoundingClientRect(); return r.bottom < -H || r.top > 2 * H ? null : clamp(-r.top / (r.height - H)); });
  const gs = progs.map(el => { const r = el.getBoundingClientRect(); return r.bottom < 0 || r.top > H ? null : clamp((H - r.top) / (H + r.height)); });
  bar.style.setProperty('--sp', sp);
  pins.forEach((el, i) => {
    const p = ps[i];
    if (p === null) return;
    el.style.setProperty('--p', p.toFixed(4));
    if (el === synEl) { const n = Math.floor(clamp(p / .8) * (words.length + 1)); words.forEach((w, k) => w.classList.toggle('on', k < n)); }
    if (el === routeEl) route(p);
  });
  progs.forEach((el, i) => { if (gs[i] !== null) el.style.setProperty('--p', gs[i].toFixed(4)); });
};
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
addEventListener('scroll', req, { passive: true });
addEventListener('resize', req);
update();

/* brillo que sigue al cursor (las variables van en el propio elemento: en <html> se heredarían a todo el documento) */
const glow = $('.glow');
let mx = .5, my = .5;
addEventListener('pointermove', e => {
  glow.style.setProperty('--x', e.clientX + 'px');
  glow.style.setProperty('--y', e.clientY + 'px');
  mx = e.clientX / innerWidth; my = e.clientY / innerHeight;
}, { passive: true });

/* muestras de color: en pantallas táctiles no hay hover, así que el toque muestra el nombre */
$$('.pal li').forEach(li => li.addEventListener('click', () => {
  $$('.pal li.show').forEach(x => x !== li && x.classList.remove('show'));
  li.classList.toggle('show');
}));

/* tarjetas de visualizers con inclinación 3D */
$$('.vcard').forEach(c => {
  c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--ry', ((x - .5) * 16).toFixed(1) + 'deg');
    c.style.setProperty('--rx', ((.5 - y) * 16).toFixed(1) + 'deg');
    c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
  });
  c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
});

/* ================= CANVAS: ONDA DEL HERO + ANALIZADOR ================= */
const fit = cv => { const d = Math.min(devicePixelRatio || 1, 1.5); cv.width = cv.clientWidth * d; cv.height = cv.clientHeight * d; };
const wave = $('#wave'), wx = wave.getContext('2d'), viz = $('#viz'), vx = viz.getContext('2d');
let heroOn = true, vizOn = false, playing = null, lastW = 0;
new IntersectionObserver(([e]) => heroOn = e.isIntersecting).observe($('#inicio'));
new IntersectionObserver(([e]) => vizOn = e.isIntersecting).observe(viz);
const sizeAll = () => { fit(wave); fit(viz); };
// en móvil la barra del navegador dispara resize al hacer scroll: solo se reajusta si cambia el ancho
addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; sizeAll(); } });
lastW = innerWidth; sizeAll();

// getComputedStyle en cada fotograma fuerza recalcular estilos: el color se lee 4 veces por segundo
let accent = '#f2a93b', accentT = -1e3;
const readAccent = t => { if (t - accentT > 250) { accent = getComputedStyle(document.body).getPropertyValue('--ac'); accentT = t; } return accent; };
const drawWave = t => {
  const w = wave.width, h = wave.height;
  wx.clearRect(0, 0, w, h);
  wx.strokeStyle = readAccent(t);
  wx.lineWidth = 1.5 * (w / wave.clientWidth);
  for (let l = 0; l < 10; l++) {
    wx.globalAlpha = .07 + .5 * (1 - l / 10);
    wx.beginPath();
    for (let x = 0; x <= w; x += 10) {
      const nx = x / w, near = .35 + .65 * Math.exp(-(((nx - mx) * 3) ** 2));
      const a = (h * .05 + h * .08 * (1 - my)) * near;
      const y = h * .62 + Math.sin(nx * 7 + t * .0011 + l * .45) * a + Math.sin(nx * 15 - t * .0008 + l) * a * .35 + l * 7;
      x ? wx.lineTo(x, y) : wx.moveTo(x, y);
    }
    wx.stroke();
  }
};
let freq = null;
const drawViz = t => {
  const w = viz.width, h = viz.height;
  vx.clearRect(0, 0, w, h);
  vx.fillStyle = playing ? playing.color : readAccent(t);
  const n = 64, bw = w / n;
  let data = null;
  if (playing && an) { data = freq || (freq = new Uint8Array(an.frequencyBinCount)); an.getByteFrequencyData(data); }
  for (let i = 0; i < n; i++) {
    const v = data ? data[Math.floor(i * .75)] / 255 : .05 + .04 * Math.sin(i * .5 + t * .002);
    const bh = Math.max(4, v * h * .95);
    vx.globalAlpha = .35 + .65 * v;
    vx.beginPath(); vx.roundRect(i * bw + bw * .15, (h - bh) / 2, bw * .7, bh, bw * .35); vx.fill();
  }
  vx.globalAlpha = 1;
};
let lastWave = 0;
const frame = t => {
  // la onda del hero va a ~30 fps: a simple vista es igual y cuesta la mitad
  if (!reduce) { if (heroOn && t - lastWave > 30) { lastWave = t; drawWave(t); } if (vizOn || playing) drawViz(t); }
  requestAnimationFrame(frame);
};
if (reduce) { drawWave(0); drawViz(0); } else requestAnimationFrame(frame);

/* ================= MÚSICA (musica/*.mp3): la de cada ciudad (1:15) y la pasiva (3:13), todas en bucle ================= */
const FILE = { medellin: 'Medellin', cali: 'Cali', bogota: 'Bogota', buenaventura: 'Buenaventura', condoto: 'Condoto', pasiva: 'Pasiva' };
const music = new Audio(); music.loop = true; music.volume = 0;
const MAXV = .75, VOL = { pasiva: .45 }; // la pasiva va más baja; el archivo ya se grabó con -6 dB para que también lo esté en iOS
let want = false, track = null, fadeT, syncT, calmAt = 0;
// shortcut: iOS ignora audio.volume, ahí el cambio entre canciones es un corte y no un fundido
const fade = (to, ms, done) => {
  clearInterval(fadeT);
  const from = music.volume, t0 = performance.now();
  fadeT = setInterval(() => {
    const k = clamp((performance.now() - t0) / ms);
    music.volume = from + (to - from) * k;
    if (k === 1) { clearInterval(fadeT); done && done(); }
  }, 40);
};
const ui = () => {
  [$('#snd'), $('#enter')].forEach(b => b.setAttribute('aria-pressed', want));
  $('#snd').setAttribute('aria-label', want ? 'Silenciar música' : 'Activar música');
  $('#enter-t').textContent = want ? 'Música activada' : 'Activar música';
};
// suena la canción de la ciudad cuya sección está en pantalla; en las demás, la pasiva (retoma donde iba).
// Con un boceto del analizador sonando, la música se calla
const doSync = () => {
  const id = want && !document.hidden && !playing ? (FILE[cur] ? cur : 'pasiva') : null;
  if (id === track) return;
  track = id;
  fade(0, music.paused ? 1 : 500, () => {
    if (music.src.endsWith(`/${FILE.pasiva}.mp3`)) calmAt = music.currentTime;
    if (!id) return music.pause();
    const src = `musica/${FILE[id]}.mp3`;
    if (!music.src.endsWith(src)) { music.src = src; if (id === 'pasiva') music.currentTime = calmAt; }
    music.play().then(() => { if (track === id) fade(VOL[id] ?? MAXV, id === 'pasiva' ? 2500 : 900); })
      .catch(e => { if (e.name === 'NotAllowedError') { want = false; track = null; ui(); } });
  });
};
const syncSoon = () => { clearTimeout(syncT); syncT = setTimeout(doSync, 350); }; // evita cambiar de canción al pasar rápido
const toggleMusic = () => {
  want = !want; ui();
  if (want) {
    // el navegador exige reproducir dentro del gesto del usuario; se "desbloquea" aquí y doSync decide qué suena
    if (!music.src) music.src = `musica/${FILE.pasiva}.mp3`;
    music.volume = 0; music.play().catch(() => {});
    track = -1;
  }
  doSync();
};
$('#snd').addEventListener('click', toggleMusic);
$('#enter').addEventListener('click', toggleMusic);
document.addEventListener('visibilitychange', doSync);

/* ================= AUDIO: bocetos sintéticos por territorio ================= */
let ac, master, an, noiseBuf, timer, step = 0, nextT = 0;
const initAudio = () => {
  if (ac) return ac.resume();
  ac = new (window.AudioContext || window.webkitAudioContext)();
  master = ac.createGain(); master.gain.value = .75;
  an = ac.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = .8;
  master.connect(an); an.connect(ac.destination);
  noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
};
const env = (g, t, v, d) => { g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); };
const tone = (t, f, d, type = 'sine', v = .5, f2) => {
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d * .6);
  env(g, t, v, d); o.connect(g).connect(master); o.start(t); o.stop(t + d + .05);
};
const noise = (t, d, type, freq, v) => {
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; env(g, t, v, d);
  s.connect(f).connect(g).connect(master); s.start(t, Math.random() * .5); s.stop(t + d + .05);
};
const D = {
  kick: t => tone(t, 150, .4, 'sine', 1, 42),
  sub: (t, f) => tone(t, f, .45, 'sine', .8),
  snare: t => { noise(t, .16, 'highpass', 1800, .5); tone(t, 190, .1, 'triangle', .4); },
  hat: t => noise(t, .04, 'highpass', 7500, .22),
  clave: t => tone(t, 2300, .07, 'sine', .6),
  cow: t => { tone(t, 560, .2, 'square', .1); tone(t, 845, .2, 'square', .1); },
  conga: (t, f) => tone(t, f, .22, 'sine', .7, f * .7),
  bombo: t => tone(t, 110, .55, 'sine', 1, 55),
  shk: t => noise(t, .09, 'bandpass', 5200, .3),
  mar: (t, f) => { tone(t, f, .6, 'triangle', .5); tone(t, f * 3, .15, 'sine', .12); },
  key: (t, f) => tone(t, f, .9, 'triangle', .12),
  flute: (t, f) => {
    const o = ac.createOscillator(), g = ac.createGain(), l = ac.createOscillator(), lg = ac.createGain();
    o.frequency.value = f; l.frequency.value = 5; lg.gain.value = f * .012; l.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(.001, t); g.gain.linearRampToValueAtTime(.3, t + .12); g.gain.exponentialRampToValueAtTime(.001, t + 1.1);
    o.connect(g).connect(master); o.start(t); l.start(t); o.stop(t + 1.2); l.stop(t + 1.2);
  },
};
// 16 pasos por compás: [instrumento, pasos, nota o lista de notas que se alternan]
const PAT = {
  medellin: { bpm: 92, sub: 'Pulso de barrio, rap local y sesiones', hits: [['kick', [0, 7, 10]], ['snare', [4, 12]], ['hat', [0, 2, 4, 6, 8, 10, 12, 14, 15]], ['sub', [0, 10], 49]] },
  cali: { bpm: 100, sub: 'Salsa, orquestas y espacios de baile', hits: [['clave', [0, 3, 6, 10, 12]], ['cow', [0, 4, 8, 12]], ['conga', [2, 6, 10, 14], 210], ['conga', [3, 7, 11, 15], 160], ['sub', [3, 8, 11], [55, 65.4, 73.4]]] },
  bogota: { bpm: 84, sub: 'Estudios, voces y escenas diversas', hits: [['kick', [0, 5, 8, 11]], ['snare', [4, 12]], ['hat', [2, 6, 10, 14]], ['key', [0, 8], 220], ['key', [0, 8], 261.6], ['key', [0, 8], 329.6], ['key', [0, 8], 392], ['key', [10], 174.6], ['key', [10], 220], ['key', [10], 261.6], ['key', [10], 329.6]] },
  buenaventura: { bpm: 104, sub: 'Marimba, cununos, bombo y guasá', hits: [['bombo', [0, 8, 11]], ['shk', [0, 2, 4, 6, 8, 10, 12, 14]], ['conga', [4, 10, 12], 420], ['mar', [0, 3, 6, 8, 11, 14], [329.6, 392, 440, 493.9, 587.3, 440]]] },
  condoto: { bpm: 76, sub: 'Voces, percusiones y chirimías del Chocó', hits: [['bombo', [0, 10]], ['shk', [4, 12]], ['conga', [6, 14], 300], ['flute', [0, 8], [293.7, 392]], ['flute', [12], 349.2]] },
};
const tick = () => {
  const P = playing.pat, sd = 60 / P.bpm / 4;
  while (nextT < ac.currentTime + .12) {
    P.hits.forEach(([n, s, a]) => { const i = s.indexOf(step); if (i > -1) D[n](nextT, Array.isArray(a) ? a[i % a.length] : a); });
    nextT += sd; step = (step + 1) % 16;
  }
};
const stop = () => {
  clearInterval(timer); playing = null; lock = false; applyTheme();
  $$('.pad').forEach(p => p.setAttribute('aria-pressed', 'false'));
  syncSoon(); // vuelve la música de fondo
};
$('#pads').innerHTML = CH.map(c => `<button class="pad fd"style="--c:${COLOR[c.id]}" data-id="${c.id}" aria-pressed="false"><h3>${c.city}</h3><small>${PAT[c.id].sub}</small><i>Escuchar</i></button>`).join('');
$$('.pad').forEach(b => io.observe(b));
$$('.pad').forEach(b => b.addEventListener('click', async () => {
  const wasOn = playing && playing.id === b.dataset.id;
  if (playing) stop();
  if (wasOn) return;
  await initAudio();
  playing = { id: b.dataset.id, pat: PAT[b.dataset.id], color: COLOR[b.dataset.id] };
  b.setAttribute('aria-pressed', 'true');
  lock = b.dataset.id; applyTheme();
  step = 0; nextT = ac.currentTime + .05;
  timer = setInterval(tick, 25);
  doSync(); // calla la música de fondo mientras suena el boceto
}));
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stop(); });
})();
