
import { app } from './firebase.js';
import { getFirestore, collection, getDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";



const db = getFirestore(app);

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
// Mejora del preprocesamiento
function preprocessText(text) {
    text = text.toLowerCase().replace(/[^\w\s]/g, '');
    const stopWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'si', 'no', 'en', 'de', 'a', 'con', 'por', 'para']);
    return text.split(/\s+/).filter(word => !stopWords.has(word) && word.length > 1).map(word => stemWord(word));
}

// Función de stemming simple (reemplazar con una biblioteca más robusta en producción)
function stemWord(word) {
    // Ejemplo muy básico, usar una biblioteca real para mejores resultados
    return word.replace(/(?:ar|er|ir)$/, '');
}

// Uso de diferentes n-gramas
function getNGrams(words, n = [1, 2, 3]) {
    const ngrams = [];
    n.forEach(i => {
        for (let j = 0; j <= words.length - i; j++) {
            ngrams.push(words.slice(j, j + i).join(' '));
        }
    });
    return ngrams;
}


function trainNaiveBayes(blogs) {
    const categoryPriors = {};
    const wordLikelihoods = {};
    const totalWords = {};

    blogs.forEach(blog => {
        const category = blog.category;
        const words = preprocessText(blog.title + ' ' + blog.shortDescription);
        const ngrams = getNGrams(words);

        if (!categoryPriors[category]) {
            categoryPriors[category] = 0;
            wordLikelihoods[category] = {};
            totalWords[category] = 0;
        }
        categoryPriors[category]++;

        ngrams.forEach(ngram => {
            if (!wordLikelihoods[category][ngram]) {
                wordLikelihoods[category][ngram] = 0;
            }
            wordLikelihoods[category][ngram]++;
            totalWords[category]++;
        });
    });

    // Normalize priors and likelihoods
    const totalBlogs = blogs.length;
    Object.keys(categoryPriors).forEach(category => {
        categoryPriors[category] /= totalBlogs;
        Object.keys(wordLikelihoods[category]).forEach(ngram => {
            wordLikelihoods[category][ngram] = (wordLikelihoods[category][ngram] + 1) / (totalWords[category] + Object.keys(wordLikelihoods[category]).length);
        });
    });

    return { categoryPriors, wordLikelihoods };
}

function classifyBlog(blog, model) {
    const { categoryPriors, wordLikelihoods } = model;
    const words = preprocessText(blog.title + ' ' + blog.shortDescription);
    const ngrams = getNGrams(words);
    const scores = {};

    Object.keys(categoryPriors).forEach(category => {
        scores[category] = Math.log(categoryPriors[category]);
        ngrams.forEach(ngram => {
            if (wordLikelihoods[category][ngram]) {
                scores[category] += Math.log(wordLikelihoods[category][ngram]);
            } else {
                // Add smoothing for unseen ngrams
                scores[category] += Math.log(1 / (Object.keys(wordLikelihoods[category]).length + 1));
            }
        });
    });

    // Convert log scores to probabilities
    const maxScore = Math.max(...Object.values(scores));
    const expScores = {};
    let totalExpScore = 0;
    Object.keys(scores).forEach(category => {
        expScores[category] = Math.exp(scores[category] - maxScore);
        totalExpScore += expScores[category];
    });

    // Normalize probabilities
    Object.keys(expScores).forEach(category => {
        expScores[category] /= totalExpScore;
    });

    return expScores;
}

function findSimilarBlogs(currentBlogIndex, blogs, model, k = 5, minSimilarity = 0.1) {
    const currentBlog = blogs[currentBlogIndex];
    const difficulties = ['Básico', 'Intermedio', 'Avanzado'];
    const currentDifficultyIndex = difficulties.indexOf(currentBlog.difficulty);

    const similarities = blogs
        .map((blog, index) => {
            if (index === currentBlogIndex) return { index, similarity: -Infinity };
            const scores = classifyBlog(blog, model);
            const contentSimilarity = scores[currentBlog.category] || 0;
            const difficultyIndex = difficulties.indexOf(blog.difficulty);
            const difficultyScore = 1 - Math.abs(currentDifficultyIndex - difficultyIndex) / 2;
            const categorySimilarity = blog.category === currentBlog.category ? 1 : 0;
            // Ajustar los pesos: 80% para contenido, 10% para dificultad, 10% para categoría
            const combinedScore = 0.8 * contentSimilarity + 0.1 * difficultyScore + 0.1 * categorySimilarity;
            return { index, similarity: combinedScore };
        })
        .filter(blog => blog.similarity >= minSimilarity)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, k);

    // Sistema de fallback
    if (similarities.length < k) {
        const remainingCount = k - similarities.length;
        const randomBlogs = blogs
            .filter((_, index) => !similarities.some(sim => sim.index === index) && index !== currentBlogIndex)
            .sort(() => 0.5 - Math.random())
            .slice(0, remainingCount)
            .map(blog => ({ index: blogs.indexOf(blog), similarity: 0 }));
        similarities.push(...randomBlogs);
    }

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
  
  // Función para dividir los datos en conjuntos de entrenamiento y prueba
