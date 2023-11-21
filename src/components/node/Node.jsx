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
  nodeSize,
}) {
  //const [testValue, setTestValue] = useState(nodeSize);
  let className = "node-root";
  let containerClassName = "square-container";
  if (type === 1) {
    className += " start-node";
  } else if (type === 2) {
    className += " finish-node";
  }
  if (isVisited) {
    className += " visited-node animation-node";
  }
  if (isOnPath) {
    className += " path-node";
    containerClassName += " no-outline-container";
  }
  if (isAWall) {
    className += " wall-node";
    containerClassName += " no-outline-container";
  }
  let value = "";
  if (type === 1) {
    value = ">";
  } else if (type === 2) {
    value = "?";
  }
  return (
    <>
      <div className={containerClassName} style={{ "--test": nodeSize }}>
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
      </div>
    </>
  );
}
