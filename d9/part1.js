import path from "path";
import fs from "fs";

/*
 * T always touches H so that means H(x,y) T(X,Y) must be always X = x+-1 Y = y+-1
 * When there is 2 space difference T moves diagonally to close the gap
 */

/*
 * Right means increase X
 * Left means decrease X
 * Up means increase Y
 * Down means decrease Y
 */

const moveHeadKnot = (H, direction) => {
  if (direction === "R") {
    H.x += 1;
  } else if (direction === "L") {
    H.x -= 1;
  } else if (direction === "U") {
    H.y += 1;
  } else {
    H.y -= 1;
  }

  return H;
};

const doNotMovePositions = [-1, 0, 1];

const moveTailKnot = (H, T) => {
  const Dx = H.x - T.x;
  const Dy = H.y - T.y;

  if (doNotMovePositions.some((el) => el === Dx) && doNotMovePositions.some((el) => el === Dy)) {
    return T;
  }

  if (Math.abs(Dx) === 2) {
    T.x += Dx / 2;
    if (Dy !== 0) {
      T.y += Dy;
    }
    return T;
  }

  if (Math.abs(Dy) === 2) {
    T.y += Dy / 2;
    if (Dx !== 0) {
      T.x += Dx;
    }
    return T;
  }
};

try {
  // const filePath = path.resolve(process.cwd(), "d9/test.txt");
  const filePath = path.resolve(process.cwd(), "d9/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  const TPositions = [];

  // Initial Positions
  let H = { x: 0, y: 0 };
  let T = { x: 0, y: 0 };
  TPositions.push(JSON.stringify(T));
  console.log("START", H, T);

  for (const movement of data) {
    if (movement === "") continue;
    const [direction, space] = movement.split(" ");

    for (let i = 0; i < space; i++) {
      H = moveHeadKnot(H, direction);
      T = moveTailKnot(H, T);
      if (!TPositions.includes(JSON.stringify(T))) {
        TPositions.push(JSON.stringify(T));
      }
    }
  }

  console.log(`Total T Positions :: ${TPositions.length}`);
} catch (err) {
  console.log(err);
}
