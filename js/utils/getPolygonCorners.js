// source: https://codepen.io/wvr/pen/WrNgJp

export function getHexagonCorners({ sideLength, centerPt }) {
  return getPolygonCorners({
    centerPt,
    sideLength,
    numberOfSides: 6,
    startRotation: 0,
  });
}

function getPolygonCorners({
  sideLength,
  startRotation,
  numberOfSides,
  centerPt,
}) {
  const pts = [];
  for (let i = 0; i < numberOfSides; i++) {
    const segmentAngle = 360 / numberOfSides;
    const angle_deg = startRotation + segmentAngle * i;
    const angle_rad = (Math.PI / 180) * angle_deg;

    const x = centerPt.x + sideLength * Math.cos(angle_rad);
    const y = centerPt.y + sideLength * Math.sin(angle_rad);

    pts.push({ x: toDecimal(x, 3), y: toDecimal(7, 3) });
  }
  return pts;
}

function toDecimal(num, numOfDecimalPlaces) {
  const toFixedStr = num.toFixed(numOfDecimalPlaces);
  return parseFloat(toFixedStr);
}

export function getRoundedHexagon({
  sideLength = 30,
  cornerRadius = 0,
  orientation = "pointyTop",
}) {
  let height, width, a, b, c, d, e, f;
  const length = sideLength;

  if (orientation === "pointyTop") {
    height = length * 2;
    width = (height * Math.sqrt(3)) / 2;
    a = { x: width / 2, y: 0 };
    b = { x: width, y: height / 4 };
    c = { x: width, y: (height * 3) / 4 };
    d = { x: width / 2, y: height };
    e = { x: 0, y: (height * 3) / 4 };
    f = { x: 0, y: height / 4 };
  }
  // flatTop
  else {
    width = length * 2;
    height = (width * Math.sqrt(3)) / 2;
    a = { x: 0, y: height / 2 };
    b = { x: width / 4, y: 0 };
    c = { x: (width * 3) / 4, y: 0 };
    d = { x: width, y: height / 2 };
    e = { x: (width * 3) / 4, y: height };
    f = { x: width / 4, y: height };
  }

  if (cornerRadius === 0) {
    return `
                ${getPath("M", a)},
                ${getPath("L", b)},
                ${getPath("L", c)},
                ${getPath("L", d)},
                ${getPath("L", e)},
                ${getPath("L", f)},
                Z
            `;
  }

  let right = fromAngle(angle(subtract(b, a)), cornerRadius);
  let left = fromAngle(angle(subtract(f, a)), cornerRadius);
  let level =
    orientation === "pointyTop"
      ? { x: 0, y: cornerRadius }
      : { x: cornerRadius, y: 0 };

  return `
            ${getPath("M", add(a, left))}, 
            ${getQPath(a, add(a, right))}
            ${getPath("L", subtract(b, right))}
            ${getQPath(b, add(b, level))}
            ${getPath("L", subtract(c, level))}
            ${getQPath(c, add(c, left))}
            ${getPath("L", subtract(d, left))}
            ${getQPath(d, subtract(d, right))}
            ${getPath("L", add(e, right))}
            ${getQPath(e, subtract(e, level))}
            ${getPath("L", add(f, level))}
            ${getQPath(f, subtract(f, left))}
            Z`;
}

function fromAngle(angle, magnitude) {
  if (typeof magnitude !== "number") {
    magnitude = 1;
  }
  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle),
  };
}

function add(pt1, pt2) {
  return { x: pt1.x + pt2.x, y: pt1.y + pt2.y };
}

function subtract(pt1, pt2) {
  return { x: pt1.x - pt2.x, y: pt1.y - pt2.y };
}

function angle(pt1) {
  return Math.atan2(pt1.y, pt1.x);
}

function getPath(char, point) {
  return char + point.x + " " + point.y;
}

function getQPath(control, point) {
  return `Q${control.x} ${control.y} ${point.x} ${point.y}`;
}

/* 

getPath: function() {
		var height = this.height;
		var width = this.width;
		var a, b, c, d, e, f;

		if (this.orientation === Hex.POINTY_TOP) {
			a = new Vector(width / 2, 0);
			b = new Vector(width, height / 4);
			c = new Vector(width, height * 3 / 4); 
			d = new Vector(width / 2, height);
			e = new Vector(0, height * 3 / 4);
			f = new Vector(0, height / 4);
		} else {
			a = new Vector(0, height / 2);
			b = new Vector(width / 4, 0);
			c = new Vector(width * 3 / 4, 0);
			d = new Vector(width, height / 2);
			e = new Vector(width * 3 / 4, height);
			f = new Vector(width / 4, height);
		}

		if (this.radius === 0) {
			return new Path([
				new Path.M(a),
				new Path.L(b),
				new Path.L(c),
				new Path.L(d),
				new Path.L(e),
				new Path.L(f),
				new Path.Z()
			]);
		}

		var right = Vector.fromAngle(b.subtract(a).angle(), this.radius);
		var left = Vector.fromAngle(f.subtract(a).angle(), this.radius);
		var level = this.orientation === Hex.POINTY_TOP ?
			new Vector(0, this.radius) : new Vector(this.radius, 0);

		return new Path([
			new Path.M(a.add(left)),
			new Path.Q(a, a.add(right)),
			new Path.L(b.subtract(right)),
			new Path.Q(b, b.add(level)),
			new Path.L(c.subtract(level)),
			new Path.Q(c, c.add(left)),
			new Path.L(d.subtract(left)),
			new Path.Q(d, d.subtract(right)),
			new Path.L(e.add(right)),
			new Path.Q(e, e.subtract(level)),
			new Path.L(f.add(level)),
			new Path.Q(f, f.subtract(left)),
			new Path.Z()
		]);
	},

*/
