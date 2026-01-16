import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock, ArrowRight, MapPin, Instagram, Mail, Medal, Trophy, Gem, Microscope } from "lucide-react";
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
    { tier: "Top 500", icon: <Medal className="w-5 h-5" />, perk: "Early access 48hrs before launch + 15% off first order" },
    { tier: "Top 100", icon: <Trophy className="w-5 h-5" />, perk: "Launch-day priority delivery + 20% off first order + early flavour access" },
    { tier: "Top 50", icon: <Trophy className="w-5 h-5" />, perk: "25% off first order + early flavour access + exclusive content" },
    { tier: "Top 10", icon: <Gem className="w-5 h-5 text-gutsyRed" />, perk: "Inner Circle: Private WhatsApp with Lakshmi + Behind-the-scenes influence" },
  ];

  const faqs = [
    { 
      q: "When does it launch?", 
      a: "January 2026. Waitlist members get exclusive first dibs 48 hours before the public launch."
    },
    { 
      q: "Is it actually easy to digest?", 
      a: "Yes. Most proteins sit like a brick because they are hard to break down. We use enzymatically pre-broken peptides that your body absorbs instantly. No bloat, no regret."
    },
    { 
      q: "What's in the bag?", 
      a: "A clean pea and rice protein base. No artificial sweeteners, no soy, no dairy, and zero gums. We'll drop the full clinical label at launch."
    },
    { 
      q: "Where do you ship?", 
      a: "We are launching exclusively in Dubai and the UAE to start, with international expansion coming soon."
    },
  ];

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy antialiased selection:bg-gutsyRed selection:text-white overflow-x-hidden">
      <WaitlistPopup />

      {/* 1. NAVIGATION */}
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

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase">
            The lightest <br />
            <span className="text-gutsyRed font-normal lowercase">protein in</span> <br />
            the world
          </h1>
          <p className="mt-8 text-lg md:text-2xl font-black uppercase tracking-widest opacity-60">
            No bloat. No regret. Just clean fuel.
          </p>
          
          <div ref={joinRef} className="mt-12 w-full max-w-lg mx-auto">
            <div className="mb-10 p-8 bg-white/40 rounded-[2.5rem] border border-black/5 backdrop-blur-sm shadow-premium">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Launching January 1, 2026</p>
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

      {/* 3. PROBLEM/SOLUTION: Editorial Depth */}
      <section className="py-40 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <h3 className="text-5xl md:text-[7rem] font-black uppercase tracking-tightest leading-[0.85]">
            Your Gut <br /> 
            <span className="text-gutsyRed italic font-normal lowercase">Is Finally</span> <br /> 
            At Peace.
          </h3>
          <div className="max-w-3xl space-y-10">
            <p className="text-xl md:text-2xl font-medium uppercase tracking-tight opacity-60 leading-relaxed">
              Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for.
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

      {/* 4. PRODUCT TEASE */}
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
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.</p>
            </div>
          </div>
          <div className="group cursor-pointer text-left" onClick={scrollToJoin}>
            <div className="bg-[#f5f5f5] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              <img src={cocoaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-1000" alt="Cacao Boost" />
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-4xl font-black uppercase tracking-tighter">Cacao Boost</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">22g protein • 137 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">Natural caffeine kick. Rich, smooth, no chalky aftertaste.</p>
            </div>
          </div>
        </div>
        <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Vegan • Clean label • Made for people who read ingredient lists.</p>
      </section>

      {/* 5. REWARDS: Visual Progression */}
      <section className="py-32 px-6 bg-gutsyBlack text-gutsyCream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 space-y-4">
             <h3 className="text-6xl md:text-[8rem] font-black uppercase tracking-tightest">The Rewards</h3>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Refer 3 friends • Move up 5 spots</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {rewards.map((reward, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">{reward.icon}</div>
                <h4 className="text-xl font-black uppercase mb-2">{reward.tier}</h4>
                <p className="text-[10px] uppercase font-medium opacity-50 leading-relaxed">{reward.perk}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[10px] font-black uppercase tracking-widest opacity-40 italic text-center">No purchase required. Just share what you actually believe in.</p>
        </div>
      </section>

      {/* 6. FOUNDER NOTE */}
      <section className="py-32 px-6 bg-gutsyCream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <img src={meditationImg} className="rounded-[4rem] grayscale opacity-80" alt="Lakshmi" />
          <div className="space-y-10">
            <h3 className="text-5xl font-black uppercase tracking-tighter">Why we built this</h3>
            <div className="space-y-6 text-lg font-medium uppercase tracking-tight opacity-70 leading-relaxed">
              <p>We got tired of choosing between protein that works and protein that doesn't wreck your stomach.</p>
              <p>GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.</p>
            </div>
            <p className="text-gutsyRed font-black uppercase tracking-[0.2em] text-2xl">— Lakshmi, Founder</p>
          </div>
        </div>
      </section>

      {/* 7. SECONDARY CTA */}
      <section className="py-32 px-6 bg-gutsyRed text-white text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest leading-tight">Be first. Save more.</h3>
          <p className="text-sm font-black uppercase tracking-widest opacity-80">Join the waitlist and lock in launch pricing + early access before we go live in Dubai.</p>
          <EmailForm buttonText="Count me in" />
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">No spam. Just launch updates and the occasional gut health nerd-out.</p>
        </div>
      </section>

      {/* 8. ESSENTIAL FAQ SECTION */}
      <section className="py-32 px-6 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-black uppercase tracking-tightest mb-16 text-center">Common Doubts</h3>
          <div className="divide-y divide-black/5">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center text-left group">
                  <span className="text-xl font-black uppercase group-hover:text-gutsyRed transition-colors">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-gutsyBlack text-gutsyCream py-24 px-6 text-center">
        <div className="space-y-12">
          <img src={logoBlack} alt="GUTSY" className="h-8 mx-auto invert opacity-20" />
          <p className="font-black uppercase tracking-widest text-[10px] opacity-40">Made in Dubai. Built for gut-health obsessives.</p>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            <a href="https://instagram.com/gutsyprotein" target="_blank" className="hover:text-gutsyRed transition-colors">@gutsyprotein</a>
            <a href="mailto:hello@gutsyprotein.com" className="hover:text-gutsyRed transition-colors">hello@gutsyprotein.com</a>
          </div>
          <p className="text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY PROVISIONS</p>
        </div>
      </footer>
    </div>
  );
}
