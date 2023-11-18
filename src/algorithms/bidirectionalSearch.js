export function bidirectionalSearch(grid, startNode, targetNode) {
  let forwardQueue = [{ node: startNode, previousNode: null }];
  let backwardQueue = [{ node: targetNode, previousNode: null }];
  startNode.isVisited = true;
  targetNode.isVisited = true;
  startNode.visitedBy = 1;
  targetNode.visitedBy = 2;
  let visitedInOrder = [];
  let currentForwardNode = null;
  let currentBackwardNode = null;

  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    currentForwardNode = forwardQueue.shift();
    currentForwardNode.node.previousNode = currentForwardNode.previousNode;
    let forwardNodeNeigbors = getNeibors(currentForwardNode.node, grid);
    currentBackwardNode = backwardQueue.shift();
    currentBackwardNode.node.previousNode = currentBackwardNode.previousNode;
    let backwardNodeNeigbors = getNeibors(currentBackwardNode.node, grid);
    visitedInOrder.push(currentForwardNode.node);
    visitedInOrder.push(currentBackwardNode.node);
    for (let i = 0; i < forwardNodeNeigbors.length; i++) {
      if (forwardNodeNeigbors[i].isVisited === false) {
        forwardNodeNeigbors[i].isVisited = true;
        forwardNodeNeigbors[i].visitedBy = 1;
        forwardQueue.push({
          node: forwardNodeNeigbors[i],
          previousNode: currentForwardNode.node,
        });
      }
    }
    for (let i = 0; i < backwardNodeNeigbors.length; i++) {
      if (backwardNodeNeigbors[i].isVisited === false) {
        backwardNodeNeigbors[i].isVisited = true;
        backwardNodeNeigbors[i].visitedBy = 2;
        backwardQueue.push({
          node: backwardNodeNeigbors[i],
          previousNode: currentBackwardNode.node,
        });
      }
    }
    let forwardFinished = forwardFoundPath(forwardNodeNeigbors);
    let backwardFinished = backWardFoundPath(backwardNodeNeigbors);
    if (forwardFinished != null || backwardFinished != null) {
      /////////////
      while (forwardQueue.length > 0) {
        let currentForwardNode1 = forwardQueue.shift();
        currentForwardNode1.node.previousNode =
          currentForwardNode1.previousNode;
      }
      while (backwardQueue.length > 0) {
        let currentBackwardNode1 = backwardQueue.shift();
        currentBackwardNode1.node.previousNode =
          currentBackwardNode1.previousNode;
      }
      /////////////

      let nextNode = null;
      let previousNode = null;
      let currentNode = null;
      if (forwardFinished) {
        visitedInOrder.push(forwardFinished);
        nextNode = forwardFinished.previousNode;
        previousNode = currentForwardNode.node;
        currentNode = forwardFinished;
      } else {
        visitedInOrder.push(backwardFinished);

        nextNode = currentBackwardNode.previousNode;
        previousNode = backwardFinished;
        currentNode = currentBackwardNode.node;
      }

      while (currentNode != null) {
        currentNode.previousNode = previousNode;
        previousNode = currentNode;
        currentNode = nextNode;
        if (currentNode != null) nextNode = currentNode.previousNode;
      }
      break;
    }
  }
  return visitedInOrder;
}

function getNeibors(node, grid) {
  const r = node.row;
  const c = node.col;
  let neibors = [];
  if (r > 0 && grid[r - 1][c].isWall === false) {
    neibors.push(grid[r - 1][c]);
  }
  if (r < grid.length - 1 && grid[r + 1][c].isWall === false) {
    neibors.push(grid[r + 1][c]);
  }
  if (c > 0 && grid[r][c - 1].isWall === false) {
    neibors.push(grid[r][c - 1]);
  }
  if (c < grid[0].length - 1 && grid[r][c + 1].isWall === false) {
    neibors.push(grid[r][c + 1]);
  }
  return neibors;
}

export function getBidrirectionalTargetPath(targetNode) {
  let path = [];
  //return path;
  let currentNode = targetNode;
  while (currentNode != null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}

function forwardFoundPath(neigbors) {
  for (let neigbor of neigbors) {
    if (neigbor.visitedBy === 2) {
      return neigbor;
    }
  }
  return null;
}
function backWardFoundPath(neigbors) {
  for (let neigbor of neigbors) {
    if (neigbor.visitedBy === 1) {
      return neigbor;
    }
  }
  return null;
}
