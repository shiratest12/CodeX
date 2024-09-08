import { app } from './firebase.js';
    import { getFirestore, runTransaction, collection, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
    import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
    import { updateDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
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

    // Inicialización de Firebase


    const db = getFirestore(app);

    const auth = getAuth();
    let user;
    


    // botón de regreso
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
    // Regresar a anterior 
    window.location.href = 'quiz.html';
});

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // El usuario está logueado
        user = currentUser;
        console.log('Usuario logueado: ', user.uid);
      } else {
        // El usuario no está logueado
        console.log('No hay usuario logueado');
      }
    });
    

    // Variables globales
    var quizHeader = document.getElementById("quizHeader");
    var quizBody = document.getElementById("quizBody");
    var qNum = 0;
    var answers = [];
    var minutes = 0, seconds = 0, interval;
    var questions = [];

    function startQuiz() {
        var urlParams = new URLSearchParams(window.location.search);
        var quizId = urlParams.get('quiz');

        if (quizId) {
            var quizDoc = doc(db, "quizzes", quizId);
            getDoc(quizDoc).then((doc) => {
                if (doc.exists()) {
                    questions = doc.data().questions; // Guardar preguntas en la variable global
                    document.getElementById("mainBody").style.display = "flex";
                    document.getElementById("startBtn").style.display = "none";    
                    appendQuestion(); // No es necesario pasar preguntas
                    startTimer();
                } else {
                    console.log(`¡No se encontró el quiz "${quizId}"!`);
                }
            }).catch((error) => {
                console.error(`Error al obtener el quiz "${quizId}": `, error);
            });
        } else {
            console.log("No se proporcionó un ID de quiz.");
        }
    }

    function appendQuestion() {
        quizHeader.innerHTML = `<h3 class='quizHeader'>Q${qNum+1}/${questions.length}</h3><span id='timer'>${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>`;
        var divBody = `<h3 class='quizHeader'>Q: ${questions[qNum].question}</h3>`;
        divBody += "<ul class='option_group' id='option_group'>";
        for (var i = 0; i < questions[qNum].options.length; i++) {
            divBody += `<li class='option'>${questions[qNum].options[i]}</li>`;
        }
        divBody += "</ul><button class='btn btn-primary nxtBtn'>Siguiente</button>";
        quizBody.innerHTML = divBody;

        var options = document.querySelectorAll(".option");
        options.forEach(option => {
            option.addEventListener("click", function() {
                activeOpt(option);
            });
        });

        var nxtBtn = document.querySelector(".nxtBtn");
        nxtBtn.addEventListener("click", nxtQuestion);
    }

    function activeOpt(option) {
        var ul = document.getElementById("option_group");
        ul.querySelectorAll('.option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        answers[qNum] = option.textContent === questions[qNum].answer;
    }

     // Tus variables y otras funciones aquí
     // Asegúrate de tener tus preguntas definidas aquí

     function showNotification(message) {
         const notification = document.getElementById('notification');
         notification.textContent = message;
         notification.classList.add('show');
         
         setTimeout(() => {
             notification.classList.remove('show');
         }, 1500);
     }

    function nxtQuestion() {
        if (answers[qNum] !== undefined) {
            if (qNum < questions.length - 1) {
                qNum++;
                appendQuestion();
            } else {
                appendResult();
            }
        } else {
            showNotification("Por favor elige una opción");
        }
    }

    function appendResult() {
        clearInterval(interval);
        var correctQuestions = answers.filter(answer => answer).length;
        quizHeader.innerHTML = "<h3>Result</h3>";
        var divBody = "<table class='table table-bordered'><thead class='thead-dark'>";
        for (var i = 0; i < questions.length; i++) divBody += `<th>Q${i+1}</th>`;
        divBody += "</thead><tbody>";
        for (var i = 0; i < questions.length; i++) {
            divBody += `<td><img style='width:20px' src='assets/img/${answers[i] ? 'check.png' : 'cancel.jpg'}'></td>`;
        }
        divBody += "</tbody></table>";
        divBody += `<table class='table table-bordered'><thead class='thead-dark'>
                    <tr><th>Resultado</th><th>Porcentaje</th><th>Tiempo (mm:ss)</th></tr></thead>
                    <tbody><tr><td>${correctQuestions}/${questions.length}</td>
                    <td>${(correctQuestions / questions.length) * 100}%</td>
                    <td>${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</td></tr></tbody></table>`;
                    divBody += "<a href='quiz.html' class='btn'>Regresar a la tabla</a>";
        quizBody.innerHTML = divBody;
    
        // Guardar el puntaje del usuario
        var urlParams = new URLSearchParams(window.location.search);
        var quizId = urlParams.get('quiz');
        updateQuiz(quizId, correctQuestions);
    }
        function startTimer() {
        interval = setInterval(() => {
            seconds = (seconds + 1) % 60;
            if (seconds === 0) minutes++;
            document.getElementById("timer").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    document.getElementById("startBtn").addEventListener("click", startQuiz);

    async function getScore(quizId) {
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const userData = await getDoc(userDoc);
          if (userData.exists()) {
            const userQuiz = userData.data().quiz;
            const score = userQuiz[quizId];
            console.log('Puntaje: ', score);
            return score;
          } else {
            console.log('No se encontró el usuario');
          }
        } else {
          console.log('No hay usuario logueado');
        }
      }
      async function updateQuiz(quizId, score) {
        if (!user) {
          console.log('No hay usuario logueado');
          return;
        }
      
        const userDoc = doc(db, 'users', user.uid);
        
        try {
          await runTransaction(db, async (transaction) => {
            const userSnapshot = await transaction.get(userDoc);
            
            if (!userSnapshot.exists()) {
              throw new Error('El documento del usuario no existe');
            }
            
            const userData = userSnapshot.data();
            const quizzes = userData.quizzes || {};
            
            if (!Array.isArray(quizzes[quizId])) {
              quizzes[quizId] = [];
            }
            
            const now = new Date();
            const newQuizResult = {
              date: now.toISOString(),
              score: score,
              timestamp: now.getTime(),
              quizId: quizId
            };
      
            // Añadimos el nuevo resultado al principio del array
            quizzes[quizId].unshift(newQuizResult);
      
            transaction.update(userDoc, { quizzes });
          });
      
          console.log('Quiz actualizado exitosamente');
        } catch (error) {
          console.error('Error al actualizar el quiz:', error);
        }
      }