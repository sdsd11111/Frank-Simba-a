// Blog functionality - Versión mejorada
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
let currentPage = 1;
let currentCategory = null;
const itemsPerPage = 6;
let categories = [];
let allArticles = [];

// Function to get the correct article URL based on title
function getArticleUrl(article) {
    if (!article) return '/blog/articulo.html';
    
    const title = article.title || '';
    
    // Special cases for specific articles with custom URLs
    if (title.includes('Más allá de la Romería')) {
        return '/blog/más-allá-de-la-romería-vive-una-experiencia-auténtica-de-taekwondo-o-mma-en-loja-con-frank-simbana.html';
    } else if (title.includes('Guía rápida para visitantes')) {
        return '/blog/guia-rapida-para-visitantes-donde-encontrar-las-mejores-clases-de-taekwondo-y-mma-en-loja.html';
    } else if (title.includes('¿Por qué entrenar Taekwondo o MMA')) {
        return '/blog/por-que-entrenar-taekwondo-o-mma-es-el-antidoto-perfecto-para-el-estres-del-viaje-a-loja.html';
    } else if (title.includes('cómo mantener tu disciplina')) {
        return '/blog/como-mantener-tu-disciplina-o-encontrarla-con-taekwondo-y-mma-en-tu-viaje-a-loja.html';
    } else if (title.includes('De turista a atleta')) {
        return '/blog/de-turista-a-atleta-claves-para-no-perder-tu-rutina-de-taekwondo-o-mma-en-loja.html';
    } else if (title.includes('Cómo Mantener tu Disciplina') || title.includes('cómo mantener tu disciplina')) {
        return '/blog/como-mantener-tu-disciplina-o-encontrarla-con-taekwondo-y-mma-en-tu-viaje-a-loja.html';
    }
    
    // Default URL generation
    return `/blog/${article.slug || article.id || 'articulo'}.html`;
}

// DOM Elements
const articlesContainer = document.querySelector('.entries');
const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
const loadingIndicator = document.getElementById('loadingIndicator');

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Show loading state
function setLoading(isLoading) {
    console.log('setLoading:', isLoading);
    
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? 'block' : 'none';
    }
    
    if (articlesContainer) {
        if (isLoading) {
            articlesContainer.style.opacity = '0';
            articlesContainer.style.pointerEvents = 'none';
        } else {
            articlesContainer.style.opacity = '1';
            articlesContainer.style.pointerEvents = 'auto';
            // Forzar un reflow para asegurar que la transición se aplique
            void articlesContainer.offsetWidth;
        }
    }
}

// Obtener artículos del localStorage (si existen)
function getLocalArticles() {
    try {
        // Usar la misma clave que en el panel de administración (blog_articles)
        const savedArticles = localStorage.getItem('blog_articles');
        if (savedArticles) {
            const articles = JSON.parse(savedArticles);
            console.log('Artículos cargados desde localStorage:', articles);
            return articles;
        }
    } catch (error) {
        console.error('Error al cargar artículos del localStorage:', error);
    }
    console.log('No se encontraron artículos en localStorage');
    return [];
}

// Función para intentar cargar desde múltiples fuentes
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

// Cargar artículos desde múltiples fuentes con respaldo
async function fetchStaticArticles() {
    try {
        setLoading(true);
        console.log('Iniciando carga de artículos...');
        
        // 1. Intentar cargar desde múltiples fuentes
        let staticArticles = await tryFetchFromSources(BLOG_JSON_PATHS);
        
        // 2. Si falla, intentar cargar desde localStorage
        if (!staticArticles || staticArticles.length === 0) {
            console.log('No se pudieron cargar artículos desde fuentes externas, intentando localStorage...');
            staticArticles = getLocalArticles();
        }
        
        // 3. Si aún no hay artículos, usar datos de respaldo
        if (!staticArticles || staticArticles.length === 0) {
            console.warn('Usando datos de respaldo (fallback)');
            staticArticles = FALLBACK_ARTICLES;
        }
        
        console.log('Total de artículos cargados:', staticArticles.length);
        
        // 4. Procesar los artículos cargados
        processArticles(staticArticles);
        
        return allArticles;
    } catch (error) {
        console.warn('Error al cargar artículos estáticos:', error);
        // Usar datos de respaldo en caso de error
        console.warn('Usando datos de respaldo debido a un error');
        processArticles(FALLBACK_ARTICLES);
        return FALLBACK_ARTICLES;
    } finally {
        setLoading(false);
    }
}

