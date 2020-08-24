// Define variables

// get start button element
var startButtonEl = document.querySelector("#start-btn");
// get timer element
var timerEl = document.querySelector(".display-time");
// get highscore element
var highScoreEl = document.querySelector(".display-highscore");
// get wrapper
var wrapperEl = document.querySelector(".main-content")
// define question element
var questionEl
// define answer container element
var answerElContainer
// define answer element
var answerEl
// define current question
var currentQuestion;
// define timeleft
var timeLeft;

var questions = [
    {
        question: "What command is used to open a file in vscode?",
        answers : ["touch", "code", "mkdir", "cd"],
        correctAnswer: 2,
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers : ["=", "==", "===", "all of the above"],
        correctAnswer: 0,
    }, 
    {
        question: "What is the index of the first item in an array?",
        answers : ["0", "1", "i", "none of the above"],
        correctAnswer: 0,
    }, 
    {
        question: "What is the correct syntax to add a child element in javascript?",
        answers : [".addChild", ".createChild", ".appendChild", ".addElement"],
        correctAnswer: 2,
    }, 
    {
        question: "Which of the following are NOT a common data type?",
        answers : ["number", "boolean", "null", "character"],
        correctAnswer: 3,
    }, 
    {
        question: "Which of the following is the correct way to create a function?",
        answers : ["var sampleFunction = function()", "function sampleFunction()", "all of the above", "none of the above"],
        correctAnswer: 2,
    },
]




var startQuiz = function(event) {
    // remove initial content
    wrapperEl.innerHTML = "";
    // create new elements
    questionEl = document.createElement("h2");
    questionEl.className = "question-heading";

    answerElContainer = document.createElement("ol");
    answerElContainer.className = "answer-btn-container"

    answerEl = document.createElement("li");
    answerEl.className = "answer-btn";

    wrapperEl.appendChild(questionEl);
    wrapperEl.appendChild(answerEl);

    // set timer
    timeLeft = 75;
    // start at question 0
    currentQuestion = 0;
    // go to next question
    nextQuizQuestion(currentQuestion);
    // start timer
    countDown();

    // move content to left align
    
}

var countDown = function() {
    // set timer 
    timerEl.textContent = timeLeft;

    // use setInterval to countdown
    var timeInterval = setInterval(function(){
        if (timeLeft > 0 && currentQuestion != questions.length){
            timeLeft--;
            timerEl.textContent = timeLeft;
        }
        else if (timeLeft === 0){
            clearInterval(timeInterval);

            // end game
            endGame();
        }
        // stop timer when you finish questions
        else if (currentQuestion == questions.length){
            clearInterval(timeInterval);

            // update time display
            timeDisplayEl.textContent = timeLeft;
        }
    }, 1000);
}

var nextQuizQuestion = function() {
    // display question
    questionEl.textContent = questions[currentQuestion].question;
    // display answers 
    for (i = 0; i < questions[currentQuestion].answers.length; i++) {
    answerEl[i] = questions[currentQuestion].answers[i];
    }

}





// click even listeners
startButtonEl.addEventListener("click", startQuiz);