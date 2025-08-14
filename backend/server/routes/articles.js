const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const articleController = require('../controllers/articleController');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop().toLowerCase());
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, JPG, PNG, GIF).'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// Middleware para manejar errores de multer
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};

// Obtener todos los artículos (público)
router.get('/', [
  param('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo'),
  param('limit').optional().isInt({ min: 1, max: 50 }).withMessage('El límite debe ser un número entre 1 y 50'),
  param('category').optional().trim().isString().withMessage('La categoría debe ser un texto válido')
], articleController.getArticles);

// Obtener un artículo por ID (público)
router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
], articleController.getArticleById);

// Crear un nuevo artículo (protegido)
router.post('/', 
  authenticateToken,
  upload.single('image'),
  [
    body('title').trim().notEmpty().withMessage('El título es requerido')
      .isLength({ max: 255 }).withMessage('El título no puede tener más de 255 caracteres'),
    body('content').trim().notEmpty().withMessage('El contenido es requerido'),
    body('category_id').isInt({ min: 1 }).withMessage('La categoría es requerida'),
    body('status').isIn(['draft', 'published']).withMessage('El estado debe ser "draft" o "published"')
  ],
  handleUploadErrors,
  articleController.createArticle
);

// Actualizar un artículo (protegido)
router.put('/:id', 
  authenticateToken,
  upload.single('image'),
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío')
      .isLength({ max: 255 }).withMessage('El título no puede tener más de 255 caracteres'),
    body('content').optional().trim().notEmpty().withMessage('El contenido no puede estar vacío'),
    body('category_id').optional().isInt({ min: 1 }).withMessage('La categoría debe ser un ID válido'),
    body('status').optional().isIn(['draft', 'published']).withMessage('El estado debe ser "draft" o "published"')
  ],
  handleUploadErrors,
  articleController.updateArticle
);

// Eliminar un artículo (protegido)
router.delete('/:id', 
  authenticateToken,
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
  ],
  articleController.deleteArticle
);

module.exports = router;
