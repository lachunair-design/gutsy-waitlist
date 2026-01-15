import { useState, useEffect } from "react";
import { WaitlistForm } from "./components/WaitlistForm";
import { useWaitlistCount } from "./hooks/useWaitlist";

export default function App() {
  const { data: countData } = useWaitlistCount();
  const [waitlistCount, setWaitlistCount] = useState(120);

  useEffect(() => {
    if (countData?.count) setWaitlistCount(countData.count);
  }, [countData]);

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy selection:bg-gutsyRed selection:text-white antialiased overflow-x-hidden">
      
      {/* 1. GLASSMORPHIC NAV WITH LOGO */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl bg-white/70 backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 flex justify-between items-center shadow-premium">
        <div className="h-8 md:h-10">
          {/* LOGO PLACEHOLDER: PRIMARY WORDMARK */}
          <img 
            src="/assets/logos/gutsy-wordmark-black.svg" 
            alt="GUTSY" 
            className="h-full w-auto object-contain italic font-black" 
            onError={(e) => (e.currentTarget.src = "https://placehold.co/200x80/f3eee4/000000?text=GUTSY")}
          />
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.2em]">
          <a href="#science" className="hover:text-gutsyRed transition-colors">THE SCIENCE</a>
          <a href="#story" className="hover:text-gutsyRed transition-colors">THE REBELLION</a>
        </div>
        <a href="#join" className="btn-pill !py-2 !px-6 text-[9px] animate-bounce-slow">JOIN LIST</a>
      </nav>

      {/* 2. KINETIC HERO WITH BRAND MARK */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="z-10 text-center w-full max-w-7xl">
          <div className="inline-flex items-center gap-3 bg-white px-5 py-1.5 rounded-full text-[10px] font-black mb-10 shadow-sm uppercase tracking-widest">
            {/* LOGO PLACEHOLDER: SYMBOL/ICON */}
            <img 
              src="/assets/logos/gutsy-symbol.svg" 
              className="w-4 h-4" 
              alt=""
              onError={(e) => (e.currentTarget.style.display = 'none')} 
            />
            <span>World's Lightest Peptides</span>
          </div>
          
          <h1 className="text-[13vw] md:text-[11rem] font-black leading-[0.8] tracking-tightest mb-10 uppercase">
            PROTEIN <br /> <span className="text-gutsyRed">RE-IMAGINED</span>
          </h1>

          <div className="w-full max-w-md mx-auto relative">
            <WaitlistForm />
            <div className="absolute -top-8 -right-12 bg-gutsyBlack text-gutsyYellow px-5 py-4 rounded-3xl font-black text-[11px] shadow-pill rotate-6 uppercase">
              {waitlistCount}+ Obsessives Joined
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION CLOSER WITH WATERMARK */}
      <section id="join" className="bg-gutsyRed py-48 px-6 text-center text-gutsyCream rounded-t-5xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            {/* LOGO PLACEHOLDER: WATERMARK LOGO */}
            <img 
              src="/assets/logos/gutsy-wordmark-white.svg" 
              className="w-[80%] h-auto -rotate-12" 
              alt=""
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
        </div>
        
        <div className="relative z-10">
            <h2 className="text-7xl md:text-[11rem] font-black tracking-tightest leading-[0.8] mb-20 uppercase text-white">Don't be <br/>a stranger.</h2>
            <div className="w-full max-w-md mx-auto">
              <WaitlistForm />
            </div>
        </div>
      </section>

      {/* 7. REFINED FOOTER WITH LOGO */}
      <footer className="py-24 px-10 flex flex-col items-center bg-gutsyBlack text-gutsyCream text-center uppercase">
        <div className="h-16 md:h-24 opacity-20 mb-12">
            {/* LOGO PLACEHOLDER: LARGE FOOTER WORDMARK */}
            <img 
              src="/assets/logos/gutsy-wordmark-white.svg" 
              className="h-full w-auto object-contain italic" 
              alt="GUTSY"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/400x150/000000/ffffff?text=GUTSY&font=playfair")}
            />
        </div>
        <div className="flex gap-16 font-black text-xs tracking-[0.3em] mb-12">
            <a href="#" className="hover:text-gutsyRed transition-colors underline underline-offset-8">Instagram</a>
            <a href="#" className="hover:text-gutsyRed transition-colors underline underline-offset-8">TikTok</a>
        </div>
        <p className="text-[10px] font-black tracking-[0.8em] opacity-30">© 2026 Dubai / Biotech / Power</p>
      </footer>
    </div>
  );
}
