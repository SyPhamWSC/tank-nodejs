const express = require('express');
const params = require('./src/scripts/es6/init-param');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var session = require('express-session');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/tankjs');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('connect db succesful');
});


var User = require('./models/user.js');

var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({
	secret : "secret",
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	sess = req.session;
	if(sess.user){
		res.redirect('/index');
	}else{
		 res.sendFile(__dirname + '/public/views/login.html');
	}
});

app.post('/login',function(req,res){

	var username = req.body.user;
	var password = req.body.pass;

	User.findOne({'username':username}, function(err,user){
		if(err){
			console.log('findOne error');
		}else if (user!=null) {
			if(user.password == password){
				sess = req.session;
				sess.user = req.body.user;
				sess.email = req.body.email;

				console.log(password+': day la pass');
				console.log(user.password+': day la user.password');
				res.end('done');
			}else{
				console.log(password+': day la pass');
				console.log(user.password+': day la user.password');
				res.end('not match');}
		}else {
			res.end('not exist');
		}
	});


});

app.post('/signup',function(req,res){
	var username = req.body.user;
	var password = req.body.password;
	var email = req.body.email;

	var insert = false;

	User.findOne({'username':username}, function(err,user){
		if(err){
			console.log('findOne error');
		}else if (user!=null) {
			console.log(user.username+" succesful");
			res.end('exist');
		}else {
			var newUser = {
				email: req.body.email,
      			username: req.body.user,
      			password: req.body.pass,
      			score: '0',
			}

			console.log(newUser.email+'');

			User.create(newUser, function (error, user) {
      			if (error) {
      				console.log('error');
      			} else {
        			sess = req.session
        			sess.user = req.body.user;
        			sess.email = req.body.email;

        			console.log('insert succesful');
					res.end('done');
      			}
    		});
			
		}
	});

})

app.get('/index',function(req,res){
	sess=req.session;
	if(sess.user)	
	{
		var username;
		var email;
		var json = JSON.stringify({ 
    		username: sess.user, 
    		email: sess.email
  		});
		console.log('done');
		res.sendFile(__dirname + '/public/views/profile.html');
		console.log(json);
	}
	else
	{
		console.log('false');
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/'+'>Login</a>');
	}
});

app.post('/logout',function(req,res){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			console.log('logout');
			//res.sendFile(__dirname + '/public/views/login.html');
			//res.redirect('/');

			res.end('done');
		}
	});
});

app.post('/profile',function(req,res){
	sess = req.session;
	if(sess.user){
		var username;
		var email;
		var json = JSON.stringify({ 
    		username: sess.user, 
    		email: sess.email
  		});
  		
		res.send(json,200);
	}

	console.log(req.body + " body");
});

app.get('/play',function(req,res){
	
	if(!sess.play){
		console.log('call to play');
		res.sendFile(__dirname + '/src/index.html');
	}

	
});

//Server to play game

const MapWidth = params.MapWidth;
const MapHeight = params.MapHeight;
const BrickSize = params.BrickSize;
const TankSize = params.TankSize;
const BulletSize = params.BulletSize;
const insideBrickArr = params.insideBrickArr;
const mTankTrans = params.mTankTrans;
const GameLoopInterval = params.GameLoopInterval;
const TankSpeedDefault = params.TankSpeedDefault;
const NumOfTop = params.NumOfTop;

var Map = require('./server/map');

var map = new Map(MapWidth, MapHeight, BrickSize, TankSize, BulletSize, insideBrickArr);

var scoreArr = [];

var tmpName = 0;
io.on('connection', function(socket) {
    console.log('Received a connection id: ' + socket.id);
    console.log('username from session: ' + sess.user);
    let idd = -1;
	socket.on('login', function () {
        //let name = (++tmpName).toString();
        let name = sess.user+'';
        let dir = 1;
        let uid = this.id;
        let p = map.getPosForNewTank();
        //console.log('Put a tank at: '+p);
        idd = map.addNewTank(uid, name, p.x, p.y, dir, TankSpeedDefault, true);
        let brickData = map.getBricksDataForTransfer();
        socket.emit('initBrick', brickData);
        socket.emit('sendUid', uid);
	});
    socket.on('requestMove', function(reqDirection) {
        map.setTankMoveByIndex(idd, reqDirection);
    });
    socket.on('requestStop', function() {
        map.setTankStopByIndex(idd);
    });
    socket.on('requestShoot', function(){
        map.setTankShootByIndex(idd);
    });
    socket.on('disconnect', function () {
        map.setTankOutByIndex(idd);
        console.log('An user disconected: '+ this.id);
    }); 
});

function getTopScoreArr(sc) {
    for (let i=0; i<Math.min(NumOfTop, sc.length); i++)
        for (let j=i+1; j<sc.length; j++)
            if (sc[i].score<sc[j].score) {
                let tg = sc[i];
                sc[i] = sc[j];
                sc[j] = tg;
            }
    if (sc.length>NumOfTop)
        sc.splice(NumOfTop, sc.length-NumOfTop);
}

function gameLoop() {
    let ss = new Date().getTime();

    map.update();
    let tankArr = map.getTanksDataForTransfer();
    let bulletArr = map.getBulletsDataForTransfer();
    let exData = map.getExplosionDataForTransfer();
    let scoreArr = map.getScoreDataForTransfer();
    getTopScoreArr(scoreArr);
    let curData = {
        tankData: tankArr,
        bulletData: bulletArr,
        exData: exData,
        scoreData: scoreArr
    }
    io.sockets.emit('dataTransfer', curData);

    let se = new Date().getTime();
    if (se-ss>10) console.log('Time: '+(se-ss));
}

setInterval(gameLoop, GameLoopInterval);

app.use(express.static(__dirname + '/src'));

http.listen(port);
console.log('Listing on port: '+ port);