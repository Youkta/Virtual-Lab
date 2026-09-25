function PropertiesPanel({ body, onChange }) {
  if (!body) {
    return (
      <div className="properties-panel">
        <h3>OBJECT PROPERTIES</h3>
        <p>Select an object</p>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <h3>OBJECT PROPERTIES</h3>

      <p>
        Type: {body.circleRadius ? "Circle" : "Box"}
      </p>

      <label>
        Mass
        <input
          type="number"
          step="0.1"
          value={body.mass.toFixed(2)}
          onChange={(e) =>
            onChange("mass", e.target.value)
          }
        />
      </label>

      <label>
        Friction: {body.friction.toFixed(2)}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={body.friction}
          onChange={(e) =>
            onChange("friction", e.target.value)
          }
        />
      </label>

      <label>
        Restitution: {body.restitution.toFixed(2)}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={body.restitution}
          onChange={(e) =>
            onChange("restitution", e.target.value)
          }
        />
      </label>

      <h4>VELOCITY</h4>

      <label>
        X
        <input
          type="number"
          step="0.1"
          value={body.velocity.x.toFixed(2)}
          onChange={(e) =>
            onChange("velocityX", e.target.value)
          }
        />
      </label>

      <label>
        Y
        <input
          type="number"
          step="0.1"
          value={body.velocity.y.toFixed(2)}
          onChange={(e) =>
            onChange("velocityY", e.target.value)
          }
        />
      </label>

      <p className="hint">
        Negative Y = upward velocity
      </p>
    </div>
  );
}

export default PropertiesPanel;