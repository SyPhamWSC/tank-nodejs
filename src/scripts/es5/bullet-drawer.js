'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulletDrawer = function () {
    function BulletDrawer(theContext, BulletSize) {
        _classCallCheck(this, BulletDrawer);

        this.context = theContext;
        this.img = new Image();
        this.img.src = "RESOURCE/Image/bullet.png";
        this.BulletSize = BulletSize;
        this.curBrickArr = [];
        this.preBrickArr = [];
    }

    _createClass(BulletDrawer, [{
        key: "setNewBulletData",
        value: function setNewBulletData(newBulletData) {
            this.curBrickArr = newBulletData;
        }
    }, {
        key: "eraseBullet",
        value: function eraseBullet(x, y) {
            context2D.fillStyle = "#000000";
            context2D.fillRect(x, y, this.BulletSize, this.BulletSize);
        }
    }, {
        key: "eraseCurrentBulletState",
        value: function eraseCurrentBulletState() {
            for (var i = 0; i < this.curBrickArr.length; i++) {
                this.eraseBullet(this.curBrickArr[i].x, this.curBrickArr[i].y);
            }
        }
    }, {
        key: "drawNewBulletState",
        value: function drawNewBulletState() {
            for (var i = 0; i < this.curBrickArr.length; i++) {
                context2D.drawImage(this.img, this.curBrickArr[i].x, this.curBrickArr[i].y);
            }
        }
    }]);

    return BulletDrawer;
}();