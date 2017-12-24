'use strict';

class BulletDrawer {
    constructor(theContext, BulletSize) {
        this.context = theContext;
        this.img = new Image();
        this.img.src = "RESOURCE/Image/bullet.png";
        this.BulletSize = BulletSize;
        this.curBrickArr = [];
        this.preBrickArr = [];
    }
    setNewBulletData(newBulletData) {
        this.curBrickArr = newBulletData;
    }
    eraseBullet(x, y) {
        context2D.fillStyle = "#000000";
        context2D.fillRect(x, y, this.BulletSize, this.BulletSize);
    }
    eraseCurrentBulletState() {
        for (let i=0; i<this.curBrickArr.length; i++)
            this.eraseBullet(this.curBrickArr[i].x, this.curBrickArr[i].y);
    }
    drawNewBulletState() {
        for (let i=0; i<this.curBrickArr.length; i++) {
            context2D.drawImage(this.img, this.curBrickArr[i].x, this.curBrickArr[i].y);
        }
    }
    
}