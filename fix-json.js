import fs from 'fs';

console.log('🔧 Arreglando blog.json...\n');

try {
    // Leer archivo
    let content = fs.readFileSync('./src/data/blog.json', 'utf8');
    
    // Backup
    fs.writeFileSync('./src/data/blog-backup.json', content);
    console.log('✅ Backup creado: blog-backup.json');
    
    // Reemplazar comillas dobles problemáticas por comillas simples
    // Solo en el contenido HTML (no tocar las comillas de las keys JSON)
    content = content
        .replace(/"\n<section>/g, "'\n<section>")  // Comillas antes de HTML
        .replace(/"a lo Kennedy"/g, "'a lo Kennedy'")
        .replace(/"curso completo"/g, "'curso completo'")
        .replace(/"No B\.S\."/g, "'No B.S.'")
        .replace(/"promesa cuantificada"/g, "'promesa cuantificada'")
        .replace(/"prueba"/g, "'prueba'")
        .replace(/"garantía"/g, "'garantía'")
        .replace(/"dispositivo de respuesta"/g, "'dispositivo de respuesta'")
        // Reemplazar comillas tipográficas por simples
        .replace(/"/g, "'")
        .replace(/"/g, "'")
        .replace(/'/g, "'")
        .replace(/'/g, "'");
    
    // Intentar parsear
    try {
        const posts = JSON.parse(content);
        console.log('✅ JSON válido - ' + posts.length + ' posts');
        
        // Guardar
        fs.writeFileSync('./src/data/blog.json', content);
        console.log('✅ Archivo guardado correctamente');
    } catch (parseError) {
        console.log('⚠️ Aún hay errores, intentando método alternativo...');
        
        // Método alternativo: reemplazar TODAS las comillas dobles en content por simples
        content = fs.readFileSync('./src/data/blog-backup.json', 'utf8');
        
        // Solo reemplazar dentro de los valores "content"
        const contentRegex = /("content":\s*")([\s\S]*?)(")/g;
        content = content.replace(contentRegex, (match, start, middle, end) => {
            // Reemplazar solo las comillas dentro del middle
            const fixed = middle.replace(/"/g, "'").replace(/"/g, "'").replace(/"/g, "'");
            return start + fixed + end;
        });
        
        const posts = JSON.parse(content);
        fs.writeFileSync('./src/data/blog.json', content);
        console.log('✅ JSON arreglado - ' + posts.length + ' posts');
    }
    
} catch (e) {
    console.log('❌ ERROR FATAL:', e.message);
    console.log('\n💡 Solución manual: Usa el CMS para editar los posts 14 y 15');
}
