const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3001;

// Configurar multer para subir archivos
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear carpetas necesarias
const articlesDir = path.join(__dirname, 'public', 'Blog', 'Articles');
fs.ensureDirSync(articlesDir);

// Ruta para servir el panel de administración
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Ruta para generar artículos
app.post('/api/generate-article', upload.single('image'), (req, res) => {
    try {
        const { title, content } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const filename = `${slug}.html`;
        const filePath = path.join(articlesDir, filename);
        
        // Mover la imagen si se subió una
        let imageHtml = '';
        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const imagePath = `/images/articles/${slug}${ext}`;
            const imageDest = path.join(__dirname, 'public', imagePath);
            fs.ensureDirSync(path.dirname(imageDest));
            fs.renameSync(req.file.path, imageDest);
            imageHtml = `<img src="${imagePath}" alt="${title}" class="article-image">`;
        }

        // Leer el template de artículo
        const articleTemplate = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <header>
                <nav>
                    <a href="/">Inicio</a>
                </nav>
            </header>

            <main class="article-container">
                <h1>${title}</h1>
                ${imageHtml}
                <div class="article-content">
                    ${content}
                </div>
            </main>

            <footer>
                <p>&copy; ${new Date().getFullYear()} Tu Sitio Web</p>
            </footer>
        </body>
        </html>
        `;

        // Guardar el archivo
        fs.writeFileSync(filePath, articleTemplate);

        res.json({
            success: true,
            filename: filename,
            path: `/Blog/Articles/${filename}`
        });
    } catch (error) {
        console.error('Error al generar el artículo:', error);
        res.status(500).json({
            success: false,
            error: 'Error al generar el artículo'
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor de administración corriendo en http://localhost:${port}/admin`);
});
