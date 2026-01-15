import { useState } from "react";

const WaitlistForm = () => (
  <form className="w-full max-w-md mx-auto relative z-20 group" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-[2rem] shadow-2xl border border-black/5 group-focus-within:border-gutsyRed transition-all">
      <input 
        type="email" 
        placeholder="ENTER YOUR EMAIL" 
        className="flex-1 bg-transparent px-6 py-3 font-black text-xs outline-none uppercase tracking-widest placeholder:text-black/20"
      />
      <button className="bg-[#f20028] text-white px-10 py-5 rounded-full font-black text-[10px] tracking-[0.2em] hover:scale-105 transition-transform uppercase shadow-lg">
        Get Priority Access
      </button>
    </div>
  </form>
);

export default function App() {
  const [waitlistCount] = useState(128);

  return (
    <div className="min-h-screen bg-[#f3eee4] text-black font-gutsy selection:bg-[#f20028] selection:text-white antialiased overflow-x-hidden uppercase">
      
      {/* 1. UNWELL-STYLE NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl bg-white/80 backdrop-blur-3xl rounded-full px-10 py-4 flex justify-between items-center shadow-premium border border-white/40">
        <span className="text-3xl font-black italic tracking-tightest">GUTSY</span>
        <div className="hidden md:flex gap-12 text-[10px] font-black tracking-[0.3em]">
          <a href="#rebellion" className="hover:text-[#f20028] transition-colors">THE REBELLION</a>
          <a href="#science" className="hover:text-[#f20028] transition-colors">THE SCIENCE</a>
        </div>
        <a href="#join" className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black hover:bg-[#f20028] transition-all">JOIN</a>
      </nav>

      {/* 2. OVERLAPPING HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6">
        {/* Illustrations as Kinetic Stickers */}
        <img src="/assets/BIKER2.png" className="absolute top-[15%] -right-20 w-[45vw] md:w-[35vw] rotate-[-8deg] z-20 pointer-events-none drop-shadow-2xl" alt="" />
        <img src="/assets/MEDITATION.png" className="absolute bottom-[10%] -left-12 w-[35vw] md:w-[22vw] rotate-[12deg] z-20 opacity-90 drop-shadow-xl" alt="" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black mb-12 shadow-sm border border-white">
             <span className="w-2 h-2 bg-[#f20028] rounded-full animate-pulse"></span>
             WORLD'S LIGHTEST PEPTIDES
          </div>
          
          <h1 className="text-[16vw] md:text-[14rem] font-black leading-[0.75] tracking-tightest mb-16 relative select-none">
            <span className="block">PROTEIN</span>
            <span className="block text-[#f3eee4] [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]">RE-IMAGINED</span>
          </h1>

          <div className="max-w-xl mb-20 relative">
             <p className="text-sm md:text-lg font-bold opacity-60 normal-case mb-12 leading-relaxed">
               No bloating. No breakouts. Just hydrolyzed pea and rice peptides engineered for immediate systemic fuel.
             </p>
             <WaitlistForm />
             
             {/* Unwell floating pill badge */}
             <div className="absolute -top-16 -right-12 bg-[#ffb300] p-5 rounded-3xl shadow-2xl rotate-12 font-black text-[11px] animate-bounce-slow border-2 border-black">
               {waitlistCount}+ OBSESSIVES JOINED
             </div>
          </div>
        </div>
      </section>

      {/* 3. KINETIC MARQUEE */}
      <div className="bg-black text-white py-10 overflow-hidden flex transform -rotate-2 scale-110 z-30 relative shadow-2xl">
        <div className="animate-marquee whitespace-nowrap flex gap-16 font-black text-4xl italic">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex gap-16 items-center">
              <span>BORN IN DUBAI</span> <span className="text-[#f20028] text-5xl">/</span>
              <span>HYDROLYZED PEPTIDES</span> <span className="text-[#f20028] text-5xl">/</span>
              <span>ZERO BLOAT</span> <span className="text-[#f20028] text-5xl">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. THE REBELLION (EDITORIAL CHAPTERS) */}
      <section id="rebellion" className="relative bg-white rounded-[5rem] py-40 px-6 mx-4 -mt-10 z-20 shadow-premium">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-32">
             <h2 className="text-[12vw] font-black tracking-tightest leading-none italic mb-4">THE <span className="text-[#f20028]">REBELLION.</span></h2>
             <p className="text-xs font-black tracking-[0.5em] opacity-30">47+ PROTEINS TESTED. 1 SOLUTION.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* CHAPTER 1 */}
            <div className="group relative">
               <div className="aspect-[3/4] rounded-[4rem] overflow-hidden mb-10 shadow-2xl relative bg-[#f3eee4]">
                  <img src="/assets/story-2.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                  <div className="absolute top-8 right-8 bg-[#ffb300] px-4 py-2 rounded-full text-[9px] font-black shadow-lg">CHAPTER 01</div>
               </div>
               <h3 className="font-black text-2xl italic mb-4">THE BREAKING POINT</h3>
               <p className="text-sm font-bold opacity-40 normal-case leading-relaxed">Bloating after every shake. Breakouts. I was training hard, but my gut was fighting back.</p>
            </div>

            {/* CHAPTER 2 */}
            <div className="group relative md:translate-y-20">
               <div className="aspect-[3/4] rounded-[4rem] overflow-hidden mb-10 shadow-2xl relative bg-[#f3eee4] border-4 border-[#f20028]">
                  <img src="/assets/story-3.jpg" className="w-full h-full object-cover" alt="" />
                  <img src="/assets/JUMPING.png" className="absolute -bottom-10 -right-10 w-48 drop-shadow-2xl z-20" alt="" />
               </div>
               <h3 className="font-black text-2xl italic mb-4">WHY WE BUILT THIS</h3>
               <p className="text-sm font-bold opacity-40 normal-case leading-relaxed">Sujith and I spent months perfecting the tech. Peptides that pass the stomach without a fight.</p>
            </div>

            {/* CHAPTER 3 */}
            <div className="group relative">
               <div className="aspect-[3/4] rounded-[4rem] overflow-hidden mb-10 shadow-2xl relative bg-[#f3eee4]">
                  <img src="/assets/story-1.jpg" className="w-full h-full object-cover" alt="" />
                  <div className="absolute bottom-8 left-8 bg-black text-white px-4 py-2 rounded-full text-[9px] font-black shadow-lg uppercase">The Result</div>
               </div>
               <h3 className="font-black text-2xl italic mb-4 text-[#f20028]">WHAT CHANGED</h3>
               <p className="text-sm font-bold opacity-40 normal-case leading-relaxed">Clear skin. Steady energy. For the first time, protein was the solution, not the problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCIENCE (PEPTIDE LOGIC) */}
      <section id="science" className="py-56 px-6 max-w-7xl mx-auto relative overflow-visible">
        <img src="/assets/RUNNER2.png" className="absolute -right-10 top-0 w-[35vw] opacity-20 rotate-[-12deg] pointer-events-none" alt="" />
        <div className="text-center relative z-10">
          <h2 className="text-5xl md:text-[9rem] font-black mb-12 italic tracking-tightest leading-none">PEPTIDE <span className="text-[#f20028]">LOGIC.</span></h2>
          <p className="max-w-3xl mx-auto font-bold opacity-50 normal-case text-xl leading-snug">Hydrolyzed pea and rice protein. Pre-digested by enzymes so your body doesn't have to work overtime. Instant systemic fuel. Zero latency absorption.</p>
        </div>
      </section>
      
      
      {/* 6. THE CLOSER */}
      <footer id="join" className="bg-[#f20028] py-56 px-6 text-center text-[#f3eee4] rounded-t-[6rem] relative overflow-hidden mt-20">
        <img src="/assets/MARATHON2 2.png" className="absolute bottom-0 left-0 w-1/2 opacity-30 pointer-events-none" alt="" />
        <div className="relative z-10">
           <h2 className="text-8xl md:text-[13rem] font-black tracking-tightest leading-[0.8] mb-24 italic">DON'T BE <br/>A STRANGER.</h2>
           <WaitlistForm />
           <div className="mt-40 flex flex-col items-center">
              <span className="text-[12vw] font-black opacity-10 italic select-none">GUTSY</span>
              <p className="text-[11px] font-black tracking-[1em] opacity-40 mt-12">© 2026 DUBAI / BIOTECH / POWER</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
