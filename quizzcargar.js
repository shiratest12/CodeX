import { app } from './firebase.js';
import { getFirestore, collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

// Tu configuración de Firebase


// Inicializa Firestore
const db = getFirestore(app);

// Tus quizzes

var quizzes = {
  

"Listas enlazadas General":
[
  {
    question: "¿Cuál es la estructura de datos básica utilizada en una lista enlazada?",
    answer: "Nodo",
    options: ["Array", "Objeto", "Nodo", "String"]
  },
  {
    question: "¿Qué tipo de acceso proporciona una lista enlazada?",
    answer: "Secuencial",
    options: ["Aleatorio", "Secuencial", "Indexado", "Directo"]
  },
  {
    question: "¿Cuál es la ventaja principal de una lista doblemente enlazada sobre una lista simplemente enlazada?",
    answer: "Recorrido bidireccional",
    options: ["Es más rápida", "Ocupa menos memoria", "Permite recorrer la lista en ambas direcciones", "Es más fácil de implementar"]
  },
  {
    question: "¿Qué operación es más eficiente en una lista enlazada en comparación con un array?",
    answer: "Inserción intermedia",
    options: ["Acceso aleatorio", "Búsqueda", "Inserción en el medio", "Eliminación del último elemento"]
  },
  {
    question: "¿Qué estructura de datos se utiliza comúnmente para implementar una pila (stack)?",
    answer: "Lista enlazada",
    options: ["Array", "Árbol binario", "Lista enlazada", "Tabla hash"]
  },
  {
    question: "En una lista circular, ¿a qué apunta el último nodo?",
    answer: "Primer nodo",
    options: ["A null", "Al penúltimo nodo", "Al primer nodo", "A sí mismo"]
  },
  {
    question: "¿Cuál es la complejidad temporal de la operación de inserción al inicio de una lista enlazada?",
    answer: "O(1)",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"]
  },
  {
    question: "¿Qué tipo de lista enlazada permite eliminar un nodo en tiempo constante si se tiene una referencia directa a él?",
    answer: "Doblemente enlazada",
    options: ["Lista simplemente enlazada", "Lista circular", "Lista doblemente enlazada", "Lista skip"]
  }
],
"Redes General":
[
  {
    question: "¿Cuál es el protocolo principal de Internet?",
    answer: "TCP/IP",
    options: ["HTTP", "FTP", "TCP/IP", "SMTP"]
  },
  {
    question: "¿Qué capa del modelo OSI se encarga del enrutamiento?",
    answer: "Red",
    options: ["Capa de enlace de datos", "Capa de red", "Capa de transporte", "Capa de aplicación"]
  },
  {
    question: "¿Cuál es la función principal de un firewall?",
    answer: "Filtrar tráfico",
    options: ["Acelerar la conexión", "Comprimir datos", "Filtrar el tráfico de red", "Encriptar la comunicación"]
  },
  {
    question: "¿Qué protocolo se utiliza para la resolución de nombres de dominio?",
    answer: "DNS",
    options: ["HTTP", "FTP", "DHCP", "DNS"]
  },
  {
    question: "¿Cuál es la diferencia principal entre IPv4 e IPv6?",
    answer: "Tamaño dirección",
    options: ["La velocidad", "La seguridad", "El tamaño de la dirección", "El protocolo de transporte"]
  },
  {
    question: "¿Qué tipo de topología de red tiene un punto central al que se conectan todos los nodos?",
    answer: "Estrella",
    options: ["Bus", "Anillo", "Malla", "Estrella"]
  },
  {
    question: "¿Qué protocolo se utiliza para el envío de correos electrónicos?",
    answer: "SMTP",
    options: ["POP3", "IMAP", "SMTP", "HTTP"]
  },
  {
    question: "¿Cuál es la función principal de un switch en una red?",
    answer: "Dirigir tráfico",
    options: ["Amplificar la señal", "Conectar redes diferentes", "Asignar direcciones IP", "Dirigir el tráfico basándose en direcciones MAC"]
  }
],

"Ingenieria_software General": [
    {
      question: "¿Qué significa SOLID en el contexto de la programación orientada a objetos?",
      answer: "Principios diseño",
      options: ["Lenguaje", "Framework", "Principios diseño", "Arquitectura"]
    },
    {
      question: "¿Cuál de los siguientes NO es un modelo de ciclo de vida del software?",
      answer: "Compilación",
      options: ["Cascada", "Espiral", "Ágil", "Compilación"]
    },
    {
      question: "¿Qué es un diagrama de casos de uso?",
      answer: "Interacciones sistema-actores",
      options: ["Flujo datos", "Base datos", "Interacciones sistema-actores", "Clases"]
    },
    {
      question: "¿Qué significa TDD?",
      answer: "Test-Driven Development",
      options: ["Type-Driven Design", "Test-Driven Development", "Time-Driven Deployment", "Technical Design"]
    },
    {
      question: "¿Cuál es el propósito principal de la refactorización?",
      answer: "Mejorar código",
      options: ["Nuevas funciones", "Corregir errores", "Mejorar código", "Optimizar rendimiento"]
    },
    {
      question: "¿Qué es un patrón de diseño Singleton?",
      answer: "Una instancia",
      options: ["Excepciones", "Crear objetos", "Una instancia", "Organizar código"]
    },
    {
      question: "¿Qué es la integración continua (CI)?",
      answer: "Fusionar código",
      options: ["Base datos", "Pruebas", "Fusionar código", "Lenguaje"]
    },
    {
      question: "¿Cuál es el propósito principal de un diagrama de clases UML?",
      answer: "Estructura estática",
      options: ["Flujo datos", "Secuencia eventos", "Estructura estática", "Casos uso"]
    }
  ],
  "Programación General": [
    {
      question: "¿Qué es la programación orientada a objetos?",
      answer: "Objetos",
      options: ["Lenguaje", "Compilación", "Objetos", "Depuración"]
    },
    {
      question: "¿Qué es una función recursiva?",
      answer: "Autollamada",
      options: ["Sin retorno", "Muchos parámetros", "Autollamada", "Una ejecución"]
    },
    {
      question: "¿Qué es un closure en programación?",
      answer: "Acceso ámbito",
      options: ["Bucle", "Estructura", "Acceso ámbito", "Encriptación"]
    },
    {
      question: "¿Qué es la sobrecarga de operadores?",
      answer: "Definir operadores",
      options: ["Muchos operadores", "Definir operadores", "Optimizar", "Nuevos operadores"]
    },
    {
      question: "¿Qué es un puntero en C?",
      answer: "Dirección memoria",
      options: ["Dato numérico", "Función especial", "Dirección memoria", "Operador lógico"]
    },
    {
      question: "¿Qué es la programación funcional?",
      answer: "Evaluación funciones",
      options: ["Solo funciones", "Evaluación funciones", "Código eficiente", "Muchas funciones"]
    },
    {
      question: "¿Qué es un generador en Python?",
      answer: "Secuencia resultados",
      options: ["Crear objetos", "Secuencia resultados", "Tipo bucle", "Generar código"]
    },
    {
      question: "¿Qué es el polimorfismo en programación orientada a objetos?",
      answer: "Mismo mensaje",
      options: ["Herencia múltiple", "Mismo mensaje", "Cambiar tipo", "Múltiples constructores"]
    }
  ],
  "SQL General": [
    {
      question: "¿Qué significa SQL?",
      answer: "Structured Query Language",
      options: ["Simple Question", "Structured Query", "System Quality", "Software Query"]
    },
    {
      question: "¿Cuál es la diferencia entre HAVING y WHERE en SQL?",
      answer: "GROUP BY vs filtrar",
      options: ["Sinónimos", "HAVING rápido", "GROUP BY vs filtrar", "WHERE números"]
    },
    {
      question: "¿Qué hace la cláusula DISTINCT en SQL?",
      answer: "Elimina duplicados",
      options: ["Ordena", "Filtra", "Elimina duplicados", "Agrupa"]
    },
    {
      question: "¿Qué tipo de JOIN devuelve todas las filas cuando hay una coincidencia en una de las tablas?",
      answer: "OUTER JOIN",
      options: ["INNER", "CROSS", "OUTER", "NATURAL"]
    },
    {
      question: "¿Qué es una clave primaria en una tabla de base de datos?",
      answer: "Identifica único",
      options: ["Primer campo", "Identifica único", "No nulo", "Ordenar tabla"]
    },
    {
      question: "¿Qué hace la sentencia UPDATE en SQL?",
      answer: "Modifica registros",
      options: ["Inserta", "Elimina", "Modifica registros", "Crea tabla"]
    },
    {
      question: "¿Qué es una subconsulta en SQL?",
      answer: "Consulta anidada",
      options: ["Rápida", "Pocos registros", "Consulta anidada", "Un resultado"]
    },
    {
      question: "¿Qué hace la función COUNT en SQL?",
      answer: "Cuenta filas",
      options: ["Suma valores", "Cuenta filas", "Promedio", "Valor máximo"]
    }
  ],
  "Nosql General": [
{
question: "¿Qué significa NoSQL?",
answer: "Not Only SQL",
options: ["No SQL", "New SQL", "Not Only SQL", "Non SQL"]
},
{
question: "¿Cuál NO es un tipo común de base de datos NoSQL?",
answer: "Relacional",
options: ["Documento", "Clave-valor", "Columnar", "Relacional"]
},
{
question: "¿Qué NoSQL usa modelo de documentos?",
answer: "MongoDB",
options: ["Redis", "Cassandra", "MongoDB", "Neo4j"]
},
{
question: "Ventaja principal de NoSQL?",
answer: "Escalabilidad horizontal",
options: ["ACID", "SQL estándar", "Escalabilidad horizontal", "Relaciones complejas"]
},
{
question: "¿Qué es consistencia eventual en NoSQL?",
answer: "Sincronización futura",
options: ["Datos inmutables", "Sincronización futura", "Siempre consistente", "Borrado eventual"]
},
{
question: "¿Mejor NoSQL para relaciones complejas?",
answer: "Grafo",
options: ["Documento", "Clave-valor", "Columnar", "Grafo"]
},
{
question: "¿Qué significa CAP?",
answer: "Consistency, Availability, Partition",
options: ["Consistency, Atomicity, Partition", "Consistency, Availability, Partition", "Concurrency, Availability, Performance", "Consistency, Asynchronous, Partition"]
},
{
question: "Característica común de NoSQL?",
answer: "Esquema flexible",
options: ["ACID", "Joins complejos", "Esquema rígido", "Esquema flexible"]
}
],
"Herramientas_desarrollo": [
{
question: "¿Cuál NO es control de versiones?",
answer: "Docker",
options: ["Git", "Subversion", "Mercurial", "Docker"]
},
{
question: "Herramienta integración continua?",
answer: "Jenkins",
options: ["VS Code", "Postman", "Jenkins", "Notepad++"]
},
{
question: "¿Sistema gestión BD relacional?",
answer: "PostgreSQL",
options: ["MongoDB", "Redis", "Elasticsearch", "PostgreSQL"]
},
{
question: "¿Herramienta virtualización contenedores?",
answer: "Docker",
options: ["VMware", "Docker", "Hyper-V", "VirtualBox"]
},
{
question: "¿Herramienta pruebas API?",
answer: "Postman",
options: ["JUnit", "Selenium", "Postman", "Jenkins"]
},
{
question: "¿Gestión dependencias Java?",
answer: "Maven",
options: ["Gradle", "npm", "pip", "Maven"]
},
{
question: "¿IDE multilenguaje popular?",
answer: "Visual Studio Code",
options: ["Eclipse", "VS Code", "PyCharm", "Xcode"]
},
{
question: "¿Herramienta análisis estático?",
answer: "SonarQube",
options: ["Git", "SonarQube", "Docker", "Kubernetes"]
}
],
"Situaciones prácticas": [
{
question: "Bug crítico en producción?",
answer: "Revertir y notificar",
options: ["Ignorar", "Revertir y notificar", "Arreglar silenciosamente", "Culpar QA"]
},
{
question: "Optimizar consulta SQL lenta?",
answer: "Analizar y añadir índices",
options: ["Más RAM", "Analizar y añadir índices", "Reescribir BD", "Ignorar"]
},
{
question: "Escalar app alto tráfico?",
answer: "Caché y microservicios",
options: ["Servidores potentes", "Reescribir app", "Caché y microservicios", "Limitar usuarios"]
},
{
question: "Conflicto fusión Git?",
answer: "Revisar, resolver, probar",
options: ["Forzar push", "Descartar cambios", "Revisar, resolver, probar", "Nueva rama"]
},
{
question: "Cliente pide feature inadecuada?",
answer: "Explicar y proponer",
options: ["Implementar", "Negarse", "Explicar y proponer", "Ignorar"]
},
{
question: "Migrar BD sin inactividad?",
answer: "Replicación y cambio gradual",
options: ["Migrar de noche", "Replicación y cambio gradual", "Nueva BD", "Pausar uso"]
},
{
question: "Autenticación API RESTful?",
answer: "JWT con HTTPS",
options: ["Sin autenticación", "Contraseñas planas", "JWT con HTTPS", "Confiar en IP"]
},
{
question: "Nueva feature, plazo ajustado?",
answer: "Evaluar, priorizar, negociar",
options: ["Rechazar", "Horas extra", "Evaluar, priorizar, negociar", "Añadir sin probar"]
}
],
"Preguntas_entrevista": [
{
question: "Complejidad temporal?",
answer: "Eficiencia en tiempo",
options: ["Tiempo compilación", "Eficiencia en tiempo", "Uso memoria", "Dificultad implementación"]
},
{
question: "Inyección SQL y prevención?",
answer: "Ataque SQL; consultas parametrizadas",
options: ["Optimización SQL", "Ataque SQL; consultas parametrizadas", "Importar datos", "Generar SQL"]
},
{
question: "Responsabilidad Única SOLID?",
answer: "Una razón para cambiar",
options: ["Múltiples interfaces", "Una razón para cambiar", "Clases grandes", "Propiedades privadas"]
},
{
question: "Deadlock y prevención?",
answer: "Bloqueo mutuo",
options: ["Cierre inesperado", "Bloqueo mutuo", "Memoria agotada", "BD sobrecargada"]
},
{
question: "Procesos vs threads?",
answer: "Independientes vs compartidos",
options: ["Intercambiables", "Procesos más rápidos", "Independientes vs compartidos", "Solo en Unix"]
},
{
question: "TDD?",
answer: "Pruebas antes del código",
options: ["Optimizar BD", "Lenguaje programación", "Pruebas antes del código", "Arquitectura software"]
},
{
question: "Eventual consistency?",
answer: "Sincronización futura",
options: ["Datos inmutables", "Siempre consistente", "Sincronización futura", "Borrado eventual"]
},
{
question: "Programación reactiva?",
answer: "Flujos de datos",
options: ["Reacción a errores", "Flujos de datos", "Solo React.js", "Sin planificación"]
}
],
  "Aplicación sql":
[
{
question: "¿Cuál es la sintaxis correcta para seleccionar todos los campos de una tabla llamada 'usuarios'?",
answer: "SELECT * FROM",
options: ["RETRIEVE * FROM", "SELECT * FROM", "GET * FROM"]
},
{
question: "¿Cómo se inserta un nuevo registro en una tabla 'clientes' con campos 'nombre' y 'email'?",
answer: "INSERT INTO clientes",
options: ["ADD TO clientes", "INSERT INTO clientes", "PUT INTO clientes"]
},
{
question: "¿Cómo se actualiza el campo 'precio' a 100 para el producto con id 5 en la tabla 'productos'?",
answer: "UPDATE productos SET",
options: ["CHANGE productos SET", "UPDATE productos SET", "MODIFY productos SET"]
},
{
question: "¿Cuál es la sintaxis correcta para eliminar todos los registros de la tabla 'pedidos' donde el estado es 'cancelado'?",
answer: "DELETE FROM pedidos",
options: ["REMOVE FROM pedidos", "DELETE FROM pedidos", "ERASE FROM pedidos"]
},
{
question: "¿Cómo se realiza un INNER JOIN entre las tablas 'clientes' y 'pedidos' usando el campo 'cliente_id'?",
answer: "INNER JOIN pedidos",
options: ["CONNECT clientes AND", "INNER JOIN pedidos", "MERGE clientes WITH"]
},
{
question: "¿Cómo se obtiene el número total de registros en la tabla 'productos'?",
answer: "COUNT() FROM productos",
options: ["SUM() FROM productos", "COUNT() FROM productos", "TOTAL() FROM productos"]
},
{
question: "¿Cuál es la sintaxis correcta para crear una nueva tabla llamada 'empleados' con campos 'id', 'nombre' y 'salario'?",
answer: "CREATE TABLE empleados",
options: ["NEW TABLE empleados", "CREATE TABLE empleados", "MAKE TABLE empleados"]
},
{
question: "¿Cómo se obtienen los 5 productos más caros de la tabla 'productos'?",
answer: "ORDER BY precio",
options: ["TOP 5 FROM", "ORDER BY precio", "SORT BY precio"]
}
],

"Lenguajes_de_programación":
[
{
question: "¿Cuál es el lenguaje de programación más utilizado para desarrollo web?",
answer: "JavaScript",
options: ["Python", "Java", "JavaScript"]
},
{
question: "¿Qué lenguaje de programación es conocido por su uso en inteligencia artificial?",
answer: "Python",
options: ["Java", "Python", "Ruby"]
},
{
question: "¿Cuál es el lenguaje de programación principal para desarrollo de aplicaciones Android?",
answer: "Kotlin",
options: ["Swift", "Kotlin", "JavaScript"]
},
{
question: "¿Qué lenguaje de programación se utiliza principalmente para desarrollo de sistemas operativos?",
answer: "C",
options: ["C", "Java", "Python"]
},
{
question: "¿Cuál es el lenguaje de programación más utilizado para desarrollo de videojuegos?",
answer: "C++",
options: ["Java", "C++", "Python"]
},
{
question: "¿Qué lenguaje de programación es conocido por su simplicidad y legibilidad?",
answer: "Python",
options: ["C++", "Java", "Python"]
},
{
question: "¿Cuál es el lenguaje de programación utilizado para desarrollo de aplicaciones iOS?",
answer: "Swift",
options: ["Kotlin", "Swift", "JavaScript"]
},
{
question: "¿Qué lenguaje de programación es conocido por su uso en el desarrollo de aplicaciones de escritorio?",
answer: "C#",
options: ["Java", "C#", "Python"]
}
],

"Diseño uxui":
[
{
question: "¿Qué herramienta usarías para crear prototipos interactivos?",
answer: "Figma Adobe XD"
},
{
question: "¿Cómo abordarías el diseño de una app para usuarios mayores?",
answer: "Simplicidad contraste grande"
},
{
question: "¿Qué harías si el cliente no está satisfecho con tu diseño?",
answer: "Escuchar entender iterar"
},
{
question: "¿Cómo evaluarías la usabilidad de un diseño?",
answer: "Pruebas análisis mapas"
}
],

"Cloud computing":
[
{
question: "¿Qué es un contenedor en la nube?",
answer: "Unidad software empaquetada",
options: ["Almacenamiento nube", "Unidad software empaquetada", "Red nube"]
},
{
question: "¿Qué es la computación serverless?",
answer: "Proveedor gestiona infraestructura",
options: ["Servidor físico", "Proveedor gestiona infraestructura", "Red sin servidores"]
},
{
question: "¿Qué es la elasticidad en la nube?",
answer: "Escalar recursos automáticamente",
options: ["Flexibilidad precios", "Escalar recursos automáticamente", "Resistencia servidores"]
},
{
question: "¿Qué es un modelo de servicio IaaS?",
answer: "Infraestructura como Servicio",
options: ["Internet como Servicio", "Infraestructura como Servicio", "Inteligencia Artificial Servicio"]
}
],

"Programación orientada a objetos":
[
{
question: "¿Qué es la encapsulación en POO?",
answer: "Ocultar detalles internos",
options: ["Crear múltiples instancias", "Ocultar detalles internos", "Implementar interfaces"]
},
{
question: "¿Qué principio SOLID establece una sola razón para cambiar?",
answer: "Responsabilidad Única",
options: ["Abierto/Cerrado", "Sustitución Liskov", "Responsabilidad Única"]
},
{
question: "¿Qué es el polimorfismo en POO?",
answer: "Tomar muchas formas",
options: ["Tomar muchas formas", "Múltiples constructores", "Heredar propiedades"]
},
{
question: "¿Qué es una interfaz en POO?",
answer: "Contrato métodos implementar",
options: ["Clase no instanciable", "Contrato métodos implementar", "Referencia objeto"]
},
{
question: "¿Qué es la herencia múltiple?",
answer: "Heredar varias clases",
options: ["Múltiples métodos", "Heredar varias clases", "Múltiples instancias"]
}
],

"Desarrollo web frontend y backend":
[
{
question: "¿Qué significa CSS?",
answer: "Cascading Style Sheets",
options: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"]
},
{
question: "¿Cuál NO es un framework de JavaScript?",
answer: "Django",
options: ["React", "Angular", "Django"]
},
{
question: "¿Qué es AJAX?",
answer: "Aplicaciones web asíncronas",
options: ["Nuevo lenguaje", "Aplicaciones web asíncronas", "Protocolo seguridad"]
},
{
question: "¿Qué es un ORM?",
answer: "Object-Relational Mapping",
options: ["Object-Relational Mapping", "Online Resource Management", "Operational Result Monitor"]
},
{
question: "¿Función principal de un servidor web?",
answer: "Procesar entregar contenido",
options: ["Almacenar bases datos", "Procesar entregar contenido", "Diseñar interfaces"]
}
],

"Seguridad conceptos":
[
{
question: "¿Qué es el 'phishing'?",
answer: "Obtener información fraudulentamente",
options: ["Tipo malware", "Obtener información fraudulentamente", "Técnica cifrado"]
},
{
question: "¿Qué es un firewall?",
answer: "Prevenir accesos no-autorizados",
options: ["Antivirus", "Prevenir accesos no-autorizados", "Herramienta cifrado"]
},
{
question: "¿Qué significa HTTPS?",
answer: "Hypertext Transfer Protocol Secure",
options: ["Hypertext Transfer Protocol Standard", "Hypertext Transfer Protocol Secure", "Hypertext Transfer Protocol Simple"]
},
{
question: "¿Qué es la autenticación de dos factores (2FA)?",
answer: "Confirmar identidad doblemente",
options: ["Tipo cifrado", "Confirmar identidad doblemente", "Detectar malware"]
},
{
question: "¿Qué es un ataque de denegación de servicio (DoS)?",
answer: "Recurso inaccesible usuarios",
options: ["Virus informático", "Recurso inaccesible usuarios", "Robar contraseñas"]
}
],

"Inteligencia artificial y machine learning fundamentos":
[
{
question: "¿Qué es el aprendizaje supervisado?",
answer: "Entrenamiento datos etiquetados",
options: ["Entrenamiento sin etiquetas", "Entrenamiento datos etiquetados", "Optimizar redes neuronales"]
},
{
question: "¿Qué es una red neuronal artificial?",
answer: "Modelo cerebro humano",
options: ["Algoritmo búsqueda", "Modelo cerebro humano", "Sistema experto"]
},
{
question: "¿Qué es el 'overfitting'?",
answer: "Sobreajuste datos entrenamiento",
options: ["Mal ajuste", "Sobreajuste datos entrenamiento", "Entrenamiento lento"]
},
{
question: "¿Qué es el procesamiento del lenguaje natural (NLP)?",
answer: "Interacción computadora-lenguaje humano",
options: ["Algoritmo clasificación", "Interacción computadora-lenguaje humano", "Comprimir texto"]
},
{
question: "¿Qué es un algoritmo de clustering?",
answer: "Agrupar datos similares",
options: ["Predecir valores", "Agrupar datos similares", "Reducir ruido"]
}
],

"Devops practicas":
[
{
question: "¿Qué es la integración continua (CI)?",
answer: "Integrar código frecuentemente",
options: ["Prueba software", "Integrar código frecuentemente", "Gestionar dependencias"]
},
{
question: "¿Propósito principal de Docker?",
answer: "Desplegar en contenedores",
options: ["Gestionar bases datos", "Desplegar en contenedores", "Monitorizar rendimiento"]
},
{
question: "¿Qué es Kubernetes?",
answer: "Gestionar aplicaciones contenedores",
options: ["Lenguaje programación", "Gestionar aplicaciones contenedores", "Sistema operativo"]
},
{
question: "¿Qué es 'Infrastructure as Code' (IaC)?",
answer: "Gestionar infraestructura código",
options: ["Codificar servidores", "Gestionar infraestructura código", "Compilar servidores"]
},
{
question: "¿Función principal de Jenkins?",
answer: "Automatizar procesos desarrollo",
options: ["Gestionar bases datos", "Automatizar procesos desarrollo", "Entorno desarrollo"]
}
]
};




// cntiene quizzes
var quizzesDoc = doc(collection(db, "quizzes"), "all_quizzes");

for (var quizName in quizzes) {
    if (quizzes.hasOwnProperty(quizName)) {
      var quizDoc = doc(collection(db, "quizzes"), quizName);
      setDoc(quizDoc, {questions: quizzes[quizName]}).then(() => {
        console.log(`Quiz "${quizName}" cargado exitosamente!`);
      }).catch((error) => {
        console.error(`Error al cargar el quiz "${quizName}": `, error);
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    var dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
  
    // Limpiar filas anteriores si existen
    dataTable.innerHTML = "";
  
    // Iterar sobre cada quiz en el documento
    for (var quizName in quizzes) {
      if (quizzes.hasOwnProperty(quizName)) {
        var quizRow = document.createElement('tr');
  
        // status no configurado
      //  var statusCell = document.createElement('td');
     //   var statusIndicator = document.createElement('div');
      //  statusIndicator.className = 'status-indicator not-completed';
     //   statusIndicator.setAttribute('data-status', 'not-started'); // Personaliza el estado
       // statusCell.appendChild(statusIndicator);
  
        // Columna del nombre del quiz
        var nameCell = document.createElement('td');
        var quizLink = document.createElement('a');
  
        // Este enlace redirigirá a 'inicial.html', pasando el nombre del quiz como parámetro 'quiz' en la URL
        quizLink.href = `quizinicial.html?quiz=${quizName}`; 
  
        // Reemplazar guiones bajos por espacios para mostrarlo correctamente en el enlace
        quizLink.textContent = quizName.replace(/_/g, ' '); 
  
        // Añadir el enlace a la celda
        nameCell.appendChild(quizLink);
  
        // Columna de dificultad (puedes personalizarla)
        var difficultyCell = document.createElement('td');
        difficultyCell.className = 'quiz-name easy'; // Puedes cambiar "easy" a la dificultad real
        difficultyCell.textContent = 'Fácil'; // Puedes usar un valor real aquí
  

        
        // Añadir las celdas a la fila
       // quizRow.appendChild(statusCell);
        quizRow.appendChild(nameCell);
        quizRow.appendChild(difficultyCell);
  
        // Añadir la fila a la tabla
        dataTable.appendChild(quizRow);
      }
    }
  });
  


// Obtén el ID del quiz de la URL
var urlParams = new URLSearchParams(window.location.search);
var quizId = urlParams.get('quiz');

// Obtén las preguntas del quiz de Firestore
var quizDoc = doc(collection(db, "quizzes"), quizId);
getDoc(quizDoc).then((doc) => {
  if (doc.exists()) {
    var questions = doc.data().questions;

    // Ahora puedes usar las preguntas para llenar tu HTML
    // ...
  } else {
    console.log(`¡No se encontró el quiz "${quizId}"!`);
  }
}).catch((error) => {
  console.error(`Error al obtener el quiz "${quizId}": `, error);
});


//quizz en inicial 


var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var qNum = 0
var answers = []//array to show the correct answers and false ones
var minutes = 0
var seconds = 0
var formattedMinutes = 0
var formattedSeconds = 0
var interval = 0

function startQuiz(){
    // Obtén el ID del quiz de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var quizId = urlParams.get('quiz');

    // Obtén el quiz de Firestore
    var quizDoc = doc(collection(db, "quizzes"), quizId);
    getDoc(quizDoc).then((doc) => {
      if (doc.exists()) {
        var questions = doc.data().questions;

       

        document.getElementById("mainBody").style.display = "flex"
        document.getElementById("startBtn").style.display = "none"    

        appendQuestion()
        interval = setInterval(function(){
            if(seconds<59) seconds++
            else{
                seconds=0
                if(minutes<59) minutes++
                else{
                    minutes=0
                    clearInterval(interval)
                }
            }
            formattedSeconds = seconds<10 ? `0${seconds}` : seconds
            formattedMinutes = minutes<10 ? `0${minutes}` : minutes
            document.getElementById("timer").innerHTML = `${formattedMinutes}:${formattedSeconds}`
        }, 1000);
      } else {
        console.log(`¡No se encontró el quiz "${quizName}"!`);
      }
    }).catch((error) => {
      console.error(`Error al obtener el quiz "${quizName}": `, error);
    });}
    