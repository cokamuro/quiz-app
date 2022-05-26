var myState = 0;  //0=start, 1=quiz, 2=end  Enum?
var currentQuestionNumber = 0;
var timeRemain = 30;
var questions = [];
var answersCorrect = 0;

var elStart = document.querySelector("#quiz-intro");
var elQuiz = document.querySelector("#quiz-actual");
var elEnd = document.querySelector("#quiz-end");
var elQuestionText = document.querySelector("#question-text");
var elAnswers = document.querySelector("#answers");
var elCorrectQuestions = document.querySelector("#correct-questions");
var elScore = document.querySelector("#score");
var elCountdownDiv = document.querySelector("#countdown-div");

function displayState() {

    elStart.style.display = 'none';
    elQuiz.style.display = 'none';
    elEnd.style.display = 'none';
    if (myState == 0) { elStart.style.display = 'block' };
    if (myState == 1) { elQuiz.style.display = 'block' };
    if (myState == 2) { elEnd.style.display = 'block' };
}

function init() {
    displayState();
    setupQuestions();
}

function setupQuestions() {
    //pushing individual question objects into the questions collection
    //struct includes question text, an array of answers, and the array index
    //of the correct answer
    var question = {
        text: "What are the units of time specified in the setInterval function?",
        answers: ["microseconds", "seconds", "milliseconds", "minutes"],
        correctAnswer: 2
    };
    addQuestion(question);
    question = {
        text: "The color #ffffff is:",
        answers: ["black", "white", "50% grey", "red", "green", "blue"],
        correctAnswer: 1
    };
    addQuestion(question);
    question = {
        text: "You can nest objects within other objects",
        answers: ["true", "false"],
        correctAnswer: 0
    };
    addQuestion(question);
    question = {
        text: "A function that calls itself is",
        answers: ["encaspulated", "a lambda", "lonely", "recursive"],
        correctAnswer: 3
    };
    addQuestion(question);
    question = {
        text: "The line termination character for lines of code in JavaScript is:",
        answers: [";", "}", "/n", ")"],
        correctAnswer: 0
    };
    addQuestion(question);
}

function addQuestion(thisQuestion) {
    questions.push(thisQuestion);
}

function displayQuestion() {
    var currentQuestion = questions[currentQuestionNumber];

    //clear out any existing li elements on the ol
    while (elAnswers.children.length != 0) {
        elAnswers.removeChild(elAnswers.childNodes[0]);
    }

    //set the question text
    elQuestionText.textContent = currentQuestion.text;
    var answer

    //add the answers as li elements to the ol
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        answer = document.createElement("li");
        //add the selection number to the data tags so the click event
        //can evaluate if the selection was correct
        answer.dataset.selection = i;
        answer.textContent = currentQuestion.answers[i];
        elAnswers.appendChild(answer);
    }
}

function startQuiz() {
    myState = 1;
    displayState();
    updateCountdownTimer();
    displayQuestion();
    var timerCountdown = setInterval(function () {
        timeRemain--;
        updateCountdownTimer();
        if (timeRemain <= 5) {
            elCountdownDiv.style.color = "red";
        }
        if (timeRemain == 0) {
            clearInterval(timerCountdown);
            endQuiz();
        }
    }, 1000);
}

function updateCountdownTimer() {
    var suffix = " seconds"

    if (timeRemain == 1) { suffix = " second" }
    document.querySelector("#countdown-timer").textContent = timeRemain + suffix + " remaining";
}

function endQuiz() {
    myState = 2;
    displayState();

    //update result page spans
    elScore.textContent = timeRemain;
    elCorrectQuestions.textContent = answersCorrect;
}

document.querySelector("#start-quiz-button").addEventListener("click", startQuiz);
elAnswers.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("li")) {
        //evaluate if the answer was correct
        if (questions[currentQuestionNumber].correctAnswer == element.dataset.selection) {
            answersCorrect++;
        } else {
            timeRemain -= 5;
        }

        //navigate to the next question, or to the end of the quiz
        if (currentQuestionNumber != questions.length - 1) {
            currentQuestionNumber++;
            displayQuestion();
        } else {
            myState = 2;
            endQuiz();
        }
    }
});
document.querySelector("#submit-high-score").addEventListener("click", function () {
    var highScores = [];
    var playerInitials = document.querySelector("#playerInitials").value;
    if (playerInitials.length>0) {
        //set object with high score
        var currentScore = {
            initials: playerInitials,
            score: timeRemain
        }

        //read existing high scores
        var existingScores = localStorage.getItem("highScores");
        if (existingScores != "") {
            highScores = JSON.parse(existingScores) || [];
        }

        //add object to high scores
        highScores.push(currentScore);

        //sort the array from highest to lowest score
        highScores.sort((a, b) => {
            return b.score - a.score;
        })

        //store high scores
        localStorage.setItem("highScores", JSON.stringify(highScores));

        //navigate to high scores page
        window.location.replace("highscores.html");
    } else {
        alert("You must enter initials to join the leaderboard!");
    }
});


init();

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question (75 seconds)
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock (15 seconds)
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

//start the quiz
//show intro with start button
//on click, start timer
//on timer, decrement counter
//5 questions (?)
//on answer, eval correct/incorrect - show right or wrong before moving
//on correct,(sound?)
//on incorrect, deduct time (sound?)
//score is remaining time at the end of test
//on end of timer
//clear interval
//display score
//save initials
//display high scores, prompt to start again or clear scores
