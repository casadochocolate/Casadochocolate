# Casa Do Chocolate

Catálogo estático de chocolates artesanales. El sitio publicado en GitHub Pages está en `docs/` y no necesita backend, Python, una base de datos ni un proceso de compilación.

## Publicar en GitHub Pages

En GitHub abre **Settings > Pages**, selecciona **Deploy from a branch**, elige la rama `main` y la carpeta `/docs`, y guarda.

## Actualizar el catálogo

Guarda las fotos de producto en `products/` y en `docs/products/`. Registra sus nombres de archivo en `productImageFiles`, dentro de `docs/js/menu.js` y `js/menu.js`; la página agrupa automáticamente copias con sufijos como `(2)` y nombres numerados secuencialmente en una galería. `fondo.jpeg` y `Dueña.jpeg` se reservan para el banner y la sección de historia, no para las tarjetas.

Edita `docs/css/menu.css` para cambiar los estilos del sitio publicado. La página de GitHub Pages se sirve desde `docs/`; `index.html`, `css/` y `js/` en la raíz son una copia para vista local. Publica los cambios actualizando la rama configurada en GitHub Pages.
