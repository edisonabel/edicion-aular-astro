export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const formatBlogDate = (value: string) => new Date(`${value.slice(0, 10)}T12:00:00Z`).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Bogota' });
export const blogDestination = (category: string, slug = '') => {
  if (/consultas-citas-clinica/.test(slug)) return { href: '/sectores/clinicas-estetica/', label: 'Revisar un flujo de recepción para tu clínica' };
  if (/whatsapp-business-o-agente/.test(slug)) return { href: '/soluciones-ia/agentes-ia-whatsapp/', label: 'Evaluar la atención por WhatsApp y web' };
  if (/n8n-agentes/.test(slug)) return { href: '/soluciones-ia/automatizacion-procesos-ia/', label: 'Diseñar una automatización para tu proceso' };
  if (/claude-design/.test(slug)) return { href: '/diseno-web/', label: 'Llevar el diseño a una web para tu negocio' };
  if (/kimi-k3/.test(slug)) return { href: '/soluciones-ia/automatizacion-procesos-ia/', label: 'Explorar automatización de procesos a medida' };
  if (/asistente-ia|ai-agents/.test(slug)) return { href: '/soluciones-ia/agentes-ia-whatsapp/', label: 'Explorar agentes de IA para atención y seguimiento' };
  if (/adopcion-ia/.test(slug)) return { href: '/soluciones-ia/automatizacion-procesos-ia/', label: 'Explorar la automatización de procesos con IA' };
  if (/\bIA\b|Inteligencia Artificial/i.test(category)) return { href: '/soluciones-ia/', label: 'Explorar soluciones de IA para tu negocio' };
  if (/diseño web|desarrollo web|SEO/i.test(category)) return { href: '/diseno-web/', label: 'Conocer el servicio de diseño web' };
  if (/branding/i.test(category)) return { href: '/branding/', label: 'Conocer el servicio de branding' };
  return { href: '/servicios/', label: 'Explorar servicios para tu proyecto' };
};
