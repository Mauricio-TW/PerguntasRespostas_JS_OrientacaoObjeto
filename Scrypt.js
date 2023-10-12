//Quiz
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    selectOption(selectedOption) {
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.correctAnswer === selectedOption) {
            this.score++;
        }
    }

    goToNextQuestion() {
        this.currentQuestionIndex++;
    }

    isQuizOver() {
        return this.currentQuestionIndex === this.questions.length;
    }
}

//Perguntas
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília"],
        correctAnswer: "Brasília",
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Friedrich Nietzsche"],
        correctAnswer: "Miguel de Cervantes",
    },
    {
        question: "Quantos planetas existem no sistema solar?",
        options: ["8", "9", "10"],
        correctAnswer: "8",
    },
    {
        question: "Qual é o maior animal terrestre?",
        options: ["Elefante Africano", "Girafa", "Rinoceronte Branco"],
        correctAnswer: "Elefante Africano",
    },
    {
        question: "Quem pintou a 'Mona Lisa'?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci"],
        correctAnswer: "Leonardo da Vinci",
    },
    {
        question: "Qual é o metal líquido à temperatura ambiente?",
        options: ["Ferro", "Ouro", "Mercúrio"],
        correctAnswer: "Mercúrio",
    },
    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington"],
        correctAnswer: "George Washington",
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Júpiter", "Netuno"],
        correctAnswer: "Júpiter",
    },
    {
        question: "Quem escreveu 'Romeu e Julieta'?",
        options: ["Jane Austen", "Charles Dickens", "William Shakespeare"],
        correctAnswer: "William Shakespeare",
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico"],
        correctAnswer: "Oceano Pacífico",
    },

];

//Chamar novas perguntas

const quiz = new Quiz(questions);

function loadQuestion() {
    const currentQuestion = quiz.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    const option1Element = document.getElementById("option1");
    const option2Element = document.getElementById("option2");
    const option3Element = document.getElementById("option3");

    questionElement.textContent = currentQuestion.question;
    option1Element.textContent = currentQuestion.options[0];
    option2Element.textContent = currentQuestion.options[1];
    option3Element.textContent = currentQuestion.options[2];
}

function handleOptionClick(selectedOption) {
    quiz.selectOption(selectedOption);
    const resultElement = document.getElementById("result");
    resultElement.textContent = quiz.getCurrentQuestion().correctAnswer === selectedOption
        ? "Resposta correta!"
        : "Resposta errada!";
    resultElement.style.color = quiz.getCurrentQuestion().correctAnswer === selectedOption ? "green" : "red";

    const scoreValueElement = document.getElementById("score-value");
    scoreValueElement.textContent = quiz.score;

    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "block";

    if (quiz.isQuizOver()) {
        showFinalScore();
    }
}

function handleNextClick() {
    if (!quiz.isQuizOver()) {
        quiz.goToNextQuestion();
        loadQuestion();
        resetQuizUI();
    }
}

function resetQuizUI() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "";
    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "none";
}

function showFinalScore() {
    const quizContainer = document.getElementById("quiz-container");
    const finalScore = quiz.score;
    const totalQuestions = questions.length;

    const average = finalScore / totalQuestions;

    let resultText = "";
    if (average >= 7) {
        resultText = "Aprovado!";
    } else if (average >= 5) {
        resultText = "Recuperação";
    } else {
        resultText = "Reprovado";
    }

    quizContainer.innerHTML = `
        <h2>Pontuação Final</h2>
        <p>Você acertou ${finalScore} de ${totalQuestions} perguntas.</p>
        <p>Média: ${average.toFixed(2)}</p>
        <p>Resultado: ${resultText}</p>
    `;
}

// Adicione event listeners para as três opções
document.getElementById("option1").addEventListener("click", () => handleOptionClick(quiz.getCurrentQuestion().options[0]));
document.getElementById("option2").addEventListener("click", () => handleOptionClick(quiz.getCurrentQuestion().options[1]));
document.getElementById("option3").addEventListener("click", () => handleOptionClick(quiz.getCurrentQuestion().options[2]));
document.getElementById("next-button").addEventListener("click", handleNextClick);

// Inicialize o quiz
loadQuestion();