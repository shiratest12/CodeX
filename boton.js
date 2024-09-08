function initializeDarkMode() {
    const body = document.body;
    const toggle = document.querySelector("#toggle");
    const sunIcon = document.querySelector(".toggle .bxs-sun");
    const moonIcon = document.querySelector(".toggle .bx-moon");
    const navbar = document.getElementById("main-nav");

    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    function updateIcons(isDark) {
        if (sunIcon) {
            sunIcon.className = isDark ? "bx bx-sun" : "bx bxs-sun";
        }
        if (moonIcon) {
            moonIcon.className = isDark ? "bx bxs-moon" : "bx bx-moon";
        }
    }

    function applyDarkMode(isDark) {
        body.classList.toggle("dark", isDark);
        if (navbar) navbar.classList.toggle("dark", isDark);
        if (toggle) toggle.checked = isDark;
        updateIcons(isDark);
        localStorage.setItem('darkMode', isDark);
    }

    
    applyDarkMode(isDarkMode);

    if (toggle) {
        toggle.addEventListener("change", () => {
            const isDark = toggle.checked;
            applyDarkMode(isDark);
        });
    }
}

// DOM cargado
document.addEventListener("DOMContentLoaded", function() {
    // inicializar el modo oscuro
    initializeDarkMode();

    
    if (!document.querySelector("#toggle")) {
        const observer = new MutationObserver((mutations) => {
            if (document.querySelector("#toggle")) {
                initializeDarkMode();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});