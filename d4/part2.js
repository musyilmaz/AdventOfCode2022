import path from "path";
import fs from "fs";


const generateArray = (start, end) => {
  let array = []
  for (let i = Number(start); i <= Number(end); i++) {
    array.push(i)
  }
  return array
}

const isPartiallyContainedFn = (array, checkRange) => {
  const isPartiallyContained = array.some((item) => checkRange.includes(item))
  return isPartiallyContained
}

try {
  const filePath = path.resolve(process.cwd(), "d4/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  let result = 0
  for (const pair of data) {
    if (pair !== "") {
      const [first, second]= pair.split(",")
      const [firstLeft, firstRight] = first.split("-")
      const [secondLeft, secondRight] = second.split("-")
      const firstArray = generateArray(firstLeft, firstRight)
      const secondArray = generateArray(secondLeft, secondRight)

      const isFirstContained = isPartiallyContainedFn(firstArray, secondArray)
      const isSecondContained = isPartiallyContainedFn(secondArray, firstArray)

      if (isFirstContained || isSecondContained) result += 1
    }
  }

  console.log(result)
} catch (err) {
  console.log(err);
}


