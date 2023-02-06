import Game from "./scripts/game"
import Input from "./scripts/input"


// Setup Canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const canvas = document.getElementById("game-canvas");
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
const ctx = canvas.getContext("2d");



// start game
const game = new Game(canvas);
game.start();