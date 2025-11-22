/* assets/js/login.js
   Cuentas: edítalas aquí (texto plano, solo para demos).
   requireLogin(failPath) acepta la ruta relativa a la página que lo llama.
*/

const accounts = {
  "Usuario1": "Contraseña1"
  // "Shadow": "Clave123",
  // "Admin": "Secreto"
};

// Iniciar sesión (llamado desde index.html)
function doLogin() {
  const user = (document.getElementById('user') || {}).value || '';
  const pass = (document.getElementById('pass') || {}).value || '';

  const u = user.trim();
  const p = pass.trim();

  if (u && accounts[u] && accounts[u] === p) {
    // marcar sesión válida (solo en la pestaña actual)
    sessionStorage.setItem('logged', 'yes');

    // redirigir al hub (ruta relativa desde donde se llame)
    // Si estás en la raíz, "hub/index.html" funciona
    window.location.href = 'hub/index.html';
  } else {
    // redirigir a página de fallo (ruta relativa desde la página de login)
    window.location.href = 'fail.html';
  }
}

// Proteger páginas internas
// failPath: ruta relativa hacia fail.html desde la página actual.
// Ejemplos:
// - Si la página está en /hub/index.html, llama requireLogin('../fail.html')
// - Si la página está en /texts/t1.html, llama requireLogin('../fail.html')
// - Si la página está en /index.html (root) puedes llamar requireLogin('fail.html') pero normalmente no se usa en root
function requireLogin(failPath = 'fail.html') {
  if (sessionStorage.getItem('logged') !== 'yes') {
    // redirige a la ruta solicitada
    window.location.href = failPath;
  }
}
