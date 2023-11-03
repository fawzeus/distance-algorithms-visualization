import "./node.css";

export default function Node({
  type,
  isVisited,
  handleClick,
  isOnPath,
  isAWall,
  isVisited_1,
  onCursor,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onDoubleClick,
}) {
  let className = "node-root";
  if (type === 1) {
    className += " start-node";
  } else if (type === 2) {
    className += " finish-node";
  }
  if (isVisited) {
    className += " visited-node";
  } else if (isVisited_1) {
    className += " visited-node-1";
  } else if (onCursor) {
    className += " cursor-node";
  }
  if (isOnPath) {
    className += " path-node";
  }
  if (isAWall) {
    className += " wall-node";
  }
  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseDown={() => onMouseDown()}
      onMouseEnter={() => onMouseEnter()}
      onMouseUp={() => onMouseUp()}
      onDoubleClick={() => onDoubleClick()}
    ></div>
  );
}
