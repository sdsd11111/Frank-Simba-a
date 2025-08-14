// Blog functionality - Versión mejorada y estable
const BLOG_JSON_PATHS = [
    'js/data/blog-posts.json',        // Ruta relativa al directorio actual
    '/js/data/blog-posts.json',       // Ruta relativa a la raíz del sitio
    'https://raw.githubusercontent.com/sdsd11111/Frank-Simba-a/main/js/data/blog-posts.json'  // URL absoluta como respaldo
];

// Datos de respaldo en caso de que falle la carga del JSON
const FALLBACK_ARTICLES = [
    {
        "title": "Más allá de la Romería: Vive una experiencia auténtica de Taekwondo o MMA en Loja con Frank Simbaña",
        "slug": "mas-alla-de-la-romeria",
        "excerpt": "Descubre cómo el Taekwondo y el MMA pueden transformar tu viaje a Loja en una experiencia inolvidable de superación personal y conexión cultural.",
        "image_url": "images/Blog/Blog 1.webp",
        "category": {
            "id": 1,
            "name": "Taekwondo",
            "slug": "taekwondo"
        },
        "published_at": "2025-08-10T10:00:00.000Z",
        "url": "blog/mas-alla-de-la-romeria-vive-una-experiencia-autentica-de-taekwondo-o-mma-en-loja-con-frank-simbana.html"
    },
    {
        "title": "De turista a atleta: Claves para no perder tu rutina de Taekwondo o MMA en Loja",
        "slug": "de-turista-a-atleta",
        "excerpt": "Mantén tu entrenamiento de artes marciales mientras viajas por Ecuador con estos consejos prácticos.",
        "image_url": "images/Blog/Blog 2.webp",
        "category": {
            "id": 1,
            "name": "Taekwondo",
            "slug": "taekwondo"
        },
        "published_at": "2025-08-12T15:30:00.000Z",
        "url": "blog/de-turista-a-atleta-claves-para-no-perder-tu-rutina-de-taekwondo-o-mma-en-loja.html"
    }
];

// Variables globales
let currentPage = 1;
let currentCategory = null;
const itemsPerPage = 6;
let categories = [];
let allArticles = [];

// Obtener URL del artículo basado en el título
function getArticleUrl(article) {
    if (!article) return '/blog/articulo.html';
    
    // Si ya tiene URL definida, usarla
    if (article.url) return article.url;
    
    const title = article.title || '';
    const slug = article.slug || title.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    
    return `/blog/${slug}.html`;
}

// Elementos del DOM
const articlesContainer = document.querySelector('.entries');
const loadingIndicator = document.getElementById('loadingIndicator');

// Mostrar/ocultar carga
function setLoading(isLoading) {
    console.log('setLoading:', isLoading);
    
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? 'block' : 'none';
    }
    
    if (articlesContainer) {
        articlesContainer.style.opacity = isLoading ? '0.5' : '1';
        articlesContainer.style.pointerEvents = isLoading ? 'none' : 'auto';
    }
}

// Cargar desde múltiples fuentes
async function tryFetchFromSources(sources) {
    for (const source of sources) {
        try {
            console.log('Intentando cargar desde:', source);
            const response = await fetch(source);
            console.log('Respuesta de', source, ':', response.status, response.statusText);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Datos cargados correctamente desde:', source);
                return data;
            }
        } catch (error) {
            console.warn('Error al cargar desde', source, ':', error);
        }
    }
    return null;
}

// Procesar artículos
function processArticles(articles) {
    if (!Array.isArray(articles)) {
        console.error('Los artículos no son un array:', articles);
        articles = [];
    }
    
    // Asignar IDs si no los tienen y asegurar URLs
    allArticles = articles.map((article, index) => ({
        id: article.id || `article-${index + 1}`,
        ...article,
        url: getArticleUrl(article)
    }));
    
    console.log('Artículos procesados:', allArticles.length);
    
    // Extraer categorías únicas
    const categoryMap = new Map();
    allArticles.forEach(article => {
        if (article && article.category) {
            let categoryId, categoryName;
            
            if (typeof article.category === 'string') {
                categoryId = article.category.toLowerCase().replace(/\s+/g, '-');
                categoryName = article.category;
            } else if (article.category.id && article.category.name) {
                categoryId = article.category.id;
                categoryName = article.category.name;
            }
            
            if (categoryId && categoryName) {
                categoryMap.set(categoryId, {
                    id: categoryId,
                    name: categoryName,
                    slug: categoryId
                });
            }
        }
    });
    
    categories = Array.from(categoryMap.values());
    console.log('Categorías encontradas:', categories);
    
    return allArticles;
}

