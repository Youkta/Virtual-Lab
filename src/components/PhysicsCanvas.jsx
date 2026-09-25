import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import Matter from "matter-js";

import setupWorld from "../physics/setupWorld";
import createBox from "../physics/createBox";
import createCircle from "../physics/createCircle";
import PropertiesPanel from "./PropertiesPanel";
import createSpring from "../physics/createSpring";
import createRope from "../physics/createRope";
import createPivot from "../physics/createPivot";
import AnalyticsPanel from "./AnalyticsPanel";

const PhysicsCanvas = forwardRef((props, ref) => {
  const sceneRef = useRef(null);
  const matterRef = useRef({});
  const [selectedBody, setSelectedBody] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Query,
    } = Matter;

    // Engine
    const engine = Engine.create();
    engine.gravity.y = 1;

    // Renderer
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
    element: sceneRef.current,
    engine,
    options: {
        width,
        height,
        wireframes: false,
        background: "#2c2c2c",
    },
    });

    // Runner
    const runner = Runner.create();

    // Mouse
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.2,
        render: {
        visible: false,
        },
    },
    });

    render.mouse = mouse;

    // Save everything
    matterRef.current = {
    engine,
    render,
    runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    mouseConstraint,
    selectedBody: null,
    };

    // Build initial world
    setupWorld(matterRef);

    let startTime = Date.now();

    const updateAnalytics = () => {
    const body = matterRef.current.selectedBody;

    if (!body) {
        return;
    }

    const elapsed =
        (Date.now() - startTime) / 1000;

    const speed = Math.sqrt(
        body.velocity.x ** 2 +
        body.velocity.y ** 2
    );

    setAnalyticsData((previous) => {
        const next = [
        ...previous,
        {
            time: Number(elapsed.toFixed(1)),
            speed: Number(speed.toFixed(2)),
        },
        ];

        // Keep only the last 30 seconds-ish
        return next.slice(-60);
    });
    };

    const analyticsInterval = setInterval(updateAnalytics, 100);

    // =========================
    // OBJECT SELECTION
    // =========================

    const handleMouseDown = () => {
      const mousePosition = mouse.position;

      const bodies = Composite.allBodies(engine.world);

      // Find body under mouse
      const clickedBodies = Query.point(bodies, mousePosition);

      // Only allow dynamic objects to be selected
      const clickedBody = clickedBodies.find(
        (body) => body.label === "dynamic"
      );

      // Remove old selection
      if (matterRef.current.selectedBody) {
        matterRef.current.selectedBody.render.lineWidth = 0;
        matterRef.current.selectedBody = null;
        }

        if (clickedBody) {
        clickedBody.render.strokeStyle = "#ffffff";
        clickedBody.render.lineWidth = 3;

        matterRef.current.selectedBody = clickedBody;
        setSelectedBody(clickedBody);
        setAnalyticsData([]);
        } else {
        setSelectedBody(null);
        setAnalyticsData([]);
        }
    };

    Events.on(mouseConstraint, "mousedown", handleMouseDown);

    const handleKeyDown = (event) => {
    const target = event.target;

    const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

    if (isTyping) {
        return;
    }

    if (event.key !== "Delete" && event.key !== "Backspace") {
        return;
    }

    event.preventDefault();

    const selectedBody = matterRef.current.selectedBody;

    if (!selectedBody) {
        return;
    }

    Composite.remove(engine.world, selectedBody);

    matterRef.current.selectedBody = null;
    setSelectedBody(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      Events.off(mouseConstraint, "mousedown", handleMouseDown);
      clearInterval(analyticsInterval);
      window.removeEventListener("keydown", handleKeyDown);

      Render.stop(render);
      Runner.stop(runner);

      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  const updateProperty = (property, value) => {
    const body = matterRef.current.selectedBody;

    if (!body) {
        return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return;
    }

    switch (property) {
        case "mass":
        Matter.Body.setMass(
            body,
            Math.max(0.01, numericValue)
        );
        break;

        case "friction":
        body.friction = Math.max(
            0,
            Math.min(1, numericValue)
        );
        break;

        case "restitution":
        body.restitution = Math.max(
            0,
            Math.min(1, numericValue)
        );
        break;

        case "velocityX":
        Matter.Body.setVelocity(body, {
            x: numericValue,
            y: body.velocity.y,
        });
        break;

        case "velocityY":
        Matter.Body.setVelocity(body, {
            x: body.velocity.x,
            y: numericValue,
        });
        break;

        default:
        return;
    }

    setSelectedBody({
        ...body,
        velocity: {
        x: body.velocity.x,
        y: body.velocity.y,
        },
    });
    };

  // =========================
  // FUNCTIONS EXPOSED TO APP
  // =========================

  useImperativeHandle(ref, () => ({
    addBox() {
      createBox(matterRef);
    },

    addCircle() {
      createCircle(matterRef);
    },

    addSpring() {
        createSpring(matterRef);
    },

    addRope() {
        createRope(matterRef);
    },

    addPivot() {
        createPivot(matterRef);
    },

    reset() {
    const { engine, Composite } = matterRef.current;

    // Remove dynamic objects
    const bodies = Composite.allBodies(engine.world);

    bodies.forEach((body) => {
        if (body.label === "dynamic") {
        Composite.remove(engine.world, body);
        }
    });

    // Remove experiment constraints only
    const constraints = Composite.allConstraints(engine.world);

    constraints.forEach((constraint) => {
        if (
        constraint.label === "spring" ||
        constraint.label === "rope" ||
        constraint.label === "pivot"
        ) {
        Composite.remove(engine.world, constraint);
        }
    });

    // Make absolutely sure mouse constraint is in the world
    const mouseConstraint = matterRef.current.mouseConstraint;

    if (
        mouseConstraint &&
        !Composite.allConstraints(engine.world).includes(mouseConstraint)
    ) {
        Composite.add(engine.world, mouseConstraint);
    }

    // Clear selection
    matterRef.current.selectedBody = null;
    setSelectedBody(null);

    // Add fresh default box
    createBox(matterRef);
    },
  }));

return (
  <div
    style={{
      display: "flex",
      flex: 1,
      minHeight: 0,
      width: "100%",
    }}
  >
    {/* PHYSICS CANVAS */}
    <div
      ref={sceneRef}
      style={{
        width: "75%",
        height: "100%",
        position: "relative",
      }}
    />

    {/* RIGHT SIDEBAR */}
    <div
      style={{
        width: "25%",
        height: "100%",
        overflowY: "auto",
        background: "#1e1e1e",
      }}
    >
      <PropertiesPanel
        body={selectedBody}
        onChange={updateProperty}
      />

      <AnalyticsPanel
        body={selectedBody}
        data={analyticsData}
      />
    </div>
  </div>
);
});

export default PhysicsCanvas;