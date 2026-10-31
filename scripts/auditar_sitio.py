"""Revisa destinos, anclas, metadatos y JSON-LD de todo dist, sin solicitudes externas."""
import json
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from xml.etree import ElementTree
from auditar_geo import Document

root = Path('dist').resolve()
documents = {file: Document(file.read_text(encoding='utf-8')).root for file in root.rglob('*.html')}
errors, pages = [], []
for file, doc in documents.items():
    route = '/' + file.relative_to(root).as_posix().removesuffix('index.html')
    nodes = list(doc.walk())
    ids = [n.attrs['id'] for n in nodes if n.attrs.get('id')]
    for condition, issue in [
        (len(doc.find('h1')) == 1, 'H1 ausente o duplicado'),
        (len(doc.find('title')) == 1, 'title ausente o duplicado'),
        (len(ids) == len(set(ids)), 'IDs duplicados'),
        (sum(n.attrs.get('name') == 'description' and bool(n.attrs.get('content')) for n in doc.find('meta')) == 1, 'descripción ausente o duplicada'),
        (sum(n.attrs.get('rel') == 'canonical' and n.attrs.get('href') == 'https://edicionaular.com'+route for n in doc.find('link')) == 1, 'canónico incorrecto'),
    ]:
        if not condition: errors.append(f'{route}: {issue}')
    for node in nodes:
        if node.tag == 'script' and node.attrs.get('type') == 'application/ld+json':
            try: json.loads(''.join(x for x in node.parts if isinstance(x, str)))
            except ValueError: errors.append(f'{route}: JSON-LD inválido')
        for attribute in ('href', 'src', 'data-src', 'poster', 'action'):
            ref = node.attrs.get(attribute)
            if not ref or ref == '#' or ref.startswith(('data:', 'tel:', 'mailto:')): continue
            parsed = urlsplit(urljoin('https://edicionaular.com'+route, ref))
            if parsed.netloc != 'edicionaular.com': continue
            target = root / unquote(parsed.path).lstrip('/')
            if target.is_dir(): target = target/'index.html'
            if not target.exists(): errors.append(f'{route}: {attribute} inexistente {ref}')
            elif parsed.fragment and target in documents:
                if unquote(parsed.fragment) not in {n.attrs.get('id') for n in documents[target].walk()}:
                    errors.append(f'{route}: ancla inexistente {ref}')
        if node.tag == 'img' and 'alt' not in node.attrs: errors.append(f'{route}: imagen sin alt')
    pages.append({'ruta': route, 'html_bytes': file.stat().st_size})
feed = ElementTree.parse(root/'rss.xml')
posts = json.loads(Path('src/data/blog.json').read_text(encoding='utf-8'))
expected_urls = {f"https://edicionaular.com/blog/{post['slug']}/" for post in posts}
feed_items = feed.findall('./channel/item')
if len(feed_items) != len(posts): errors.append('RSS: número inesperado de artículos')
if {item.findtext('link') for item in feed_items} != expected_urls:
    errors.append('RSS: las URL no corresponden al archivo de artículos')
report = {'paginas':len(pages),'errores':sorted(set(errors)),'rss_articulos':len(feed.findall('./channel/item')),'detalle':pages}
Path('docs/auditoria-sitio.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({key:value for key,value in report.items() if key!='detalle'},ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
