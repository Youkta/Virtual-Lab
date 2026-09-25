import Matter from "matter-js";

export default function createSpring(matterRef) {
  const { engine, Composite, selectedBody } = matterRef.current;

  if (!selectedBody) {
    return;
  }

  // Remove any existing spring attached to this object
  const existingConstraints = Composite.allConstraints(engine.world);

  existingConstraints.forEach((constraint) => {
    if (
      constraint.label === "spring" &&
      constraint.bodyA === selectedBody
    ) {
      Composite.remove(engine.world, constraint);
    }
  });

  const anchor = {
    x: selectedBody.position.x,
    y: selectedBody.position.y,
  };

  const spring = Matter.Constraint.create({
    bodyA: selectedBody,
    pointB: anchor,
    length: 0,
    stiffness: 0.01,
    damping: 0.05,
    label: "spring",
    render: {
      visible: true,
      lineWidth: 3,
    },
  });

  Composite.add(engine.world, spring);
}