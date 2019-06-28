//render method  vanilla javascript


const render = function (template, node) { //Render Method
    if (!node) return;
    node.innerHTML = template;
}

const drawGameOverMessage = () => {
    const loseTemplate = `<div class="alert-box-lose"><p class="game-win-lose">GAME OVER</></div>`;
    render(loseTemplate, document.querySelector('#message1'));
    
}

const drawGameWonMessage = () => {
    const winTemplate = `<div class="alert-box-win"><p class="game-win-lose">You Win</></div>`;
    render(winTemplate, document.querySelector('#message1'));
    
}



//Message for Main Header
const titleMessage = "Flying Saucers";
const titleTemplate = `<h1>${titleMessage}</h1>`;
render(titleTemplate, document.querySelector('#title-messages'));