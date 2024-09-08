import { app } from './firebase.js';
import { getFirestore, collection, doc,updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js';

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app); 

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(`El usuario ${user.uid} está logueado`);
        fetchUserData(user);
    } else {
        console.log("No hay ningún usuario logueado");
        clearUserData();
    }
});

async function updateUserDocument(photoURL) {
  const userRef = doc(db, 'users', auth.currentUser.uid);
  await updateDoc(userRef, {
      photoURL: photoURL
  });
}

// Función para actualizar la foto en la interfaz
function updateUserPhoto(url) {
  const userPhotoElement = document.getElementById('userPhoto');
  if (userPhotoElement) {
      userPhotoElement.src = url;
  }
}

document.getElementById('imageInput').addEventListener('change', async function(event) {
  const file = event.target.files[0];
  if (file) {
      try {
          // Subir la imagen a Firebase Storage
          const storageRef = ref(storage, 'user-photos/' + auth.currentUser.uid + '/' + file.name);
          await uploadBytes(storageRef, file);

          // Obtener la URL de descarga
          const downloadURL = await getDownloadURL(storageRef);

          // Actualizar la foto en la interfaz
          updateUserPhoto(downloadURL);

          // Actualizar la referencia de la foto en el documento del usuario
          await updateUserDocument(downloadURL);

          console.log('Imagen subida y documento actualizado con éxito');
      } catch (error) {
          console.error('Error al subir la imagen:', error);
      }
  }
});


// Función para cambiar el color de fondo del perfil
document.getElementById('colorPicker').addEventListener('input', function(event) {
  const color = event.target.value;
  document.getElementById('profileHeader').style.backgroundColor = color;
});

// Función para obtener y mostrar los datos del usuario
async function fetchUserData(user) {
  try {
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
          const userData = docSnap.data();
          updateUserInterface(user, userData);
      } else {
          console.log(`¡No se encontró el documento del usuario ${user.uid}!`);
      }
  } catch (error) {
      console.error(`Error al obtener el documento del usuario ${user.uid}: `, error);
  }
}

// Función para actualizar la interfaz de usuario
function updateUserInterface(user, userData) {
  document.getElementById("userName").textContent = userData.displayName || "Usuario";

    // Actualizar la foto de perfil
    const userPhotoElement = document.getElementById('userPhoto');
    if (userPhotoElement) {
        if (userData.photoURL) {
            // Priorizar la foto almacenada en userData (Firestore)
            userPhotoElement.src = userData.photoURL;
        } else if (user.photoURL) {
            // Si no hay foto en userData, usar la foto del objeto user (Auth)
            userPhotoElement.src = user.photoURL;
        } else {
            // Si no hay foto disponible, usar una imagen por defecto
            userPhotoElement.src = '/path/to/default/profile-image.png';
        }

        // Manejar errores de carga de imagen
        userPhotoElement.onerror = function() {
            this.src = 'Front/assets/img/file.jpg';
        };
    }

  updateProblemsTable(userData.solvedProblems);
    updateQuizzesTable(userData.quizzes);
}

    

function updateProblemsTable(solvedProblems) {
  const tbody = document.querySelector("#problemsTable tbody");
  tbody.innerHTML = '';

  if (solvedProblems && typeof solvedProblems === 'object') {
    Object.entries(solvedProblems).forEach(([problemId, problemData]) => {
      let row = tbody.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      // Mostramos el ID del problema
      cell1.textContent = problemId;

      if (Array.isArray(problemData)) {
        // Si problemData es un array, procesamos cada intento
        problemData.forEach((attempt, index) => {
          // Creamos una nueva fila para cada intento
          if (index > 0) {
            row = tbody.insertRow();
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell4 = row.insertCell(3);
            
            // Repetimos el ID del problema para cada intento
            cell1.textContent = problemId;
          }
          
          // Formateamos la fecha como d/m/yyyy
          let date = new Date(attempt.solvedDate);
          cell2.textContent = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          
          // Número de intento comenzando desde 1
          cell3.textContent = (index + 1).toString();
          
          cell4.textContent = attempt.language || 'N/A';
        });
      } else if (typeof problemData === 'object' && problemData !== null) {
        // Si problemData es un objeto (no un array), asumimos que es un solo intento
        let date = new Date(problemData.solvedDate);
        cell2.textContent = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        cell3.textContent = '1';
        cell4.textContent = problemData.language || 'N/A';
      } else {
        console.warn(`Datos inesperados para el problema ${problemId}:`, problemData);
        cell2.textContent = 'N/A';
        cell3.textContent = 'N/A';
        cell4.textContent = 'N/A';
      }
    });
  } else {
    console.warn('solvedProblems no es un objeto válido:', solvedProblems);
  }
}

function updateQuizzesTable(quizzes) {
    const tbody = document.querySelector("#quizzesTable tbody");
    tbody.innerHTML = '';

    if (quizzes && typeof quizzes === 'object') {
        Object.entries(quizzes).forEach(([quizId, quizResults]) => {
            if (Array.isArray(quizResults)) {
                quizResults.forEach((result, index) => {
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td>${quizId}</td>
                        <td>${result.score}</td>
                        <td>${new Date(result.date).toLocaleDateString()}</td>
                        <td>${index + 1}</td>
                    `;
                });
            } else {
                console.warn(`Los resultados para el quiz ${quizId} no son un array`);
            }
        });
    } else {
        console.warn('quizzes no es un objeto válido');
    }
}

function clearUserData() {
    document.getElementById("userName").textContent = "Usuario no logueado";
    document.getElementById("userPhoto").innerHTML = '';
    document.querySelector("#problemsTable tbody").innerHTML = '';
    document.querySelector("#quizzesTable tbody").innerHTML = '';
}