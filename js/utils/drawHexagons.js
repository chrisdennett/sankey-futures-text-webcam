import { getRoundedHexagon } from "./getPolygonCorners.js";

export function drawHexagonGrid({
  parent1,
  parent2,
  hexagonsAcross,
  hexagonsDown,
  sideLength = 50,
  cornerRadius = 0,
  orientation = "flatTop",
  hexDimensions,
  padding = 0,
}) {
  // draw a series of rows or columns
  const { width, height } = hexDimensions;
  const yOverlap = sideLength / 2;
  const yOffset = -yOverlap / 2;
  const w = width + padding;
  const h = height + padding;

  for (let i = 0; i < hexagonsDown; i++) {
    const isOddRow = i % 2 === 0;
    let colXStart = isOddRow ? 0 : -width / 2;
    for (let j = 0; j < hexagonsAcross; j++) {
      const x = colXStart + j * w;
      const y = yOffset + yOverlap + i * (h - yOverlap);
      const hexPath = getHexagonPath({
        sideLength,
        cornerRadius,
        orientation,
        x,
        y,
      });

      let parent = Math.random() > 0.1 ? parent1 : parent2;

      if (Math.random() > 0.3) {
        parent.appendChild(hexPath);
      }
    }
  }
}

function getHexagonPath({ sideLength, cornerRadius, orientation, x, y }) {
  const newpath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const roundedHex = getRoundedHexagon({
    sideLength,
    cornerRadius,
    orientation,
  });
  newpath.setAttributeNS(null, "d", roundedHex);
  newpath.setAttributeNS(null, "transform", `translate(${x}, ${y})`);

  return newpath;
}

export function getHexDimensions({ orientation, sideLength }) {
  let width, height;

  // pointyTop
  if (orientation === "pointyTop") {
    height = sideLength * 2;
    width = (height * Math.sqrt(3)) / 2;
  }
  // flatTop
  else {
    width = sideLength * 2;
    height = (width * Math.sqrt(3)) / 2;
  }

  return { width, height };
}
