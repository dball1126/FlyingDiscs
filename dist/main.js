

function drawCanvas() {
    
    disablePlayButton(); //Disabled game until clicked
    const canvas = document.getElementById("flyingCanvas");
    const ctx = canvas.getContext("2d");
    var gameOver;
    var gameWon;
    let x = canvas.width / 7;
    let y = canvas.height / 1.2;
    let dx = 3.6;
    let dy = -1.9;    //metrics for speed velocity of the discs
    let status = 1;
    let score = 0;
    let saucerRadius = 50;   //size of the saucer

    let saucerArray = [];

    
    const target = {
        x: undefined,
        y: undefined
    }

    canvas.addEventListener('mousedown',
        function (event) {
            target.x = event.clientX - canvas.offsetLeft;
            target.y = event.clientY - canvas.offsetTop;
            //target position
           
        });


    function collisionDetection() {
        for (let i = 0; i < saucerArray.length; i++) {
            var unit = saucerArray[i];
            if (unit.status == 1) {
                if (target.x > unit.x && target.x < unit.x + unit.saucerRadius && target.y > unit.y && target.y < unit.y + unit.saucerRadius) {
                    unit.status = 0;   //change saucer status
                    score++;  //score count
                    
                    if (score >= 28) {
                        gameWonSound();
                        drawGameWonMessage();
                        // alert("YOU WiN");
                        gameWon = true;
                        setTimeout(function () { clearInterval(interval); }, 3000);
                        setTimeout(function () { document.location.reload(); }, 3000);
                    }
                    if (score == saucerArray.length) {
                        // alert("ON FiRE!");  //TURN OVER
                        // document.location.reload();
                        // clearInterval(interval);
                        let sounder = playSound();
                        soundID += 1; //increment  per level completed

                        //Messages FOR ALL left right and bottom sidebar/footer
                        const footerMessage = `${sounder}`;
                        const footerTemplate = `<h1>${footerMessage}</h1>`;
                        render(footerTemplate, document.querySelector('#footer-messages'));

                        const leftMessage = `${sounder}`;
                        const leftTemplate = `<p class="sideMessage">${leftMessage}</p>`;
                        render(leftTemplate, document.querySelector('#left-sidebar'));


                        const rightMessage = `${sounder}`;
                        const rightTemplate = `<p class="sideMessage">${rightMessage}</p>`;
                        render(rightTemplate, document.querySelector('#right-sidebar'));


                        turn();  //REPEAT TURN INDEFINITELY UNTIL THEY LOSE
                    }
                }
            }
        }
    }

    const turn = () => {
        for (let i = 0; i < 8; i++) {
            //initiation of saucers
            const xx = Math.random() * (canvas.width / 7);
            const yy = Math.random() * (canvas.height / 1.2);
            const dxx = (Math.random()) * 3.6;
            const dyy = (Math.random()) * -1.9;
            const radius = 50;
            saucerArray.push(new Saucer(xx, yy, dxx, dyy, radius, status));
        }
    }

    function Saucer(x, y, dx, dy, saucerRadius, status) {  //saucer class
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.saucerRadius = saucerRadius;
        this.status = status;
        this.imageWidth = 144; //actual width and height of the saucer.png
        this.imageHeight = 131; //changed from 66 to 131 when the image was changed;

        this.draw = function () {
            const image = new Image();
            image.onload = Saucer;
            // image.src = "https://media.giphy.com/media/2Wf4qYgMmou4zjg9qX/giphy.gif";
            image.src = "assets/saucer5.gif";
            //image courtesy of Acura from Gify.com
            ctx.beginPath();
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;


            ctx.drawImage(image, this.x, this.y, this.imageWidth, this.imageHeight);
            ctx.arc(this.x, this.y, this.saucerRadius, 0, Math.PI * 2, false); //arc along with up above
            ctx.closePath();
        }

        this.update = function () {   //WHERE THE REAL MAGIC HAPPENS  the saucer is drawn here.
            if (this.y + this.saucerRadius > canvas.height || this.y - this.saucerRadius < 0) {
                this.dy = -this.dy;
            } else if (this.x > canvas.width) {  //Does the saucer fall off the right side of the screen
                //GAME OVER
               
                
                // gameovercount = 1;
                gameOver = true;
                // if(gameOver){ 
                // gameOverSound();
                // gameOver = false
                // }
               
            }

            this.x += this.dx;  //arc speed along with up above
            this.y += this.dy;
            this.imageWidth -= .09;  //change size of image as game progresses
            this.imageHeight -= .09;  // Height should get smaller due to it being less than half of the width of the saucer
                        //changed from .009 to .09 when image was changed to 131px long
            this.draw();
        }
    }

    
    const drawScore = () => {
        const scoreTemplate = `<p>Score: ${score}</p>`;
        render(scoreTemplate, document.querySelector('#score'))
    }
   
    


   

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear frames
        
        for (let i = 0; i < saucerArray.length; i++) {
            if (saucerArray[i].status == 1) {  //check if the saucer has been hit
                saucerArray[i].update();   //saucers continually drawn 
            }
        }
        collisionDetection();
        // drawGameOverMessage();
        if (gameOver && !gameWon){
            // setTimeout(function () { alert("Hello"); }, 3000);
            
           
            drawGameOverMessage();
            setTimeout(function () { clearInterval(interval); }, 3000);
            setTimeout(function () { document.location.reload();}, 3000);
            
        }
        drawScore();

        x += dx;
        y += dy * Math.random(199);     //set for the speed of the saucers
    }
    
    turn();
    var interval = setInterval(draw, 10);
}



