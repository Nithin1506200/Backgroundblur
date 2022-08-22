/**
 * Loads an image into canvas.
 * 
 */
        const remove=document.querySelector("#Remove");
      const bokeh=document.querySelector("#Bokeh");
      const blur=document.querySelector("#Blur");
  const canvas = document.querySelector('#originalcam');
  const canvas2=document.querySelector("#mycams");
  const ctx2=canvas2.getContext('2d');
  const ctx = canvas.getContext('2d');
  let Video=document.querySelector("video");
      let x=0;
      remove.addEventListener("click",()=>{x=1;
     
      });
      bokeh.addEventListener("click",()=>{x=2});
      blur.addEventListener("click",()=>{x=3});
          let h=400;
    let w=400;
    canvas.width = w;
    canvas.height = h;
//************************************************************************ */
async function keepbackground(select,canvas,canvas2) {
        const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });

if(select==1) {
const segmentation = await net.segmentPerson(canvas);

const maskBackground = true;
// Convert the segmentation into a mask to darken the background.
const foregroundColor = {a: 255};
const backgroundColor = { r:0,g:0,b:0,a: 0};
const backgroundDarkeningMask = bodyPix.toMask(
    segmentation, foregroundColor, backgroundColor);

const opacity = 1;
const maskBlurAmount = 3;
const flipHorizontal = false;

bodyPix.drawMask(
    canvas2, canvas, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
    
    delete segmentation
    delete foregroundColor
    delete backgroundColor
    delete backgroundDarkeningMask
    delete opacity
    delete maskBlurAmount
    delete flipHorizontal
}
else if (select==2){
  const segmentation = await net.segmentPerson(canvas);
  const backgroundBlurAmount = 3;
const edgeBlurAmount = 1;
const flipHorizontal = false;
 bodyPix.drawBokehEffect( canvas2, canvas, segmentation, backgroundBlurAmount,
    edgeBlurAmount,
  flipHorizontal)
  delete segmentation
  delete backgroundBlurAmount
  delete edgeBlurAmount
  delete flipHorizontal
}
else if (select==3){
  const partSegmentation = await net.segmentMultiPersonParts(canvas);
  const backgroundBlurAmount = 3;
const edgeBlurAmount = 3;
const flipHorizontal = false;
const faceBodyPartIdsToBlur = [0, 1];
bodyPix.blurBodyPart(
    canvas2, canvas, partSegmentation, faceBodyPartIdsToBlur,
    backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
    delete partSegmentation
    delete backgroundBlurAmount
    delete edgeBlurAmount
    delete flipHorizontal
    delete faceBodyPartIdsToBlur

}
delete net 


}
//***************************************************************** */
navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({video:true,width:"100px",height:"100px"},handleVideo,videoError)
}
function handleVideo(stream) {
 

    Video.srcObject=stream;
    let stream_settings = stream.getVideoTracks()[0].getSettings();
//canvas.width = stream_settings.width;
  // canvas.height = stream_settings.height;

    setInterval(()=> {
ctx.drawImage(Video,0,0,w,h)

   if(x)
   { keepbackground(x,canvas,canvas2);
    console.log(x)
       }
    //   keepbackground.remove
      delete keepbackground
      //  delete Video
      //  delete ctx
  },50)
  //delete handleVideo
}
function videoError() {
  alert("something is wrong")
}
