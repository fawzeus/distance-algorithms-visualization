export function CreateRecursiveMaze(grid, rows, columns) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].isWall = false;
    }
  }
  addOuterWalls(grid, rows, columns);
}

function addOuterWalls(grid, rows, columns) {
  for (let i = 0; i < rows; i++) {
    if (i === 0 || i === rows - 1) {
      for (let j = 0; j < columns; j++) {
        grid[i][j].isWall = true;
      }
    } else {
      grid[i][0].isWall = true;
      grid[i][columns - 1].isWall = true;
    }
  }
  let gate = addEntrance(grid, rows, columns);
  addInnerWalls(grid, true, 1, columns - 2, 1, rows - 2, gate);
}

function addInnerWalls(grid, h, minX, maxX, minY, maxY, gate) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }
    var y = Math.floor(getRandomNumber(minY, maxY) / 2) * 2;
    addHWall(grid, minX, maxX, y);
    addInnerWalls(grid, !h, minX, maxX, minY, y - 1, gate);
    addInnerWalls(grid, !h, minX, maxX, y + 1, maxY, gate);
  } else {
    if (maxY - minY < 2) {
      return;
    }
    var x = Math.floor(getRandomNumber(minX, maxX) / 2) * 2;
    addVWall(grid, minY, maxY, x);

    addInnerWalls(grid, !h, minX, x - 1, minY, maxY, gate);
    addInnerWalls(grid, !h, x + 1, maxX, minY, maxY, gate);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addHWall(grid, minX, maxX, y) {
  var hole = Math.floor(getRandomNumber(minX, maxX) / 2) * 2 + 1;

  for (var i = minX; i <= maxX; i++) {
    if (i === hole) {
      grid[y][i].isWall = false;
    } else {
      grid[y][i].isWall = true;
    }
  }
}
function addVWall(grid, minY, maxY, x) {
  var hole = Math.floor(getRandomNumber(minY, maxY) / 2) * 2 + 1;

  for (var i = minY; i <= maxY; i++) {
    if (i === hole) grid[i][x].isWall = false;
    else grid[i][x].isWall = true;
  }
}

function addEntrance(grid, rows, columns) {
  var x = getRandomNumber(1, columns - 1);
  grid[rows - 1][x].isWall = false;
  return x;
}
