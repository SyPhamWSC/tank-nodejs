'use strict';

var Bullet = require('./bullet');

class BulletMgr0 {
    constructor(BulletSize) {
        this.bullets = [];
        this.bulletSize = BulletSize;
        this.getBulletsDataForTransfer = this.getFunctionFromName('getBulletsDataForTransfer');
        this.updateBulletState = this.getFunctionFromName('updateBulletState');
        this.addBullet = this.getFunctionFromName('addBullet');
        this.addBulletInstance = this.getFunctionFromName('addBulletInstance');
    }
    getFunctionFromName(funcName) {
        var self = this;
        switch (funcName) {
            case 'getBulletsDataForTransfer':
                return function() {
                    let ret = [];
                    for (let i=0; i<self.bullets.length; i++) {
                        let b = {
                            x: self.bullets[i].x,
                            y: self.bullets[i].y
                        };
                        ret.push(b);
                    }
                    return ret;
                };
                break;
            case 'updateBulletState':
                return function() {
                    for (let i=0; i<self.bullets.length; i++) {
                        self.bullets[i].makeMove();
                    }
                }
                break;
            case 'addBullet':
                return function(newBullet) {
                    self.bullets.push(newBullet);
                }
                break;
            case 'addBulletInstance':
                return function(bulletInstance) {
                    let newBullet = new Bullet(bulletInstance.ownerUid, bulletInstance.x,
                                    bulletInstance.y, bulletInstance.dir, bulletInstance.speed, bulletInstance.ownerIndex);
                    self.addBullet(newBullet);
                }
                break;
            default:
                console.log(funcName + 'is not valid in BulletMgr');
        }
    }
}

module.exports = BulletMgr0;