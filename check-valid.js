import fs from 'fs';

try {
    const data = fs.readFileSync('./src/data/blog-valid.json', 'utf8');
    const json = JSON.parse(data);
    console.log('✅ JSON VALIDO - ' + json.length + ' posts encontrados');
    
    // Si es válido, reemplazar el blog.json principal
    fs.copyFileSync('./src/data/blog-valid.json', './src/data/blog.json');
    console.log('✅ blog.json actualizado correctamente');
} catch (e) {
    console.log('❌ ERROR:', e.message);
}
