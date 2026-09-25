import Matter from "matter-js";

export default function createRope(matterRef) {
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

  // Anchor directly above the object
  const anchorX = selectedBody.position.x;
  const anchorY = 100;

  const distance = Matter.Vector.magnitude(
    Matter.Vector.sub(
      selectedBody.position,
      { x: anchorX, y: anchorY }
    )
  );

  const rope = Matter.Constraint.create({
    bodyA: selectedBody,

    pointB: {
      x: anchorX,
      y: anchorY,
    },

    length: Math.max(distance, 50),

    stiffness: 1,
    damping: 0,

    label: "rope",

    render: {
      visible: true,
      lineWidth: 3,
    },
  });

  Composite.add(engine.world, rope);
}