'use strict';

const HalfTankSize = Math.floor(TankSize/2);
const HalfBulletSize = Math.floor(BulletSize/2)

class AnimationDrawer {
    initAnimationImgs() {
        let tankEx1Img = new Image();
        let tankEx2Img = new Image();
        let tankEx3Img = new Image();
        let tankEx4Img = new Image();
        let tankEx5Img = new Image();
        tankEx1Img.src = "RESOURCE/Image/tank_exp1.png";
        tankEx2Img.src = "RESOURCE/Image/tank_exp2.png";
        tankEx3Img.src = "RESOURCE/Image/tank_exp3.png";
        tankEx4Img.src = "RESOURCE/Image/tank_exp4.png";
        tankEx5Img.src = "RESOURCE/Image/tank_exp5.png";
        let bulletEx1Img = new Image();
        let bulletEx2Img = new Image();
        let bulletEx3Img = new Image();
        let bulletFinalEx = new Image();
        bulletEx1Img.src = "RESOURCE/Image/bullet_exp1.png";
        bulletEx2Img.src = "RESOURCE/Image/bullet_exp1.png";
        bulletEx3Img.src = "RESOURCE/Image/bullet_exp1.png";
        bulletFinalEx.src = "RESOURCE/Image/explosion.png";

        let tankExImgArr = [tankEx1Img, tankEx2Img, tankEx3Img, tankEx4Img, tankEx5Img];
        let bulletExImgArr = [bulletEx1Img, bulletEx2Img, bulletEx3Img, bulletFinalEx];
        return [tankExImgArr, bulletExImgArr];
    }
    constructor(theContext) {  
        this.context = theContext;
        this.tankUid = -1;
        this.img = this.initAnimationImgs();
        this.exMusic = [
            new Audio('RESOURCE/sound/explosion_tank.wav'), //0 - tank, 1 - bullet
            new Audio('RESOURCE/sound/explosion.wav')
        ];
        this.animArr = [];
    }
    setTankUid(id) {
        this.tankUid = id;
    }
    addTankExplose(tankEx) {
        for (let i=0; i<tankEx.length; i++) {
            let p = tankEx[i];
            this.animArr.push({
                type: 0,
                curImg: 0,
                cenX: p.x+HalfTankSize,
                cenY: p.y+HalfTankSize,
                killerUid: p.killerUid
            });
        }
    }
    addBulletExplose(bulletEx) {
        for (let i=0; i<bulletEx.length; i++) {
            let p = bulletEx[i];
            this.animArr.push({
                type: 1,
                curImg: 0,
                cenX: p.x,
                cenY: p.y,
                ownerUid: p.ownerUid
            });
        }
    }
    runAnimation() {
        let tmp = [];
        for (let i=0; i<this.animArr.length; i++) {
            let curAnim = this.animArr[i];
            let img = this.img[curAnim.type][curAnim.curImg];
            if (curAnim.curImg===0) {
                switch (curAnim.type) {
                    case 0: //tank
                        if (curAnim.killerUid===this.tankUid)
                            this.exMusic[curAnim.type].play();
                    case 1: //bullet
                        if (curAnim.ownerUid===this.tankUid)
                            this.exMusic[curAnim.type].play();
                }
            }
            context2D.drawImage(img, curAnim.cenX-img.width/2, curAnim.cenY-img.height/2);
            if ((curAnim.curImg+=1)<this.img[curAnim.type].length)
                tmp.push(curAnim);
        }
        this.animArr = tmp;
    }
}