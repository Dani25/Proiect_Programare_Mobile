//var video = document.getElementById("video");
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var video = document.createElement("video");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//add masks
var mask1 = new Image();
mask1.src = "mask.png";
var mask2 = new Image();
mask2.src = "mask3.png";
var mask3 = new Image();
mask3.src = "mask5.png";
var mask4 = new Image();
mask4.src = "mask1.png";
var mask5 = new Image();
mask5.src = "mask2.png";

var e = document.getElementById("masca");
e.addEventListener("onchange", success_stream);

video.addEventListener("touchstart",salveaza);
video.addEventListener("mousedown",salveaza);

constraints = {video: true};

navigator.getUserMedia(constraints, success_stream, error);

function success_stream(stream)
{
	video.srcObject = stream;
    processWebcamVideo();
}

function error() 
{
	alert("error."+err.message);
}
function processWebcamVideo()
{	
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	var faces = detectFaces();
	drawMasks(faces);
	setTimeout(processWebcamVideo, 100);
	}

function detectFaces() 
{
	return ccv.detect_objects({canvas : (ccv.pre(canvas)), cascade: cascade, interval: 5, min_neighbors: 1});
}

function drawMasks(faces)
{
	if(!faces) 
	{
        return false;
    }
	for (var i = 0; i < faces.length; i++) 
	{
        var face = faces[i];

		if (e.value==1)
		{
			mask = mask1;
			context.drawImage(mask, face.x * 0.9, face.y * 0.9, face.width * 1.3, face.height * 1.3);
		}
		if (e.value==2)
		{
			mask = mask2;
			context.drawImage(mask, face.x * 0.9, face.y * 0.9, face.width * 1.3, face.height * 1.3);
		}
		if (e.value==3)
		{
			mask = mask3;
			context.drawImage(mask, face.x * 1.0, face.y * 1.1, face.width * 1.15, face.height * 0.9);
		}
		if (e.value==4)
		{
			mask = mask4;
			context.drawImage(mask, face.x * 0.9, face.y * 0.9, face.width * 1.3, face.height * 1.0);
		}
		if (e.value==5)
		{
			mask = mask5;
			context.drawImage(mask, face.x * 0.9, face.y * 0.5, face.width * 1.3, face.height * 1.8);
		}
		
		
	}
	
}

function salveaza() {
    var MIME_TYPE = "image/png";

    var imgURL = canvas.toDataURL(MIME_TYPE);
	
    var obiect = document.createElement('a');
    obiect.download = "IMG";
    obiect.href = imgURL;
    obiect.dataset.downloadurl = [MIME_TYPE, obiect.download, obiect.href].join(':');

    document.body.appendChild(obiect);
    obiect.click();
    document.body.removeChild(obiect);
}