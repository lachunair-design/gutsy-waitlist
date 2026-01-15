import { useState } from "react";

// Inline Form to ensure zero-latency loading and conversion
const WaitlistForm = () => (
  <form className="w-full group" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col gap-4">
      <input 
        type="email" 
        placeholder="ENTER YOUR EMAIL" 
        className="w-full bg-transparent border-b-2 border-black/10 py-5 font-gutsy font-black tracking-[0.2em] outline-none focus:border-gutsyRed transition-all placeholder:text-black/20 text-sm"
      />
      <button className="w-full bg-[#f20028] text-white py-5 rounded-full font-black text-[11px] tracking-[0.3em] hover:scale-[1.02] transition-transform shadow-pill uppercase">
        Get Priority Access
      </button>
    </div>
  </form>
);

export default function App() {
  const [waitlistCount] = useState(128);

  return (
    <div className="min-h-screen bg-[#f3eee4] text-black font-gutsy selection:bg-[#f20028] selection:text-white antialiased overflow-x-hidden uppercase">
      
      {/* 1. GLASSMORPHIC NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl bg-white/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex justify-between items-center shadow-premium">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black italic tracking-tightest">GUTSY</span>
          <span className="hidden md:block text-[8px] font-black opacity-30 tracking-[0.4em] ml-4">DUBAI / 2026</span>
        </div>
        <div className="hidden md:flex gap-10 text-[9px] font-black tracking-[0.2em]">
          <a href="#story" className="hover:text-[#f20028] transition-colors">THE STORY</a>
          <a href="#science" className="hover:text-[#f20028] transition-colors">THE SCIENCE</a>
        </div>
        <a href="#join" className="bg-black text-white px-6 py-2 rounded-full text-[9px] font-black hover:bg-[#f20028] transition-colors">JOIN</a>
      </nav>

      {/* 2. KINETIC HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20">
        <div className="z-10 text-center w-full max-w-7xl">
          <div className="inline-flex items-center gap-2 bg-[#ffb300] text-black px-4 py-1.5 rounded-full text-[10px] font-black mb-8 tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
            World's Lightest Peptides
          </div>
          
          <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.8] tracking-tightest mb-10">
            PROTEIN <br /> <span className="text-[#f20028]">RE-IMAGINED</span>
          </h1>

          <p className="text-base md:text-xl font-bold max-w-2xl mx-auto leading-relaxed opacity-60 mb-14 normal-case">
            No bloating. No breakouts. Just hydrolyzed pea and rice peptides engineered for immediate absorption.
          </p>

          <div className="w-full max-w-md mx-auto relative group">
            <WaitlistForm />
            <div className="absolute -top-12 -right-8 bg-black text-[#ffb300] px-5 py-4 rounded-3xl font-black text-[11px] rotate-6 shadow-pill animate-bounce-slow">
              {waitlistCount}+ JOINED
            </div>
          </div>
        </div>
        
        {/* Ambient Depth */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f20028]/5 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* 3. THE REBELLION (FOUNDER STORY) */}
      <section id="story" className="py-32 px-6 bg-white rounded-5xl mx-4 my-10 shadow-premium">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tightest mb-4">THE <span className="text-[#f20028]">REBELLION.</span></h2>
            <p className="text-xs font-black tracking-[0.3em] opacity-30">From Pain to Purpose</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-4xl overflow-hidden relative shadow-inner">
                 <img src="/assets/story/story-chapter-2.jpg" className="w-full h-full object-cover grayscale" alt="The Struggle" />
              </div>
              <h3 className="font-black text-xl italic tracking-tighter">01 / The Breaking Point</h3>
              <p className="text-sm font-bold opacity-60 leading-relaxed normal-case">Tested 47+ proteins. Bloating after every shake. Breakouts. The "junk" in the ingredients was the problem.</p>
            </div>

            <div className="space-y-6 md:translate-y-12">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-4xl overflow-hidden relative shadow-inner border-4 border-[#ffb300]">
                 <img src="/assets/story/story-chapter-3.jpg" className="w-full h-full object-cover" alt="The Purpose" />
              </div>
              <h3 className="font-black text-xl italic tracking-tighter">02 / Why We Built This</h3>
              <p className="text-sm font-bold opacity-60 leading-relaxed normal-case">My husband Sujith and I spent months perfecting a formula that works. 200+ test batches later: no bloat, no compromise.</p>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/5] bg-[#f3eee4] rounded-4xl overflow-hidden relative shadow-inner">
                 <img src="/assets/story/story-chapter-1.jpg" className="w-full h-full object-cover" alt="The Result" />
              </div>
              <h3 className="font-black text-xl italic tracking-tighter text-[#f20028]">03 / What Changed</h3>
              <p className="text-sm font-bold opacity-60 leading-relaxed normal-case">Skin cleared. Energy stayed steady. For the first time, protein wasn't the enemy—it was the fuel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PEPTIDE LOGIC (THE SCIENCE) */}
      <section id="science" className="py-40 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-9xl font-black tracking-tightest opacity-[0.03] absolute left-0 right-0 pointer-events-none uppercase italic">The Science</h2>
        <div className="relative z-10">
          <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">PEPTIDE <span className="text-[#f20028]">LOGIC.</span></h3>
          <p className="max-w-2xl mx-auto font-bold opacity-60 mb-20 normal-case">We use enzymatically hydrolyzed pea and rice protein. They are pre-broken down so your gut doesn't have to work overtime. Instant systemic fuel. Zero latency absorption.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['No Stevia', 'No Lecithins', 'No Gums', 'No Fillers'].map(item => (
              <div key={item} className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <div className="w-10 h-10 bg-[#f20028]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-[#f20028] font-black">✕</span>
                </div>
                <p className="font-black tracking-widest text-[10px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      [Image of protein molecule chains being broken down into small peptides through enzymatic hydrolysis]

      {/* 5. THE CLOSER */}
      <section id="join" className="bg-[#f20028] py-48 px-6 text-center text-[#f3eee4] rounded-t-5xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none uppercase">
            <div className="text-[25vw] font-black -rotate-12 translate-y-32">GUTSY</div>
        </div>
        
        <div className="relative z-10">
            <h2 className="text-7xl md:text-[11rem] font-black tracking-tightest leading-[0.8] mb-20">READY TO <br/>FEEL <span className="text-black">LIGHT?</span></h2>
            <div className="w-full max-w-md mx-auto">
              <WaitlistForm />
            </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-24 px-10 flex flex-col items-center bg-black text-[#f3eee4] text-center uppercase">
        <span className="text-9xl font-black tracking-tightest italic opacity-20 mb-12">GUTSY</span>
        <div className="flex gap-16 font-black text-xs tracking-[0.3em] mb-12 opacity-60">
            <a href="#" className="hover:text-[#f20028] underline underline-offset-8">Instagram</a>
            <a href="#" className="hover:text-[#f20028] underline underline-offset-8">TikTok</a>
        </div>
        <p className="text-[10px] font-black tracking-[0.8em] opacity-30">© 2026 Dubai / Biotech / Power</p>
      </footer>

    </div>
  );
}
