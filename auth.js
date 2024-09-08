import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBMLc7nuiPvOPvehlArKZZyCM0Ccf1g198",
    authDomain: "codex-414305.firebaseapp.com",
    projectId: "codex-414305",
    storageBucket: "codex-414305.appspot.com",
    messagingSenderId: "763490197111",
    appId: "1:763490197111:web:cdcd95872ab312b4337072",
    measurementId: "G-VK89163FST"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


let loginButton;

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please enter your email and password');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully:', userCredential.user);

            // alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                showConfirmButton: false,
                timer: 30000 // dura 30 segundos
            });

            // Redirigir al usuario a bienvenida.html después de 30 segundos
            setTimeout(() => {
                window.location.href = "bienvenida.html";
            }, 30000);
        } catch (error) {
            console.error('Login failed:', error.message);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Inicio de sesión fallido. Por favor, comprueba tu correo electrónico y contraseña.'
            });
        }
    });
});

   

onAuthStateChanged(auth, async (user) => {
    if (user) {
      
        
        try {
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                updatedAt: Date.now(),
                
            };

            const userRef = doc(firestore, 'users', user.uid);
            await setDoc(userRef, userData, { merge: true });
            console.log('Datos del usuario actualizados en Firestore:', userRef.id);

            // Desconectar automáticamente después de 10 horas
            setTimeout(async () => {
                try {
                    await signOut(auth);
                    console.log("User signed out after 10 hours");
                } catch (error) {
                    console.error("Sign out error", error);
                }
            }, 36000000); // 10 horas en milisegundos
        } catch (error) {
            console.error('Error al actualizar los datos del usuario en Firestore:', error);
        }
    }
});
