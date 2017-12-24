'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrickDrawer = function () {
    function BrickDrawer(theContext) {
        _classCallCheck(this, BrickDrawer);

        this.context = theContext;
        this.img = new Image();
        this.img.src = "RESOURCE/Image/brick.png";

        this.brickArr = [];
        this.insideBrickArr = [];
        this.boundBrickArr = [];
    }

    _createClass(BrickDrawer, [{
        key: "setBrickData",
        value: function setBrickData(brickData) {
            this.insideBrickArr = brickData.insideBricks;
            this.boundBrickArr = brickData.boundBricks;
            this.brickArr = this.boundBrickArr.concat(this.insideBrickArr);
        }
    }, {
        key: "drawBricks",
        value: function drawBricks() {
            for (var i = 0; i < this.brickArr.length; i++) {
                context2D.drawImage(this.img, this.brickArr[i].x, this.brickArr[i].y);
            }
        }
    }]);

    return BrickDrawer;
}();