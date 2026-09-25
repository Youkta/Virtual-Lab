# 🔬 Virtual Lab

> A collaborative, browser-based virtual laboratory for building, simulating, and analyzing interactive physics experiments in real time.

Virtual Lab is a full-stack digital laboratory platform that transforms traditional physics experimentation into an interactive, programmable, and collaborative web environment.

Users can construct experiments on a 2D physics canvas, manipulate physical components and constraints, observe real-time dynamics, analyze simulation data, and collaborate with other users inside shared laboratory rooms.

The platform combines a real-time physics engine, modular experiment components, collaborative simulation infrastructure, experiment persistence, analytics, and an experiment library into a unified virtual laboratory.

## ✨ Features

### 🧪 Interactive Physics Simulation

- Real-time 2D physics simulation powered by **Matter.js**
- Dynamic rigid-body creation and manipulation
- Gravity, mass, density, friction, restitution, velocity, and angular motion
- Collision detection and rigid-body dynamics
- Interactive mouse-based object manipulation
- Persistent walls and ground boundaries
- Resettable and reproducible simulation environments

### ⚙️ Mechanical Components

- **Boxes** — rectangular rigid bodies
- **Circles** — circular rigid bodies
- **Ropes** — distance-based constraints
- **Springs** — elastic constraints for oscillatory systems
- **Pivots** — fixed rotational constraints
- **Motorized Components** — controlled rotational motion
- **Walls & Ground** — permanent simulation boundaries

### 🎛️ Experiment Builder

- Drag-and-drop experiment construction
- Component selection and manipulation
- Real-time property editing
- Configurable physical parameters
- Interactive experiment toolbar
- Component deletion and modification
- Experiment reset and state management

### 📊 Real-Time Analytics

- Live simulation statistics
- Object and component tracking
- Position, velocity, and acceleration data
- Physical parameter monitoring
- Real-time charts and experiment metrics

### 👥 Multi-User Collaboration

- Shared experiment rooms
- Real-time simulation synchronization
- Collaborative experiment manipulation
- Multi-user state updates through Socket.io

### 📚 Experiment Library

- Create and save experiments
- Load and modify existing experiments
- Reusable experiment configurations
- Persistent experiment metadata

### 🤖 Agent Middleware

- Intelligent interaction with the laboratory environment
- Experiment-level command interpretation
- Simulation state interaction
- AI-assisted experiment configuration and analysis

## 🏗️ System Architecture

```text
                         ┌───────────────────────────┐
                         │        React Client       │
                         │                           │
                         │  Experiment UI            │
                         │  Physics Canvas           │
                         │  Toolbar                  │
                         │  Properties Panel         │
                         │  Analytics Dashboard      │
                         └─────────────┬─────────────┘
                                       │
                         ┌─────────────▼─────────────┐
                         │       Matter.js Engine    │
                         │                           │
                         │ Bodies • Forces            │
                         │ Collisions • Constraints  │
                         └─────────────┬─────────────┘
                                       │
                              Real-Time State
                                       │
                         ┌─────────────▼─────────────┐
                         │      Socket.io Layer      │
                         │                           │
                         │ Collaborative Rooms       │
                         │ State Synchronization     │
                         └─────────────┬─────────────┘
                                       │
                         ┌─────────────▼─────────────┐
                         │    Node.js / Express      │
                         │                           │
                         │ REST APIs                 │
                         │ Experiment Services       │
                         │ Agent Middleware           │
                         └─────────────┬─────────────┘
                                       │
                         ┌─────────────▼─────────────┐
                         │         MongoDB           │
                         │                           │
                         │ Users • Rooms             │
                         │ Experiments • Metadata    │
                         └───────────────────────────┘
```
## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, JSX, Tailwind CSS |
| Build Tool | Vite |
| Physics Engine | Matter.js |
| Backend | Node.js, Express.js |
| Real-Time Communication | Socket.io |
| Database | MongoDB |
| Data Visualization | Recharts |
| Version Control | Git, GitHub |
| Code Quality | ESLint |

## 🔬 Physics Architecture

The physics subsystem follows a modular component architecture.

Each physical object or constraint is created, configured, and added to the Matter.js simulation world independently.

```text
Experiment
    │
    ├── Rigid Bodies
    │     ├── Box
    │     └── Circle
    │
    ├── Constraints
    │     ├── Rope
    │     ├── Spring
    │     └── Pivot
    │
    └── Environment
          ├── Ground
          └── Walls

```
## 📈 Analytics Pipeline

```text
Matter.js Simulation
        ↓
Physics State Extraction
        ↓
Real-Time Metrics
        ↓
Analytics Engine
        ↓
Recharts Visualization


### Agent Middleware

```
## 🤖 Agent Middleware

The agent layer provides an abstraction between high-level user instructions and laboratory operations.

```text
User Instruction
       ↓
Agent Middleware
       ↓
Experiment Interpretation
       ↓
Simulation Operation
       ↓
Physics Engine
       ↓
Updated Experiment State


```
## 🧪 Example Experiments

Virtual Lab supports experiments such as:

- Pendulum and rotational motion
- Spring-mass oscillations
- Collision and momentum experiments
- Free-fall and gravitational motion
- Multi-body mechanical systems
- Constraint-based mechanisms
- Coupled spring and rope systems
- Motor-driven rotational systems

Complex experiments can be constructed by combining multiple components and constraints.

---

## 🎯 Design Goals

**Interactive** — Experiments respond immediately to user interaction.

**Modular** — New physical components and experiments can be added independently.

**Collaborative** — Multiple users can work within the same laboratory environment.

**Analytical** — Simulations provide measurable data rather than only visual motion.

---

## 📌 Key Capabilities

- Interactive 2D physics simulation
- Modular mechanical component system
- Real-time collision and constraint dynamics
- Configurable physical properties
- Experiment construction and persistence
- Real-time analytics and visualization
- Multi-user collaborative rooms
- Real-time state synchronisation
- Experiment library
- AI/agent middleware
- Full-stack web architecture

---

## 👩‍💻 Author

**Youkta Mandavkar**  
B.Tech. Electronics & Electrical Engineering  
Indian Institute of Technology Guwahati

---

⭐ **Virtual Lab — Build. Simulate. Analyze. Collaborate.**
