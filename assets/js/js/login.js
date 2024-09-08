
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'www.gstatic.com/firebasejs/9.0.2/firebase-app.js';

import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged} from 'www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMLc7nuiPvOPvehlArKZZyCM0Ccf1g198",
  authDomain: "codex-414305.firebaseapp.com",
  projectId: "codex-414305",
  storageBucket: "codex-414305.appspot.com",
  messagingSenderId: "763490197111",
  appId: "1:763490197111:web:cdcd95872ab312b4337072",
  measurementId: "G-VK89163FST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);