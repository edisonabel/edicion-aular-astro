import fs from 'fs';

try {
    const data = fs.readFileSync('./src/data/blog.json', 'utf8');
    const json = JSON.parse(data);
    console.log('✅ JSON VALIDO - ' + json.length + ' posts encontrados');
} catch (e) {
    console.log('❌ ERROR EN JSON:');
    console.log(e.message);
    
    // Encontrar línea exacta del error
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        const data = fs.readFileSync('./src/data/blog.json', 'utf8');
        const lines = data.substring(0, pos).split('\n');
        console.log('\n📍 Error en línea:', lines.length);
        console.log('Contexto:', data.substring(pos - 100, pos + 100));
    }
}
