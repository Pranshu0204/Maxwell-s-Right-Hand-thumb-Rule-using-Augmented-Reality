let detections = [];
let videoface = "environment";
function onResults(results) { detections = results; }
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);
let camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
  facingMode: videoface
});
camera.start();

let PI = 3.141592;
let TWO_PI = 2*PI ; 
function cos(x){return Math.cos(x);}
function sin(x){return Math.sin(x);}
function abs(x){return Math.abs(x);}