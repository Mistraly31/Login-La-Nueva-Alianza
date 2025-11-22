// Cuentas editables
const accounts = {
    "Usuario1": "Contraseña1",
    // Añade más así:
    // "Shadow": "Clave123",
    // "Admin": "Secreto"
};

// Procesar login
function doLogin() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (accounts[user] && accounts[user] === pass) {
        sessionStorage.setItem("logged", "yes");
        window.location.href = "hub.html";
    } else {
        window.location.href = "fail.html";
    }
}

// Proteger páginas internas
function requireLogin() {
    if (sessionStorage.getItem("logged") !== "yes") {
        window.location.href = "fail.html";
    }
}
