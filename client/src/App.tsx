import { useState } from "react";

// 1. IMPORT ASSETS (Required for Vite in src folder)
import biker from "./assets/images/BIKER2.png";
import meditation from "./assets/images/MEDITATION.png";
import logo from "./assets/images/logo-black.svg";
import squiggle from "./assets/images/Screenshot 2026-01-15 at 11.36.49 am.png";
import story1 from "./assets/images/Screenshot 2026-01-15 at 11.27.16 am.png";
import story2 from "./assets/images/Screenshot 2026-01-15 at 11.26.54 am.png";
import story3 from "./assets/images/Screenshot 2026-01-15 at 11.27.05 am.png";

const WaitlistForm = () => (
  <form className="w-full max-w-lg relative z-30" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col md:flex-row gap-0 bg-white rounded-full shadow-[0_20px_50px_rgba(242,0,40,0.15)] border border-black/5 overflow-hidden focus-within:ring-4 ring-[#f20028]/10 transition-all">
      <input 
        type="email" 
        placeholder="ENTER YOUR EMAIL" 
        className="flex-1 bg-transparent px-10 py-6 font-black text-xs outline-none uppercase tracking-[0.2em] placeholder:text-black/20"
      />
      <button className="bg-[#f20028] text-white px-10 py-6 font-black text-[11px] tracking-[0.2em] hover:bg-black transition-colors uppercase">
        JOIN THE REBELLION
      </button>
    </div>
  </form>
);

export default function App() {
  const [waitlistCount] = useState(128);

  return (
    <div className="min-h-screen bg-[#f3eee4] text-black font-gutsy selection:bg-[#f20028] selection:text-white antialiased overflow-x-hidden uppercase">
      
      {/* 2. FLOATING NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl bg-white/70 backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 flex justify-between items-center shadow-xl">
        <div className="h-8 md:h-10">
          <img src={logo} alt="GUTSY" className="h-full w-auto object-contain" />
        </div>
        <div className="hidden md:flex gap-10 text-[9px] font-black tracking-[0.2em]">
          <a href="#story" className="hover:text-[#f20028] transition-colors">THE REBELLION</a>
          <a href="#science" className="hover:text-[#f20028] transition-colors">THE SCIENCE</a>
        </div>
        <button className="bg-black text-white px-8 py-2.5 rounded-full text-[10px] font-black hover:bg-[#f20028] transition-all">JOIN</button>
      </nav>

      {/* 3. LAYERED HERO (Unwell Style) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-visible">
        {/* Illustrations as Kinetic Stickers */}
        <img src={biker} className="absolute top-[12%] -right-10 w-[45vw] md:w-[32vw] rotate-[-5deg] z-20 pointer-events-none drop-shadow-2xl" alt="" />
        <img src={meditation} className="absolute bottom-[5%] -left-10 w-[35vw] md:w-[25vw] rotate-[10deg] z-0 opacity-40 grayscale" alt="" />
        <img src={squiggle} className="absolute top-[20%] left-[15%] w-16 rotate-12 opacity-60" alt="" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black mb-12 shadow-sm border border-white tracking-widest">
             <span className="w-1.5 h-1.5 bg-[#f20028] rounded-full animate-ping"></span>
             World's Lightest Peptides
          </div>
          
          <h1 className="text-[16vw] md:text-[14rem] font-black leading-[0.75] tracking-tightest mb-16 relative">
            <span className="block">PROTEIN</span>
            <span className="block text-transparent italic [webkit-text-stroke:2px_black] md:[webkit-text-stroke:3px_black]">RE-IMAGINED</span>
          </h1>

          <div className="max-w-xl mb-24 relative">
             <p className="text-sm md:text-xl font-bold opacity-60 normal-case mb-12 leading-snug">
               No bloating. No breakouts. Just hydrolyzed pea and rice peptides engineered for zero-latency absorption.
             </p>
             <WaitlistForm />
             
             {/* Unwell floating pill badge */}
             <div className="absolute -top-16 -right-12 bg-[#ffb300] p-6 rounded-[2rem] shadow-2xl rotate-12 font-black text-[12px] border-4 border-white animate-bounce-slow">
               {waitlistCount}+ OBSESSIVES
             </div>
          </div>
        </div>
      </section>

      {/* 4. THE REBELLION (Bento Chapters) */}
      <section id="story" className="relative bg-white rounded-[5rem] py-40 px-6 mx-4 -mt-10 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tightest leading-[0.85] italic mb-32 text-center">THE <span className="text-[#f20028] underline decoration-[#ffb300]">REBELLION.</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <img src={story2} className="aspect-[3/4] rounded-[3rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl mb-8" alt="" />
              <h3 className="font-black text-2xl italic mb-2">01 / THE BREAKING POINT</h3>
              <p className="text-sm font-bold opacity-40 normal-case">I tested 47+ proteins. They all had the same junk: gums and fillers. My gut hated them.</p>
            </div>
            <div className="group md:translate-y-12">
              <img src={story3} className="aspect-[3/4] rounded-[3rem] object-cover shadow-xl mb-8 border-4 border-[#ffb300]" alt="" />
              <h3 className="font-black text-2xl italic mb-2">02 / WHY WE BUILT THIS</h3>
              <p className="text-sm font-bold opacity-40 normal-case">Perfected over 200 batches for anyone tired of choosing protein over comfort.</p>
            </div>
            <div className="group">
              <img src={story1} className="aspect-[3/4] rounded-[3rem] object-cover shadow-xl mb-8" alt="" />
              <h3 className="font-black text-2xl italic mb-2 text-[#f20028]">03 / WHAT CHANGED</h3>
              <p className="text-sm font-bold opacity-40 normal-case">No bloat. Skin cleared. For the first time, protein was the solution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
