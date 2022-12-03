import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d3/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  let result = 0;
  for (const rucksack of data) {
    if (rucksack === "") continue;
    const middle = rucksack.length / 2;
    const r1 = rucksack.substring(0, middle).split("");
    const r2 = rucksack.substring(middle).split("");
    const intersection = r1.filter((element) => r2.includes(element))[0];

    if (intersection.toUpperCase() === intersection) {
      result += intersection.charCodeAt(0) - 38;
    } else {
      result += intersection.charCodeAt(0) - 96;
    }
  }
  console.log(result);
} catch (err) {
  console.log(err);
}
