import { app } from './firebase.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';


const auth = getAuth(app);


let darkMode = localStorage.getItem('darkMode') === 'true';

function renderNavbar(isLoggedIn) {
    const navbarContainer = document.getElementById('navbar-container');
    const navbarContent = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="main-nav">
        <div class="container-fluid">
            <a class="navbar-brand">
                <img src="assets/img/ion.png" alt="Logo" width="80" height="auto">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                ${isLoggedIn ? getLoggedInNavbar() : getNotLoggedInNavbar()}
            </div>
        </div>
    </nav>
    <div id="notificationContainer"></div>
    `;

    navbarContainer.innerHTML = navbarContent;
    initializeEvents();
    initializeDarkMode();
}

function getLoggedInNavbar() {
    return `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2" href="table.html">Practica</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2" href="quiz.html">Quiz</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2" href="blog2.html">Blogs</a>
            </li>
             <li class="nav-item">
                <a class="nav-link btn-yellow me-2 " href="editor.html">Editor</a>
            </li>
        </ul>
        <div class="d-flex align-items-center">
            <input type="checkbox" id="toggle" hidden>
            <label for="toggle" class="toggle me-3">
                <i class="bx bxs-sun"></i>
                <i class="bx bx-moon"></i>
                <span class="ball"></span>
            </label>
            <a class="nav-link btn-yellow me-2" href="perfil.html" id="perfil">Perfil</a>
            <a class="nav-link btn-yellow me-2 " href="#" id="cerrarSesionBtn">Cerrar Sesión</a>
        </div>
    `;
}

function getNotLoggedInNavbar() {
    return `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2 not-logged-in" href="#">Practica</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2 not-logged-in" href="#">Quiz</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn-yellow me-2 not-logged-in" href="#">Blogs</a>
            </li>
             <li class="nav-item">
                <a class="nav-link btn-yellow me-2 not-logged-in" href="#">Editor</a>
            </li>
        </ul>
        <div class="d-flex align-items-center">
            <input type="checkbox" id="toggle" hidden>
            <label for="toggle" class="toggle me-3">
                <i class="bx bxs-sun"></i>
                <i class="bx bx-moon"></i>
                <span class="ball"></span>
            </label>
            <a class="nav-link btn-yellow me-2" href="login.html">Iniciar Sesión</a>
            <a class="nav-link btn-yellow me-2" href="registration.html">Registro</a>
        </div>
    `;
}

function initializeDarkMode() {
    const toggle = document.querySelector("#toggle");
    if (toggle) {
        toggle.checked = darkMode;
        applyDarkMode();
        toggle.addEventListener("change", toggleDarkMode);
    }
}

function applyDarkMode() {
    const body = document.body;
    const mainNav = document.querySelector("#main-nav");
    const sunIcon = document.querySelector(".toggle .bxs-sun");
    const moonIcon = document.querySelector(".toggle .bx-moon");

    if (darkMode) {
        body.classList.add('dark');
        if (mainNav) mainNav.classList.add('dark');
        if (sunIcon) sunIcon.className = "bx bx-sun";
        if (moonIcon) moonIcon.className = "bx bxs-moon";
    } else {
        body.classList.remove('dark');
        if (mainNav) mainNav.classList.remove('dark');
        if (sunIcon) sunIcon.className = "bx bxs-sun";
        if (moonIcon) moonIcon.className = "bx bx-moon";
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
}

function initializeEvents() {
    const cerrarSesionBtn = document.querySelector('#cerrarSesionBtn');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signOut(auth).then(() => {
                console.log('Sesión cerrada correctamente');
                mostrarNotificacion('info', 'Información', 'Sesión cerrada correctamente');
                window.location.href = 'index.html'; // Redirigir a indexinicio.html
            }).catch((error) => {
                console.error('Error al cerrar sesión:', error);
                mostrarNotificacion('error', 'Error', 'No se pudo cerrar la sesión');
            });
        });
    }

    const notLoggedInLinks = document.querySelectorAll('.not-logged-in');
    notLoggedInLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarNotificacion('warning', 'Advertencia', 'Debes iniciar sesión para acceder a esta función');
        });
    });
}

function mostrarNotificacion(tipo, titulo, mensaje) {
    const container = document.getElementById('notificationContainer');
    const notificationId = 'notification-' + Date.now();
    
    const notification = `
        <div id="${notificationId}" class="notification alert alert-${tipo} alert-dismissible fade show" role="alert">
            <strong>${titulo}</strong> ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    container.innerHTML += notification;
    
    setTimeout(() => {
        const alertElement = document.getElementById(notificationId);
        if (alertElement) {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }
    }, 5000);
}

export function initializeNavbar() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('Usuario logueado:', user.uid);
            renderNavbar(true);
        } else {
            console.log('No hay usuario logueado');
            renderNavbar(false);
        }
    });
}