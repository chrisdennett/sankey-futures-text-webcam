import { draw, setup } from "./app.js";

const fpsP = document.querySelector("#fpsP");
let lastTimestamp = Date.now();
let frameTime = 0;
let lastUpdated = Date.now();
const minFPSUpdateMs = 500;

setup();
drawLoop();

// draw loop
export function drawLoop() {
  // measure frame rate
  const newTimestamp = Date.now();
  frameTime = newTimestamp - lastTimestamp;
  lastTimestamp = newTimestamp;

  // prevent fast flickering during high frame rates.
  if (newTimestamp - lastUpdated > minFPSUpdateMs) {
    const fps = (1000 / frameTime).toFixed(0) + "fps";
    fpsP.innerHTML = fps;
    lastUpdated = newTimestamp;
  }

  // do the thing
  draw();

  // repeat
  window.requestAnimationFrame(drawLoop);
}
