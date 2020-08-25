// Define variables

// get start button element
var startButtonEl = document.querySelector("#start-btn");
// get timer element
var timerEl = document.querySelector(".display-time");
// get highscore element
var highScoreEl = document.querySelector(".display-highscore");
// get initial content element
var initialContentEl = document.querySelector(".initial-content");
// get quiz content element
var quizEl = document.querySelector(".quiz-content")
// define question element
var questionEl = document.querySelector(".question-container");
// define answer container element
var answerElContainer = document.querySelector(".answer-container");
// define answer button element
var answerBtnEl = document.querySelector("answer-btn");
// correct answer alert
var correctAlertEl = document.querySelector(".correct-alert")
// define current question
var currentQuestion;
// define timeleft
var timeLeft;
// define current score;
var currentScore = document.querySelector(".current-score");
// submit form
var form = document.querySelector("#form")
// high score
var highScore = 0;
var storedHighScore = 0;
var storedInitials = "XX";


var questions = [
    {
        question: "What command is used to open a file in vscode?",
        answers: ["touch", "code", "mkdir", "cd"],
        correctAnswer: 1,
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: ["=", "==", "===", "all of the above"],
        correctAnswer: 0,
    },
    {
        question: "What is the index of the first item in an array?",
        answers: ["0", "1", "i", "none of the above"],
        correctAnswer: 0,
    },
    {
        question: "What is the correct syntax to add a child element in javascript?",
        answers: [".addChild", ".createChild", ".appendChild", ".addElement"],
        correctAnswer: 2,
    },
    {
        question: "Which of the following are NOT a common data type?",
        answers: ["number", "boolean", "null", "character"],
        correctAnswer: 3,
    },
    {
        question: "Which of the following is the correct way to create a function?",
        answers: ["var sampleFunction = function()", "function sampleFunction()", "all of the above", "none of the above"],
        correctAnswer: 2,
    },
]




var startQuiz = function (event) {
    // remove initial content
    document.getElementById("initial-content").style.display = "none";
    // reveal quiz content
    document.getElementById("quiz-content").style.display = "flex";
    // align answers left
    document.getElementById("answer-container").style.justifySelf = "flex-start";
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

var countDown = function () {
    // set timer 
    timerEl.textContent = timeLeft;

    // use setInterval to countdown
    var timeInterval = setInterval(function () {
        if (timeLeft > 0 && currentQuestion != questions.length) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        }
        else if (timeLeft === 0) {
            clearInterval(timeInterval);

            // end game
            endGame();
        }
        // stop timer when you finish questions
        else if (currentQuestion == questions.length) {
            clearInterval(timeInterval);

            // update time display
            // timeDisplayEl.textContent = timeLeft;
        }
    }, 1000);
}

var nextQuizQuestion = function () {
    // display question
    questionEl.textContent = questions[currentQuestion].question;
    // display answers 
    for (i = 0; i < questions[currentQuestion].answers.length; i++) {
        answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn btn";
        answerBtnEl.id = [i];
        // set text content
        answerBtnEl.textContent = questions[currentQuestion].answers[i];
        // append child to the container
        answerElContainer.appendChild(answerBtnEl);
    }

    correctAlertEl.innerHTML = "";
};

var checkAnswer = function () {
    var clickedAnswer = event.target.closest(".answer-btn");
    // console.log(clickedAnswer.id);

    if (clickedAnswer.id == questions[currentQuestion].correctAnswer) {
        // console.log("correct")
        correctAlertEl.textContent = "Correct!"
        // currentCorrect++;
    } else {
        // console.log("incorrect")
        correctAlertEl.textContent = "Incorrect!"
        timeLeft -= 10;
    }

    setTimeout(function () {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            // reset container
            answerElContainer.innerHTML = "";
            // call next question
            nextQuizQuestion(currentQuestion)
        } else {
            // if no more questions then end the game

            endGame();
            clearInterval();
        }
    }, 1000)
}

var endGame = function () {
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("end-game-screen").style.display = "flex";
    document.getElementById("current-score").textContent = timeLeft;
}

var saveScore = function() {
    var name = document.getElementById("initials").value;

    if (!name) {
        event.preventDefault();
        alert("Please enter your initals")
    } else {
        if (timeLeft > storedHighScore) {
            localStorage.setItem("initials", name);
            localStorage.setItem("highscore", timeLeft)
            console.log("thanks for playing")
        } else {
            storedHighScore = highScore;
            storedInitials = name;
        }
    }
    
    loadScore();
    location.reload();
    return false;
}

var loadScore = function() {
    storedHighScore = localStorage.getItem("highscore");
    storedInitials = localStorage.getItem("initials");

    document.getElementById("display-highscore").textContent = storedHighScore;
    document.getElementById("name-highscore").textContent = storedInitials;
}





// click event listeners
startButtonEl.addEventListener("click", startQuiz);
answerElContainer.addEventListener("click", checkAnswer);
form.addEventListener("submit", saveScore);

loadScore();