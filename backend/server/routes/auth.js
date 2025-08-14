const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Ruta para iniciar sesión
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
  ],
  authController.login
);

// Ruta para verificar el token
router.get('/verify', authenticateToken, authController.verifyToken);

module.exports = router;
