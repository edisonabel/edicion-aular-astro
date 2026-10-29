// Generadores de Schema.org reutilizables (GEO: datos estructurados consistentes)
import { NEGOCIO } from '../data/ia/negocio';
import type { FAQ } from '../data/ia/soluciones';

const abs = (path: string) => new URL(path, NEGOCIO.url).href;
export const ORG_ID = `${NEGOCIO.url}/#organization`;
export const SITE_ID = `${NEGOCIO.url}/#website`;

export const webSite = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: NEGOCIO.nombre,
  url: NEGOCIO.url,
  description: NEGOCIO.propuesta,
  publisher: { '@id': ORG_ID },
  inLanguage: 'es-CO',
});

export const localBusiness = (areaServed: string[] = ['Medellín', 'Envigado', 'Itagüí', 'Sabaneta', 'Bello']) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: NEGOCIO.nombre,
  url: NEGOCIO.url,
  logo: NEGOCIO.logo,
  image: NEGOCIO.logo,
  telephone: NEGOCIO.telefono,
  description: NEGOCIO.propuesta,
  hasMap: NEGOCIO.googleMaps,
  address: {
    '@type': 'PostalAddress',
    streetAddress: NEGOCIO.direccion.calle,
    addressLocality: NEGOCIO.direccion.ciudad,
    addressRegion: NEGOCIO.direccion.region,
    postalCode: NEGOCIO.direccion.postal,
    addressCountry: NEGOCIO.direccion.pais,
  },
  geo: { '@type': 'GeoCoordinates', latitude: NEGOCIO.geo.lat, longitude: NEGOCIO.geo.lng },
  areaServed: areaServed.map((name) => ({ '@type': 'Place', name })),
  sameAs: NEGOCIO.redes,
  knowsAbout: ['Inteligencia artificial', 'Agentes de IA', 'Automatización de procesos', 'SEO', 'GEO', 'Marketing digital'],
});

export const breadcrumbs = (items: { name: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
});

export const faqPage = (faqs: FAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const service = (o: { name: string; description: string; path: string; areaServed?: string[]; serviceType?: string; audience?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: o.name,
  serviceType: o.serviceType ?? o.name,
  description: o.description,
  url: abs(o.path),
  provider: { '@id': ORG_ID },
  areaServed: (o.areaServed ?? ['Medellín', 'Valle de Aburrá']).map((name) => ({ '@type': 'Place', name })),
  ...(o.audience ? { audience: { '@type': 'BusinessAudience', name: o.audience } } : {}),
});

export const webPage = (o: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: o.name,
  description: o.description,
  url: abs(o.path),
  inLanguage: 'es-CO',
  dateModified: NEGOCIO.actualizado,
  publisher: { '@id': ORG_ID },
});
