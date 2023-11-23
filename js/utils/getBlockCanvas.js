import { densityChars } from "./getBrightnessText.js";
import { map } from "./map.js";

const outputCanvas = document.createElement("canvas");

export const getBlockCanvas = (
  inputCanvas,
  blockSize,
  lowerContrast,
  upperContrast
) => {
  const { width: inputW, height: inputH } = inputCanvas;

  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");

  const middleX = outputCanvas.width / 2;
  const middleY = outputCanvas.height / 2;

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let r, g, b, brightness, blockX, blockY;
  outputCtx.fillStyle = "white";
  const halfBlockSize = blockSize / 2;

  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      const decimalPercentage = brightness / 255;

      if (decimalPercentage < lowerContrast) continue;

      // block width deterimined by brightness
      const brightnessSize = blockSize * decimalPercentage;
      const offset = (blockSize - brightnessSize) / 2;

      // TODO this Block pos only works for vertical cetner alignment
      blockX = offset + x * blockSize;
      blockY = offset + y * blockSize;

      // text
      // outputCtx.font = `${brightnessSize}px Arial`;
      outputCtx.save();

      const charIndex = Math.floor(
        map(decimalPercentage, 0, 1, 0, densityChars.length)
      );
      const char = densityChars[charIndex];

      outputCtx.translate(blockX, blockY);
      const scale = decimalPercentage + 0.3;
      outputCtx.scale(scale, scale);
      outputCtx.globalAlpha = decimalPercentage;
      outputCtx.fillText(char, 0, 0);

      outputCtx.restore();

      // rectangle
      // outputCtx.fillRect(blockX, blockY, brightnessSize, brightnessSize);

      // circle
      // outputCtx.beginPath();
      // outputCtx.arc(
      //   blockX + halfBlockSize,
      //   blockY + halfBlockSize,
      //   brightnessSize / 2,
      //   0,
      //   Math.PI * 2
      // );
      // outputCtx.fill();

      outputCtx.closePath();
    }
  }

  return outputCanvas;
};
