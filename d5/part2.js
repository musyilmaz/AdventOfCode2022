import path from "path";
import fs from "fs";

const inputParser = (data) => {
  const crates = [];
  const orders = [];
  let breakPassed = false;

  for (const line of data) {
    if (line === "") {
      breakPassed = true;
      continue;
    }

    if (breakPassed) {
      orders.push(line);
    } else {
      crates.push(line);
    }
  }

  return [crates, orders];
};

const stackParser = (crates) => {
  const reverseCrates = crates.reverse();
  const stack = {};
  const dataIndexer = {};
  for (const line in reverseCrates) {
    if (line === "0") {
      const splittedLayer = reverseCrates[line].split("");
      for (const index in splittedLayer) {
        if (Number(splittedLayer[index])) {
          // dataIndexer.push(Number(index));
          dataIndexer[splittedLayer[index]] = Number(index);
          stack[splittedLayer[index]] = [];
        }
      }
    } else {
      for (const [stackNumber, stringIdx] of Object.entries(dataIndexer)) {
        const value = reverseCrates[line][stringIdx];
        if (value !== " ") stack[stackNumber].push(reverseCrates[line][stringIdx]);
      }
    }
  }
  return stack;
};

const orderParser = (orderList) => {
  const orders = [];
  for (const orderItem of orderList) {
    orders.push({
      amount: Number(orderItem.split(" ")[1]),
      from: orderItem.split(" ")[3],
      to: orderItem.split(" ")[5],
    });
  }
  return orders;
};

try {
  const filePath = path.resolve(process.cwd(), "d5/data.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");

  const result = [];
  const [crates, orderList] = inputParser(data);
  const stack = stackParser(crates);
  const orders = orderParser(orderList);
  for (const order of orders) {
    const from = stack[order.from];
    const to = stack[order.to];
    const transfer = from.splice(from.length - order.amount, order.amount);
    stack[order.to] = [...to, ...transfer];
  }

  for (const [key, stackArray] of Object.entries(stack)) {
    const last = stackArray.pop();
    result.push(last);
  }
  console.log(result.join(""));
} catch (err) {
  console.log(err);
}
