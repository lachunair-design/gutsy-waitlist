import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock, ArrowRight, MapPin } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

// Assets
import bikerImg from "@/assets/images/BIKER2.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Refs for functional navigation
  const joinRef = useRef<HTMLDivElement>(null);
  const vanillaRef = useRef<HTMLDivElement>(null);
  const cacaoRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const launchDate = "2026-03-15T00:00:00"; // Updated Launch Date

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack selection:bg-gutsyRed selection:text-white font-sans overflow-x-hidden">
      
      {/* 2 & 3. UPDATED HEADER */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <div className="flex flex-col">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-7" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mt-1 flex items-center gap-1">
            <MapPin className="w-2 h-2" /> Born in Dubai
          </span>
        </div>
        
        <button 
          onClick={() => scrollTo(joinRef)}
          className="btn-pill scale-90 md:scale-100"
        >
          Join Waitlist
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="relative z-10 max-w-5xl">
          <h2 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase italic">
            The Lightest <br />
            <span className="font-serif font-light lowercase text-gutsyRed">protein in</span> <br />
            the world.
          </h2>
          
          <div ref={joinRef} className="mt-16 w-full max-w-lg mx-auto">
            <div className="mb-8 p-4 bg-white/40 rounded-2xl border border-black/5 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-40">Launching In</p>
              {/* 1. UPDATED COUNTDOWN TARGET */}
              <Countdown targetDate={launchDate} />
            </div>
            <EmailForm />
          </div>
        </div>
      </section>

      {/* 5. RE-DESIGNED "WHY" SECTION (Editorial Style) */}
      <section className="py-32 px-6 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest leading-none">
                Protein your gut <br />
                <span className="text-gutsyRed italic font-serif lowercase font-light">doesn't have to</span> <br />
                battle.
              </h3>
              <div className="space-y-8 border-l border-black/10 pl-8">
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest text-gutsyRed">01. Pre-Broken Peptides</h4>
                  <p className="font-serif italic opacity-60">Enzymatically processed so they absorb instantly. No brick-in-stomach feeling.</p>
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest">02. Plant Powered</h4>
                  <p className="font-serif italic opacity-60">Pea and Rice protein base. Zero dairy, zero soy, zero bloat.</p>
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest">03. Clean Label</h4>
                  <p className="font-serif italic opacity-60">No artificial sweeteners or gums. Just real food ingredients.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-gutsyCream rounded-[4rem] overflow-hidden">
                {/* Visual placeholder for why section image */}
                <img src={bikerImg} className="w-full h-full object-cover grayscale opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLAVOR SECTION WITH ANCHORS */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
        {[
          { name: "Vanilla Calm", img: vanillaImg, color: "bg-[#f9f5f0]", ref: vanillaRef },
          { name: "Cacao Boost", img: cocoaImg, color: "bg-[#f5f5f5]", ref: cacaoRef }
        ].map((prod) => (
          <div 
            key={prod.name} 
            ref={prod.ref}
            className="group cursor-pointer"
            onClick={() => scrollTo(joinRef)} // Functional upgrade: Clicking card scrolls to join
          >
            <div className={`${prod.color} rounded-[3rem] aspect-[4/5] flex items-center justify-center overflow-hidden border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]`}>
              <img src={prod.img} className="w-2/3 group-hover:scale-105 transition-transform duration-700" alt={prod.name} />
            </div>
            <div className="mt-8 flex justify-between items-end px-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter">{prod.name}</h3>
                <p className="text-lg font-serif italic opacity-50">Waitlist Exclusive • 23g Protein</p>
              </div>
              <button 
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-gutsyBlack group-hover:text-white transition-colors"
                title="Reserve this flavor"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
