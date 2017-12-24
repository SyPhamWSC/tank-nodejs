'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalfTankSize = Math.floor(TankSize / 2);
var HalfBulletSize = Math.floor(BulletSize / 2);

var AnimationDrawer = function () {
    _createClass(AnimationDrawer, [{
        key: "initAnimationImgs",
        value: function initAnimationImgs() {
            var tankEx1Img = new Image();
            var tankEx2Img = new Image();
            var tankEx3Img = new Image();
            var tankEx4Img = new Image();
            var tankEx5Img = new Image();
            tankEx1Img.src = "RESOURCE/Image/tank_exp1.png";
            tankEx2Img.src = "RESOURCE/Image/tank_exp2.png";
            tankEx3Img.src = "RESOURCE/Image/tank_exp3.png";
            tankEx4Img.src = "RESOURCE/Image/tank_exp4.png";
            tankEx5Img.src = "RESOURCE/Image/tank_exp5.png";
            var bulletEx1Img = new Image();
            var bulletEx2Img = new Image();
            var bulletEx3Img = new Image();
            var bulletFinalEx = new Image();
            bulletEx1Img.src = "RESOURCE/Image/bullet_exp1.png";
            bulletEx2Img.src = "RESOURCE/Image/bullet_exp1.png";
            bulletEx3Img.src = "RESOURCE/Image/bullet_exp1.png";
            bulletFinalEx.src = "RESOURCE/Image/explosion.png";

            var tankExImgArr = [tankEx1Img, tankEx2Img, tankEx3Img, tankEx4Img, tankEx5Img];
            var bulletExImgArr = [bulletEx1Img, bulletEx2Img, bulletEx3Img, bulletFinalEx];
            return [tankExImgArr, bulletExImgArr];
        }
    }]);

    function AnimationDrawer(theContext) {
        _classCallCheck(this, AnimationDrawer);

        this.context = theContext;
        this.tankUid = -1;
        this.img = this.initAnimationImgs();
        this.exMusic = [new Audio('RESOURCE/sound/explosion_tank.wav'), //0 - tank, 1 - bullet
        new Audio('RESOURCE/sound/explosion.wav')];
        this.animArr = [];
    }

    _createClass(AnimationDrawer, [{
        key: "setTankUid",
        value: function setTankUid(id) {
            this.tankUid = id;
        }
    }, {
        key: "addTankExplose",
        value: function addTankExplose(tankEx) {
            for (var i = 0; i < tankEx.length; i++) {
                var p = tankEx[i];
                this.animArr.push({
                    type: 0,
                    curImg: 0,
                    cenX: p.x + HalfTankSize,
                    cenY: p.y + HalfTankSize,
                    killerUid: p.killerUid
                });
            }
        }
    }, {
        key: "addBulletExplose",
        value: function addBulletExplose(bulletEx) {
            for (var i = 0; i < bulletEx.length; i++) {
                var p = bulletEx[i];
                this.animArr.push({
                    type: 1,
                    curImg: 0,
                    cenX: p.x,
                    cenY: p.y,
                    ownerUid: p.ownerUid
                });
            }
        }
    }, {
        key: "runAnimation",
        value: function runAnimation() {
            var tmp = [];
            for (var i = 0; i < this.animArr.length; i++) {
                var curAnim = this.animArr[i];
                var img = this.img[curAnim.type][curAnim.curImg];
                if (curAnim.curImg === 0) {
                    switch (curAnim.type) {
                        case 0:
                            //tank
                            if (curAnim.killerUid === this.tankUid) this.exMusic[curAnim.type].play();
                        case 1:
                            //bullet
                            if (curAnim.ownerUid === this.tankUid) this.exMusic[curAnim.type].play();
                    }
                }
                context2D.drawImage(img, curAnim.cenX - img.width / 2, curAnim.cenY - img.height / 2);
                if ((curAnim.curImg += 1) < this.img[curAnim.type].length) tmp.push(curAnim);
            }
            this.animArr = tmp;
        }
    }]);

    return AnimationDrawer;
}();