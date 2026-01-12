const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { format, parseISO } = require('date-fns');
const { es } = require('date-fns/locale');

// Configuración
const TEMPLATE_PATH = path.join(__dirname, '../templates/article.html');
const OUTPUT_DIR = path.join(__dirname, '../public/posts');
const ARTICLES_SOURCE = path.join(__dirname, '../data/articles.json');

// Crear directorio de salida si no existe
fs.ensureDirSync(OUTPUT_DIR);

// Registrar helper de fecha para Handlebars
Handlebars.registerHelper('formatDate', function(dateString) {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return dateString;
  }
});

// Función para generar el HTML de un artículo
async function generateArticle(articleData, template) {
  try {
    // Procesar los datos del artículo
    const data = {
      ...articleData,
      formatted_date: format(parseISO(articleData.published_at), "d 'de' MMMM 'de' yyyy", { locale: es }),
      current_url: `https://tudominio.com/posts/${articleData.slug}`,
      // Asegurarse de que la categoría existe
      category: articleData.category || { name: 'Sin categoría', slug: 'sin-categoria' }
    };

    // Renderizar la plantilla con los datos del artículo
    const html = template(data);
    
    // Crear directorio para el artículo si no existe
    const articleDir = path.join(OUTPUT_DIR, articleData.slug);
    await fs.ensureDir(articleDir);
    
    // Guardar el archivo HTML
    const outputPath = path.join(articleDir, 'index.html');
    await fs.writeFile(outputPath, html, 'utf8');
    
    console.log(`✅ Artículo generado: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Error generando artículo "${articleData.title}":`, error);
    throw error;
  }
}

// Función principal
async function main() {
  try {
    console.log('🚀 Iniciando generación de artículos...');
    
    // Cargar la plantilla
    console.log('📝 Cargando plantilla...');
    const templateContent = await fs.readFile(TEMPLATE_PATH, 'utf8');
    const template = Handlebars.compile(templateContent);
    
    // Cargar los artículos
    console.log('📚 Cargando artículos...');
    const articlesData = JSON.parse(await fs.readFile(ARTICLES_SOURCE, 'utf8'));
    
    // Generar cada artículo
    console.log(`🔄 Generando ${articlesData.length} artículos...`);
    const results = [];
    for (const article of articlesData) {
      if (article.status === 'published') {
        const result = await generateArticle(article, template);
        results.push(result);
      }
    }
    
    // Generar archivo índice
    const indexPath = path.join(OUTPUT_DIR, 'index.json');
    const indexData = articlesData.map(article => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      image_url: article.image_url,
      category: article.category,
      published_at: article.published_at,
      url: `/posts/${article.slug}/`
    }));
    
    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
    console.log(`📄 Archivo índice generado: ${indexPath}`);
    
    console.log(`\n🎉 ¡Generación completada! Se crearon ${results.length} artículos.`);
    return results;
  } catch (error) {
    console.error('❌ Error en la generación de artículos:', error);
    process.exit(1);
  }
}

// Ejecutar el script
if (require.main === module) {
  main();
}

module.exports = { generateArticle, main };
