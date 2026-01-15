import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Instagram, Mail, Clock } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoImg from "@/assets/images/logo-black.svg";
import squiggleImg from "@/assets/images/squiggle.png";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Kinetic Engine: Mouse and Scroll tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      return res.json();
    },
  });
  const waitlistCount = countData?.count || 128;

  const rewards = [
    { tier: "Top 500", icon: "🥉", perk: "Early access 48hrs before launch + 15% off first order", color: "#ffb300" },
    { tier: "Top 100", icon: "🥈", perk: "Launch-day priority delivery + 20% off first order + early access to new flavours", color: "#ff5200" },
    { tier: "Top 50", icon: "🥇", perk: "Launch-day priority delivery + 25% off first order + early access to new flavours + exclusive content", color: "#890eff" },
    { tier: "Top 10", icon: "💎", subtitle: "Inner Circle", perk: "Private WhatsApp group with Lakshmi. Behind-the-scenes updates, influence product decisions, and ask anything. First 100 waitlist members only.", color: "#f20028" },
  ];

  const howItWorks = [
    { step: "1", title: "Join the waitlist", desc: "Enter your email to secure your spot" },
    { step: "2", title: "Share your unique link", desc: "Get a personal referral link to share" },
    { step: "3", title: "Every 3 sign-ups = move up 5 spots", desc: "The more you share, the higher you climb" },
    { step: "4", title: "Top referrers get perks", desc: "Unlock rewards as you climb the ranks" },
  ];

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden selection:bg-[#f20028] selection:text-white uppercase">

      {/* 1. STICKY NAV PILL */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl bg-white/70 backdrop-blur-xl rounded-full px-8 py-3 flex justify-between items-center border border-black/5 shadow-xl">
        <img src={logoImg} alt="Gutsy" className="h-6 md:h-8" />
        <a href="#join" className="bg-[#f20028] text-white px-6 py-2 rounded-full text-[10px] font-black hover:bg-black transition-all">
          JOIN THE WAITLIST
        </a>
      </nav>

      {/* 2. BURST HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-visible">
        
        {/* Layer 1: Background Depth Text */}
        <div 
          style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-80"
        >
          <h1 className="text-[28vw] font-black text-white leading-none tracking-tighter">LIGHT</h1>
        </div>

        {/* Layer 2: The Burst Subject (Biker) */}
        <div 
          style={{ transform: `translate(${mousePos.x * -25}px, ${(mousePos.y * -25) + (scrollY * 0.1)}px) rotate(-4deg)` }}
          className="relative z-20 w-[85vw] md:w-[48vw] transition-transform duration-300 ease-out"
        >
          <img src={bikerImg} className="w-full h-auto drop-shadow-[0_45px_55px_rgba(0,0,0,0.18)]" alt="Gutsy Biker" />
          <img src={squiggleImg} className="absolute -top-10 -left-10 w-24 opacity-80 animate-pulse" />
        </div>

        {/* Layer 3: Overlay Typography */}
        <div 
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center"
        >
          <h2 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tightest mt-[10vh]">
            <span className="block text-black">The lightest</span>
            <span className="block text-transparent italic [webkit-text-stroke:2px_black] md:[webkit-text-stroke:4px_black]">protein in the world</span>
          </h2>
        </div>

        {/* Hero CTA Block */}
        <div className="absolute bottom-12 left-0 w-full flex flex-col items-center z-50 px-6">
          <p className="max-w-md text-center text-sm md:text-xl font-bold opacity-60 mb-10 normal-case leading-snug">
            No bloat. No regret. Just clean fuel.
          </p>
          <div id="join" className="w-full max-w-lg">
             <EmailForm />
             <p className="mt-6 text-center font-black text-[10px] tracking-widest opacity-40 flex items-center justify-center gap-2">
               <Clock className="w-3 h-3" /> Launching January 1, 2026 • {waitlistCount.toLocaleString()}+ Obsessives Joined
             </p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM / SOLUTION BLOCK */}
      <section className="py-32 px-10 bg-black text-white text-center relative z-40">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase">Your gut called. It's tired of heavy proteins.</h2>
          <p className="text-xl md:text-2xl font-bold opacity-60 normal-case leading-relaxed">
            Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for. No digestive gymnastics required.
          </p>
        </div>
      </section>

      {/* 4. PRODUCT TEASE */}
      <section className="py-32 px-10 bg-[#f3eee4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black italic mb-20 tracking-tighter text-center">Two flavours. Zero compromises.</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vanilla Calm */}
            <div className="bg-white p-10 rounded-[3rem] border-4 border-black hover:bg-accent transition-all duration-500">
              <div className="aspect-square bg-[#f3eee4] rounded-[2rem] mb-8 flex items-center justify-center overflow-hidden">
                <img src={vanillaImg} alt="Vanilla Calm" className="w-3/4 object-contain" />
              </div>
              <h3 className="text-4xl font-black mb-4">Vanilla Calm</h3>
              <p className="font-black text-sm mb-6 bg-black text-white inline-block px-3 py-1">23G PROTEIN • 132 KCAL</p>
              <p className="text-lg font-bold opacity-70 normal-case leading-relaxed">Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.</p>
            </div>
            {/* Cacao Boost */}
            <div className="bg-white p-10 rounded-[3rem] border-4 border-black hover:bg-primary hover:text-white transition-all duration-500">
              <div className="aspect-square bg-black rounded-[2rem] mb-8 flex items-center justify-center overflow-hidden">
                <img src={cocoaImg} alt="Cacao Boost" className="w-3/4 object-contain" />
              </div>
              <h3 className="text-4xl font-black mb-4">Cacao Boost</h3>
              <p className="font-black text-sm mb-6 bg-[#f20028] text-white inline-block px-3 py-1">22G PROTEIN • 137 KCAL</p>
              <p className="text-lg font-bold opacity-70 normal-case leading-relaxed">Natural caffeine kick. Rich, smooth, no chalky aftertaste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REFERRAL MECHANIC */}
      <section className="py-32 px-10 bg-white rounded-[4rem] mx-4 shadow-2xl relative z-40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-9xl font-black italic tracking-tightest leading-none">SKIP THE <br/> <span className="text-[#f20028]">QUEUE.</span></h2>
            <div className="max-w-md text-right">
              <p className="font-black text-sm tracking-widest mb-4">EVERY 3 SIGN-UPS = MOVE UP 5 SPOTS</p>
              <p className="font-bold opacity-50 normal-case">Top referrers get the best perks. No purchase required. Just share what you actually believe in.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward, i) => (
              <div key={i} className="border-4 border-black p-8 group hover:bg-black hover:text-white transition-all">
                <div className="text-3xl mb-4">{reward.icon}</div>
                <h3 className="text-2xl font-black mb-2 uppercase" style={{ color: reward.color }}>{reward.tier}</h3>
                {reward.subtitle && <p className="font-black text-[10px] tracking-widest mb-4 opacity-50">{reward.subtitle}</p>}
                <p className="font-bold text-sm leading-relaxed opacity-70 normal-case">{reward.perk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER NOTE */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <img src={meditationImg} className="w-full md:w-1/2 rounded-[3rem] grayscale" alt="Founder" />
          <div className="space-y-8">
            <h2 className="text-5xl font-black italic tracking-tight">WHY WE BUILT THIS</h2>
            <p className="text-xl font-bold opacity-60 normal-case leading-relaxed">
              We got tired of choosing between protein that works and protein that doesn't wreck your stomach. So we spent eight months obsessing over digestion science, taste-testing 47 samples, and annoying every gut health expert we could find.
            </p>
            <p className="text-xl font-bold opacity-60 normal-case leading-relaxed">
              GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.
            </p>
            <p className="font-black text-2xl italic tracking-tighter">— LAKSHMI, FOUNDER</p>
          </div>
        </div>
      </section>

      {/* 7. SECOND EMAIL CAPTURE */}
      <section className="py-32 px-6 bg-[#f20028] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Be first. Save more.</h2>
          <p className="text-xl font-bold opacity-80 normal-case">Join the waitlist and lock in launch pricing. Plus early access before we go live in Dubai.</p>
          <div className="max-w-lg mx-auto bg-white/10 p-4 rounded-[2rem] border border-white/20">
            <Countdown />
          </div>
          <div className="max-w-lg mx-auto">
            <EmailForm />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-32 px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-black italic mb-20 text-center tracking-tighter">FAQ</h2>
          <div className="space-y-4">
            {/* Add your FAQ mapping here using the setOpenFaq state */}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-20 px-10 bg-black text-white text-center space-y-12 rounded-t-[4rem]">
        <img src={logoImg} className="h-10 mx-auto invert" alt="GUTSY" />
        <p className="font-black text-xl italic tracking-tightest uppercase opacity-40">Made in Dubai. Built for gut-health obsessives.</p>
        <div className="flex justify-center gap-10 text-[10px] font-black tracking-[0.4em] opacity-40">
           <a href="https://instagram.com/gutsyprotein">IG: @GUTSYPROTEIN</a>
           <a href="mailto:hello@gutsyprotein.com">HELLO@GUTSYPROTEIN.COM</a>
        </div>
        <p className="text-[9px] font-black opacity-20 tracking-widest">© 2026 GUTSY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
