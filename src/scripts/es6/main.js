'use strict';

var playerIndex = -1;
var counter = 0;
var started = 0;
var tankUid = -1;
var context2D;
var brickDrawer = new BrickDrawer(context2D);
var tankDrawer = new TankDrawer(context2D, TankSize);
var bulletDrawer = new BulletDrawer(context2D, BulletSize);
var animationDrawer = new AnimationDrawer(context2D);
var socket = io();
var gameData;
var started = false;
var startMusic = new Audio('RESOURCE/sound/enter_game.wav');

function clearPlayArea() {
    context2D.fillStyle = "#000000";
    context2D.fillRect(0, 0, MapWidth, MapHeight);
}
function clearAll() {
    context2D.fillStyle = "#000000";
    context2D.fillRect(0, 0, MapWidth, MapHeight);
}
function clearInside() {
    context2D.fillStyle = "#000000";
    context2D.fillRect(BrickSize, BrickSize, MapWidth-BrickSize*2, MapHeight-BrickSize*2);
}

socket.on('initBrick', function(brickData){
    brickDrawer.setBrickData(brickData);
    brickDrawer.drawBricks();
});
socket.on('sendUid', function(id){
    tankUid = id;
    tankDrawer.setTankUid(id);
    animationDrawer.setTankUid(id);
});

/*
socket.on('dataTransfer', function(curData){
    //countDraw++;
    //let ss = new Date().getTime();
    //clearInside();
    tankDrawer.eraseCurrentTankState();
    bulletDrawer.eraseCurrentBulletState();

    tankDrawer.setNewTankData(curData.tankData);
    tankDrawer.drawNewTankState();
    
    bulletDrawer.setNewBulletData(curData.bulletData);
    bulletDrawer.drawNewBulletState();

    if (curData.exData.tankEx.length===0 && curData.exData.brickEx===0) return;
    //let tankEx = curData.exData.tankEx;
    tankDrawer.addTankExplose(curData.exData.tankEx);
    let bulletEx = curData.exData.brickEx;
    brickDrawer.drawBricks();

    //console.log('Draw completed '+(new Date().getTime()-ss)+' Time - '+countDraw);
    //tankDrawer.test();
    //gameData = curData;
    
});
*/

function updateScore(scoreArr) {
    let htmlScore = '';
    let atv = '';
    for (let i=0; i<scoreArr.length; i++) {
        let player = scoreArr[i];
        if (player.uid === tankUid) {
            atv = 'atv';
        } else atv = '';
        htmlScore+= '<div class="player ' + atv + '" data-id="' + player.uid + '">' +
                        '<span class="name">' + player.name + '</span>: ' +
                        '<span class="score">' + player.score + '</span>' +
                    '</div>';
        $('#top-list').html(htmlScore);
    }
}

socket.on('dataTransfer', function(curData){
    if (started===false) {
        startMusic.play();
        started = true;
    }
    clearInside();
    brickDrawer.drawBricks();
    
    tankDrawer.setNewTankData(curData.tankData);
    tankDrawer.drawNewTankState();
    
    bulletDrawer.setNewBulletData(curData.bulletData);
    bulletDrawer.drawNewBulletState();

    //if (curData.exData.tankEx.length===0 && curData.exData.brickEx===0) return;
    animationDrawer.addTankExplose(curData.exData.tankEx);
    animationDrawer.addBulletExplose(curData.exData.brickEx);
    animationDrawer.runAnimation();

    updateScore(curData.scoreData);
});

$(document).on('keydown', function(k) {
    switch (k.keyCode) {
        case 87: //up
            socket.emit('requestMove', DirDefUp);
            break;
        case 83: //down
            socket.emit('requestMove', DirDefDown);
            break;
        case 65: //left
            socket.emit('requestMove', DirDefLeft);
            break;
        case 68: //right
            socket.emit('requestMove', DirDefRight);
            break;
        case 32: //space
            socket.emit('requestShoot');
            break;
    }
});
$(document).on('keyup', function(k) {
    socket.emit('requestStop');
});

$(document).ready(function() {
    let canvas = $('#canv')[0];
    canvas.width = MapWidth;
    canvas.height = MapHeight;
    context2D = canvas.getContext("2d");
    clearAll();
    socket.emit('login');
});