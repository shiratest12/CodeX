import { app } from './firebase.js';
import { getFirestore, collection, getDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


const db = getFirestore(app);
// ID del blog de la URL
function getBlogIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


async function getBlogs() {
const blogs = [];
const querySnapshot = await getDocs(collection(db, "blog"));
querySnapshot.forEach((doc) => {
const data = doc.data();
blogs.push({
  id: doc.id,
  title: data.title,
  category: data.category,
  difficulty: data.difficulty, 
  shortDescription: data.shortDescription
});
});
return blogs;
}
function preprocessText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, '').split(' ');
}

function calculateTFIDF(blogs) {
  const documents = blogs.map(blog => preprocessText(blog.title + ' ' + blog.shortDescription));
  const wordFrequency = {};
  const documentFrequency = {};
  const tfidf = {};

  documents.forEach((doc, docIndex) => {
    tfidf[docIndex] = {};
    const wordSet = new Set(doc);
    wordSet.forEach(word => {
      if (!documentFrequency[word]) documentFrequency[word] = 0;
      documentFrequency[word]++;
    });
    doc.forEach(word => {
      if (!wordFrequency[docIndex]) wordFrequency[docIndex] = {};
      if (!wordFrequency[docIndex][word]) wordFrequency[docIndex][word] = 0;
      wordFrequency[docIndex][word]++;
    });
  });

  Object.keys(wordFrequency).forEach(docIndex => {
    Object.keys(wordFrequency[docIndex]).forEach(word => {
      const tf = wordFrequency[docIndex][word] / documents[docIndex].length;
      const idf = Math.log(documents.length / documentFrequency[word]);
      tfidf[docIndex][word] = tf * idf;
    });
  });

  return tfidf;
}

function cosineSimilarity(vec1, vec2) {
  const intersection = Object.keys(vec1).filter(word => vec2.hasOwnProperty(word));
  const dotProduct = intersection.reduce((sum, word) => sum + vec1[word] * vec2[word], 0);
  const mag1 = Math.sqrt(Object.values(vec1).reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(Object.values(vec2).reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (mag1 * mag2);
}

function findSimilarBlogs(currentBlogIndex, tfidf, blogs, k = 5) {
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const currentBlog = blogs[currentBlogIndex];
  const currentDifficultyIndex = difficulties.indexOf(currentBlog.difficulty);

  const similarities = Object.keys(tfidf)
    .filter(index => index !== currentBlogIndex.toString())
    .map(index => {
      const blog = blogs[index];
      const contentSimilarity = cosineSimilarity(tfidf[currentBlogIndex], tfidf[index]);
      const difficultyIndex = difficulties.indexOf(blog.difficulty);
      const difficultyScore = 1 - Math.abs(currentDifficultyIndex - difficultyIndex) / 2;
      const combinedScore = 0.7 * contentSimilarity + 0.3 * difficultyScore;
      return { index: parseInt(index), similarity: combinedScore };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, k);
  
  return similarities;
}

function displayCurrentBlog(blog) {
  const currentBlogElement = document.getElementById('current-blog');
  currentBlogElement.innerHTML = `
    <h2>Blog Actual</h2>
    <div class="blog-card">
      <h3>${blog.title}</h3>
      <p><strong>Categoría:</strong> ${blog.category}</p>
      <p><strong>Dificultad:</strong> ${blog.difficulty}</p>
     
    </div>
  `;
}

//<h2>Recomendaciones</h2>
function displayRecommendations(currentBlog, recommendations, blogs) {
  const recommendationsElement = document.getElementById('recommendations');
  recommendationsElement.innerHTML = `
    
    ${recommendations.map(rec => `
      <div class="recommendation-card">
        <h4>${blogs[rec.index].title}</h4>
        <p><strong>Categoría:</strong> ${blogs[rec.index].category}</p>
        <p><strong>Dificultad:</strong> ${blogs[rec.index].difficulty}</p>
        <p>${blogs[rec.index].shortDescription}</p>
        <p><strong>Similitud:</strong> ${(rec.similarity * 100).toFixed(2)}%</p>
      </div>
    `).join('')}
  `;
}

function displaySimilarityChart(recommendations) {
  const ctx = document.getElementById('similarityChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: recommendations.map((_, index) => `Recomendación ${index + 1}`),
      datasets: [{
        label: 'Porcentaje de Similitud',
        data: recommendations.map(rec => rec.similarity * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Similitud (%)'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Similitud de las Recomendaciones'
        }
      }
    }
  });
}

function displayDifficultyChart(currentBlog, recommendations, blogs) {
  const ctx = document.getElementById('difficultyChart').getContext('2d');
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const difficultyData = [currentBlog, ...recommendations.map(rec => blogs[rec.index])]
    .map(blog => difficulties.indexOf(blog.difficulty));

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Beginner', 'Intermediate', 'Advanced'],
      datasets: [{
        label: 'Dificultad de los Blogs',
        data: difficultyData,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 2
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Distribución de Dificultad'
        }
      }
    }
  });
}

