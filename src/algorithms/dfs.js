export function dfs(grid, startNode, targetNode) {
  let queue = [];
  //let allNodes = getallNodes(grid);
  startNode.isVisited = true;
  queue.push({ currentNode: startNode, previousNode: null });
  let searchPath = [];
  while (queue.length !== 0) {
    //console.log(i++);
    let { currentNode, previousNode } = queue.shift();
    if (currentNode.isWall === true) {
      continue;
    }
    searchPath.push(currentNode);
    currentNode.previousNode = previousNode;
    currentNode.isVisited = true;
    let neibors = getNeibors(currentNode, grid);
    //console.log(neibors);
    if (currentNode.type === 2) {
      //console.log(searchPath);
      return searchPath;
    }
    for (let i = 0; i < neibors.length; i++) {
      if (neibors[i].isVisited === false) {
        queue.unshift({ currentNode: neibors[i], previousNode: currentNode });
      }
    }
  }
  if (queue.length === 0) {
    return searchPath;
  }
}

function getNeibors(node, grid) {
  const r = node.row;
  const c = node.col;
  let neibors = [];

  if (r < grid.length - 1) {
    neibors.push(grid[r + 1][c]);
  }
  if (c > 0) {
    neibors.push(grid[r][c - 1]);
  }
  if (c < grid[0].length - 1) {
    neibors.push(grid[r][c + 1]);
  }
  if (r > 0) {
    neibors.push(grid[r - 1][c]);
  }
  return neibors;
}

export function getDfsTargetPath(targetNode) {
  let path = [];
  let currentNode = targetNode;
  while (currentNode != null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}
