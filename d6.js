const fs = require("fs");

fs.readFile("./d6input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const dataString = data.trim();
  let answer;
  for (let i = 0; i < dataString.length - 14; i++) {
    const items = new Set(dataString.substring(i, i + 14).split(""));
    if (items.size === 14) {
      answer = items;
      console.log(i + 14);
      break;
    }
  }
  console.log(answer);
});
