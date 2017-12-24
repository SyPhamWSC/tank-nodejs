'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TankDrawer = function () {
    _createClass(TankDrawer, [{
        key: "initTankImgs",
        value: function initTankImgs() {
            var enemyTankImgUp = new Image();
            var enemyTankImgDown = new Image();
            var enemyTankImgLeft = new Image();
            var enemyTankImgRight = new Image();
            enemyTankImgUp.src = "RESOURCE/Image/bossyellow_up.png";
            enemyTankImgDown.src = "RESOURCE/Image/bossyellow_down.png";
            enemyTankImgLeft.src = "RESOURCE/Image/bossyellow_left.png";
            enemyTankImgRight.src = "RESOURCE/Image/bossyellow_right.png";
            var enemyTankImgArr = [enemyTankImgUp, enemyTankImgDown, enemyTankImgLeft, enemyTankImgRight];

            var allyTankImgUp = new Image();
            var allyTankImgDown = new Image();
            var allyTankImgLeft = new Image();
            var allyTankImgRight = new Image();
            allyTankImgUp.src = "RESOURCE/Image/player_green_up.png";
            allyTankImgDown.src = "RESOURCE/Image/player_green_down.png";
            allyTankImgLeft.src = "RESOURCE/Image/player_green_left.png";
            allyTankImgRight.src = "RESOURCE/Image/player_green_right.png";
            var allyTankImgArr = [allyTankImgUp, allyTankImgDown, allyTankImgLeft, allyTankImgRight];

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
            var tankExImgArr = [tankEx1Img, tankEx2Img, tankEx3Img, tankEx4Img, tankEx5Img];

            return {
                allyTankImgArr: allyTankImgArr,
                enemyTankImgArr: enemyTankImgArr,
                tankExImgArr: tankExImgArr
            };
        }
    }]);

    function TankDrawer(theContext, TankSize) {
        _classCallCheck(this, TankDrawer);

        this.context = theContext;
        this.img = this.initTankImgs();
        this.shootMusic = new Audio('RESOURCE/sound/shoot.wav');
        this.tankUid = -1;
        this.TankSize = TankSize;
        this.preTankArr = [];
        this.curTankArr = [];
    }

    _createClass(TankDrawer, [{
        key: "drawATank",
        value: function drawATank(x, y) {
            context2D.drawImage(this.img.allyTankImgArr[0], x, y);
        }
    }, {
        key: "printCurTankArr",
        value: function printCurTankArr() {
            console.log(this.curTankArr);
        }
    }, {
        key: "printPreTankArr",
        value: function printPreTankArr() {
            console.log(this.preTankArr);
        }
    }, {
        key: "setTankUid",
        value: function setTankUid(id) {
            this.tankUid = id;
        }
    }, {
        key: "setNewTankData",
        value: function setNewTankData(newTankData) {
            this.preTankArr = this.curTankArr;
            this.curTankArr = newTankData;
        }
    }, {
        key: "eraseTank",
        value: function eraseTank(x, y) {
            context2D.fillStyle = "#000000";
            context2D.fillRect(x, y, this.TankSize, this.TankSize);
        }
    }, {
        key: "erasePreviousTankState",
        value: function erasePreviousTankState() {
            for (var i = 0; i < this.preTankArr.length; i++) {
                this.eraseTank(this.preTankArr[i].x, this.preTankArr[i].y);
            }
        }
    }, {
        key: "eraseCurrentTankState",
        value: function eraseCurrentTankState() {
            for (var i = 0; i < this.curTankArr.length; i++) {
                this.eraseTank(this.curTankArr[i].x, this.curTankArr[i].y);
            }
        }
    }, {
        key: "drawNewTankState",
        value: function drawNewTankState() {
            for (var i = 0; i < this.curTankArr.length; i++) {
                var curTank = this.curTankArr[i];
                var img = void 0;
                if (curTank.uid === this.tankUid) {
                    img = this.img.allyTankImgArr[curTank.dir];
                    if (curTank.shootSound === true) this.shootMusic.play();
                } else {
                    img = this.img.enemyTankImgArr[curTank.dir];
                }
                context2D.drawImage(img, curTank.x, curTank.y);
                context2D.fillStyle = "#FFFFFF";
                context2D.font = "15px Georgia";
                context2D.fillText(curTank.name, curTank.x, curTank.y - 10);
            }
        }
    }, {
        key: "drawTanks",
        value: function drawTanks() {
            this.erasePreviousTankState();
            this.drawNewTankState();
        }
    }, {
        key: "runTankExAnimation",
        value: function runTankExAnimation(x, y) {
            for (var i = 0; i < this.img.tankExImgArr.length; i++) {
                context2D.drawImage(this.img.tankExImgArr[i], x, y);
            } //this.eraseTank(x, y);
        }
    }, {
        key: "addTankExplose",
        value: function addTankExplose(tankEx) {
            for (var i = 0; i < tankEx.length; i++) {
                this.eraseTank(tankEx[i].x, tankEx[i].y); //khong co dong nay cung duoc, truoc do xoa roi
                this.runTankExAnimation(tankEx[i].x, tankEx[i].y);
            }
        }
    }]);

    return TankDrawer;
}();