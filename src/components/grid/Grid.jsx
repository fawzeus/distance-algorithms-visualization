import Node from "../node/Node";
import "./grid.css";
import { useState } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";
//import { dfs, getTargetPath } from "../../algorithms/dfs";

const Grid = () => {
  const rows = 20;
  const columns = 50;
  const [grid, setGrid] = useState(initGrid(rows, columns));
  const [selectStartIsClicked, setSelectStartIsClicked] = useState(false);
  const [startRow, setStartRow] = useState(null);
  const [startColumn, setStartColumn] = useState(null);
  const [selectTargetIsClicked, setSelectTargetIsClicked] = useState(false);
  const [targetRow, setTargetRow] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);
  const [addWallIsClicked, setAddwallIsClicked] = useState(false);
  const [mouseIsClicked, setMouseIsClicked] = useState(false);
  const [isVisualized, setIsVisualized] = useState(false);

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const Speed = 10;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      let row = visitedNodesInOrder[i].row;
      let col = visitedNodesInOrder[i].col;
      setTimeout(() => {
        const copy = copyGrid(grid, rows, columns);
        copy[row][col].isVisited_1 = true;
      }, Speed * i);
      setTimeout(() => {
        const copy = copyGrid(grid, rows, columns);
        copy[row][col].markVisited = true;

        setGrid(copy);
      }, Speed * i + 500);
    }
    setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, (visitedNodesInOrder.length - 1) * Speed + 500);
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    if (nodesInShortestPathOrder.length === 1) {
      return;
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const copy = copyGrid(grid, rows, columns);
        copy[node.row][node.col].isOnPath = true;
        setGrid(copy);
      }, 50 * i);
    }
  }

  function handleVisualizeCkick() {
    if (
      startRow === null ||
      startColumn === null ||
      targetRow === null ||
      targetColumn === null
    ) {
      return;
    }
    if (isVisualized) return;
    setIsVisualized(true);
    const startNode = grid[startRow][startColumn];
    const finishNode = grid[targetRow][targetColumn];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //console.log(nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function handleSelectStartClick() {
    if (isVisualized) return;
    setSelectTargetIsClicked(false);
    setAddwallIsClicked(false);
    setSelectStartIsClicked(!selectStartIsClicked);
    //console.log(selectStartIsClicked);
  }
  function handleSelectTargetClick() {
    if (isVisualized) return;
    setSelectStartIsClicked(false);
    setAddwallIsClicked(false);
    setSelectTargetIsClicked(!selectTargetIsClicked);
    //console.log(selectTargetIsClicked);
  }
  function handleAddWall() {
    if (isVisualized) return;
    setSelectTargetIsClicked(false);
    setSelectStartIsClicked(false);
    setAddwallIsClicked(!addWallIsClicked);
  }

  function handleNodeClick(r, c) {
    if (isVisualized) return;
    const copy = copyGrid(grid, rows, columns);
    if (selectStartIsClicked) {
      if (copy[r][c].isWall) {
        return;
      }
      if (startColumn != null && startRow != null) {
        copy[startRow][startColumn].type = 0;
      }

      setStartRow(r);
      setStartColumn(c);
      copy[r][c].type = 1;
    } else if (selectTargetIsClicked) {
      if (copy[r][c].isWall) {
        return;
      }
      if (targetColumn != null && targetRow != null) {
        copy[targetRow][targetColumn].type = 0;
      }

      setTargetRow(r);
      setTargetColumn(c);
      copy[r][c].type = 2;
    } else if (addWallIsClicked) {
      copy[r][c].isWall = !copy[r][c].isWall;
    }
    setGrid(copy);
  }

  function handleMouseUp() {
    setMouseIsClicked(false);
  }
  function handleMouseDown() {
    setMouseIsClicked(true);
  }
  function handleMouseEnter(r, c) {
    if (isVisualized) return;
    if (!mouseIsClicked || !addWallIsClicked) {
      return;
    }
    const copy = copyGrid(grid, rows, columns);
    const state = copy[r][c].isWall;
    copy[r][c].isWall = !state;
    setGrid(copy);
  }
  function handleDoubleClick(r, c) {
    if (isVisualized) return;
    if (!addWallIsClicked) return;
    const copy = copyGrid(grid, rows, columns);
    copy[r][c].isWall = true;
    setGrid(copy);
  }

  function clearGrid() {
    setIsVisualized(false);
    setGrid(initGrid(rows, columns));
    setStartColumn(null);
    setStartRow(null);
    setTargetColumn(null);
    setTargetRow(null);
  }

  return (
    <div className="grid-container">
      <div className="topbar">
        <button
          className={
            "button select-start" + (selectStartIsClicked ? " active-btn" : "")
          }
          onClick={() => {
            handleSelectStartClick();
          }}
        >
          Select Start
        </button>
        <button
          className={
            "button select-target" +
            (selectTargetIsClicked ? " active-btn" : "")
          }
          onClick={() => {
            handleSelectTargetClick();
          }}
        >
          select Target
        </button>
        <button
          className="button clear-grid"
          onClick={() => {
            clearGrid();
          }}
        >
          Clear Grid
        </button>
        <button
          className={
            "button add-wall" + (addWallIsClicked ? " active-btn" : "")
          }
          onClick={() => {
            handleAddWall();
          }}
        >
          Add Wall
        </button>
        <button
          className="button dijkstra-btn"
          onClick={() => {
            handleVisualizeCkick();
          }}
        >
          visualize dijkstra
        </button>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                type={node.type}
                isVisited={node.markVisited}
                isOnPath={node.isOnPath}
                isAWall={node.isWall}
                onCursor={node.onCursor}
                onMouseUp={() => {
                  handleMouseUp();
                }}
                onMouseDown={() => {
                  handleMouseDown();
                }}
                onMouseEnter={() => {
                  handleMouseEnter(rowIndex, nodeIndex);
                }}
                onDoubleClick={() => {
                  handleDoubleClick(rowIndex, nodeIndex);
                }}
                handleClick={() => {
                  handleNodeClick(rowIndex, nodeIndex);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

function initGrid(rows, columns) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push(createNode(i, j));
    }
    grid.push(row);
  }

  return grid;
}

function copyGrid(grid, rows, columns) {
  let copy = [];
  for (let i = 0; i < rows; i++) {
    let copyRaw = [];
    for (let j = 0; j < columns; j++) {
      copyRaw.push(grid[i][j]);
    }
    copy.push(copyRaw);
  }
  return copy;
}

function createNode(row, col) {
  return {
    row: row,
    col: col,
    type: 0,
    isVisited: false,
    isWall: false,
    distance: Infinity,
    previousNode: null,
    markVisited: false,
    isOnPath: false,
    onCursor: false,
  };
}

export default Grid;
