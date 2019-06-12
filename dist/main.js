 
var canvas = document.getElementById("flyingCanvas");
var ctx = canvas.getContext("2d");

var target = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('mousedown', 
    function(event) {
        target.x = event.clientX - canvas.offsetLeft;
        target.y = event.clientY - canvas.offsetTop;
        //target position
    });

var explosionID = "ON FIRE";
var yesID = "YES";
var clappingID = "EXCELLENT";
var soundID = 0;

function loadSound() {
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]); //Set HTMLAudioPlugin first due to an error for WebAudio  Plugin
    createjs.Sound.registerSound("assets/explosion.mp3", explosionID);
    createjs.Sound.registerSound("assets/yes.mp3", yesID);
    createjs.Sound.registerSound("assets/clapping.mp3", clappingID);
}

function playSound(){
    this.sounds = [explosionID, yesID, clappingID];
    // this.rand = Math.floor(Math.random() * Math.floor(3));
    createjs.Sound.play(this.sounds[soundID]);
    
    return sounds[soundID];
}



var x = canvas.width / 7;
var y = canvas.height / 1.2;
var dx = 3.6;
var dy = -1.9;    //metrics for speed velocity of the discs
var status = 1;
var score = 0;
//Discs
var discRadius = 50;   //size of the disc

var discArray = [];

function turn(){
    for (let i = 0; i < 8; i++) {
    //initiation of discs
        var xx = Math.random() * (canvas.width / 7);
        var yy = Math.random() * (canvas.height / 1.2);
    
        var dxx = (Math.random()) * 3.6;
        var dyy = (Math.random()) * -1.9;
        var radius = 50;
        discArray.push(new Disc(xx, yy, dxx, dyy, radius, status));
    }
}
turn();

function collisionDetection(){
    for (let i = 0; i < discArray.length; i++) {
        var unit = discArray[i];
        if (unit.status == 1){
            if(target.x > unit.x && target.x < unit.x+unit.discRadius && target.y > unit.y && target.y < unit.y+unit.discRadius){
                unit.status = 0;   //change disc status
                score++;  //score count
                if(score == discArray.length){
                    // alert("ON FiRE!");  //TURN OVER
                    // document.location.reload();
                    // clearInterval(interval);
                    let sounder = playSound();
                    soundID += 1;
                    //Message for Main Footer
                    const footerMessage = `${sounder}`;
                    const footerTemplate = `<h1>${footerMessage}</h1>`;
                    render(footerTemplate, document.querySelector('#footer-messages'));

                    const leftMessage = `${sounder}`;
                    const leftTemplate = `<h1 class="sideMessage">${leftMessage}</h1>`;
                    render(leftTemplate, document.querySelector('#left-sidebar'));


                    const rightMessage = `${sounder}`;
                    const rightTemplate = `<h1 class="sideMessage">${rightMessage}</h1>`;
                    render(rightTemplate, document.querySelector('#right-sidebar'));
                    

                    turn();  //REPEAT TURN INDEFINITELY UNTIL THEY LOSE
                }
            }
        }
    }
}

function drawScore() {
    
    ctx.font = "16px Sans Serif";
    ctx.fillStyle = 'red';
    ctx.fillText("Score: "+score, 8, 20);
}

function drawMessage(){
    ctx.font = "32px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("ON FIRE!", 8, 20);
}

//render method  vanilla javascript
var render = function (template, node){ //Render Method
    if(!node) return;
    node.innerHTML = template;
}


//Message for Main Header
const titleMessage = "Flying Saucers";
const titleTemplate = `<h1>${titleMessage}</h1>`;
render(titleTemplate, document.querySelector('#title-messages'));



function Disc(x, y, dx, dy, discRadius, status){  //Disc class
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.discRadius = discRadius;
    this.status = status;
    this.imageWidth = 144; //actual width and height of the disc.png
    this.imageHeight = 62;
   



    this.draw = function(){
        var image = new Image();
        image.onload = Disc;
        // image.src = "https://i.imgur.com/RHcGquG.png";
        image.src = "assets/discgrey.png";
        
        ctx.beginPath();
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        
        ctx.drawImage(image, this.x, this.y, this.imageWidth, this.imageHeight);
        
        ctx.arc(this.x, this.y, this.discRadius, 0, Math.PI * 2, false); //arc along with up above
      
        ctx.closePath();
    }

    this.update = function(){   //WHERE THE REAL MAGIC HAPPENS  the disc is drawn here.
        if (this.y + this.discRadius > canvas.height || this.y - this.discRadius < 0){
            this.dy = -this.dy;
        } else if (this.x > canvas.width){  //Does the disc fall off the right side of the screen
            //GAME OVER
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
        
       
        this.x += this.dx;  //arc speed along with up above
        this.y += this.dy;
        this.imageWidth -=.09;  //change size of image as game progresses
        this.imageHeight -=.009;  // Height should get smaller due to it being less than half of the width of the disc
        
        this.draw();
       
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < discArray.length; i++) {
        if(discArray[i].status == 1){  //check if the disc has been hit
        discArray[i].update();   //discs continually drawn 
        } 
    }
    collisionDetection();
       
   
    drawScore();
   
    x += dx;
    y += dy * Math.random(199);     //set for the speed of the discs
  
}

var interval = setInterval(draw, 10);
