import path from "path";
import fs from "fs";

const generateForest = (data) => {
  let forest = [];

  for (const line of data) {
    if (line === "") continue;

    forest.push(line.split("").map((tree) => Number(tree)));
  }
  return forest;
};

const determineNumberOfTreesOnForestEdges = (forest) => {
  let count = 0;

  forest.forEach((element, idx) => {
    if (idx === 0 || idx === forest.length - 1) {
      count += forest.length - 2;
    }
    count += 2;
  });

  return count;
};

const determineNumberOfTreesOnForestCenter = (forest) => {
  let count = 0;

  // move item by item starting from top left corner tree on the forest center.
  // For every forest item we can generate 2 arrays
  // First one left to right so it will actually be the array on the line
  // Second one will be a top-bottom array so it needed to be created
  // keep a flag with true value and check if the arrays valuue is less than its precedents or afters
  // if any time it became false, early exit otherwise increment the count

  for (let rowIdx = 0; rowIdx < forest.length; rowIdx++) {
    const forestRow = forest[rowIdx];
    for (let colIdx = 0; colIdx < forestRow.length; colIdx++) {
      const tree = forest[rowIdx][colIdx];

      if (rowIdx === 0 || rowIdx === forestRow.length - 1 || colIdx === 0 || colIdx === forest.length - 1) {
        continue;
      }
      console.log(rowIdx, colIdx, tree);

      // Left visiblity
      const leftVisibility = forestRow.slice(0, colIdx).every((element) => tree > element);
      if (leftVisibility) {
        console.log("LEFT VISIBLE");
        count += 1;
        continue;
      }

      // Right visiblity
      const rightVisibility = forestRow.slice(colIdx + 1, forestRow.length).every((element) => tree > element);
      if (rightVisibility) {
        console.log("RIGHT VISIBLE");
        count += 1;
        continue;
      }

      const forestCol = forest.map((forestRow) => forestRow[colIdx]);

      const topVisibility = forestCol.slice(0, rowIdx).every((element) => tree > element);
      if (topVisibility) {
        console.log("TOP VISIBLE");
        count += 1;
        continue;
      }

      const bottomVisibility = forestCol.slice(rowIdx + 1, forestCol.length).every((element) => tree > element);
      if (bottomVisibility) {
        console.log("BOTTOM VISIBLE");
        count += 1;
        continue;
      }
    }
  }

  return count;
};

try {
  const filePath = path.resolve(process.cwd(), "d8/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  let numberOfVisibleTrees = 0;

  const forest = generateForest(data);
  console.log("Forest Structure");
  console.log(forest);

  // everything thats on the edge should be visible, a function that determines the tree count on the edge
  // inside what we can do is loop through the [][] and check by another loop that goes from left to right and top to bottom

  const visibleTreesOnEdge = determineNumberOfTreesOnForestEdges(forest);
  const visibleTreesOnCenter = determineNumberOfTreesOnForestCenter(forest);

  console.log("Number of trees on forest edge :", visibleTreesOnEdge);
  console.log("Number of trees on forest center :", visibleTreesOnCenter);

  numberOfVisibleTrees += visibleTreesOnEdge;
  numberOfVisibleTrees += visibleTreesOnCenter;

  console.log(`Visible Tree Count: ${numberOfVisibleTrees}`);
} catch (err) {
  console.log(err);
}
