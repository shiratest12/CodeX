import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { getFirestore, doc, getDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js';

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const faceLoginButton = document.getElementById('faceLoginButton');

// Carga los modelos de Face API
const MODEL_URL = './models';
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
]).then(startFaceLogin);

function startFaceLogin() {
    faceLoginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const video = document.createElement('video');
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.zIndex = '50';
        document.body.append(video);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            await video.play();

            const canvas = faceapi.createCanvasFromMedia(video);
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '51';
            document.body.append(canvas);

            const displaySize = { width: video.videoWidth, height: video.videoHeight };
            faceapi.matchDimensions(canvas, displaySize);

            const detectionInterval = setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

                if (detections.length > 0) {
                    clearInterval(detectionInterval);
                    await compareFaceWithDatabase(detections[0].descriptor);
                    stream.getTracks().forEach(track => track.stop());
                    video.remove();
                    canvas.remove();
                }
            }, 100);
        } catch (error) {
            console.error("Error accessing the camera:", error);
        }
    });
}
async function compareFaceWithDatabase(faceDescriptor) {
    const usersRef = collection(firestore, 'users');
    const userSnapshots = await getDocs(usersRef);

    for (const userSnapshot of userSnapshots.docs) {
        const userData = userSnapshot.data();
        const userPhotoURL = userData.photoURL;

        if (userPhotoURL) {
            try {
                // Fetch the image as a blob instead of text
                const response = await fetch(userPhotoURL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const blob = await response.blob();

                // Create a local URL for the blob
                const imageUrl = URL.createObjectURL(blob);

                // Load the image using faceapi
                const userImage = await faceapi.fetchImage(imageUrl);
                const userDetections = await faceapi.detectAllFaces(userImage).withFaceLandmarks().withFaceDescriptors();

                // Clean up the local URL
                URL.revokeObjectURL(imageUrl);

                if (userDetections.length > 0) {
                    const faceMatcher = new faceapi.FaceMatcher(userDetections[0]);
                    const bestMatch = faceMatcher.findBestMatch(faceDescriptor);

                    if (bestMatch.distance < 0.6) { // Adjust this threshold as needed
                        console.log('Matching face found. User ID:', userSnapshot.id);
                        // Implement login logic here
                        return;
                    }
                } else {
                    console.log('No face detected in the user image');
                }
            } catch (error) {
                console.error("Error processing user image:", error);
                console.error("User ID:", userSnapshot.id);
                console.error("Photo URL:", userPhotoURL);
            }
        } else {
            console.log('No photo URL for user:', userSnapshot.id);
        }
    }
    console.log('No matching face found');
}