function explainRecommendations(currentBlog, recommendations, blogs) {
  const explanationElement = document.getElementById('explanation');
  explanationElement.innerHTML = `
    <h2>Explicación del Sistema de Recomendación</h2>
    <p>El sistema de recomendación utiliza una combinación de similitud de contenido y nivel de dificultad para encontrar blogs similares. Aquí te explicamos cómo funciona:</p>
    <ol>
      <li>Cada blog se convierte en un vector numérico usando TF-IDF (Term Frequency-Inverse Document Frequency) basado en su título y descripción corta.</li>
      <li>Se calcula la similitud coseno entre el vector del blog actual y los vectores de todos los demás blogs.</li>
      <li>Se considera también la dificultad del blog, dando preferencia a blogs con un nivel de dificultad similar.</li>
      <li>Se combina la similitud de contenido (70%) y la similitud de dificultad (30%) para obtener una puntuación final.</li>
      <li>Se seleccionan los 5 blogs más similares basándose en esta puntuación combinada.</li>
    </ol>
    <p>Por ejemplo, el blog actual "${currentBlog.title}" tiene un nivel de dificultad "${currentBlog.difficulty}" y trata sobre ${currentBlog.category}. Los blogs recomendados comparten características similares:</p>
    <ul>
      ${recommendations.map(rec => `
        <li>"${blogs[rec.index].title}" tiene una similitud del ${(rec.similarity * 100).toFixed(2)}% porque también trata sobre ${blogs[rec.index].category} y tiene un nivel de dificultad "${blogs[rec.index].difficulty}".</li>
      `).join('')}
    </ul>
    <p>Estas recomendaciones te ayudan a encontrar contenido relacionado que podría interesarte, manteniendo un nivel de dificultad apropiado.</p>
  `;
}

function displayMathFormula() {
  const mathFormulaElement = document.getElementById('mathFormula');
  mathFormulaElement.innerHTML = `
    <h2>Fórmula Matemática: Similitud Coseno</h2>
    <p>La similitud coseno entre dos vectores A y B se calcula usando la siguiente fórmula:</p>
    <p>
      \\[
      similarity = \\frac{A \\cdot B}{||A|| ||B||} = \\frac{\\sum_{i=1}^n A_i B_i}{\\sqrt{\\sum_{i=1}^n A_i^2} \\sqrt{\\sum_{i=1}^n B_i^2}}
      \\]
    </p>
    <p>Donde:</p>
    <ul>
      <li>A y B son vectores que representan dos blogs</li>
      <li>A · B es el producto punto de A y B</li>
      <li>||A|| y ||B|| son las magnitudes de los vectores A y B</li>
      <li>n es el número de dimensiones (palabras únicas) en los vectores</li>
    </ul>
  `;
  MathJax.typeset();
}




async function initPage() {
const blogs = await getBlogs();
const tfidf = calculateTFIDF(blogs);

const currentBlogId = getBlogIdFromUrl();
let currentBlog;
let currentBlogIndex;

if (currentBlogId) {
    const docRef = doc(db, "blog", currentBlogId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        currentBlog = { id: docSnap.id, ...docSnap.data() };
        currentBlogIndex = blogs.findIndex(blog => blog.id === currentBlogId);
    } else {
        console.log("No such document!");
        return;
    }
} else {
    currentBlogIndex = Math.floor(Math.random() * blogs.length);
    currentBlog = blogs[currentBlogIndex];
}

displayCurrentBlog(currentBlog);

const recommendations = findSimilarBlogs(currentBlogIndex, tfidf, blogs);
displayRecommendations(currentBlog, recommendations, blogs);
displaySimilarityChart(recommendations);
displayDifficultyChart(currentBlog, recommendations, blogs);
explainRecommendations(currentBlog, recommendations, blogs);
displayMathFormula();

explainDynamicNature();
}
document.addEventListener('DOMContentLoaded', initPage);