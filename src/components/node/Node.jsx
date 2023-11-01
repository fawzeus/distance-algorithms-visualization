import "./node.css";

export default function Node({ type, isVisited }) {
  let className = "node-root";
  if (type === 1) {
    className += " start-node";
  } else if (type === 2) {
    className += " finish-node";
  }
  if (isVisited) {
    className += " visited-node";
  }
  return <div className={className}></div>;
}
