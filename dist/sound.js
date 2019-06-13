
const gameWonID = "Game Won";
const gameOverID = "Game Over";
const explosionID = "ON FIRE";
const yesID = "YES";
const clappingID = "EXCELLENT";
let soundID = 0;


const loadSound = () => {
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]); //Set HTMLAudioPlugin first due to an error for WebAudio  Plugin
    createjs.Sound.registerSound("assets/explosion.mp3", explosionID);
    createjs.Sound.registerSound("assets/yes.mp3", yesID);
    createjs.Sound.registerSound("assets/clapping.mp3", clappingID);
    createjs.Sound.registerSound("assets/game_over.mp3", gameOverID);
    createjs.Sound.registerSound("assets/game_win.mp3", gameWonID);
}

const playSound = () => {
    this.sounds = [explosionID, yesID, clappingID];
    // this.rand = Math.floor(Math.random() * Math.floor(3));
    createjs.Sound.play(this.sounds[soundID]);

    return sounds[soundID];
}

const gameOverSound = () => {
    createjs.Sound.play(gameOverID);
}

const gameWonSound = () => {
    createjs.Sound.play(gameWonID);
}