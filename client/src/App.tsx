import { useState } from "react";
import { WaitlistForm } from "./components/WaitlistForm";

export default function App() {
  const [waitlistCount] = useState(128);

  return (
    <div className="min-h-screen bg-[#f3eee4] text-black font-gutsy selection:bg-[#f20028] selection:text-white antialiased overflow-x-hidden">
      
      {/* 1. GLASSMORPHIC NAV (Inspired by Unwell) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl bg-white/70 backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 flex justify-between items-center shadow-xl">
        <div className="h-8">
          <img src="/assets/logo-black.svg" alt="GUTSY" className="h-full italic font-black" />
        </div>
        <div className="hidden md:flex gap-10 text-[9px] font-black tracking-[0.2em] uppercase">
          <a href="#rebellion" className="hover:text-[#f20028] transition-colors">THE REBELLION</a>
          <a href="#science" className="hover:text-[#f20028] transition-colors">THE SCIENCE</a>
        </div>
        <button className="bg-[#f20028] text-white px-8 py-2.5 rounded-full text-[10px] font-black hover:scale-105 transition-transform uppercase">
          JOIN
        </button>
      </nav>

      {/* 2. THE FLUID HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
        {/* Biker Illustration - Breaking the edge */}
        <img src="/assets/BIKER2.png" className="absolute -right-20 top-1/4 w-[40vw] opacity-10 md:opacity-100 pointer-events-none" alt="" />
        
        <div className="z-10 text-center w-full max-w-7xl uppercase">
          <div className="inline-block bg-[#ffb300] text-black px-4 py-1.5 rounded-full text-[10px] font-black mb-8 tracking-widest shadow-sm">
            WORLD'S LIGHTEST PEPTIDES
          </div>
          
          <h1 className="text-[14vw] md:text-[12rem] font-black leading-[0.8] tracking-tightest mb-10">
            PROTEIN <br /> <span className="text-[#f20028]">RE-IMAGINED</span>
          </h1>

          <div className="w-full max-w-md mx-auto relative mt-12">
            <WaitlistForm />
            <div className="absolute -top-12 -right-12 bg-black text-[#ffb300] px-5 py-4 rounded-3xl font-black text-[11px] rotate-6 shadow-2xl animate-bounce-slow">
              {waitlistCount}+ JOINED
            </div>
          </div>
        </div>
        
        <img src="/assets/MEDITATION.png" className="absolute -left-10 bottom-10 w-48 opacity-20" alt="" />
      </section>

      {/* 3. THE REBELLION (FOUNDER STORY - CHAPTERS) */}
      <section id="rebellion" className="py-32 px-6 bg-white rounded-[4rem] mx-4 my-10 shadow-2xl overflow-hidden relative">
        <div className="max-w-6xl mx-auto uppercase">
          <div className="flex flex-col items-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tightest leading-none">THE <span className="text-[#f20028]">REBELLION.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* CHAPTER 1 */}
            <div className="group">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-[3rem] overflow-hidden mb-8 relative">
                <img src="/assets/story-2.jpg" className="w-full h-full object-cover grayscale" alt="The Struggle" />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-[8px]">47+ PROTEINS TESTED</div>
              </div>
              <h3 className="font-black text-xl italic mb-4">01 / THE BREAKING POINT</h3>
              <p className="text-sm font-bold opacity-60 normal-case">I tested everything. Bloating, breakouts, and "chalk sludge" everywhere. My gut hated the status quo.</p>
            </div>

            {/* CHAPTER 2 */}
            <div className="group md:translate-y-12">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-[3rem] overflow-hidden mb-8 border-4 border-[#ffb300] relative">
                <img src="/assets/story-3.jpg" className="w-full h-full object-cover" alt="The Purpose" />
                <img src="/assets/JUMPING.png" className="absolute -right-4 top-1/2 w-32 -rotate-12" alt="" />
              </div>
              <h3 className="font-black text-xl italic mb-4">02 / WHY WE BUILT THIS</h3>
              <p className="text-sm font-bold opacity-60 normal-case">My husband Sujith and I tested for months. 200 batches later: protein that actually fuels without fighting back.</p>
            </div>

            {/* CHAPTER 3 */}
            <div className="group">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-[3rem] overflow-hidden mb-8 relative">
                <img src="/assets/story-1.jpg" className="w-full h-full object-cover" alt="The Result" />
                <div className="absolute bottom-4 left-4 bg-[#f20028] text-white px-3 py-1 rounded-full text-[8px]">O BLOAT. O BREAKOUTS.</div>
              </div>
              <h3 className="font-black text-xl italic mb-4 text-[#f20028]">03 / WHAT CHANGED</h3>
              <p className="text-sm font-bold opacity-60 normal-case">Clear skin. Steady energy. No apologies. For the first time, protein was the solution, not the problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCIENCE SECTION (PEPTIDE LOGIC) */}
      <section id="science" className="py-40 px-6 max-w-7xl mx-auto relative uppercase">
        <img src="/assets/RUNNER2.png" className="absolute right-0 top-0 w-64 opacity-10" alt="" />
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tightest">PEPTIDE <span className="text-[#f20028]">LOGIC.</span></h2>
          <p className="max-w-2xl mx-auto font-bold opacity-50 normal-case">Hydrolyzed pea and rice protein. Pre-broken down so your gut doesn't have to do the heavy lifting. Instant absorption. Zero latency.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['NO STEVIA', 'NO LECITHINS', 'NO GUMS', 'NO FILLERS'].map(item => (
            <div key={item} className="bg-white rounded-full py-12 px-4 border border-black/5 text-center shadow-sm">
              <span className="text-[10px] font-black tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT MATRIX */}
      <section className="py-40 px-6 max-w-7xl mx-auto uppercase">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* VANILLA CALM */}
          <div className="group bg-white rounded-[4rem] p-10 shadow-premium relative overflow-hidden">
            <img src="/assets/VANILLA.png" className="absolute -left-10 -bottom-10 w-48 opacity-10 group-hover:opacity-100 transition-opacity" alt="" />
            <div className="aspect-square bg-[#f3eee4] rounded-[3rem] mb-10 flex items-center justify-center">
              <img src="/assets/vanilla-tub.png" className="w-2/3 h-auto" alt="Vanilla Calm" />
            </div>
            <h4 className="text-4xl font-black italic mb-2 tracking-tight">VANILLA CALM</h4>
            <p className="text-[10px] font-black opacity-30 tracking-widest mb-8">STRESS-RELIEF + 23G PROTEIN</p>
          </div>

          {/* CACAO BOOST */}
          <div className="group bg-white rounded-[4rem] p-10 shadow-premium relative overflow-hidden">
            <img src="/assets/COCOA.png" className="absolute -right-10 -bottom-10 w-48 opacity-10 group-hover:opacity-100 transition-opacity" alt="" />
            <div className="aspect-square bg-[#f8d7da] rounded-[3rem] mb-10 flex items-center justify-center">
              <img src="/assets/cacao-tub.png" className="w-2/3 h-auto" alt="Cacao Boost" />
            </div>
            <h4 className="text-4xl font-black italic mb-2 tracking-tight text-[#f20028]">CACAO BOOST</h4>
            <p className="text-[10px] font-black opacity-30 tracking-widest mb-8">ENERGY + 23G PROTEIN</p>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION FOOTER */}
      <footer className="bg-black py-40 px-6 text-center text-white rounded-t-[5rem] uppercase relative overflow-hidden">
        <img src="/assets/MARATHON2 2.png" className="absolute bottom-0 left-0 w-1/3 opacity-20" alt="" />
        <h2 className="text-7xl md:text-[11rem] font-black tracking-tightest leading-[0.85] mb-20 italic">DON'T BE <br/>A STRANGER.</h2>
        <div className="w-full max-w-md mx-auto">
          <WaitlistForm />
        </div>
        <p className="text-[10px] font-black tracking-[0.6em] mt-24 opacity-20">© 2026 DUBAI / BIOTECH / POWER</p>
      </footer>
    </div>
  );
}