function splitData(blogs, testRatio = 0.2) {
    const shuffled = blogs.sort(() => 0.5 - Math.random());
    const testSize = Math.floor(blogs.length * testRatio);
    return {
        trainSet: shuffled.slice(testSize),
        testSet: shuffled.slice(0, testSize)
    };
}

// Función para calcular precisión, recall y F1-score
function calculateMetrics(recommendations, relevantItems) {
    const relevantRecommendations = recommendations.filter(item => relevantItems.includes(item));
    const precision = relevantRecommendations.length / recommendations.length;
    const recall = relevantRecommendations.length / relevantItems.length;
    const f1Score = 2 * (precision * recall) / (precision + recall);
    
    return { precision, recall, f1Score };
}

// Función para calcular NDCG
function calculateNDCG(recommendations, relevantItems, k = 5) {
    const dcg = recommendations.slice(0, k).reduce((sum, item, index) => {
        const relevance = relevantItems.includes(item) ? 1 : 0;
        return sum + (relevance / Math.log2(index + 2));
    }, 0);

    const idealDCG = relevantItems.slice(0, k).reduce((sum, _, index) => {
        return sum + (1 / Math.log2(index + 2));
    }, 0);

    return dcg / idealDCG;
}

// Función para calcular la diversidad
function calculateDiversity(recommendations, blogs) {
    const categories = new Set(recommendations.map(index => blogs[index].category));
    return categories.size / recommendations.length;
}

// Función para calcular la novedad
function calculateNovelty(recommendations, blogs, popularityThreshold) {
    const popularItems = blogs.filter(blog => blog.views > popularityThreshold).map(blog => blog.id);
    const novelItems = recommendations.filter(index => !popularItems.includes(blogs[index].id));
    return novelItems.length / recommendations.length;
}

function crossValidation(blogs, folds = 5) {
    const foldSize = Math.floor(blogs.length / folds);
    let totalPrecision = 0, totalRecall = 0, totalF1Score = 0;

    for (let i = 0; i < folds; i++) {
        const testStart = i * foldSize;
        const testEnd = (i + 1) * foldSize;
        const testSet = blogs.slice(testStart, testEnd);
        const trainSet = [...blogs.slice(0, testStart), ...blogs.slice(testEnd)];

        const model = trainNaiveBayes(trainSet);
        let foldPrecision = 0, foldRecall = 0, foldF1Score = 0;

        testSet.forEach(blog => {
            const currentBlogIndex = blogs.indexOf(blog);
            const recommendations = findSimilarBlogs(currentBlogIndex, blogs, model);
            const relevantItems = blogs.filter(b => b.category === blog.category && b.id !== blog.id).map(b => blogs.indexOf(b));
            const { precision, recall, f1Score } = calculateMetrics(recommendations.map(rec => rec.index), relevantItems);
            
            foldPrecision += precision;
            foldRecall += recall;
            foldF1Score += f1Score;
        });

        foldPrecision /= testSet.length;
        foldRecall /= testSet.length;
        foldF1Score /= testSet.length;

        totalPrecision += foldPrecision;
        totalRecall += foldRecall;
        totalF1Score += foldF1Score;
    }

    return {
        averagePrecision: totalPrecision / folds,
        averageRecall: totalRecall / folds,
        averageF1Score: totalF1Score / folds
    };
}
// Función principal para evaluar el sistema de recomendación
async function evaluateRecommendationSystem() {
            const blogs = await getBlogs();
            const { trainSet, testSet } = splitData(blogs);
            const model = trainNaiveBayes(trainSet);

            let totalPrecision = 0, totalRecall = 0, totalF1Score = 0, totalNDCG = 0, totalDiversity = 0, totalNovelty = 0;
            const numTests = testSet.length;

            for (let i = 0; i < numTests; i++) {
                const currentBlog = testSet[i];
                const currentBlogIndex = blogs.indexOf(currentBlog);
                const recommendations = findSimilarBlogs(currentBlogIndex, blogs, model);
                
                const relevantItems = blogs.filter(blog => blog.category === currentBlog.category && blog.id !== currentBlog.id).map(blog => blogs.indexOf(blog));
                
                const { precision, recall, f1Score } = calculateMetrics(recommendations.map(rec => rec.index), relevantItems);
                const ndcg = calculateNDCG(recommendations.map(rec => rec.index), relevantItems);
                const diversity = calculateDiversity(recommendations.map(rec => rec.index), blogs);
                const novelty = calculateNovelty(recommendations.map(rec => rec.index), blogs, 1000);

                totalPrecision += precision;
                totalRecall += recall;
                totalF1Score += f1Score;
                totalNDCG += ndcg;
                totalDiversity += diversity;
                totalNovelty += novelty;
            }

            const crossValidationResults = crossValidation(blogs);

            return {
                averagePrecision: totalPrecision / numTests,
                averageRecall: totalRecall / numTests,
                averageF1Score: totalF1Score / numTests,
                averageNDCG: totalNDCG / numTests,
                averageDiversity: totalDiversity / numTests,
                averageNovelty: totalNovelty / numTests,
                crossValidation: crossValidationResults
            };
        }

