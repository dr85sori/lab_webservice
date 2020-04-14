var pictureCounter = 0;
function addPicture() {
  var pictureID = 'pic';
  console.log(pictureID+pictureCounter);
  window[pictureID+pictureCounter] = document.createElement('img');
  window[pictureID+pictureCounter].setAttribute('src', 'https://www.gameswirtschaft.de/wp-content/uploads/2019/09/Quake-2-RTX-Nvidia-Bethesda.jpg');
  document.getElementById("pictureContainer").appendChild(window[pictureID+pictureCounter]);
  pictureCounter++;
}
  	function clickshowallimage() {
  		var request = new XMLHttpRequest();
  		(function loop(i, length) {
      		if (i>= length) {
          		return;
      		}
      
      		request.open("GET", url);
      		var url = 'http://localhost:8080/picture/formatted/'+i;
      		console.log(url);
      		request.open("GET",url,true);
      		//request.setRequestHeader( "Authorization", "Bearer " + token_global)
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
    				//image in feed laden
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