import { app } from './firebase.js';
import { getFirestore, collection, doc, setDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

const db = getFirestore(app);

const problems = [
  {id: "hola-mundo",
    title: "Hola Mundo",
    difficulty: "Fácil",
    category: "Básico",
    order: 1,
    descripcion: "Escribe un programa que imprima 'Hola Mundo' en la consola.",
    example: "Salida esperada: Hola Mundo",
    restriction: "Ninguna",
    salida: "Hola Mundo"
  }, {
    id: "suma-dos-numeros",
    title: "Suma de Dos Números",
    difficulty: "Fácil",
    category: "Aritmética",
    order: 2,
    descripcion: "Escribe una función que tome dos números como entrada y devuelva su suma.",
    example: "Entrada: 3, 5\nSalida esperada: 8",
    restriction: "Los números de entrada serán enteros.",
    salida: 8
  },
  {
    id: "fibonacci",
    title: "Número de Fibonacci",
    difficulty: "Media",
    category: "Secuencias",
    order: 3,
    descripcion: "Escribe una función que devuelva el n-ésimo número de la secuencia de Fibonacci.",
    example: "Entrada: 6\nSalida esperada: 8 (La secuencia es 0, 1, 1, 2, 3, 5, 8, ...)",
    restriction: "n será un entero positivo.",
    salida: 8
  },
  {
    id: "palindromo",
    title: "Verificar Palíndromo",
    difficulty: "Media",
    category: "Strings",
    order: 4,
    descripcion: "Escribe una función que determine si una palabra dada es un palíndromo (se lee igual de izquierda a derecha y de derecha a izquierda).",
    example: "Entrada: 'radar'\nSalida esperada: true",
    restriction: "Ignorar mayúsculas y minúsculas.",
    salida: true
  },
  {
    id: "factorial",
    title: "Cálculo de Factorial",
    difficulty: "Media",
    category: "Matemáticas",
    order: 5,
    descripcion: "Escribe una función que calcule el factorial de un número dado.",
    example: "Entrada: 5\nSalida esperada: 120 (5! = 5 * 4 * 3 * 2 * 1 = 120)",
    restriction: "El número de entrada será un entero no negativo.",
    salida: 120
  },
  {
    id: "contar-vocales",
    title: "Contar Vocales",
    difficulty: "Fácil",
    category: "Strings",
    order: 6,
    descripcion: "Escribe una función que cuente el número de vocales en una cadena dada.",
    example: "Entrada: 'Hello World'\nSalida esperada: 3",
    restriction: "Considerar tanto mayúsculas como minúsculas.",
    salida: 3
  },
  {
    id: "numero-primo",
    title: "Verificar Número Primo",
    difficulty: "Media",
    category: "Matemáticas",
    order: 7,
    descripcion: "Escribe una función que determine si un número dado es primo.",
    example: "Entrada: 17\nSalida esperada: true",
    restriction: "El número de entrada será un entero positivo.",
    salida: true
  },
  {
    id: "invertir-array",
    title: "Invertir Array",
    difficulty: "Fácil",
    category: "Array",
    order: 8,
    descripcion: "Escribe una función que invierta el orden de los elementos en un array.",
    example: "Entrada: [1, 2, 3, 4, 5]\nSalida esperada: [5, 4, 3, 2, 1]",
    restriction: "No usar métodos incorporados de inversión de arrays.",
    salida: [5, 4, 3, 2, 1]
  },
  {
    id: "suma-digitos",
    title: "Suma de Dígitos",
    difficulty: "Fácil",
    category: "Matemáticas",
    order: 9,
    descripcion: "Escribe una función que sume todos los dígitos de un número dado.",
    example: "Entrada: 12345\nSalida esperada: 15 (1 + 2 + 3 + 4 + 5)",
    restriction: "El número de entrada será un entero positivo.",
    salida: 15
  },
  {
    id: "ordenar-array",
    title: "Ordenar Array",
    difficulty: "Difícil",
    category: "Array",
    order: 10,
    descripcion: "Implementa el algoritmo de ordenamiento quicksort para ordenar un array de números.",
    example: "Entrada: [64, 34, 25, 12, 22, 11, 90]\nSalida esperada: [11, 12, 22, 25, 34, 64, 90]",
    restriction: "No usar métodos de ordenamiento incorporados.",
    salida: [11, 12, 22, 25, 34, 64, 90]
  }, 

    {
      id: "fizz-buzz",
      title: "FizzBuzz",
      difficulty: "Fácil",
      category: "Lógica",
      order: 11,
      descripcion: "Escribe un programa que imprima los números del 1 al 100. Pero para múltiplos de 3, imprime 'Fizz' en lugar del número, y para múltiplos de 5, imprime 'Buzz'. Para números que son múltiplos de ambos 3 y 5, imprime 'FizzBuzz'.",
      example: "Salida esperada:\n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n...",
      restriction: "Usar un bucle para generar números del 1 al 100.",
      salida: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16"
    },
    {
      id: "anagrama",
      title: "Verificar Anagrama",
      difficulty: "Media",
      category: "Strings",
      order: 12,
      descripcion: "Escribe una función que determine si dos cadenas son anagramas entre sí. Un anagrama es una palabra o frase formada reorganizando las letras de otra palabra o frase, usando todas las letras originales exactamente una vez.",
      example: "Entrada: 'listen', 'silent'\nSalida esperada: true\n\nEntrada: 'hello', 'world'\nSalida esperada: false",
      restriction: "Ignorar espacios y considerar mayúsculas y minúsculas como iguales.",
      salida: true
    },
    {
      id: "balanceo-parentesis",
      title: "Balanceo de Paréntesis",
      difficulty: "Media",
      category: "Pilas",
      order: 13,
      descripcion: "Escribe una función que determine si una cadena de paréntesis, corchetes y llaves está balanceada. Es decir, cada paréntesis/corchete/llave de apertura debe tener su correspondiente cierre en el orden correcto.",
      example: "Entrada: '({[]})'\nSalida esperada: true\n\nEntrada: '([)]'\nSalida esperada: false\n\nEntrada: '(([]){}())'\nSalida esperada: true",
      restriction: "Usar una estructura de pila para resolver el problema.",
      salida: true
    },
    {
      id: "busqueda-binaria",
      title: "Búsqueda Binaria",
      difficulty: "Media",
      category: "Búsqueda",
      order: 14,
      descripcion: "Implementa el algoritmo de búsqueda binaria. La función debe tomar un array ordenado y un elemento objetivo, y devolver el índice del elemento si se encuentra, o -1 si no está presente.",
      example: "Entrada: array = [1, 3, 5, 7, 9, 11, 13, 15], objetivo = 7\nSalida esperada: 3\n\nEntrada: array = [1, 3, 5, 7, 9, 11, 13, 15], objetivo = 8\nSalida esperada: -1",
      restriction: "El array de entrada estará ordenado en orden ascendente.",
      salida: 3
    },
    {
      id: "subcadena-palindromica",
      title: "Subcadena Palindrómica más Larga",
      difficulty: "Difícil",
      category: "Strings",
      order: 15,
      descripcion: "Escribe una función que encuentre la subcadena palindrómica más larga en una cadena dada. Un palíndromo es una secuencia que se lee igual hacia adelante y hacia atrás.",
      example: "Entrada: 'babad'\nSalida esperada: 'bab' o 'aba'\n\nEntrada: 'cbbd'\nSalida esperada: 'bb'",
      restriction: "La longitud de la cadena de entrada no excederá los 1000 caracteres.",
      salida: "bab"
    },
    {
      id: "merge-sort",
      title: "Merge Sort",
      difficulty: "Difícil",
      category: "Ordenamiento",
      order: 16,
      descripcion: "Implementa el algoritmo de ordenamiento Merge Sort. Este algoritmo divide el array en mitades, ordena recursivamente cada mitad y luego combina las mitades ordenadas.",
      example: "Entrada: [38, 27, 43, 3, 9, 82, 10]\nSalida esperada: [3, 9, 10, 27, 38, 43, 82]",
      restriction: "No usar métodos de ordenamiento incorporados.",
      salida: [3, 9, 10, 27, 38, 43, 82]
    },
    {
      id: "suma-subarray",
      title: "Suma Máxima de Subarray",
      difficulty: "Media",
      category: "Array",
      order: 17,
      descripcion: "Dado un array de enteros, encuentra el subarray contiguo (conteniendo al menos un número) que tiene la suma más grande y devuelve esa suma.",
      example: "Entrada: [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nSalida esperada: 6\nExplicación: El subarray [4, -1, 2, 1] tiene la suma más grande, que es 6.",
      restriction: "Implementar en tiempo O(n) y espacio O(1).",
      salida: 6
    },
    {
      id: "torres-hanoi",
      title: "Torres de Hanoi",
      difficulty: "Difícil",
      category: "Recursión",
      order: 18,
      descripcion: "Implementa una solución para el problema de las Torres de Hanoi. Dada la cantidad de discos, imprime los movimientos necesarios para mover todos los discos de la torre A a la torre C usando la torre B como auxiliar.",
      example: "Entrada: 3 discos\nSalida esperada:\nMover disco 1 de A a C\nMover disco 2 de A a B\nMover disco 1 de C a B\nMover disco 3 de A a C\nMover disco 1 de B a A\nMover disco 2 de B a C\nMover disco 1 de A a C",
      restriction: "Usar recursión para resolver el problema.",
      salida: "Mover disco 1 de A a C\nMover disco 2 de A a B\nMover disco 1 de C a B\nMover disco 3 de A a C\nMover disco 1 de B a A\nMover disco 2 de B a C\nMover disco 1 de A a C"
    },
    {
      id: "lista-enlazada-ciclo",
      title: "Detectar Ciclo en Lista Enlazada",
      difficulty: "Media",
      category: "Listas Enlazadas",
      order: 19,
      descripcion: "Escribe una función que detecte si una lista enlazada tiene un ciclo. Un ciclo en una lista enlazada ocurre cuando un nodo en la lista apunta a un nodo previo, formando un bucle.",
      example: "Entrada: Lista: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (el mismo nodo 2 de antes)\nSalida esperada: true\n\nEntrada: Lista: 1 -> 2 -> 3 -> 4 -> 5 -> null\nSalida esperada: false",
      restriction: "Usar el algoritmo de Floyd (tortuga y liebre) para detectar el ciclo.",
      salida: true
    },
    {
      id: "numero-romano",
      title: "Convertir a Número Romano",
      difficulty: "Media",
      category: "Matemáticas",
      order: 20,
      descripcion: "Escribe una función que convierta un número entero en su representación en números romanos. Los números romanos se representan con siete símbolos diferentes: I, V, X, L, C, D y M.",
      example: "Entrada: 1994\nSalida esperada: 'MCMXCIV'\nExplicación: M = 1000, CM = 900, XC = 90 y IV = 4.\n\nEntrada: 58\nSalida esperada: 'LVIII'\nExplicación: L = 50, V = 5, III = 3.",
      restriction: "El número de entrada estará entre 1 y 3999.",
      salida: "MCMXCIV"
    },
    {
      id: "palabra-mas-larga",
      title: "Palabra Más Larga sin Repetir Caracteres",
      difficulty: "Media",
      category: "Strings",
      order: 21,
      descripcion: "Dada una cadena, encuentra la longitud de la subcadena más larga sin repetir caracteres.",
      example: "Entrada: 'abcabcbb'\nSalida esperada: 3\nExplicación: La respuesta es 'abc', con una longitud de 3.\n\nEntrada: 'bbbbb'\nSalida esperada: 1\nExplicación: La respuesta es 'b', con una longitud de 1.",
      restriction: "Considerar todos los caracteres (incluyendo símbolos y espacios).",
      salida: 3
    },
    {
      id: "suma-dos-numeros-ll",
      title: "Suma de Dos Números (Listas Enlazadas)",
      difficulty: "Media",
      category: "Listas Enlazadas",
      order: 22,
      descripcion: "Se te dan dos números no negativos representados como listas enlazadas, donde cada nodo contiene un solo dígito. Los dígitos están almacenados en orden inverso, es decir, el dígito menos significativo está en la cabeza de la lista. Escribe una función que sume los dos números y devuelva la suma como una lista enlazada.",
      example: "Entrada: (2 -> 4 -> 3) + (5 -> 6 -> 4)\nSalida esperada: 7 -> 0 -> 8\nExplicación: 342 + 465 = 807.",
      restriction: "No puedes modificar las listas de entrada. Debes crear una nueva lista para el resultado.",
      salida: "7 -> 0 -> 8"
    },
    {
      id: "caminos-unicos",
      title: "Caminos Únicos en una Cuadrícula",
      difficulty: "Media",
      category: "Programación Dinámica",
      order: 23,
      descripcion: "Dada una cuadrícula de m x n, un robot está ubicado en la esquina superior izquierda. El robot solo puede moverse hacia abajo o hacia la derecha en cualquier momento. El robot está tratando de llegar a la esquina inferior derecha. ¿Cuántos caminos únicos posibles hay?",
      example: "Entrada: m = 3, n = 7\nSalida esperada: 28\n\nEntrada: m = 3, n = 2\nSalida esperada: 3\nExplicación: De la esquina superior izquierda, hay tres formas de llegar a la esquina inferior derecha:\n1. Derecha -> Derecha -> Abajo\n2. Derecha -> Abajo -> Derecha\n3. Abajo -> Derecha -> Derecha",
      restriction: "1 ≤ m, n ≤ 100. Resuelve usando programación dinámica.",
      salida: 28
    },
    {
      id: "arbol-binario-equilibrado",
      title: "Verificar Árbol Binario Equilibrado",
      difficulty: "Media",
      category: "Árboles",
      order: 24,
      descripcion: "Dado un árbol binario, determina si está equilibrado. Un árbol binario equilibrado es un árbol en el que las alturas de los subárboles izquierdo y derecho de cada nodo nunca difieren en más de uno.",
      example: "Entrada:\n    3\n   / \\\n  9  20\n    /  \\\n   15   7\nSalida esperada: true\n\nEntrada:\n       1\n      / \\\n     2   2\n    /\n   3\n  /\n 4\nSalida esperada: false",
      restriction: "La solución debe tener una complejidad temporal de O(n), donde n es el número de nodos en el árbol.",
      salida: true
    },
    {
      id: "mediana-dos-arrays",
      title: "Mediana de Dos Arrays Ordenados",
      difficulty: "Difícil",
      category: "Arrays",
      order: 25,
      descripcion: "Dados dos arrays ordenados nums1 y nums2 de tamaño m y n respectivamente, devuelve la mediana de los dos arrays ordenados. La complejidad de tiempo general debería ser O(log(m+n)).",
      example: "Entrada: nums1 = [1,3], nums2 = [2]\nSalida esperada: 2.00000\nExplicación: El array combinado sería [1,2,3] y la mediana es 2.\n\nEntrada: nums1 = [1,2], nums2 = [3,4]\nSalida esperada: 2.50000\nExplicación: El array combinado sería [1,2,3,4] y la mediana es (2 + 3) / 2 = 2.5.",
      restriction: "nums1.length == m, nums2.length == n, 0 ≤ m ≤ 1000, 0 ≤ n ≤ 1000, 1 ≤ m + n ≤ 2000",
      salida: 2.0
    },
    {
      id: "subconjuntos",
      title: "Generar Todos los Subconjuntos",
      difficulty: "Media",
      category: "Backtracking",
      order: 26,
      descripcion: "Dado un conjunto de números distintos, devuelve todos los posibles subconjuntos (el conjunto potencia). El conjunto solución no debe contener subconjuntos duplicados.",
      example: "Entrada: nums = [1,2,3]\nSalida esperada: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]\n\nEntrada: nums = [0]\nSalida esperada: [[],[0]]",
      restriction: "1 ≤ nums.length ≤ 10, -10 ≤ nums[i] ≤ 10, Todos los números de nums son únicos.",
      salida: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]"
    },
    {
      id: "lcs",
      title: "Subsecuencia Común Más Larga",
      difficulty: "Media",
      category: "Programación Dinámica",
      order: 27,
      descripcion: "Dadas dos cadenas text1 y text2, devuelve la longitud de su subsecuencia común más larga. Una subsecuencia de una cadena es una nueva cadena generada a partir de la cadena original con algunos caracteres (pueden ser ninguno) eliminados sin cambiar el orden relativo de los caracteres restantes.",
      example: "Entrada: text1 = 'abcde', text2 = 'ace'\nSalida esperada: 3\nExplicación: La subsecuencia común más larga es 'ace' y su longitud es 3.\n\nEntrada: text1 = 'abc', text2 = 'abc'\nSalida esperada: 3\nExplicación: La subsecuencia común más larga es 'abc' y su longitud es 3.",
      restriction: "1 ≤ text1.length, text2.length ≤ 1000, text1 y text2 consisten de caracteres en minúscula solamente.",
      salida: 3
    },
    {
      id: "trapping-rain-water",
      title: "Atrapar Agua de Lluvia",
      difficulty: "Difícil",
      category: "Arrays",
      order: 28,
      descripcion: "Dada una matriz de n enteros no negativos que representan un mapa de elevación donde el ancho de cada barra es 1, calcula cuánta agua puede atrapar después de llover.",
      example: "Entrada: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nSalida esperada: 6\nExplicación: El mapa de elevación anterior (sección negra) puede atrapar 6 unidades de agua de lluvia (sección azul).\n\nEntrada: height = [4,2,0,3,2,5]\nSalida esperada: 9",
      restriction: "n == height.length, 1 ≤ n ≤ 2 * 10^4, 0 ≤ height[i] ≤ 10^5",
      salida: 6
    },
    {
      id: "rotacion-matriz",
      title: "Rotación de Matriz",
      difficulty: "Media",
      category: "Matrices",
      order: 29,
      descripcion: "Dada una matriz 2D de tamaño n x n, rota la matriz 90 grados en sentido horario.",
      example: "Entrada:\n[\n  [1,2,3],\n  [4,5,6],\n  [7,8,9]\n]\nSalida esperada:\n[\n  [7,4,1],\n  [8,5,2],\n  [9,6,3]\n]\n\nEntrada:\n[\n  [ 5, 1, 9,11],\n  [ 2, 4, 8,10],\n  [13, 3, 6, 7],\n  [15,14,12,16]\n]\nSalida esperada:\n[\n  [15,13, 2, 5],\n  [14, 3, 4, 1],\n  [12, 6, 8, 9],\n  [16, 7,10,11]\n]",
      restriction: "n == matrix.length == matrix[i].length, 1 ≤ n ≤ 20, -1000 ≤ matrix[i][j] ≤ 1000",
      salida: "[[7,4,1],[8,5,2],[9,6,3]]"
    },
    {
      id: "validar-bst",
      title: "Validar Árbol Binario de Búsqueda",
      difficulty: "Media",
      category: "Árboles",
      order: 30,
      descripcion: "Dado un árbol binario, determina si es un árbol binario de búsqueda (BST) válido. Un BST válido se define de la siguiente manera: El subárbol izquierdo de un nodo contiene solo nodos con claves menores que la clave del nodo. El subárbol derecho de un nodo contiene solo nodos con claves mayores que la clave del nodo. Tanto el subárbol izquierdo como el derecho también deben ser árboles binarios de búsqueda.",
      example: "Entrada:\n    2\n   / \\\n  1   3\nSalida esperada: true\n\nEntrada:\n    5\n   / \\\n  1   4\n     / \\\n    3   6\nSalida esperada: false\nExplicación: El valor 4 es mayor que el valor raíz 5.",
      restriction: "El número de nodos en el árbol está en el rango [1, 10^4]. -2^31 <= Node.val <= 2^31 - 1",
      salida: true
    },

    {
      id: "suma-numeros",
      title: "Suma de dos números",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 31,
      descripcion: "Escribe una función que tome dos números como entrada y devuelva su suma.",
      example: "Entrada: 5, 3\nSalida esperada: 8",
      restriction: "Los números de entrada serán enteros.",
      salida: 8
    },
    {
      id: "par-impar",
      title: "Determinar si un número es par o impar",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 32,
      descripcion: "Crea una función que determine si un número dado es par o impar.",
      example: "Entrada: 4\nSalida esperada: 'Par'\n\nEntrada: 7\nSalida esperada: 'Impar'",
      restriction: "El número de entrada será un entero positivo.",
      salida: "Par"
    },
    {
      id: "invertir-cadena",
      title: "Invertir una cadena",
      difficulty: "Fácil",
      category: "Strings",
      order: 33,
      descripcion: "Escribe una función que invierta una cadena dada.",
      example: "Entrada: 'Hola'\nSalida esperada: 'aloH'",
      restriction: "No uses funciones incorporadas de inversión de cadenas.",
      salida: "aloH"
    },
    {
      id: "factorial",
      title: "Calcular factorial",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 34,
      descripcion: "Implementa una función que calcule el factorial de un número dado.",
      example: "Entrada: 5\nSalida esperada: 120\nExplicación: 5! = 5 * 4 * 3 * 2 * 1 = 120",
      restriction: "El número de entrada será un entero no negativo.",
      salida: 120
    },
    {
      id: "contar-vocales",
      title: "Contar vocales",
      difficulty: "Fácil",
      category: "Strings",
      order: 35,
      descripcion: "Escribe una función que cuente el número de vocales en una cadena dada.",
      example: "Entrada: 'Programming'\nSalida esperada: 3",
      restriction: "Considera solo las vocales a, e, i, o, u (mayúsculas y minúsculas).",
      salida: 3
    },
    {
      id: "suma-array",
      title: "Suma de elementos de un array",
      difficulty: "Fácil",
      category: "Arrays",
      order: 36,
      descripcion: "Crea una función que sume todos los elementos de un array de números.",
      example: "Entrada: [1, 2, 3, 4, 5]\nSalida esperada: 15",
      restriction: "El array contendrá solo números enteros.",
      salida: 15
    },
    {
      id: "maximo-array",
      title: "Encontrar el máximo en un array",
      difficulty: "Fácil",
      category: "Arrays",
      order: 37,
      descripcion: "Implementa una función que encuentre el número más grande en un array de números.",
      example: "Entrada: [10, 5, 8, 12, 3]\nSalida esperada: 12",
      restriction: "No usar funciones de máximo incorporadas.",
      salida: 12
    },
    {
      id: "palindromo",
      title: "Verificar palíndromo",
      difficulty: "Fácil",
      category: "Strings",
      order: 38,
      descripcion: "Escribe una función que determine si una palabra o frase es un palíndromo.",
      example: "Entrada: 'racecar'\nSalida esperada: true\n\nEntrada: 'hello'\nSalida esperada: false",
      restriction: "Ignorar espacios y considerar solo caracteres alfanuméricos.",
      salida: true
    },
    {
      id: "fibonacci",
      title: "Secuencia de Fibonacci",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 39,
      descripcion: "Genera los primeros n números de la secuencia de Fibonacci.",
      example: "Entrada: 5\nSalida esperada: [0, 1, 1, 2, 3]",
      restriction: "n será un entero positivo.",
      salida: [0, 1, 1, 2, 3]
    },
    {
      id: "celsius-fahrenheit",
      title: "Convertir Celsius a Fahrenheit",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 40,
      descripcion: "Crea una función que convierta una temperatura de Celsius a Fahrenheit.",
      example: "Entrada: 25\nSalida esperada: 77\nExplicación: (25°C × 9/5) + 32 = 77°F",
      restriction: "La temperatura de entrada será un número decimal.",
      salida: 77
    },
    {
      id: "multiplicar-sin-operador",
      title: "Multiplicar sin usar ",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 41,
      descripcion: "Implementa una función que multiplique dos números enteros positivos sin usar el operador de multiplicación ().",
      example: "Entrada: 4, 5\nSalida esperada: 20",
      restriction: "No puedes usar el operador de multiplicación (*) ni ninguna función de multiplicación incorporada.",
      salida: 20
      },
    {
      id: "promedio-array",
      title: "Calcular promedio",
      difficulty: "Fácil",
      category: "Arrays",
      order: 42,
      descripcion: "Implementa una función que calcule el promedio de un array de números.",
      example: "Entrada: [1, 2, 3, 4, 5]\nSalida esperada: 3",
      restriction: "El array no estará vacío.",
      salida: 3
    },
    {
      id: "area-circulo",
      title: "Calcular área de un círculo",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 43,
      descripcion: "Crea una función que calcule el área de un círculo dado su radio.",
      example: "Entrada: 5\nSalida esperada: 78.54\nExplicación: Área = π * r^2 ≈ 3.14159 * 5^2 ≈ 78.54",
      restriction: "Usa 3.14159 como valor de π. Redondea el resultado a dos decimales.",
      salida: 78.54
    },
    {
      id: "eliminar-duplicados",
      title: "Eliminar duplicados de un array",
      difficulty: "Fácil",
      category: "Arrays",
      order: 44,
      descripcion: "Escribe una función que elimine los elementos duplicados de un array.",
      example: "Entrada: [1, 2, 2, 3, 4, 4, 5]\nSalida esperada: [1, 2, 3, 4, 5]",
      restriction: "Mantén el orden original de los elementos.",
      salida: [1, 2, 3, 4, 5]
    },
    {
      id: "capitalizar",
      title: "Capitalizar palabras",
      difficulty: "Fácil",
      category: "Strings",
      order: 45,
      descripcion: "Implementa una función que capitalice la primera letra de cada palabra en una frase.",
      example: "Entrada: 'hola mundo'\nSalida esperada: 'Hola Mundo'",
      restriction: "Las palabras están separadas por un solo espacio.",
      salida: "Hola Mundo"
    },
    {
      id: "numero-primo",
      title: "Verificar número primo",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 46,
      descripcion: "Crea una función que determine si un número dado es primo.",
      example: "Entrada: 7\nSalida esperada: true\n\nEntrada: 12\nSalida esperada: false",
      restriction: "El número de entrada será un entero positivo mayor que 1.",
      salida: true
    },
    {
      id: "potencia",
      title: "Calcular potencia",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 47,
      descripcion: "Escribe una función que calcule x elevado a la n-ésima potencia.",
      example: "Entrada: x = 2, n = 3\nSalida esperada: 8\nExplicación: 2^3 = 2 * 2 * 2 = 8",
      restriction: "No uses el operador de potencia incorporado.",
      salida: 8
    },
    {
      id: "interseccion-arrays",
      title: "Intersección de arrays",
      difficulty: "Fácil",
      category: "Arrays",
      order: 48,
      descripcion: "Implementa una función que encuentre la intersección de dos arrays.",
      example: "Entrada: arr1 = [1, 2, 3, 4, 5], arr2 = [4, 5, 6, 7, 8]\nSalida esperada: [4, 5]",
      restriction: "Los arrays de entrada pueden contener duplicados.",
      salida: [4, 5]
    },
    {
      id: "contar-caracteres",
      title: "Contar ocurrencias de caracteres",
      difficulty: "Fácil",
      category: "Strings",
      order: 49,
      descripcion: "Crea una función que cuente cuántas veces aparece cada carácter en una cadena.",
      example: "Entrada: 'hello'\nSalida esperada: {'h': 1, 'e': 1, 'l': 2, 'o': 1}",
      restriction: "La cadena contendrá solo caracteres en minúsculas.",
      salida: {"h": 1, "e": 1, "l": 2, "o": 1}
    },
    {
      id: "factorial",
      title: "Calcular factorial",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 50,
      descripcion: "Implementa una función que calcule el factorial de un número dado.",
      example: "Entrada: 5\nSalida esperada: 120\nExplicación: 5! = 5 * 4 * 3 * 2 * 1 = 120",
      restriction: "El número de entrada será un entero no negativo.",
      salida: 120
      },
      {
      id: "suma-pares",
      title: "Suma de números pares",
      difficulty: "Fácil",
      category: "Arrays",
      order: 51,
      descripcion: "Escribe una función que sume todos los números pares de un array.",
      example: "Entrada: [1, 2, 3, 4, 5, 6]\nSalida esperada: 12\nExplicación: 2 + 4 + 6 = 12",
      restriction: "El array contendrá solo números enteros positivos.",
      salida: 12
      },
      {
      id: "max-min",
      title: "Diferencia máximo-mínimo",
      difficulty: "Fácil",
      category: "Arrays",
      order: 52,
      descripcion: "Crea una función que calcule la diferencia entre el valor máximo y mínimo en un array.",
      example: "Entrada: [10, 4, 1, 4, -10, -50, 32, 21]\nSalida esperada: 82\nExplicación: 32 - (-50) = 82",
      restriction: "El array contendrá al menos dos números.",
      salida: 82
      },
      {
      id: "longitud-ultima-palabra",
      title: "Longitud de la última palabra",
      difficulty: "Fácil",
      category: "Strings",
      order: 53,
      descripcion: "Implementa una función que devuelva la longitud de la última palabra en una frase.",
      example: "Entrada: 'Hola mundo cruel'\nSalida esperada: 5",
      restriction: "Las palabras están separadas por uno o más espacios.",
      salida: 5
      },
      {
      id: "suma-digitos-pares",
      title: "Suma de dígitos pares",
      difficulty: "Fácil",
      category: "Matemáticas",
      order: 64,
      descripcion: "Escribe una función que sume los dígitos pares de un número dado.",
      example: "Entrada: 2468\nSalida esperada: 20\nExplicación: 2 + 4 + 6 + 8 = 20",
      restriction: "El número de entrada será un entero positivo.",
      salida: 20
      }

  // agregar mas
];

