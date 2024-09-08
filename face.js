
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { addDoc, collection, doc, getFirestore, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js';

// Configuración de Firebase para tu aplicación web
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
const firestore = getFirestore(firebaseApp); // Inicializa Firestore
const storage = getStorage(firebaseApp); // Inicializa Firebase Storage

// Referencias a elementos del DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerButton = document.getElementById('registro');
const photoInput = document.getElementById('photo'); // Asegúrate de que este ID coincide con el ID del elemento de entrada de archivo en tu HTML

// Agrega un detector de eventos al botón de registro
registerButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Evita el envío predeterminado del formulario

  const email = emailInput.value;
  const password = passwordInput.value;
// Obtiene el archivo de la entrada de archivo

  // Valida la entrada del usuario (opcional)
  if (!email || !password ) {
    alert('Ingresa tu correo electrónico, contraseña y foto');
    return;
  }
// Referencias a elementos del DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerButton = document.getElementById('registro');
const startCameraButton = document.getElementById('startCamera');
const takePhotoButton = document.getElementById('takePhoto');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let stream;
let capturedImage;

// Cargar modelos de face-api.js
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/path/to/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/path/to/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/path/to/models')
]).then(startApp);

function startApp() {
    startCameraButton.addEventListener('click', startCamera);
    takePhotoButton.addEventListener('click', takePhoto);
    registerButton.addEventListener('click', registerUser);
}

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        detectFace();
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
}

async function detectFace() {
    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
    
    if (detection) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, [detection]);
        faceapi.draw.drawFaceLandmarks(canvas, [detection]);
    }

    requestAnimationFrame(detectFace);
}

function takePhoto() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage = canvas.toDataURL('image/jpeg');
}

async function registerUser(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password || !capturedImage) {
        alert('Ingresa tu correo electrónico, contraseña y toma una foto');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Convertir la imagen capturada a un blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();

        // Subir la foto a Firebase Storage
        const photoRef = ref(storage, `photos/${userCredential.user.uid}/profile.jpg`);
        await uploadBytes(photoRef, blob);

        // Obtener la URL de descarga de la foto
        const photoURL = await getDownloadURL(photoRef);

        // Preparar el objeto de datos del usuario
        const userData = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: email.split('@')[0],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            photoURL,
        };

        // Guardar los datos del usuario en Firestore
        const userRef = doc(firestore, 'users', userCredential.user.uid);
        await setDoc(userRef, userData);

        console.log('Usuario creado exitosamente:', userCredential.user);
        
        // Detener la transmisión de la cámara
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
}});