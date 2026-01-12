const db = require('../config/database');
const { validationResult } = require('express-validator');
const slugify = require('slugify');

// Obtener todas las categorías
exports.getCategories = (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', [], (err, categories) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      return res.status(500).json({ error: 'Error al obtener las categorías' });
    }
    res.json({ categories });
  });
};

// Crear una nueva categoría
exports.createCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const slug = slugify(name, { lower: true, strict: true });

  db.run(
    'INSERT INTO categories (name, slug) VALUES (?, ?)',
    [name, slug],
    function(err) {
      if (err) {
        console.error('Error al crear categoría:', err);
        return res.status(500).json({ error: 'Error al crear la categoría' });
      }

      res.status(201).json({
        message: 'Categoría creada exitosamente',
        category: { id: this.lastID, name, slug }
      });
    }
  );
};

// Actualizar una categoría
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const slug = name ? slugify(name, { lower: true, strict: true }) : undefined;

  let query = 'UPDATE categories SET ';
  const params = [];
  const updates = [];

  if (name) {
    updates.push('name = ?');
    params.push(name);
  }
  if (slug) {
    updates.push('slug = ?');
    params.push(slug);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
  }

  query += updates.join(', ') + ' WHERE id = ?';
  params.push(id);

  db.run(query, params, function(err) {
    if (err) {
      console.error('Error al actualizar categoría:', err);
      return res.status(500).json({ error: 'Error al actualizar la categoría' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Obtener la categoría actualizada
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, category) => {
      if (err) {
        console.error('Error al obtener categoría actualizada:', err);
        return res.status(500).json({ error: 'Error al obtener la categoría actualizada' });
      }

      res.json({
        message: 'Categoría actualizada exitosamente',
        category
      });
    });
  });
};

// Eliminar una categoría
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  // Verificar si hay artículos asociados a esta categoría
  db.get('SELECT COUNT(*) as count FROM articles WHERE category_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al verificar artículos de la categoría:', err);
      return res.status(500).json({ error: 'Error al eliminar la categoría' });
    }

    if (result.count > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar la categoría porque tiene artículos asociados' 
      });
    }

    // Si no hay artículos asociados, eliminar la categoría
    db.run('DELETE FROM categories WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error al eliminar categoría:', err);
        return res.status(500).json({ error: 'Error al eliminar la categoría' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      res.json({ message: 'Categoría eliminada exitosamente' });
    });
  });
};