// cargar problemas
async function loadProblems() {
  const problemsRef = collection(db, 'problemas');
  for (const problem of problems) {
    await setDoc(doc(problemsRef, problem.id), problem);
  }
  console.log('Problemas cargados en Firestore');
}

// llenar la tabla, obtener oroblemas
async function getProblems() {
  const problemsRef = collection(db, 'problemas');
  const problemsSnapshot = await getDocs(problemsRef);
  const tableBody = document.getElementById('table-body');

  problemsSnapshot.forEach((doc) => {
    const problemData = doc.data();
    const row = document.createElement('tr');

    let difficultyClass = '';
    

    switch(problemData.difficulty) {
      case 'Fácil':
            difficultyClass = 'easy';
            break;
        case 'Medio':
            difficultyClass = 'medium';
            break;
        case 'Difícil':
            difficultyClass = 'difficult';
            break;
        default:
            difficultyClass = 'unknown';
    }
    const problemDifficultyElement = document.getElementById('problem-difficulty');
     // Agrega un id a cada fila
     row.id = problemData.id;

  /* aca oorque no configure nada 
  <td class="status">
       // <div class="status-indicator not-completed" data-status="not-started"></div>
      </td>*/
      
    row.innerHTML = `
    
    <td><a href="test1.html?id=${problemData.id}">${problemData.title}</a></td>
      <td class="quiz-name easy">${problemData.difficulty}</td>
    `;

    tableBody.appendChild(row);
  });
}

// llama a cargar oroblemas
loadProblems();

// Obtener los problemas 
getProblems();

document.addEventListener('DOMContentLoaded', (event) => {
  /*const statusIndicators = document.querySelectorAll('.status-indicator');

  statusIndicators.forEach(indicator => {
    indicator.classList.add('not-completed');
    indicator.addEventListener('click', function() {
      this.classList.toggle('completed');
    });
  });
*/
  document.getElementById("searchButton").addEventListener("click", function() {
    filterTable();
  });

  document.querySelector(".clear-button").addEventListener("click", function() {
    document.getElementById("searchInput").value = "";
    const rows = document.getElementById("dataTable").getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.display = "";
    }
  });
});
function filterTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput").value;
  filter = input.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");

    let found = false;
    for (let j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;
      if (txtValue.toUpperCase().includes(filter)) {
        found = true;
        break;
      }
    }

    if (found) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

document.getElementById('infoButton').addEventListener('click', function() {
  document.getElementById('infoPopup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
  document.getElementById('infoPopup').style.display = 'none';
});
