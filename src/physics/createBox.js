export default function createBox(matterRef) {
  const { engine, Bodies, Composite } = matterRef.current;

  const { render } = matterRef.current;

  const width = render.options.width;

  const x = Math.random() * (width - 200) + 100;

  const box = Bodies.rectangle(
    x,
    50,
    80,
    80,
    {
      label: "dynamic",
    }
  );

  Composite.add(engine.world, box);
}