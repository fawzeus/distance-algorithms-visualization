export function createRandomMaze(grid, rows, columns) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].isWall = false;
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].isWall = Math.random() < 0.3 ? true : false;
    }
  }
}
