import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Play, AlertCircle, Sparkles } from "lucide-react";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

export default function Story() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy selection:bg-gutsyRed selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-noise" />
      
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gutsyRed z-[101] transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center border-b border-black/5 bg-gutsyCream/80 backdrop-blur-md">
        <a href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft className="w-3 h-3" /> Back
        </a>
        <img src={logoBlack} alt="GUTSY" className="h-5 md:h-6" />
        <div className="w-12" />
      </nav>

      <article className="pt-32 pb-24 px-6 max-w-2xl mx-auto space-y-20 md:space-y-32">
        <header className="text-center space-y-4">
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tightest leading-[0.85] animate-text-reveal">
              The <span className="text-gutsyRed">GUTSY</span> <br /> Manifesto
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            A Gut-First Brand • Confidential Batch 01
          </p>
        </header>

        {/* THE HOOK */}
        <section className="relative space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Bloodbath</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>I was 28 and I felt 48. My labs were a disaster—deficient in everything despite doing everything "right."</p>
            <p>I started working out and tripled my protein intake. It worked. For exactly three months. Then my body started to fight back.</p>
          </div>
        </section>

        {/* THE PAIN */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Friction</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>The bloating was relentless. Every "clean" powder left me feeling like I’d swallowed a brick. Then the cystic acne started—severe, painful, and confidence-shattering.</p>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tightest border-y border-black/5 py-12 text-center text-balance">
              I was eating clean. Hitting macros. <br />
              <span className="text-gutsyRed">But my gut was at war.</span>
            </p>
          </div>
        </section>

        {/* THE EMOTIONAL PIVOT */}
        <section className="py-12 md:py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tightest leading-tight text-balance">
            Then my mum was <br /> 
            diagnosed with <span className="text-gutsyRed italic">colon cancer.</span>
          </h2>
          <p className="mt-8 text-sm md:text-lg font-medium opacity-60 max-w-lg mx-auto normal-case italic">
            Paranoia set in. I realized I had no idea what I’d been putting in my body. I quit protein entirely for two years.
          </p>
        </section>

        {/* THE MYSTERY / BREAKTHROUGH */}
        <section className="space-y-12">
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The 48th Iteration</h2>
            <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
              <p>I spent 8 months asking one question: <i>Why does protein have to feel so heavy?</i></p>
              <p>The answer wasn't the ingredients—it was the <b>molecular structure.</b> Standard protein makes your gut do all the work. We do it before the powder even hits your tongue.</p>
              <p className="text-2xl md:text-4xl font-black uppercase tracking-tightest text-gutsyRed">
                Peptides that sit as light as water.
              </p>
              <p>We tested 47 versions that failed. The 48th was different. Designed for lighter digestion. No compromise.</p>
            </div>
          </div>

        {/* THE INVITATION */}
        <section className="py-24 border-t border-black/5 text-center space-y-10">
          <div className="text-xl md:text-3xl font-medium leading-relaxed opacity-90 space-y-8 normal-case text-balance">
            <p>GUTSY is for the obsessives who are tired of choosing between their goals and their comfort.</p>
          </div>
          <div className="pt-12">
            <p className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-none">— Lakshmi</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-4 font-bold">Founder, Gutsy</p>
          </div>
          <div className="pt-16">
            <a href="/" className="btn-pill px-16 py-5 text-xs">Claim a Founder Slot</a>
          </div>
        </section>
      </article>

      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY • A GUT FIRST BRAND</p>
      </footer>
    </div>
  );
}
