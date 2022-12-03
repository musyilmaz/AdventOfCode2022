import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d3/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  let result = 0;
  const group = [];
  while (data.length) {
    group.push(data.splice(0, 3));
  }

  for (const runsackGroup of group) {
    if (runsackGroup.length !== 3) continue;
    const [r1, r2, r3] = runsackGroup;
    const intersection1 = [
      ...new Set(
        r1.split("").filter((element) => r2.split("").includes(element))
      ),
    ];

    const intersection = [
      ...new Set(
        r3.split("").filter((element) => intersection1.includes(element))
      ),
    ][0];

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