// Procesar artículos cargados
function processArticles(articles) {
    if (!Array.isArray(articles)) {
        console.error('Los artículos no son un array:', articles);
        articles = [];
                    categoryMap.set(categoryId, {
                        id: categoryId,
                        name: article.category
                    });
                } else if (article.category.id && article.category.name) {
                    categoryMap.set(article.category.id, article.category);
                }
            }
        });
        
        categories = Array.from(categoryMap.values());
        console.log('Artículos cargados:', allArticles.length, 'Categorías:', categories.length);
        
        // Ordenar artículos por fecha (más recientes primero)
        allArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        
        return allArticles;
    } catch (error) {
        console.error('Error cargando artículos:', error);
        showError('No se pudieron cargar los artículos. Por favor, intente más tarde.');
        return [];
    } finally {
        setLoading(false);
    }
}

// Get paginated articles
function getPaginatedArticles(page = 1, categoryId = null, getAll = false) {
    // Get filtered articles
    let filteredArticles = [...allArticles];
    
    // Filter by category if specified
    if (categoryId) {
        filteredArticles = filteredArticles.filter(article => 
            article.category && article.category.id === categoryId
        );
    }
    
    // If getAll is true, return all articles without pagination
    if (getAll) {
        return {
            articles: filteredArticles,
            pagination: {
                current_page: 1,
                total_pages: 1,
                total_items: filteredArticles.length,
                has_previous: false,
                has_next: false
            }
        };
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    
    // Calculate total pages
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    
    return {
        articles: paginatedArticles,
        pagination: {
            current_page: page,
            total_pages: totalPages,
            total_items: filteredArticles.length,
            has_previous: page > 1,
            has_next: page < totalPages
        }
    };
}

// Render articles with proper styling
function renderArticles(articles) {
    console.log('Renderizando artículos:', articles);
    if (!articlesContainer) {
        console.error('No se encontró el contenedor de artículos');
        return;
    }
    
    if (!articles || articles.length === 0) {
        articlesContainer.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <div class="text-gray-500 mb-4">
                    <i class="fas fa-inbox text-4xl"></i>
                    <p>No se encontraron artículos</p>
                </div>
                <p class="text-gray-600">Intenta con otros filtros o crea un nuevo artículo.</p>
            </div>
        `;
        return;
    }
    
    // Limpiar el contenedor de artículos
    articlesContainer.innerHTML = '';
    
    // Crear una fila para los artículos
    const row = document.createElement('div');
    row.className = 'row';
    articlesContainer.appendChild(row);
    
    // Iterar sobre cada artículo y crear su representación HTML
    articles.forEach(article => {
        if (!article) return;
        
        // Formatear fecha
        const articleDate = article.published_at || article.date || new Date().toISOString();
        const formattedDate = formatDate(articleDate);
        
        // Obtener la URL de la imagen (usar imagen de marcador de posición si no hay imagen)
        let imageUrl = '';
        if (article.image) {
            if (article.image.startsWith('http') || article.image.startsWith('/') || article.image.startsWith('data:')) {
                imageUrl = article.image;
            } else {
                imageUrl = '/' + article.image.replace(/^[\\/]+/, '');
            }
        } else {
            // Imagen de marcador de posición
            imageUrl = 'assets/img/placeholder.jpg';
        }
        
        // Manejar categoría
        let categoryName = 'Sin categoría';
        let categorySlug = 'sin-categoria';
        
        if (article.category) {
            if (typeof article.category === 'string') {
                categoryName = article.category;
                categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
            } else if (article.category.name) {
                categoryName = article.category.name;
                categorySlug = article.category.id || article.category.name.toLowerCase().replace(/\s+/g, '-');
            }
        }
        
        // Crear el elemento del artículo
        const articleElement = document.createElement('div');
        articleElement.className = 'column large-12 medium-12';
        
        // Crear el HTML del artículo
        articleElement.innerHTML = `
            <article class="entry">
                <div class="entry-img">
                    <img src="${imageUrl}" 
                         alt="${article.title || 'Imagen del artículo'}" 
                         class="img-fluid entry__img"
                         onerror="this.onerror=null; this.src='assets/img/placeholder.jpg';">
                </div>
                <div class="entry__content">
                    <div class="entry__meta">
                        <span class="entry__category">${categoryName}</span>
                        <span>${formattedDate}</span>
                    </div>
                    <h3 class="entry__title">
                        <a href="${getArticleUrl(article)}">${article.title || 'Sin título'}</a>
                    </h3>
                    <p class="entry__excerpt">
                        ${article.excerpt || 'Sin extracto disponible.'}
                    </p>
                    ${categoryName ? `
                    <div class="entry-meta">
                        <ul>
                            <li class="d-flex align-items-center">
                                <i class="bi bi-folder"></i> 
                                <a href="/blog/categoria/${categorySlug}.html" class="category-link">${categoryName}</a>
                            </li>
                        </ul>
                    </div>` : ''}
                    <a href="${getArticleUrl(article)}" class="entry__read-more">
                        Leer más <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
        
        // Agregar manejador de eventos para el enlace de categoría si existe
        if (categorySlug) {
            const categoryLink = articleElement.querySelector(`[data-category="${categorySlug}"]`);
            if (categoryLink) {
                categoryLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterByCategory(categorySlug);
                });
            }
        }
        
        // Agregar el artículo al contenedor
        articlesContainer.appendChild(articleElement);
    });
    
    console.log('Artículos renderizados correctamente');
}

