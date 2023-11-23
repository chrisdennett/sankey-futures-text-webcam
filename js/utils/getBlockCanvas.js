const outputCanvas = document.createElement("canvas");

export const getBlockCanvas = (inputCanvas, blockSize) => {
  const { width: inputW, height: inputH } = inputCanvas;

  outputCanvas.width = inputW * blockSize;
  outputCanvas.height = inputH * blockSize;
  const outputCtx = outputCanvas.getContext("2d");

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let r, g, b, brightness, blockX, blockY;
  outputCtx.fillStyle = "black";
  const halfBlockSize = blockSize / 2;

  for (let y = 0; y < inputH; y++) {
    for (let x = 0; x < inputW; x++) {
      const i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      const decimalPercentage = 1 - brightness / 255;

      // block width deterimined by brightness
      const brightnessSize = blockSize * decimalPercentage;
      const offset = (blockSize - brightnessSize) / 2;

      // TODO this Block pos only works for vertical cetner alignment
      blockX = offset + x * blockSize;
      blockY = offset + y * blockSize;

      outputCtx.beginPath();

      // outputCtx.fillRect(blockX, blockY, brightnessSize, brightnessSize);

      outputCtx.arc(
        blockX + halfBlockSize,
        blockY + halfBlockSize,
        brightnessSize / 2,
        0,
        Math.PI * 2
      );
      outputCtx.fill();

      outputCtx.closePath();
    }
  }

  return outputCanvas;
};
