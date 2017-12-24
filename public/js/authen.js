
function validateLogin(){
	var user = document.getElementById("user").value;
	var pass = document.getElementById('pass').value;
	document.getElementById('errUser').innerHTML="";
	document.getElementById('errPass').innerHTML="";

	var check = true;

	if(user===''||user===undefined){
		document.getElementById('errUser').innerHTML="*Please enter a username*";
		check = false;
	}else if(pass===''||pass===undefined){
		document.getElementById('errPass').innerHTML="*Please enter pasword to login*";
		check = false;
	}
	
	console.log(user+'');
	if(check){
		$.post("http://localhost:8080/login",{user:user,pass:pass},function(data){		
			if(data==='done')			
			{
				console.log('done');
				window.location.href ="/index";
			}

			if(data==='not match'){
				document.getElementById('errPass').innerHTML="*Username or password not correct*";
			}

			if(data==='not exist'){
				document.getElementById('errUser').innerHTML="*Account not exist, please create account*";
			}
		});
	}
	
}

function validateSignUp(){
	var user = document.getElementById("userSignUp").value;
	var pass = document.getElementById('passSignUp').value;
	var rePass = document.getElementById('passRePass').value;
	var email = document.getElementById('email').value;

	document.getElementById('errUserSignUp').innerHTML="";
	document.getElementById('errPassSignUp').innerHTML="";
	document.getElementById('errPassRePass').innerHTML="";
	document.getElementById('errEmail').innerHTML="";

	var check = true;

	if(user===''||user===undefined){
		document.getElementById('errUserSignUp').innerHTML="*Please enter a username*";
		check = false;
	}else if(pass===''||pass===undefined){
		document.getElementById('errPassSignUp').innerHTML="*Please enter pasword*";
		check = false;
	}else if(rePass===''||pass===undefined){
		document.getElementById('errPassRePass').innerHTML="*Please enter repeat pasword*";
		check = false;
	}

	if(!validateEmail(email)){
		document.getElementById('errEmail').innerHTML="*Format Email error*";
		check = false;
	}

	if(pass != rePass){
		document.getElementById('errPassRePass').innerHTML="*RepeatPass not match*";
		check = false;
	}

	if(check){
		$.post("http://localhost:8080/signup",{user:user,pass:pass,email:email},function(data){		
		
			if(data==='done'){
				console.log('done');
				window.location.href ="/index";
			}else{
				document.getElementById('errUserSignUp').innerHTML="*User exist! Try again*";
				console.log("exist");
			}
		});
	}



}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
