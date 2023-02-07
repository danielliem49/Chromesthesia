
export default class Input {

    static DEFAULTS = {
        hueVariation: 2,
        step: 10,
        base: 300,
        xBias: 1,
        yBias: 1
    };

    constructor(){
        this.hueVariation = Input.DEFAULTS.hueVariation;
        this.step = Input.DEFAULTS.step;
        this.base = Input.DEFAULTS.base;
        this.xBias = Input.DEFAULTS.xBias;
        this.yBias = Input.DEFAULTS.yBias;
    }
}