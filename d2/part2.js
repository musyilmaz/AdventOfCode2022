import path from "path";
import fs from "fs";

const LIST = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
};

const SELECT = {
  X: 0,
  Y: 3,
  Z: 6,
};

try {
  const filePath = path.resolve(process.cwd(), "d2/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  let score = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      const [first, second] = data[i].split(" ");
      score += SELECT[second];
      score += LIST[first][second];
    }
  }
  console.log(score);
} catch (err) {
  console.log(err);
}