// Función para mostrar los resultados de la evaluación
function displayEvaluationResults(results) {
            document.getElementById('precision-naive').textContent = results.averagePrecision.toFixed(4);
            document.getElementById('recall-naive').textContent = results.averageRecall.toFixed(4);
            document.getElementById('f1-score-naive').textContent = results.averageF1Score.toFixed(4);
            document.getElementById('ndcg-naive').textContent = results.averageNDCG.toFixed(4);
            document.getElementById('diversity-naive').textContent = results.averageDiversity.toFixed(4);
            document.getElementById('novelty-naive').textContent = results.averageNovelty.toFixed(4);
            document.getElementById('cross-validation-naive').textContent = `Precisión: ${results.crossValidation.averagePrecision.toFixed(4)}, Recall: ${results.crossValidation.averageRecall.toFixed(4)}, F1-Score: ${results.crossValidation.averageF1Score.toFixed(4)}`;
        }

  function explainRecommendations(currentBlog, recommendations, blogs, model) {
    const explanationElement = document.getElementById('explanation');
    explanationElement.innerHTML = `
        <h2>Explicación del Sistema de Recomendación (Naive Bayes)</h2>
        <p>El blog actual "${currentBlog.title}" tiene un nivel de dificultad "${currentBlog.difficulty}" y trata sobre ${currentBlog.category}. Los blogs recomendados son:</p>
        <ul>
            ${recommendations.map(rec => {
                const blog = blogs[rec.index];
                const categoryProb = classifyBlog(blog, model)[currentBlog.category] * 100;
                return `
                    <li>
                        <strong>"${blog.title}"</strong> (${blog.category}, ${blog.difficulty})
                        <br>Similitud: ${(rec.similarity * 100).toFixed(2)}%
                        <br>Probabilidad de pertenecer a ${currentBlog.category}: ${categoryProb.toFixed(2)}%
                        <br>Razón: ${
                            categoryProb > 20 ? "Alta relación de contenido" :
                            blog.difficulty === currentBlog.difficulty ? "Mismo nivel de dificultad" :
                            "Baja similitud, posiblemente debido a limitaciones en los datos de entrenamiento"
                        }
                    </li>
                `;
            }).join('')}
        </ul>
        <p>Nota: La similitud se calcula combinando la relación de contenido (90%) y el nivel de dificultad (10%).</p>
    `;
}

function displayMathFormula() {
    const mathFormulaElement = document.getElementById('mathFormula');
    mathFormulaElement.innerHTML = `
        <h2>Fórmula Matemática: Naive Bayes</h2>
        <p>El clasificador Naive Bayes se basa en el teorema de Bayes:</p>
        <p>
            \\[
            P(C|X) = \\frac{P(X|C) P(C)}{P(X)}
            \\]
        </p>
        <p>Donde:</p>
        <ul>
            <li>P(C|X) es la probabilidad posterior de la clase C dado el documento X</li>
            <li>P(X|C) es la probabilidad de X dado C</li>
            <li>P(C) es la probabilidad prior de la clase C</li>
            <li>P(X) es la probabilidad del documento X</li>
        </ul>
        <p>En la práctica, calculamos el logaritmo de la probabilidad para evitar problemas de underflow:</p>
        <p>
            \\[
            \\log P(C|X) \\propto \\log P(C) + \\sum_{i=1}^n \\log P(x_i|C)
            \\]
        </p>
    `;
    MathJax.typeset();
}

async function initPage() {
    const blogs = await getBlogs();
    const model = trainNaiveBayes(blogs);

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

    const recommendations = findSimilarBlogs(currentBlogIndex, blogs, model);
    displayRecommendations(currentBlog, recommendations, blogs);
    displaySimilarityChart(recommendations);
    displayDifficultyChart(currentBlog, recommendations, blogs);
    explainRecommendations(currentBlog, recommendations, blogs, model);
    displayMathFormula();
    const evaluationResults = await evaluateRecommendationSystem();
    displayEvaluationResults(evaluationResults);
}

document.addEventListener('DOMContentLoaded', initPage);