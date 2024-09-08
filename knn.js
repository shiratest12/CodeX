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

    function simpleStemmer(word) {
        const suffixes = ['ando', 'endo', 'ar', 'er', 'ir', 'mente', 'able', 'ible', 'idad', 'ción'];
        for (const suffix of suffixes) {
            if (word.endsWith(suffix)) {
                return word.slice(0, -suffix.length);
            }
        }
        return word;
    }
    
  
    function calculateTFIDF(blogs) {
        //  preprocesar el texto
        function preprocessText(text) {
            const stopWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'si', 'no', 'en', 'de', 'a', 'para', 'por', 'con', 'sin']);
            return text.toLowerCase()
                       .replace(/[^\w\s]/g, '')
                       .split(' ')
                       .filter(word => !stopWords.has(word) && word.length > 1)
                       .map(simpleStemmer);
        }
      
        // Calcular la frecuencia de términos (TF) para cada documento
        const tf = blogs.map(blog => {
          const words = preprocessText(blog.title + ' ' + blog.shortDescription);
          const wordCount = {};
          words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
          });
          // Normalizar TF por la longitud del documento
          Object.keys(wordCount).forEach(word => {
            wordCount[word] /= words.length;
          });
          return wordCount;
        });
      
        // Calcular la frecuencia de documentos (DF) para cada término
        const df = {};
        tf.forEach(doc => {
          Object.keys(doc).forEach(word => {
            df[word] = (df[word] || 0) + 1;
          });
        });
      
        // Calcular IDF
        const idf = {};
        const N = blogs.length;
        Object.keys(df).forEach(word => {
          idf[word] = Math.log(N / df[word]);
        });
      
        // Calcular TF-IDF
        const tfidf = tf.map(doc => {
          const docTfidf = {};
          Object.keys(doc).forEach(word => {
            docTfidf[word] = doc[word] * idf[word];
          });
          return docTfidf;
        });
      
        // Verificación y registro
        tfidf.forEach((doc, index) => {
          if (Object.keys(doc).length === 0) {
            console.error(`TF-IDF vacío para el blog ${index}:`, blogs[index].title);
          }
        });
      
        return tfidf;
      }
      
    
    
      function cosineSimilarity(vec1, vec2) {
        if (!vec1 || !vec2 || typeof vec1 !== 'object' || typeof vec2 !== 'object') {
          console.error("Vectores inválidos en cosineSimilarity:", vec1, vec2);
          return 0;
        }
      
        if (Object.keys(vec1).length === 0 || Object.keys(vec2).length === 0) {
          console.error("Uno de los vectores está vacío");
          return 0;
        }
      
        const keys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
      
        for (const key of keys) {
          const val1 = vec1[key] || 0;
          const val2 = vec2[key] || 0;
          dotProduct += val1 * val2;
          magnitude1 += val1 * val1;
          magnitude2 += val2 * val2;
        }
      
        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);
      
        if (magnitude1 === 0 || magnitude2 === 0) {
          console.error("Uno de los vectores tiene magnitud cero");
          return 0;
        }
      
        return dotProduct / (magnitude1 * magnitude2);
      }
    
      function findSimilarBlogsKNN(currentBlogIndex, tfidf, blogs, k = 5) {
        const difficulties = ['Básico', 'Intermedio', 'Avanzado'];
        const currentBlog = blogs[currentBlogIndex];
        
        if (!currentBlog) {
          console.error('Blog actual no encontrado, índice:', currentBlogIndex);
          return [];
        }
        
        if (!tfidf[currentBlogIndex] || Object.keys(tfidf[currentBlogIndex]).length === 0) {
          console.error('TF-IDF vacío para el blog actual, índice:', currentBlogIndex);
          return [];
        }
        
        const currentDifficultyIndex = difficulties.indexOf(currentBlog.difficulty);
        
        if (currentDifficultyIndex === -1) {
          console.error('Dificultad no válida para el blog actual:', currentBlog.difficulty);
          return [];
        }
      
        const similarities = blogs.map((blog, index) => {
          if (index === currentBlogIndex) return null;
          
          if (!tfidf[index] || Object.keys(tfidf[index]).length === 0) {
            console.error(`TF-IDF vacío para el blog ${index}`);
            return null;
          }
          
          const contentSimilarity = cosineSimilarity(tfidf[currentBlogIndex], tfidf[index]);
          if (isNaN(contentSimilarity)) {
            console.error(`Similitud de contenido inválida para el blog ${index}:`, contentSimilarity);
            return null;
          }
          
          const difficultyIndex = difficulties.indexOf(blog.difficulty);
          
          if (difficultyIndex === -1) {
            console.error(`Dificultad no válida para el blog ${index}:`, blog.difficulty);
            return null;
          }
          
          const difficultyDifference = Math.abs(currentDifficultyIndex - difficultyIndex);
          const difficultyWeight = 1 - (difficultyDifference / (difficulties.length - 1));
          
          const categorySimilarity = blog.category === currentBlog.category ? 1 : 0;
          
          const combinedSimilarity = 0.6 * contentSimilarity + 0.2 * difficultyWeight + 0.2 * categorySimilarity;
          
          return { index, similarity: combinedSimilarity };
        })
        .filter(item => item !== null)
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

function displayRecommendationsknn(currentBlog, recommendations, blogs) {
    const recommendationsElement = document.getElementById('recommendationsknn');
    recommendationsElement.innerHTML = `
       
        ${recommendations.map(rec => `
            <div class="recommendation-card">
                <h4>${blogs[rec.index].title} (KNN)</h4>
                <p><strong>Categoría:</strong> ${blogs[rec.index].category}</p>
                <p><strong>Dificultad:</strong> ${blogs[rec.index].difficulty}</p>
                <p>${blogs[rec.index].shortDescription}</p>
                <p><strong>Similitud:</strong> ${(rec.similarity * 100).toFixed(2)}%</p>
            </div>
        `).join('')}
    `;
}

function displaySimilarityChartknn(recommendations) {
    const ctx = document.getElementById('similarityChartknn').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: recommendations.map((_, index) => `Recomendación ${index + 1} `),
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
                    text: 'Similitud de las Recomendaciones (KNN)'
                }
            }
        }
    });
}