// Renderizar artículos
function renderArticles(articles) {
    if (!articlesContainer) {
        console.error('No se encontró el contenedor de artículos');
        return;
    }
    
    if (!Array.isArray(articles) || articles.length === 0) {
        articlesContainer.innerHTML = `
            <div class="alert alert-warning" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                No se encontraron artículos. Intenta con otros filtros o crea un nuevo artículo.
            </div>
        `;
        return;
    }
    
    const html = articles.map(article => `
        <article class="col-block">
            <div class="blog-item">
                <div class="blog-item__thumb">
                    <a href="${article.url || '#'}">
                        <img src="${article.image_url || 'images/placeholder.jpg'}" 
                             alt="${article.title || 'Imagen del artículo'}">
                    </a>
                </div>
                <div class="blog-item__text">
                    <div class="blog-item__cat">
                        <a href="#">${article.category?.name || 'General'}</a>
                    </div>
                    <h3 class="blog-item__title">
                        <a href="${article.url || '#'}">${article.title || 'Sin título'}</a>
                    </h3>
                    <div class="blog-item__excerpt">
                        ${article.excerpt || ''}
                    </div>
                    <a href="${article.url || '#'}" class="blog-item__link">Leer más</a>
                </div>
            </div>
        </article>
    `).join('');
    
    articlesContainer.innerHTML = html;
}

// Inicializar el blog
async function initBlog() {
    try {
        setLoading(true);
        console.log('Iniciando blog...');
        
        // 1. Intentar cargar desde múltiples fuentes
        let articles = await tryFetchFromSources(BLOG_JSON_PATHS);
        
        // 2. Si falla, usar datos de respaldo
        if (!articles || articles.length === 0) {
            console.warn('Usando datos de respaldo (fallback)');
            articles = FALLBACK_ARTICLES;
        }
        
        console.log('Artículos cargados:', articles.length);
        
        // 3. Procesar artículos
        processArticles(articles);
        
        // 4. Renderizar artículos (mostrar todos)
        renderArticles(allArticles);
        
        // 5. Actualizar widgets del sidebar
        updateRecentPosts(allArticles);
        updateCategories(allArticles);
        
    } catch (error) {
        console.error('Error al inicializar el blog:', error);
        // Usar datos de respaldo en caso de error
        console.warn('Usando datos de respaldo debido a un error');
        processArticles(FALLBACK_ARTICLES);
        renderArticles(allArticles);
        updateRecentPosts(FALLBACK_ARTICLES);
    } finally {
        setLoading(false);
    }
}

// Función para actualizar los artículos recientes
function updateRecentPosts(articles) {
    const recentPostsContainer = document.querySelector('.widget__recent');
    if (!recentPostsContainer) return;
    
    // Ordenar artículos por fecha (más recientes primero)
    const sortedArticles = [...articles].sort((a, b) => 
        new Date(b.published_at) - new Date(a.published_at)
    );
    
    // Tomar los 3 artículos más recientes
    const recentArticles = sortedArticles.slice(0, 3);
    
    // Generar el HTML de los artículos recientes
    const recentPostsHTML = recentArticles.map(article => `
        <div class="recent__item">
            <div class="recent__item__image">
                <a href="${article.url}" class="recent__item__url">
                    <img src="${article.image_url}" alt="${article.title}" class="cover">
                </a>
            </div>
            <div class="recent__item__text">
                <h4 class="recent__item__title">
                    <a href="${article.url}">${article.title}</a>
                </h4>
                <div class="recent__item__meta">
                    <time class="recent__item__date">
                        ${new Date(article.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                </div>
            </div>
        </div>
    `).join('');
    
    // Actualizar el contenedor
    recentPostsContainer.innerHTML = recentPostsHTML;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando blog...');
    initBlog();
});
