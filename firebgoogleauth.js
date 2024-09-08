import { app } from './firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInButton = document.getElementById('signInButton');

signInButton.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Manejar el inicio de sesión exitoso
      console.log('Sesión iniciada con Google:', result.user);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
        window.location.href = "bienvenida.html";
      }, 3000);
    })
    .catch((error) => {
      // Manejar errores
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Inicio de sesión fallido. Por favor, inténtelo de nuevo.'
      });
    });
});