import Node from "../node/Node";
import "./grid.css";
import { useState } from "react";
const Grid = () => {
  const rows = 20;
  const columns = 50;
  const [grid, setGrid] = useState(initGrid(rows, columns));
  const [r, setR] = useState(0);
  const [c, setC] = useState(0);
  const [selectStartIsClicked, setSelectStartIsClicked] = useState(false);

  function handleVisualizeCkick() {
    const copy = copyGrid(grid, rows, columns);
    console.log(r, c);
    copy[r][c].isVisited = true;
    setC(c + 1);
    if (c + 1 === columns) {
      setR(r + 1);
      setC(0);
    }
    if (r + 1 === rows) {
      return;
    }

    setGrid(copy);
  }

  function handleSelectStartClick() {
    setSelectStartIsClicked(!selectStartIsClicked);
    console.log(selectStartIsClicked);
  }

  return (
    <div className="grid-container">
      <div className="topbar">
        <button
          className="select-start"
          onClick={() => {
            handleSelectStartClick();
          }}
        >
          Select Start
        </button>
        <button className="select-target">select Target</button>
        <button
          className="dijkstra-btn"
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
                isVisited={node.isVisited}
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
      row.push({
        type: 0,
        isVisited: false,
      });
    }
    grid.push(row);
  }
  grid[10][12].type = 1;
  grid[18][48].type = 2;
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

export default Grid;
