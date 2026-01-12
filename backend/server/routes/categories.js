const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/auth');

// Obtener todas las categorías (público)
router.get('/', categoryController.getCategories);

// Crear una nueva categoría (protegido)
router.post('/', 
  authenticateToken,
  [
    body('name').trim().notEmpty().withMessage('El nombre de la categoría es requerido')
      .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres')
  ],
  categoryController.createCategory
);

// Actualizar una categoría (protegido)
router.put('/:id', 
  authenticateToken,
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    body('name').trim().notEmpty().withMessage('El nombre de la categoría es requerido')
      .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres')
  ],
  categoryController.updateCategory
);

// Eliminar una categoría (protegido)
router.delete('/:id', 
  authenticateToken,
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
  ],
  categoryController.deleteCategory
);

module.exports = router;
