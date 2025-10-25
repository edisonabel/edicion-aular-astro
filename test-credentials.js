// Script de debug para probar credenciales
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

console.log('==============================================');
console.log('  TEST DE CREDENCIALES CMS');
console.log('==============================================\n');

// Cargar variables de entorno
dotenv.config({ path: '.env.cms' });

const USER = process.env.CMS_ADMIN_USER;
const PASS = process.env.CMS_ADMIN_PASSWORD;

console.log('📋 Variables de entorno cargadas:');
console.log('   Usuario:', USER);
console.log('   Password existe:', !!PASS);
console.log('   Password length:', PASS ? PASS.length : 0);
console.log('   Password (primeros 5 chars):', PASS ? PASS.substring(0, 5) + '...' : 'NO ENCONTRADO');
console.log('');

// Generar hash
console.log('🔐 Generando hash de la contraseña...');
const hash = bcryptjs.hashSync(PASS, 10);
console.log('   Hash generado exitosamente');
console.log('   Hash (primeros 20 chars):', hash.substring(0, 20) + '...');
console.log('');

// Probar comparación
console.log('✅ Probando comparación con bcrypt:');

const testPassword1 = PASS;
const result1 = bcryptjs.compareSync(testPassword1, hash);
console.log(`   Password correcta: ${result1} ${result1 ? '✅' : '❌'}`);

const testPassword2 = 'password_incorrecta';
const result2 = bcryptjs.compareSync(testPassword2, hash);
console.log(`   Password incorrecta: ${result2} ${result2 ? '❌ ERROR' : '✅'}`);

console.log('');
console.log('==============================================');
console.log('  PRUEBA LAS CREDENCIALES MANUALMENTE');
console.log('==============================================');
console.log('');
console.log(`Usuario a usar: ${USER}`);
console.log(`Contraseña a usar: ${PASS}`);
console.log('');
console.log('📝 Copia estas credenciales EXACTAMENTE como aparecen');
console.log('   y úsalas en el login del navegador');
