import Input from "/src/scripts/input.js"

import Game from "/src/scripts/game"

// Setup Canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const canvas = document.getElementById("game-canvas");
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);


// toggle menu with button
const toggleBtn = document.getElementById("toggleBtn");
const controlMenu = document.getElementById("controlMenu");
toggleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    controlMenu.style.display = controlMenu.style.display === "none" ? "flex" : "none";
})

// // toggle menu with space
// toggleBtn.addEventListener("keydown", (event) => {
//     if (event.code === "Space") {
//     event.preventDefault();
//     event.stopPropagation();
//     controlMenu.style.display = controlMenu.style.display === "none" ? "flex" : "none";
//     }
// })



// initialize game and click listener
const game = new Game(canvas);
canvas.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    game.running = !game.running;
    game.start();
})


// sliders
let slider1 = document.getElementById("colorVariation");
let slider2 = document.getElementById("particleStep");
let slider3 = document.getElementById("particleBase");
let slider4 = document.getElementById("xBias");
let slider5 = document.getElementById("yBias");

game.hueVariation = slider1.value;
game.step = slider2.value;
game.base = slider3.value;
game.xBias = slider4.value;
game.yBias = slider5.value;

slider1.addEventListener("input", function () {
    game.hueVariation = this.value;
});
slider2.addEventListener("input", function () {
    game.step = this.value;
});
slider3.addEventListener("input", function () {
    game.base = this.value;
});
slider4.addEventListener("input", function () {
    game.xBias = this.value;
});
slider5.addEventListener("input", function () {
    game.yBias = this.value;
});
