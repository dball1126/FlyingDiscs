
function disablePlayButton() {
    document.querySelector(".playGameButton").disabled = true;
    
}

document.querySelector(".playGameButton").addEventListener("click", drawCanvas);
