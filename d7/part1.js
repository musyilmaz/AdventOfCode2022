import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d7/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  const MAX = 100000;
  let result = 0;
  const directoryList = [];
  const directoryStack = [];

  for (const line of data) {
    if (line === "") continue;
    const lineSplit = line.split(" ");

    console.log(lineSplit);
    if (lineSplit[0] === "$") {
      if (lineSplit[1] === "ls") {
        continue;
      } else {
        if (lineSplit[2] === "..") {
          const removedDirectory = directoryStack.pop();
          directoryList.push(removedDirectory);
        } else {
          directoryStack.push({
            name: lineSplit[2],
            size: 0,
          });
        }
      }
    } else if (lineSplit[0] === "dir") {
      continue;
    } else {
      for (const directory of directoryStack) {
        directory.size += Number(lineSplit[0]);
      }
    }
  }

  console.log(directoryStack, directoryList);

  for (const directory of [...directoryStack, ...directoryList]) {
    if (directory.size <= MAX) {
      result += directory.size;
    }
  }

  console.log(result);
} catch (err) {
  console.log(err);
}
