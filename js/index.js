import { draw, setup } from "./app.js";

// const fpsP = document.querySelector("#fpsP");
// let lastTimestamp = Date.now();
// let frameTime = 0;
// let lastUpdated = Date.now();
// const minFPSUpdateMs = 500;

setup();
drawLoop();

// generateCss({
//   totalImages: 18,
//   secondsPerImg: 7,
//   transitionDuration: 2,
// });

// draw loop
export function drawLoop() {
  // measure frame rate
  // const newTimestamp = Date.now();
  // frameTime = newTimestamp - lastTimestamp;
  // lastTimestamp = newTimestamp;

  // // prevent fast flickering during high frame rates.
  // if (newTimestamp - lastUpdated > minFPSUpdateMs) {
  //   const fps = (1000 / frameTime).toFixed(0) + "fps";
  //   fpsP.innerHTML = fps;
  //   lastUpdated = newTimestamp;
  // }

  // do the thing
  draw();

  // repeat
  window.requestAnimationFrame(drawLoop);
}

// export function generateCss({
//   totalImages,
//   secondsPerImg,
//   transitionDuration,
// }) {
//   // const totalImages = 18;
//   // const secondsPerImg = 3;
//   // const transitionDuration = 1;

//   const n = totalImages;
//   const a = secondsPerImg;
//   const b = transitionDuration;
//   const totalAnimationDuration = (a + b) * n;
//   const t = totalAnimationDuration;
//   const animationDelay = a + b;

//   // const maxSeconds = totalImages * secondsPerImg;
//   let cssStr = `
//       li{
//         position: absolute;
//         animation: xfade ${t}s infinite;
//       }
// `;
//   for (let i = 0; i < totalImages; i++) {
//     // const delay = secondsPerImg * i;

//     cssStr += `
//               li:nth-child(${totalImages - i}) {
//                 animation-delay: ${i * animationDelay}s;
//              }`;
//   }

//   cssStr += `

//   @keyframes xfade {
//     0% {
//       opacity: 1;
//     }
//     ${(a / t) * 100}% {
//       opacity: 1;
//     }
//     ${((a + b) / t) * 100}% {
//       opacity: 0;
//     }
//     ${100 - (b / t) * 100}% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
// }
// `;

//   console.log("cssStr: ", cssStr);
// }
