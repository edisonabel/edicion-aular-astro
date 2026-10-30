import type { APIRoute } from 'astro';
import posts from '../data/blog.json';
const xml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]!));
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Blog de Edición Aular</title><link>https://edicionaular.com/blog/</link><description>Guías de IA, diseño web y marketing para tu negocio.</description><language>es-CO</language>${[...posts].sort((a,b) => b.date.localeCompare(a.date)).map(post => {
  const url = `https://edicionaular.com/blog/${post.slug}/`;
  return `<item><title>${xml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xml(post.excerpt)}</description><pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate><category>${xml(post.category)}</category></item>`;
}).join('')}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
