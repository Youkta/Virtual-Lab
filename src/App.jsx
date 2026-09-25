import "./App.css";
import { useRef } from "react";

import Toolbar from "./components/Toolbar";
import PhysicsCanvas from "./components/PhysicsCanvas";

function App() {
  const physicsRef = useRef(null);

  const addBox = () => {
    physicsRef.current?.addBox();
  };

  const addCircle = () => {
    physicsRef.current?.addCircle();
  };

  const addSpring = () => {
    physicsRef.current?.addSpring();
  };

  const addRope = () => {
    physicsRef.current?.addRope();
  };

  const addPivot = () => {
    physicsRef.current?.addPivot();
  };

  const resetWorld = () => {
    physicsRef.current?.reset();
  };

  return (
    <div className="app">
      <div className="title">Virtual Lab</div>

      <Toolbar
        onAddBox={addBox}
        onAddCircle={addCircle}
        onAddSpring={addSpring}
        onAddRope={addRope}
        onAddPivot={addPivot}
        onReset={resetWorld}
      />

      <PhysicsCanvas ref={physicsRef} />
    </div>
  );
}

export default App;