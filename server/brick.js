'use strict';

class Brick0 {
    constructor(posX, posY) {
        this.x = posX;      this.y = posY;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

module.exports = Brick0;