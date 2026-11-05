import sanitizeHtml from 'sanitize-html';

export const EDITOR_EMAIL = 'edicionaular@gmail.com';
export const EDITOR_ROLE = 'editorial-admin';
export const DRAFT_KEY = 'drafts';
export const DRAFT_STORE = 'editorial-private';
export const BLOG_PATH = 'src/data/blog.json';
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const colombiaDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export function isEditor(user) {
  return !!user?.id && user.email?.toLowerCase() === EDITOR_EMAIL && user.roles?.includes(EDITOR_ROLE);
}
export function cleanArticle(html) {
  return sanitizeHtml(String(html), {
    allowedTags: ['h2','h3','h4','p','a','strong','em','ul','ol','li','blockquote','table','caption','thead','tbody','tr','th','td','code','pre','br'],
    allowedAttributes: { a: ['href'], th: ['scope'] }, allowedSchemes: ['https'], allowProtocolRelative: false,
    parseStyleAttributes: false, nestingLimit: 12,
    transformTags: { a: (tag, attrs) => ({ tagName: 'a', attribs: /^\/(?!\/)|^https:\/\//.test(attrs.href || '') ? { href: attrs.href } : {} }) },
  });
}
function text(value, name, min, max) {
  if (typeof value !== 'string' || value.trim().length < min || value.length > max) throw new Error(`Revisa ${name}.`);
  return value.trim();
}
export function validateDraft(input) {
  if (!input || !slugPattern.test(input.key || '') || !['new','update'].includes(input.kind)) throw new Error('Borrador no válido.');
  const p = input.post || {};
  const slug = text(p.slug, 'la URL', 4, 120);
  if (!slugPattern.test(slug) || (input.kind === 'update' && slug !== input.targetSlug)) throw new Error('La actualización debe conservar su URL.');
  const content = cleanArticle(text(p.content, 'el contenido', 300, 100000));
  if (/\[COMPLETAR|TODO:|\[PENDIENTE/i.test(content)) throw new Error('El artículo aún tiene campos pendientes.');
  const image = text(p.image, 'la portada', 8, 180);
  if (!/^\/img\/[a-zA-Z0-9/_-]+\.(webp|png|jpg|jpeg)$/.test(image)) throw new Error('La portada debe ser una imagen local.');
  const refs = input.sources;
  if (!Array.isArray(refs) || !refs.length || refs.length > 12 || refs.some(x => !/^https:\/\/[^\s<>"']+$/.test(x.url || '') || !x.title)) throw new Error('Añade las fuentes verificadas.');
  const wordCount = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} }).split(/\s+/).length;
  return {
    key: input.key, kind: input.kind, ...(input.sourceKey && /^[a-z0-9-]{1,80}$/.test(input.sourceKey) ? {sourceKey:input.sourceKey} : {}), ...(input.kind === 'update' ? { targetSlug: input.targetSlug } : {}),
    sources: refs.map(x => ({ title: text(x.title, 'el título de fuente', 3, 180), url: x.url })),
    post: {
      slug, title: text(p.title, 'el título', 12, 120), excerpt: text(p.excerpt, 'el resumen', 50, 240),
      content, image, imageAlt: text(p.imageAlt, 'la descripción de imagen', 12, 220),
      imageWidth: 1536, imageHeight: 1024, imageCredit: 'Imagen ilustrativa generada con IA.',
      author: 'Edison Aular', category: 'Marketing con IA', featured: false,
      tags: Array.isArray(p.tags) ? p.tags.slice(0,8).map(t => text(t, 'una etiqueta', 2, 50)) : [],
      readTime: `${Math.max(1,Math.ceil(wordCount/220))} min`,
    },
  };
}
export function mergePublication(posts, draft, date = colombiaDate()) {
  if (!Array.isArray(posts) || new Set(posts.map(p=>p.slug)).size !== posts.length) throw new Error('El archivo publicado requiere revisión.');
  const item = validateDraft(draft);
  const index = posts.findIndex(p=>p.slug===item.post.slug);
  if (item.kind === 'update' && index < 0) throw new Error('No se encontró el artículo que se va a actualizar.');
  if (item.kind === 'new' && index >= 0) throw new Error('Esta URL ya existe. Actualiza el listado antes de continuar.');
  const result = posts.slice();
  const previous = posts[index];
  const post = { ...item.post, featured: previous?.featured ?? item.post.featured, id: previous?.id ?? Math.max(0,...posts.map(p=>Number(p.id)||0))+1,
    date: previous?.date || date, ...(previous ? { dateModified: date } : {}) };
  if (index < 0) result.push(post); else result[index] = { ...previous, ...post };
  return result;
}
export function sameArticle(published, draft) {
  if (!published) return false;
  const p = validateDraft(draft).post;
  return ['slug','title','excerpt','content','image','imageAlt'].every(k=>published[k] === p[k]);
}
