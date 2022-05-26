//read existing high scores
var retScores = localStorage.getItem("highScores");
var elHighScoreTable = document.querySelector("#high-scores");

if (retScores != "") {
    var highScores = JSON.parse(retScores) || [];


    if (highScores.length > 0) {
        for (var i = 0; i < highScores.length; i++) {
            var newRow = document.createElement("tr");
            var newInitialColumn = document.createElement("td");
            newInitialColumn.textContent = highScores[i].initials;
            var newScoreColumn = document.createElement("td");
            newScoreColumn.textContent = highScores[i].score;
            newRow.appendChild(newInitialColumn);
            newRow.appendChild(newScoreColumn);
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