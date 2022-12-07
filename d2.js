const fs = require("fs");

fs.readFile("./d2input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);

  let dataLines = data.split("\n");

  const playMap = {
    A: 1,
    B: 2,
    C: 3,
    X: 0,
    Y: 3,
    Z: 6,
  };

  const rpsResult = (ep, mp) => {
    console.log(ep, mp);
    if (ep === mp) {
      return 3;
    } else if (ep === 1 && mp === 3) {
      return 0;
    } else if (ep === 1 && mp === 2) {
      return 6;
    } else if (ep === 2 && mp === 1) {
      return 0;
    } else if (ep === 2 && mp === 3) {
      return 6;
    } else if (ep === 3 && mp === 2) {
      return 0;
    } else if (ep === 3 && mp === 1) {
      return 6;
    }
  };

  dataLines.pop();
  console.log(dataLines.length);

  const rounds = dataLines.map((line) => {
    const [elfPlay, resultOfGame] = line.split(" ");
    const resultPoints = playMap[resultOfGame];
    let handPoints = 0;
    if (resultOfGame === "X") {
      console.log("Lose");
      //lose
      if (elfPlay === "A") {
        handPoints = 3;
      } else if (elfPlay === "B") {
        handPoints = 1;
      } else {
        handPoints = 2;
      }
    } else if (resultOfGame === "Y") {
      //draw
      handPoints = playMap[elfPlay];
    } else if (resultOfGame === "Z") {
      console.log("Win");
      //win
      if (elfPlay === "A") {
        handPoints = 2;
      } else if (elfPlay === "B") {
        handPoints = 3;
      } else {
        handPoints = 1;
      }
    }
    console.log(
      `${elfPlay}${resultOfGame} Hand: ${handPoints} Result: ${resultPoints} `
    );
    return resultPoints + handPoints;
  });

  const totalPoints = rounds.reduce((acc, round) => acc + round, 0);

  console.log(totalPoints);
});
