const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ruta a la base de datos SQLite
const dbDir = path.join(__dirname, '../database');
const dbPath = path.join(dbDir, 'blog.db');

// Asegurarse de que el directorio existe
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Directorio de base de datos creado en: ${dbDir}`);
}

// Crear conexión a la base de datos
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
    initializeDatabase();
  }
});

// Función para inicializar la base de datos con las tablas necesarias
function initializeDatabase() {
  // Usar transacciones para asegurar la integridad de los datos
  db.serialize(() => {
    // Activar claves foráneas
    db.run('PRAGMA foreign_keys = ON');

    // Crear tabla de usuarios
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Crear tabla de categorías
    db.run(`CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Crear tabla de artículos
    db.run(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      category_id INTEGER,
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )`);

    // Insertar categorías por defecto si no existen
    const defaultCategories = [
      { name: 'Taekwondo', slug: 'taekwondo' },
      { name: 'MMA', slug: 'mma' },
      { name: 'Entrenamiento', slug: 'entrenamiento' },
      { name: 'Noticias', slug: 'noticias' }
    ];

    const stmt = db.prepare('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)');
    defaultCategories.forEach(category => {
      stmt.run(category.name, category.slug);
    });
    stmt.finalize();

    // Insertar un usuario administrador por defecto (cambia la contraseña después)
    const bcrypt = require('bcryptjs');
    const defaultPassword = 'admin123'; // Cambia esto en producción
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
    
    db.run(
      'INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)',
      ['admin', hashedPassword],
      function(err) {
        if (err) {
          console.error('Error al crear usuario administrador:', err);
        } else if (this.changes > 0) {
          console.log('Usuario administrador creado con éxito');
          console.log('Usuario: admin');
          console.log('Contraseña: admin123');
          console.log('¡IMPORTANTE! Cambia esta contraseña después del primer inicio de sesión');
        }
      }
    );
  });
}

module.exports = db;
