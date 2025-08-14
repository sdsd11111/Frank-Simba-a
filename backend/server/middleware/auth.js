const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Middleware para verificar el token JWT
authenticateToken = (req, res, next) => {
  // Obtener el token del header de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET || 'secreto_por_defecto_cambiar_en_produccion', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    
    // Verificar que el usuario existe en la base de datos
    db.get('SELECT id, username FROM users WHERE id = ?', [user.id], (err, row) => {
      if (err || !row) {
        return res.status(403).json({ error: 'Usuario no encontrado' });
      }
      
      // Añadir el usuario a la solicitud
      req.user = row;
      next();
    });
  });
};

// Middleware para verificar si el usuario es administrador
isAdmin = (req, res, next) => {
  // En este ejemplo, asumimos que cualquier usuario autenticado es administrador
  // En una aplicación real, deberías tener un campo 'role' en la tabla de usuarios
  if (!req.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  // Si necesitas verificar un rol específico, puedes hacerlo aquí
  // Por ahora, cualquier usuario autenticado puede acceder a rutas de administrador
  next();
};

module.exports = {
  authenticateToken,
  isAdmin
};
