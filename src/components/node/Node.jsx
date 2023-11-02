import "./node.css";

export default function Node({
  type,
  isVisited,
  handleClick,
  isOnPath,
  isAWall,
}) {
  let className = "node-root";
  if (type === 1) {
    className += " start-node";
  } else if (type === 2) {
    className += " finish-node";
  }
  if (isVisited) {
    className += " visited-node";
  }
  if (isOnPath) {
    className += " path-node";
  }
  if (isAWall) {
    className += " wall-node";
  }
  return <div className={className} onClick={handleClick}></div>;
}
