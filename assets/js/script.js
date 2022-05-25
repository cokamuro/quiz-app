var myState = 0;  //0=start, 1=quiz, 2=end  Enum?
var currentQuestionNumber = 0;
var timeRemain = 5; 
var questions=[];

var elStart=document.querySelector("#quiz-intro");
var elQuiz=document.querySelector("#quiz-actual");
var elEnd=document.querySelector("#quiz-end");
var elQuestionText=document.querySelector("#question-text");
var elAnswers=document.querySelector("#answers");

function displayState(){

    elStart.style.display='none';
    elQuiz.style.display='none';
    elEnd.style.display='none';
    if(myState ==0){elStart.style.display = 'block'};
    if(myState ==1){elQuiz.style.display = 'block'};
    if(myState ==2){elEnd.style.display = 'block'};
}

function init(){
    displayState();
    setupQuestions();
}

function setupQuestions(){
    var question = {
        text: "What are the units of time specified in the setInterval function?",
        answers: ["microseconds","seconds","milliseconds","minutes"],
        correctAnswer: 2
    };
    addQuestion(question);
    question = {
        text: "question 2",
        answers: ["a","b","c","d"],
        correctAnswer: 1
    };
    addQuestion(question);
    question = {
        text: "question 3",
        answers: ["a","b","c","d"],
        correctAnswer: 1
    };
    addQuestion(question);
    question = {
        text: "question 4",
        answers: ["a","b","c","d"],
        correctAnswer: 1
    };
    addQuestion(question);
    question = {
        text: "question 5",
        answers: ["a","b","c","d"],
        correctAnswer: 1
    };
    addQuestion(question);
}

function addQuestion(thisQuestion){
    questions.push(thisQuestion);
}

function displayQuestion(){
    var currentQuestion=questions[currentQuestionNumber];
    console.log(elQuestionText,currentQuestion.text)
    for(var i=0;i<elAnswers.children.length;i++){
        elAnswers.childNodes[i].removeChild();
    }
    elQuestionText.textContent=currentQuestion.text;
    var answer
    for(var i=0;i<currentQuestion.answers.length;i++){
        answer = document.createElement("li");
        answer.dataset.selection=i;
        answer.textContent = currentQuestion.answers[i];

        elAnswers.appendChild(answer);
    }
}

document.querySelector("#start-quiz-button").addEventListener("click", startQuiz);
elAnswers.addEventListener("click", function(event) {
    var element = event.target;
    
    console.log(element);
    if(element.matches("li")){
      
      alert(element.dataset.selection);
      
    }
  });

function startQuiz(){
    myState=1;
    displayState();
    updateCountdownTimer();
    displayQuestion();
    var timerCountdown = setInterval(function() {
        timeRemain--;
        updateCountdownTimer();
        if(timeRemain == 0) {
          clearInterval(timerCountdown);
        endQuiz();
        }
      }, 1000);
}

function updateCountdownTimer(){
    document.querySelector("#countdown-timer").textContent=timeRemain;
}

function endQuiz(){
    myState=2;
    displayState();
}

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
