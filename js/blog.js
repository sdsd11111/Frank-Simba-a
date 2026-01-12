// Blog functionality - Versión actualizada para usar localStorage
const API_BASE_URL = '/posts';
let currentPage = 1;
let currentCategory = null;
const itemsPerPage = 6;
let categories = ['Taekwondo', 'MMA', 'Entrenamiento'];
let allArticles = [];

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

// Load articles from localStorage
function loadArticlesFromStorage() {
    const savedArticles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    return {
        data: savedArticles.map(article => ({
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            published_at: article.date,
            category: { id: categories.indexOf(article.category) + 1, name: article.category },
            image_url: article.image
        })),
        meta: {
            current_page: 1,
            last_page: Math.ceil(savedArticles.length / itemsPerPage),
            total: savedArticles.length,
            per_page: itemsPerPage
        }
    };
}

// Fetch articles with pagination and filtering
async function fetchArticles(page = 1, categoryId = null) {
    try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        
        const { data, meta } = loadArticlesFromStorage();
        allArticles = data;
        
        // Filter by category if specified
        let filtered = [...allArticles];
        if (categoryId) {
            filtered = filtered.filter(article => article.category.id == categoryId);
        }
        
        // Pagination
        const start = (page - 1) * itemsPerPage;
        const paginatedItems = filtered.slice(start, start + itemsPerPage);
        
        return {
            articles: paginatedItems,
            pagination: {
                current_page: page,
                total_pages: Math.ceil(filtered.length / itemsPerPage),
                total_items: filtered.length
            }
        };
    } catch (error) {
        console.error('Error:', error);
        showError('No se pudieron cargar los artículos. Por favor, inténtalo de nuevo más tarde.');
        throw error;
    } finally {
        setLoading(false);
    }
}

// Resto del código permanece igual...
// [El resto del archivo blog.js original se mantiene igual]
