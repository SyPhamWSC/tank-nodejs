
var mongoose 	=	 require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema 	=  mongoose.Schema({
	username : {
		type 	: String,
		index	: true,
		required: true
	},
	password 	: String,	
	email 		: String,
	score 		: String
});

//export model
var User = mongoose.model('User', UserSchema);
module.exports = User;
