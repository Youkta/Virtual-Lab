import Matter from "matter-js";

export default function createPivot(matterRef) {
  const { engine, Composite, selectedBody } = matterRef.current;

  if (!selectedBody) {
    return;
  }

  // Remove existing attachment constraints
  const constraints = Composite.allConstraints(engine.world);

  constraints.forEach((constraint) => {
    if (
      constraint.bodyA === selectedBody &&
      ["spring", "rope", "pivot"].includes(constraint.label)
    ) {
      Composite.remove(engine.world, constraint);
    }
  });

  const pivot = Matter.Constraint.create({
    bodyA: selectedBody,

    pointB: {
      x: selectedBody.position.x,
      y: selectedBody.position.y,
    },

    length: 0,
    stiffness: 1,
    damping: 0.1,

    label: "pivot",

    render: {
      visible: true,
      lineWidth: 5,
    },
  });

  Composite.add(engine.world, pivot);
}