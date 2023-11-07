export function bfs(grid, startNode, targetNode) {
  let queue = [];
  //let allNodes = getallNodes(grid);
  let previousNode = null;
  let currentNode = null;
  queue.push(startNode);
  let searchPath = [];
  let i = 0;
  while (queue.length !== 0) {
    console.log(i++);
    previousNode = currentNode;
    currentNode = queue.shift();
    searchPath.push(currentNode);
    currentNode.previousNode = previousNode;
    let neibors = getNeibors(currentNode, grid);
    //console.log(neibors);
    if (currentNode.type === 2) {
      return searchPath;
    }
    for (let i = 0; i < neibors.length; i++) {
      if (neibors[i].isVisited === false) {
        neibors[i].isVisited = true;
        queue.push(neibors[i]);
      }
    }
  }
}

function getNeibors(node, grid) {
  const r = node.row;
  const c = node.col;
  let neibors = [];
  if (r > 0) {
    neibors.push(grid[r - 1][c]);
  }
  if (r < grid.length - 1) {
    neibors.push(grid[r + 1][c]);
  }
  if (c > 0) {
    neibors.push(grid[r][c - 1]);
  }
  if (c < grid[0].length - 1) {
    neibors.push(grid[r][c + 1]);
  }
  return neibors;
}

export function getTargetPath(targetNode) {
  let path = [];
  let currentNode = targetNode;
  while (currentNode != null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}

/*function getallNodes(grid) {
  let allNodes = [];
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node);
    }
  }
  return allNodes;
}*/
