function Toolbar({ onAddBox, onAddCircle, onAddSpring, onAddRope, onAddPivot, onReset }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        background: "#333",
      }}
    >
      <button onClick={onAddBox}>+ Box</button>
      <button onClick={onAddCircle}>+ Circle</button>
      <button onClick={onAddSpring}>+ Spring</button>
      <button onClick={onAddRope}>+ Rope</button>
      <button onClick={onAddPivot}>+ Pivot</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Toolbar;