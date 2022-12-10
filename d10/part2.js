import path from "path";
import fs from "fs";

const readData = (testMode) => {
  try {
    let filePath;

    if (testMode) {
      filePath = path.resolve(process.cwd(), "d10/test.txt");
    } else {
      filePath = path.resolve(process.cwd(), "d10/data.txt");
    }
    const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
    return data.filter((line) => line !== "");
  } catch (error) {
    console.log("There was an error on reading the document");
  }
};

const args = process.argv.slice(2);
const isTestMode = args.some((i) => i === "test");
const lines = readData(isTestMode);

let register = 1;
let cycle = 1;
let crt = {};
const empty = "  ";
const filled = "00";
let panel = new Array(6).fill(new Array(40).fill(null));

for (const line of lines) {
  if (line === "noop") {
    crt[cycle] = register;
    cycle += 1;
  } else {
    const [_, x] = line.split(" ");
    crt[cycle] = register;
    cycle += 1;
    crt[cycle] = register;
    register += Number(x);
    cycle += 1;
  }
}

for (const rowIdx in panel) {
  const row = panel[rowIdx];
  for (const colIdx in row) {
    const pixel = Number(rowIdx) * 40 + Number(colIdx) + 1;

    const spriteDiff = Math.abs(crt[pixel] - colIdx);
    if (spriteDiff <= 1) {
      panel[rowIdx][colIdx] = filled;
    } else {
      panel[rowIdx][colIdx] = empty;
    }
  }
  console.log(panel[rowIdx].join(""));
}
