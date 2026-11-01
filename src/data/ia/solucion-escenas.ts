// Escenas ilustrativas del hero de cada solución. Se rotulan como ejemplo: no son datos ni casos reales.
const ICONOS = {
  mensaje: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z"/><path d="M8 10h8M8 13h5"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M9 15.5l2 2 4-4"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  base: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  documento: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  revision: '<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
  guion: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 11 5-3v8l-5-3"/>',
  megafono: '<path d="M3 10v4l13 5V5Z"/><path d="M16 9a3 3 0 0 1 0 6M7 15.5V19a1 1 0 0 0 1 1h2l-1-4"/>',
  codigo: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.500 5.500 12 3Z"/>',
  grafica: '<path d="M4 4v16h16"/><path d="m8 15 4-5 3 3 4-6"/>',
  libro: '<path d="M12 6c-2-1.500-4.500-2-8-2v15c3.500 0 6 .5 8 2 2-1.500 4.500-2 8-2V4c-3.500 0-6 .5-8 2ZM12 6v15"/>',
  ruta: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
};
export interface Escena {
  forma: 'telefono' | 'ventana';
  tipo: 'chat' | 'panel' | 'video' | 'web' | 'curso';
  app: string;
  kicker?: string;
  grande?: string;
  avance?: number;
  filas?: { nombre: string; valor: string }[];
  mensajes?: { de: 'bot' | 'persona'; texto: string }[];
  avisos: { titulo: string; texto: string; icono: string }[];
}
const aviso = (titulo: string, texto: string, icono: keyof typeof ICONOS) => ({ titulo, texto, icono: ICONOS[icono] });
export const ESCENAS: Record<string, Escena> = {
  'agentes-ia-whatsapp': {
    forma: 'telefono', tipo: 'chat', app: 'Asistente',
    mensajes: [
      { de: 'persona', texto: 'Hola, ¿tienen citas esta semana?' },
      { de: 'bot', texto: 'Sí. ¿Prefieres mañana en la mañana o en la tarde?' },
      { de: 'persona', texto: 'En la tarde, por favor.' },
      { de: 'bot', texto: 'Listo. Dejé tu solicitud lista para confirmar.' },
    ],
    avisos: [aviso('Nueva conversación', 'Desde WhatsApp', 'mensaje'), aviso('Cita agendada', 'Mañana, 2:30 p. m.', 'calendario'), aviso('Pasó a un asesor', 'Con todo el contexto', 'persona')],
  },
  'automatizacion-procesos-ia': {
    forma: 'ventana', tipo: 'panel', app: 'Flujo · Cotización', kicker: 'Pasos automáticos', grande: '3 de 4', avance: 3,
    filas: [{ nombre: 'Datos recibidos', valor: 'Listo' }, { nombre: 'Registro en el CRM', valor: 'Listo' }, { nombre: 'Borrador de cotización', valor: 'Listo' }, { nombre: 'Revisión de un asesor', valor: 'Pendiente' }],
    avisos: [aviso('Registro creado', 'Sin copiar y pegar', 'base'), aviso('Documento leído', 'Datos en tu hoja', 'documento'), aviso('Revisión pendiente', 'Una persona decide', 'revision')],
  },
  'contenido-video-ia': {
    forma: 'telefono', tipo: 'video', app: 'Pieza · Lanzamiento',
    avisos: [aviso('Guion aprobado', 'Por tu equipo', 'guion'), aviso('Versión vertical', 'Lista para Reels', 'video'), aviso('Lista para pauta', 'Con tu marca', 'megafono')],
  },
  'sitios-web-seo-geo': {
    forma: 'ventana', tipo: 'web', app: 'tu-negocio.com',
    avisos: [aviso('Datos estructurados', 'Páginas descritas', 'codigo'), aviso('Página publicada', 'Lista para rastrear', 'web'), aviso('Contacto medido', 'Por canal', 'grafica')],
  },
  'capacitacion-ia-empresas': {
    forma: 'ventana', tipo: 'curso', app: 'Programa · Tu equipo', kicker: 'Módulo actual', grande: 'Práctica por área', avance: 2,
    filas: [{ nombre: 'Criterio y seguridad', valor: 'Listo' }, { nombre: 'Práctica por área', valor: 'En curso' }, { nombre: 'Aplicación y seguimiento', valor: 'Pendiente' }],
    avisos: [aviso('Guía de uso', 'Para todo el equipo', 'libro'), aviso('Ejercicio terminado', 'Con tus procesos', 'revision'), aviso('Plan de adopción', 'Un flujo por persona', 'ruta')],
  },
};
