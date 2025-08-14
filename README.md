# Frank Simba - Blog Estático

Este proyecto implementa un sistema de blog estático con panel de administración, diseñado para funcionar sin necesidad de una base de datos dinámica. Los artículos se generan como archivos HTML estáticos, lo que permite un despliegue sencillo en cualquier servicio de hosting estático.

## Características Principales

- **Generación de artículos estáticos** a partir de archivos JSON
- **Panel de administración** para gestión de contenido
- **Paginación** de artículos
- **Filtrado por categorías**
- **Diseño responsive** y moderno
- **Sin dependencia de base de datos** en producción

## Estructura del Proyecto

```
Frank-Simba-a-main/
├── css/                    # Estilos CSS
│   └── style.css          # Estilos principales
├── js/
│   ├── blog.js            # Versión antigua del blog
│   └── blog-new.js        # Nueva implementación con funcionalidad mejorada
├── public/
│   └── posts/             # Artículos generados como HTML estático
│       └── index.json     # Índice de artículos
├── templates/
│   └── article.html       # Plantilla para artículos
├── data/
│   └── articles.json      # Datos de ejemplo de artículos
├── scripts/
│   └── generate-articles.js # Script para generar artículos estáticos
└── index.html             # Página principal del blog
```

## Configuración y Uso

### Requisitos Previos

- Node.js (v14 o superior)
- NPM o Yarn

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
   o
   ```bash
   yarn install
   ```

### Generación de Artículos Estáticos

1. Coloca tus artículos en formato JSON en `data/articles.json`
2. Ejecuta el script de generación:
   ```bash
   node scripts/generate-articles.js
   ```
3. Los artículos estáticos se generarán en `public/posts/`

### Estructura de Datos de Artículos

Cada artículo debe seguir este formato:

```json
{
  "id": 1,
  "title": "Título del Artículo",
  "slug": "titulo-del-articulo",
  "excerpt": "Resumen del artículo...",
  "content": "<p>Contenido completo en HTML</p>",
  "published_at": "2025-08-13T00:00:00.000Z",
  "image_url": "/ruta/a/imagen.jpg",
  "category": {
    "id": 1,
    "name": "Tecnología",
    "slug": "tecnologia"
  },
  "author": {
    "name": "Nombre del Autor",
    "avatar": "/ruta/a/avatar.jpg"
  }
}
```

## Funcionalidades Implementadas

### Frontend del Blog

- Carga dinámica de artículos desde archivos estáticos
- Paginación con navegación
- Filtrado por categorías
- Diseño responsive
- Transiciones suaves

### Panel de Administración

- Autenticación de usuarios
- Gestión de artículos (CRUD)
- Subida de imágenes
- Vista previa de artículos

## Despliegue

El blog está diseñado para ser desplegado en servicios de hosting estático como:

- Vercel
- Netlify
- GitHub Pages
- Cualquier servicio de hosting estático

### Pasos para Despliegue

1. Generar los artículos estáticos
2. Subir la carpeta `public` a tu servicio de hosting
3. Configurar las rutas para que apunten a `index.html` (SPA fallback)

## Personalización

### Estilos

Los estilos principales se encuentran en `css/style.css`. Puedes personalizar:

- Colores principales
- Tipografía
- Espaciados
- Diseño de tarjetas de artículos

### Plantillas

La plantilla de artículos está en `templates/article.html`. Modifícala para cambiar la estructura de los artículos generados.

## Solución de Problemas Comunes

### Los artículos no se cargan

1. Verifica que el archivo `public/posts/index.json` existe
2. Asegúrate de que las rutas en los artículos sean correctas
3. Revisa la consola del navegador para errores

### Los estilos no se aplican

1. Verifica que las rutas a los archivos CSS sean correctas
2. Asegúrate de que los estilos no estén siendo sobrescritos

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para soporte o consultas, por favor contacta al equipo de desarrollo.
