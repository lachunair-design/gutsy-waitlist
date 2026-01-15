import { useState } from "react";

// Import only the images that exist
import biker from "./assets/images/BIKER2.png";
import meditation from "./assets/images/MEDITATION.png";
import logo from "./assets/images/logo-black.svg";
import jumping from "./assets/images/JUMPING.png";
import runner from "./assets/images/RUNNER2.png";
import vanilla from "./assets/images/VANILLA.png";
import cocoa from "./assets/images/COCOA.png";
import marathon from "./assets/images/MARATHON2 2.png";

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

      {/* FLOATING NAV */}
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

      {/* LAYERED HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-visible">
        <img src={biker} className="absolute top-[12%] -right-10 w-[45vw] md:w-[32vw] rotate-[-5deg] z-20 pointer-events-none drop-shadow-2xl" alt="" />
        <img src={meditation} className="absolute bottom-[5%] -left-10 w-[35vw] md:w-[25vw] rotate-[10deg] z-0 opacity-40 grayscale" alt="" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black mb-12 shadow-sm border border-white tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#f20028] rounded-full animate-ping"></span>
            World's Lightest Peptides
          </div>

          <h1 className="text-[16vw] md:text-[14rem] font-black leading-[0.75] tracking-tighter mb-16 relative">
            <span className="block">PROTEIN</span>
            <span className="block text-transparent italic" style={{ WebkitTextStroke: '2px black' }}>RE-IMAGINED</span>
          </h1>

          <div className="max-w-xl mb-24 relative">
            <p className="text-sm md:text-xl font-bold opacity-60 normal-case mb-12 leading-snug">
              No bloating. No breakouts. Just hydrolyzed pea and rice peptides engineered for zero-latency absorption.
            </p>
            <WaitlistForm />

            <div className="absolute -top-16 -right-12 bg-[#ffb300] p-6 rounded-[2rem] shadow-2xl rotate-12 font-black text-[12px] border-4 border-white animate-bounce-slow">
              {waitlistCount}+ OBSESSIVES
            </div>
          </div>
        </div>
      </section>

      {/* THE REBELLION */}
      <section id="story" className="relative bg-white rounded-[5rem] py-40 px-6 mx-4 -mt-10 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] italic mb-32 text-center">
            THE <span className="text-[#f20028] underline decoration-[#ffb300]">REBELLION.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="aspect-[3/4] rounded-[3rem] bg-[#f3eee4] grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl mb-8 flex items-center justify-center overflow-hidden">
                <img src={jumping} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="font-black text-2xl italic mb-2">01 / THE BREAKING POINT</h3>
              <p className="text-sm font-bold opacity-40 normal-case">I tested 47+ proteins. They all had the same junk: gums and fillers. My gut hated them.</p>
            </div>
            <div className="group md:translate-y-12">
              <div className="aspect-[3/4] rounded-[3rem] shadow-xl mb-8 border-4 border-[#ffb300] flex items-center justify-center overflow-hidden bg-[#f3eee4]">
                <img src={runner} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="font-black text-2xl italic mb-2">02 / WHY WE BUILT THIS</h3>
              <p className="text-sm font-bold opacity-40 normal-case">Perfected over 200 batches for anyone tired of choosing protein over comfort.</p>
            </div>
            <div className="group">
              <div className="aspect-[3/4] rounded-[3rem] shadow-xl mb-8 flex items-center justify-center overflow-hidden bg-black">
                <img src={marathon} className="w-full h-full object-cover opacity-80" alt="" />
              </div>
              <h3 className="font-black text-2xl italic mb-2 text-[#f20028]">03 / WHAT CHANGED</h3>
              <p className="text-sm font-bold opacity-40 normal-case">No bloat. Skin cleared. For the first time, protein was the solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE SECTION */}
      <section id="science" className="py-56 px-6 max-w-7xl mx-auto relative text-center">
        <img src={runner} className="absolute -right-20 top-0 w-[40vw] opacity-10 pointer-events-none" alt="" />
        <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none mb-12 italic uppercase">
          PEPTIDE <span className="text-[#f20028]">LOGIC.</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {['NO STEVIA', 'NO LECITHINS', 'NO GUMS', 'NO FILLERS'].map(item => (
            <div key={item} className="bg-white px-12 py-6 rounded-full border border-black/5 shadow-xl font-black text-[11px] tracking-[0.3em] hover:bg-[#ffb300] transition-colors uppercase">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT MATRIX */}
      <section className="py-40 px-6 max-w-7xl mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group bg-white rounded-[4rem] p-12 shadow-xl relative overflow-hidden">
            <img src={vanilla} className="absolute -left-10 bottom-0 w-64 opacity-10 group-hover:opacity-30 transition-opacity" alt="" />
            <div className="aspect-square bg-[#f3eee4] rounded-[3rem] mb-10 flex items-center justify-center shadow-inner">
              <span className="text-4xl font-black italic opacity-20">VANILLA</span>
            </div>
            <h4 className="text-4xl font-black italic mb-2">VANILLA CALM</h4>
            <p className="text-[10px] font-black opacity-30 tracking-[0.4em]">STRESS-RELIEF / 23G PROTEIN</p>
          </div>
          <div className="group bg-black rounded-[4rem] p-12 shadow-xl relative overflow-hidden">
            <img src={cocoa} className="absolute -right-10 bottom-0 w-64 opacity-10 group-hover:opacity-30 transition-opacity" alt="" />
            <div className="aspect-square bg-[#111] rounded-[3rem] mb-10 flex items-center justify-center">
              <span className="text-4xl font-black italic text-white opacity-20">CACAO</span>
            </div>
            <h4 className="text-4xl font-black italic mb-2 text-[#f20028]">CACAO BOOST</h4>
            <p className="text-[10px] font-black opacity-30 tracking-[0.4em] text-white">ENERGY / 23G PROTEIN</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f20028] py-48 px-6 text-center text-white rounded-t-[6rem] relative overflow-hidden">
        <img src={marathon} className="absolute bottom-0 left-0 w-1/2 opacity-20 pointer-events-none" alt="" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-8xl md:text-[13rem] font-black tracking-tighter leading-[0.8] mb-20 italic uppercase">
            DON'T BE <br/>A STRANGER.
          </h2>
          <WaitlistForm />
          <div className="mt-40">
            <span className="text-[12vw] font-black opacity-10 italic select-none">GUTSY</span>
            <p className="text-[10px] font-black tracking-[1em] opacity-40 mt-12 uppercase">© 2026 DUBAI / BIOTECH / POWER</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
