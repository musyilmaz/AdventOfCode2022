import path from "path";
import fs from "fs";

try {
  const filePath = path.resolve(process.cwd(), "d1/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
  let list = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      list.push([]);
    } else {
      if (list.length === 0) {
        list.push([]);
      }
      list[list.length - 1].push(data[i]);
    }
  }
  const totals = list.map((items) => {
    return items.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  });
  console.log(Math.max(...totals));
} catch (err) {
  console.log(err);
  console.log("data.txt couldnt be read");
}
