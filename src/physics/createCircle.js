export default function createCircle(matterRef) {
  const { engine, Bodies, Composite } = matterRef.current;

    const { render } = matterRef.current;
    
    const width = render.options.width;

    const x = Math.random() * (width - 200) + 100;

  const circle = Bodies.circle(
    x,
    50,
    40,
    {
      label: "dynamic",
    }
  );

  Composite.add(engine.world, circle);
}