import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import session from 'express-session';
import bcryptjs from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno
console.log('🔍 [DEBUG] Cargando variables de entorno...');
dotenv.config({ path: '.env.cms' });
console.log('✅ [DEBUG] Variables cargadas');
console.log('🔍 [DEBUG] USER:', process.env.CMS_ADMIN_USER);
console.log('🔍 [DEBUG] PASSWORD existe:', !!process.env.CMS_ADMIN_PASSWORD);
console.log('🔍 [DEBUG] SECRET existe:', !!process.env.SESSION_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log('🔍 [DEBUG] __dirname:', __dirname);

console.log('🔍 [DEBUG] Creando app Express...');
const app = express();
const PORT = 3001;
console.log('✅ [DEBUG] Express creado, PORT:', PORT);

// ========================================
// CONFIGURACIÓN DE SEGURIDAD
// ========================================

// Rate limiting - Prevenir ataques de fuerza bruta
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos
    message: { error: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests por 15 minutos
    message: { error: 'Demasiadas peticiones. Intenta más tarde.' }
});

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true en producción con HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middlewares
app.use(cors({
    origin: ['http://localhost:4321', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// ========================================
// CREDENCIALES (Hasheadas con bcrypt)
// ========================================

console.log('🔍 [DEBUG] Configurando credenciales...');

if (!process.env.CMS_ADMIN_USER || !process.env.CMS_ADMIN_PASSWORD) {
    console.error('❌ ERROR: Credenciales no encontradas en .env.cms');
    console.error('   Asegúrate de que existe el archivo .env.cms con:');
    console.error('   CMS_ADMIN_USER=admin_ea_2024');
    console.error('   CMS_ADMIN_PASSWORD=EA@Secure2024!Blog#Admin');
    process.exit(1);
}

const ADMIN_CREDENTIALS = {
    username: process.env.CMS_ADMIN_USER,
    // Hashear la contraseña (en producción, esto debería estar en una DB)
    passwordHash: bcryptjs.hashSync(process.env.CMS_ADMIN_PASSWORD, 10)
};

console.log('✅ [DEBUG] Credenciales configuradas para usuario:', ADMIN_CREDENTIALS.username);

// ========================================
// MIDDLEWARE DE AUTENTICACIÓN
// ========================================

function requireAuth(req, res, next) {
    if (!req.session.authenticated) {
        return res.status(401).json({ 
            success: false, 
            error: 'No autenticado. Por favor, inicia sesión.' 
        });
    }
    next();
}

// ========================================
// RUTAS DE AUTENTICACIÓN
// ========================================

// POST: Login
app.post('/api/auth/login', loginLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('🔍 [DEBUG LOGIN] Intento de login recibido');
        console.log('🔍 [DEBUG LOGIN] Usuario recibido:', username);
        console.log('🔍 [DEBUG LOGIN] Usuario esperado:', ADMIN_CREDENTIALS.username);
        console.log('🔍 [DEBUG LOGIN] Contraseña recibida length:', password ? password.length : 0);

        // Validar que vengan los datos
        if (!username || !password) {
            console.log('❌ [DEBUG LOGIN] Faltan datos');
            return res.status(400).json({ 
                success: false, 
                error: 'Usuario y contraseña son requeridos' 
            });
        }

        // Verificar usuario
        if (username !== ADMIN_CREDENTIALS.username) {
            console.log('❌ [DEBUG LOGIN] Usuario no coincide');
            return res.status(401).json({ 
                success: false, 
                error: 'Credenciales incorrectas' 
            });
        }

        console.log('✅ [DEBUG LOGIN] Usuario correcto, verificando contraseña...');

        // Verificar contraseña con bcrypt
        const passwordMatch = await bcryptjs.compare(password, ADMIN_CREDENTIALS.passwordHash);
        
        console.log('🔍 [DEBUG LOGIN] Resultado bcrypt.compare:', passwordMatch);
        
        if (!passwordMatch) {
            console.log('❌ [DEBUG LOGIN] Contraseña incorrecta');
            return res.status(401).json({ 
                success: false, 
                error: 'Credenciales incorrectas' 
            });
        }

        console.log('✅ [DEBUG LOGIN] Login exitoso!');

        // Crear sesión
        req.session.authenticated = true;
        req.session.user = username;

        res.json({ 
            success: true, 
            message: 'Login exitoso',
            user: username
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error en el servidor' 
        });
    }
});

// POST: Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                error: 'Error al cerrar sesión' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Sesión cerrada correctamente' 
        });
    });
});

// GET: Verificar sesión
app.get('/api/auth/check', (req, res) => {
    if (req.session.authenticated) {
        res.json({ 
            success: true, 
            authenticated: true,
            user: req.session.user
        });
    } else {
        res.json({ 
            success: true, 
            authenticated: false 
        });
    }
});

