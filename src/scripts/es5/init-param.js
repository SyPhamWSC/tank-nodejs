'use strict';

var GameLoopInterval = 20; //milliseconds
var MapWidth = 920;
var MapHeight = 660;
var EnemyDef = 1;
var AllyDef = 0;
var DirDefUp = 0;
var DirDefDown = 1;
var DirDefLeft = 2;
var DirDefRight = 3;
var BrickSize = 20;
var TankSize = 33;
var BulletSize = 8;
var BulletSpeedDefault = 4;
var TankSpeedDefault = 3;
var ShootCycleTimeLimit = 20;
var NumOfTop = 5;
var mTankTrans = [];

(function () {
    mTankTrans[DirDefUp] = { x: 0, y: -1 };
    mTankTrans[DirDefDown] = { x: 0, y: +1 };
    mTankTrans[DirDefLeft] = { x: -1, y: 0 };
    mTankTrans[DirDefRight] = { x: +1, y: 0 };
})();

//insideBrickArr
var insideBrickArr = [{ x: 600, y: 50 }, { x: 80, y: 100 }, { x: 250, y: 500 }, { x: 300, y: 200 }, { x: 150, y: 400 }];

module.exports = {
    GameLoopInterval: GameLoopInterval,
    MapWidth: MapWidth,
    MapHeight: MapHeight,
    BrickSize: BrickSize,
    TankSize: TankSize,
    BulletSize: BulletSize,
    insideBrickArr: insideBrickArr,
    mTankTrans: mTankTrans,
    TankSpeedDefault: TankSpeedDefault,
    BulletSpeedDefault: BulletSpeedDefault,
    ShootCycleTimeLimit: ShootCycleTimeLimit,
    DirDefUp: DirDefUp,
    DirDefDown: DirDefDown,
    DirDefLeft: DirDefLeft,
    DirDefRight: DirDefRight,
    NumOfTop: NumOfTop
};