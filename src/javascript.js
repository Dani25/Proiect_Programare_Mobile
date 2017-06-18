//var video = document.getElementById("video");
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var video = document.createElement("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mask = new Image();
var mask1 = new Image();
mask.src = "mask3.png";
mask1.src = "mask.png";
var mask2 = new Image();
mask2.src = "mask5.png";
var mask3 = new Image();
mask3.src = "mask1.png";
var mask4 = new Image();
mask4.src = "mask2.png";
var originalFace;
var SCALE_EXPERIMENT = 'scale';
var MASK_EXPERIMENT = 'mask';
//video.setAttribute("autoplay", true);

video.addEventListener("touchstart",capteaza);
video.addEventListener("mousedown",capteaza);
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

	if(MASK_EXPERIMENT) {
        drawMasks(faces);
            } else {
        founded_Faces(faces);

    if(originalFace && faces.length > 0) {
        scaleContent(faces[0]);
                }

    if( ! originalFace && faces.length === 1) {
        originalFace = faces[0];
                }
            }
    setTimeout(processWebcamVideo, 1);
}


function detectFaces() 
{
	return ccv.detect_objects({canvas : (ccv.pre(canvas)), cascade: cascade, interval: 5, min_neighbors: 1});
}
function founded_Faces(faces)
{
	if(!faces) 
	{
        return false;
    }

    for (var i = 0; i < faces.length; i++) 
	{
        var face = faces[i];
        context.fillRect(face.x, face.y, face.width, face.height);
    }
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
		//ochelari si mustata
		//context.drawImage(mask2, face.x * 1.0, face.y * 1.1, face.width * 1.15, face.height * 0.9);
		//carnaval
		context.drawImage(mask3, face.x * 0.9, face.y * 0.9, face.width * 1.3, face.height * 1.0);
		//context.drawImage(mask2, face.x * 0.9, face.y * 0.9, face.width * 1.3, face.height * 1.3);
		//bambi
		//context.drawImage(mask4, face.x * 0.9, face.y * 0.3, face.width * 1.3, face.height * 1.8);
		
	}
	
}




function capteaza()
{
	var img = new Image();
	img.width=canvas.width = video.width;
	img.height=canvas.height = video.height;
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
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