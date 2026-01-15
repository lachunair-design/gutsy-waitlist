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
    <div className="min-h-screen bg-[#F5F5DC] text-black font-gutsy selection:bg-[#CE1126] selection:text-white antialiased overflow-x-hidden uppercase">
      
      {/* 1. SOFT NEON NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-white/80 backdrop-blur-md border border-black/5 rounded-full px-8 py-4 flex justify-between items-center shadow-lg">
        <span className="text-2xl font-black italic tracking-tighter">GUTSY</span>
        <div className="hidden md:flex gap-8 text-[10px] font-black tracking-widest">
          <a href="#science" className="hover:text-[#CE1126] transition-colors">SCIENCE</a>
          <a href="#story" className="hover:text-[#CE1126] transition-colors">THE WHY</a>
        </div>
        <a href="#join" className="bg-[#CE1126] text-white px-6 py-2 rounded-full text-[10px] font-black hover:scale-105 transition-transform">
          JOIN THE LIST
        </a>
      </nav>

      {/* 2. FLUID HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="z-10 text-center w-full max-w-6xl">
          <div className="inline-block bg-[#FFD700] text-black px-4 py-1 rounded-full text-[10px] font-black mb-8 shadow-sm">
            01 / WORLD'S LIGHTEST PEPTIDES
          </div>
          
          <h1 className="text-[12vw] md:text-[11rem] font-black leading-[0.85] tracking-tighter mb-10">
            PROTEIN <br /> <span className="text-[#CE1126]">RE-IMAGINED</span>
          </h1>

          <p className="text-sm md:text-lg font-bold max-w-xl mx-auto leading-relaxed opacity-70 mb-12 normal-case">
            No bloating. No chalky aftertaste. Just bio-available plant peptides engineered for immediate systemic fuel.
          </p>

          <div className="w-full max-w-md mx-auto relative group">
            <WaitlistForm />
            {/* Soft Shadow Badge */}
            <div className="absolute -top-6 -right-10 bg-black text-[#FFD700] px-4 py-3 rounded-2xl font-black text-[10px] shadow-2xl rotate-12">
              {waitlistCount}+ JOINED
            </div>
          </div>
        </div>

        {/* SOFT FLOATING IMAGE PLACEHOLDERS */}
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-white/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#CE1126]/10 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* 3. THE REBELLION (FOUNDER STORY - CLEAN & CHEEKY) */}
      <section id="story" className="py-32 px-6 bg-white rounded-[4rem] mx-4 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Rounded Fluid Image Placeholder */}
            <div className="aspect-square bg-[#F5F5DC] rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#CE1126]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black opacity-20 uppercase">
                 [IMAGE: FOUNDER STORY VISUAL]
               </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">THE <span className="text-[#CE1126]">REBELLION.</span></h2>
            <div className="space-y-6 text-lg font-bold leading-relaxed opacity-80">
              <p>LET'S BE HONEST: MOST PROTEIN POWDERS ARE JUST GLORIFIED DUST. THEY TASTE LIKE CHALK AND LEAVE YOUR GUT FEELING LIKE A CONSTRUCTION SITE AT 3 AM.</p>
              <p>I GOT SICK OF LOOKING 6 MONTHS PREGNANT AFTER EVERY POST-WORKOUT SHAKE. SO WE RE-ENGINEERED THE MOLECULE.</p>
              <p className="text-[#CE1126]">ZERO GAS. ZERO BLOAT. NO APOLOGIES.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT MATRIX (CLEAN PILL CARDS) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-black mb-20 tracking-tight">CHOOSE YOUR BLEND</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { name: 'VANILLA CALM', color: 'bg-[#F5F5DC]', desc: 'STEADY FOCUS. ZERO LATENCY RECOVERY.' },
            { name: 'CACAO BOOST', color: 'bg-[#F8D7DA]', desc: 'PEAK PERFORMANCE. GUT-FIRST ENERGY.' }
          ].map((product) => (
            <div key={product.name} className="group bg-white rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5">
              <div className={`aspect-square ${product.color} rounded-[2rem] flex items-center justify-center mb-8 relative`}>
                <span className="text-[10px] font-black opacity-10 uppercase">[PRODUCT RENDER]</span>
              </div>
              <h3 className="text-3xl font-black mb-4 italic leading-none">{product.name}</h3>
              <p className="text-xs font-bold opacity-50 mb-8 tracking-widest">{product.desc}</p>
              <div className="flex gap-2">
                {['23G PEPTIDES', 'NO GUMS', 'DUBAI BATCHED'].map(tag => (
                  <span key={tag} className="text-[9px] font-black border border-black/10 px-4 py-2 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SOFT CONVERSION FOOTER */}
      <section id="join" className="bg-black py-40 px-6 text-center text-white rounded-t-[5rem]">
        <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-16">READY TO <br/>FEEL <span className="text-[#CE1126]">LIGHT?</span></h2>
        <div className="w-full max-w-md mx-auto">
          <WaitlistForm />
        </div>
        <p className="mt-8 text-[10px] font-black tracking-[0.4em] opacity-40">JOIN THE WAITLIST FOR PRIORITY ACCESS.</p>
      </section>

      <footer className="py-20 px-10 flex flex-col items-center bg-black text-white text-center">
        <span className="text-7xl font-black tracking-tighter italic opacity-20 mb-12">GUTSY</span>
        <p className="text-[10px] font-black tracking-[0.6em] opacity-30">© 2026 DUBAI / BIOTECH / POWER</p>
      </footer>

    </div>
  );
}
