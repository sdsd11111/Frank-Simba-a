require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Importar rutas
const authRoutes = require('./server/routes/auth');
const articleRoutes = require('./server/routes/articles');
const categoryRoutes = require('./server/routes/categories');

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Multer para la carga de archivos
const uploadDir = path.join(__dirname, 'server', 'uploads');

// Crear directorio de uploads si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
  }
}).single('image');

// Middleware para manejar la carga de archivos
app.use('/api/upload', (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname))); // Sirve archivos estáticos desde la raíz
app.use('/public', express.static(path.join(__dirname, 'public'))); // Sirve archivos de la carpeta public
app.use('/uploads', express.static(path.join(__dirname, 'server', 'uploads'))); // Para archivos subidos

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API del Blog de Frank Simbaña' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  
  // Inicializar la base de datos
  require('./server/config/database');
});

// Manejo de cierre adecuado
process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

// Servir archivos estáticos
app.use(express.static('.'));
