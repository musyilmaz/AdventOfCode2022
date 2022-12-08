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

const determineScenery = (tree, compareTrees) => {
  let scenery = 0;
  for (const currTree of compareTrees) {
    scenery += 1;
    if (currTree >= tree) break;
  }
  return scenery;
};

const determineTreeScenery = (forest) => {
  let scenery = [];
  for (let rowIdx = 0; rowIdx < forest.length; rowIdx++) {
    const forestRow = forest[rowIdx];
    for (let colIdx = 0; colIdx < forestRow.length; colIdx++) {
      const tree = forest[rowIdx][colIdx];

      if (rowIdx === 0 || rowIdx === forestRow.length - 1 || colIdx === 0 || colIdx === forest.length - 1) {
        continue;
      }

      // Left visiblity
      const treesOnLeft = forestRow.slice(0, colIdx).reverse();
      const leftScenery = determineScenery(tree, treesOnLeft);

      // Right visiblity
      const treesOnRight = forestRow.slice(colIdx + 1, forestRow.length);
      const rightScenery = determineScenery(tree, treesOnRight);

      const forestCol = forest.map((forestRow) => forestRow[colIdx]);

      const treesOnTop = forestCol.slice(0, rowIdx).reverse();
      const topScenery = determineScenery(tree, treesOnTop);

      const treesOnBottom = forestCol.slice(rowIdx + 1, forestCol.length);
      const bottomScenery = determineScenery(tree, treesOnBottom);
      console.log(rowIdx, colIdx, tree, forestRow, forestCol, leftScenery, rightScenery, topScenery, bottomScenery);

      scenery.push(leftScenery * rightScenery * bottomScenery * topScenery);
    }
  }

  return scenery;
};

try {
  const filePath = path.resolve(process.cwd(), "d8/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  const forest = generateForest(data);
  console.log("Forest Structure");
  console.log(forest);

  // everything thats on the edge should be visible, a function that determines the tree count on the edge
  // inside what we can do is loop through the [][] and check by another loop that goes from left to right and top to bottom

  const sceneryOfTrees = determineTreeScenery(forest);

  console.log(sceneryOfTrees.sort((a, b) => b - a)[0]);
} catch (err) {
  console.log(err);
}
