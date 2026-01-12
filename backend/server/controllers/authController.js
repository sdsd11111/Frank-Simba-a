const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

// Iniciar sesión
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validar entrada
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  // Buscar usuario en la base de datos
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error('Error al verificar contraseña:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'secreto_por_defecto_cambiar_en_produccion',
        { expiresIn: '24h' }
      );

      // Enviar respuesta exitosa
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  });
};

// Verificar token
exports.verifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secreto_por_defecto_cambiar_en_produccion', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    res.json({ authenticated: true, user: decoded });
  });
};
