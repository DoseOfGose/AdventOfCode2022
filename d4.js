const fs = require("fs");

fs.readFile("./d4input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const dataLines = data.split("\n");
  dataLines.pop();
  const elfAssignments = dataLines.map((line) => {
    const [elfOne, elfTwo] = line.split(",");
    const elfOneRange = elfOne.split("-");
    const elfTwoRange = elfTwo.split("-");
    return [
      {
        min: Number.parseInt(elfOneRange[0]),
        max: Number.parseInt(elfOneRange[1]),
      },
      {
        min: Number.parseInt(elfTwoRange[0]),
        max: Number.parseInt(elfTwoRange[1]),
      },
    ];
  });

  const overlaps = elfAssignments.map((assignment) => {
    const [elfOne, elfTwo] = assignment;
    let overlap = false;
    // fully inside another:
    if (elfOne.min >= elfTwo.min && elfOne.max <= elfTwo.max) {
      overlap = true;
    }
    if (elfOne.min <= elfTwo.min && elfOne.max >= elfTwo.max) {
      overlap = true;
    }
    // If the min of either is inside the range of the other:
    if (elfOne.min >= elfTwo.min && elfOne.min <= elfTwo.max) {
      overlap = true;
    }
    if (elfTwo.min >= elfOne.min && elfTwo.min <= elfOne.max) {
      overlap = true;
    }
    // If the max of either is inside the range of the other:
    if (elfOne.max >= elfTwo.min && elfOne.max <= elfTwo.max) {
      overlap = true;
    }
    if (elfTwo.max >= elfOne.min && elfTwo.max <= elfOne.max) {
      overlap = true;
    }

    return overlap;
  });

  const totalOverlap = overlaps.reduce(
    (sum, overlap) => (overlap ? sum + 1 : sum),
    0
  );

  console.log(totalOverlap);
});
