import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function PhysicsOverlay() {
  const [active, setActive] = useState(false);
  const engineRef = useRef<Matter.Engine>(null);
  const runnerRef = useRef<Matter.Runner>(null);
  const renderRef = useRef<Matter.Render>(null);

  useEffect(() => {
    // Wait a bit for layout to settle
    const timer = setTimeout(() => {
      setActive(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!active) return;

    // 1. Setup Matter.js
    const engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.y = 0; // Zero gravity for "Antigravity"
    engine.gravity.x = 0;

    engineRef.current = engine;

    // 2. Select elements to physics-ify
    // We target specific interactive/visible elements to keep it performant
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'span', 'p', 
      'button', 'img', 'a', 
      '.rounded-2xl', // Cards
      '.rounded-full' // Circles/Buttons
    ];
    
    const elements = document.querySelectorAll(selectors.join(','));
    const bodies: { body: Matter.Body; elem: HTMLElement }[] = [];

    // 3. Create bodies and lock DOM elements
    elements.forEach((elem) => {
      const el = elem as HTMLElement;
      
      // Skip if already processed or hidden
      if (el.dataset.physics || el.offsetParent === null) return;
      
      // Skip the ocean canvas and background
      if (el.tagName === 'CANVAS' || el.classList.contains('fixed')) return;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Create physics body
      const body = Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.9, // Bouncy
          friction: 0.1,
          frictionAir: 0.02,
          density: 0.001,
          render: { opacity: 0 } // Invisible physics body
        }
      );

      // Apply initial velocity for "drift"
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      });

      // Apply random rotation
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      bodies.push({ body, elem: el });
      el.dataset.physics = "true";
    });

    // 4. Lock DOM dimensions and position
    bodies.forEach(({ elem, body }) => {
      const rect = elem.getBoundingClientRect();
      
      // Freeze dimensions
      elem.style.width = `${rect.width}px`;
      elem.style.height = `${rect.height}px`;
      elem.style.position = 'fixed';
      elem.style.left = '0';
      elem.style.top = '0';
      elem.style.margin = '0';
      elem.style.transformOrigin = 'center center';
      elem.style.zIndex = '100';
      
      // Initial transform
      elem.style.transform = `translate(${body.position.x - rect.width/2}px, ${body.position.y - rect.height/2}px)`;
    });

    Matter.Composite.add(world, bodies.map(b => b.body));

    // 5. Add Walls (so they don't fly off screen immediately)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions), // Top
      Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions), // Bottom
      Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions), // Left
      Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions) // Right
    ];
    Matter.Composite.add(world, walls);

    // 6. Mouse Interaction
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.Composite.add(world, mouseConstraint);

    // 7. Render Loop
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const updateLoop = () => {
      bodies.forEach(({ body, elem }) => {
        const x = body.position.x - parseFloat(elem.style.width) / 2;
        const y = body.position.y - parseFloat(elem.style.height) / 2;
        const angle = body.angle;
        
        elem.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
      });
    };

    Matter.Events.on(engine, 'afterUpdate', updateLoop);
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      // We don't revert DOM changes because it's a one-way trip to chaos
    };
  }, [active]);

  if (!active) return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={() => setActive(true)}
        className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 px-6 py-3 rounded-full backdrop-blur-md border border-cyan-500/30 transition-all uppercase tracking-widest text-xs"
      >
        Activate Zero-G
      </button>
    </div>
  );

  return null;
}
