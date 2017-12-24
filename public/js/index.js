
function logout() {
	$.post("http://localhost:8080/logout",{},function(data){		
			if(data==='done')			
			{
				console.log('done');
				window.location.href = "/";
			}
	});
}

function getProfile(){
	$.post("http://localhost:8080/profile",{},function(data,status){		
		var json = JSON.parse(data);
		console.log(json);

		document.getElementById('username').innerHTML="Hello " + json.username;

	});
}

function onClickPlay(){
	window.location.href = "/play";
}