function displayDifficultyChartknn(currentBlog, recommendations, blogs) {
    const ctx = document.getElementById('difficultyChartknn').getContext('2d');
    const difficulties = ['Básico', 'Intermedio', 'Avanzado'];
    const difficultyData = [currentBlog, ...recommendations.map(rec => blogs[rec.index])]
        .map(blog => difficulties.indexOf(blog.difficulty));

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: difficulties,
            datasets: [{
                label: 'Dificultad de los Blogs (KNN)',
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
                    text: 'Distribución de Dificultad (KNN)'
                }
            }
        }
    });
}

function explainRecommendationsknn(currentBlog, recommendations, blogs) {
    const explanationElement = document.getElementById('explanationknn');
    explanationElement.innerHTML = `
        <h2>Explicación del Sistema de Recomendación KNN</h2>
        <p>El sistema de recomendación utiliza el algoritmo K-Nearest Neighbors (KNN) para encontrar blogs similares. Aquí te explicamos cómo funciona:</p>
        <ol>
            <li>Cada blog se convierte en un vector numérico usando TF-IDF (Term Frequency-Inverse Document Frequency) basado en su título y descripción corta.</li>
            <li>Se calcula la similitud de coseno entre el vector del blog actual y los vectores de todos los demás blogs.</li>
            <li>Se considera también la dificultad del blog, asignando un peso basado en la diferencia de niveles de dificultad.</li>
            <li>Se combina la similitud de contenido (80%) y el peso de dificultad (20%) para obtener una similitud final.</li>
            <li>Se seleccionan los 5 blogs más similares como recomendaciones.</li>
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

function displayMathFormulaknn() {
    const mathFormulaElement = document.getElementById('mathFormulaknn');
    mathFormulaElement.innerHTML = `
        <h2>Fórmula Matemática: Similitud de Coseno (KNN)</h2>
        <p>La similitud de coseno entre dos vectores A y B se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            similarity = \\frac{A \\cdot B}{||A|| ||B||}
            \\]
        </p>
        <p>Donde:</p>
        <ul>
            <li>A · B es el producto punto de los vectores A y B</li>
            <li>||A|| y ||B|| son las magnitudes de los vectores A y B respectivamente</li>
        </ul>
        <p>En el algoritmo KNN, buscamos los k vecinos más similares (con mayor similitud de coseno) para hacer las recomendaciones.</p>
    `;
    MathJax.typeset();
}

async function evaluateRecommendationSystemKnn(blogs, tfidf) {
    const testSize = Math.floor(blogs.length * 0.2);
    const testSet = blogs.slice(0, testSize);
    const trainSet = blogs.slice(testSize);

    let totalPrecision = 0, totalRecall = 0, totalF1Score = 0, totalNDCG = 0, totalDiversity = 0, totalNovelty = 0;

    for (const testBlog of testSet) {
        const testBlogIndex = blogs.indexOf(testBlog);
        const recommendations = findSimilarBlogsKNN(testBlogIndex, tfidf, trainSet);
        
        const relevantItems = trainSet.filter(blog => blog.category === testBlog.category);
        const recommendedItems = recommendations.map(rec => trainSet[rec.index]);
        
        const precision = calculatePrecisionKnn(recommendedItems, relevantItems);
        const recall = calculateRecallKnn(recommendedItems, relevantItems);
        const f1Score = calculateF1ScoreKnn(precision, recall);
        const ndcg = calculateNDCGKnn(recommendations, relevantItems);
        const diversity = calculateDiversityKnn(recommendedItems);
        const novelty = calculateNoveltyKnn(recommendedItems, trainSet);

        totalPrecision += precision;
        totalRecall += recall;
        totalF1Score += f1Score;
        totalNDCG += ndcg;
        totalDiversity += diversity;
        totalNovelty += novelty;
    }

    const numTests = testSet.length;
    displayEvaluationResultsKnn({
        precision: totalPrecision / numTests,
        recall: totalRecall / numTests,
        f1Score: totalF1Score / numTests,
        ndcg: totalNDCG / numTests,
        diversity: totalDiversity / numTests,
        novelty: totalNovelty / numTests
    });
}

function calculatePrecisionKnn(recommended, relevant) {
    const relevantRecommended = recommended.filter(item => relevant.includes(item));
    return relevantRecommended.length / recommended.length;
}

function calculateRecallKnn(recommended, relevant) {
    const relevantRecommended = recommended.filter(item => relevant.includes(item));
    return relevantRecommended.length / relevant.length;
}

function calculateF1ScoreKnn(precision, recall) {
    return 2 * (precision * recall) / (precision + recall);
}

function calculateNDCGKnn(recommendations, relevantItems, k = 5) {
    const dcg = recommendations.slice(0, k).reduce((sum, rec, index) => {
        const relevance = relevantItems.includes(rec) ? 1 : 0;
        return sum + (relevance / Math.log2(index + 2));
    }, 0);

    const idealDCG = relevantItems.slice(0, k).reduce((sum, _, index) => {
        return sum + (1 / Math.log2(index + 2));
    }, 0);

    return dcg / idealDCG;
}

function calculateDiversityKnn(recommendations) {
    const categories = new Set(recommendations.map(blog => blog.category));
    return categories.size / recommendations.length;
}

function calculateNoveltyKnn(recommendations, allItems) {
    const popularItems = allItems.filter(item => item.views > 1000);
    const novelItems = recommendations.filter(item => !popularItems.includes(item));
    return novelItems.length / recommendations.length;
}

function displayEvaluationResultsKnn(results) {
    document.getElementById('precision-knn').textContent = results.precision.toFixed(4);
    document.getElementById('recall-knn').textContent = results.recall.toFixed(4);
    document.getElementById('f1-score-knn').textContent = results.f1Score.toFixed(4);
    document.getElementById('ndcg-knn').textContent = results.ndcg.toFixed(4);
    
    // Si tienes resultados para diversidad y novedad, descomenta estas líneas
    // document.getElementById('diversity-knn').textContent = results.diversity.toFixed(4);
    // document.getElementById('novelty-knn').textContent = results.novelty.toFixed(4);

    const resultsContainer = document.getElementById('evaluation-results');
    resultsContainer.innerHTML = `
        <h2>Resultados de la Evaluación KNN</h2>
        <p>Precisión: ${results.accuracy}</p>
        <p>Precisión Media: ${results.meanAccuracy}</p>
        <p>Desviación Estándar: ${results.stdDeviation}</p>
    `;
}

    async function crossValidateKNN(blogs, k = 5) {
        const numFolds = 5;
        const foldSize = Math.floor(blogs.length / numFolds);
        let totalPrecision = 0, totalRecall = 0, totalF1Score = 0, totalNDCG = 0;
    
        for (let i = 0; i < numFolds; i++) {
            const testStart = i * foldSize;
            const testEnd = testStart + foldSize;
            const testSet = blogs.slice(testStart, testEnd);
            const trainSet = [...blogs.slice(0, testStart), ...blogs.slice(testEnd)];
    
            const tfidf = calculateTFIDF(trainSet);
    
            for (const testBlog of testSet) {
                const testBlogIndex = trainSet.length;
                trainSet.push(testBlog);
                const recommendations = findSimilarBlogsKNN(testBlogIndex, tfidf, trainSet, k);
                trainSet.pop();
    
                const relevantItems = trainSet.filter(blog => blog.category === testBlog.category);
                const recommendedItems = recommendations.map(rec => trainSet[rec.index]);
    
                const precision = calculatePrecisionKnn(recommendedItems, relevantItems);
                const recall = calculateRecallKnn(recommendedItems, relevantItems);
                const f1Score = calculateF1ScoreKnn(precision, recall);
                const ndcg = calculateNDCGKnn(recommendations, relevantItems);
    
                totalPrecision += precision;
                totalRecall += recall;
                totalF1Score += f1Score;
                totalNDCG += ndcg;
            }
        }
    
        const numTests = blogs.length;
        return {
            precision: totalPrecision / numTests,
            recall: totalRecall / numTests,
            f1Score: totalF1Score / numTests,
            ndcg: totalNDCG / numTests
        };
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

    const recommendationsknn = findSimilarBlogsKNN(currentBlogIndex, tfidf, blogs);
    displayRecommendationsknn(currentBlog, recommendationsknn, blogs);
    displaySimilarityChartknn(recommendationsknn);
    displayDifficultyChartknn(currentBlog, recommendationsknn, blogs);
    explainRecommendationsknn(currentBlog, recommendationsknn, blogs);
    displayMathFormulaknn();

    // Evaluar el sistema de recomendación KNN usando validación cruzada
    const evaluationResults = await crossValidateKNN(blogs);
    displayEvaluationResultsKnn(evaluationResults);
}

    document.addEventListener('DOMContentLoaded', initPage);
