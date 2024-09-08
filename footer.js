document.addEventListener("DOMContentLoaded", function() {
    loadFooter();
});

function loadFooter() {
    document.getElementById("footer").innerHTML = `
    <footer class="page-footer dark">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <h5>Soporte</h5>
                    <ul>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="contact-us.html">Contacto</a></li>
                    </ul>
                </div>
                <div class="col-sm-6">
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="termsofuse.html">Terminos de uso</a></li>
                        <li><a href="privacity.html">Política de privacidad</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-copyright">
                <p>© 2024 Codex</p>
            </div>
        
    </footer>
    `;
}
