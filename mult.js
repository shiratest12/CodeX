const quizData = [
  {
      question: "¿Prefieres un lenguaje que se ejecute en un navegador web?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "JavaScript",
  },
  {
      question: "¿Te gustaría trabajar con un lenguaje que sea popular en el desarrollo web del lado del cliente?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "JavaScript",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea ampliamente utilizado en el desarrollo de aplicaciones web interactivas?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "JavaScript",
  },
  {
      question: "¿Te interesa la programación de sistemas?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "C",
  },
  {
      question: "¿Quieres un lenguaje que sea eficiente para el desarrollo de software de sistemas?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "C",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea ampliamente utilizado en la programación de bajo nivel?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "C",
  },
  {
      question: "¿Quieres un lenguaje con una sintaxis sencilla y clara?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Python",
  },
  {
      question: "¿Te gustaría trabajar con un lenguaje que sea popular en la ciencia de datos?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Python",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea eficiente para el desarrollo rápido de aplicaciones?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Python",
  },
  {
      question: "¿Estás interesado en la programación orientada a objetos?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Java",
  },
  {
      question: "¿Te gustaría trabajar con un lenguaje que sea popular en el desarrollo de aplicaciones empresariales?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Java",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea ampliamente utilizado en el desarrollo de aplicaciones Android?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Java",
  },
  {
      question: "¿Te gustaría trabajar con un lenguaje que sea popular en el desarrollo de aplicaciones móviles?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Swift",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea eficiente para el desarrollo de aplicaciones iOS?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Swift",
  },
  {
      question: "¿Quieres un lenguaje que sea ampliamente utilizado en el desarrollo de aplicaciones para Apple?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "Swift",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea eficiente para el desarrollo web del lado del servidor?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "PHP",
  },
  {
      question: "¿Te gustaría trabajar con un lenguaje que sea popular en el desarrollo de sitios web dinámicos?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "PHP",
  },
  {
      question: "¿Estás interesado en un lenguaje que sea ampliamente utilizado en el desarrollo de aplicaciones web?",
      a: "Sí",
      b: "No",
      c: "No estoy seguro",
      d: "No importa",
      language: "PHP",
  },
];
const languagePreferences = {};
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
let currentQuiz = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  languagePreferences[currentQuizData.language] = (languagePreferences[currentQuizData.language] || 0) + 1;
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if(answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if(answer) {
    currentQuiz++;
    if(currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      recommendLanguage();
    }
  }
});

function recommendLanguage() {
  let maxCount = 0;
  let recommendedLanguages = [];

  for (const language in languagePreferences) {
    if (languagePreferences[language] > maxCount) {
      maxCount = languagePreferences[language];
      recommendedLanguages = [language];
    } else if (languagePreferences[language] === maxCount) {
      recommendedLanguages.push(language);
    }
  }

  let recommendationText = "Basado en tus respuestas, te recomendamos aprender:";
  recommendedLanguages.forEach(language => {
    recommendationText += ` ${language}`;
  });

  quiz.innerHTML = `
    <h2>${recommendationText}</h2>
    <p>Estos lenguajes podrían ser un buen punto de partida para ti, pero te recomendamos investigar más a fondo para tomar la mejor decisión.</p>
    <button onclick="location.reload()">Volver a empezar</button>
  `;
}