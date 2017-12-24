'use strict';       

const GameLoopInterval = 20; //milliseconds
const MapWidth = 920;
const MapHeight = 660;
const EnemyDef = 1;
const AllyDef = 0;
const DirDefUp = 0;
const DirDefDown = 1;
const DirDefLeft = 2;
const DirDefRight = 3;
const BrickSize = 20;
const TankSize = 33;
const BulletSize = 8;
const BulletSpeedDefault = 4;
const TankSpeedDefault = 3;
const ShootCycleTimeLimit = 20;
const NumOfTop = 5;
var mTankTrans = [];

(function() {
    mTankTrans[DirDefUp] = {x:0, y:-1};
    mTankTrans[DirDefDown] = {x:0, y:+1};
    mTankTrans[DirDefLeft] = {x:-1, y:0};
    mTankTrans[DirDefRight] = {x:+1, y:0};
})();

//insideBrickArr
var insideBrickArr = [
    {x: 600, y: 50},
    {x: 80, y: 100},
    {x: 250, y: 500},
    {x: 300, y: 200},
    {x: 150, y: 400}
];

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
