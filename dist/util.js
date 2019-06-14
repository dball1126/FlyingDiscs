
function disablePlayButton() {
    document.querySelector(".playGameButton").disabled = true;
}

function disableMediumButton() {
    document.querySelector(".playMediumButton").disabled = true;
   
}

function levelEasy() {
    drawCanvas();
}

function levelMedium(){
    drawCanvas(50, 10);
}
// document.getElementById(".playMediumButton").addEventListener("click", drawCanvas);
document.querySelector(".playMediumButton").addEventListener("click", levelMedium);
document.querySelector(".playGameButton").addEventListener("click", levelEasy);
