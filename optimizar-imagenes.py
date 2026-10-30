"""Convierte los originales (assets/, logos/) en los archivos livianos que usa la web (img/, logo/).
Uso: python optimizar-imagenes.py   (requiere Pillow). Imprime el manifiesto que va en main.js (const PH)."""
import io, os
from PIL import Image, ImageCms, ImageOps

Image.MAX_IMAGE_PIXELS = None
ANCHOS = (640, 1280, 1920)
RENOMBRAR = {'c.jpeg': 'c0'}  # c.jpeg y c.jpg compartirían nombre
LOGOS = {'20.png': 'fora-visual', '25.png': 'fora-sello'}  # versiones blancas con transparencia: la web las tiñe con CSS
SRGB = ImageCms.createProfile('sRGB')

os.makedirs('img', exist_ok=True)
os.makedirs('logo', exist_ok=True)
manifiesto = {}
for f in sorted(os.listdir('assets')):
    nombre = RENOMBRAR.get(f, os.path.splitext(f)[0])
    im = ImageOps.exif_transpose(Image.open(os.path.join('assets', f)))
    icc = im.info.get('icc_profile')
    if icc:
        try: im = ImageCms.profileToProfile(im.convert('RGB'), ImageCms.ImageCmsProfile(io.BytesIO(icc)), SRGB, outputMode='RGB')
        except Exception: pass
    im = im.convert('RGB')
    w, h = im.size
    # el lado mayor no pasa de 1920 (así una foto vertical no sale enorme); si el original es chico se exporta tal cual
    tope = round(w * min(1, ANCHOS[-1] / max(w, h)))
    anchos = sorted({a for a in ANCHOS if a < tope * .85} | {tope})
    for a in anchos:
        im.resize((a, round(h * a / w)), Image.LANCZOS).save(f'img/{nombre}-{a}.webp', quality=72, method=6)
    manifiesto[nombre] = [anchos[-1], round(h * anchos[-1] / w), anchos]
    print(f'{f:10} {w}x{h} -> {anchos}')

for f, nombre in LOGOS.items():
    im = Image.open(os.path.join('logos', f)).convert('RGBA')
    im = im.crop(im.getchannel('A').getbbox())
    im.thumbnail((900, 900), Image.LANCZOS)
    im.save(f'logo/{nombre}.webp', lossless=True, method=6)
    print(f'logo {nombre} {im.size}')

print('const PH = ' + str(manifiesto).replace("'", '').replace(' ', '') + ';')
