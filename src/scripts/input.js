// cursor and right-click listener

export default class Input {
    constructor(canvas) {
        this.cursorPos = [];
        this.rcPos = [];

        canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.cursorPos[0] = event.clientX;
            this.cursorPos[1] = event.clientY;
        });
        canvas.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.rcPos[0] = event.clientX;
            this.rcPos[1] = event.clientY;
        });
    }

    showCursorPos() {
        console.log(this.cursorPos);
    }

    showRcPos() {
        console.log(this.rcPos);
    }
}
