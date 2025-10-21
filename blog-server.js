import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuración de multer para subir imágenes
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
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
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

// Ruta del archivo blog.json
const BLOG_FILE = path.join(__dirname, 'src', 'data', 'blog.json');

// GET: Leer todos los posts
app.get('/api/posts', (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        const posts = JSON.parse(data);
        res.json({ success: true, posts });
    } catch (error) {
        console.error('Error reading blog.json:', error);
        res.status(500).json({ success: false, error: 'Error al leer el blog' });
    }
});

// GET: Leer un post específico
app.get('/api/posts/:id', (req, res) => {
    try {
        const data = fs.readFileSync(BLOG_FILE, 'utf8');
        const posts = JSON.parse(data);
        const post = posts.find(p => p.id === parseInt(req.params.id));
        
        if (post) {
            res.json({ success: true, post });
        } else {
            res.status(404).json({ success: false, error: 'Post no encontrado' });
        }
    } catch (error) {
        console.error('Error reading post:', error);
        res.status(500).json({ success: false, error: 'Error al leer el post' });
    }
});

// POST: Crear un nuevo post
app.post('/api/posts', (req, res) => {
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

// PUT: Actualizar un post existente
app.put('/api/posts/:id', (req, res) => {
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

// DELETE: Eliminar un post
app.delete('/api/posts/:id', (req, res) => {
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

// POST: Subir imagen
app.post('/api/upload-image', upload.single('image'), (req, res) => {
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

// Servir el archivo blog-admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog-admin.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Blog CMS Server iniciado correctamente              ║
║                                                           ║
║   📝 Admin Panel: http://localhost:${PORT}/admin           ║
║   🔗 API Endpoint: http://localhost:${PORT}/api/posts      ║
║                                                           ║
║   ✅ Listo para gestionar tu blog sin deploy             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});
