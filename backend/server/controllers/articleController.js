const db = require('../config/database');
const { validationResult } = require('express-validator');
const slugify = require('slugify');

// Obtener todos los artículos (con paginación)
exports.getArticles = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const category = req.query.category;

  let query = 'SELECT a.*, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id';
  let countQuery = 'SELECT COUNT(*) as total FROM articles';
  const params = [];
  const whereClauses = [];

  // Filtrar por categoría si se proporciona
  if (category) {
    whereClauses.push('c.slug = ?');
    params.push(category);
  }

  // Añadir condiciones WHERE si existen
  if (whereClauses.length > 0) {
    const whereClause = ' WHERE ' + whereClauses.join(' AND ');
    query += whereClause;
    countQuery += whereClause;
  }

  // Ordenar y paginar
  query += ' ORDER BY a.published_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  // Obtener el total de artículos
  db.get(countQuery, params.slice(0, -2), (err, countResult) => {
    if (err) {
      console.error('Error al contar artículos:', err);
      return res.status(500).json({ error: 'Error al obtener artículos' });
    }

    // Obtener los artículos paginados
    db.all(query, params, (err, articles) => {
      if (err) {
        console.error('Error al obtener artículos:', err);
        return res.status(500).json({ error: 'Error al obtener artículos' });
      }

      // Formatear fechas
      const formattedArticles = articles.map(article => ({
        ...article,
        published_at: formatDate(article.published_at),
        created_at: formatDate(article.created_at),
        updated_at: formatDate(article.updated_at)
      }));

      res.json({
        articles: formattedArticles,
        pagination: {
          total: countResult.total,
          page,
          totalPages: Math.ceil(countResult.total / limit),
          limit
        }
      });
    });
  });
};

// Obtener un artículo por ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  db.get(
    'SELECT a.*, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.id = ?',
    [id],
    (err, article) => {
      if (err) {
        console.error('Error al obtener artículo:', err);
        return res.status(500).json({ error: 'Error al obtener el artículo' });
      }

      if (!article) {
        return res.status(404).json({ error: 'Artículo no encontrado' });
      }

      // Formatear fechas
      const formattedArticle = {
        ...article,
        published_at: formatDate(article.published_at),
        created_at: formatDate(article.created_at),
        updated_at: formatDate(article.updated_at)
      };

      res.json(formattedArticle);
    }
  );
};

// Crear un nuevo artículo
exports.createArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category_id, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const slug = slugify(title, { lower: true, strict: true });
  const publishedAt = status === 'published' ? new Date().toISOString() : null;

  db.run(
    `INSERT INTO articles (title, slug, content, image_url, category_id, status, published_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, slug, content, imageUrl, category_id, status, publishedAt],
    function(err) {
      if (err) {
        console.error('Error al crear artículo:', err);
        return res.status(500).json({ error: 'Error al crear el artículo' });
      }

      // Obtener el artículo recién creado
      db.get('SELECT * FROM articles WHERE id = ?', [this.lastID], (err, article) => {
        if (err) {
          console.error('Error al obtener artículo creado:', err);
          return res.status(500).json({ error: 'Error al obtener el artículo creado' });
        }

        res.status(201).json({
          message: 'Artículo creado exitosamente',
          article: {
            ...article,
            published_at: formatDate(article.published_at),
            created_at: formatDate(article.created_at),
            updated_at: formatDate(article.updated_at)
          }
        });
      });
    }
  );
};

// Actualizar un artículo
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category_id, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const slug = title ? slugify(title, { lower: true, strict: true }) : undefined;

  // Construir la consulta dinámicamente basada en los campos proporcionados
  let query = 'UPDATE articles SET ';
  const params = [];
  const updates = [];

  if (title) {
    updates.push('title = ?');
    params.push(title);
  }
  if (slug) {
    updates.push('slug = ?');
    params.push(slug);
  }
  if (content !== undefined) {
    updates.push('content = ?');
    params.push(content);
  }
  if (imageUrl) {
    updates.push('image_url = ?');
    params.push(imageUrl);
  }
  if (category_id) {
    updates.push('category_id = ?');
    params.push(category_id);
  }
  if (status) {
    updates.push('status = ?');
    params.push(status);
    
    // Si el estado cambia a 'published' y published_at es null, establecer la fecha actual
    if (status === 'published') {
      updates.push('published_at = COALESCE(published_at, datetime("now"))');
    }
  }

  // Si no hay nada que actualizar
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
  }

  // Agregar la actualización de updated_at
  updates.push('updated_at = datetime("now")');
  
  // Construir la consulta final
  query += updates.join(', ') + ' WHERE id = ?';
  params.push(id);

  db.run(query, params, function(err) {
    if (err) {
      console.error('Error al actualizar artículo:', err);
      return res.status(500).json({ error: 'Error al actualizar el artículo' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Obtener el artículo actualizado
    db.get('SELECT * FROM articles WHERE id = ?', [id], (err, article) => {
      if (err) {
        console.error('Error al obtener artículo actualizado:', err);
        return res.status(500).json({ error: 'Error al obtener el artículo actualizado' });
      }

      res.json({
        message: 'Artículo actualizado exitosamente',
        article: {
          ...article,
          published_at: formatDate(article.published_at),
          created_at: formatDate(article.created_at),
          updated_at: formatDate(article.updated_at)
        }
      });
    });
  });
};

// Eliminar un artículo
exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  // Primero obtenemos el artículo para eliminar la imagen asociada si existe
  db.get('SELECT image_url FROM articles WHERE id = ?', [id], (err, article) => {
    if (err) {
      console.error('Error al buscar artículo:', err);
      return res.status(500).json({ error: 'Error al eliminar el artículo' });
    }

    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Eliminar la imagen del servidor si existe
    if (article.image_url) {
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '..', '..', article.image_url);
      
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error al eliminar la imagen:', err);
        });
      }
    }

    // Eliminar el artículo de la base de datos
    db.run('DELETE FROM articles WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error al eliminar artículo:', err);
        return res.status(500).json({ error: 'Error al eliminar el artículo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Artículo no encontrado' });
      }

      res.json({ message: 'Artículo eliminado exitosamente' });
    });
  });
};

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString();
}
