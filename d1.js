const fs = require("fs");

fs.readFile("./d1input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);

  const dataLines = data.split("\n");
  const elves = [[]];
  for (let i = 0; i < dataLines.length; i++) {
    line = dataLines[i];
    if (line === "") {
      elves.push([]);
      continue;
    }
    const num = Number.parseInt(line);
    elves[elves.length - 1].push(num);
  }

  const calorieCounts = elves.map((elfCalories) => {
    const total = elfCalories.reduce((sum, calories) => sum + calories, 0);
    return total;
  });

  let largest = [0, 0, 0];
  for (let i = 0; i < calorieCounts.length; i++) {
    let currCount = calorieCounts[i];
    if (currCount > largest[0]) {
      largest[0] = currCount;
    }
    largest.sort((a, b) => a - b);
  }

  console.log(largest[0] + largest[1] + largest[2]);
});
