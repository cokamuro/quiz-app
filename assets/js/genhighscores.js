    //read existing high scores
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var elHighScoreTable=document.querySelector("#high-scores");

    if(highScores.length>0){
        for(var i=0;i<highScores.length;i++){
            var newRow = document.createElement("tr");
            var newInitialColumn = document.createElement("td");
            newInitialColumn.textContent=highScores[i].initials;
            var newScoreColumn = document.createElement("td");
            newScoreColumn.textContent=highScores[i].score;
            newRow.appendChild(newInitialColumn);
            newRow.appendChild(newScoreColumn);
            elHighScoreTable.appendChild(newRow);
        }
    }
