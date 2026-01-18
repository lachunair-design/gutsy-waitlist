import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Play, Microscope, FlaskConical, AlertCircle } from "lucide-react";
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
      {/* Noise Overlay for tactile texture */}
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
            <MapPin className="w-3 h-3" /> Dubai, UAE • Est. 2026
          </div>
        </header>

        {/* CASE STUDY SECTION */}
        <section className="relative space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">Case Study: 01</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>I was chronically exhausted. I was 28 and I felt 48.</p>
            <p>I got my labs done—it was an absolute bloodbath. Everything was either borderline or severely deficient. Iron, B12, Vitamin D. The works.</p>
            
            <div className="md:absolute md:-right-64 md:top-0 w-56 p-4 border-l-2 border-gutsyRed bg-white/50 hidden md:block">
               <p className="text-[10px] font-black uppercase tracking-widest text-gutsyRed mb-2 flex items-center gap-2 text-balance">
                 <AlertCircle className="w-3 h-3" /> Lab Result Note
               </p>
               <p className="text-[10px] font-medium leading-tight opacity-60 uppercase">
                 Ferritin levels below 10 ng/mL. Clinical exhaustion was a daily reality.
               </p>
            </div>

            <p>So I did what you are supposed to do. I started working out. I hit my nutrition goals. I increased my protein to 100g a day. And it worked. For about three months.</p>
          </div>
        </section>

        {/* THE TURN */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Turn</h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
            <p>Then the bloating became constant. Every shake, every bar, every "gut-friendly" powder left me feeling like I’d swallowed a brick.</p>
            <p>Then the breakouts started. Not normal breakouts—severe, painful, cystic acne across my face and back. The kind that shatters your confidence when you're trying to build a better version of yourself.</p>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tightest border-y border-black/5 py-12 text-center text-balance">
              I was eating clean. Hitting macros. Doing everything "right." <span className="text-gutsyRed">But I felt worse than when I started.</span>
            </p>
          </div>
        </section>

        {/* EMOTIONAL CENTER */}
        <section className="py-20 md:py-32 bg-gutsyCream text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed mb-12">The Catalyst</h2>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tightest leading-tight text-balance">
            And then my mum was <br /> 
            diagnosed with <span className="text-gutsyRed italic">colon cancer.</span>
          </h2>
          <p className="mt-8 text-sm md:text-lg font-medium opacity-60 max-w-lg mx-auto normal-case italic text-balance">
            That's when I stopped being "healthy" and started being paranoid. I realized I had no idea what I’d been putting in my body for years.
          </p>
        </section>

        {/* VIDEO COMPONENT */}
        <section className="aspect-video w-full bg-white border-2 border-black rounded-[2rem] flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:bg-gutsyCream transition-all shadow-premium">
          <div className="w-16 h-16 rounded-full bg-gutsyRed flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tightest">A Message from Lakshmi</h3>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2 italic">From Paranoia to Provision</p>
        </section>

        {/* SCIENTIFIC BREAKTHROUGH */}
        <section className="space-y-12">
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Breakthrough</h2>
            <div className="text-lg md:text-xl font-medium leading-relaxed opacity-90 space-y-6 normal-case">
              <p>Most protein powders are isolates—long chains your gut has to break down. That breakdown creates gas and bloating.</p>
              <p className="text-2xl md:text-4xl font-black uppercase tracking-tightest text-gutsyRed text-balance">
                Hydrolysed protein is pre-digested.
              </p>
              <p>The chains are already broken down into smaller peptides before you drink it. Your gut absorbs them 2x faster with zero digestive work. It's not magic. It's just science.</p>
            </div>
          </div>

          {/* Provision Specs Box */}
          <div className="p-8 md:p-12 bg-white border border-black rounded-[3rem] space-y-6 shadow-premium">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
               <Microscope className="w-4 h-4 text-gutsyRed" /> Provision Specifications
             </h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40">Iteration</p>
                  <p className="text-sm font-bold uppercase">47 Samples Tested</p>
                </li>
                <li className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40">Primary Tech</p>
                  <p className="text-sm font-bold uppercase">Hydrolysed Pea & Rice</p>
                </li>
                <li className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40">Additive Control</p>
                  <p className="text-sm font-bold uppercase">Zero Gums / Zero Fillers</p>
                </li>
                <li className="space-y-1">
                   <p className="text-[10px] font-black uppercase opacity-40">Gut Support</p>
                   <p className="text-sm font-bold uppercase">Actazin Kiwifruit Extract</p>
                </li>
             </ul>
          </div>
        </section>

        {/* CLOSING */}
        <section className="py-24 border-t border-black/5 text-center space-y-10">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Invitation</h2>
          <div className="text-xl md:text-3xl font-medium leading-relaxed opacity-90 space-y-8 normal-case text-balance">
            <p>GUTSY is for the people tired of choosing between their goals and their comfort.</p>
            <p>If you’ve tried everything and nothing works, this is for you.</p>
          </div>
          <div className="pt-12">
            <p className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-none">— Lakshmi</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-4">Founder, Gutsy Provisions</p>
          </div>
          <div className="pt-16">
            <a href="/" className="btn-pill px-16 py-5 text-xs">Join as a Founder Member</a>
          </div>
        </section>
      </article>

      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY PROVISIONS • Born in Dubai</p>
      </footer>
    </div>
  );
}
