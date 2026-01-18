import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Play, Microscope, FlaskConical, AlertCircle, Lock } from "lucide-react";
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
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-noise" />
      
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gutsyRed z-[101] transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* NAVIGATION */}
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
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            <MapPin className="w-2 h-2" /> Born in Dubai • Confidential Batch 01
          </div>
        </header>

        {/* CASE STUDY SECTION */}
        <section className="relative space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">Case Study: 01</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>I was chronically exhausted. At 28, I felt like I was 48.</p>
            <p>I got my labs done—it was a bloodbath. Everything was borderline or severely deficient. I did what you are supposed to do: I increased my protein to 100g a day. It worked for three months.</p>
            
            <div className="md:absolute md:-right-64 md:top-0 w-56 p-4 border-l-2 border-gutsyRed bg-white/50 hidden md:block">
               <p className="text-[10px] font-black uppercase tracking-widest text-gutsyRed mb-2 flex items-center gap-2">
                 <AlertCircle className="w-3 h-3" /> Clinical Log
               </p>
               <p className="text-[10px] font-medium leading-tight opacity-60 uppercase">
                 Subject experienced metabolic failure despite "clean" supplementation.
               </p>
            </div>
          </div>
        </section>

        {/* THE TURN */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Turn</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>Then the bloating became constant. Every "gut-friendly" powder left me feeling like I’d swallowed a brick.</p>
            <p>Then the cystic acne started. I was eating clean and hitting macros, but my body was rejecting the very things I was using to build it.</p>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tightest border-y border-black/5 py-12 text-center text-balance">
              I quit protein entirely for two years. <br />
              <span className="text-gutsyRed">I had to find a different way.</span>
            </p>
          </div>
        </section>

        {/* THE CATALYST */}
        <section className="py-20 md:py-32 bg-gutsyCream text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed mb-12">The Catalyst</h2>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tightest leading-tight text-balance">
            And then my mum was <br /> 
            diagnosed with <span className="text-gutsyRed italic">colon cancer.</span>
          </h2>
          <p className="mt-8 text-sm md:text-lg font-medium opacity-60 max-w-lg mx-auto normal-case italic text-balance">
            Health stopped being about "fitness." It became about survival. I realized I had no idea what I’d been putting in my body for years.
          </p>
        </section>

        {/* VIDEO COMPONENT */}
        <section className="aspect-video w-full bg-white border-2 border-black rounded-[2rem] flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:bg-gutsyCream transition-all shadow-premium">
          <div className="w-16 h-16 rounded-full bg-gutsyRed flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tightest">The Founder Tapes</h3>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2 italic">Lakshmi on the 47 failed iterations</p>
        </section>

        {/* THE BREAKTHROUGH - REDACTED STYLE */}
        <section className="space-y-12">
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Breakthrough</h2>
            <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
              <p>Most protein powders are long chains your gut has to fight to break down. That friction is what causes your bloat.</p>
              <p className="text-2xl md:text-4xl font-black uppercase tracking-tightest text-gutsyRed text-balance">
                Our method bypasses the gut's workload entirely.
              </p>
              <p>We found a way to "pre-digest" the protein into microscopic peptides. No gas. No fermentation. No bloat. Just immediate metabolic fuel.</p>
              <p className="italic opacity-60">We tested 47 different formulations before we found the one that sat as light as water.</p>
            </div>
          </div>

          {/* Intentionally Teasing/Redacted Box */}
          <div className="p-8 md:p-12 bg-white border border-black rounded-[3rem] space-y-8 shadow-premium relative overflow-hidden">
             <div className="absolute top-4 right-8 opacity-10">
               <Lock className="w-24 h-24" />
             </div>
             
             <h4 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
               <FlaskConical className="w-4 h-4 text-gutsyRed" /> Formulation Status: Proprietary
             </h4>
             
             <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-tighter">Full Clinical Profile [REDACTED]</p>
                <div className="h-4 bg-gutsyBlack/5 w-3/4 rounded-sm" />
                <div className="h-4 bg-gutsyBlack/5 w-1/2 rounded-sm" />
             </div>

             <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">
               *Full ingredient breakdown and clinical data will be released to the Founder 500 on launch day.
             </p>
          </div>
        </section>

        {/* THE INVITATION */}
        <section className="py-24 border-t border-black/5 text-center space-y-10">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Invitation</h2>
          <div className="text-xl md:text-3xl font-medium leading-relaxed opacity-90 space-y-8 normal-case text-balance">
            <p>GUTSY is not for everyone. It is for the obsessives who have quit protein because their body couldn't handle the compromise.</p>
            <p>If you've tried everything else, you are the reason this exists.</p>
          </div>
          <div className="pt-12">
            <p className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-none">— Lakshmi</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-4">Founder, Gutsy</p>
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
