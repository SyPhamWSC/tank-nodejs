'use strict';

const paras = require('../src/scripts/es6/init-param');
const mTankTrans = paras.mTankTrans;
const ShootCycleTimeLimit = paras.ShootCycleTimeLimit;
const BulletSize = paras.BulletSize;
const BulletSpeedDefault = paras.BulletSpeedDefault;
const DirDefUp = paras.DirDefUp;
const DirDefDown = paras.DirDefDown;
const DirDefLeft = paras.DirDefLeft;
const DirDefRight = paras.DirDefRight;
const TankSize = paras.TankSize;
const HalfTankSize = Math.floor(TankSize/2); //15
const HalfBulletSize = Math.floor(BulletSize/2); //4
var bulletPosCalArr = [];
(function (){
    bulletPosCalArr[DirDefUp] = {
        x: (mTankTrans[DirDefUp].x*HalfTankSize-HalfBulletSize+1), 
        y: (mTankTrans[DirDefUp].y*HalfTankSize-BulletSize)
    };
    bulletPosCalArr[DirDefDown] = {
        x: (mTankTrans[DirDefDown].x*HalfTankSize-HalfBulletSize), 
        y: (mTankTrans[DirDefDown].y*HalfTankSize+1) 
    };
    bulletPosCalArr[DirDefLeft] = {
        x: (mTankTrans[DirDefLeft].x*HalfTankSize-BulletSize), 
        y: (mTankTrans[DirDefLeft].y*HalfTankSize-HalfBulletSize)
    };
    bulletPosCalArr[DirDefRight] = {
        x: (mTankTrans[DirDefRight].x*HalfTankSize+1),
        y: (mTankTrans[DirDefRight].y*HalfTankSize-HalfBulletSize+1)
    };
})();

class Tank0 {
    constructor(uid, name, x, y, direction, speed, alive, id) {
        this.uid = uid;
        this.index = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.dir = direction;
        this.speed = speed;
        this.alive = alive;
        this.mov = false;
        this.shootKey = ShootCycleTimeLimit;
        this.score = 0;
    }
    setPosAfterDie(newPos) {
        this.x = newPos.x;
        this.y = newPos.y;
        this.dir = DirDefUp;
        this.shootKey = ShootCycleTimeLimit;
        this.mov = false;
    }
    getName() {
        return this.name;
    }
    getScore() {
        return this.score;
    }
    getUid() {
        return this.uid;
    }
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    tryShoot() {
        if (this.alive===false) return false;
        if (this.shootKey<ShootCycleTimeLimit) return false;
        this.shootKey = 0;
        return true;
    }
    shootABullet() {
        //tank center
        let cenX = this.x+HalfTankSize;
        let cenY = this.y+HalfTankSize;
        return {
            ownerUid: this.uid,
            x: (cenX+bulletPosCalArr[this.dir].x),
            y: (cenY+bulletPosCalArr[this.dir].y),
            dir: this.dir,
            speed: BulletSpeedDefault,
            ownerIndex: this.index
        };
    }
    makeMove() {
        if (this.mov===false) return;
        this.x+= mTankTrans[this.dir].x * this.speed;
        this.y+= mTankTrans[this.dir].y * this.speed;
    }
    getPosAfterMove(dirr) {
        return {
            x: this.x + mTankTrans[dirr].x * this.speed,
            y: this.y + mTankTrans[dirr].y * this.speed
        };
    }
    increaseScore() {
        this.score++;
    }
}

module.exports = Tank0;