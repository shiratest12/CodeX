const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    updateEditorTheme();
});

function updateEditorTheme() {
    if (body.classList.contains('dark-mode')) {
        editor.setTheme("ace/theme/monokai");
    } else {
        editor.setTheme("ace/theme/xcode");
    }
}

document.getElementById('increase-font').addEventListener('click', () => {
    let fontSize = parseInt(editor.getFontSize(), 10);
    editor.setFontSize(fontSize + 1);
});

document.getElementById('decrease-font').addEventListener('click', () => {
    let fontSize = parseInt(editor.getFontSize(), 10);
    editor.setFontSize(fontSize - 1);
});

document.getElementById('clear-content').addEventListener('click', () => {
    editor.setValue('');
});

document.getElementById('language').addEventListener('change', (e) => {
    const lang = e.target.value;
    editor.session.setMode(`ace/mode/${lang}`);
});

document.getElementById('run-button').addEventListener('click', () => {
    const code = editor.getValue();
    const output = document.getElementById('output');
    output.textContent = `Ejecutando código:\n\n${code}`;
});

// Algoritmo de IA avanzado para sugerencias de código
const codePatterns = {
    'javascript': [
        { trigger: 'if', snippet: 'if (condition) {\n    \n}' },
        { trigger: 'for', snippet: 'for (let i = 0; i < array.length; i++) {\n    \n}' },
        { trigger: 'function', snippet: 'function functionName(params) {\n    \n}' },
        { trigger: 'class', snippet: 'class ClassName {\n    constructor() {\n        \n    }\n}' },
        { trigger: 'fetch', snippet: 'fetch(url)\n    .then(response => response.json())\n    .then(data => {\n        \n    })\n    .catch(error => {\n        console.error(\'Error:\', error);\n    });' },
    ],
    'python': [
        { trigger: 'if', snippet: 'if condition:\n    ' },
        { trigger: 'for', snippet: 'for item in iterable:\n    ' },
        { trigger: 'def', snippet: 'def function_name(parameters):\n    ' },
        { trigger: 'class', snippet: 'class ClassName:\n    def __init__(self):\n        ' },
        { trigger: 'with', snippet: 'with open(\'filename.txt\', \'r\') as file:\n    content = file.read()\n    ' },
    ],
    'c_cpp': [
        { trigger: 'if', snippet: 'if (condition) {\n    \n}' },
        { trigger: 'for', snippet: 'for (int i = 0; i < n; i++) {\n    \n}' },
        { trigger: 'while', snippet: 'while (condition) {\n    \n}' },
        { trigger: 'class', snippet: 'class ClassName {\npublic:\n    ClassName() {\n        \n    }\n};' },
        { trigger: 'switch', snippet: 'switch (variable) {\n    case value1:\n        // code\n        break;\n    case value2:\n        // code\n        break;\n    default:\n        // code\n}' },
    ]
};

editor.session.on('change', function() {
    const currentLanguage = document.getElementById('language').value;
    const cursorPosition = editor.getCursorPosition();
    const currentLine = editor.session.getLine(cursorPosition.row);
    const currentWord = getCurrentWord(currentLine, cursorPosition.column);

    const suggestions = codePatterns[currentLanguage].filter(pattern => 
        pattern.trigger.startsWith(currentWord) && pattern.trigger !== currentWord
    );

    displaySuggestions(suggestions);
});

function getCurrentWord(line, column) {
    const wordRegex = /[a-zA-Z]+/g;
    let match;
    while ((match = wordRegex.exec(line)) !== null) {
        if (match.index <= column && column <= match.index + match[0].length) {
            return match[0].slice(0, column - match.index);
        }
    }
    return '';
}

function displaySuggestions(suggestions) {
    const aiSuggestions = document.getElementById('ai-suggestions');
    aiSuggestions.innerHTML = '';
    if (suggestions.length > 0) {
        aiSuggestions.innerHTML = '<strong>Sugerencias IA:</strong><br>';
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.textContent = suggestion.trigger;
            button.className = 'suggestion-button';
            button.onclick = () => insertSnippet(suggestion.snippet);
            aiSuggestions.appendChild(button);
        });
    }
}

function insertSnippet(snippet) {
    editor.insert(snippet);
    editor.focus();
}