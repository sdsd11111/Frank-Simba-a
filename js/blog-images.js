/**
 * Configuración de imágenes disponibles para el blog
 * Se pueden agregar más rutas de imágenes según sea necesario
 */

// Función para normalizar las rutas de las imágenes
function getImagePath(relativePath) {
    // Asegurarse de que la ruta comience con /
    if (!relativePath.startsWith('/')) {
        relativePath = '/' + relativePath;
    }
    // Reemplazar espacios por %20 para URLs
    return relativePath.replace(/ /g, '%20');
}

const blogImages = [
    // Imágenes de blog
    { path: getImagePath('images/Blog/Blog 1.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Blog 2.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Blog 3.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Blog 4.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Blog 5.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Hero Background.webp'), category: 'Blog' },
    { path: getImagePath('images/Blog/Open Zamora 2025.webp'), category: 'Blog' },
    
    // Imágenes de logros
    { path: getImagePath('images/Logros/Antonio Maldonado-Medalla de Oro-IX Campeonato Nacional Interclubes.webp'), category: 'Logros' },
    { path: getImagePath('images/Logros/Elizabeth Maldonado-Medalla de Plata-IX Campeonato Nacional Interclubes.webp'), category: 'Logros' },
    { path: getImagePath('images/Logros/Jeremy Ortiz-Medalla de Bronce-Open Chango Academic.webp'), category: 'Logros' },
    { path: getImagePath('images/Logros/Marco Prado-Mejor Deportista-IX Campeonato Nacional Interclubes.webp'), category: 'Logros' },
    { path: getImagePath('images/Logros/Samuel Esparza-Medalla de Oro-Open Chango Academic.webp'), category: 'Logros' },
    { path: getImagePath('images/Logros/Sofia Loor-Medalla de Oro- Campeonato Nacional.webp'), category: 'Logros' },
    
    // Imágenes de MMA
    { path: getImagePath('images/MMA/Galeria entrenamiento MMA 1.jpg'), category: 'MMA' },
    { path: getImagePath('images/MMA/Galeria entrenamiento MMA 2.jpg'), category: 'MMA' },
    { path: getImagePath('images/MMA/Galeria entrenamiento MMA 3.jpg'), category: 'MMA' },
    { path: getImagePath('images/MMA/Galeria entrenamiento MMA 4.jpg'), category: 'MMA' },
    { path: getImagePath('images/MMA/Que es el MMA.jpg'), category: 'MMA' },
    
    // Imágenes de Taekwondo
    { path: getImagePath('images/Taekwondo/Combate/Combate 1.webp'), category: 'Taekwondo' },
    { path: getImagePath('images/Taekwondo/Combate/Combate 2.webp'), category: 'Taekwondo' },
    { path: getImagePath('images/Taekwondo/Combate/Combate 3.webp'), category: 'Taekwondo' },
    { path: getImagePath('images/Taekwondo/El camino del Taekwondo.webp'), category: 'Taekwondo' },
    { path: getImagePath('images/Taekwondo/Galería de Entrenamientos Taekwondo 1.webp'), category: 'Taekwondo' },
    { path: getImagePath('images/Taekwondo/Galería de Entrenamientos Taekwondo 2.webp'), category: 'Taekwondo' }
];

// Función para obtener todas las imágenes o filtrar por categoría
function getImages(category = null) {
    if (!category) return blogImages;
    return blogImages.filter(img => img.category === category);
}

// Función para buscar imágenes por término de búsqueda
function searchImages(term) {
    if (!term) return blogImages;
    const searchTerm = term.toLowerCase();
    return blogImages.filter(img => 
        img.path.toLowerCase().includes(searchTerm) ||
        img.category.toLowerCase().includes(searchTerm)
    );
}

export { getImages, searchImages };
