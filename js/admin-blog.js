/**
 * Panel de Administración del Blog
 * Maneja la creación, edición y eliminación de artículos
 */

// Hacer que las clases estén disponibles globalmente
window.BlogStorage = class BlogStorage {
    constructor() {
        this.STORAGE_KEY = 'blog_articles';
        this.articles = this.loadArticles();
    }

    loadArticles() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    }

    saveArticles() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.articles));
    }

    getArticles() {
        return [...this.articles];
    }

    getArticle(id) {
        return this.articles.find(article => article.id === id);
    }

    addArticle(article) {
        const newArticle = {
            ...article,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.articles.unshift(newArticle);
        this.saveArticles();
        return newArticle;
    }

    updateArticle(id, updates) {
        const index = this.articles.findIndex(article => article.id === id);
        if (index !== -1) {
            this.articles[index] = {
                ...this.articles[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveArticles();
            return this.articles[index];
        }
        return null;
    }

    deleteArticle(id) {
        const index = this.articles.findIndex(article => article.id === id);
        if (index !== -1) {
            this.articles.splice(index, 1);
            this.saveArticles();
            return true;
        }
        return false;
    }
}

// Clase principal de la aplicación
window.BlogAdmin = class BlogAdmin {
    constructor() {
        this.storage = new BlogStorage();
        this.currentArticleId = null;
        
        // Elementos del DOM
        this.elements = {
            formSection: document.getElementById('formSection'),
            formTitle: document.getElementById('formTitle'),
            articleForm: document.getElementById('articleForm'),
            articlesList: document.getElementById('articlesList'),
            newArticleBtn: document.getElementById('newArticleBtn'),
            cancelBtn: document.getElementById('cancelBtn'),
            confirmModal: document.getElementById('confirmModal'),
            confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
            cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
            notification: document.getElementById('notification'),
            notificationMessage: document.getElementById('notificationMessage'),
            // Campos del formulario
            formFields: {
                title: document.getElementById('title'),
                excerpt: document.getElementById('excerpt'),
                image: document.getElementById('image'),
                category: document.getElementById('category'),
                content: document.getElementById('content'),
                status: document.getElementById('status')
            },
            // Elementos de vista previa
            preview: {
                title: document.getElementById('previewTitle'),
                excerpt: document.getElementById('previewExcerpt'),
                image: document.getElementById('previewImage'),
                category: document.getElementById('previewCategory')
            },
            // Elementos del selector de imágenes
            imageSelector: {
                modal: document.getElementById('imageSelectorModal'),
                search: document.getElementById('imageSearch'),
                categoryFilter: document.getElementById('imageCategoryFilter'),
                grid: document.getElementById('imageGrid'),
                closeBtn: document.getElementById('closeImageSelector'),
                cancelBtn: document.getElementById('cancelImageSelect'),
                selectBtn: document.getElementById('selectImageBtn'),
                currentImageInput: null
            }
        };

        this.initializeEventListeners();
        this.renderArticles();
    }

    initializeEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Función auxiliar para agregar event listeners de forma segura
        const safeAddEventListener = (element, event, handler) => {
            if (element && typeof element.addEventListener === 'function') {
                element.addEventListener(event, handler);
            } else {
                console.warn(`No se pudo agregar el evento ${event} al elemento:`, element);
            }
        };
        
        // Botón para nuevo artículo
        if (this.elements.newArticleBtn) {
            safeAddEventListener(this.elements.newArticleBtn, 'click', () => this.showForm());
        }
        
        // Botón de cancelar
        if (this.elements.cancelBtn) {
            safeAddEventListener(this.elements.cancelBtn, 'click', () => this.hideForm());
        }
        
        // Envío del formulario
        if (this.elements.articleForm) {
            safeAddEventListener(this.elements.articleForm, 'submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }
        
        // Eventos para actualizar la vista previa
        const formFields = this.elements.formFields || {};
        if (formFields.title) {
            safeAddEventListener(formFields.title, 'input', () => this.updatePreview('title'));
        }
        if (formFields.excerpt) {
            safeAddEventListener(formFields.excerpt, 'input', () => this.updatePreview('excerpt'));
        }
        if (formFields.category) {
            safeAddEventListener(formFields.category, 'change', () => this.updatePreview('category'));
        }
        
        // Configurar el botón de selección de imagen
        const imageInput = formFields.image;
        const selectImageBtn = document.getElementById('selectImageBtn');
        const selectedImageName = document.getElementById('selectedImageName');
        
        if (selectImageBtn && imageInput) {
            safeAddEventListener(selectImageBtn, 'click', () => {
                console.log('Se hizo clic en el botón de selección de imagen');
                // Actualizar la vista previa cuando se selecciona una imagen
                if (imageInput.value) {
                    this.updatePreview('image');
                }
            });
        }
        
        // Actualizar el nombre de la imagen seleccionada cuando cambia el valor
        if (imageInput && selectedImageName) {
            safeAddEventListener(imageInput, 'change', () => {
                const path = imageInput.value;
                if (path) {
                    const fileName = path.split('/').pop() || path.split('\\').pop() || 'Imagen seleccionada';
                    selectedImageName.textContent = fileName;
                    selectedImageName.classList.remove('text-gray-500');
                    selectedImageName.classList.add('text-gray-900', 'font-medium');
                    this.updatePreview('image');
                } else {
                    selectedImageName.textContent = 'Ninguna imagen seleccionada';
                    selectedImageName.classList.remove('text-gray-900', 'font-medium');
                    selectedImageName.classList.add('text-gray-500');
                }
            });
        }
        
        // Eventos del modal de confirmación
        if (this.elements.confirmDeleteBtn) {
            safeAddEventListener(this.elements.confirmDeleteBtn, 'click', () => this.confirmDelete());
        }
        
        if (this.elements.cancelDeleteBtn) {
            safeAddEventListener(this.elements.cancelDeleteBtn, 'click', () => this.hideModal());
        }
        
        // Eventos del selector de imágenes (solo si existen los elementos)
        const { imageSelector } = this.elements;
        if (imageSelector) {
            if (imageSelector.search) {
                safeAddEventListener(imageSelector.search, 'input', () => this.filterImages());
            }
            if (imageSelector.categoryFilter) {
                safeAddEventListener(imageSelector.categoryFilter, 'change', () => this.filterImages());
            }
            if (imageSelector.closeBtn) {
                safeAddEventListener(imageSelector.closeBtn, 'click', () => this.closeImageSelector());
            }
            if (imageSelector.cancelBtn) {
                safeAddEventListener(imageSelector.cancelBtn, 'click', () => this.closeImageSelector());
            }
            if (imageSelector.selectBtn) {
                safeAddEventListener(imageSelector.selectBtn, 'click', () => this.selectImage());
            }
            
            // Cerrar modal al hacer clic fuera del contenido
            if (imageSelector.modal) {
                safeAddEventListener(imageSelector.modal, 'click', (e) => {
                    if (e.target === imageSelector.modal) {
                        this.closeImageSelector();
                    }
                });
            }
        }
        
        // Cerrar con tecla Escape
        safeAddEventListener(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.elements.imageSelector?.modal && 
                !this.elements.imageSelector.modal.classList.contains('hidden')) {
                this.closeImageSelector();
            }
        });
        
        console.log('Event listeners inicializados correctamente');
    }

    // Mostrar formulario (nuevo o edición)
    showForm(articleId = null) {
        this.currentArticleId = articleId;
        
        if (articleId) {
            // Modo edición
            const article = this.storage.getArticle(articleId);
            if (article) {
                this.elements.formTitle.textContent = 'Editar Artículo';
                this.populateForm(article);
            }
        } else {
            // Modo nuevo
            this.elements.formTitle.textContent = 'Nuevo Artículo';
            this.elements.articleForm.reset();
            this.updatePreview();
        }
        
        this.elements.formSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Ocultar formulario
    hideForm() {
        this.elements.formSection.classList.add('hidden');
        this.currentArticleId = null;
        this.elements.articleForm.reset();
    }

    loadArticleForEdit(article) {
        this.currentArticle = article;
        this.currentArticleId = article.id;
        
        // Llenar el formulario con los datos del artículo
        this.elements.formFields.title.value = article.title || '';
        this.elements.formFields.excerpt.value = article.excerpt || '';
        this.elements.formFields.category.value = article.category || '';
        
        // Asegurarse de que la ruta de la imagen sea relativa
        let imagePath = article.image || '';
        if (imagePath) {
            // Eliminar cualquier ruta absoluta o barras iniciales
            imagePath = imagePath.replace(/^.*[\\/]/, '');
            // Asegurar que use barras inclinadas
            imagePath = imagePath.replace(/\\/g, '/');
        }
        this.elements.formFields.image.value = imagePath;
        
        // Actualizar la vista previa
        this.updatePreview();
        
        // Mostrar el formulario con el título de edición
        this.elements.formTitle.textContent = 'Editar Artículo';
        this.elements.formSection.classList.remove('hidden');
        this.elements.formSection.scrollIntoView({ behavior: 'smooth' });
        
        // Enfocar el primer campo
        this.elements.formFields.title.focus();
    }

    // Actualizar la vista previa
    updatePreview() {
        console.log('Actualizando vista previa...');
        
        // Obtener valores del formulario
        const title = this.elements.formFields.title?.value || 'Título del artículo';
        const excerpt = this.elements.formFields.excerpt?.value || 'Este es un extracto del artículo que aparecerá en la tarjeta.';
        const category = this.elements.formFields.category?.value || 'General';
        let imagePath = this.elements.formFields.image?.value || '';
        
        console.log('Valores del formulario:', { title, excerpt, category, imagePath });
        
        // Actualizar la vista previa
        if (this.elements.preview.title) this.elements.preview.title.textContent = title;
        if (this.elements.preview.excerpt) this.elements.preview.excerpt.textContent = excerpt;
        if (this.elements.preview.category) this.elements.preview.category.textContent = category;
        
        // Manejar la imagen
        if (this.elements.preview.image) {
            if (imagePath) {
                // Limpiar y normalizar la ruta de la imagen
                imagePath = imagePath.trim();
                
                // Decodificar la URL para manejar caracteres especiales
                try {
                    imagePath = decodeURIComponent(imagePath);
                } catch (e) {
                    console.warn('Error al decodificar la URL de la imagen:', e);
                }
                
                // Determinar la URL final de la imagen
                let finalImageUrl = imagePath;
                
                // Si la ruta no es una URL completa ni un data URL, asumir que es relativa
                if (!imagePath.startsWith('http') && !imagePath.startsWith('data:') && !imagePath.startsWith('/')) {
                    finalImageUrl = '/' + imagePath;
                }
                
                console.log('Cargando imagen:', finalImageUrl);
                
                // Establecer la imagen
                this.elements.preview.image.src = finalImageUrl;
                this.elements.preview.image.alt = title || 'Imagen del artículo';
                this.elements.preview.image.classList.remove('hidden');
                
                // Manejar errores de carga de imagen
                this.elements.preview.image.onerror = () => {
                    console.error('Error al cargar la imagen:', finalImageUrl);
                    this.elements.preview.image.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100" height="100" fill="%23FEE2E2" /%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="%23DC2626"%3EImagen no encontrada%3C/text%3E%3C/svg%3E';
                    this.elements.preview.image.alt = 'Error al cargar la imagen';
                    if (this.elements.preview.image.parentElement) {
                        this.elements.preview.image.parentElement.classList.add('bg-gray-100', 'flex', 'items-center', 'justify-center');
                    }
                };
                
                // Limpiar el manejador de errores después de cargar correctamente
                this.elements.preview.image.onload = () => {
                    console.log('Imagen cargada correctamente:', finalImageUrl);
                    if (this.elements.preview.image.parentElement) {
                        this.elements.preview.image.parentElement.classList.remove('bg-gray-100', 'flex', 'items-center', 'justify-center');
                    }
                };
            } else {
                // Mostrar placeholder si no hay imagen
                this.elements.preview.image.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100" height="100" fill="%23E5E7EB" /%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="%239CA3AF"%3ESin imagen%3C/text%3E%3C/svg%3E';
                this.elements.preview.image.alt = 'Sin imagen seleccionada';
                if (this.elements.preview.image.parentElement) {
                    this.elements.preview.image.parentElement.classList.add('bg-gray-100', 'flex', 'items-center', 'justify-center');
                }
            }
        }
    }

    // Manejar envío del formulario
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        if (!this.elements.formFields.title.value.trim()) {
            this.showNotification('El título es requerido');
            this.elements.formFields.title.focus();
            return;
        }
        
        if (!this.elements.formFields.excerpt.value.trim()) {
            this.showNotification('El extracto es requerido');
            this.elements.formFields.excerpt.focus();
            return;
        }
        
        if (!this.elements.formFields.image.value.trim()) {
            this.showNotification('La ruta de la imagen es requerida');
            this.elements.formFields.image.focus();
            return;
        }
        
        // Normalizar la ruta de la imagen (reemplazar \ por / y asegurar que no empiece con /)
        let imagePath = this.elements.formFields.image.value.trim();
        imagePath = imagePath.replace(/\\/g, '/');
        if (imagePath.startsWith('/')) {
            imagePath = imagePath.substring(1);
        }
        
        // Crear o actualizar el artículo con solo los campos necesarios
        const articleData = {
            id: this.currentArticleId || `article-${Date.now()}`,
            title: this.elements.formFields.title.value.trim(),
            excerpt: this.elements.formFields.excerpt.value.trim(),
            category: this.elements.formFields.category.value || 'Sin categoría',
            image: imagePath
        };
        
        try {
            if (this.currentArticleId) {
                // Actualizar artículo existente
                this.storage.updateArticle(this.currentArticleId, articleData);
                this.showNotification('Artículo actualizado correctamente');
            } else {
                // Crear nuevo artículo
                this.storage.addArticle(articleData);
                this.showNotification('Artículo creado correctamente');
            }
            
            this.hideForm();
            this.renderArticles();
        } catch (error) {
            console.error('Error al guardar el artículo:', error);
            this.showNotification('Error al guardar el artículo. Por favor, inténtalo de nuevo.');
        }
    }

    // Mostrar modal de confirmación para eliminar
    showDeleteConfirmation(articleId) {
        this.currentArticleId = articleId;
        this.elements.confirmModal.classList.remove('hidden');
    }

    // Ocultar modal
    hideModal() {
        this.elements.confirmModal.classList.add('hidden');
        this.currentArticleId = null;
    }

    // Confirmar eliminación
    confirmDelete() {
        if (this.currentArticleId) {
            const deleted = this.storage.deleteArticle(this.currentArticleId);
            if (deleted) {
                this.showNotification('Artículo eliminado correctamente');
                this.renderArticles();
            }
        }
        this.hideModal();
    }

    // Mostrar notificación
    showNotification(message) {
        this.elements.notificationMessage.textContent = message;
        this.elements.notification.classList.remove('translate-y-16');
        
        setTimeout(() => {
            this.elements.notification.classList.add('translate-y-16');
        }, 3000);
    }
    
    // Inicialización simplificada - sin selector de imágenes
    initImageSelector() {
        // Esta función se mantiene por compatibilidad pero no hace nada
        console.log('Selector de imágenes deshabilitado');
        if (selectedImage && this.elements.imageSelector.currentImageInput) {
            let imagePath = selectedImage.getAttribute('data-path');
            const imageInput = this.elements.imageSelector.currentImageInput;
            
            // Asegurarse de que la ruta no comience con la ruta completa del sistema de archivos
            const fullPath = 'D:/Abel paginas/Frank-Simba-a-main';
            if (imagePath.startsWith(fullPath)) {
                imagePath = imagePath.substring(fullPath.length);
            }
            
            // Asegurarse de que la ruta use barras inclinadas hacia adelante
            imagePath = imagePath.replace(/\\/g, '/');
            
            // Si la ruta no comienza con /images, agregar /images/
            if (!imagePath.startsWith('/images/') && !imagePath.startsWith('images/')) {
                imagePath = 'images/' + imagePath.replace(/^\//, '');
            }
            
            console.log('Ruta de la imagen seleccionada:', imagePath);
            
            // Establecer el valor y disparar el evento change
            imageInput.value = imagePath;
            const event = new Event('change', { bubbles: true });
            imageInput.dispatchEvent(event);
            
            // Actualizar la vista previa y cerrar el selector
            this.updatePreview('image');
            this.closeImageSelector();
        }
    }

    // Renderizar la lista de artículos
    renderArticles() {
        console.log('Iniciando renderArticles...');
        
        try {
            // Verificar que articlesList existe
            if (!this.elements.articlesList) {
                console.error('No se encontró el elemento articlesList en el DOM');
                return;
            }
            
            // Mostrar mensaje de carga
            this.elements.articlesList.innerHTML = '<p class="text-center py-4">Cargando artículos...</p>';
            
            // Obtener artículos del almacenamiento
            const articles = this.storage.getArticles();
            console.log('Artículos encontrados:', articles);
            
            // Pequeño retraso para permitir que el DOM se actualice
            setTimeout(() => {
                try {
                    if (!articles || articles.length === 0) {
                        this.elements.articlesList.innerHTML = `
                            <div class="col-span-full p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay artículos creados</h3>
                                <p class="mt-1 text-sm text-gray-500">Comienza creando tu primer artículo.</p>
                                <div class="mt-6">
                                    <button type="button" id="createFirstArticle" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                        </svg>
                                        Nuevo Artículo
                                    </button>
                                </div>
                            </div>
                        `;
                        
                        const createButton = document.getElementById('createFirstArticle');
                        if (createButton) {
                            createButton.addEventListener('click', () => this.showForm());
                        } else {
                            console.error('No se encontró el botón createFirstArticle');
                        }
                        return;
                    }
                    
                    // Crear un contenedor con grid responsivo
                    const articlesHTML = articles.map(article => this.createArticleCard(article)).join('');
                    this.elements.articlesList.innerHTML = `
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${articlesHTML}
                        </div>
                    `;
                    
                    console.log('Artículos renderizados en el DOM');
                    
                    // Agregar event listeners a los botones de acción
                    document.querySelectorAll('.edit-article').forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            const articleId = e.currentTarget.dataset.id;
                            console.log('Editando artículo:', articleId);
                            const article = this.storage.getArticle(articleId);
                            if (article) {
                                this.loadArticleForEdit(article);
                            } else {
                                console.error('No se encontró el artículo con ID:', articleId);
                            }
                        });
                    });
                    
                    document.querySelectorAll('.delete-article').forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            const articleId = e.currentTarget.dataset.id;
                            console.log('Solicitando eliminar artículo:', articleId);
                            this.showDeleteConfirmation(articleId);
                        });
                    });
                    
                } catch (error) {
                    console.error('Error al renderizar artículos:', error);
                    this.elements.articlesList.innerHTML = `
                        <div class="bg-red-50 border-l-4 border-red-400 p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm text-red-700">Error al cargar los artículos. Por favor, recarga la página.</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }, 100);
            
        } catch (error) {
            console.error('Error en renderArticles:', error);
            if (this.elements.articlesList) {
                this.elements.articlesList.innerHTML = `
                    <div class="bg-red-50 border-l-4 border-red-400 p-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-red-700">Error crítico al cargar los artículos. Por favor, recarga la página.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Crear el HTML de una tarjeta de artículo
    createArticleCard(article) {
        const { id, title, excerpt, category, image } = article;
        
        return `
            <div class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200" data-id="${id}">
                <div class="flex flex-col h-full">
                    <div class="relative h-40 overflow-hidden rounded-t-lg">
                        <img 
                            class="w-full h-full object-cover" 
                            src="${image || 'data:image/svg+xml;charset=UTF-8,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100" height="100" fill="%23E5E7EB" /%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="%239CA3AF"%3ESin imagen%3C/text%3E%3C/svg%3E'}" 
                            alt="${title}"
                            onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100" height="100" fill="%23FEE2E2" /%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="%23DC2626"%3EImagen no encontrada%3C/text%3E%3C/svg%3E'"
                        >
                    </div>
                    <div class="p-4 flex-1 flex flex-col">
                        <div class="flex-1">
                            <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
                                ${category || 'Sin categoría'}
                            </span>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">${title}</h3>
                            <p class="text-sm text-gray-600 line-clamp-3">${excerpt}</p>
                        </div>
                        <div class="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">ID: ${id}</span>
                            <div class="flex space-x-2">
                                <button class="edit-article p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" data-id="${id}" title="Editar">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button class="delete-article p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors" data-id="${id}" title="Eliminar">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Inicializando BlogAdmin...');
        window.blogAdmin = new BlogAdmin();
        
        // Verificar que los elementos del DOM estén disponibles
        if (!document.getElementById('articlesList')) {
            console.error('No se encontró el elemento articlesList');
            return;
        }
        
        // Mostrar mensaje de carga
        const articlesList = document.getElementById('articlesList');
        articlesList.innerHTML = '<p class="text-center py-4">Cargando artículos...</p>';
        
        // Renderizar artículos después de un pequeño retraso para asegurar que el DOM esté listo
        setTimeout(() => {
            try {
                window.blogAdmin.renderArticles();
                console.log('Artículos renderizados');
            } catch (error) {
                console.error('Error al renderizar artículos:', error);
                articlesList.innerHTML = `
                    <div class="bg-red-50 border-l-4 border-red-400 p-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-red-700">Error al cargar los artículos. Por favor, recarga la página.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }, 100);
    } catch (error) {
        console.error('Error al inicializar BlogAdmin:', error);
        const articlesList = document.getElementById('articlesList');
        if (articlesList) {
            articlesList.innerHTML = `
                <div class="bg-red-50 border-l-4 border-red-400 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">Error crítico al inicializar el panel de administración. Por favor, recarga la página.</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
});
