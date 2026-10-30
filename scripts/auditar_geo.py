"""Audita el HTML compilado y genera el mapa de las 21 páginas, sin dependencias.

Uso: python scripts/auditar_geo.py --reference C:/Users/edici/Downloads/HTML
Ejecutar después de npm run build. No consulta métricas ni modifica las plantillas.
"""
import argparse
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children, self.parts = [], []

    def text(self):
        return re.sub(r'\s+', ' ', ''.join(p.text() if isinstance(p, Node) else p for p in self.parts)).strip()

    def find(self, tag):
        return [n for n in self.walk() if n.tag == tag]

    def walk(self):
        yield self
        for child in self.children:
            yield from child.walk()


class Document(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = self.current = Node()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.current)
        self.current.children.append(node)
        self.current.parts.append(node)
        if tag not in self.VOID:
            self.current = node

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        node = self.current
        while node.parent:
            if node.tag == tag:
                self.current = node.parent
                return
            node = node.parent

    def handle_data(self, text):
        self.current.parts.append(text)


def ensure(condition, message, errors):
    if not condition:
        errors.append(message)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--reference', type=Path, default=Path.home() / 'Downloads' / 'HTML')
    args = parser.parse_args()
    root, errors, pages, total_blocks = Path('dist'), [], [], 0
    for file in sorted(root.rglob('*.html')):
        text = file.read_text(encoding='utf-8')
        doc = Document(text).root
        blocks = []
        for node in doc.find('script'):
            if node.attrs.get('type') == 'application/ld+json':
                try:
                    blocks.append(json.loads(node.text()))
                except (ValueError, TypeError) as error:
                    errors.append(f'{file}: JSON-LD inválido: {error}')
        total_blocks += len(blocks)
        rel = file.relative_to(root).as_posix()
        if not rel.startswith(('soluciones-ia/', 'medellin/', 'sectores/')):
            continue
        route = '/' + rel.removesuffix('index.html')
        scope = next(n for n in doc.walk() if 'geo-page' in n.attrs.get('class', '').split())
        title = doc.find('title')[0].text()
        descriptions = [n.attrs.get('content', '') for n in doc.find('meta') if n.attrs.get('name') == 'description']
        ensure(len(doc.find('h1')) == 1, f'{route}: debe haber un h1', errors)
        ensure(len(descriptions) == 1 and bool(descriptions[0]), f'{route}: descripción ausente o duplicada', errors)
        canonicals = [n.attrs.get('href') for n in doc.find('link') if n.attrs.get('rel') == 'canonical']
        ensure(canonicals == ['https://edicionaular.com' + route], f'{route}: canónico incorrecto', errors)
        ids = [n.attrs['id'] for n in doc.walk() if n.attrs.get('id')]
        ensure(len(ids) == len(set(ids)), f'{route}: IDs duplicados', errors)
        ensure(sum(n.get('@type') == 'Organization' for n in blocks) == 1, f'{route}: identidad duplicada/ausente', errors)
        ensure(sum(n.get('@type') == 'WebSite' for n in blocks) == 1, f'{route}: WebSite duplicado/ausente', errors)
        ensure(not any(n.get('@type') == 'ProfessionalService' for n in blocks), f'{route}: sede sin confirmar', errors)
        ensure(not re.search(r'mentor[ií]a|Sondeos empresariales|sin riesgo de bloqueo|\bNaN\b', scope.text(), re.I), f'{route}: texto retirado presente', errors)
        for node in doc.walk():
            for attr in ('href', 'src', 'data-src'):
                url = node.attrs.get(attr, '')
                parts = urlsplit(url)
                if (url.startswith('/') and not url.startswith('//')) or parts.netloc == 'edicionaular.com':
                    path = unquote(parts.path).lstrip('/')
                    target = root / path
                    ensure(target.exists() or (target / 'index.html').exists(), f'{route}: destino inexistente {url}', errors)
                    if parts.fragment and not path:
                        ensure(parts.fragment in ids, f'{route}: ancla inexistente {url}', errors)
            if node.tag == 'img':
                ensure('alt' in node.attrs, f'{route}: imagen sin alt', errors)
        details = scope.find('details')
        faq = next((n for n in blocks if n.get('@type') == 'FAQPage'), {})
        ensure(len(faq.get('mainEntity', [])) == len(details), f'{route}: FAQ visible/schema no coincide', errors)
        for node, entity in zip(details, faq.get('mainEntity', [])):
            ensure(len(node.find('summary')) == 1 and 'open' not in node.attrs, f'{route}: FAQ no nativo/cerrado', errors)
            ensure(entity['name'] in node.text() and entity['acceptedAnswer']['text'] in node.text(), f'{route}: texto FAQ/schema no coincide', errors)
        sections = []
        for section in scope.find('section'):
            headings = [n for n in section.walk() if n.tag in ('h1', 'h2')]
            sections.append({'id': section.attrs.get('id'), 'titulo': headings[0].text() if headings else '', 'origen': section.attrs.get('data-template')})
            ensure(bool(section.attrs.get('id')) and bool(section.attrs.get('data-template')), f'{route}: sección sin mapa', errors)
        slots = Counter(n.attrs['data-image-slot'] for n in scope.walk() if 'data-image-slot' in n.attrs)
        pages.append({'ruta': route, 'titulo': title, 'description': descriptions[0], 'secciones': sections, 'imagenes': dict(slots), 'faqs': len(details)})
    ensure(len(pages) == 21, f'Se esperaban 21 páginas; hay {len(pages)}', errors)
    ensure(not (root / 'mentoria/index.html').exists(), 'Mentoría sigue publicada', errors)
    ensure('/mentoria/' not in (root / 'sitemap-0.xml').read_text(encoding='utf-8'), 'Mentoría sigue en sitemap', errors)
    for field in ('titulo', 'description'):
        values = [p[field] for p in pages]
        ensure(len(values) == len(set(values)), f'{field}: duplicados entre páginas nuevas', errors)
    output = Path('docs'); output.mkdir(exist_ok=True)
    report = {'paginas': len(pages), 'bloques_json_ld': total_blocks, 'errores': errors, 'detalle': pages}
    (output / 'auditoria-html.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    lines = ['# Mapa verificado de secciones HTML', '', 'Generado desde `dist` por `scripts/auditar_geo.py`. Los anclajes identifican secciones reales; `data-template` documenta la referencia de Bringer, con adaptaciones de contenido, tema y accesibilidad.', '', '## Las 21 páginas', '']
    for page in pages:
        lines += [f"### {page['ruta']}", '', '| Orden | Sección | Ancla | Referencia HTML |', '| --- | --- | --- | --- |']
        for i, section in enumerate(page['secciones'], 1):
            lines.append(f"| {i} | {section['titulo']} | `#{section['id']}` | `{section['origen']}` |")
        lines += ['', 'Imágenes compartidas: ' + ', '.join(f'`{k}` × {v}' for k, v in page['imagenes'].items()) + '.', '']
    if args.reference:
        lines += ['## Catálogo completo de la carpeta HTML', '', 'Se inventarían todas las secciones principales, incluidas las que no se trasladaron al sitio.', '', '| Archivo | Secciones o composición |', '| --- | --- |']
        for file in sorted(args.reference.glob('*.html')):
            source = Document(file.read_text(encoding='utf-8')).root
            entries = []
            for section in source.find('section'):
                heads = [n.text() for n in section.walk() if n.tag in ('h1', 'h2')]
                entries.append(' / '.join(heads) or section.attrs.get('class', 'Sección visual'))
            if not entries:
                entries = ['Composición de portfolio a pantalla completa; sin etiquetas section.']
            lines.append(f"| `{file.name}` | {' · '.join(entries).replace('|', '/')} |")
    lines += ['', '## Criterios editoriales', '', '- Se aprovechan Intro y Detailed List de services, Steps de home06, las composiciones de portfolio-post01, Offer de service-details, FAQ de pricing y Grid CTA de services.', '- La formación añade módulos con entregables; no publica eventos, fechas, ponentes ni plazas inventadas.', '- No se copian testimonios, premios, estadísticas, resultados ni clientes de demostración de Bringer.', '- Los ejemplos locales se identifican como ilustrativos. Cobertura no significa oficina en cada barrio.', '- La plantilla original usa un tema oscuro; los componentes trasladados adoptan variables semánticas y se prueban en ambos modos.', '- Las imágenes nuevas se gestionan en src/data/ia/imagenes.ts; hasta recibir los WebP se muestran tarjetas editoriales, sin rectángulos grises ni fotografías atribuidas a clientes.', '']
    (output / 'MAPA_SECCIONES_HTML.md').write_text('\n'.join(lines), encoding='utf-8')
    print(json.dumps({'paginas': len(pages), 'bloques_json_ld': total_blocks, 'errores': errors}, ensure_ascii=False, indent=2))
    raise SystemExit(bool(errors))


if __name__ == '__main__':
    main()
