# Carmina Moreno González — Portafolio profesional

Sitio estático en español basado en el currículum proporcionado. Identidad editorial en azul profundo, borgoña y dorado, fotografía cinematográfica original, tipografía local y animaciones discretas.

## Abrir el proyecto

Abre `index.html` directamente en tu navegador. No necesitas instalar paquetes ni iniciar un servidor. Todos los recursos de la página están incluidos y funcionan sin conexiones a servicios externos.

## Publicar en GitHub Pages

1. Crea un repositorio en tu cuenta de GitHub.
2. Sube **el contenido** de esta carpeta a la raíz del repositorio: `index.html`, `styles.css`, `script.js`, `assets/`, `.nojekyll` y los demás archivos incluidos. No subas solamente el ZIP.
3. En el repositorio, abre **Settings → Pages**.
4. Selecciona **Deploy from a branch**, la rama **main** y la carpeta **/ (root)**.
5. Guarda. GitHub mostrará la dirección pública cuando termine la publicación.

Las rutas son relativas: el proyecto funciona tanto en un repositorio de proyecto como en `usuario.github.io`. No se requiere compilación, servidor, framework ni workflow de Actions personalizado.

## Editar

- **Contenido y contacto:** `index.html`.
- **Paleta, composición, fuentes y versión móvil:** `styles.css`; los colores principales están en `:root`.
- **Menú, navegación activa, revelado y cursor:** `script.js`.
- **Fotografía:** `assets/hero-desktop.webp` y `assets/hero-mobile.webp`.
- **Tipografía:** `assets/fonts/`.

El correo y teléfono proceden del CV: `karmina@email.com` y `+52 998 263 4567`. La etapa de EQUINVEST conserva «Actualidad» porque así figura en el documento. Antes de publicar, actualiza estos datos si han cambiado.

## Contenido y decisiones

La experiencia aparece ordenada por etapas, con responsabilidades resumidas fielmente. Los porcentajes de estudios se mantienen: Contaduría Pública 100% y Administración de Empresas 75%. No se presenta una titulación que el documento no confirma. El documento indica un nivel de inglés de 95%; la página presenta su formación docente y experiencia en comunicación bilingüe sin convertir ese porcentaje en una certificación.

La imagen es una ambientación editorial generada para el sitio; no representa una oficina real de Carmina. No se ha inventado un retrato, métricas de desempeño, clientes, testimonios ni resultados. Se omiten de la página la fecha de nacimiento y el documento original.

## Interacciones y accesibilidad

- Menú móvil con cierre mediante enlace, toque exterior y Escape; contención del foco del teclado.
- Especialidades con desplegables HTML nativos, utilizables sin JavaScript.
- Índice de experiencia con enlaces reales a cada puesto y seguimiento de la etapa visible.
- Correo y teléfono abren la aplicación correspondiente; no existe un formulario ni se simula un envío.
- Halo del cursor solo para ratón: el puntero nativo permanece visible. Se pausa al dejar la página y cuando termina el movimiento.
- Respeto a `prefers-reduced-motion`, enlaces de salto, estados de foco y estructura semántica.
- La lectura del contenido y la navegación por anclas funcionan sin JavaScript.
- Estilos de impresión para obtener una versión en papel o guardar como PDF desde el navegador.

## Recursos

La fotografía se creó para este proyecto. Las fuentes locales P052 y Nimbus Sans pertenecen a URW Base35. Se distribuyen con su licencia en `assets/fonts/LICENSE-URW.txt` y su formato fuente original `.otf`. Los `.woff` son conversiones de estos archivos, sin cambios a sus diseños. Se incluyen para evitar dependencias de Google Fonts y mantener una carga consistente.

## Revisiones recomendadas después de publicar

Comprueba los enlaces de correo y teléfono con tus aplicaciones habituales y actualiza las fechas de experiencia cuando corresponda. No hay servicios de terceros, claves, analítica, cookies añadidas ni formularios que deban configurarse.

## Verificación realizada

Se comprobaron la sintaxis de JavaScript, la estructura del HTML, los identificadores únicos, los destinos de las anclas y la existencia de cada recurso local. No hay rutas absolutas que dependan de un dominio.

La revisión visual en el navegador integrado no se pudo realizar porque ese navegador bloquea archivos locales. No se inició un servidor local. El diseño incluye adaptaciones para pantallas de 320 px en adelante, pero queda pendiente confirmar visualmente el resultado y las interacciones en un navegador de escritorio y un teléfono.
