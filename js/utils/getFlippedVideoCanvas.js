export function getFlippedVideoCanvas({
  video,
  videoSize,
  flipX,
  flipY,
  width,
  height,
}) {
  const frameCanvas = document.createElement("canvas");
  const { w: vidW, h: vidH } = videoSize;

  frameCanvas.width = width;
  frameCanvas.height = height;
  const frameCtx = frameCanvas.getContext("2d");

  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  const translateX = flipX ? frameCanvas.width : 0;
  const translateY = flipY ? frameCanvas.height : 0;

  frameCtx.translate(translateX, translateY);
  frameCtx.scale(scaleX, scaleY);

  frameCtx.drawImage(video, 0, 0, vidW, vidH, 0, 0, width, height);

  return frameCanvas;
}
