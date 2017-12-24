'use strict';

var Brick = require('./brick');
var utils = require('./utils');
var overlapRect = utils.overlapRect;

class BrickMgr0 {
    constructor(MapWidth, MapHeight, BrickSize, insideBrickArr) {
        this.bricks = [];
        this.insideBricks = [];
        this.boundBricks = [];
        this.brickSize = BrickSize;
        this.addInsideBrick = this.getFunctionFromName('addInsideBrick');
        this.addNewInsideBrick = this.getFunctionFromName('addNewInsideBrick');
        this.addBoundBrick = this.getFunctionFromName('addBoundBrick');
        this.addNewBoundBrick = this.getFunctionFromName('addNewBoundBrick');
        this.getNumberOfInsideBricks = this.getFunctionFromName('getNumberOfInsideBricks');
        this.getInsideBrickByIndex = this.getFunctionFromName('getInsideBrickByIndex');
        this.getBricksDataForTransfer = this.getFunctionFromName('getBricksDataForTransfer');
        this.brickCheckPos = this.getFunctionFromName('brickCheckPos');
        this.brickGetPosByIndex = this.getFunctionFromName('brickGetPosByIndex');

        let bwidth = Math.floor(MapWidth/BrickSize);
        let bheight = Math.floor(MapHeight/BrickSize);
        for (let i=0;  i<bwidth; i++) {
            this.addNewBoundBrick(i*BrickSize, 0);
            this.addNewBoundBrick(i*BrickSize, (bheight-1)*BrickSize);
        }
        for (let i=0; i<bheight; i++) {
            this.addNewBoundBrick(0, i*BrickSize);
            this.addNewBoundBrick((bwidth-1)*BrickSize, i*BrickSize);
        }
        for (let i=0; i<insideBrickArr.length; i++) {
            this.addNewInsideBrick(insideBrickArr[i].x, insideBrickArr[i].y);
        }
        this.bricks = this.boundBricks.concat(this.insideBricks);
    }

    getFunctionFromName(funcName) {
        var self = this;
        switch (funcName) {
            case 'addInsideBrick':
                return function(br) {
                    self.insideBricks.push(br);
                };
                break;
            case 'addNewInsideBrick':
                return function(posX, posY) {
                    let newBrick = new Brick(posX, posY);
                    self.addInsideBrick(newBrick);
                };
                break;
            case 'addBoundBrick':
                return function(br) {
                    self.boundBricks.push(br);
                };
                break;
            case 'addNewBoundBrick':
                return function(posX, posY) {
                    let newBrick = new Brick(posX, posY);
                    self.addBoundBrick(newBrick);
                };
                break;
            case 'getNumberOfInsideBricks':
                return function() {
                    return self.insideBricks.length;
                };
                break;
            case 'getInsideBrickByIndex':
                return function(id) {
                    if (id<0 || id>=self.insideBricks.length) return undefined;
                    return self.insideBricks[id];
                };
                break;
            case 'getBricksDataForTransfer':
                return function() {
                    return {
                        insideBricks: self.insideBricks,
                        boundBricks: self.boundBricks
                    };
                };
                break;
            case 'brickCheckPos':
                return function(x1, y1, x2, y2) {
                    for (let i=0; i<self.bricks.length; i++) {
                        let x = self.bricks[i].getX();
                        let y = self.bricks[i].getY();
                        if (overlapRect(x, y, x+self.brickSize-1, y+self.brickSize-1, x1, y1, x2, y2)===true)
                            return i;
                    }
                    return -1;
                }
                break;
            case 'brickGetPosByIndex':
                return function(index) {
                    if (index<0 || index>=self.bricks.length) return undefined;
                    return self.bricks[index].getPos();
                }
                break;
            default:
                console.log(funcName + 'is not valid in BulletMgr');
        }
    }

    
    
    
}

module.exports = BrickMgr0;