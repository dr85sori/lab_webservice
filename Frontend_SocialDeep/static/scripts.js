
var token_global;

function update_content() {
  		var request = new XMLHttpRequest();
  		(function loop(i, length) {
      		if (i>= length) {
          		return;
      		}
      		request.open("GET", url);
      		var url = 'http://localhost:8080/image/real-image/'+i;
      		console.log(url);
      		request.open("GET",url,true);
      		request.setRequestHeader( "Authorization", "Bearer " + token_global)
      		request.responseType = 'arraybuffer';
      		request.onreadystatechange = function() {
          		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
              		var data = request.response;
              		console.log('-->' + i + ' data: ' + data);
              		var uInt8Array = new Uint8Array(data);
              		var j = uInt8Array.length;
              		var biStr = new Array(j);
              		while (j--) {
              			biStr[j] = String.fromCharCode(uInt8Array[j]);
              		}
              		var data = biStr.join('');
              		var base64 = window.btoa(data);
              		var pictureID = 'pic';
              		window[pictureID+i] = document.createElement('img');
  		      		window[pictureID+i].setAttribute('src', "data:image/png;base64," + base64);
              		document.getElementById("pictureContainer").appendChild(window[pictureID+i]);
					loop(i + 1, length);
          		}
          		else{
            		console.log("error Bild nicht gefunden");
            		loop(1001, length);
          		}
      		}
      		request.send();
  		})(1, 100);
	}

function update_after_upload(current_id) {
	var request = new XMLHttpRequest();
    request.open("GET", url);
    var url = 'http://localhost:8080/image/real-image/'+current_id;
    console.log(url);
    request.open("GET",url,true);
    request.setRequestHeader( "Authorization", "Bearer " + token_global)
    request.responseType = 'arraybuffer';
    request.onreadystatechange = function() {
    	if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        	var data = request.response;
        	console.log('-->' + current_id + ' data: ' + data);
        	var uInt8Array = new Uint8Array(data);
        	var j = uInt8Array.length;
        	var biStr = new Array(j);
        	while (j--) {
         		biStr[j] = String.fromCharCode(uInt8Array[j]);
        	}
        	var data = biStr.join('');
        	var base64 = window.btoa(data);
        	var pictureID = 'pic';
        	window[pictureID+current_id] = document.createElement('img');
  			window[pictureID+current_id].setAttribute('src', "data:image/png;base64," + base64);
        	document.getElementById("pictureContainer").appendChild(window[pictureID+current_id]);
    	} else {
        	console.log("error Bild nicht gefunden");
    	}
	}
    request.send();
}

function clickLoginButton() {
    		var name = document.getElementById("input_user").value;
    		var password = document.getElementById("input_password").value;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:8080/auth/signin", false);
    		//xhr.open("POST", "http://localhost:8443/auth/signin", false);
			xhr.setRequestHeader("Content-Type", "application/json");
			var data = JSON.stringify({"username": ''+name+'', "password": ''+password+''});
			xhr.send(data);
			var obj = JSON.parse(xhr.responseText);
			//document.getElementById("paragraph-for-token").innerHTML = obj.token;
			token_global = obj.token;
			document.getElementById("input_user").value = '';
			document.getElementById("input_password").value = '';
			if (obj.token === undefined) {
				document.getElementById("paragraph-for-token").innerHTML = 'login failed';
			} else {
				document.getElementById("login_screen").style.display = 'none';//login-deep-dream-app
				document.getElementById("story_screen").style.display = 'block';//main_buttons
				console.log(token_global);
				update_content();
			}
}

function clickSendButtonPicInfo(pictureID) 
{
    var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://localhost:8080/image/" + pictureID, false ); //false for synchronous request
	xhr.setRequestHeader( "Authorization", "Bearer " + token_global);
    xmlHttp.send( null );
    document.getElementById('list').innerHTML = "" + xmlHttp.responseText;		//list
}

function clickSendButtonPic(pictureID) 
{
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8080/image/real-image/'+image_id; 			//Path
	xhr.open("GET",url,true);
	xhr.setRequestHeader( "Authorization", "Bearer " + token_global);
    xhr.responseType = 'arraybuffer';
	xhr.onerror = function(e) { alert('error'); };
    xhr.onload = function(e) {
      if (this.status == 200) {
        console.log(xhr.response);
        var uInt8Array = new Uint8Array(this.response);
        var i = uInt8Array.length;
        var biStr = new Array(i);
        while (i--) {
          biStr[i] = String.fromCharCode(uInt8Array[i]);
        }
        var data = biStr.join('');
        var base64 = window.btoa(data);
    	console.log("3> " + base64);
        xhr.onerror = function(e) { alert('error'); };
    	document.getElementById("myImage").src="data:image/png;base64," + base64; 
      } else {
        console.log("error Bild nicht gefunden");
        document.getElementById("text").style.display="block";
        document.getElementById("text").innerText="Error, Bild nicht gefunden";
      }
    };
    xhr.send();
}

function clickUploadPicture() {
	//todo
}

function returnToken(){
	return token_global;
  }

function clickDeepDreamAction() {
	
	 // OR include deepai.min.js as a script tag in your HTML
	//const deepai = require('deepai');
	deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

	(async function() {
    	var resp = await deepai.callStandardApi("deepdream", {
            image: document.getElementById('myImage'),
    	});
    	console.log(resp);
	})()
}

function clickSendget_picture_infoButton()
{
	document.getElementById("get_picture_info").style.display = "block";
	document.getElementById("upload_picture_button").style.display = "none";
	document.getElementById("get_picture_info_button").style.display = "none";
	document.getElementById("get_picture_formatted_button").style.display = "none";
}
function clickFormattedPicture() {
	document.getElementById("get_picture_formatted").style.display = "block";
	document.getElementById("upload_picture_button").style.display = "none";
	document.getElementById("get_picture_info_button").style.display = "none";
	document.getElementById("get_picture_formatted_button").style.display = "none";
}

function clickUploadPicture() {
	document.getElementById("upload_picture").style.display = "block";
	/*document.getElementById("upload_picture_button").style.display = "none";
	document.getElementById("get_picture_info_button").style.display = "none";
	document.getElementById("get_picture_formatted_button").style.display = "none";*/
	document.getElementById("story_screen").style.display = "none";
}

function clickBackToMainFromGetInfo() 
{
	document.getElementById("get_picture_info").style.display = "none";
	document.getElementById("upload_picture_button").style.display = "inline";
	document.getElementById("get_picture_info_button").style.display = "inline";
	document.getElementById("get_picture_formatted_button").style.display = "inline";
	document.getElementById("list").innerHTML = "";
}

function clickBackToMainFromFormatted () {
	document.getElementById("get_picture_formatted").style.display = "none";
	document.getElementById("upload_picture_button").style.display = "inline";
	document.getElementById("get_picture_info_button").style.display = "inline";
	document.getElementById("get_picture_formatted_button").style.display = "inline";
	document.getElementById('text').innerHTML = "";
	document.getElementById("myImage").src = "";
}

function clickBackToMainFromUpload() {
	document.getElementById("upload_picture").style.display = "none";
	/*document.getElementById("upload_picture_button").style.display = "inline";
	document.getElementById("get_picture_info_button").style.display = "inline";
	document.getElementById("get_picture_formatted_button").style.display = "inline";*/
	document.getElementById("story_screen").style.display = "inline";
}
