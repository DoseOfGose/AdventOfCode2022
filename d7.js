const fs = require("fs");

const data = fs.readFileSync("./d7input.txt", "utf-8");

const commandGroups = data.trim().split("\n$ ");

const mkdir = (parent, path) => {
  return {
    fullPath: `${parent.fullPath}/${path}`,
    parent,
    childDirs: {},
    files: {},
    fileSizeTotal: 0,
  };
};
const root = {
  fullPath: "",
  parent: null,
  childDirs: {},
  files: {},
  fileSizeTotal: 0,
};

let currDir = root;

commandGroups.forEach((commandGroup) => {
  const [cmdLine, ...responseLines] = commandGroup.split("\n");
  if (cmdLine === "$ cd /") {
    return; // skip first root entry
  }
  const [cmd, cmdParam] = cmdLine.split(" ");
  if (cmd === "cd") {
    if (cmdParam === "..") {
      currDir = currDir.parent;
    } else {
      if (currDir[cmdParam]) {
        currDir = currDir.childDirs[cmdParam];
      } else {
        currDir.childDirs[cmdParam] = mkdir(currDir);
        currDir = currDir.childDirs[cmdParam];
      }
    }
  } else if (cmd === "ls") {
    responseLines.forEach((entry) => {
      const [meta, name] = entry.split(" ");
      if (meta === "dir") {
        if (!currDir.childDirs[name]) {
          currDir.childDirs[name] = mkdir(currDir);
        }
      } else {
        if (!currDir.files[name]) {
          const fileSize = Number.parseInt(meta);
          currDir.files[name] = fileSize;
          currDir.fileSizeTotal += fileSize;
        }
      }
    });
  }
});

let countThese = [];
const getChildrenSize = (node) => {
  const childDirSize = Object.entries(node.childDirs).map(([name, childNode]) =>
    getChildrenSize(childNode)
  );
  const childDirSizeTotal = childDirSize.reduce(
    (acc, currSize) => acc + currSize,
    0
  );
  const nodeTotal = node.fileSizeTotal + childDirSizeTotal;
  node.totalWithChildren = nodeTotal;

  if (nodeTotal < 100000) {
    countThese.push(nodeTotal);
  }

  return nodeTotal;
};

getChildrenSize(root);

console.log(countThese.reduce((acc, curr) => acc + curr, 0));

const fileSystemSize = 70000000;
const freeSpaceTarget = 30000000;
const currentUsedSpace = root.totalWithChildren;
const currentFreeSpace = fileSystemSize - currentUsedSpace;
const minimumToDelete = freeSpaceTarget - currentFreeSpace;

let closest = Infinity;
const checkChildren = (node) => {
  //check current
  if (
    node.totalWithChildren > minimumToDelete &&
    node.totalWithChildren < closest
  ) {
    closest = node.totalWithChildren;
  }
  const childDirSize = Object.entries(node.childDirs).map(([name, childNode]) =>
    checkChildren(childNode)
  );
};

checkChildren(root);

console.log(closest);
