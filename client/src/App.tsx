import { useState } from "react";

const WaitlistForm = () => (
  <form className="w-full max-w-lg relative group" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col md:flex-row gap-0 bg-white rounded-full shadow-[0_20px_50px_rgba(242,0,40,0.1)] border border-black/5 overflow-hidden focus-within:ring-2 ring-gutsyRed/20 transition-all">
      <input
        type="email"
        placeholder="ENTER YOUR EMAIL"
        className="flex-1 bg-transparent px-8 py-6 font-black text-xs outline-none uppercase tracking-[0.2em] placeholder:text-black/20"
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

      {/* 1. KINETIC NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl bg-white/40 backdrop-blur-2xl rounded-3xl px-10 py-5 flex justify-between items-center border border-white/20 shadow-2xl">
        <img src="/assets/logo-black.svg" className="h-8 md:h-10" alt="GUTSY" />
        <div className="hidden md:flex gap-12 text-[10px] font-black tracking-[0.3em]">
          <a href="#story" className="hover:text-[#f20028] transition-colors">THE WHY</a>
          <a href="#science" className="hover:text-[#f20028] transition-colors">THE TECH</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#join" className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black hover:bg-[#f20028] transition-all">GET ACCESS</a>
        </div>
      </nav>

      {/* 2. LAYERED HERO (UNWELL STYLE) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-visible">
        {/* Illustrations as Kinetic Stickers */}
        <img src="/assets/BIKER2.png" className="absolute top-[10%] -right-10 w-[45vw] md:w-[32vw] rotate-[-5deg] z-20 pointer-events-none drop-shadow-2xl" alt="" />
        <img src="/assets/MEDITATION.png" className="absolute bottom-[5%] -left-10 w-[35vw] md:w-[25vw] rotate-[10deg] z-0 opacity-40 grayscale" alt="" />

        {/* Floating Squiggle Asset */}
        <img src="/assets/Screenshot 2026-01-15 at 11.36.49 am.png" className="absolute top-[20%] left-[15%] w-16 rotate-12 opacity-60" alt="" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black mb-12 shadow-sm border border-white tracking-widest">
             <span className="w-1.5 h-1.5 bg-[#f20028] rounded-full animate-ping"></span>
             World's Lightest Peptides
          </div>

          <h1 className="text-[15vw] md:text-[13rem] font-black leading-[0.75] tracking-tightest mb-16 relative">
            <span className="block">PROTEIN</span>
            <span className="block text-transparent italic [-webkit-text-stroke:2px_black]">RE-IMAGINED</span>
          </h1>

          <div className="max-w-xl mb-24 relative">
             <p className="text-sm md:text-xl font-bold opacity-60 normal-case mb-12 leading-snug">
               No bloating. No breakouts. Just hydrolyzed pea and rice peptides engineered for zero-latency absorption.
             </p>
             <WaitlistForm />

             {/* Floating Social Proof Pill */}
             <div className="absolute -top-16 -right-12 bg-[#ffb300] p-6 rounded-[2rem] shadow-2xl rotate-12 font-black text-[12px] border-4 border-white animate-bounce-slow">
               {waitlistCount}+ OBSESSIVES
             </div>
          </div>
        </div>
      </section>

      {/* 3. THE REBELLION (BENTO STORY) */}
      <section id="story" className="relative bg-white rounded-[5rem] py-40 px-6 mx-4 -mt-10 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative">
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tightest leading-[0.85] italic mb-10 uppercase">THE <br/><span className="text-[#f20028] underline decoration-[#ffb300]">REBELLION.</span></h2>
              <p className="text-2xl font-black leading-tight max-w-md uppercase">Tested 47+ proteins. Bloating after every shake. Breakouts. We rebuilt it from the gut up.</p>
            </div>
            <div className="relative group">
               {/* Chapter 2 Image */}
               <img src="/assets/Screenshot 2026-01-15 at 11.26.54 am.png" className="rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="The Breaking Point" />
               <img src="/assets/JUMPING.png" className="absolute -bottom-20 -right-10 w-64 z-40 drop-shadow-2xl" alt="" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Chapter 3 */}
            <div className="bg-[#f3eee4] rounded-[4rem] p-12 flex flex-col justify-between">
               <img src="/assets/Screenshot 2026-01-15 at 11.27.05 am.png" className="w-full h-80 object-cover rounded-[3rem] mb-10" alt="Why We Built This" />
               <div>
                 <h3 className="text-3xl font-black italic mb-4 uppercase">WHY WE BUILT THIS</h3>
                 <p className="text-sm font-bold opacity-40 normal-case">Formula perfected over 200 batches for anyone tired of choosing protein over comfort.</p>
               </div>
            </div>
            {/* Chapter 1 */}
            <div className="bg-black text-white rounded-[4rem] p-12 flex flex-col justify-between">
               <div className="flex justify-between items-start mb-10 uppercase">
                 <h3 className="text-3xl font-black italic">THE RESULT</h3>
                 <span className="bg-[#f20028] px-4 py-1 rounded-full text-[9px] font-black tracking-widest">0 BLOAT</span>
               </div>
               <img src="/assets/Screenshot 2026-01-15 at 11.27.16 am.png" className="w-full h-80 object-cover rounded-[3rem] mb-8" alt="What Changed" />
               <p className="text-sm font-bold opacity-60 normal-case">Clear skin. Steady energy. For the first time, protein was the solution, not the problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCIENCE (PEPTIDE LOGIC) */}
      <section id="science" className="py-56 px-6 max-w-7xl mx-auto relative text-center">
        <img src="/assets/RUNNER2.png" className="absolute -right-20 top-0 w-[40vw] opacity-10 pointer-events-none" alt="" />
        <h2 className="text-6xl md:text-[9rem] font-black tracking-tightest leading-none mb-12 italic uppercase">PEPTIDE <span className="text-[#f20028]">LOGIC.</span></h2>
        <div className="flex flex-wrap justify-center gap-6">
           {['NO STEVIA', 'NO LECITHINS', 'NO GUMS', 'NO FILLERS'].map(item => (
             <div key={item} className="bg-white px-12 py-6 rounded-full border border-black/5 shadow-xl font-black text-[11px] tracking-[0.3em] hover:bg-[#ffb300] transition-colors uppercase">
               {item}
             </div>
           ))}
        </div>
      </section>

      {/* 5. PRODUCT MATRIX */}
      <section className="py-40 px-6 max-w-7xl mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group bg-white rounded-[4rem] p-12 shadow-premium relative overflow-hidden">
            <img src="/assets/VANILLA.png" className="absolute -left-10 bottom-0 w-64 opacity-10 group-hover:opacity-100 transition-opacity" alt="" />
            <div className="aspect-square bg-[#f3eee4] rounded-[3rem] mb-10 flex items-center justify-center shadow-inner">
               <img src="/assets/Screenshot 2026-01-15 at 10.49.52 am.png" className="w-2/3 h-auto grayscale hover:grayscale-0 transition-all" alt="Vanilla Calm" />
            </div>
            <h4 className="text-4xl font-black italic mb-2">VANILLA CALM</h4>
            <p className="text-[10px] font-black opacity-30 tracking-[0.4em]">STRESS-RELIEF / 23G PROTEIN</p>
          </div>
          <div className="group bg-black rounded-[4rem] p-12 shadow-premium relative overflow-hidden">
            <img src="/assets/COCOA.png" className="absolute -right-10 bottom-0 w-64 opacity-10 group-hover:opacity-100 transition-opacity" alt="" />
            <div className="aspect-square bg-[#111] rounded-[3rem] mb-10 flex items-center justify-center">
               <img src="/assets/Screenshot 2026-01-15 at 10.49.52 am.png" className="w-2/3 h-auto" alt="Cacao Boost" />
            </div>
            <h4 className="text-4xl font-black italic mb-2 text-[#f20028]">CACAO BOOST</h4>
            <p className="text-[10px] font-black opacity-30 tracking-[0.4em] text-white">ENERGY / 23G PROTEIN</p>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="join" className="bg-[#f20028] py-48 px-6 text-center text-white rounded-t-[6rem] relative overflow-hidden">
        <img src="/assets/MARATHON2 2.png" className="absolute bottom-0 left-0 w-1/2 opacity-20 pointer-events-none" alt="" />
        <div className="relative z-10 flex flex-col items-center">
           <h2 className="text-8xl md:text-[13rem] font-black tracking-tightest leading-[0.8] mb-20 italic uppercase">DON'T BE <br/>A STRANGER.</h2>
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
