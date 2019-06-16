

function disablePlayButton() {
    document.querySelector(".playGameButton").disabled = true;
}

function disableMediumButton() {
    document.querySelector(".playMediumButton").disabled = true;
   
}

function disabledHardButton() {
    document.querySelector(".playHardButton").disabled = true;
}


const canvas = document.getElementById("flyingCanvas");
const ctx = canvas.getContext("2d");
function levelEasy() {
    
    overlay();
    // setTimeout(function () { document.location.reload(); }, 2000);
    // setTimeout((setInterval(draw, 10)), 2000);
    setTimeout(Game, 3000);
    
    // startMessage();
    // endMessage();
    // let timerId = setTimeout(drawScoreMessage1, 1000);
    // overlay();
    // clearTimeout(timerId);

    
}

function levelMedium(){
    overlay();
    // var g = Game(70, 10);
    setTimeout(function () {
        Game(70, 10);
    }, 3000);
    
}

function levelHard(){
    overlay();
    setTimeout(function () {
        Game(110, 11);
    }, 3000);
    
}

const drawScoreMessage1 = () => {
    
    const scoreTemplateM = `<div class="alert-box-score"><p>${0}</p></div>`;
    render(scoreTemplateM, document.querySelector('#message1'));
  
    
    
}



function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = "hidden";
}

// var c = 0;
// var t;
// var timer = 0;

// function startMessage(){
   
//       t = setTimeout(drawScoreMessage1(), 1000);
//     setTimeout(drawScoreMessage1, clearTimeout(drawScoreMessage1()) , 2000);
  
// }

// function endMessage(){
//     clearTimeout(t);
//     timer = 0;
// }



// document.getElementById(".playMediumButton").addEventListener("click", Game);
document.querySelector(".playMediumButton").addEventListener("click", levelMedium);
document.querySelector(".playHardButton").addEventListener("click", levelHard);
document.querySelector(".playGameButton").addEventListener("click", levelEasy);