 let blur =async ()=> {
 const canvas = document.querySelector('#originalcam');
  const ctx = canvas.getContext('2d');
  let Video=document.querySelector("video");
  navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({video:true},handleVideo,videoError)
}
function handleVideo(stream) {
  Video.srcObject=stream;
    let stream_settings = stream.getVideoTracks()[0].getSettings();
    canvas.width = stream_settings.width;
    canvas.height = stream_settings.height;
}
function videoError() {
  alert("something is wrong")
}

const net = await bodyPix.load();
const segmentation = await net.segmentPerson(Video);
const coloredPartImage = bodyPix.toMask(segmentation);
const opacity = 0.7;
const flipHorizontal = false;
const maskBlurAmount = 0;

// Draw the mask image on top of the original image onto a canvas.
// The colored part image will be drawn semi-transparent, with an opacity of
// 0.7, allowing for the original image to be visible under.
setInterval(
()=>{bodyPix.drawMask(
    canvas, img, coloredPartImage, opacity, maskBlurAmount,
    flipHorizontal)},10);
 }
 blur()