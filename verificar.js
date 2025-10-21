// Script de verificación automática
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('🔍 INICIANDO VERIFICACIÓN DE INTEGRIDAD...\n');

let errors = 0;
let warnings = 0;

// 1. Verificar archivos críticos
const criticalFiles = [
    'astro.config.mjs',
    'package.json',
    'src/layouts/BaseLayout.astro',
    'src/pages/index.astro',
    'public/sw.js',
    'public/manifest.json'
];

console.log('📁 Verificando archivos críticos...');
criticalFiles.forEach(file => {
    if (existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} - FALTA`);
        errors++;
    }
});

// 2. Verificar package.json
console.log('\n📦 Verificando dependencias...');
try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    if (pkg.dependencies.astro) {
        console.log(`  ✅ Astro: ${pkg.dependencies.astro}`);
    } else {
        console.log('  ❌ Astro no instalado');
        errors++;
    }
    
    if (pkg.dependencies['@astrojs/sitemap']) {
        console.log(`  ✅ Sitemap: ${pkg.dependencies['@astrojs/sitemap']}`);
    } else {
        console.log('  ⚠️  Sitemap no instalado');
        warnings++;
    }
} catch (e) {
    console.log('  ❌ Error leyendo package.json');
    errors++;
}

// 3. Verificar astro.config.mjs
console.log('\n⚙️  Verificando configuración Astro...');
try {
    const config = readFileSync('astro.config.mjs', 'utf8');
    
    if (config.includes("minify: 'terser'")) {
        console.log('  ❌ Usando terser sin dependencia');
        errors++;
    } else if (config.includes("minify: 'esbuild'")) {
        console.log('  ✅ Usando esbuild (incluido)');
    }
    
    if (config.includes('compressHTML')) {
        console.log('  ✅ HTML compression activado');
    }
    
    if (config.includes('cssCodeSplit')) {
        console.log('  ✅ CSS code splitting activado');
    }
} catch (e) {
    console.log('  ❌ Error leyendo astro.config.mjs');
    errors++;
}

// 4. Verificar BaseLayout
console.log('\n🎨 Verificando BaseLayout...');
try {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    
    if (layout.includes('serviceWorker.register')) {
        console.log('  ✅ Service Worker registrado');
    }
    
    if (layout.includes('preload') && layout.includes('fetchpriority')) {
        console.log('  ✅ Preload resources configurado');
    }
    
    if (layout.includes('will-change')) {
        console.log('  ✅ GPU acceleration habilitado');
    }
    
    if (layout.includes('is:inline')) {
        console.log('  ✅ Scripts inline presentes');
    }
} catch (e) {
    console.log('  ❌ Error leyendo BaseLayout.astro');
    errors++;
}

// 5. Verificar Service Worker
console.log('\n⚡ Verificando Service Worker...');
try {
    const sw = readFileSync('public/sw.js', 'utf8');
    
    if (sw.includes('CACHE_VERSION')) {
        console.log('  ✅ Cache versioning implementado');
    }
    
    if (sw.includes('STATIC_ASSETS')) {
        console.log('  ✅ Assets estáticos definidos');
    }
    
    if (sw.includes('addEventListener')) {
        console.log('  ✅ Event listeners configurados');
    }
} catch (e) {
    console.log('  ❌ Error leyendo sw.js');
    errors++;
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
    console.log('✅ TODO CORRECTO - Listo para build');
    process.exit(0);
} else {
    console.log(`❌ Errores: ${errors}`);
    console.log(`⚠️  Advertencias: ${warnings}`);
    
    if (errors > 0) {
        console.log('\n🔴 CORREGIR ERRORES ANTES DE BUILD');
        process.exit(1);
    } else {
        console.log('\n🟡 Revisar advertencias (no bloqueantes)');
        process.exit(0);
    }
}
