/**
 * Loads an image into canvas.
 * 
 */
   const canvas = document.querySelector('#originalcam');
   const canvas2=document.querySelector("#mycams");
   const ctx2=canvas2.getContext('2d');
  const ctx = canvas.getContext('2d');
  let Video=document.querySelector("video");


async function keepbackground() {
        const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 1
  });
const segmentation = await net.segmentPerson(canvas);
const coloredPartImage = bodyPix.toMask(segmentation);
const opacity = .9;
const flipHorizontal = false;
const maskBlurAmount = 10;
const backgroundBlurAmount = 3;
const edgeBlurAmount = 1;
// bodyPix.drawMask(
  //  canvas2, canvas, coloredPartImage, opacity, maskBlurAmount,
   // flipHorizontal)
   bodyPix.drawBokehEffect( canvas2, canvas, segmentation, backgroundBlurAmount,
    edgeBlurAmount,
   flipHorizontal)
}

navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({video:true,width:"100px",height:"100px"},handleVideo,videoError)
}
function handleVideo(stream) {
 Video.srcObject=stream;

    let stream_settings = stream.getVideoTracks()[0].getSettings();
 //canvas.width = stream_settings.width;
   // canvas.height = stream_settings.height;
  //  canvas2.width=stream_settings.width;
//canvas2.height = stream_settings.height;
   canvas.width = 300;
    canvas.height = 300;
let img1= new Image(100,100);
img1.src=stream;
    setInterval(()=> {
 //ctx.drawImage(Video,0,0,stream_settings.width/2,stream_settings.height/2)
 ctx.drawImage(Video,0,0,300,300)
    keepbackground();
},10)
}
function videoError() {
  alert("something is wrong")
}
