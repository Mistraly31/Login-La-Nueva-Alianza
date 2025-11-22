// Usuarios: username => sha256 hash de la contraseña
// hash generado con cualquier generador online de SHA-256
const accounts = {
    "Usuario1": "99a52df3ff3d499488e2fa28150c4106a2cb5e928891a830a9aa3922b2d32160" // hash de "Contraseña1"
};

// Función para convertir input a hash (SHA-256)
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Login
async function doLogin() {
    const user = (document.getElementById('user')||{}).value.trim();
    const pass = (document.getElementById('pass')||{}).value;

    if(!user || !pass) return;

    const hashed = await sha256(pass);

    if(accounts[user] && accounts[user] === hashed) {
        sessionStorage.setItem('logged','yes');
        window.location.href = 'hub/index.html';
    } else {
        window.location.href = 'fail.html';
    }
}

// Proteger páginas
function requireLogin(failPath='../fail.html') {
    if(sessionStorage.getItem('logged') !== 'yes'){
        window.location.href = failPath;
    }
}
