'use strict';

class TankDrawer {
    initTankImgs() {
        let enemyTankImgUp = new Image();
        let enemyTankImgDown = new Image();
        let enemyTankImgLeft = new Image();
        let enemyTankImgRight = new Image();
        enemyTankImgUp.src = "RESOURCE/Image/bossyellow_up.png";
        enemyTankImgDown.src = "RESOURCE/Image/bossyellow_down.png";
        enemyTankImgLeft.src = "RESOURCE/Image/bossyellow_left.png";
        enemyTankImgRight.src = "RESOURCE/Image/bossyellow_right.png";
        let enemyTankImgArr = [enemyTankImgUp, enemyTankImgDown, enemyTankImgLeft, enemyTankImgRight];
        
        let allyTankImgUp = new Image();
        let allyTankImgDown = new Image();
        let allyTankImgLeft = new Image();
        let allyTankImgRight = new Image();
        allyTankImgUp.src = "RESOURCE/Image/player_green_up.png";
        allyTankImgDown.src = "RESOURCE/Image/player_green_down.png";
        allyTankImgLeft.src = "RESOURCE/Image/player_green_left.png";
        allyTankImgRight.src = "RESOURCE/Image/player_green_right.png";
        let allyTankImgArr = [allyTankImgUp, allyTankImgDown, allyTankImgLeft, allyTankImgRight];

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
        let tankExImgArr = [tankEx1Img, tankEx2Img, tankEx3Img, tankEx4Img, tankEx5Img];
        
        return {
            allyTankImgArr: allyTankImgArr,
            enemyTankImgArr: enemyTankImgArr,
            tankExImgArr: tankExImgArr
        }
    }
    constructor(theContext, TankSize) {
        this.context = theContext;
        this.img = this.initTankImgs();
        this.shootMusic = new Audio('RESOURCE/sound/shoot.wav');
        this.tankUid = -1;
        this.TankSize = TankSize;
        this.preTankArr = [];
        this.curTankArr = [];
    }
    drawATank(x, y) {
        context2D.drawImage(this.img.allyTankImgArr[0], x, y);
    }
    printCurTankArr() {
        console.log(this.curTankArr);
    }
    printPreTankArr() {
        console.log(this.preTankArr);
    }
    setTankUid(id) {
        this.tankUid = id;
    }
    setNewTankData(newTankData) {
        this.preTankArr = this.curTankArr;
        this.curTankArr = newTankData;
    }
    eraseTank(x, y) {
        context2D.fillStyle = "#000000";
        context2D.fillRect(x, y, this.TankSize, this.TankSize);
    }
    erasePreviousTankState() {
        for (let i=0; i<this.preTankArr.length; i++)
            this.eraseTank(this.preTankArr[i].x, this.preTankArr[i].y);
    }
    eraseCurrentTankState() {
        for (let i=0; i<this.curTankArr.length; i++)
            this.eraseTank(this.curTankArr[i].x, this.curTankArr[i].y);
    }
    drawNewTankState() {
        for (let i=0; i<this.curTankArr.length; i++) {
            let curTank = this.curTankArr[i];
            let img;
            if (curTank.uid===this.tankUid) {
                img = this.img.allyTankImgArr[curTank.dir];
                if (curTank.shootSound===true) 
                    this.shootMusic.play();
            } else {
                img = this.img.enemyTankImgArr[curTank.dir];
            }
            context2D.drawImage(img, curTank.x, curTank.y);
            context2D.fillStyle = "#FFFFFF";
            context2D.font = "15px Georgia";
            context2D.fillText(curTank.name, curTank.x, curTank.y - 10);
        }
    }
    drawTanks() {
        this.erasePreviousTankState();
        this.drawNewTankState();
    }
    runTankExAnimation(x, y) {
        for (let i=0; i<this.img.tankExImgArr.length; i++)
            context2D.drawImage(this.img.tankExImgArr[i], x, y);
        //this.eraseTank(x, y);
    }
    addTankExplose(tankEx) {
        for (let i=0; i<tankEx.length; i++) {
            this.eraseTank(tankEx[i].x, tankEx[i].y); //khong co dong nay cung duoc, truoc do xoa roi
            this.runTankExAnimation(tankEx[i].x, tankEx[i].y);
        }
    }
}