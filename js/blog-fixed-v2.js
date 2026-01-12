/**
 * Blog Script - Versión Mejorada
 * Carga y muestra los artículos del blog desde blog-data.js
 */

// Cargar artículos del blog
function loadBlogData() {
    try {
        // Verificar si BLOG_ARTICLES está disponible globalmente
        if (typeof BLOG_ARTICLES !== 'undefined' && Array.isArray(BLOG_ARTICLES)) {
            console.log('Artículos cargados correctamente:', BLOG_ARTICLES.length);
            return BLOG_ARTICLES;
        }
        
        // Si no está disponible, intentar cargar dinámicamente
        console.warn('BLOG_ARTICLES no está disponible, intentando cargar dinámicamente...');
        
        // Datos de respaldo en caso de que falle la carga
        const fallbackData = [
            {
                "id": 1,
                "title": "Más allá de la Romería: Vive una experiencia auténtica de Taekwondo o MMA en Loja con Frank Simbaña",
                "url": "/blog/más-allá-de-la-romería-vive-una-experiencia-auténtica-de-taekwondo-o-mma-en-loja-con-frank-simbana.html",
                "image_url": "images/Blog/Blog 1.webp"
            },
            {
                "id": 2,
                "title": "De turista a atleta: Claves para no perder tu rutina de Taekwondo o MMA en Loja",
                "url": "/blog/de-turista-a-atleta-claves-para-no-perder-tu-rutina-de-taekwondo-o-mma-en-loja.html",
                "image_url": "images/Blog/Blog 2.webp"
            },
            {
                "id": 3,
                "title": "Guía rápida para visitantes: Dónde encontrar las mejores clases de Taekwondo y MMA en Loja",
                "url": "/blog/guia-rapida-para-visitantes-donde-encontrar-las-mejores-clases-de-taekwondo-y-mma-en-loja.html",
                "image_url": "images/Blog/Blog 3.webp"
            },
            {
                "id": 4,
                "title": "¿Por qué entrenar Taekwondo o MMA es el antídoto perfecto para el estrés del viaje a Loja?",
                "url": "/blog/por-que-entrenar-taekwondo-o-mma-es-el-antidoto-perfecto-para-el-estres-del-viaje-a-loja.html",
                "image_url": "images/Blog/Blog 4.webp"
            },
            {
                "id": 5,
                "title": "Cómo Mantener tu Disciplina (o Encontrarla) con Taekwondo y MMA en tu Viaje a Loja",
                "url": "/blog/como-mantener-tu-disciplina-o-encontrarla-con-taekwondo-y-mma-en-tu-viaje-a-loja.html",
                "image_url": "images/Blog/Blog 6.webp"
            }
        ];
        
        return fallbackData;
        
    } catch (error) {
        console.error('Error al cargar los datos del blog:', error);
        return [];
    }
}

// Renderizar artículos en la página
function renderArticles(articles) {
    const container = document.getElementById('articlesContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!container) {
        console.error('No se encontró el contenedor de artículos');
        return;
    }
    
    // Ocultar indicador de carga si existe
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // Mostrar el contenedor de artículos
    container.style.opacity = '1';
    
    if (!Array.isArray(articles) || articles.length === 0) {
        container.innerHTML = `
            <div class="col-full" style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                <h3>No se encontraron artículos</h3>
                <p>Pronto publicaremos nuevo contenido. ¡Vuelve pronto!</p>
            </div>
        `;
        return;
    }
    
    // Ordenar artículos por fecha (más recientes primero)
    const sortedArticles = [...articles].sort((a, b) => 
        new Date(b.published_at || 0) - new Date(a.published_at || 0)
    );
    
    // Generar HTML de los artículos
    const articlesHTML = sortedArticles.map(article => `
        <article class="col-block">
            <div class="blog-item">
                <div class="blog-item__thumb">
                    <a href="${article.url}">
                        <img src="${article.image_url || 'images/placeholder.jpg'}" 
                             alt="${article.title || 'Imagen del artículo'}"
                             onerror="this.onerror=null; this.src='images/placeholder.jpg';">
                    </a>
                </div>
                <div class="blog-item__text">
                    <div class="blog-item__cat">
                        <a href="#" style="color: ${article.category?.name === 'MMA' ? '#800020' : '#B8860B'};">
                            ${article.category?.name || 'General'}
                        </a>
                    </div>
                    <h3 class="blog-item__title">
                        <a href="${article.url}" style="color: #333; text-decoration: none;">
                            ${article.title || 'Sin título'}
                        </a>
                    </h3>
                    <div class="blog-item__excerpt">
                        ${article.excerpt || ''}
                    </div>
                    <a href="${article.url}" class="blog-item__link">Leer más →</a>
                </div>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = articlesHTML;
}

// Actualizar la sección de artículos recientes
function updateRecentPosts(articles) {
    const recentPostsContainer = document.getElementById('recent-posts-list');
    if (!recentPostsContainer) return;

    // Ordenar artículos por fecha (más recientes primero)
    const sortedArticles = [...articles].sort((a, b) => 
        new Date(b.published_at) - new Date(a.published_at)
    );

    // Tomar los 3 artículos más recientes
    const recentArticles = sortedArticles.slice(0, 3);

    // Limpiar el contenedor
    recentPostsContainer.innerHTML = '';

    // Agregar cada artículo reciente
    recentArticles.forEach((article, index) => {
        const listItem = document.createElement('li');
        listItem.style.marginBottom = '2rem';
        listItem.style.paddingBottom = '2rem';
        listItem.style.borderBottom = index < recentArticles.length - 1 ? '1px solid #e0e0e0' : 'none';
        
        // Formatear fecha
        const date = new Date(article.published_at);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        
        // Determinar color de la fecha según la categoría
        let dateColor = '#B8860B'; // Color por defecto (dorado)
        if (article.category && article.category.name === 'MMA') {
            dateColor = '#800020'; // Borgoña para MMA
        }

        listItem.innerHTML = `
            <h6 style="margin-bottom: 0.5rem;">
                <a href="${article.url}" style="color: #343A40; text-decoration: none;">
                    ${article.title}
                </a>
            </h6>
            <span style="color: ${dateColor}; font-size: 0.9rem;">
                ${formattedDate}
            </span>
        `;
        
        recentPostsContainer.appendChild(listItem);
    });
}

// Inicializar el blog
function initBlog() {
    console.log('Inicializando blog...');
    
    // Cargar datos
    const articles = loadBlogData();
    console.log('Artículos cargados:', articles);
    
    // Renderizar artículos
    renderArticles(articles);
    
    // Actualizar sección de recientes
    updateRecentPosts(articles);
    
    console.log('Blog inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initBlog);
