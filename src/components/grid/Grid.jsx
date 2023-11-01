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
  const [startRow, setStartRow] = useState(null);
  const [startColumn, setStartColumn] = useState(null);
  const [selectTargetIsClicked, setSelectTargetIsClicked] = useState(false);
  const [targetRow, setTargetRow] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);

  function handleVisualizeCkick() {
    const copy = copyGrid(grid, rows, columns);
    //console.log(r, c);
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
    setSelectTargetIsClicked(false);
    setSelectStartIsClicked(!selectStartIsClicked);
    //console.log(selectStartIsClicked);
  }
  function handleSelectTargetClick() {
    setSelectStartIsClicked(false);
    setSelectTargetIsClicked(!selectTargetIsClicked);
    //console.log(selectTargetIsClicked);
  }

  function handleNodeClick(r, c) {
    const copy = copyGrid(grid, rows, columns);
    if (selectStartIsClicked) {
      if (startColumn != null && startRow != null) {
        copy[startRow][startColumn].type = 0;
      }
      setStartRow(r);
      setStartColumn(c);
      copy[r][c].type = 1;
    } else if (selectTargetIsClicked) {
      if (targetColumn != null && targetRow != null) {
        copy[targetRow][targetColumn].type = 0;
      }
      setTargetRow(r);
      setTargetColumn(c);
      copy[r][c].type = 2;
    }
    setGrid(copy);
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
                isVisited={node.isVisited}
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
      row.push({
        type: 0,
        isVisited: false,
      });
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

export default Grid;
