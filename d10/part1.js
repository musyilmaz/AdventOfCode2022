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

let x = 1;
let cycle = 1;
let result = 0;
const checkSignals = [20, 60, 100, 140, 180, 220];

const checkCycleCount = () => {
  console.log(`cycle: ${cycle} ---> ${x}`);
  if (checkSignals.some((el) => el === cycle)) {
    result += cycle * x;
  }
};

for (const line of lines) {
  if (line === "noop") {
    cycle += 1;
    checkCycleCount();
  } else {
    const [_, register] = line.split(" ");
    cycle += 1;
    checkCycleCount();
    x += Number(register);
    cycle += 1;
    checkCycleCount();
  }
}

console.log(result);
