'use strict';

class BrickDrawer {
    constructor(theContext) {
        this.context = theContext;
        this.img = new Image();
        this.img.src = "RESOURCE/Image/brick.png";

        this.brickArr = [];
        this.insideBrickArr = [];
        this.boundBrickArr = [];
    }
    setBrickData(brickData) {
        this.insideBrickArr = brickData.insideBricks;
        this.boundBrickArr = brickData.boundBricks;
        this.brickArr = this.boundBrickArr.concat(this.insideBrickArr);
    }
    drawBricks() {
        for (let i=0; i<this.brickArr.length; i++) {
            context2D.drawImage(this.img, this.brickArr[i].x, this.brickArr[i].y);
        }
    }
}