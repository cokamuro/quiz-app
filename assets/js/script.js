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
    //this function manages the visibility of divs within my main document,
    //based on the selected state
    elStart.style.display = 'none';
    elQuiz.style.display = 'none';
    elEnd.style.display = 'none';
    if (myState == 0) { elStart.style.display = 'block' };
    if (myState == 1) { elQuiz.style.display = 'block' };
    if (myState == 2) { elEnd.style.display = 'block' };
}

function init() {
    //initializes based on starting displayState (0)
    displayState();
    //populate question array
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
    //set state to active quiz (1)
    myState = 1;
    //refresh screen based on selected state
    displayState();
    //call timer display function to get initial readout before timer event fires
    updateCountdownTimer();
    //populate the 0 array position question
    displayQuestion();

    //timer function 
    var timerCountdown = setInterval(function () {
        //check to make sure that the state is still in quiz (1)
        if (myState==1){
            //decrement time remaining
            timeRemain--;
            //update timer display on the page
            updateCountdownTimer();

            if (timeRemain <= 5) {
                //change countdown display to red in the last 5 seconds
                elCountdownDiv.style.color = "red";
            }
            if (timeRemain == 0) {
                //time ran out.  shut down timer and call end quiz
                clearInterval(timerCountdown);
                endQuiz();
            }
        } else {
            //if the state is no longer in quiz, as can happen if the questions are all completed
            //shut down the timer
            clearInterval(timerCountdown);
        }
        
    }, 1000);
}

function updateCountdownTimer() {
    var suffix = " seconds"

    //update timer display, and account for non-plural second (vs. seconds)
    if (timeRemain == 1) { suffix = " second" }
    document.querySelector("#countdown-timer").textContent = timeRemain + suffix + " remaining";
}

function endQuiz() {
    //set state to end (2).  important for timer
    myState = 2;
    //refresh display with current state
    displayState();

    //update result page spans
    elScore.textContent = timeRemain;
    elCorrectQuestions.textContent = answersCorrect;
}

//start quiz event listener
document.querySelector("#start-quiz-button").addEventListener("click", startQuiz);

//event listener for dynamically created li elements
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

//event listener for submitting high score
document.querySelector("#submit-high-score").addEventListener("click", function () {
    var highScores = [];
    var playerInitials = document.querySelector("#playerInitials").value+" ";
    
    //account for blank value in localStorage
    if (playerInitials!==" ") {
        //set initials to uppercase and trim leading/trailing spaces
        playerInitials=playerInitials.trim().toUpperCase();
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
        //user must enter a value for initials
        alert("You must enter initials to join the leaderboard!");
    }
});

//start application
init();