// Render pagination controls
function renderPagination(pagination) {
    if (!pagination || !paginationContainer) return;
    
    const { current_page, total_pages } = pagination;
    currentPage = parseInt(current_page);
    
    if (total_pages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 3rem;">
            <button id="prevBtn" class="pagination-btn" ${currentPage <= 1 ? 'disabled' : ''}
                style="background: #343A40; color: #F8F8F8; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;"
                ${currentPage <= 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Anterior
            </button>
            
            <span class="page-info" style="color: #343A40; font-weight: 600; min-width: 120px; text-align: center;">
                Página ${currentPage} de ${total_pages}
            </span>
            
            <button id="nextBtn" class="pagination-btn" ${currentPage >= total_pages ? 'disabled' : ''}
                style="background: #B8860B; color: #F8F8F8; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;"
                ${currentPage >= total_pages ? 'disabled' : ''}>
                Siguiente <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(1));
    }
    
    // Insert pagination after articles
    if (articlesContainer) {
        articlesContainer.insertAdjacentElement('afterend', paginationContainer);
    }
}

// Change page
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage < 1) return;
    
    try {
        const data = getPaginatedArticles(newPage, currentCategory);
        if (data.articles?.length) {
            renderArticles(data.articles);
            renderPagination(data.pagination);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error changing page:', error);
        showError('Ocurrió un error al cambiar de página. Por favor, inténtalo de nuevo.');
    }
}

