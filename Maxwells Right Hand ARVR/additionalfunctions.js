const videoElement = document.getElementsByClassName('input_video')[0];
const document_slider_resolution = document.getElementById("slider_resolution");
const document_slider_curl = document.getElementById("slider_curl");
const document_slider_mag = document.getElementById("slider_mag");
let toggleLandmarks, toggleAnimation;//, sliderChangeCurl, sliderChangeRes;
let display_landmarks = false;
let first_time_setup = true;
let videoWH = 1;
let videoScale = 1;
let camera_rotation = 0;


videoElement.addEventListener('loadedmetadata', (event) => {
  first_time_setup = false;
  videoWH = videoElement.videoWidth / videoElement.videoHeight;
  videoElement.width = window.innerWidth;
  // monapple.resizeCanvas(videoElement.width, videoElement.videoHeight*videoElement.width/videoElement.videoWidth);    // mon
  adjustCanvas();
});

function changeCamera() {
  videoface = videoface === "environment" ? "user" : "environment";
  videoElement.pause();
  videoElement.srcObject = null;
  camera = null;
  camera = new Camera(videoElement, {
    onFrame: async () => {
      // await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
    facingMode: videoface
  });
  camera.start();
}
// setTimeout(changeCamera,1500);

function flipCamera() {
  camera_rotation = (camera_rotation + 180) % 360;
  adjustCanvas();
}

function sliderChangeCurl() {
  curl_thrushold = 0.5 + document_slider_curl.value * 1.5 / 100.0;
}
setTimeout(sliderChangeCurl,500); 

function sliderChangeRes() {
  zoomscale = 1 + document_slider_resolution.value / 10.0;
  adjustCanvas();
}
setTimeout(sliderChangeRes,1000); 

function sliderChangeMag(){
  flow_time_delta = document_slider_mag.value / 1000.0;
}
setTimeout(sliderChangeMag,500); 

function adjustCanvas() {
  monapple.resizeCanvas(videoElement.offsetWidth / zoomscale, videoElement.offsetHeight / zoomscale);
  p5jscanvas.position(videoElement.offsetLeft + videoElement.offsetWidth / 2 - p5jscanvas.width / 2, videoElement.offsetTop + videoElement.offsetHeight / 2 - p5jscanvas.height / 2);
  // monapple.canvas.style.transform = `scale(${zoomscale})`;
  videoElement.style.transform = `rotateY(${camera_rotation}deg)`;
  videoElement.style.webkitTransform = `rotateY(${camera_rotation}deg)`;
  videoElement.style.mozTransform = `rotateY(${camera_rotation}deg)`;
  videoElement.style.msTransform = `rotateY(${camera_rotation}deg)`;
  videoElement.style.oTransform = `rotateY(${camera_rotation}deg)`;

  p5jscanvas.style("transform", `scale(${zoomscale}) rotateY(${camera_rotation}deg)`);
  p5jscanvas.style("webkitTransform", `scale(${zoomscale}) rotateY(${camera_rotation}deg)`);
  p5jscanvas.style("mozTransform", `scale(${zoomscale}) rotateY(${camera_rotation}deg)`);
  p5jscanvas.style("msTransform", `scale(${zoomscale}) rotateY(${camera_rotation}deg)`);
  p5jscanvas.style("oTransform", `scale(${zoomscale}) rotateY(${camera_rotation}deg)`);
  
  // monapple.cam.ortho(-monapple.width / 2, monapple.width / 2, -monapple.height / 2, monapple.height / 2, 0, 500);
}
setTimeout(adjustCanvas,1200);
(toggleLandmarks = function () {
  show_markers = !show_markers;
  document.getElementById("button_togglelandmarks").innerHTML = show_markers ? "Hide Markers" : "Show Markers";
})();

(toggleAnimation = function () {
  animation_working = !animation_working;
  document.getElementById("button_toggleanimation").innerHTML = animation_working ? "Disable Current Flow" : "Enable Current Flow";
})();

function iOS() {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}
