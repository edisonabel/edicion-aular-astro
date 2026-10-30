// Deriva todos los iconos del símbolo vectorial existente de Edición Aular.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile('public/img/favicon.svg');
await mkdir('public/icons', { recursive: true });
await writeFile('public/favicon.svg', source.toString('utf8').replace(/[\t ]+$/gm, ''));
const png = size => sharp(source).resize(size, size).png().toBuffer();
for (const [path, size] of [
  ['public/favicon.png', 96], ['public/img/favicon.png', 32],
  ['public/apple-touch-icon.png', 180],
  ['public/icons/icon-192.png', 192], ['public/icons/icon-512.png', 512],
]) await writeFile(path, await png(size));

// Compatibilidad con el manifiesto anterior que apuntaba a rutas inexistentes.
for (const size of [192, 512]) await copyFile(`public/icons/icon-${size}.png`, `public/img/icon-${size}.png`);

// El dibujo queda dentro de la zona central segura de un icono maskable.
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#101115' } })
  .composite([{ input: await png(320), gravity: 'centre' }]).png().toFile('public/icons/maskable-512.png');

// ICO con entradas PNG de 16, 32 y 48 px. Sin redibujar ni cambiar la marca.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((bytes, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(bytes.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));
console.log('Iconos de Edición Aular generados desde public/img/favicon.svg.');
