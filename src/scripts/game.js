
import Particle from "./particle.js"
import { createNoise4D } from 'simplex-noise';


class Game {

    static DEFAULTS = {
        backgroundColor: 'black',
        particlesNum: 1000,
        zIncrement: 0.001,
        wIncrement: 0.001,
        hueIncrement: 0.2,
        alphaIncrement: 0.002,
        
        // UI Adjustable
        resetTimer: 300000,
        light: 0.5,
        hueVariation: 2,
        step: 6,
        base: 300,
        xBias: 1, 
        yBias: 1 
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.DIM_X = canvas.width;
        this.DIM_Y = canvas.height;
        this.ctx = canvas.getContext("2d")
        this.particles = [];
        
        // algorithm variable start values
        this.zStart = 0;
        this.wStart = 0;
        
        // rands, reset at each game.start()
        this.noise4D = createNoise4D(Math.random);
        this.rand = Math.random();
        this.hueStart = Math.random()* 360;

        // for preset modes
        this.hueIncrement = Game.DEFAULTS.hueIncrement;

        // UI adjustable variables
        this.resetTimer = Game.DEFAULTS.resetTimer
        this.monochrome = false;
        this.whitesmoke = false;
        this.shadowblack = false;
        this.light = Game.DEFAULTS.light;
        this.hueVariation = Game.DEFAULTS.hueVariation;
        this.step = Game.DEFAULTS.step;
        this.base = Game.DEFAULTS.base;
        this.xBias = Game.DEFAULTS.xBias;
        this.yBias = Game.DEFAULTS.yBias;

        // game state
        this.running = false;
        this.awaitingRestart = false;

        // music
        this.music = document.createElement("audio");
        this.music.src = "assets/music1.mp3";
        this.music.volume = 0.1;
    }
    
    addParticles() {
        if (this.particles.length) {
            this.particles = [];
        }
        
        for (let i = 0; i < Game.DEFAULTS.particlesNum; i++) {
            let particle = new Particle(0, 0, {});
            this.resetParticle(particle);
            this.particles.push(particle);
        }
    }

    resetParticle(particle){
        particle.x = this.DIM_X * Math.random();
        particle.y = this.DIM_Y * Math.random();
        // color hue in degrees
        particle.color = {
            h: (this.hueStart + (this.hueVariation * Math.atan2(this.DIM_Y - particle.y, this.DIM_X - particle.x) * 180 / Math.PI)), s: 1, l: this.light, a: 0}
    }

    resetRands() {
        this.noise4D = createNoise4D(Math.random);
        this.rand = Math.random();
        this.hueStart = Math.random() * 360;
    }

    getNoise(x, y, z, w) {
        let octaves = 4, fallout = 0.25, amp = 1, f = 1, sum = 0;
        for (let i = 0; i < octaves; ++i) {
            amp *= fallout;
            sum += amp * (this.noise4D(x * f, y * f, z * f, w * f));
            f *= 2;
        }
        return sum;
    }

    update() {
        let step = this.step, base = this.base;
        
        // randomly move clockwise/anticlockwise on colorwheel, and set preset modes
        if (this.rand > 0.5) {
            this.hueStart += this.hueIncrement;
        } else {
            this.hueStart -= this.hueIncrement;
        }

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // updates new pos of x and y, and saves old pos
            p.lastX = p.x;
            p.lastY = p.y;
            
            let angle = Math.PI * 6 * this.getNoise((p.x / base) * this.xBias, (p.y / base) * this.yBias, this.zStart, this.wStart);
            p.x += Math.cos(angle) * step;
            p.y += Math.sin(angle) * step;

            // makes more opaque over time
            if (p.color.a < 1) p.color.a += Game.DEFAULTS.alphaIncrement;
            
            // actual drawing
            this.ctx.beginPath();
            this.ctx.strokeStyle = p.hsla();
            this.ctx.moveTo(p.lastX, p.lastY);
            this.ctx.lineTo(p.x, p.y);
            this.ctx.stroke();

            // reset particle with new initialization values when it hits an edge
            if (p.x < 0 || p.x > this.DIM_X || p.y < 0 || p.y > this.DIM_Y) {
                this.resetParticle(p);
            }
        }
        
        // 4D "randomness"
        this.zStart += Game.DEFAULTS.zIncrement;
        this.wStart += Game.DEFAULTS.wIncrement;
        
        this.raf = requestAnimationFrame(this.update.bind(this));
    }

    start() {
        // make sure screen is cleared
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.ctx.fillStyle = Game.DEFAULTS.backgroundColor;
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

        // initialization
        this.resetRands();
        this.addParticles();
        this.raf = requestAnimationFrame(this.update.bind(this));

        this.reset();
    }

    stop() {
        // gradual fade for screen clear
        let timesRun = 0;
        let a = 0;
        let interval = setInterval(() => {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
            this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
            a += 0.05;
            timesRun += 1;
            if (timesRun === 20) clearInterval(interval);
        }, 30)

        if (this.awaitingRestart) clearTimeout(this.timerID);
        this.awaitingRestart = false;
        
        cancelAnimationFrame(this.raf);
    }

    reset() {
        if (this.awaitingRestart) clearTimeout(this.timerID);

        if (this.resetTimer) {
            const resetAndStart = async () => {
                
                this.timerID = null;
                this.awaitingRestart = true
                const resetTimeout = () => new Promise((resolve) => {
                    this.timerID = setTimeout(resolve, this.resetTimer);
                });
    
                await resetTimeout();
                this.stop();
                setTimeout(() => this.start(), 1000);
            };
            resetAndStart();
        }
    }

}

export default Game;