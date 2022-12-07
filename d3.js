const fs = require("fs");

fs.readFile("./d3input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);

  const bags = data.split("\n");
  bags.pop();

  const groups = [];
  for (let i = 0; i < bags.length; i += 3) {
    groups.push([
      bags[i].split("").sort(),
      bags[i + 1].split("").sort(),
      bags[i + 2].split("").sort(),
    ]);
  }

  const compartmentSplit = (bag) => {
    const midpoint = bag.length / 2;
    const firstHalf = bag.substring(0, midpoint).split("").sort();
    const secondHalf = bag.substring(midpoint).split("").sort();
    return [firstHalf, secondHalf];
  };

  const priorityPointCalc = (char) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = alphabet.indexOf(char);
    return index + 1;
  };

  const prioritiesPt1 = bags.map((bag) => {
    const [firstHalf, secondHalf] = compartmentSplit(bag);
    const intersection = firstHalf.filter((char) => secondHalf.includes(char));
    return intersection;
  });

  const priorities = groups.map((group) => {
    const intersectionOne = group[0].filter((char) => group[1].includes(char));
    const intersectionTwo = intersectionOne.filter((char) =>
      group[2].includes(char)
    );
    return intersectionTwo;
  });

  const points = priorities.map((priority) => {
    console.log(priorities);
    return priorityPointCalc(priority[0]);
  });
  console.log(priorities.length, points.length);

  const totalPoints = points.reduce((sum, point) => sum + point, 0);

  console.log(totalPoints);
});
