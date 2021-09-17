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
  // const canvas = document.querySelector('canvas');
  // const ctx = canvas.getContext('2d');
  
  // Loading the model
        let net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });
  // Segmentation
  const { data:map } = await net.segmentPerson(canvas, {
    internalResolution: 'medium',
  });
  
  
  // Extracting image data
  const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Creating new image data
  const newImg = ctx.createImageData(canvas.width, canvas.height);
  const newImgData = newImg.data;
  
  for(let i=0; i<map.length; i++) {
    //The data array stores four values for each pixel
    const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
    
    [
      newImgData[i*4],
      newImgData[i*4+1],
      newImgData[i*4+2],
      newImgData[i*4+3]
    ] = !map[i] ? [(r)/5, (g)/5, (b)/5, 0] : [r, g, b, a];
  }
  

  // Draw the new image back to canvas
  ctx2.putImageData(newImg, 0, 0);
  
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
},20)
}
function videoError() {
  alert("something is wrong")
}
