// import { densityChars } from "./getBrightnessText.js";
import { map } from "./map.js";

const densityChars = "...,;?i250@#";
const promptTxt =
  "Create an image of Barrow-in-Furness, a town in Cumbria, UK, transformed into a vibrant Solarpunk cityscape. Show a harmonious blend of futuristic architecture integrated with nature: towering buildings adorned with greenery and vertical gardens, interconnected by bridges and walkways lined with lush trees and vibrant plants. In the sky, visualise airships sailing gracefully among floating gardens and renewable energy sources like solar panels and wind turbines. Include futuristic trains smoothly traversing the city, powered by sustainable energy sources. The scene should radiate a sense of harmony between advanced technology, nature, and a community thriving in a utopian Solarpunk setting.";
const promptLength = promptTxt.length;
const textCanvas = document.createElement("canvas");
const textCanvasSettings = { blockSize: 0, blocksAcross: 0, blocksDown: 0 };
console.log("textCanvas: ", textCanvas);
// const densityChars = "...RelaxInto2050";

const outputCanvas = document.createElement("canvas");

export const getBlockCanvas = (inputCanvas, blockSize, useCanvasText) => {
  const { width: inputW, height: inputH } = inputCanvas;

  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");
  outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  const middleX = outputCanvas.width / 2;
  const middleY = outputCanvas.height / 2;

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;
  outputCtx.font = `${blockSize}px Arial`;

  let r, g, b, brightness, blockX, blockY;
  outputCtx.fillStyle = "white";

  const useFake3d = false;

  if (
    textCanvasSettings.blocksAcross !== inputW ||
    textCanvasSettings.blocksDown !== inputH ||
    textCanvasSettings.blockSize !== blockSize
  ) {
    textCanvasSettings.blocksAcross = inputW;
    textCanvasSettings.blocksDown = inputH;
    textCanvasSettings.blockSize = blockSize;
    drawTextCanvas({
      promptTxt,
      blockSize,
      blocksAcross: inputW,
      blocksDown: inputH,
    });
  }

  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const index = y * inputW + x;
      const i = index * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = (r + g + b) / 3;
      const decimalPercentage = brightness / 255;
      blockX = x * blockSize;
      blockY = y * blockSize;

      outputCtx.save();

      const charIndex = index % promptLength;
      const char = promptTxt[charIndex];
      outputCtx.globalAlpha = decimalPercentage;

      if (useFake3d) {
        // Calculate the distance from the center
        const distX = blockX - middleX;
        const distY = blockY - middleY;

        // Scale the distance from the center
        const scaledX = middleX + distX * (0.4 + decimalPercentage);
        const scaledY = middleY + distY * (0.4 + decimalPercentage);
        outputCtx.fillText(char, scaledX, scaledY);
      } else {
        outputCtx.translate(blockX, blockY);

        if (useCanvasText) {
          outputCtx.fillText(
            char,
            blockSize * decimalPercentage,
            blockSize * decimalPercentage
          );
        } else {
          outputCtx.drawImage(
            textCanvas,
            blockX,
            blockY,
            blockSize,
            blockSize,
            0,
            0,
            blockSize * decimalPercentage,
            blockSize * decimalPercentage
          );
        }
      }

      outputCtx.restore();
    }
  }

  // outputCtx.drawImage(textCanvas, 0, 0);

  return outputCanvas;
};

function drawTextCanvas({ promptTxt, blockSize, blocksAcross, blocksDown }) {
  textCanvas.width = blocksAcross * blockSize;
  textCanvas.height = blocksDown * blockSize;

  const ctx = textCanvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
  ctx.font = `${blockSize}px Arial`;
  ctx.fontWeight = "bold";
  ctx.fillStyle = "white";

  for (let y = 0; y < blocksDown; y++) {
    for (let x = 0; x < blocksAcross; x++) {
      const i = y * blocksAcross + x;

      const blockX = x * blockSize;
      const blockY = y * blockSize;

      ctx.save();
      ctx.translate(blockX, blockY);
      const charIndex = i % promptLength;
      const char = promptTxt[charIndex];
      ctx.fillText(char, 0, 0);
      // ctx.fillRect(0, 0, blockSize, blockSize);
      ctx.restore();
    }
  }
}
