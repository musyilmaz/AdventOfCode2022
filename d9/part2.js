import path from "path";
import fs from "fs";

const isTouching = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
};

const move = (knots, dx, dy) => {
  knots[0].x += dx;
  knots[0].y += dy;

  for (let i = 1; i < knots.length; i++) {
    const h = knots[i - 1];
    const t = knots[i];

    if (!isTouching(h.x, h.y, t.x, t.y)) {
      let cx = 0;
      let cy = 0;

      if (h.x !== t.x) {
        cx = (h.x - t.x) / Math.abs(h.x - t.x);
      }
      if (h.y !== t.y) {
        cy = (h.y - t.y) / Math.abs(h.y - t.y);
      }
      t.x += cx;
      t.y += cy;
    }

    knots[i] = t;
  }
  return knots;
};

try {
  // const filePath = path.resolve(process.cwd(), "d9/test.txt");
  const filePath = path.resolve(process.cwd(), "d9/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  const uniquePos = [];

  const directionMovements = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  let knots = [];
  for (let i = 0; i < 10; i++) {
    knots.push({ x: 0, y: 0 });
  }

  uniquePos.push(JSON.stringify(knots[knots.length - 1]));

  for (const movement of data) {
    if (movement === "") continue;
    const [direction, space] = movement.split(" ");

    for (let i = 0; i < space; i++) {
      const [dx, dy] = directionMovements[direction];
      knots = move(knots, dx, dy);
      if (!uniquePos.includes(JSON.stringify(knots[knots.length - 1]))) {
        uniquePos.push(JSON.stringify(knots[knots.length - 1]));
      }
    }
  }
  console.log(uniquePos.length);
} catch (err) {
  console.log(err);
}
