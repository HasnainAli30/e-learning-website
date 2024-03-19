const questions = [
    {
        question: "Which of the following is NOT a typical step in a machine learning project workflow?",
        answers: [
            {text: "Data Collection",correct: false},
            {text: "Model Training",correct: false},
            {text: "Model Deployment",correct: false},
            {text: "Code Writing",correct: true}
        ]
    },

    {
        question: "What type of AI learns from labeled data where the desired output is predefined?",
        answers: [
            {text: "Unsupervised Learning",correct: false},
            {text: "Reinforcement Learning",correct: false},
            {text: "Supervised Learning",correct: true},
            {text: "Deep Learning",correct: false}
        ]
    },

    {
        question: "In the context of data science projects, what does 'cleaning' data refer to?",
        answers: [
            {text: "Organizing data by date",correct: false},
            {text: "Identifying and correcting errors in the data",correct: false},
            {text: "Deleting irrelevant data points",correct: false},
            {text: "All of the above",correct: true}
        ]
    },

    {
        question: "What is the main goal of an AI strategy?",
        answers: [
            {text: "To develop specific AI applications",correct: false},
            {text: "To define how AI will be used within an organization",correct: true},
            {text: "To choose the most powerful AI hardware",correct: false},
            {text: "To create human-like artificial general intelligence",correct: false}
        ]
    },

    {
        question: "Which of the following is an example of an AI term that refers to a machine's ability to mimic human behavior?",
        answers: [
            {text: "Algorithm",correct: false},
            {text: "Heuristics",correct: false},
            {text: "Machine Learning",correct: false},
            {text: "Artificial Narrow Intelligence (ANI)",correct: true}
        ]
    },

    {
        question: "What is the process of evaluating a machine learning model's performance called?",
        answers: [
            {text: "Model Calibration",correct: false},
            {text: "Model Validation",correct: true},
            {text: "Data Exploration",correct: false},
            {text: "Feature Engineering",correct: false}
        ]
    },

    {
        question: "Data Science projects often involve using libraries and tools in programming languages like Python. This is an example of:",
        answers: [
            {text: "Feature Engineering",correct: false},
            {text: "Exploratory Data Analysis (EDA)",correct: true},
            {text: "Model Deployment",correct: false},
            {text: "Data Visualization",correct: false}
        ]
    },

    {
        question: " Which of the following is NOT a common technique used in data visualization?",
        answers: [
            {text: "Bar charts",correct: false},
            {text: "Text analysis",correct: true},
            {text: "Scatter plots",correct: false},
            {text: "Pie charts",correct: false}
        ]
    },

    {
        question: "What is the process of identifying and extracting meaningful patterns from unlabeled data called?",
        answers: [
            {text: "Supervised Learning",correct: false},
            {text: "Unsupervised Learning",correct: true},
            {text: "Reinforcement Learning",correct: false},
            {text: "Deep Learning",correct: false}
        ]
    },

    {
        question: "When building a machine learning model, what is the process of selecting and preparing the most relevant data points called?",
        answers: [
            {text: "Model Training",correct: false},
            {text: "Feature Selection",correct: true},
            {text: "Data Cleaning",correct: false},
            {text: "Hyperparameter Tuning",correct: false}
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