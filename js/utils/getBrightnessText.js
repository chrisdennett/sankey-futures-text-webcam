import { map } from "./map.js";
export const densityChars = ".,;?iIOP@#";

export function getBrightnessText(frameCanvas) {
  //const densityChars = "   .,;*%?iIOP@#";
  const len = densityChars.length;
  let str = "";
  const { width: inputW, height: inputH } = frameCanvas;
  const frameCtx = frameCanvas.getContext("2d");

  const imgData = frameCtx.getImageData(0, 0, inputW, inputH);
  const pixels = imgData.data;
  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const i = (y * inputW + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const grey = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const fraction = grey / 255;
      const charIndex = Math.floor(map(fraction, 0.5, 1, 0, len));
      let char = densityChars[charIndex];
      if (r > 150 && g < 100 && b < 100) {
        if (char === " ") char = "|";
        str += `<span>${char}</span>`;
      } else {
        if (char === " ") char = "&nbsp";
        str += char;
      }
      if (x === inputW - 1) {
        str += "<br />";
      }
    }
  }

  return str;
}
