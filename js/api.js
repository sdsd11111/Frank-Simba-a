// URL base de la API
const API_BASE_URL = '/api';

// Función para manejar respuestas de la API
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'Error en la petición');
    error.response = response;
    error.data = data;
    throw error;
  }
  return data;
}

// Función para realizar peticiones a la API
async function apiRequest(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Obtener el token de autenticación si existe
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}

// Funciones específicas para la autenticación
export const auth = {
  async login(username, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async verify() {
    return apiRequest('/auth/verify');
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'admin-login.html';
  },
};

// Funciones para artículos
export const articles = {
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/articles?${query}`);
  },

  getById(id) {
    return apiRequest(`/articles/${id}`);
  },

  create(articleData) {
    const formData = new FormData();
    
    // Agregar campos al FormData
    Object.entries(articleData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return apiRequest('/articles', {
      method: 'POST',
      headers: {
        // No establecer Content-Type, se establecerá automáticamente con el boundary
      },
      body: formData,
    });
  },

  update(id, articleData) {
    const formData = new FormData();
    
    // Agregar campos al FormData
    Object.entries(articleData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return apiRequest(`/articles/${id}`, {
      method: 'PUT',
      headers: {
        // No establecer Content-Type, se establecerá automáticamente con el boundary
      },
      body: formData,
    });
  },

  delete(id) {
    return apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Funciones para categorías
export const categories = {
  getAll() {
    return apiRequest('/categories');
  },

  create(categoryData) {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  update(id, categoryData) {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  delete(id) {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Función para subir archivos
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al subir el archivo');
  }

  return response.json();
};

// Exportar todo por defecto
export default {
  auth,
  articles,
  categories,
  uploadFile,
};
