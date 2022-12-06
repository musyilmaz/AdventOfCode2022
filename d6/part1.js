import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d6/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  let controlStack = [];
  let result = 0;

  const encoding = data[0].split("");
  for (const index in encoding) {
    const signal = encoding[index];
    if (!controlStack.includes(signal)) {
      controlStack.push(signal);
    } else {
      const foundIndex = controlStack.findIndex((el) => {
        return el === signal;
      });
      console.log(`SLICING === Current Signal :: ${signal} ===> Current Control Stack :: ${controlStack}`);
      console.log(`found index at ${foundIndex}`);
      controlStack = controlStack.slice(foundIndex + 1);
      controlStack.push(signal);
      console.log(`SLICING === Current Signal :: ${signal} ===> Current Control Stack :: ${controlStack}`);
      continue;
    }

    console.log(`Current Signal :: ${signal} ===> Current Control Stack :: ${controlStack}`);

    if (controlStack.length === 14) {
      result = Number(index) + 1;
      break;
    }
  }

  console.log(`Result: ${result}`);
} catch (err) {
  console.log(err);
}
