import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsPanel({ body, data }) {
  if (!body) {
    return (
      <div className="analytics-panel">
        <h3>LIVE ANALYTICS</h3>
        <p>Select an object</p>
      </div>
    );
  }

  const speed = Math.sqrt(
    body.velocity.x ** 2 + body.velocity.y ** 2
  );

  const kineticEnergy =
    0.5 * body.mass * speed ** 2;

  return (
    <div className="analytics-panel">
      <h3>LIVE ANALYTICS</h3>

      <div className="analytics-values">
        <div>
          <span>Speed</span>
          <strong>{speed.toFixed(2)}</strong>
        </div>

        <div>
          <span>Velocity X</span>
          <strong>{body.velocity.x.toFixed(2)}</strong>
        </div>

        <div>
          <span>Velocity Y</span>
          <strong>{body.velocity.y.toFixed(2)}</strong>
        </div>

        <div>
          <span>Kinetic Energy</span>
          <strong>{kineticEnergy.toFixed(2)} J</strong>
        </div>
      </div>

      <h4>SPEED vs TIME</h4>

      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="speed"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsPanel;