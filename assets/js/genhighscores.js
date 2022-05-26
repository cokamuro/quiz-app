//read existing high scores
var retScores = localStorage.getItem("highScores");
var elHighScoreTable = document.querySelector("#high-scores");

//if localStorage value is not blank
if (retScores != "") {
    var highScores = JSON.parse(retScores) || [];

    //iterate through the scores
    if (highScores.length > 0) {
        for (var i = 0; i < highScores.length; i++) {
            //create table row
            var newRow = document.createElement("tr");
            //create table column for initials
            var newInitialColumn = document.createElement("td");
            newInitialColumn.textContent = highScores[i].initials;
            //create table column for score
            var newScoreColumn = document.createElement("td");
            newScoreColumn.textContent = highScores[i].score;
            //attach columns to row
            newRow.appendChild(newInitialColumn);
            newRow.appendChild(newScoreColumn);
            //attach row to table
            elHighScoreTable.appendChild(newRow);
        }
    } 
}



document.querySelector("#clear-scores").addEventListener("click", function () {
    //clear all scores
    localStorage.setItem("highScores", "");

    //navigate to high scores page
    window.location.replace("highscores.html");
});

document.querySelector("#relaunch").addEventListener("click", function () {
    //navigate to code quiz
    window.location.replace("index.html");
});