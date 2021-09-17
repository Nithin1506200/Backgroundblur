/**
 * Loads an image into canvas.
 * 
 */
   const canvas = document.querySelector('#originalcam');
   const canvas2=document.querySelector("#mycams");
   const ctx2=canvas2.getContext('2d');
  const ctx = canvas.getContext('2d');
  let Video=document.querySelector("video");

  
// function loadImage(src) {
//   const img = new Image();
//   img.crossOrigin = '';

//     // Set canvas width, height same as image
//     // canvas.width = img.width;
//     // canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);
//     keepbackground();
//   img.src = src;
// }


/**
 * Remove background an image
 */
async function keepbackground() {
        const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });
const segmentation = await net.segmentPerson(canvas);
const coloredPartImage = bodyPix.toMask(segmentation);
const opacity = .5;
const flipHorizontal = false;
const maskBlurAmount = 10;
 bodyPix.drawMask(
    canvas2, canvas, coloredPartImage, opacity, maskBlurAmount,
    flipHorizontal)
}

navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({video:true},handleVideo,videoError)
}
function handleVideo(stream) {
  Video.srcObject=stream;
    let stream_settings = stream.getVideoTracks()[0].getSettings();
    canvas.width = stream_settings.width;
    canvas2.width=stream_settings.width;
canvas2.height = stream_settings.height;
    canvas.height = stream_settings.height;

    setInterval(()=> {
 ctx.drawImage(Video,0,0,stream_settings.width,stream_settings.height)
    keepbackground();
},10)
}
function videoError() {
  alert("something is wrong")
}
