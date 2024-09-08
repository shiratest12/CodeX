import { app } from './firebase.js';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

const db = getFirestore(app);
const auth = getAuth();
let userId = null;
let userRef = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid;
        userRef = doc(db, 'users', userId);
        console.log(`Usuario autenticado: ${userId}`);
    } else {
        console.log('No hay ningún usuario autenticado');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const problemId = urlParams.get('id');

    console.log('ID del problema:', problemId);

    if (problemId) {
        const problemRef = doc(db, 'problemas', problemId);
        try {
            const problemSnapshot = await getDoc(problemRef);
            if (problemSnapshot.exists()) {
                const problemData = problemSnapshot.data();
                document.getElementById('problem-title').innerText = problemData.title;
                document.getElementById('problem-description').innerText = problemData.descripcion;
                document.getElementById('problem-difficulty').innerText = problemData.difficulty;
                document.getElementById('problem-restriction').innerText = problemData.restriction;
                document.getElementById('problem-category').innerText = problemData.category;
                document.getElementById('problem-example').innerText = problemData.example;

                const expectedSolution = problemData.salida;
                localStorage.setItem('expectedSolution', expectedSolution);
            } else {
                document.getElementById('problem-title').innerText = 'Problema no encontrado';
                document.getElementById('problem-description').innerText = 'No se encontró ninguna información para el problema solicitado.';
            }
        } catch (error) {
            console.error('Error al obtener el documento:', error);
        }
    } else {
        console.log('No se proporcionó un ID de problema en la URL');
    }

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'table.html';
    });

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");

    var API = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
    });

    var languageSelect = document.getElementById("language");
    languageSelect.addEventListener("change", function() {
        var language = languageSelect.value;
        editor.session.setMode("ace/mode/" + language);
    });

    var runButton = document.getElementById("run-button");
    runButton.addEventListener("click", async function() {
        document.getElementById("output").textContent = "";
        document.querySelector('.test-case-info').textContent = "";

        var code = editor.getValue();
        var language = languageSelect.value;

        var submission = {
            language: language,
            version: "*",
            files: [
                {
                    content: code,
                },
            ],
        };

        try {
            const response = await API.post("/execute", submission);
            var userOutput = response.data.run.stdout;
            document.getElementById("output").textContent = userOutput;

            var expectedOutput = localStorage.getItem('expectedSolution');

            const isCorrect = outputsAreEqual(userOutput, expectedOutput);
            const result = isCorrect ? "Verdadero" : "Falso";
            document.querySelector('.test-case-info').textContent = `Resultado: ${result}`;
            mostrarAlerta(isCorrect);

            if (isCorrect && problemId && auth.currentUser) {
                const now = new Date();
                const attemptInfo = {
                    language: language,
                    solvedDate: now.toISOString(),
                };

                await updateDoc(userRef, {
                    [`solvedProblems.${problemId}`]: arrayUnion(attemptInfo)
                });

                console.log("Problema resuelto actualizado");
            }
        } catch (error) {
            console.error('Error al ejecutar el código:', error);
        }
    });
});

function mostrarAlerta(esCorrecto) {
    var alerta = document.getElementById('alerta');
    alerta.textContent = esCorrecto ? 'Ejercicio resuelto' : 'Error en la solucion';
    alerta.style.borderColor = esCorrecto ? 'green' : 'red';
    alerta.style.color = esCorrecto ? 'green' : 'red';
    alerta.style.backgroundColor = esCorrecto ? '#e6ffe6' : '#ffe6e6';
    alerta.style.display = 'block';
    setTimeout(function() {
        alerta.style.display = 'none';
    }, 3000);
}

function outputsAreEqual(userOutput, expectedOutput) {
    if (typeof userOutput === 'object') {
        userOutput = JSON.stringify(userOutput);
    }
    if (typeof expectedOutput === 'object') {
        expectedOutput = JSON.stringify(expectedOutput);
    }
    return userOutput.trim() === expectedOutput.trim();
}

// El resto del código (aumentar/disminuir tamaño de fuente, limpiar contenido) se mantiene igual

// Maneja el evento de clic del botón para aumentar el tamaño de la letra
var increaseFontButton = document.getElementById("increase-font");
increaseFontButton.addEventListener("click", function() {
  var fontSize = parseInt(window.getComputedStyle(editor.container).getPropertyValue('font-size'));
  editor.container.style.fontSize = (fontSize + 1) + "px";
});

// Maneja el evento de clic del botón para disminuir el tamaño de la letra
var decreaseFontButton = document.getElementById("decrease-font");
decreaseFontButton.addEventListener("click", function() {
  var fontSize = parseInt(window.getComputedStyle(editor.container).getPropertyValue('font-size'));
  if (fontSize > 1) {
    editor.container.style.fontSize = (fontSize - 1) + "px";
  }
});

// Maneja el evento de clic del botón para borrar el contenido del editor
var clearContentButton = document.getElementById("clear-content");
clearContentButton.addEventListener("click", function() {
  editor.setValue("");
});



var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    fontSize: "12pt"
});

Split(['#split-0', '#split-1']);
