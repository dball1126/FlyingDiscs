
function disablePlayButton() {
    document.querySelector(".playGameButton").disabled = true;
}

function disableMediumButton() {
    document.querySelector(".playMediumButton").disabled = true;
   
}

function disabledHardButton() {
    document.querySelector(".playHardButton").disabled = true;
}


function levelEasy() {
    drawCanvas();
}

function levelMedium(){
    drawCanvas(50, 10);
}

function levelHard(){
    drawCanvas(90, 11);
}


// document.getElementById(".playMediumButton").addEventListener("click", drawCanvas);
document.querySelector(".playMediumButton").addEventListener("click", levelMedium);
document.querySelector(".playHardButton").addEventListener("click", levelHard);
document.querySelector(".playGameButton").addEventListener("click", levelEasy);
