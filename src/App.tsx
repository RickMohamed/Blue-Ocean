/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Rules from './components/Rules';
import About from './components/About';
import Classes from './components/Classes';
import Team from './components/Team';
import Join from './components/Join';
import OceanScene from './components/OceanScene';
import PhysicsOverlay from './components/PhysicsOverlay';
// import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#000510] text-white overflow-x-hidden relative selection:bg-cyan-500/30">
      {/* <CustomCursor /> */}
      <PhysicsOverlay />
      <OceanScene />
      
      {/* Static Background Fallback (Lower opacity for blending) */}
      {/* <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-[#000510] to-[#000000] opacity-30 pointer-events-none" /> */}

      <div className="relative z-10">
        <Hero />
        <Rules />
        <About />
        <Classes />
        <Team />
        <Join />
      </div>
    </div>
  );
}
