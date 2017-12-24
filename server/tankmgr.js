'use strict';

var Tank = require('./tank');
var utils = require('./utils');
var overlapRect = utils.overlapRect;

class TankMgr0 {
    constructor(TankSize) {
        this.tanks = [];
        this.tankSize = TankSize;
        this.getNumberOfTanks = this.getFunctionFromName('getNumberOfTanks');
        this.getTankByIndex = this.getFunctionFromName('getTankByIndex');
        this.addTank = this.getFunctionFromName('addTank');
        this.addNewTank = this.getFunctionFromName('addNewTank');
        this.getTanksDataForTransfer = this.getFunctionFromName('getTanksDataForTransfer');
        this.setTankMoveByIndex = this.getFunctionFromName('setTankMoveByIndex');
        this.setTankDirByIndex = this.getFunctionFromName('setTankDirByIndex');
        this.setTankStopByIndex = this.getFunctionFromName('setTankStopByIndex');
        this.tankTryShootByIndex = this.getFunctionFromName('tankTryShootByIndex');
        this.updateTankState = this.getFunctionFromName('updateTankState');
        this.tankCheckPos = this.getFunctionFromName('tankCheckPos');
        this.tankGetPosByIndex = this.getFunctionFromName('tankGetPosByIndex');
        this.setTankDieByIndex = this.getFunctionFromName('setTankDieByIndex');
        this.increaseScoreByIndex = this.getFunctionFromName('increaseScoreByIndex');
        this.getScoreDataForTransfer = this.getFunctionFromName('getScoreDataForTransfer');
        this.setTankOutByIndex = this.getFunctionFromName('setTankOutByIndex');

    }

    getFunctionFromName(funcName) {
        var self = this;
        switch (funcName) {
            case 'getNumberOfTanks':
                return function(){
                    return self.tanks.length;
                };
                break;
            case 'getTankByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return undefined;
                    return self.tanks[index];
                };
                break;
            case 'addTank':
                return function(tank) {
                    self.tanks.push(tank);
                };
                break;
            case 'addNewTank':
                return function(uid, name, x, y, dir, speed, alive) {
                    let id = -1;
                    for (let i=0; i<self.getNumberOfTanks(); i++) {
                        let curTank = self.getTankByIndex(i);
                        if (curTank.alive===false) {
                            id = i;
                            curTank.uid = uid;
                            curTank.index = id;
                            curTank.name = name;
                            curTank.x = x;
                            curTank.y = y;
                            curTank.dir = dir;
                            curTank.speed = speed;
                            curTank.alive = alive;
                            break;
                        }
                    }
                    if (id===-1) {
                        id = self.getNumberOfTanks();
                        let newTank = new Tank(uid, name, x, y, dir, speed, alive, id);
                        self.addTank(newTank);
                    }
                    return id;
                };
                break;
            case 'getTanksDataForTransfer':
                return function() {
                    let ret = [];
                    for (let i=0; i<self.getNumberOfTanks(); i++) {
                        if (self.tanks[i].alive===true) {
                            let shootSound = (self.tanks[i].shootKey===1);
                            let t = {
                                x: self.tanks[i].x,
                                y: self.tanks[i].y,
                                dir: self.tanks[i].dir,
                                name: self.tanks[i].name,
                                uid: self.tanks[i].uid,
                                shootSound: shootSound
                            };
                            ret.push(t);
                        }
                    };
                    return ret;
                };
                break;
            case 'setTankMoveByIndex':
                return function(index, reqDir) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].dir = reqDir;
                    self.tanks[index].mov = true;
                }
                break;
            case 'setTankDirByIndex':
                return function(index, reqDir) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].dir = reqDir;
                }
                break;
            case 'setTankStopByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].mov = false;
                }
                break;
            case 'tankTryShootByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return false;
                    return self.tanks[index].tryShoot();
                }
                break;
            case 'updateTankState':
                return function(mapMgr) {
                    let newBulletArr = [];
                    //let makeMoveArr = [];
                    //let shootArr = [];
                    for (let i=0; i<self.tanks.length; i++) {
                        //makeMoveArr.push(0);
                        //shootArr.push(0);
                        let curTank = self.tanks[i];
                        if (curTank.alive===true) { 
                            if (curTank.mov!=false) {
                                if (mapMgr.checkTankCanMoveByIndex(i, curTank.dir)===true)
                                    self.tanks[i].makeMove();
                            }
                            if (curTank.shootKey<10000)
                                curTank.shootKey++;
                            if (curTank.shootKey>=10000)
                                curTank.shootKey = 5000;
                            if (curTank.shootKey===1)
                                newBulletArr.push(self.tanks[i].shootABullet());
                        }
                    }
                    /*
                    for (let i=0; i<self.tanks.length; i++) {
                        if (makeMoveArr[i]!=0)
                            self.tanks[i].makeMove();
                        if (shootArr[i]!=0)
                            newBulletArr.push(self.tanks[i].shootABullet());
                    }
                    */
                    return newBulletArr;
                };
                break;
            case 'tankCheckPos':
                return function (index, x1, y1, x2, y2) {
                    for (let i=0; i<self.tanks.length; i++) {
                        if (i===index) continue;
                        if (self.tanks[i].alive===false) continue;
                        let x = self.tanks[i].getX();
                        let y = self.tanks[i].getY();
                        if (overlapRect(x, y, x+self.tankSize-1, y+self.tankSize-1, x1, y1, x2, y2)===true)
                            return i;
                    }
                    return -1;
                }
                break;
            case 'tankGetPosByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return false;
                    return self.tanks[index].getPos();
                }
                break;
            case 'setTankDieByIndex':
                return function(index, newPos) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].setPosAfterDie(newPos);
                }
                break;
            case 'increaseScoreByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].increaseScore();
                }
                break;
            case 'getScoreDataForTransfer':
                return function() {
                    let sc = [];
                    for (let i=0; i<self.tanks.length; i++) {
                        if (self.tanks[i].alive===false) continue;
                        sc.push({
                            score: self.tanks[i].getScore(),
                            uid: self.tanks[i].getUid(),
                            name: self.tanks[i].getName()
                        });
                    }
                    return sc;
                }
                break;
            case 'setTankOutByIndex':
                return function(index) {
                    if (index<0 || index>=self.tanks.length) return false;
                    self.tanks[index].alive = false;
                }
                break;
            default:
                console.log(funcName + ' is not valid in TankMgr - Caller: ' + this);
        }
    }
    
}

module.exports = TankMgr0;


