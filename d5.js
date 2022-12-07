const fs = require("fs");

fs.readFile("./d5input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const [towerSetupString, towerMovesString] = data.split("\n\n");
  const towers = [
    ["W", "B", "D", "N", "C", "F", "J"],
    ["P", "Z", "V", "Q", "L", "S", "T"],
    ["P", "Z", "B", "G", "J", "T"],
    ["D", "T", "L", "J", "Z", "B", "H", "C"],
    ["G", "V", "B", "J", "S"],
    ["P", "S", "Q"],
    ["B", "V", "D", "F", "L", "M", "P", "N"],
    ["P", "S", "M", "F", "B", "D", "L", "R"],
    ["V", "D", "T", "R"],
  ];

  const towerMoveLines = towerMovesString.split("\n");
  towerMoveLines.pop();

  console.log(towers);

  const moves = towerMoveLines.map((line) => {
    const [move, quantity, from, sourceTower, to, targetTower] =
      line.split(" ");
    return {
      quantity: Number.parseInt(quantity),
      sourceTower: Number.parseInt(sourceTower),
      targetTower: Number.parseInt(targetTower),
    };
  });
  moves.forEach((move) => {
    const discsToMove = towers[move.sourceTower - 1].slice(-1 * move.quantity);
    towers[move.sourceTower - 1] = towers[move.sourceTower - 1].slice(
      0,
      -1 * move.quantity
    );
    towers[move.targetTower - 1] = [
      ...towers[move.targetTower - 1],
      ...discsToMove,
    ];
  });
  const result = towers.reduce(
    (topString, tower) => topString + tower[tower.length - 1],
    ""
  );
  console.log(result);
});
