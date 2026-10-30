import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const versions = new Map<string, string>();
// Archivos públicos con caché larga: una modificación cambia su URL de entrega.
export function assetUrl(path: string) {
  if (!versions.has(path)) versions.set(path, createHash('sha256').update(readFileSync(`public${path}`)).digest('hex').slice(0, 12));
  return `${path}?v=${versions.get(path)}`;
}
