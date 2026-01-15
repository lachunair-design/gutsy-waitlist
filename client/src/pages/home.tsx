import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock } from "lucide-react";
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

  // Kinetic Engine: Mouse and Scroll tracking (disabled on mobile for performance)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

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

  const faqs = [
    { q: "When does it launch?", a: "January 2026. Waitlist gets first dibs." },
    { q: "Where do you ship?", a: "Dubai and UAE to start. Expanding soon." },
    { q: "What's actually in it?", a: "Pea and rice protein base. No artificial sweeteners, no soy, no dairy, no nonsense. Full ingredient list drops at launch." },
    { q: "Is it actually easy to digest?", a: "Yes. The peptides are pre-broken, so your gut doesn't have to work overtime. If you usually bloat on protein, this won't do that." },
    { q: "How do I use it?", a: "Mix with water, milk, or whatever you're into. Works in smoothies, oats, or straight up in a shaker." },
    { q: "How does the referral system work?", a: "Share your unique link. When someone signs up through it, you both move up. Every 3 successful referrals moves you up 5 spots. Track your progress anytime on your personal dashboard." },
    { q: "What's 'Inner Circle'?", a: "Top 10 referrers get added to a private WhatsApp group with Lakshmi. Get behind-the-scenes updates on building GUTSY, vote on new flavours, ask questions about gut health or business, and influence what we build next. It's a small group (first 100 waitlist members only), so you get real access and real influence." },
    { q: "When do rewards get delivered?", a: "Launch day perks (discounts, priority delivery, early flavour access) kick in when we go live in January 2026. Early access means you get notified 48 hours before public launch. Inner Circle WhatsApp invites go out in the first week of launch." },
    { q: "Can I lose my position?", a: "Nope. You only move up, never down." },
  ];

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden selection:bg-[#f20028] selection:text-white uppercase">

      {/* 1. STICKY NAV PILL */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-[92%] max-w-6xl bg-white/80 backdrop-blur-xl rounded-full px-4 md:px-8 py-2 md:py-3 flex justify-between items-center border border-black/5 shadow-xl">
        <img src={logoImg} alt="Gutsy" className="h-5 md:h-8" />
        <a href="#join" className="bg-[#f20028] text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black hover:bg-black transition-all duration-300 hover:scale-105 active:scale-95">
          JOIN WAITLIST
        </a>
      </nav>

      {/* 2. BURST HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-16 md:pt-20 px-4 md:px-6 overflow-visible">
        
        {/* Layer 1: Background Depth Text */}
        <div 
          style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-80"
        >
          <h1 className="text-[28vw] md:text-[22vw] font-black text-white leading-none tracking-tighter">LIGHT</h1>
        </div>

        {/* Layer 2: The Burst Subject (Biker) */}
        <div 
          style={{ transform: `translate(${mousePos.x * -25}px, ${(mousePos.y * -25) + (scrollY * 0.1)}px) rotate(-4deg)` }}
          className="relative z-20 w-[90vw] md:w-[48vw] transition-transform duration-300 ease-out"
        >
          <img src={bikerImg} className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] md:drop-shadow-[0_45px_55px_rgba(0,0,0,0.18)]" alt="Gutsy Biker" />
          <img src={squiggleImg} className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-16 md:w-24 opacity-80 animate-pulse" alt="" />
        </div>

        {/* Layer 3: Overlay Typography */}
        <div 
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center px-4"
        >
          <h2 className="text-[14vw] md:text-[10rem] font-black leading-[0.9] tracking-tightest mt-[8vh] md:mt-[10vh]">
            <span className="block text-black">The lightest</span>
            <span className="block text-transparent italic [text-shadow:0_0_2px_rgba(0,0,0,0.1)] [webkit-text-stroke:1.5px_black] md:[webkit-text-stroke:4px_black]">protein in the world</span>
          </h2>
        </div>

        {/* Hero CTA Block */}
        <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center z-50 px-4 md:px-6">
          <p className="max-w-xs md:max-w-md text-center text-xs md:text-xl font-bold opacity-60 mb-6 md:mb-10 normal-case leading-snug">
            No bloat. No regret. Just clean fuel.
          </p>
          <div id="join" className="w-full max-w-lg">
             <EmailForm />
             <p className="mt-4 md:mt-6 text-center font-black text-[9px] md:text-[10px] tracking-widest opacity-40 flex items-center justify-center gap-2 flex-wrap">
               <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Launching January 1, 2026</span>
               <span className="hidden md:inline">•</span>
               <span>{waitlistCount.toLocaleString()}+ Joined</span>
             </p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM / SOLUTION BLOCK */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-black text-white text-center relative z-40">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-10">
          <h2 className="text-3xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">Your gut called. It's tired of heavy proteins.</h2>
          <p className="text-base md:text-2xl font-bold opacity-60 normal-case leading-relaxed">
            Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for. No digestive gymnastics required.
          </p>
        </div>
      </section>

      {/* 4. PRODUCT TEASE */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-[#f3eee4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-8xl font-black italic mb-12 md:mb-20 tracking-tighter text-center leading-tight">Two flavours. Zero compromises.</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Vanilla Calm */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 md:border-4 border-black hover:bg-[#fffbf0] hover:scale-[1.02] transition-all duration-500 cursor-pointer">
              <div className="aspect-square bg-[#f3eee4] rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-8 flex items-center justify-center overflow-hidden">
                <img src={vanillaImg} alt="Vanilla Calm" className="w-3/4 object-contain hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">Vanilla Calm</h3>
              <p className="font-black text-xs md:text-sm mb-4 md:mb-6 bg-black text-white inline-block px-2 md:px-3 py-1 rounded">23G PROTEIN • 132 KCAL</p>
              <p className="text-sm md:text-lg font-bold opacity-70 normal-case leading-relaxed">Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.</p>
            </div>
            {/* Cacao Boost */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 md:border-4 border-black hover:bg-[#f20028] hover:text-white hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
              <div className="aspect-square bg-black rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-8 flex items-center justify-center overflow-hidden">
                <img src={cocoaImg} alt="Cacao Boost" className="w-3/4 object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">Cacao Boost</h3>
              <p className="font-black text-xs md:text-sm mb-4 md:mb-6 bg-[#f20028] text-white inline-block px-2 md:px-3 py-1 rounded group-hover:bg-white group-hover:text-black transition-colors">22G PROTEIN • 137 KCAL</p>
              <p className="text-sm md:text-lg font-bold opacity-70 normal-case leading-relaxed">Natural caffeine kick. Rich, smooth, no chalky aftertaste.</p>
            </div>
          </div>
          <p className="text-center font-black text-xs md:text-sm mt-8 md:mt-12 opacity-40 tracking-wide">VEGAN. CLEAN LABEL. MADE FOR PEOPLE WHO READ INGREDIENT LISTS.</p>
        </div>
      </section>

      {/* 5. REFERRAL MECHANIC */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-white rounded-[3rem] md:rounded-[4rem] mx-3 md:mx-4 my-12 md:my-0 shadow-2xl relative z-40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <h2 className="text-5xl md:text-9xl font-black italic tracking-tightest leading-[0.9]">
              SKIP THE <br/> <span className="text-[#f20028]">QUEUE.</span>
            </h2>
            <div className="max-w-md md:text-right">
              <p className="font-black text-xs md:text-sm tracking-widest mb-3 md:mb-4 bg-black text-white inline-block px-3 py-1 rounded">EVERY 3 SIGN-UPS = MOVE UP 5 SPOTS</p>
              <p className="font-bold opacity-50 normal-case text-sm md:text-base">Top referrers get the best perks. No purchase required. Just share what you actually believe in.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {rewards.map((reward, i) => (
              <div key={i} className="border-2 md:border-4 border-black p-6 md:p-8 group hover:bg-black hover:text-white transition-all duration-300 rounded-xl md:rounded-none cursor-pointer hover:-translate-y-1">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">{reward.icon}</div>
                <h3 className="text-xl md:text-2xl font-black mb-2 uppercase group-hover:text-white transition-colors" style={{ color: reward.color }}>{reward.tier}</h3>
                {reward.subtitle && <p className="font-black text-[9px] md:text-[10px] tracking-widest mb-3 md:mb-4 opacity-50">{reward.subtitle}</p>}
                <p className="font-bold text-xs md:text-sm leading-relaxed opacity-70 normal-case">{reward.perk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER NOTE */}
      <section className="py-20 md:py-32 px-6 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <img src={meditationImg} className="w-full md:w-1/2 rounded-[2rem] md:rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-500" alt="Founder" />
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tight">WHY WE BUILT THIS</h2>
            <p className="text-base md:text-xl font-bold opacity-60 normal-case leading-relaxed">
              We got tired of choosing between protein that works and protein that doesn't wreck your stomach. So we spent eight months obsessing over digestion science, taste-testing 47 samples, and annoying every gut health expert we could find.
            </p>
            <p className="text-base md:text-xl font-bold opacity-60 normal-case leading-relaxed">
              GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.
            </p>
            <p className="font-black text-xl md:text-2xl italic tracking-tighter">— LAKSHMI, FOUNDER</p>
          </div>
        </div>
      </section>

      {/* 7. SECOND EMAIL CAPTURE */}
      <section className="py-20 md:py-32 px-6 bg-[#f20028] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-10">
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">Be first. Save more.</h2>
          <p className="text-base md:text-xl font-bold opacity-80 normal-case">Join the waitlist and lock in launch pricing. Plus early access before we go live in Dubai.</p>
          <div className="max-w-lg mx-auto bg-white/10 p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/20 backdrop-blur-sm">
            <Countdown />
          </div>
          <div className="max-w-lg mx-auto">
            <EmailForm variant="light" />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black italic mb-12 md:mb-20 text-center tracking-tighter">FAQ</h2>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 md:border-4 border-black rounded-xl md:rounded-2xl overflow-hidden hover:bg-[#f3eee4] transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 md:p-8 flex justify-between items-center text-left gap-4"
                >
                  <span className="font-black text-base md:text-2xl">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-8 pb-5 md:pb-8 pt-0">
                    <p className="font-bold opacity-60 normal-case text-sm md:text-lg leading-relaxed border-t-2 border-black/10 pt-4 md:pt-6">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 md:py-20 px-6 md:px-10 bg-black text-white text-center space-y-8 md:space-y-12 rounded-t-[3rem] md:rounded-t-[4rem]">
        <img src={logoImg} className="h-8 md:h-10 mx-auto invert" alt="GUTSY" />
        <p className="font-black text-base md:text-xl italic tracking-tightest uppercase opacity-40">Made in Dubai. Built for gut-health obsessives.</p>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] opacity-40">
           <a href="https://instagram.com/gutsyprotein" className="hover:opacity-100 transition-opacity">IG: @GUTSYPROTEIN</a>
           <a href="mailto:hello@gutsyprotein.com" className="hover:opacity-100 transition-opacity">HELLO@GUTSYPROTEIN.COM</a>
        </div>
        <p className="text-[8px] md:text-[9px] font-black opacity-20 tracking-widest">© 2026 GUTSY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