// ========================================
// CONFIGURACIÓN DE MULTER
// ========================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'public', 'img', 'blog');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Solo se permiten imágenes (jpg, png, gif, webp)');
        }
    }
});

// ========================================
// RUTAS DE API (PROTEGIDAS)
// ========================================

const BLOG_FILE = path.join(__dirname, 'src', 'data', 'blog.json');

// GET: Leer todos los posts (PROTEGIDO)
app.get('/api/posts', requireAuth, apiLimiter, (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        const posts = JSON.parse(data);
        res.json({ success: true, posts });
    } catch (error) {
        console.error('Error reading blog.json:', error);
        res.status(500).json({ success: false, error: 'Error al leer el blog' });
    }
});

// POST: Crear post (PROTEGIDO)
app.post('/api/posts', requireAuth, apiLimiter, (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        let posts = JSON.parse(data);
        
        const newPost = req.body;
        newPost.id = Math.max(...posts.map(p => p.id), 0) + 1;
        
        posts.push(newPost);
        
        fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf8');
        
        res.json({ success: true, message: 'Post creado correctamente', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, error: 'Error al crear el post' });
    }
});

// PUT: Actualizar post (PROTEGIDO)
app.put('/api/posts/:id', requireAuth, apiLimiter, (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        let posts = JSON.parse(data);
        
        const index = posts.findIndex(p => p.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Post no encontrado' });
        }
        
        posts[index] = { ...posts[index], ...req.body, id: parseInt(req.params.id) };
        
        fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf8');
        
        res.json({ success: true, message: 'Post actualizado correctamente', post: posts[index] });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ success: false, error: 'Error al actualizar el post' });
    }
});

// DELETE: Eliminar post (PROTEGIDO)
app.delete('/api/posts/:id', requireAuth, apiLimiter, (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        let posts = JSON.parse(data);
        
        const filteredPosts = posts.filter(p => p.id !== parseInt(req.params.id));
        
        if (filteredPosts.length === posts.length) {
            return res.status(404).json({ success: false, error: 'Post no encontrado' });
        }
        
        fs.writeFileSync(BLOG_FILE, JSON.stringify(filteredPosts, null, 2), 'utf8');
        
        res.json({ success: true, message: 'Post eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ success: false, error: 'Error al eliminar el post' });
    }
});

// POST: Subir imagen (PROTEGIDO)
app.post('/api/upload-image', requireAuth, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No se subió ninguna imagen' });
        }
        
        const imageUrl = `/img/blog/${req.file.filename}`;
        
        res.json({ 
            success: true, 
            message: 'Imagen subida correctamente',
            imageUrl: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ success: false, error: 'Error al subir la imagen' });
    }
});

// ========================================
// SERVIR PÁGINAS HTML
// ========================================

// Página de login
app.get('/admin/login', (req, res) => {
    console.log('🔍 [DEBUG] GET /admin/login - Sirviendo página de login');
    const loginPath = path.join(__dirname, 'blog-login.html');
    console.log('🔍 [DEBUG] Ruta del archivo:', loginPath);
    res.sendFile(loginPath, (err) => {
        if (err) {
            console.error('❌ [ERROR] No se pudo enviar blog-login.html:', err);
            res.status(500).send('Error al cargar la página de login');
        }
    });
});

// Admin panel (redirige a login si no está autenticado)
app.get('/admin', (req, res) => {
    console.log('🔍 [DEBUG] GET /admin - Sesión:', req.session.authenticated ? 'AUTENTICADO' : 'NO AUTENTICADO');
    if (!req.session.authenticated) {
        console.log('🔍 [DEBUG] Redirigiendo a /admin/login');
        return res.redirect('/admin/login');
    }
    console.log('🔍 [DEBUG] Sirviendo blog-admin.html');
    res.sendFile(path.join(__dirname, 'blog-admin.html'));
});

// ========================================
// INICIAR SERVIDOR
// ========================================
// Iniciar servidor
console.log('🔍 [DEBUG] Intentando iniciar servidor en puerto', PORT, '...');

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🔒 Blog CMS Server SEGURO iniciado                     ║
║                                                           ║
║   📝 Login: http://localhost:${PORT}/admin/login          ║
║   🔗 Admin Panel: http://localhost:${PORT}/admin          ║
║                                                           ║
║   ✅ Autenticación activada                              ║
║   ✅ Rate limiting activado                              ║
║   ✅ Sessions configuradas                               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

🔐 CREDENCIALES:
   Usuario: ${process.env.CMS_ADMIN_USER}
   Contraseña: (Ver archivo .env.cms)
    `);
});
