export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const formatBlogDate = (value: string) => new Date(`${value.slice(0, 10)}T12:00:00Z`).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Bogota' });
export const blogDestination = (category: string, slug = '') => {
  if (/claude-design/.test(slug)) return { href: '/diseno-web/', label: 'Llevar el diseño a una web para tu negocio' };
  if (/kimi-k3/.test(slug)) return { href: '/soluciones-ia/automatizacion-procesos-ia/', label: 'Explorar automatización de procesos a medida' };
  if (/asistente-ia|ai-agents/.test(slug)) return { href: '/soluciones-ia/agentes-ia-whatsapp/', label: 'Explorar agentes de IA para atención y seguimiento' };
  if (/adopcion-ia/.test(slug)) return { href: '/soluciones-ia/automatizacion-procesos-ia/', label: 'Explorar la automatización de procesos con IA' };
  if (/\bIA\b|Inteligencia Artificial/i.test(category)) return { href: '/soluciones-ia/', label: 'Explorar soluciones de IA para tu negocio' };
  if (/diseño web|desarrollo web|SEO/i.test(category)) return { href: '/diseno-web/', label: 'Conocer el servicio de diseño web' };
  if (/branding/i.test(category)) return { href: '/branding/', label: 'Conocer el servicio de branding' };
  return { href: '/servicios/', label: 'Explorar servicios para tu proyecto' };
};
