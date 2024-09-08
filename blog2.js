import { app } from './firebase.js';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, serverTimestamp, query, where } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';


// Inicializa Firebase
const db = getFirestore(app);

async function addBlogItem(title, shortDescription, category,  colorClass, longDescription = '', example,   difficulty ) {
    try {
        const q = query(collection(db, 'blog'), where('title', '==', title));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            const blogItem = {
                title,
                shortDescription,
                category,
                colorClass,
                longDescription,
                example,
                difficulty,
                createdAt: serverTimestamp(),
                

            };

            const docRef = await addDoc(collection(db, 'blog'), blogItem);
            console.log("Document written with ID: ", docRef.id);
        } else {
            console.log("Document already exists, skipping addition.");
        }
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function initializeBlogItems() {
  
    await addBlogItem   (
        "Arreglos",
         "Los arreglos son estructuras de datos que permiten almacenar múltiples valores de un mismo tipo en una sola variable.",
         "Estructuras de Datos",
        "bg-blue-500",
         "Los arreglos son una de las estructuras de datos más básicas y comunes en programación. Permiten almacenar múltiples valores de un mismo tipo en una sola variable. Cada elemento en un arreglo tiene un índice numérico que se utiliza para acceder a él. Los arreglos son útiles para una variedad de tareas, como almacenar listas de elementos, procesar datos en lotes y realizar cálculos matemáticos.",
        "const numbers   [1, 2, 3, 4, 5];",
         "Básico",
         
    );
    await addBlogItem   (
        "Listas Enlazadas",
         "Las listas enlazadas son una estructura de datos que consiste en una secuencia de nodos, donde cada nodo contiene un valor y una referencia al siguiente nodo.",
         "Estructuras de Datos",
        "bg-green-500",
         "Las listas enlazadas son una estructura de datos lineal que consta de una secuencia de nodos, donde cada nodo contiene un valor y una referencia al siguiente nodo. A diferencia de los arreglos, las listas enlazadas no tienen un tamaño fijo y pueden crecer o encogerse dinámicamente a medida que se agregan o eliminan elementos. Las listas enlazadas son útiles para implementar pilas, colas y otras estructuras de datos más complejas.",
        "class Node { constructor(value) { this.value   value; this.next   null; } }\nclass LinkedList { constructor() { this.head   null; this.size   0; }}\n",
         "Básico",
         
    );
    await addBlogItem   (
        "Pilas",
         "Las pilas son una estructura de datos que sigue el principio de Last-In-First-Out (LIFO), donde los elementos se agregan y se eliminan desde un solo extremo, conocido como la cima de la pila.",
         "Estructuras de Datos",
        "bg-yellow-500",
         "Las pilas son una estructura de datos que sigue el principio de Last-In-First-Out (LIFO), lo que significa que el último elemento en ser agregado es el primero en ser eliminado. Los elementos se agregan y se eliminan desde un solo extremo, conocido como la cima de la pila. Las pilas son útiles para una variedad de tareas, como la gestión de llamadas de funciones, la evaluación de expresiones aritméticas y la implementación de algoritmos de backtracking.",
        "class Stack { constructor() { this.items   []; }\npush(element) { this.items.push(element); }\npop() { if (this.items.length    0) return \"Underflow\";\nreturn this.items.pop(); }\npeek() { return this.items[this.items.length - 1]; }\nisEmpty() { return this.items.length    0; }\nprintStack() { let str   \"\";\nfor (let i   0; i < this.items.length; i++) str +  this.items[i] + \" \";\nreturn str; }}",
         "Básico",
         
    );
    await addBlogItem   (
        "Árboles",
  "Los árboles son una estructura de datos jerárquica que consta de nodos conectados por enlaces, donde cada nodo puede tener cero o más nodos hijos.",
         "Estructuras de Datos",
        "bg-purple-500",
         "Los árboles son una estructura de datos jerárquica que consta de nodos conectados por enlaces. Cada nodo puede tener cero o más nodos hijos. Los árboles son utilizados en una amplia variedad de aplicaciones, como la representación de datos estructurados, la implementación de sistemas de archivos, la búsqueda y recuperación de información, y la implementación de algoritmos eficientes. Algunos ejemplos de tipos de árboles comunes incluyen los árboles binarios, los árboles de búsqueda binaria y los árboles de decisión.",
        "class TreeNode { constructor(val) { this.val   val; this.left   null; this.right   null; }}\nclass BinarySearchTree { constructor() { this.root   null; }}\n",
         "Intermedio",
         
    );


    await addBlogItem   (
        "Grafos",
         "Los grafos son una estructura de datos que consta de un conjunto de nodos (o vértices) y un conjunto de conexiones (o aristas) entre estos nodos.",
         "Estructuras de Datos",
        "bg-orange-500",
         "Los grafos son una estructura de datos que consta de un conjunto de nodos (o vértices) y un conjunto de conexiones (o aristas) entre estos nodos. Los grafos son utilizados en una amplia variedad de aplicaciones, como redes sociales, mapas de carreteras, algoritmos de ruta más corta y representación de relaciones complejas. Algunos tipos comunes de grafos incluyen grafos dirigidos, grafos no dirigidos y grafos ponderados.",
        "class Graph { constructor() { this.adjacencyList   {); }\naddVertex(vertex) { this.adjacencyList[vertex]   []; }\naddEdge(vertex1, vertex2) { this.adjacencyList[vertex1].push(vertex2); this.adjacencyList[vertex2].push(vertex1); }\n}",
         "Intermedio",
         
    );
    await addBlogItem   (
        "Árboles AVL",
         "Los árboles AVL son una clase de árboles binarios de búsqueda autobalanceados, lo que significa que mantienen una altura aproximadamente logarítmica del número de nodos.",
         "Estructuras de Datos",
        "bg-pink-500",
         "Los árboles AVL son una clase de árboles binarios de búsqueda autobalanceados, lo que significa que mantienen una altura aproximadamente logarítmica del número de nodos. Esta característica asegura tiempos de ejecución eficientes para las operaciones básicas, como inserción, eliminación y búsqueda. Los árboles AVL se mantienen balanceados mediante la realización de rotaciones cada vez que se inserta o elimina un nodo, lo que garantiza que la diferencia de altura entre los subárboles izquierdo y derecho de cada nodo no exceda 1.",
        "class AVLTree { constructor() { this.root   null; }\ngetHeight(node) { if (!node) return 0; return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right)); }\ngetBalance(node) { if (!node) return 0; return this.getHeight(node.left) - this.getHeight(node.right); }\nrotateRight(y) { }\nrotateLeft(x) { }\ninsert(value) { this.root   this.insertRecursive(this.root, value); }\ninsertRecursive(node, value) { } }",
         "Avanzado",
         
    );
    await addBlogItem   (
        "Árboles Rojo-Negro",
         "Los árboles Rojo-Negro son una clase especial de árboles binarios de búsqueda autobalanceados, que se caracterizan por tener nodos con un atributo de color (rojo o negro).",
         "Estructuras de Datos",
        "bg-indigo-500",
         "Los árboles Rojo-Negro son una clase especial de árboles binarios de búsqueda autobalanceados, que se caracterizan por tener nodos con un atributo de color (rojo o negro). Las propiedades de los árboles Rojo-Negro aseguran que el árbol se mantenga aproximadamente balanceado, lo que permite tiempos de ejecución eficientes para las operaciones básicas, como inserción, eliminación y búsqueda. Los árboles Rojo-Negro se mantienen balanceados mediante la realización de rotaciones y cambios de color cada vez que se inserta o elimina un nodo.",
        "class RedBlackTree { constructor() { this.root   null; }\ninsertNode(value) { this.root   this.insert(this.root, value); this.root.color   'black'; }\ninsert(node, value) { if (!node) return new Node(value); if (value < node.value) { node.left   this.insert(node.left, value); } else if (value > node.value) { node.right   this.insert(node.right, value); } else { return node; }\n}",
         "Avanzado",
         
    );
    await addBlogItem  (
        "Recursión",
         "La recursión es una técnica de programación en la que una función se llama a sí misma para resolver un problema dividido en subproblemas más pequeños.",
         "Algoritmos",
        "bg-blue-500",
         "La recursión es una técnica de programación en la que una función se llama a sí misma para resolver un problema dividido en subproblemas más pequeños. Esto permite dividir un problema en problemas más pequeños y solucionarlos de manera incremental. La recursión es útil para resolver problemas que pueden ser divididos en subproblemas similares, como calcular el factorial de un número, generar secuencias de Fibonacci o recorrer estructuras de datos jerárquicas como árboles y grafos.",
        "function factorial(n) { if (n     0) return 1; return n * factorial(n - 1); }",
         "Básico",
         
    );
    await addBlogItem   (
        "Ordenamiento",
         "El ordenamiento es el proceso de organizar los elementos de una colección (como un arreglo o una lista) en un orden específico, ya sea ascendente o descendente.",
         "Algoritmos",
        "bg-green-500",
         "El ordenamiento es el proceso de organizar los elementos de una colección (como un arreglo o una lista) en un orden específico, ya sea ascendente o descendente. Existen varios algoritmos de ordenamiento, como el ordenamiento por burbuja, el ordenamiento por selección, el ordenamiento por inserción y el ordenamiento rápido (quicksort). Cada algoritmo de ordenamiento tiene sus propias características en términos de eficiencia, complejidad y estabilidad.",
        "function bubbleSort(arr) { for (let i   0; i < arr.length; i++) { for (let j   0; j < arr.length - i - 1; j++) { if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]]   [arr[j + 1], arr[j]]; } } } return arr; }",
         "Básico",
         
    );
    await addBlogItem   (
        "Búsqueda Binaria",
         "La búsqueda binaria es un algoritmo eficiente para encontrar un elemento en un arreglo ordenado.",
         "Algoritmos",
        "bg-yellow-500",
         "La búsqueda binaria es un algoritmo eficiente para encontrar un elemento en un arreglo ordenado. En lugar de recorrer todo el arreglo, el algoritmo divide el espacio de búsqueda a la mitad en cada iteración, lo que reduce drásticamente el número de comparaciones necesarias. La búsqueda binaria es especialmente útil cuando se trabaja con grandes conjuntos de datos, ya que tiene una complejidad de tiempo logarítmica.",
        "function binarySearch(arr, target) { let left   0; let right   arr.length - 1; while (left <  right) { let mid   Math.floor((left + right) / 2); if (arr[mid]     target) { return mid; } else if (arr[mid] < target) { left   mid + 1; } else { right   mid - 1; } } return -1; }",
         "Básico",
         
    );
    await addBlogItem  (
        "Backtracking",
         "El backtracking es una técnica algorítmica que considera la búsqueda de soluciones a algunos problemas computacionales, incrementalmente construyendo candidatos a soluciones y descartando a cada paso cada uno de los candidatos ('backtrack') tan pronto como determine que el candidato no cumplirá las restricciones del problema.",
         "Algoritmos",
        "bg-purple-500",
         "El backtracking es una técnica algorítmica que considera la búsqueda de soluciones a algunos problemas computacionales, incrementalmente construyendo candidatos a soluciones y descartando a cada paso cada uno de los candidatos ('backtrack') tan pronto como determine que el candidato no cumplirá las restricciones del problema. El backtracking es útil para resolver problemas de optimización y de búsqueda, como el problema de las N-reinas, el problema del viajero vendedor y el problema de la mochila.",
        "function solveNQueens(n) { const board   Array(n).fill(0).map(()  > Array(n).fill(0)); const solutions   []; function isValid(row, col) { // Verificar si la posición es válida } function solveNQueensRecursive(row) { if (row     n) { solutions.push(board.map(row  > row.slice())); return; } for (let col   0; col < n; col++) { if (isValid(row, col)) { board[row][col]   1; solveNQueensRecursive(row + 1); board[row][col]   0; } } } solveNQueensRecursive(0); return solutions; }",
         "Intermedio",
         
    );
    await addBlogItem  (
        "Algoritmo de Floyd-Warshall",
         "El algoritmo de Floyd-Warshall es un algoritmo para encontrar los caminos más cortos entre todos los pares de nodos en un grafo dirigido con pesos.",
         "Algoritmos",
        "bg-orange-500",
         "El algoritmo de Floyd-Warshall es un algoritmo para encontrar los caminos más cortos entre todos los pares de nodos en un grafo dirigido con pesos. Este algoritmo se basa en la programación dinámica y tiene una complejidad de tiempo de O(n^3), donde n es el número de nodos en el grafo. El algoritmo de Floyd-Warshall es útil para resolver problemas relacionados con la búsqueda de rutas más cortas, como en sistemas de navegación, redes de transporte y análisis de redes sociales.",
        "function floydWarshall(graph) { const n   graph.length; const dist   Array(n).fill(0).map(()  > Array(n).fill(Infinity)); for (let i   0; i < n; i++) { for (let j   0; j < n; j++) { dist[i][j]   graph[i][j]; } dist[i][i]   0; } for (let k   0; k < n; k++) { for (let i   0; i < n; i++) { for (let j   0; j < n; j++) { if (dist[i][k] !   Infinity && dist[k][j] !   Infinity && dist[i][k] + dist[k][j] < dist[i][j]) { dist[i][j]   dist[i][k] + dist[k][j]; } } } } return dist; }",
         "Intermedio",
         
    );
    await addBlogItem   (
        "Algoritmo de Dijkstra",
         "El algoritmo de Dijkstra es un algoritmo para encontrar el camino más corto entre un nodo y todos los demás nodos en un grafo con pesos no negativos.",
         "Algoritmos",
        "bg-pink-500",
         "El algoritmo de Dijkstra es un algoritmo para encontrar el camino más corto entre un nodo y todos los demás nodos en un grafo con pesos no negativos. El algoritmo se basa en la idea de ir expandiendo un conjunto de nodos cuya distancia mínima desde el nodo inicial ya se conoce. El algoritmo de Dijkstra es ampliamente utilizado en aplicaciones de redes, transporte y comunicaciones, donde se necesita calcular las rutas más cortas entre diferentes puntos.",
        "function dijkstra(graph, source) { const dist   {); const prev   {); const pq   new PriorityQueue(); for (let node in graph) { dist[node]   Infinity; prev[node]   null; pq.enqueue(node, Infinity); } dist[source]   0; pq.enqueue(source, 0); while (!pq.isEmpty()) { const u   pq.dequeue(); for (let v in graph[u]) { const alt   dist[u] + graph[u][v]; if (alt < dist[v]) { dist[v]   alt; prev[v]   u; pq.enqueue(v, alt); } } } return { dist, prev ); }",
         "Avanzado",
         
    );
    await addBlogItem  (
        "Algoritmo de Prim",
         "El algoritmo de Prim es un algoritmo para encontrar el árbol de expansión mínima (MST) de un grafo conexo y ponderado.",
         "Algoritmos",
        "bg-indigo-500",
         "El algoritmo de Prim es un algoritmo para encontrar el árbol de expansión mínima (MST) de un grafo conexo y ponderado. El algoritmo comienza con un nodo arbitrario y luego va añadiendo gradualmente los nodos y las aristas que forman el MST, eligiendo siempre la arista de menor peso que conecta un nodo ya incluido en el MST con un nodo que aún no lo está. El algoritmo de Prim es ampliamente utilizado en problemas de optimización de redes, planificación de proyectos y análisis de redes sociales.",
        "function prim(graph, start) { const visited   new Set(); const queue   new PriorityQueue(); const mst   new Set(); queue.enqueue(start, 0); while (!queue.isEmpty()) { const [u, weight]   queue.dequeue(); if (!visited.has(u)) { visited.add(u); mst.add(u); for (let v in graph[u]) { if (!visited.has(v)) { queue.enqueue(v, graph[u][v]); } } } } return mst; }",
         "Avanzado",
         
    );
    await addBlogItem   (
        "Algoritmo de Kruskal",
         "El algoritmo de Kruskal es un algoritmo para encontrar el árbol de expansión mínima (MST) de un grafo conexo y ponderado.",
         "Algoritmos",
        "bg-green-500",
         "El algoritmo de Kruskal es un algoritmo para encontrar el árbol de expansión mínima (MST) de un grafo conexo y ponderado. El algoritmo comienza seleccionando la arista de menor peso del grafo y luego va añadiendo gradualmente las demás aristas, siempre y cuando no formen un ciclo. El algoritmo continúa este proceso hasta que todas las aristas han sido incluidas o hasta que se ha formado un árbol de expansión mínima. El algoritmo de Kruskal es ampliamente utilizado en problemas de optimización de redes, planificación de proyectos y análisis de redes sociales.",
        "function kruskal(graph) { const mst   new Set(); const edges   []; for (let u in graph) { for (let v in graph[u]) { edges.push([u, v, graph[u][v]]); } } edges.sort((a, b)  > a[2] - b[2]); const parent   {); function find(x) { if (parent[x] !   x) { parent[x]   find(parent[x]); } return parent[x]; } function union(x, y) { const xRoot   find(x); const yRoot   find(y); if (xRoot !   yRoot) { parent[xRoot]   yRoot; } } for (let [u, v, w] of edges) { if (find(u) !   find(v)) { union(u, v); mst.add(`${u}-${v}`); } } return mst; }",
         "Avanzado",
         
    );
  
    await addBlogItem  (
        "Conceptos Básicos de Redes",
         "Los conceptos básicos de redes incluyen la comprensión de los componentes de una red, la forma en la que los dispositivos se comunican y los protocolos que se utilizan para facilitar esta comunicación.",
         "Redes",
        "bg-blue-500",
         "Los conceptos básicos de redes incluyen la comprensión de los componentes de una red, la forma en la que los dispositivos se comunican y los protocolos que se utilizan para facilitar esta comunicación. Esto incluye conceptos como direcciones IP, puertos, enrutadores, switches, protocolos de red como TCP/IP, modelo OSI, y las diferencias entre redes LAN, WAN e Internet. Estos conceptos son fundamentales para comprender cómo funcionan las redes y cómo se conectan los dispositivos.",
        "const networkComponents   [\n  { name: 'Router', description: 'Dispositivo que enruta el tráfico entre redes' },\n  { name: 'Switch', description: 'Dispositivo que conecta dispositivos en una red local' },\n  { name: 'Dirección IP', description: 'Identificador único de un dispositivo en una red' },\n  { name: 'Protocolo TCP/IP', description: 'Protocolo que define cómo se transmiten los datos en una red' }\n];",
         "Básico",
         
    );
    await addBlogItem  (
        "DNS",
         "El Sistema de Nombres de Dominio (DNS) es un sistema de nomenclatura jerárquico descentralizado para dispositivos conectados a redes IP, como Internet o una red privada.",
         "Redes",
        "bg-green-500",
         "El Sistema de Nombres de Dominio (DNS) es un sistema de nomenclatura jerárquico descentralizado para dispositivos conectados a redes IP, como Internet o una red privada. DNS traduce nombres de dominio legibles por los humanos a direcciones IP que pueden ser utilizadas por los dispositivos para identificar y comunicarse entre sí. DNS es fundamental para el funcionamiento de Internet, ya que permite a los usuarios acceder a sitios web y otros servicios en línea mediante nombres de dominio en lugar de tener que recordar las direcciones IP.",
        "class DNSResolver {\n  constructor() {\n    this.dnsRecords   {);\n  }\n\n  resolve(domain) {\n    if (this.dnsRecords[domain]) {\n      return this.dnsRecords[domain];\n    } else {\n      // Realizar una consulta DNS y almacenar el resultado\n      const ipAddress   '192.168.1.100';\n      this.dnsRecords[domain]   ipAddress;\n      return ipAddress;\n    }\n  }\n}",
         "Básico",
         
    );
    await addBlogItem   (
        "Protocolo IP",
         "El Protocolo de Internet (IP) es el principal protocolo de comunicación utilizado en redes de computadoras, particularmente en Internet, para la transmisión de datos entre dispositivos.",
         "Redes",
        "bg-yellow-500",
         "El Protocolo de Internet (IP) es el principal protocolo de comunicación utilizado en redes de computadoras, particularmente en Internet, para la transmisión de datos entre dispositivos. IP define cómo los paquetes de datos deben ser formateados, direccionados, transmitidos, enrutados y recibidos. IP es responsable de asignar direcciones únicas a cada dispositivo en la red (direcciones IP) y de enrutar los paquetes de datos a través de la red hasta su destino. IP es fundamental para el funcionamiento de Internet y otras redes IP.",
        "function sendIPPacket(sourceIP, destinationIP, data) {\n  const packet   {\n    sourceIP,\n    destinationIP,\n    data\n  );\n\n  // Simular el envío del paquete IP a través de la red\n  console.log(`Enviando paquete IP de ${sourceIP} a ${destinationIP}`);\n  console.log(packet);\n}",
         "Básico",
         
    );
    await addBlogItem  (
        "APIs",
         "Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y protocolos que definen cómo los diferentes sistemas de software se comunican e interactúan entre sí.",
         "Redes",
        "bg-purple-500",
         "Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y protocolos que definen cómo los diferentes sistemas de software se comunican e interactúan entre sí. Las APIs permiten a las aplicaciones acceder a funcionalidades y datos de otros sistemas, sin necesidad de conocer los detalles internos de su implementación. Esto facilita la integración de aplicaciones y la creación de nuevos servicios y productos a partir de las capacidades existentes. Las APIs son fundamentales en el desarrollo de aplicaciones modernas y en la construcción de ecosistemas de software.",
        "async function fetchWeatherData(city) {\n  const apiUrl   `https://api.openweathermap.org/data/2.5/weather?q ${city}&appid your-api-key`;\n  const response   await fetch(apiUrl);\n  const data   await response.json();\n  return {\n    temperature: data.main.temp,\n    description: data.weather[0].description\n  );\n}",
         "Intermedio",
         
    );
    await addBlogItem   (
        "HTTP",
         "HTTP (Hypertext Transfer Protocol) es el protocolo de comunicación más utilizado en la World Wide Web, que define cómo se transmiten los datos entre un cliente y un servidor.",
         "Redes",
        "bg-indigo-500",
         "HTTP (Hypertext Transfer Protocol) es el protocolo de comunicación más utilizado en la World Wide Web, que define cómo se transmiten los datos entre un cliente y un servidor. HTTP se basa en un modelo de solicitud-respuesta, donde el cliente envía una solicitud al servidor y este responde con los datos solicitados. HTTP define los métodos de solicitud (GET, POST, PUT, DELETE, etc.), los códigos de estado (200 OK, 404 Not Found, 500 Internal Server Error, etc.) y los encabezados de solicitud y respuesta, que permiten a los clientes y servidores intercambiar información de manera estructurada y estandarizada.",
        "async function fetchData(url, method   'GET', data   null) {\n  const options   {\n    method,\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: data ? JSON.stringify(data) : null\n  );\n\n  const response   await fetch(url, options);\n  const responseData   await response.json();\n\n  if (!response.ok) {\n    throw new Error(`HTTP error ${response.status}`);\n  }\n\n  return responseData;\n}",
         "Intermedio",
         
    );
    await addBlogItem   (
        "WebSockets",
         "WebSocket es un protocolo de comunicación bidireccional en tiempo real que permite la comunicación entre un cliente y un servidor de forma persistente.",
         "Redes",
        "bg-orange-500",
         "WebSocket es un protocolo de comunicación bidireccional en tiempo real que permite la comunicación entre un cliente y un servidor de forma persistente. A diferencia de HTTP, que se basa en un modelo de solicitud-respuesta, WebSocket establece una conexión persistente entre el cliente y el servidor, lo que permite el envío y recepción de datos en ambas direcciones sin necesidad de volver a establecer la conexión. WebSocket es ampliamente utilizado en aplicaciones web en tiempo real, como chats, juegos en línea y aplicaciones de colaboración.",
        "const socket   new WebSocket('ws://example.com/websocket');\n\nsocket.onopen   ()  > {\n  console.log('Conexión WebSocket establecida');\n  socket.send('Hola servidor');\n);\n\nsocket.onmessage   (event)  > {\n  console.log('Mensaje recibido:', event.data);\n);\n\nsocket.onclose   ()  > {\n  console.log('Conexión WebSocket cerrada');\n);\n\nsocket.onerror   (error)  > {\n  console.error('Error en la conexión WebSocket:', error);\n);",
         "Intermedio",
         
    );
    await addBlogItem   (
        "Protocolo SNMP",
         "SNMP (Simple Network Management Protocol) es un protocolo de la capa de aplicación que facilita el intercambio de información de gestión entre dispositivos de red.",
         "Redes",
        "bg-pink-500",
         "SNMP (Simple Network Management Protocol) es un protocolo de la capa de aplicación que facilita el intercambio de información de gestión entre dispositivos de red. SNMP permite a los administradores de red monitorear y controlar remotamente dispositivos como enrutadores, switches, servidores y otros equipos de red. El protocolo SNMP define un conjunto de operaciones y estructuras de datos que permiten a los sistemas de gestión de red recopilar y manipular información sobre los dispositivos gestionados, como estadísticas de tráfico, estado de los puertos, configuración de los dispositivos, entre otros. SNMP es fundamental para la administración y monitoreo de redes grandes y complejas.",
        "const snmp   require('snmp-nodejs');\n\nasync function fetchDeviceInfo(host, community) {\n  const session   snmp.createSession(host, community);\n\n  const sysDescr   await session.get(['1.3.6.1.2.1.1.1.0']);\n  const sysName   await session.get(['1.3.6.1.2.1.1.5.0']);\n  const sysUptime   await session.get(['1.3.6.1.2.1.1.3.0']);\n\n  session.close();\n\n  return {\n    description: sysDescr[0],\n    name: sysName[0],\n    uptime: sysUptime[0]\n  );\n}",
         "Avanzado",
         
    );
    await addBlogItem   (
        "Protocolo BGP",
         "BGP (Border Gateway Protocol) es un protocolo de enrutamiento utilizado para el intercambio de información de enrutamiento entre sistemas autónomos en Internet.",
         "Redes",
        "bg-green-500",
         "BGP (Border Gateway Protocol) es un protocolo de enrutamiento utilizado para el intercambio de información de enrutamiento entre sistemas autónomos en Internet. BGP permite a los diferentes sistemas autónomos (AS) intercambiar información sobre las rutas disponibles y las políticas de enrutamiento, lo que permite a la red global de Internet determinar la mejor ruta para enviar el tráfico entre diferentes destinos. BGP es fundamental para el funcionamiento de Internet, ya que permite que las redes de diferentes proveedores de servicios de Internet se interconecten de manera eficiente y escalable.",
        "const bgp   require('bgp-nodejs');\n\nasync function fetchBGPRoutes(host, asn) {\n  const session   bgp.createSession(host, asn);\n\n  const routes   await session.getRoutes();\n\n  session.close();\n\n  return routes;\n}\n\nfetchBGPRoutes('192.168.1.1', 64512)\n  .then(routes  > {\n    console.log(routes);\n  })\n  .catch(error  > {\n    console.error('Error al obtener rutas BGP:', error);\n  });",
         "Avanzado",
         
    );
    await addBlogItem  (
        "Almacenamiento",
         "El almacenamiento en informática se refiere a los dispositivos y medios utilizados para guardar y recuperar datos de forma persistente.",
         "Almacenamiento",
        "bg-blue-500",
         "El almacenamiento en informática se refiere a los dispositivos y medios utilizados para guardar y recuperar datos de forma persistente. Los tipos de almacenamiento incluyen discos duros, unidades de estado sólido (SSD), memorias USB, tarjetas de memoria, y sistemas de almacenamiento en la nube. Cada tipo de almacenamiento tiene sus propias características de velocidad, capacidad, durabilidad y costo, lo que los hace más adecuados para diferentes tipos de aplicaciones y requisitos de datos.",
        "const storageTypes   [\n  { name: 'Disco duro', description: 'Almacenamiento magnético tradicional' },\n  { name: 'SSD', description: 'Unidad de estado sólido, más rápida que los discos duros' },\n  { name: 'Memoria USB', description: 'Almacenamiento portátil y extraíble' },\n  { name: 'Almacenamiento en la nube', description: 'Almacenamiento remoto en servidores' }\n];",
         "Básico",
         
    );
    await addBlogItem  (
        "SQL",
         "SQL (Structured Query Language) es un lenguaje de programación utilizado para gestionar y manipular bases de datos relacionales.",
         "Almacenamiento",
        "bg-green-500",
         "SQL (Structured Query Language) es un lenguaje de programación utilizado para gestionar y manipular bases de datos relacionales. SQL permite crear, modificar y consultar tablas de datos, así como realizar operaciones de inserción, actualización, eliminación y búsqueda de información. Las bases de datos relacionales organizan los datos en tablas con filas y columnas, lo que permite establecer relaciones entre diferentes conjuntos de datos. SQL es ampliamente utilizado en aplicaciones web, sistemas de gestión de información y análisis de datos.",
        "const sqlite3   require('sqlite3').verbose();\nconst db   new sqlite3.Database('mydatabase.db');\n\ndb.serialize(()  > {\n  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');\n  db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['John Doe', 'john@example.com']);\n  db.each('SELECT * FROM users', (err, row)  > {\n    console.log(`${row.id}: ${row.name} (${row.email})`);\n  });\n});\n\ndb.close();",
         "Básico",
         
    );
    await addBlogItem  (
        "NoSQL",
         "NoSQL (Not only SQL) es una categoría de sistemas de gestión de bases de datos que se diferencian de los modelos relacionales tradicionales.",
         "Almacenamiento",
        "bg-yellow-500",
         "NoSQL (Not only SQL) es una categoría de sistemas de gestión de bases de datos que se diferencian de los modelos relacionales tradicionales. A diferencia de las bases de datos relacionales, que almacenan datos en tablas con filas y columnas, las bases de datos NoSQL utilizan modelos de datos más flexibles, como documentos, grafos, columnas o pares clave-valor. Esto les permite manejar grandes volúmenes de datos no estructurados o semi-estructurados de manera más eficiente. Las bases de datos NoSQL son ampliamente utilizadas en aplicaciones web, análisis de big data y sistemas distribuidos.",
        "const mongodb   require('mongodb');\nconst client   new mongodb.MongoClient('mongodb://localhost:27017');\n\nasync function storeDocument() {\n  await client.connect();\n  const db   client.db('mydatabase');\n  const collection   db.collection('users');\n\n  const user   { name: 'John Doe', email: 'john@example.com' );\n  await collection.insertOne(user);\n\n  const users   await collection.find({}).toArray();\n  console.log(users);\n\n  await client.close();\n}",
         "Básico",
         
    );
    await addBlogItem   (
        "Bases de Datos Distribuidas",
         "Las bases de datos distribuidas son sistemas de gestión de bases de datos en los que los datos se almacenan en múltiples ubicaciones físicamente separadas.",
         "Almacenamiento",
        "bg-purple-500",
         "Las bases de datos distribuidas son sistemas de gestión de bases de datos en los que los datos se almacenan en múltiples ubicaciones físicamente separadas, a menudo en diferentes servidores o centros de datos. Esto permite una mayor escalabilidad, disponibilidad y tolerancia a fallos, ya que los datos se replican y se pueden acceder desde diferentes puntos. Las bases de datos distribuidas utilizan protocolos de comunicación y coordinación para mantener la coherencia y consistencia de los datos a pesar de la separación física. Ejemplos de bases de datos distribuidas incluyen Apache Cassandra, Amazon DynamoDB y Google Cloud Datastore.",
        "const cassandra   require('cassandra-driver');\nconst client   new cassandra.Client({ contactPoints: ['node1.example.com', 'node2.example.com', 'node3.example.com'] });\n\nasync function storeData() {\n  await client.connect();\n  const query   'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';\n  await client.execute(query, [uuid(), 'John Doe', 'john@example.com']);\n  const result   await client.execute('SELECT * FROM users');\n  console.log(result.rows);\n  await client.shutdown();\n}",
         "Intermedio",
         
    );
    await addBlogItem   (
        "Bases de Datos Temporales",
         "Las bases de datos temporales son sistemas de gestión de bases de datos diseñados específicamente para el manejo de datos con marca de tiempo y series de tiempo.",
         "Almacenamiento",
        "bg-indigo-500",
         "Las bases de datos temporales son sistemas de gestión de bases de datos diseñados específicamente para el manejo de datos con marca de tiempo y series de tiempo. A diferencia de las bases de datos tradicionales, que se enfocan en el estado actual de los datos, las bases de datos temporales almacenan y gestionan la evolución de los datos a lo largo del tiempo. Esto las hace especialmente útiles para aplicaciones que requieren un registro histórico de cambios, como monitoreo de sensores, análisis de series temporales, auditoría y control de versiones. Ejemplos de bases de datos temporales incluyen InfluxDB, TimescaleDB y Amazon TimeStream.",
        "const influx   require('@influxdata/influxdb-client');\nconst { InfluxDB, Point }   influx;\n\nconst client   new InfluxDB({ url: 'http://localhost:8086', token: 'my-token' });\nconst writeApi   client.getWriteApi('my-org', 'my-bucket');\n\nwriteApi.writePoint(new Point('sensor_data')\n  .tag('device', 'sensor_1')\n  .floatField('temperature', 25.3)\n  .timestamp(Date.now()));\n\nwriteApi.close()\n  .then(()  > {\n    console.log('SAVED!');\n  })\n  .catch(e  > {\n    console.error(e);\n    console.log('\\nFinished ERROR');\n  });",
         "Intermedio",
         
    );
  
    await addBlogItem  (
        "Bases de Datos NoSQL",
         "Las bases de datos NoSQL avanzadas son sistemas de gestión de bases de datos que ofrecen capacidades adicionales más allá del simple almacenamiento y recuperación de datos.",
         "Almacenamiento",
        "bg-pink-500",
         "Las bases de datos NoSQL avanzadas son sistemas de gestión de bases de datos que ofrecen capacidades adicionales más allá del simple almacenamiento y recuperación de datos. Estos sistemas pueden incluir funciones como procesamiento de flujos de datos en tiempo real, análisis de grafos, procesamiento de consultas en paralelo y soporte para procesamiento de lenguaje natural. Ejemplos de bases de datos NoSQL avanzadas incluyen Apache Spark, Amazon Elasticsearch Service y Google Cloud Dataflow. Estas bases de datos son fundamentales para aplicaciones que requieren análisis de datos a gran escala, aprendizaje automático e inteligencia artificial.",
        "const spark   require('apache-spark');\nconst sc   new spark.SparkContext('local[4]');\n\nconst rdd   sc.parallelize([1, 2, 3, 4, 5]);\nconst squares   rdd.map(x  > x * x);\nsquares.collect().then(result  > {\n  console.log(result);\n});\n\nsc.stop();",
         "Avanzado",
         
    );
    await addBlogItem   (
        "Bases de Datos en Memoria",
         "Las bases de datos en memoria son sistemas de gestión de bases de datos que almacenan y procesan los datos de forma completamente en memoria RAM, a diferencia de las bases de datos tradicionales que utilizan almacenamiento secundario.",
         "Almacenamiento",
        "bg-green-500",
         "Las bases de datos en memoria son sistemas de gestión de bases de datos que almacenan y procesan los datos de forma completamente en memoria RAM, a diferencia de las bases de datos tradicionales que utilizan almacenamiento secundario como discos duros o SSD. Al eliminar la latencia asociada con el acceso a disco, las bases de datos en memoria pueden ofrecer un rendimiento significativamente más alto, especialmente para aplicaciones que requieren respuestas en tiempo real, como sistemas de comercio electrónico, juegos en línea y análisis de datos. Ejemplos de bases de datos en memoria incluyen Redis, Apache Ignite y SAP HANA.",
        "const redis   require('redis');\nconst client   redis.createClient();\n\nclient.on('error', (err)  > {\n  console.error('Error de Redis:', err);\n});\n\nasync function storeData() {\n  await client.set('name', 'John Doe');\n  const name   await client.get('name');\n  console.log('Nombre:', name);\n}\n\nstoreData();\nclient.quit();",
         "Avanzado",
         
    );
    await addBlogItem   (
      "Lógica Condicional en Programación",
      "La lógica condicional es fundamental en la programación, permitiendo a los programas tomar decisiones y ejecutar diferentes acciones según ciertas condiciones.",
      "Lógica",
      "bg-blue-500",
      "La lógica condicional se basa en el uso de estructuras como IF-ELSE, SWITCH-CASE y operadores de comparación (>, <,   , ! , etc.) para controlar el flujo de ejecución de un programa. Estas estructuras permiten a los programadores crear código que se adapta a diferentes escenarios y toma decisiones en función de las entradas o estados del sistema.",
      "if (edad >  18) {\n  console.log('Eres mayor de edad');\n} else {\n  console.log('Eres menor de edad');\n}",
      "Intermedio",
      
    );
  
    await addBlogItem   (
      "Bucles y Ciclos en Programación",
      "Los bucles y ciclos son estructuras de control fundamentales en la programación, que permiten ejecutar un bloque de código de manera repetida.",
      "Lógica",
      "bg-orange-500",
      "Los bucles como FOR, WHILE y DO-WHILE son herramientas poderosas para repetir tareas, iterar sobre colecciones de datos y procesar grandes cantidades de información. Permiten a los programadores escribir código más conciso, eficiente y escalable. Entender y utilizar correctamente los bucles es esencial para la resolución de problemas complejos en programación.",
      "for (let i   0; i < 5; i++) {\n  console.log('Iteración', i);\n}",
      "Intermedio",
      
    );
  
    await addBlogItem   (
      "Algoritmos y Estructuras de Datos",
      "Los algoritmos y las estructuras de datos son conceptos clave en la programación, que permiten resolver problemas de manera eficiente y optimizada.",
      "Lógica",
      "bg-purple-500",
      "Los algoritmos son conjuntos de pasos bien definidos para resolver un problema, mientras que las estructuras de datos son formas de organizar y almacenar datos. Juntos, los algoritmos y las estructuras de datos son la base de la programación eficiente, permitiendo a los desarrolladores crear soluciones rápidas, escalables y robustas. Entender estos conceptos es fundamental para el diseño y la implementación de sistemas complejos.",
      "function fibonacci(n) {\n  if (n <  1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
      "Avanzado",
      
    );
  
    await addBlogItem   (
      "Programación Orientada a Objetos",
      "La programación orientada a objetos (POO) es un paradigma de programación que se basa en la creación de objetos que contienen datos (propiedades) y código (métodos).",
      "Lógica",
      "bg-red-500",
      "La POO permite a los desarrolladores crear código más modular, reutilizable y mantenible. Conceptos clave de la POO incluyen clases, objetos, herencia, polimorfismo y encapsulación. Entender estos conceptos es fundamental para diseñar y construir sistemas de software más complejos y escalables.",
      "class Persona {\n  constructor(nombre, edad) {\n    this.nombre   nombre;\n    this.edad   edad;\n  }\n\n  saludar() {\n    console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);\n  }\n}\n\nconst john   new Persona('John', 30);\njohn.saludar();",
      "Avanzado",
      
    );
  
    await addBlogItem   (
      "Programación Funcional",
      "La programación funcional es un paradigma de programación que se centra en el uso de funciones puras y la inmutabilidad de los datos.",
      "Lógica",
      "bg-yellow-500",
      "La programación funcional se basa en conceptos como funciones de orden superior, inmutabilidad, composición y recursión. Este enfoque permite a los desarrolladores escribir código más conciso, modular y fácil de razonar. La programación funcional es especialmente útil para problemas que requieren transformaciones de datos y cálculos complejos.",
      "const sumar   (a, b)  > a + b;\nconst doblar   (x)  > x * 2;\nconst resultado   doblar(sumar(2, 3));\nconsole.log(resultado); // 10",
      "Avanzado",
      
    );
  
    await addBlogItem   (
      "Patrones de Diseño en Programación",
      "Los patrones de diseño son soluciones probadas a problemas recurrentes en el diseño de software, que pueden ser aplicadas en diferentes contextos y lenguajes de programación.",
      "Lógica",
      "bg-teal-500",
      "Los patrones de diseño proporcionan un lenguaje común y estructuras de código reutilizables para resolver problemas de diseño comunes. Algunos patrones de diseño populares incluyen Singleton, Factory, Observer, Decorator y Adapter. Conocer y aplicar patrones de diseño ayuda a los desarrolladores a crear software más modular, escalable y mantenible.",
      "class Singleton {\n  static instance   null;\n\n  static getInstance() {\n    if (Singleton.instance     null) {\n      Singleton.instance   new Singleton();\n    }\n    return Singleton.instance;\n  }\n\n  private constructor() {}\n\n  // Métodos y propiedades\n}",
      "Avanzado",
      
    );

await addBlogItem(
    "Lenguaje Rust",
    "Rust es un lenguaje de programación de sistemas que ofrece seguridad en el manejo de memoria y concurrencia sin recolector de basura.",
    "Lenguajes de Programación",
    "bg-orange-500",
    "Rust se ha convertido en uno de los lenguajes más populares para desarrollo de sistemas y aplicaciones de alto rendimiento. Su sistema de ownership y borrowing garantiza la seguridad en el manejo de memoria sin sacrificar el rendimiento.",
    "fn main() { println!(\"Hello, Rust!\"); }",
    "Avanzado",
);

await addBlogItem(
    "Lenguaje Kotlin",
    "Kotlin es un lenguaje de programación moderno y expresivo que se ejecuta en la JVM y es totalmente interoperable con Java.",
    "Lenguajes de Programación",
    "bg-purple-500",
    "Kotlin ha ganado popularidad en el desarrollo de aplicaciones Android y backend. Ofrece características como null-safety, funciones de extensión y corrutinas para programación asíncrona.",
    "fun main() { println(\"Hello, Kotlin!\") }",
    "Intermedio",
);

await addBlogItem(
    "Lenguaje TypeScript",
    "TypeScript es un superconjunto tipado de JavaScript que compila a JavaScript puro, añadiendo opciones de tipado estático y otras características avanzadas.",
    "Lenguajes de Programación",
    "bg-blue-500",
    "TypeScript ha revolucionado el desarrollo web al proporcionar un sistema de tipos robusto para JavaScript. Facilita el desarrollo de aplicaciones grandes y complejas, mejorando la mantenibilidad y reduciendo errores.",
    "const greeting: string = \"Hello, TypeScript!\";",
    "Intermedio",
);

await addBlogItem(
    "Lenguaje Go",
    "Go es un lenguaje de programación concurrente y compilado desarrollado por Google, conocido por su simplicidad y eficiencia.",
    "Lenguajes de Programación",
    "bg-cyan-500",
    "Go se ha vuelto popular en el desarrollo de microservicios y aplicaciones de red. Su sistema de concurrencia basado en goroutines y canales facilita la escritura de programas altamente escalables.",
    "package main\n\nfunc main() { println(\"Hello, Go!\") }",
    "Intermedio",
);

await addBlogItem(
    "Lenguaje Julia",
    "Julia es un lenguaje de programación de alto nivel diseñado para computación científica y numérica de alto rendimiento.",
    "Lenguajes de Programación",
    "bg-green-500",
    "Julia combina la facilidad de uso de Python con el rendimiento de C. Es cada vez más utilizado en campos como la inteligencia artificial, el aprendizaje automático y la simulación científica.",
    "println(\"Hello, Julia!\")",
    "Avanzado",
);



await addBlogItem(
    "Principio SOLID",
    "SOLID es un acrónimo que representa cinco principios básicos de diseño de software orientado a objetos.",
    "Buenas Prácticas de Programación",
    "bg-gray-500",
    "Los principios SOLID (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) promueven un diseño de software más mantenible y escalable.",
    "",
    "Avanzado",
);

await addBlogItem(
    "Clean Code",
    "Clean Code se refiere a escribir código que sea fácil de entender, mantener y modificar.",
    "Buenas Prácticas de Programación",
    "bg-lime-500",
    "Prácticas como nombrar variables y funciones de manera descriptiva, mantener funciones pequeñas y evitar la duplicación de código contribuyen a un código más limpio y mantenible.",
    "",
    "Intermedio",
);

await addBlogItem(
    "Programación Funcional",
    "La programación funcional es un paradigma que trata la computación como la evaluación de funciones matemáticas y evita el cambio de estado y los datos mutables.",
    "Buenas Prácticas de Programación",
    "bg-amber-500",
    "Adoptar principios de programación funcional como la inmutabilidad y las funciones puras puede llevar a código más predecible y fácil de probar.",
    "",
    "Avanzado",
);

await addBlogItem(
    "Control de Versiones",
    "El control de versiones es la práctica de rastrear y gestionar cambios en el código fuente a lo largo del tiempo.",
    "Buenas Prácticas de Programación",
    "bg-emerald-500",
    "Utilizar sistemas de control de versiones como Git permite colaborar eficientemente, revertir cambios y mantener un historial completo del desarrollo del proyecto.",
    "",
    "Básico",
);

await addBlogItem(
    "Revisión de Código",
    "La revisión de código es la práctica de examinar sistemáticamente el código fuente de un compañero para detectar errores y mejorar la calidad.",
    "Buenas Prácticas de Programación",
    "bg-sky-500",
    "Las revisiones de código regulares ayudan a mantener la calidad del código, compartir conocimientos entre el equipo y detectar problemas temprano en el proceso de desarrollo.",
    "",
    "Intermedio",
);

await addBlogItem(
    "Pruebas Unitarias",
    "Las pruebas unitarias son una práctica de testing que verifica el funcionamiento correcto de unidades individuales de código.",
    "Ingeniería de Software",
    "bg-red-500",
    "Las pruebas unitarias son fundamentales para asegurar la calidad del software. Permiten detectar errores temprano, facilitan los refactors y sirven como documentación viva del comportamiento esperado del código.",
    "function test() { assert(suma(2, 2) === 4); }",
    "Intermedio",
);

await addBlogItem(
    "Documentación de Código",
    "La documentación de código es el proceso de explicar el propósito, funcionamiento y uso del software a través de comentarios y documentos.",
    "Ingeniería de Software",
    "bg-yellow-500",
    "Una buena documentación mejora la mantenibilidad del código, facilita la incorporación de nuevos desarrolladores y ayuda a los usuarios a entender cómo usar el software correctamente.",
    "/** \n * Suma dos números\n * @param {number} a - Primer número\n * @param {number} b - Segundo número\n * @returns {number} La suma de a y b\n */",
    "Básico",
);

await addBlogItem(
    "Arquitectura de Microservicios",
    "La arquitectura de microservicios es un enfoque para desarrollar una aplicación como un conjunto de pequeños servicios independientes.",
    "Ingeniería de Software",
    "bg-indigo-500",
    "Los microservicios permiten desarrollar, desplegar y escalar componentes de forma independiente, mejorando la flexibilidad y la resilencia de las aplicaciones.",
    "",
    "Avanzado",
);

await addBlogItem(
    "DevOps y CI/CD",
    "DevOps es una cultura que combina desarrollo y operaciones, mientras que CI/CD automatiza la integración y el despliegue de código.",
    "Ingeniería de Software",
    "bg-pink-500",
    "La adopción de prácticas DevOps y pipelines de CI/CD acelera el ciclo de desarrollo, mejora la calidad del software y facilita las entregas continuas.",
    "",
    "Intermedio",
);

await addBlogItem(
    "Infraestructura como Código (IaC)",
    "IaC es la práctica de gestionar y aprovisionar infraestructura a través de archivos de configuración en lugar de configuración manual.",
    "Ingeniería de Software",
    "bg-teal-500",
    "Herramientas como Terraform y Ansible permiten definir infraestructura como código, facilitando la reproducibilidad y el control de versiones de la infraestructura.",
    "",
    "Avanzado",
);


    console.log("Blog items initialization complete.");
}

async function loadBlogItems() {
    const querySnapshot = await getDocs(collection(db, "blog"));
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos elementos

    querySnapshot.forEach((doc) => {
        const blogItem = doc.data();
        const card = createBlogCard(doc.id, blogItem);
        blogContainer.appendChild(card);
    });
}

function createBlogCard(id, blogItem) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 card project-card';

    const cardContent = `
        <div class="icon-container ${blogItem.colorClass}">
            <i class="${blogItem.iconClass}"></i>
        </div>
        <div class="card-body">
            <h5 class="card-title">${blogItem.title}</h5>
            <p class="card-text">${blogItem.shortDescription}</p>
            <p><strong>Categoría:</strong> ${blogItem.category}</p>
            <a href="bloccontenido.html?id=${id}" class="btn btn-primary">Leer más</a>
        </div>
    `;

    card.innerHTML = cardContent;
    return card;
}

window.onload = async function() {
    console.log("Window loaded");
    await initializeBlogItems();
    console.log("Blog items initialized");
    await loadBlogItems();
    console.log("Blog items loaded");
};



// renderizar el blog en bloccontenido.html
async function renderBlogContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        try {
            const docRef = doc(db, "blog", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const blogData = docSnap.data();
                document.getElementById('blog-title').textContent = blogData.title;
                document.getElementById('blog-category').textContent = blogData.category;
                document.getElementById('blog-difficulty').textContent = blogData.difficulty;
                 document.getElementById('blog-longDescription').textContent = blogData.longDescription;
                 document.getElementById('blog-example').textContent = blogData.example;
      
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    }
}


if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    window.onload = loadBlogItems;
} else if (window.location.pathname.endsWith('bloccontenido.html')) {
    window.onload = renderBlogContent;
}
