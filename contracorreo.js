import { app } from './firebase.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';


const auth = getAuth(app);

// validar el email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//envíar el formulario
document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const email = document.getElementById('email').value;
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const emailInput = document.getElementById('email');

    
    successMessage.textContent = '';
    errorMessage.textContent = '';
    emailInput.classList.remove('is-invalid');

    // Valida el email
    if (!validateEmail(email)) {
        emailInput.classList.add('is-invalid');
        return;
    }

    // Envía el correo de restablecimiento de contraseña
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Muestra un mensaje de éxito
            successMessage.textContent = `Se ha enviado un correo de restablecimiento de contraseña a ${email}.`;
            emailInput.value = ''; // Limpia el campo de email
        })
        .catch((error) => {
            // Muestra un mensaje de error
            errorMessage.textContent = `Error: ${error.message}`;
        });
});