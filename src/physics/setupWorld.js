export default function setupWorld(matterRef) {
  const {
    engine,
    render,
    Bodies,
    Composite,
  } = matterRef.current;

  const width = render.options.width;
  const height = render.options.height;

  const box = Bodies.rectangle(
    width / 2,
    100,
    80,
    80,
    {
      label: "dynamic",
    }
  );

  const ground = Bodies.rectangle(
    width / 2,
    height - 20,
    width,
    40,
    {
      isStatic: true,
      label: "ground",
    }
  );

  const leftWall = Bodies.rectangle(
    20,
    height / 2,
    40,
    height,
    {
      isStatic: true,
      label: "wall",
    }
  );

  const rightWall = Bodies.rectangle(
    width - 20,
    height / 2,
    40,
    height,
    {
      isStatic: true,
      label: "wall",
    }
  );

  const ceiling = Bodies.rectangle(
    width / 2,
    20,
    width,
    40,
    {
      isStatic: true,
      label: "ceiling",
    }
  );

  Composite.add(engine.world, [
    box,
    ground,
    leftWall,
    rightWall,
    ceiling,
    matterRef.current.mouseConstraint,
  ]);
}