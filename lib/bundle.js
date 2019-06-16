/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/main.js":
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Game(winningScore = 32, saucerCount = 8) {\n\n    disableMediumButton();\n    disabledHardButton();\n    disablePlayButton();\n   \n    const canvas = document.getElementById(\"flyingCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n    var gameOver;\n    var gameWon;\n    var gameStatus = 1;\n    var gameCount = 0;\n    let x = canvas.width / 7;\n    let y = canvas.height / 1.2;\n    let dx = 3.6;\n    let dy = -1.9;    //metrics for speed velocity of the discs\n    let status = 1;\n    let score = 0;\n    this.winningScore = winningScore;\n    this.saucerCount = saucerCount;\n    let saucerArray = [];\n    var realScore = 0;\n    const target = {\n        x: undefined,\n        y: undefined\n    }\n\n    canvas.addEventListener('mousedown',\n        function (event) {\n            target.x = event.clientX - canvas.offsetLeft;\n            target.y = event.clientY - canvas.offsetTop; //target position\n            shootTarget();\n        });\n\n    function collisionDetection() {\n        for (let i = 0; i < saucerArray.length; i++) {\n            var unit = saucerArray[i];\n            if (unit.status == 1) {\n                if (target.x > unit.x && target.x < unit.x + unit.saucerRadius && target.y > unit.y && target.y < unit.y + unit.saucerRadius) {\n                    unit.status = 0;   //change saucer status\n                    score++;  //score count\n                    \n                    if (score >= winningScore) {//GAME WON \n                        gameWon = true;\n                    }\n\n                    if (score == saucerArray.length && !gameOver && !gameWon) {\n            \n                        let sounder = playSound();\n                        soundID += 1; //increment  per level completed\n                        //Messages FOR ALL left right and bottom sidebar/footer\n                        const footerMessage = `${sounder}`;\n                        const footerTemplate = `<h1>${footerMessage}</h1>`;\n                        render(footerTemplate, document.querySelector('#footer-messages'));\n\n                        const leftMessage = `${sounder}`;\n                        const leftTemplate = `<p class=\"sideMessage\">${leftMessage}</p>`;\n                        render(leftTemplate, document.querySelector('#left-sidebar'));\n\n                        const rightMessage = `${sounder}`;\n                        const rightTemplate = `<p class=\"sideMessage\">${rightMessage}</p>`;\n                        render(rightTemplate, document.querySelector('#right-sidebar'));\n\n                        turn();  //REPEAT TURN INDEFINITELY UNTIL THEY LOSE\n                    }\n                }\n            }\n        }\n    }\n\n    const turn = () => {\n        for (let i = 0; i < saucerCount; i++) {\n            //initiation of saucers\n            const xx = Math.random() * (canvas.width / 7);\n            const yy = Math.random() * (canvas.height / 1.2);\n            const dxx = (Math.random()) * 3.6;\n            const dyy = (Math.random()) * -1.9;\n            const radius = 50;\n            saucerArray.push(new Saucer(xx, yy, dxx, dyy, radius, status));\n        }\n    }\n\n    function Saucer(x, y, dx, dy, saucerRadius, status) {  //saucer class\n        this.x = x;\n        this.y = y;\n        this.dx = dx;\n        this.dy = dy;\n        this.saucerRadius = saucerRadius;\n        this.status = status;\n        this.imageWidth = 144; //actual width and height of the saucer.png\n        this.imageHeight = 131; //changed from 66 to 131 when the image was changed;\n\n        this.draw = function () {\n            const image = new Image();\n            image.onload = Saucer;\n            image.src = \"assets/saucer5.gif\"; //image courtesy of Acura from Gify.com\n            ctx.beginPath();\n            ctx.webkitImageSmoothingEnabled = false;\n            ctx.mozImageSmoothingEnabled = false;\n            ctx.imageSmoothingEnabled = false;\n\n            ctx.drawImage(image, this.x, this.y, this.imageWidth, this.imageHeight);\n            ctx.arc(this.x, this.y, this.saucerRadius, 0, Math.PI * 2, false); //arc along with up above\n            ctx.closePath();\n        }\n\n        this.update = function () { \n              //WHERE THE REAL MAGIC HAPPENS  the saucer is drawn here.\n            if (this.x > canvas.width || this.imageWidth <= 0 || this.imageHeight <= 0) {  //Does the saucer fall off the right side of the screen\n                    gameOver = true;\n            } else if \n                (this.y + this.saucerRadius > canvas.height || this.y - this.saucerRadius < 0) {\n                    this.dy = -this.dy;\n            }\n            this.x += this.dx;  //arc speed along with up above\n            this.y += this.dy;\n            this.imageWidth -= .09;  //change size of image as game progresses\n            this.imageHeight -= .09;  // Height should get smaller due to it being less than half of the width of the saucer\n                        //changed from .009 to .09 when image was changed to 131px long\n            this.draw();\n        }\n    }\n    \n    const drawScore = () => {\n        const scoreTemplate = `<p>Score: ${score}</p>`;\n        render(scoreTemplate, document.querySelector('#score'))\n    }\n    const drawScoreMessage = () => {\n        const scoreTemplateM = `<div class=\"alert-box-score\"><p>${score}</p></div>`;\n        render(scoreTemplateM, document.querySelector('#message1'));\n    }\n\n    function draw() { //Frames drawn section\n        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear frames\n        \n        for (let i = 0; i < saucerArray.length; i++) {\n            if (saucerArray[i].status == 1) {  //check if the saucer has been hit\n                saucerArray[i].update();   //saucers continually drawn \n            }\n        }\n        collisionDetection();\n        if (gameWon && !gameOver){ //Game Won\n            \n            for (gameCount; gameCount < gameStatus; gameCount++) {\n                ctx.clearRect(0, 0, canvas.width, canvas.height); //clear frames\n                gameWonSound();\n                drawScoreMessage();\n                drawGameWonMessage();\n                setTimeout(function () { clearInterval(interval); }, 1000);\n                setTimeout(function () { document.location.reload(); }, 3000);\n            }\n        }\n        if (gameOver && !gameWon){ // Game Over \n            for (gameCount; gameCount < gameStatus; gameCount++) {\n                ctx.clearRect(0, 0, canvas.width, canvas.height); //clear frames\n\n                gameOverSound();\n                drawGameOverMessage();\n                setTimeout(function () { clearInterval(interval); }, 3000);\n                setTimeout(function () { document.location.reload();}, 3000);\n            }\n        }\n        drawScore();\n        // if(score > 0)realScore = score;\n        \n        x += dx;\n        y += dy * Math.random(199);     //set for the speed of the saucers\n    }\n    \n    turn();\n    var interval = setInterval(draw, 10);\n}\n\n//# sourceURL=webpack:///./dist/main.js?");

/***/ })

/******/ });