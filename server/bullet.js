'use strict';

const param = require('../src/scripts/es6/init-param');
const mTankTrans = param.mTankTrans;

class Bullet0 {
    constructor(ownerUid, x, y, direction, speed, ownerIndex) {
        this.ownerUid = ownerUid;
        this.ownerIndex = ownerIndex;
        this.x = x;
        this.y = y;
        this.dir = direction;
        this.speed = speed;
    }
    getOwnerIndex() {
        return this.ownerIndex;
    }
    getOwnerUid() {
        return this.ownerUid;
    }
    getDir() {
        return this.dir;
    }
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
    makeMove() {
        this.x+= mTankTrans[this.dir].x * this.speed;
        this.y+= mTankTrans[this.dir].y * this.speed;
    }
}

module.exports = Bullet0;