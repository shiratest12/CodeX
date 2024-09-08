// sdk firebase
import { app } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword ,  updateProfile } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { addDoc, collection, doc, getFirestore, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';


const auth = getAuth(app);
const firestore = getFirestore(app); 

// d
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerButton = document.getElementById('registro');


// botón de registro
registerButton.addEventListener('click', async (event) => {
  event.preventDefault(); 

  const email = emailInput.value;
  const password = passwordInput.value;

  // Valida la entrada del usuario 
  if (!email || !password) {
    alert('Ingresa tu correo electrónico y contraseña');
    return;
  }
  

  try {
    // Crea el usuario en firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //  nombre de usuario en base a correo
    const username = email.split('@')[0];


  // Actualiza el perfil del usuario con el nombre de usuario
  await updateProfile(userCredential.user, {
    displayName: username
  });


    //  objeto de datos del usuario
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: username, 
      createdAt: Date.now(),
      updatedAt: Date.now(),
      solvedProblems: [],
      quiz: [],
    };

   
    const userRef = doc(firestore, 'users', userCredential.user.uid); // Usa el UID del usuario como ID del documento
    await setDoc(userRef, userData);
    console.log('Datos del usuario guardados en el documento de Firestore:', userRef.id);

    console.log('Usuario creado exitosamente:', userCredential.user);
   
Swal.fire({// alerta
  title: '¡Registro exitoso!',
  text: 'Has creado tu cuenta exitosamente.',
  icon: 'success',
  confirmButtonText: 'Genial',
  timer: 5000,
  timerProgressBar: true
}).then((result) => {
  if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
    window.location.href = 'bienvenida.html'; // Redirigir a la página de bienvenida
  }
});
  } catch (error) {
    console.error('Error en el registro:', error.message);
    
  }
});




