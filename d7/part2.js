import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d7/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  const MAX = 100000;
  const LIMIT = 70000000;
  const NEEDED = 30000000;

  let directories = [];
  const memoizedDirectories = [];
  const directoryStack = [];

  for (const line of data) {
    if (line === "") continue;
    const lineSplit = line.split(" ");

    if (lineSplit[0] === "$") {
      if (lineSplit[1] === "ls") {
        continue;
      } else {
        if (lineSplit[2] === "..") {
          const removedDirectory = directoryStack.pop();
          memoizedDirectories.push(removedDirectory);
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

  directories = [...directoryStack, ...memoizedDirectories];
  console.log(directories);
  const rootDirectory = directories.find((directory) => directory.name === "/");
  const currentFreeSpace = LIMIT - rootDirectory.size;
  console.log(`current free space is ${currentFreeSpace}`);
  const neededSpace = NEEDED - currentFreeSpace;
  console.log(`Need to remove space for ${neededSpace}`);

  const possibleDirectories = directories.filter((directory) => directory.size > neededSpace);
  console.log(possibleDirectories.sort((a, b) => a.size - b.size));
  console.log(possibleDirectories.sort((a, b) => a.size - b.size)[0]);
} catch (err) {
  console.log(err);
}
