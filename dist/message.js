

//render method  vanilla javascript
const render = function (template, node) { //Render Method
    if (!node) return;
    node.innerHTML = template;
}


//Message for Main Header
const titleMessage = "Flying Saucers";
const titleTemplate = `<h1>${titleMessage}</h1>`;
render(titleTemplate, document.querySelector('#title-messages'));