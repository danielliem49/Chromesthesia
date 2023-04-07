
import Game from "/src/scripts/game"

// Setup Canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const canvas = document.getElementById("game-canvas");
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "hsla(0,0,0,1)";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);


// toggle menu with button
const toggleBtn = document.getElementById("toggleBtn");
const controlContent = document.getElementById("control-content");

toggleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    controlContent.style.display = controlContent.style.display === "none" ? "flex" : "none";
})

// initialize game and title screen, click to start/stop
let game = new Game(canvas);
let title = document.getElementById("title");
let clicktostart = document.getElementById("clicktostart");
let name = document.getElementById("name");

canvas.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    game.running = !game.running;
    game.music.play();
    
    clicktostart.classList.toggle("no-animation");
    clicktostart.classList.toggle("hidden");
    name.classList.toggle("hidden");

    
    // setTimeout(() => {
    //     name.classList = "hidden";
    // }, 200)

    setTimeout(()=> {
        title.classList = "hidden";
    }, 4000)


    if (game.running) {
        game.start();
    }else{
        game.stop();
    }
})

//sliders and control
let dropdown1 = document.getElementById("reset-timer");
let radio1 = document.getElementById("shadowblack");
let radio2 = document.getElementById("whitesmoke");
let radio3 = document.getElementById("monochrome");
let radio4 = document.getElementById("noSpecialEffects");
let slider1 = document.getElementById("colorVariety");
let slider2 = document.getElementById("particleStep");
let slider3 = document.getElementById("particleBase");
let slider4 = document.getElementById("xBias");
let slider5 = document.getElementById("yBias");

// set control defaults
dropdown1.value = game.resetTimer;
radio1.checked = game.shadowblack;
radio2.checked = game.whitesmoke;
radio3.checked = game.monochrome;
radio4.checked = game.noSpecialEffects;
slider1.value = game.hueVariation;
slider2.value = game.step;
slider3.value = game.base;
slider4.value = game.xBias;
slider5.value = game.yBias;

// control event listeners
dropdown1.addEventListener("input", function () {
    game.resetTimer = this.value;
    if (game.resetTimer) {
        if (game.running) {
            game.reset();
        }
    }
});

radio1.addEventListener("input", function () {
    game.shadowblack = true;
    game.whitesmoke = false;
    game.monochrome = false;
    game.noSpecialEffects = false;
    if (game.shadowblack) {
        game.light = 0;
        game.hueVariation = slider1.value;
        game.hueIncrement = 0.2;
    }
});


radio2.addEventListener("input", function () {
    game.shadowblack = false;
    game.whitesmoke = true;
    game.monochrome = false;
    game.noSpecialEffects = false;
    if (game.whitesmoke) {
        game.light = 1;
        game.hueVariation = slider1.value;
        game.hueIncrement = 0.2;
    }
});

radio3.addEventListener("input", function () {
    game.shadowblack = false;
    game.whitesmoke = false;
    game.monochrome = true;
    game.noSpecialEffects = false;
    if (game.monochrome) {
        game.light = 0.5;
        game.hueVariation = 0;
        game.hueIncrement = 0;
        slider1.value = game.hueVariation;
    }
});

radio4.addEventListener("input", function () {
    game.shadowblack = false;
    game.whitesmoke = false;
    game.monochrome = false;
    game.noSpecialEffects = true;
    if (game.noSpecialEffects) {
        game.light = 0.5;
        game.hueVariation = slider1.value;
        game.hueIncrement = 0.2;
    }
});



slider1.addEventListener("input", function () {
    if (game.monochrome) {
        game.hueVariation = 0;
    }else{
        game.hueVariation = this.value;
    }
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

// music
// music toggle mute
const muteButton = document.getElementById("muteButton");
const unmuteButton = document.getElementById("unmuteButton");
unmuteButton.classList.add("hidden");
muteButton.addEventListener("click", () => {
    game.music.volume = 0.0;
    unmuteButton.classList.remove("hidden");
    muteButton.classList.add("hidden");
});
unmuteButton.addEventListener("click", () => {
    game.music.volume = 0.1;
    muteButton.classList.remove("hidden");
    unmuteButton.classList.add("hidden");
});