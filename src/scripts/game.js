
import Particle from "./particle.js"
import { createNoise4D } from 'simplex-noise';


export default class Game {

    static DEFAULTS = {
        backgroundColor: 'black',
        particlesNum: 1000,
        step: 10,
        base: 300,

        xBias: 1, 
        yBias: 1, 
        zIncrement: 0.001,
        wIncrement: 0.001,

        hueIncrement: 0.2,
        hueVolatility: 2,
        alphaIncrement: 0.001
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.DIM_X = canvas.width;
        this.DIM_Y = canvas.height;
        this.ctx = canvas.getContext("2d")
        this.particles = [];
        this.noise4D = createNoise4D(Math.random);
        this.rand = Math.random();
        
        // algorithm variable start values
        this.zStart = 0;
        this.wStart = 0;
        this.hueStart = Math.random()* 360;

        // UI adjustable variables
        this.hueVolatility = Game.DEFAULTS.hueIncrement;
        this.step = Game.DEFAULTS.step;
        this.base = Game.DEFAULTS.base;
        this.xBias = Game.DEFAULTS.xBias;
        this.yBias = Game.DEFAULTS.yBias;

        // game state
        this.running = false;
    }
    
    resetParticle(particle){
        particle.x = this.DIM_X * Math.random();
        particle.y = this.DIM_Y * Math.random();
        // color hue in degrees
        particle.color = {
            h: (this.hueStart + (this.hueVolatility * Math.atan2(this.DIM_Y - particle.y, this.DIM_X - particle.x) * 180 / Math.PI)), s: 1, l: 0.5, a: 0}
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

    getNoise(x, y, z, w) {
        let octaves = 4, fallout = 0.25, amp = 1, f = 1, sum = 0;

        for (let i = 0; i < octaves; ++i) {
            amp *= fallout;
            sum += amp * (this.noise4D(x * f, y * f, z * f, w * f));
            // console.log(this.noise4D(x * f, y * f, z * f, w * f));
            f *= 2;
        }
        return sum;
    }

    // click(event) {
    //     this.ctx.save();
    //     this.ctx.globalAlpha = 1;
    //     this.ctx.fillStyle = Configs.backgroundColor;
    //     this.ctx.fillRect(0, 0, screenWidth, screenHeight);
    //     this.ctx.restore();

    //     this.noise4D = createNoise4D(Math.random);
    // }

    update() {
        let step = this.step, base = this.base, t = 5000;
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            
            // updates new pos of x and y, and saves old pos
            p.lastX = p.x;
            p.lastY = p.y;
            
            let angle = Math.PI * 6 * this.getNoise((p.x / base) * this.xBias, (p.y / base) * this.yBias, this.zStart, this.wStart);
            p.x += Math.cos(angle) * step;
            p.y += Math.sin(angle) * step;
            // console.log(angle)


            // makes more opaque over time
            if (p.color.a < 1) p.color.a += Game.DEFAULTS.alphaIncrement;
            
            
            // actual drawing
            this.ctx.beginPath();

            this.ctx.strokeStyle = p.hsla();
            this.ctx.moveTo(p.lastX, p.lastY);
            this.ctx.lineTo(p.x, p.y);
            this.ctx.stroke();

            // resets particle with new initialization values when it hits an edge
            if (p.x < 0 || p.x > this.DIM_X || p.y < 0 || p.y > this.DIM_Y) {
                this.resetParticle(p);
            }

            // // erasing after t amount of time
            // setTimeout(()=> {
            // this.ctx.beginPath();
            // this.ctx.strokeStyle = Game.DEFAULTS.backgroundColor;
            // this.ctx.moveTo(p.lastX, p.lastY);
            // this.ctx.lineTo(p.x, p.y);
            // this.ctx.stroke();
            // }, t)

        }

        if (this.rand > 0.5) {
            this.hueStart += Game.DEFAULTS.hueIncrement;
        }else{
            this.hueStart -= Game.DEFAULTS.hueIncrement;
        }

        this.zStart += Game.DEFAULTS.zIncrement;
        this.wStart += Game.DEFAULTS.wIncrement;

        requestAnimationFrame(this.update.bind(this));
    }

    start() {
        // if (this.running){
            this.addParticles();
            requestAnimationFrame(this.update.bind(this));
            console.log("Game is Running!");       

        // }else{
        //     cancelAnimationFrame(this.raf);
        //     this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        //     this.ctx.fillStyle = Game.DEFAULTS.backgroundColor;
        //     this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
        // }
        console.log(this.running)
    }

}