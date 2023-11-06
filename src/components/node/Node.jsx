import "./node.css";

export default function Node({
  type,
  isVisited,
  handleClick,
  isOnPath,
  isAWall,
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
    className += " visited-node animation-node";
  } else if (onCursor) {
    className += " cursor-node";
  }
  if (isOnPath) {
    className += " path-node";
  }
  if (isAWall) {
    className += " wall-node";
  }
  let value = "";
  if (type === 1) {
    value = ">";
  } else if (type === 2) {
    value = "?";
  }
  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseDown={() => onMouseDown()}
      onMouseEnter={() => onMouseEnter()}
      onMouseUp={() => onMouseUp()}
      onDoubleClick={() => onDoubleClick()}
    >
      {value}
    </div>
  );
}
