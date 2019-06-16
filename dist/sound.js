
const shootID = "Shoot";
const gameWonID = "Game Won";
const gameOverID = "Game Over";
const explosionID = "ON FIRE";
const yesID = "YES";
const clappingID = "EXCELLENT";
const explosionzID = "AMAZING";
const levelFive = "LEVEL 5";
const levelSix = "LEVEL 6";
const levelSeven = "LEVEL 7";
const levelEight = "LEVEL 8";
const lastLevel = "LEVEL 9";
let soundID = 0;


const loadSound = () => {
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]); //Set HTMLAudioPlugin first due to an error for WebAudio  Plugin
    createjs.Sound.registerSound("assets/explosion.mp3", explosionID);
    createjs.Sound.registerSound("assets/yes.mp3", yesID);
    createjs.Sound.registerSound("assets/clapping.mp3", clappingID);
    createjs.Sound.registerSound("assets/game_over.mp3", gameOverID);
    createjs.Sound.registerSound("assets/game_win.mp3", gameWonID);
    createjs.Sound.registerSound("assets/laser.mp3", shootID);
    createjs.Sound.registerSound("assets/explosionz.mp3", explosionzID);
    createjs.Sound.registerSound("assets/levelFive.mp3", levelFive);
    createjs.Sound.registerSound("assets/levelSix.mp3", levelSix);
    createjs.Sound.registerSound("assets/levelSeven.mp3", levelSeven);
    createjs.Sound.registerSound("assets/levelEight.mp3", levelEight);
    createjs.Sound.registerSound("assets/success.mp3", lastLevel);
    // createjs.Sound.registerSound("assets/levelEight.mp3", bonusLevel);
}

const playSound = () => {
    this.sounds = [explosionID, yesID, clappingID, explosionzID, levelFive, levelSix, levelSeven, levelEight, lastLevel];
    // this.rand = Math.floor(Math.random() * Math.floor(3));
    createjs.Sound.play(this.sounds[soundID]);

    return sounds[soundID];
}

const gameOverSound = () => {
   return createjs.Sound.play(gameOverID);
}

const gameWonSound = () => {
    createjs.Sound.play(gameWonID);
}

const shootTarget = () => {
    createjs.Sound.play(shootID);
}