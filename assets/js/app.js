/* app.js - Login estático para GitHub Pages
   - Lee data/users.json y data/texts.json
   - Si no puede leer (modo local), usa fallback incorporado
*/

(() => {
  const SELECTORS = {
    loginScreen: document.getElementById('screen-login'),
    failedScreen: document.getElementById('screen-failed'),
    mainScreen: document.getElementById('screen-main'),
    userInput: document.getElementById('input-user'),
    passInput: document.getElementById('input-pass'),
    btnLogin: document.getElementById('btn-login'),
    btnBack: document.getElementById('btn-back'),
    btnLogout: document.getElementById('btn-logout'),
    textsContainer: document.getElementById('texts-container')
  };

  // Rutas a JSON dentro del repo
  const PATHS = {
    users: '/data/users.json',
    texts: '/data/texts.json'
  };

  // Fallback (por si fetch no funciona en entorno local directo)
  const FALLBACK = {
    users: { "Usuario1": "Contraseña1" },
    texts: [ "Texto 1 visible aquí.", "Texto 2 visible aquí.", "Texto 3 visible aquí." ]
  };

  let users = {};
  let texts = [];

  // Manejadores UI
  function showLogin(){ SELECTORS.loginScreen.classList.remove('screen-hidden'); SELECTORS.loginScreen.classList.add('screen-visible'); }
  function hideLogin(){ SELECTORS.loginScreen.classList.remove('screen-visible'); SELECTORS.loginScreen.classList.add('screen-hidden'); }
  function showFailed(){ SELECTORS.failedScreen.classList.remove('screen-hidden'); SELECTORS.failedScreen.classList.add('screen-visible'); }
  function hideFailed(){ SELECTORS.failedScreen.classList.remove('screen-visible'); SELECTORS.failedScreen.classList.add('screen-hidden'); }
  function showMain(){ SELECTORS.mainScreen.classList.remove('screen-hidden'); SELECTORS.mainScreen.classList.add('screen-visible'); }
  function hideMain(){ SELECTORS.mainScreen.classList.remove('screen-visible'); SELECTORS.mainScreen.classList.add('screen-hidden'); }

  // Carga JSON con fallback silencioso
  async function loadData() {
    try {
      const [uRes, tRes] = await Promise.all([
        fetch(PATHS.users).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(PATHS.texts).then(r => r.ok ? r.json() : Promise.reject())
      ]);
      users = uRes || FALLBACK.users;
      texts = Array.isArray(tRes) ? tRes : FALLBACK.texts;
    } catch(e) {
      // fallback silencioso: útil para pruebas locales
      users = FALLBACK.users;
      texts = FALLBACK.texts;
      console.warn('No se pudieron cargar los JSON desde /data; usando fallback incorporado.', e);
    }
  }

  function renderTexts() {
    SELECTORS.textsContainer.innerHTML = '';
    for(const t of texts){
      const p = document.createElement('p');
      p.textContent = t;
      p.className = 'text-block';
      SELECTORS.textsContainer.appendChild(p);
    }
  }

  function doLoginAttempt() {
    const u = (SELECTORS.userInput.value || '').trim();
    const p = (SELECTORS.passInput.value || '').trim();
    if(!u || !p) return failedFlow();

    if(users[u] && users[u] === p){
      // éxito
      hideLogin(); hideFailed();
      renderTexts();
      showMain();
      // limpiar inputs
      SELECTORS.userInput.value = '';
      SELECTORS.passInput.value = '';
    } else {
      failedFlow();
    }
  }

  function failedFlow(){
    hideLogin(); hideMain(); showFailed();
  }

  function logoutFlow(){
    hideMain(); hideFailed(); showLogin();
  }

  // Eventos
  SELECTORS.btnLogin.addEventListener('click', doLoginAttempt);
  SELECTORS.userInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') doLoginAttempt(); });
  SELECTORS.passInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') doLoginAttempt(); });
  SELECTORS.btnBack.addEventListener('click', () => { logoutFlow(); });
  SELECTORS.btnLogout.addEventListener('click', () => { logoutFlow(); });

  // Inicialización
  (async function init(){
    await loadData();
    showLogin();
    SELECTORS.userInput.focus();
  })();

})();
