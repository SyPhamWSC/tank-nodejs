//truong hop 2 tank dung gan nhau cung di chuyen, tank co index nho hon dc tinh trc se di chuyen trc
'use strict';

var BrickMgr = require('./brickmgr');
var TankMgr = require('./tankmgr');
var BulletMgr = require('./bulletmgr');
var utils = require('./utils');
const params = require('../src/scripts/es6/init-param');
const DirDefUp = params.DirDefUp;
const DirDefDown = params.DirDefDown;
const DirDefLeft = params.DirDefLeft;
const DirDefRight = params.DirDefRight;

class Map {
    constructor(width, height, BrickSize, TankSize, BulletSize, insideBrickArr) {
        var self = this;
        this.mapWidth = width;
        this.mapHeight = height;
        this.brickSize = BrickSize;
        this.tankSize = TankSize;
        this.bulletSize = BulletSize;
        this.halfBulletSize = Math.floor(this.bulletSize/2);
        this.brickMgr = new BrickMgr(this.mapWidth, this.mapHeight, BrickSize, insideBrickArr);
        this.tankMgr = new TankMgr(TankSize);
        this.bulletMgr = new BulletMgr(BulletSize);
        this.exData = new Object();
        this.exData.tankEx = [];
        this.exData.brickEx = [];

        this.addInsideBrick = this.brickMgr.getFunctionFromName('addInsideBrick');
        this.addNewInsideBrick = this.brickMgr.getFunctionFromName('addNewInsideBrick');
        this.addBoundBrick = this.brickMgr.getFunctionFromName('addBoundBrick');
        this.addNewBoundBrick = this.brickMgr.getFunctionFromName('addNewBoundBrick');
        this.getNumberOfInsideBricks = this.brickMgr.getFunctionFromName('getNumberOfInsideBricks');
        this.getInsideBrickByIndex = this.brickMgr.getFunctionFromName('getInsideBrickByIndex');
        this.getBricksDataForTransfer = this.brickMgr.getFunctionFromName('getBricksDataForTransfer');
        this.brickCheckPos = this.brickMgr.getFunctionFromName('brickCheckPos');
        this.brickGetPosByIndex = this.brickMgr.getFunctionFromName('brickGetPosByIndex');

        this.getNumberOfTanks = this.tankMgr.getFunctionFromName('getNumberOfTanks');
        this.getTankByIndex = this.tankMgr.getFunctionFromName('getTankByIndex');
        this.addTank = this.tankMgr.getFunctionFromName('addTank');
        this.addNewTank = this.tankMgr.getFunctionFromName('addNewTank');
        this.getTanksDataForTransfer = this.tankMgr.getFunctionFromName('getTanksDataForTransfer');
        this.setTankMoveByIndex = this.tankMgr.getFunctionFromName('setTankMoveByIndex');
        this.setTankDirByIndex = this.tankMgr.getFunctionFromName('setTankDirByIndex');
        this.setTankStopByIndex = this.tankMgr.getFunctionFromName('setTankStopByIndex');
        this.tankTryShootByIndex = this.tankMgr.getFunctionFromName('tankTryShootByIndex');
        this.tankCheckPos = this.tankMgr.getFunctionFromName('tankCheckPos');
        this.tankGetPosByIndex = this.tankMgr.getFunctionFromName('tankGetPosByIndex');
        this.setTankDieByIndex = this.tankMgr.getFunctionFromName('setTankDieByIndex');
        this.increaseScoreByIndex = this.tankMgr.getFunctionFromName('increaseScoreByIndex');
        this.getScoreDataForTransfer = this.tankMgr.getFunctionFromName('getScoreDataForTransfer');
        this.setTankShootByIndex  = function(id) {
            if (id<0) return false;
            if (this.tankTryShootByIndex(id)===true) {
                return true;
            }
            return false;
        }
        this.updateTankState = this.tankMgr.getFunctionFromName('updateTankState');
        this.setTankOutByIndex = this.tankMgr.getFunctionFromName('setTankOutByIndex');

        this.getBulletsDataForTransfer = this.bulletMgr.getFunctionFromName('getBulletsDataForTransfer');
        this.updateBulletState = this.bulletMgr.getFunctionFromName('updateBulletState');
        this.addBullet = this.bulletMgr.getFunctionFromName('addBullet');
        this.addBulletInstance = this.bulletMgr.getFunctionFromName('addBulletInstance');
    }
    checkValidPos(x, y) {
        let TankSize = this.tankSize;
        let BrickSize = this.brickSize;
        for (let i=0; i<this.getNumberOfTanks(); i++) {
            let curTank = this.getTankByIndex(i);
            let x2 = curTank.x;
            let y2 = curTank.y;
            if (curTank.alive===true)
                if (utils.overlapRect(x, y, x+TankSize-1, y+TankSize-1, x2, y2, x2+TankSize-1, y2+TankSize-1)===true)
                    return 0;
        }
        for (let i=0; i<this.getNumberOfInsideBricks(); i++) {
            let curBrick = this.getInsideBrickByIndex(i);
            let x2 = curBrick.x;
            let y2 = curBrick.y;
            if (utils.overlapRect(x, y, x+TankSize-1, y+TankSize-1, x2, y2, x2+BrickSize-1, y2+BrickSize-1)===true)
                return 0;
        }
        return 1;
    }
    getPosForNewTank() {
        let maxRandW = this.mapWidth-this.brickSize-this.tankSize;
        let maxRandH = this.mapHeight-this.brickSize-this.tankSize;
        let x = utils.randNum(this.brickSize, maxRandW);
        let y = utils.randNum(this.brickSize, maxRandH);
        while (this.checkValidPos(x, y)===0) {
            x = utils.randNum(this.brickSize, maxRandW);
            y = utils.randNum(this.brickSize, maxRandH);
        }
        return {
            x: x,
            y: y
        };
    }
    calExplosion() {
        this.exData.tankEx = [];
        this.exData.brickEx = [];
        for (let i=this.bulletMgr.bullets.length-1; i>=0; i--) {
            let nPos = this.bulletMgr.bullets[i].getPos();
            let bulletOwnerUid = this.bulletMgr.bullets[i].getOwnerUid();
            let k1 = 0;
            let k2 = 0;
            if ((k1 = this.brickCheckPos(nPos.x, nPos.y, nPos.x+this.bulletSize-1, nPos.y+this.bulletSize-1))!=-1) {
                let p = this.brickGetPosByIndex(k1);
                let ex = new Object();
                switch (this.bulletMgr.bullets[i].getDir()) {
                    case DirDefUp:
                        //mat duoi
                        ex.x = nPos.x+this.halfBulletSize-1;
                        ex.y = p.y+this.brickSize-1;
                        break;
                    case DirDefDown:
                        //mat tren
                        ex.x = nPos.x+this.halfBulletSize;
                        ex.y = p.y;
                        break;
                    case DirDefLeft:
                        //mat phai
                        ex.x = p.x+this.brickSize-1;
                        ex.y = nPos.y+this.halfBulletSize;
                        break;
                    case DirDefRight:
                        //mat trai
                        ex.x = p.x;
                        ex.y = nPos.y+this.halfBulletSize-1;
                        break;
                    default:
                        break;
                }
                ex.ownerUid = bulletOwnerUid;
                this.exData.brickEx.push(ex); //toa do trung tam vien dan
                this.bulletMgr.bullets.splice(i,1);
                continue;
            }
            if ((k2 = this.tankCheckPos(-10, nPos.x, nPos.y, nPos.x+this.bulletSize-1, nPos.y+this.bulletSize-1))!=-1) {
                let p = this.tankGetPosByIndex(k2);
                let tankKillerUid = bulletOwnerUid;
                this.exData.tankEx.push({  //toa do tren trai tank
                    x: p.x,
                    y: p.y,
                    killerUid: tankKillerUid
                });
                this.increaseScoreByIndex(this.bulletMgr.bullets[i].getOwnerIndex());
                this.bulletMgr.bullets.splice(i,1);
                let newPos = this.getPosForNewTank();
                this.setTankDieByIndex(k2, newPos);
                continue;
            }
        }
    }
    checkTankCanMoveByIndex (id, reqDir) {
        if (id<0) return false;
        let curTank = this.getTankByIndex(id);
        if (curTank.alive===false) return false;
        let nPos = curTank.getPosAfterMove(reqDir);
        if (this.brickCheckPos(nPos.x, nPos.y, nPos.x+this.tankSize-1, nPos.y+this.tankSize-1)!=-1) 
            return false;
        if (this.tankCheckPos(id, nPos.x, nPos.y, nPos.x+this.tankSize-1, nPos.y+this.tankSize-1)!=-1) 
            return false;
        return true;
    }
    getExplosionDataForTransfer() {
        return this.exData;
    }
    updateNewBullet(newBulletArr) {
        //if (newBulletArr.length!=0) console.log(newBulletArr);
        for (let i=0; i<newBulletArr.length; i++) {
            this.addBulletInstance(newBulletArr[i]);
        }
    }
    update() {
        let newBulletArr = this.updateTankState(this); //update and get new Bullet Array
        this.updateBulletState();
        this.updateNewBullet(newBulletArr);
        this.calExplosion();
    }
}

module.exports = Map;