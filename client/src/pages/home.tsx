import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, MapPin, Microscope } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";
import WaitlistPopup from "@/components/WaitlistPopup";

// Assets
import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  const scrollToJoin = () => {
    joinRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      return res.json();
    },
  });
  const waitlistCount = countData?.count || 1280;

  const rewards = [
    { step: "01", tier: "Join the waitlist", perk: "Secure your spot in the queue." },
    { step: "02", tier: "Share your link", perk: "Help others find protein that sits light." },
    { step: "03", tier: "Move up 5 spots", perk: "Every 3 signups moves you up the list." },
    { step: "04", tier: "Founder pricing", perk: "First 500 get founder pricing (25% off)." },
  ];

  const faqs = [
    { 
      q: "When does it launch?", 
      a: "April 1, 2026. Waitlist members get first access." 
    },
    { 
      q: "Is it actually easy to digest?", 
      a: "The protein is hydrolysed, meaning it is pre-digested into smaller peptides before you drink it. This makes it easier to digest than standard protein isolates." 
    },
    { 
      q: "What is founder pricing?", 
      a: "First 500 get founder pricing (25% off). Everyone else gets 15%. Your code will arrive with early access." 
    },
    { 
      q: "Where do you ship?", 
      a: "We are launching exclusively in Dubai and the UAE to start (delivery timing varies by location)." 
    },
  ];

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy antialiased selection:bg-gutsyRed selection:text-white overflow-x-hidden">
      <WaitlistPopup />

      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <div className="flex flex-col">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-8" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mt-1 flex items-center gap-1">
            <MapPin className="w-2 h-2" /> Born in Dubai
          </span>
        </div>
        <button onClick={scrollToJoin} className="btn-pill px-10">
          Join the waitlist
        </button>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase">
            The lightest <br />
            <span className="text-gutsyRed font-normal lowercase">protein in</span> <br />
            the world
          </h1>
          <p className="mt-8 text-lg md:text-2xl font-black uppercase tracking-widest opacity-60">
            Sits lighter. No regret. Just clean fuel.
          </p>
          
          <div ref={joinRef} className="mt-12 w-full max-w-lg mx-auto">
            <div className="mb-10 p-8 bg-white/40 rounded-[2.5rem] border border-black/5 backdrop-blur-sm shadow-premium">
              <p className="text-sm font-black uppercase mb-6">
                First 500 signups lock in founder pricing (25% off). Everyone else gets 15%.
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Launching April 1, 2026</p>
              <Countdown />
            </div>
            <EmailForm buttonText="Join the waitlist" />
            <p className="mt-6 text-[10px] font-black uppercase tracking-widest opacity-40">
              Join {waitlistCount.toLocaleString()}+ Health Obsessives
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[45vw] md:w-[25vw] pointer-events-none opacity-20 md:opacity-100">
          <img src={bikerImg} alt="" className="w-full h-auto grayscale-[20%]" />
        </div>
      </section>

      <section className="py-40 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <h3 className="text-5xl md:text-[7rem] font-black uppercase tracking-tightest leading-[0.85]">
            Your Gut <br /> 
            <span className="text-gutsyRed italic font-normal lowercase">Is Finally</span> <br /> 
            At Peace.
          </h3>
          <div className="max-w-3xl space-y-10">
            <p className="text-xl md:text-2xl font-medium uppercase tracking-tight opacity-60 leading-relaxed">
              Most protein powders sit in your stomach like a brick. We use hydrolysed protein, pre-digested before it hits your gut, so your body can absorb it more easily. Designed to sit lighter and be easier on digestion.
            </p>
            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gutsyRed">
                  <Microscope className="w-4 h-4" />
                  Authority in Digestion Science
               </div>
               <p className="text-xs font-medium uppercase opacity-40 max-w-md">No digestive gymnastics required. Just science that respects your motility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gutsyCream border-b border-black/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tightest">How much have you spent on protein that never felt good?</h3>
          <p className="text-lg font-medium uppercase opacity-60 leading-relaxed">
            If you have tried three brands at AED 150 to 200 each, that is AED 450 to 600 spent feeling uncomfortable. GUTSY costs less than one of those failed experiments, but it is designed to be the last one you try.
          </p>
          <p className="text-xs font-black uppercase tracking-widest opacity-40">
            Most people spend more money avoiding the solution than solving it.
          </p>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto text-center font-gutsy">
        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest mb-20">Two flavours. <br/> Zero compromises.</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="group cursor-pointer text-left" onClick={scrollToJoin}>
            <div className="bg-[#f9f5f0] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              <img src={vanillaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-1000" alt="Vanilla Calm" />
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-4xl font-black uppercase tracking-tighter">Vanilla Calm</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">23g protein • 132 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">Hydrolysed pea and rice protein. Reishi for calm. Designed to sit lighter. Real vanilla taste.</p>
            </div>
          </div>
          <div className="group cursor-pointer text-left" onClick={scrollToJoin}>
            <div className="bg-[#f5f5f5] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              <img src={cocoaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-1000" alt="Cacao Boost" />
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-4xl font-black uppercase tracking-tighter">Cacao Boost</h4>
              <p className="font-black text-xs text-g
