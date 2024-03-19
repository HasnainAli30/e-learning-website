const questions = [
    {
        question: "Which of the following correctly defines a variable in Python?",
        answers: [
            {text: "var name = 'value'",correct: false},
            {text: "int name = 10",correct: true},
            {text: "define name: 'value'",correct: false},
            {text: "name('value')",correct: false}
        ]
    },

    {
        question: "How do you add a single-line comment in Python code?",
        answers: [
            {text: "// This is a comment",correct: false},
            {text: "# This is a comment",correct: true},
            {text: "/* This is a comment */",correct: false},
            {text: "! This is a comment",correct: false}
        ]
    },

    {
        question: "The print() function in Python is used for:",
        answers: [
            {text: "Taking user input",correct: false},
            {text: "Displaying data to the console",correct: true},
            {text: "Defining a loop",correct: false},
            {text: "Performing calculations",correct: false}
        ]
    },

    {
        question: "Which data type is best suited to store a person's name in Python?",
        answers: [
            {text: "int",correct: false},
            {text: "float",correct: false},
            {text: "bool",correct: false},
            {text: "str",correct: true}
        ]
    },

    {
        question: "What is the correct way to access the length of a string variable named my_string in Python?",
        answers: [
            {text: "length(my_string)",correct: false},
            {text: "my_string.length",correct: false},
            {text: "len(my_string)",correct: true},
            {text: "size(my_string)",correct: false}
        ]
    },

    {
        question: "In Python, what operator is used for performing addition?",
        answers: [
            {text: "*",correct: false},
            {text: "+",correct: true},
            {text: "-",correct: false},
            {text: "/",correct: false}
        ]
    },

    {
        question: "Which of the following is NOT a valid conditional statement in Python?",
        answers: [
            {text: "if condition:",correct: false},
            {text: "while condition:",correct: true},
            {text: "for item in sequence:",correct: false},
            {text: "else:",correct: false}
        ]
    },

    {
        question: "The indentation level in Python code determines:",
        answers: [
            {text: "Variable type",correct: false},
            {text: "Code block structure",correct: true},
            {text: "Loop iteration",correct: false},
            {text: "Function definition",correct: false}
        ]
    },

    {
        question: "Which keyword is used to define a function in Python?",
        answers: [
            {text: "create",correct: false},
            {text: "define",correct: false},
            {text: "def",correct: true},
            {text: "build",correct: false}
        ]
    },

    {
        question: "Python is considered a:",
        answers: [
            {text: "Compiled language",correct: false},
            {text: "Interpreted language",correct: true},
            {text: "Machine code language",correct: false},
            {text: "Assembly language",correct: false}
        ]
    },


];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const mainHeading = document.getElementById("main-heading");
const mainInstructions = document.getElementById("instructions");
const winningGif = document.getElementById("winning-gif");
const motivatingGif = document.getElementById("motivating-gif");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.style.textAlign = "left";
    mainInstructions.style.display = "block";
    mainHeading.style.display = "block";
    winningGif.style.display = "none";
    motivatingGif.style.display = "none";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    if(score>=8){
        questionElement.innerHTML =   `You scored ${score} out of ${questions.length}. Congrats, You passed!`;    
        winningGif.style.display = "block";
    }
    else{
        questionElement.innerHTML =   `You scored ${score} out of ${questions.length}. Kindly, reattempt the quiz!`;    
        motivatingGif.style.display = "block";
    }
    questionElement.style.textAlign = "center";
    mainHeading.style.display = "none";
    mainInstructions.style.display = "none";
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();