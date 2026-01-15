import { useState, useEffect } from "react";
import { WaitlistForm } from "./components/WaitlistForm";
import { useWaitlistCount } from "./hooks/useWaitlist";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/Accordion";

export default function App() {
  const { data: countData } = useWaitlistCount();
  const [waitlistCount, setWaitlistCount] = useState(120);

  useEffect(() => {
    if (countData?.count) setWaitlistCount(countData.count);
  }, [countData]);

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-black font-sans selection:bg-[#CE1126] selection:text-white uppercase antialiased">

      {/* 1. STICKY TOP BAR: URGENCY & ORIGIN */}
      <div className="bg-black text-[#FFD700] py-2.5 px-4 text-[10px] md:text-xs font-black tracking-[0.2em] text-center sticky top-0 z-50">
        BORN IN DUBAI. LAUNCHING 2026. 00D : 00H : 00M : 00S
      </div>

      {/* 2. HERO: THE CONVERSION HUB */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto flex flex-col items-center border-b-2 border-black">
        <div className="flex items-center gap-2 mb-10 border-2 border-black bg-[#FFD700] px-4 py-1.5 self-start md:self-center">
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black tracking-widest">GUT-FIRST ARCHITECTURE</span>
        </div>

        <h1 className="font-gutsy text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-left md:text-center mb-8">
          THE LIGHTEST <br /> <span className="text-[#CE1126]">PROTEIN</span>
        </h1>

        <p className="text-base md:text-xl font-bold opacity-80 max-w-2xl text-left md:text-center mb-12 leading-tight">
          No bloat. No regret. Just clean fuel. Enzymatically pre-digested peptides for zero-latency absorption.
        </p>

        {/* HERO IMAGE CONTAINER */}
        <div className="w-full max-w-5xl aspect-[16/8] bg-black/5 border-2 border-dashed border-black/20 flex items-center justify-center mb-14 relative group overflow-hidden">
          <span className="text-[10px] font-black opacity-30 group-hover:opacity-50 transition-opacity uppercase">
            [PLACEHOLDER: HIGH-CONTRAST CYCLIST ILLUSTRATION OR 3D PRODUCT RENDER]
          </span>

          {/* DYNAMIC SOCIAL PROOF BADGE */}
          <div className="absolute bottom-6 right-6 bg-[#CE1126] text-white p-5 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <p className="text-xs font-black leading-none">{waitlistCount}+ INDIVIDUALS ALREADY ON THE LIST</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <WaitlistForm />
          <p className="mt-4 text-[9px] font-black tracking-widest text-center opacity-40">PRIORITY ACCESS + REFERRAL REWARDS ENABLED</p>
        </div>
      </section>

      {/* 3. TRUST MARQUEE */}
      <div className="bg-[#FFD700] border-b-2 border-black py-4 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 items-center font-black text-[10px] tracking-[0.2em]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>CLEAN INGREDIENTS</span> <span className="text-lg">•</span>
              <span>VEGAN</span> <span className="text-lg">•</span>
              <span>NOTHING ARTIFICIAL</span> <span className="text-lg">•</span>
              <span>NO ADDED SUGAR</span> <span className="text-lg">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. TECHNICAL AUTHORITY: THE PROBLEM */}
      <section className="bg-white py-24 px-6 border-b-2 border-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-5xl font-black leading-[0.9] mb-8 uppercase tracking-tighter">WHY MOST PROTEIN <br/>POWDERS MAKE YOU <span className="text-[#CE1126]">BLOAT</span></h2>
            <p className="text-sm font-bold opacity-70 mb-10 leading-relaxed uppercase">It's not just the protein. Most powders are loaded with extra ingredients your gut hates. We rebuild the process from the microbe up.</p>

            <Accordion type="single" collapsible className="w-full border-t-2 border-black">
              <AccordionItem value="science" className="border-b-2 border-black">
                <AccordionTrigger className="font-black py-6 text-sm hover:text-[#CE1126]">WHY IT DOESN'T BLOAT YOU</AccordionTrigger>
                <AccordionContent className="font-bold pb-6 text-xs leading-relaxed opacity-80 uppercase italic">
                  Traditional protein requires intense fermentation. GUTSY peptides are pre-broken, bypassing the gas-production stage entirely for instant systemic fuel.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="order-1 lg:order-2 aspect-square bg-black flex items-center justify-center shadow-[16px_16px_0px_0px_rgba(206,17,38,1)]">
             <span className="text-white text-[10px] font-black text-center px-10 uppercase tracking-widest opacity-50">
               [PLACEHOLDER: BIO-AVAILABILITY INFOGRAPHIC / GUT-PROTEIN ABSORPTION CHART]
             </span>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT MATRIX */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter">TWO BLENDS.<br/>ONE MISSION.</h2>
          <p className="text-[10px] font-black opacity-40 tracking-widest max-w-[200px] text-right">OPTIMIZED FOR THE GUT-MUSCLE AXIS.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { name: 'VANILLA CALM', color: 'bg-[#F5F5DC]', text: 'ALL-DAY ENERGY. SMOOTH PERFORMANCE.' },
            { name: 'CACAO BOOST', color: 'bg-[#F8D7DA]', text: 'ENERGY + RECOVERY. GAME-CHANGER.' }
          ].map((product) => (
            <div key={product.name} className="border-2 border-black p-3 bg-white hover:translate-y-[-4px] transition-transform">
              <div className={`aspect-[4/5] ${product.color} border-2 border-black flex items-center justify-center mb-8 relative`}>
                <span className="text-[10px] font-black opacity-20 uppercase">[PRODUCT RENDER]</span>
                <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[9px] font-black">{product.name}</div>
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-black mb-6 leading-none">{product.text}</h3>
                <div className="flex flex-wrap gap-2">
                  {['23G PLANT PROTEIN', 'GUT-FIRST FORMULA', 'NO FILLERS'].map(tag => (
                    <span key={tag} className="text-[9px] font-black border-2 border-black px-2 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION CLOSER */}
      <section className="bg-[#FFD700] py-32 px-6 border-y-2 border-black text-center">
        <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] mb-12 uppercase">YOUR STRONGEST <br/>SELF STARTS HERE</h2>
        <div className="w-full max-w-md mx-auto">
          <WaitlistForm />
        </div>
      </section>

      {/* 7. MINIMALIST FOOTER */}
      <footer className="py-20 px-10 flex flex-col items-center bg-white">
        <div className="text-5xl font-black tracking-tighter mb-8 italic">GUTSY</div>
        <div className="flex gap-10 text-[10px] font-black tracking-widest opacity-60 mb-12">
          <a href="#" className="hover:text-[#CE1126]">INSTAGRAM</a>
          <a href="#" className="hover:text-[#CE1126]">TIKTOK</a>
          <a href="#" className="hover:text-[#CE1126]">PRIVACY</a>
        </div>
        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">© 2026 GUTSY. DUBAI, UAE.</p>
      </footer>
    </div>
  );
}
