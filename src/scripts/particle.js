
class Particle {
    constructor(x, y ,color){
        this.x = x;
        this.y = y;
        this.color = color;

    } 

    hsla(){
        return 'hsla(' + this.color.h + ',' + (this.color.s * 100) + '%,' + (this.color.l * 100) + '%,' + this.color.a + ')';
    }
}

export default Particle;