# Login — La Nueva Alianza

Repositorio con versión estática para GitHub Pages del login.

## Cómo editar cuentas y textos
- Edita `data/users.json` para añadir usuarios.
- Edita `data/texts.json` para cambiar los textos que aparecen tras iniciar sesión.

## Despliegue con GitHub Pages
1. Sube el repositorio a GitHub.
2. En la página del repo → Settings → Pages → Source: `main` branch → root.
3. Espera (unos segundos) y accede a `https://<tu-usuario>.github.io/Login-La-Nueva-Alianza/`.

## Notas de seguridad
- Este sistema almacena contraseñas en texto claro. Solo usar para demos internas.
- Para producción, implementa autenticación server-side y HTTPS (con backend).
