import Node from "../node/Node";
import "./grid.css";
import { useState } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";
import { dfs, getDfsTargetPath } from "../../algorithms/dfs";
import { bfs, getBfsTargetPath } from "../../algorithms/bfs";
import { aStar, getAStarTargetPath } from "../../algorithms/aStar";
import {
  bidirectionalSearch,
  getBidrirectionalTargetPath,
} from "../../algorithms/bidirectionalSearch";
import { createRandomMaze } from "../../algorithms/randomMaze";
import { CreateRecursiveMaze } from "../../algorithms/recursiveMaze";
const algorithmFunctions = {
  1: [dijkstra, getNodesInShortestPathOrder],
  2: [dfs, getDfsTargetPath],
  3: [bfs, getBfsTargetPath],
  4: [aStar, getAStarTargetPath],
  5: [bidirectionalSearch, getBidrirectionalTargetPath],
};

const GridSizes = {
  0: { nodeSize: "25px", rows: 20, columns: 50 },
  1: { nodeSize: "20px", rows: 30, columns: 70 },
  2: { nodeSize: "15px", rows: 40, columns: 90 },
};

const Grid = () => {
  const [selectStartIsClicked, setSelectStartIsClicked] = useState(false);
  const [startRow, setStartRow] = useState(null);
  const [startColumn, setStartColumn] = useState(null);
  const [selectTargetIsClicked, setSelectTargetIsClicked] = useState(false);
  const [targetRow, setTargetRow] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);
  const [addWallIsClicked, setAddwallIsClicked] = useState(false);
  const [mouseIsClicked, setMouseIsClicked] = useState(false);
  const [isVisualized, setIsVisualized] = useState(false);
  const [algorithmSelector, setAlgorithmSelector] = useState(0);
  const [elapsedTime, setElapsedTime] = useState("");
  const [visitedNodes, setVisitedNodes] = useState("");
  const [pathLength, setPathLength] = useState("");
  const [gridSize, setGridSize] = useState(0);
  //const [visualizeButtonText, setVisualizeButtonText] = useState("Visualize");
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(50);
  const [grid, setGrid] = useState(initGrid(rows, columns));

  function animateDijkstra(
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    elapsedTime
  ) {
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
    setTimeout(() => {
      setElapsedTime(`Elapsed Time :${elapsedTime} ms`);
      setVisitedNodes(`Number of Visited Nodes :${visitedNodesInOrder.length}`);
      setPathLength(`Path Length : ${nodesInShortestPathOrder.length}`);
    }, visitedNodesInOrder.length * Speed + 500);
  }
  function createMaze(value) {
    if (value === "0") {
      setGrid(initGrid(rows, columns));
    }
    if (value === "1") {
      let copy = copyGrid(grid, rows, columns);
      createRandomMaze(copy, rows, columns);
      setGrid(copy);
    } else if (value === "2") {
      let copy = copyGrid(grid, rows, columns);
      CreateRecursiveMaze(copy, rows, columns);
      setGrid(copy);
    }
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
    if (algorithmSelector === 0) {
      return;
    }
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
    const [algorithm, pathVisualizer] = algorithmFunctions[algorithmSelector];

    const startNode = grid[startRow][startColumn];
    const finishNode = grid[targetRow][targetColumn];
    const startTime = performance.now();
    const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    const nodesInShortestPathOrder = pathVisualizer(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, elapsedTime);
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
  function handleRestartButton() {
    let copy = copyGrid(grid, rows, columns);
    clearPath(copy, rows, columns);
    setGrid(copy);
    setIsVisualized(false);
    clearResults();
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
    clearResults();
  }

  function clearResults() {
    setElapsedTime("");
    setVisitedNodes("");
    setPathLength("");
  }
  function HandleGridResize(value) {
    setGridSize(value);
    setRows(GridSizes[value].rows);
    setColumns(GridSizes[value].columns);
    setGrid(initGrid(GridSizes[value].rows, GridSizes[value].columns));
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
        <select
          className="maze-selector"
          id="mazeSelector"
          onChange={(e) => createMaze(e.target.value)}
        >
          <option value="0">Select a maze</option>
          <option value="1">Random Maze</option>
          <option value="2">Recursive Maze</option>
        </select>
        <button
          className="button clear-grid"
          onClick={() => {
            clearGrid();
          }}
        >
          Clear Grid
        </button>
        <button
          className="button restar"
          onClick={() => {
            handleRestartButton();
          }}
        >
          Restart
        </button>
        <select
          className="algorithm-selector"
          id="algorithmSelector"
          onChange={(e) => setAlgorithmSelector(e.target.value)}
        >
          <option value="0">Select An Algorithm</option>
          <option value="1">Dijkstra</option>
          <option value="2">DFS</option>
          <option value="3">BFS</option>
          <option value="4">A*</option>
          <option value="5">Bidorectional Search</option>
        </select>
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
          Visualize
        </button>
        <select
          className="grid-resizer"
          id="resize-grid"
          onChange={(e) => {
            HandleGridResize(e.target.value);
          }}
        >
          <option value="0">Small Grid</option>
          <option value="1">Medium Grid</option>
          <option value="2">Big Grid</option>
        </select>
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
                nodeSize={GridSizes[gridSize].nodeSize}
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
      <div className="results-container">
        <div className="result elapsed-time">{elapsedTime}</div>
        <div className="result visited-nodes">{visitedNodes}</div>
        <div className="result path-length">{pathLength}</div>
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
    visitedBy: 0,
  };
}

function clearPath(grid, rows, columns) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].isVisited = false;
      grid[i][j].distance = Infinity;
      grid[i][j].previousNode = null;
      grid[i][j].markVisited = false;
      grid[i][j].isOnPath = false;
      grid[i][j].onCursor = false;
      grid[i][j].visitedBy = 0;
    }
  }
}

export default Grid;
