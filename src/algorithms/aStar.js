export function aStar(grid, startNode, TargetNode) {
  let queue = [{ node: startNode, previousNode: null, g: 0, h: 0 }];
  let searchPath = [];
  while (queue.length > 0) {
    //console.log(i++);
    let currentNodeIndex = calculateNextNodeIndex(queue);
    let currentNode = queue[currentNodeIndex];
    //console.log(queue.length);
    queue.splice(currentNodeIndex, 1);
    if (currentNode.node.isWall === true) {
      continue;
    }
    //console.log(queue.length);
    currentNode.node.previousNode = currentNode.previousNode;
    currentNode.node.isVisited = true;
    searchPath.push(currentNode.node);
    let neibors = getNeibors(currentNode, grid, TargetNode);
    if (currentNode.node.type === 2) {
      break;
    }
    //console.log(neibors);
    for (let i = 0; i < neibors.length; i++) {
      //console.log(neibors[i]);
      if (neibors[i].node.isVisited === false) {
        neibors[i].node.isVisited = true;
        queue.push(neibors[i]);
      }
    }
  }
  return searchPath;
}

function calculateNextNodeIndex(queue) {
  let minf = queue[0].h + queue[0].g;
  let minIndex = 0;
  for (let i = 1; i < queue.length; i++) {
    let f = queue[i].h + queue[i].g;
    if (f < minf) {
      minf = f;
      minIndex = i;
    }
  }
  return minIndex;
}

function getNeibors(node, grid, finishNode) {
  const r = node.node.row;
  const c = node.node.col;
  let neibors = [];
  if (r > 0) {
    let h =
      Math.abs(grid[r - 1][c].col - finishNode.col) +
      Math.abs(grid[r - 1][c].row - finishNode.row);
    neibors.push({
      node: grid[r - 1][c],
      previousNode: node.node,
      g: node.g + 1,
      h: h,
    });
  }
  if (r < grid.length - 1) {
    let h =
      Math.abs(grid[r + 1][c].col - finishNode.col) +
      Math.abs(grid[r + 1][c].row - finishNode.row);
    neibors.push({
      node: grid[r + 1][c],
      previousNode: node.node,
      g: node.g + 1,
      h: h,
    });
  }
  if (c > 0) {
    let h =
      Math.abs(grid[r][c - 1].col - finishNode.col) +
      Math.abs(grid[r][c - 1].row - finishNode.row);
    neibors.push({
      node: grid[r][c - 1],
      previousNode: node.node,
      g: node.g + 1,
      h: h,
    });
  }
  if (c < grid[0].length - 1) {
    let h =
      Math.abs(grid[r][c + 1].col - finishNode.col) +
      Math.abs(grid[r][c + 1].row - finishNode.row);
    neibors.push({
      node: grid[r][c + 1],
      previousNode: node.node,
      g: node.g + 1,
      h: h,
    });
  }
  return neibors;
}

export function getAStarTargetPath(targetNode) {
  let path = [];
  let currentNode = targetNode;
  while (currentNode != null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}
