import { app } from './firebase.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

const db = getFirestore(app);


// agregar actualizaciones a Firebase
/*async function addUpdates() {
    const updates = [
        {
            titulo: "Nuevo Tema Oscuro",
            descripcion: "Implementamos un nuevo tema oscuro para mejorar la experiencia visual.",
            fecha: new Date("2024-06-01")
        },
        {
            titulo: "Mejoras en el Diseño",
            descripcion: "Actualizamos el diseño de la plataforma con nuevos colores y estilos.",
            fecha: new Date("2024-06-15")
        },
        {
            titulo: "Optimización de la Lógica",
            descripcion: "Mejoramos la lógica del código para un rendimiento más eficiente.",
            fecha: new Date("2024-07-01")
        },
        {
            titulo: "Revisión y Depuración de Errores",
            descripcion: "Revisamos y depuramos errores en toda la plataforma.",
            fecha: new Date("2024-07-15")
        },
        {
            titulo: "Nuevo Juego de Memoria",
            descripcion: "Añadimos un nuevo juego de memoria para mejorar tus habilidades cognitivas.",
            fecha: new Date("2024-08-01")
        },

    
        {
            titulo: "Actualización del Editor de Código",
            descripcion: "Nuevas funcionalidades al editor de código.",
            fecha: new Date("2024-08-15")
        },
        {
            titulo: "Nuevos Blogs de Programación",
            descripcion: "Nuevas entradas agregadas.",
            fecha: new Date("2024-08-17")
        },
    
        {
            titulo: "Mejora del Tiempo de Carga",
            descripcion: "Optimización del tiempo de carga de la plataforma para una experiencia más rápida.",
            fecha: new Date("2024-08-18")
        },
        {
            titulo: "Depuración ",
            descripcion: "Depuración adicional para eliminar errores persistentes.",
            fecha: new Date("2024-08-21")
        },
        {
            titulo: "Nuevo Juego en la Sección de Bienvenida",
            descripcion: "Nuevo juego agregado en la sección de bienvenida para una experiencia más interactiva.",
            fecha: new Date("2024-9-6")
        }
    ];



    for (const update of updates) {
        try {
            const docRef = await addDoc(collection(db, "actualizaciones"), update);
            console.log("Actualización agregada con ID: ", docRef.id);
        } catch (error) {
            console.error("Error al agregar actualización: ", error);
        }
    }
}*/

async function getLatestUpdates() {
    const q = query(collection(db, "actualizaciones"), orderBy("fecha", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    const updates = [];
    querySnapshot.forEach((doc) => {
        updates.push(doc.data());
    });
    console.log("Actualizaciones recuperadas:", updates);
    return updates;
}

function updateUpdatesList(updates) {
    const updatesContainer = document.getElementById("actualizaciones-container");
    if (!updatesContainer) {
        console.error("No se encontró el elemento con id 'actualizaciones-container'");
        return;
    }
    updatesContainer.innerHTML = ""; // Limpiar el contenido actual
    updates.forEach((update) => {
        const updateHTML = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${update.titulo}</h5>
                        <p class="card-text">${update.descripcion}</p>
                    </div>
                </div>
            </div>
        `;
        updatesContainer.innerHTML += updateHTML;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
       //actualizaciones
     //   await addUpdates();
        
        // mostrar las actualizaciones
        const updates = await getLatestUpdates();
        updateUpdatesList(updates);
    } catch (error) {
        console.error("Error:", error);
    }
});