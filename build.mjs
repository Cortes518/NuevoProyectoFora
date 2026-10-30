// Genera dist/ para desplegar: minifica CSS y JS con hash en el nombre (caché larga segura),
// comprime el HTML y copia fuentes y música. Uso: npm run build
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');

const { metafile } = await build({
  entryPoints: ['styles.css', 'main.js'],
  outdir: 'dist',
  entryNames: '[name]-[hash]',
  minify: true,
  metafile: true,
  logLevel: 'warning',
});

let html = readFileSync('index.html', 'utf8');
for (const out of Object.keys(metafile.outputs)) {
  const hashed = out.split('/').pop();                       // styles-AB12CD34.css
  const plain = hashed.replace(/-[A-Z0-9]+(\.\w+)$/, '$1');  // styles.css
  if (!html.includes(`"${plain}"`)) throw new Error(`index.html no referencia ${plain}`);
  html = html.replace(`"${plain}"`, `"${hashed}"`);
}
html = html.replace(/<!--[\s\S]*?-->/g, '').replace(/\s{2,}/g, ' ');

// La CSP de vercel.json solo deja correr el script inline con este hash: si se edita, hay que actualizarlo allí.
const inline = /<script>([\s\S]*?)<\/script>/.exec(html)[1];
const hash = `'sha256-${createHash('sha256').update(inline).digest('base64')}'`;
if (!readFileSync('vercel.json', 'utf8').includes(hash)) {
  throw new Error(`El script inline cambió. Pon ${hash} en script-src de vercel.json`);
}

writeFileSync('dist/index.html', html);
for (const dir of ['fonts', 'musica', 'img', 'logo']) cpSync(dir, `dist/${dir}`, { recursive: true });
console.log('dist/ listo');