// Filter articles by category
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    currentPage = 1; // Reset to first page when changing category
    
    try {
        const data = getPaginatedArticles(currentPage, currentCategory);
        renderArticles(data.articles);
        renderPagination(data.pagination);
        
        // Update active state in category filters
        document.querySelectorAll('.category-link').forEach(link => {
            const linkCategory = link.getAttribute('data-category');
            if ((!categoryId && !linkCategory) || linkCategory === String(categoryId)) {
                link.style.color = '#B8860B';
            } else {
                link.style.color = '#6C757D';
            }
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error filtering articles:', error);
        showError('Ocurrió un error al filtrar los artículos. Por favor, inténtalo de nuevo.');
    }
}

// Show error message
function showError(message) {
    if (!articlesContainer) return;
    articlesContainer.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 2rem; background: #FFF5F5; border-left: 4px solid #F56565; margin: 2rem 0;">
            <p style="color: #E53E3E; margin: 0;">${message}</p>
        </div>
    `;
}

// Initialize category filters
function initCategoryFilters() {
    const categoryContainer = document.querySelector('.categories-widget');
    if (!categoryContainer || !categories.length) return;
    
    const categoriesList = document.createElement('ul');
    categoriesList.style.listStyle = 'none';
    categoriesList.style.padding = '0';
    categoriesList.style.margin = '0';
    
    // Add "All Categories" option
    const allCategoriesItem = document.createElement('li');
    allCategoriesItem.style.marginBottom = '0.8rem';
    allCategoriesItem.innerHTML = `
        <a href="#" class="category-link ${!currentCategory ? 'active' : ''}" 
           data-category=""
           style="color: ${!currentCategory ? '#B8860B' : '#6C757D'}; text-decoration: none; display: flex; justify-content: space-between; align-items: center;">
            <span>Todas las categorías</span>
            <span class="category-count" style="background: #E9ECEF; color: #6C757D; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">
                ${allArticles.length}
            </span>
        </a>
    `;
    categoriesList.appendChild(allCategoriesItem);
    
    // Add categories
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.style.marginBottom = '0.8rem';
        const articleCount = allArticles.filter(a => a.category?.id === category.id).length;
        
        categoryItem.innerHTML = `
            <a href="#" class="category-link ${currentCategory == category.id ? 'active' : ''}" 
               data-category="${category.id}"
               style="color: ${currentCategory == category.id ? '#B8860B' : '#6C757D'}; text-decoration: none; display: flex; justify-content: space-between; align-items: center;">
                <span>${category.name}</span>
                <span class="category-count" style="background: #E9ECEF; color: #6C757D; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">
                    ${articleCount}
                </span>
            </a>
        `;
        categoriesList.appendChild(categoryItem);
    });
    
    // Replace existing categories
    const existingList = categoryContainer.querySelector('ul');
    if (existingList) {
        categoryContainer.replaceChild(categoriesList, existingList);
    } else {
        categoryContainer.appendChild(categoriesList);
    }
    
    // Add event listeners to category links
    categoryContainer.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = link.getAttribute('data-category') || null;
            filterByCategory(categoryId);
        });
    });
}

// Find widget by heading text (compatible with all browsers)
function findWidgetByHeadingText(headingText) {
    const widgets = document.querySelectorAll('.widget');
    for (const widget of widgets) {
        const heading = widget.querySelector('h4');
        if (heading && heading.textContent.trim() === headingText) {
            return widget;
        }
    }
    return null;
}

// Update recent posts in sidebar
function updateRecentPosts(articles) {
    const widget = findWidgetByHeadingText('Artículos Recientes');
    if (!widget) return;
    
    const recentPostsContainer = widget.querySelector('ul');
    if (!recentPostsContainer) return;
    
    // Clear existing content
    recentPostsContainer.innerHTML = '';
    
    // Get 3 most recent articles
    const recentArticles = [...articles]
        .sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0))
        .slice(0, 3);
    
    // Add each recent article
    recentArticles.forEach(article => {
        const formattedDate = formatDate(article.published_at || new Date().toISOString());
        const category = article.category || { name: 'General', color: '#6c757d' };
        
        const listItem = document.createElement('li');
        listItem.style.marginBottom = '2rem';
        listItem.style.paddingBottom = '2rem';
        listItem.style.borderBottom = '1px solid #e0e0e0';
        
        listItem.innerHTML = `
            <h6 style="margin-bottom: 0.5rem;">
                <a href="blog-details.html?id=${article.id || ''}" 
                   style="color: #343A40; text-decoration: none;">
                    ${article.title || 'Sin título'}
                </a>
            </h6>
            <span style="color: ${category.color || '#B8860B'}; font-size: 0.9rem;">
                ${formattedDate}
            </span>
        `;
        
        recentPostsContainer.appendChild(listItem);
    });
}

// Update categories in sidebar
function updateCategories(articles) {
    const widget = findWidgetByHeadingText('Categorías');
    if (!widget) return;
    
    const categoriesContainer = widget.querySelector('ul');
    if (!categoriesContainer) return;
    
    // Definir las categorías estándar con sus colores
    const standardCategories = {
        'taekwondo': { name: 'Taekwondo', color: '#B8860B' },
        'mma': { name: 'MMA', color: '#800020' }
    };
    
    // Contar artículos por categoría
    const categoryCounts = {};
    
    // Inicializar contadores solo para categorías estándar
    Object.keys(standardCategories).forEach(catId => {
        categoryCounts[catId] = {
            ...standardCategories[catId],
            count: 0
        };
    });
    
    // Contar artículos en cada categoría
    articles.forEach(article => {
        const category = article.category || {};
        const categoryId = (category.id || '').toLowerCase();
        
        // Solo contamos las categorías estándar
        if (standardCategories[categoryId]) {
            categoryCounts[categoryId].count++;
        }
    });
    
    // Limpiar contenido existente
    categoriesContainer.innerHTML = '';
    
    // Ordenar categorías: primero Taekwondo, luego MMA
    const sortedCategories = Object.entries(categoryCounts)
        .sort(([idA], [idB]) => {
            // Ordenar Taekwondo primero, luego MMA
            if (idA === 'taekwondo') return -1;
            if (idB === 'taekwondo') return 1;
            return idA.localeCompare(idB);
        });
    
    // Agregar cada categoría
    sortedCategories.forEach(([id, cat]) => {
        // Solo mostrar categorías que tengan artículos
        if (cat.count > 0) {
            const listItem = document.createElement('li');
            listItem.style.marginBottom = '0.75rem';
            listItem.style.listStyle = 'none';
            
            // Mostrar solo el texto con el formato solicitado
            listItem.innerHTML = `
                <div style="color: ${cat.color}; font-size: 1rem;">
                    ${cat.name} (${cat.count})
                </div>
            `;
            
            categoriesContainer.appendChild(listItem);
        }
    });
}

// Initialize blog
async function initBlog() {
    try {
        // Load articles
        await fetchStaticArticles();
        
        // Get all articles
        const allArticles = getPaginatedArticles(1, null, true).articles;
        
        // Update sidebar widgets
        updateRecentPosts(allArticles);
        updateCategories(allArticles);
        
        // Render first page
        const data = getPaginatedArticles(currentPage, currentCategory);
        renderArticles(data.articles);
        
        // Add pagination if needed
        if (data.pagination.total_pages > 1) {
            renderPagination(data.pagination);
        }
        
        // Initialize category filters
        initCategoryFilters();
        
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
    } catch (error) {
        console.error('Error initializing blog:', error);
        showError('Ocurrió un error al cargar el blog. Por favor, recarga la página.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBlog();
});
