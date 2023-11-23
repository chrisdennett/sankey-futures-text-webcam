import { getFlippedVideoCanvas } from "./utils/getFlippedVideoCanvas.js";
import { initControls } from "./controls.js";
import { getSmallCanvas } from "./utils/getSmallCanvas.js";
import { getBlockCanvas } from "./utils/getBlockCanvas.js";
import { getBrightnessText } from "./utils/getBrightnessText.js";

// app elements
const canvas = document.querySelector("#canvas");
const controls = document.querySelector("#controls");
const video = document.querySelector("#videoElement");
const textHolderP = document.querySelector("#textHolderP");

// set up controls
const params = initControls(controls);
const webcamRes = { w: 40, h: 30 };
const wToHRatio = webcamRes.h / webcamRes.w;

// set up controls, webcam etc
export function setup() {
  // hide controls by default and if app is right clicked
  document.addEventListener("dblclick", onDoubleClick);
  // controls.style.display = "none";

  function onDoubleClick(e) {
    e.preventDefault();
    if (controls.style.display === "none") {
      controls.style.display = "inherit";
    } else {
      controls.style.display = "none";
    }
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: webcamRes.w, height: webcamRes.h },
      })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("video error: ", error);
      });
  }
}

export function draw() {
  const {
    flipX,
    flipY,
    blockSize,
    blocksAcross,
    lowerContrast,
    upperContrast,
  } = params;

  const useCanvas = false;
  const _blockSize = blockSize.value;
  const _blocksAcross = blocksAcross.value;
  const _blocksDown = _blocksAcross * wToHRatio;

  const frameCanvas = getFlippedVideoCanvas({
    video,
    videoSize: webcamRes,
    flipX: flipX.value,
    flipY: flipY.value,
    width: _blocksAcross,
    height: _blocksDown,
  });

  if (useCanvas) {
    const smallCanvas = getSmallCanvas(frameCanvas, 20);
    const blockCanvas = getBlockCanvas(smallCanvas, 10);
    canvas.width = blockCanvas.width;
    canvas.height = blockCanvas.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(blockCanvas, 0, 0);
  } else {
    textHolderP.style.fontSize = _blockSize + "px";
    textHolderP.style.lineHeight = _blockSize + "px";
    textHolderP.style.letterSpacing = _blockSize / 2.5 + "px";

    textHolderP.innerHTML = getBrightnessText(frameCanvas);
  }
}

function map(value, in_min, in_max, out_min, out_max) {
  const inRange = in_max - in_min;
  const outRange = out_max - out_min;
  const mapped = ((value - in_min) * outRange) / inRange + out_min;

  return clamp(mapped, out_min, out_max);
}
