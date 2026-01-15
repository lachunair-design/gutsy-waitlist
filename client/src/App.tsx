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
    <div className="min-h-screen bg-[#F5F5DC] text-black font-gutsy selection:bg-[#CE1126] selection:text-white uppercase antialiased">
      
      {/* 1. KINETIC NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center text-white">
        <span className="text-3xl font-black tracking-tighter italic">GUTSY</span>
        <div className="flex gap-6 text-[10px] font-black tracking-widest uppercase">
          <a href="#why" className="hover:text-[#FFD700] transition-colors">The Science</a>
          <a href="#founder" className="hover:text-[#FFD700] transition-colors">The Why</a>
        </div>
      </nav>

      {/* 2. THE "LOUD" HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Text Shadow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.03] leading-none select-none">
          GUT-FIRST
        </div>

        <div className="z-10 text-center max-w-6xl">
          <h1 className="text-[12vw] md:text-[10rem] font-black leading-[0.8] tracking-tighter mb-8 drop-shadow-sm">
            LIGHTEST <br /> <span className="text-[#CE1126]">PROTEIN</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
             <div className="bg-[#FFD700] border-2 border-black px-4 py-2 font-black text-xs rotate-[-2deg]">
               NO BLOAT. NO REGRET.
             </div>
             <p className="text-sm md:text-xl font-bold max-w-md text-left md:text-center leading-tight">
               ENZYMATICALLY PRE-BROKEN PEPTIDES. <br/>INSTANT ABSORPTION. ZERO BS.
             </p>
          </div>

          <div className="w-full max-w-md mx-auto relative">
            <WaitlistForm />
            <div className="absolute -top-12 -right-8 bg-[#CE1126] text-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] font-black rotate-[5deg]">
              {waitlistCount}+ OBSESSIVES JOINED
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLLING MARQUEE (Engagement Hook) */}
      <div className="bg-black text-white py-6 border-y-2 border-black overflow-hidden flex">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-black text-2xl">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>BORN IN DUBAI</span> <span className="text-[#CE1126]">•</span>
              <span>CLEAN LABEL</span> <span className="text-[#CE1126]">•</span>
              <span>VEGAN PEPTIDES</span> <span className="text-[#CE1126]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. THE CHEEKY "WHY WE BUILT THIS" (Founder Story) */}
      <section id="founder" className="py-32 px-6 bg-white border-b-2 border-black overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="relative group">
            {/* PLACEHOLDER FOR FOUNDER PHOTO */}
            <div className="aspect-[4/5] bg-[#F5F5DC] border-2 border-black relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               <span className="absolute bottom-4 left-4 text-[10px] font-black opacity-20 uppercase">IMAGE: FOUNDER RENDER / CANDID</span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#FFD700] p-6 border-2 border-black max-w-[200px]">
              <p className="font-black text-xs">"I GOT SICK OF LOOKING PREGNANT AFTER A POST-WORKOUT SHAKE."</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl font-black tracking-tighter mb-8 italic text-[#CE1126]">THE REBELLION.</h2>
            <div className="space-y-6 text-lg font-bold leading-snug">
              <p>LET'S BE REAL: MOST PROTEIN POWDERS ARE JUST GLORIFIED SLUDGE. THEY TASTE LIKE CHALK AND LEAVE YOUR GUT FEELING LIKE A CONSTRUCTION SITE.</p>
              <p>WE DIDN'T WANT TO BUILD JUST ANOTHER BRAND. WE WANTED TO RE-ENGINEER THE MOLECULE. WE USED BIOTECH TO BREAK DOWN PEPTIDES SO YOUR GUT DOESN'T HAVE TO DO THE HEAVY LIFTING.</p>
              <p className="bg-black text-white inline-block px-2 py-1">RESULT: PURE POWER. ZERO GAS. NO APOLOGIES.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT MATRIX (Visual Pop) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-[10vw] font-black text-center mb-24 tracking-tighter opacity-[0.05] absolute left-0 right-0 pointer-events-none">THE BLENDS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {[
            { name: 'VANILLA CALM', color: 'bg-[#F5F5DC]', accent: 'text-[#CE1126]', tags: ['STRESS-RELIEF', '23G PROTEIN'] },
            { name: 'CACAO BOOST', color: 'bg-[#F8D7DA]', accent: 'text-[#FFD700]', tags: ['ENERGY + RECOVERY', '23G PROTEIN'] }
          ].map((product) => (
            <div key={product.name} className="group border-2 border-black bg-white p-4 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-crosshair">
              <div className={`aspect-square ${product.color} border-2 border-black flex items-center justify-center mb-8 relative overflow-hidden`}>
                <span className="text-[10px] font-black opacity-20 uppercase">[PRODUCT PACKAGING RENDER]</span>
                <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 text-xs font-black rotate-[90deg] translate-x-4 translate-y-6">NEW BATCH</div>
              </div>
              <h3 className={`text-4xl font-black mb-4 tracking-tight ${product.accent}`}>{product.name}</h3>
              <div className="flex gap-2">
                {product.tags.map(tag => <span key={tag} className="text-[9px] font-black border-2 border-black px-2 py-1">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION FOOTER */}
      <section className="bg-[#CE1126] py-32 px-6 text-center text-white border-y-2 border-black">
        <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-12">DON'T BE <br/>A STRANGER.</h2>
        <div className="w-full max-w-md mx-auto">
          <WaitlistForm />
        </div>
      </section>

      <footer className="py-20 px-10 flex flex-col items-center bg-white">
        <span className="text-8xl font-black tracking-tighter italic opacity-10">GUTSY</span>
        <p className="text-[10px] font-black tracking-[0.5em] mt-8">© 2026 DUBAI / BIOTECH / POWER</p>
      </footer>

    </div>
  );
}
