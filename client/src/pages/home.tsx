import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";
import logoWhite from "@/assets/images/Gutsy Logomark white.svg";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Subtle kinetic effects (Graza-style, not aggressive)
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
    <div className="min-h-screen bg-[#f3eee4] font-['Uto'] antialiased overflow-x-hidden selection:bg-[#f20028] selection:text-[#f3eee4]">

      {/* FLOATING NAV */}
      <nav className="fixed top-5 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] md:w-[90%] max-w-5xl bg-[#fffef9]/90 backdrop-blur-sm rounded-[2rem] px-5 md:px-8 py-3 md:py-4 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#000]/5">
        <img src={logoBlack} alt="Gutsy" className="h-7 md:h-9" />
        <a href="#join" className="bg-[#f20028] text-[#fffef9] px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-wide hover:bg-[#560033] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          Join Waitlist
        </a>
      </nav>

      {/* HERO - Graza-inspired warmth */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 md:pt-24 px-5 md:px-8 overflow-visible bg-gradient-to-b from-[#fffef9] to-[#f3eee4]">
        
        {/* Subtle background text */}
        <div 
          style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
        >
          <h1 className="text-[32vw] md:text-[28vw] font-black text-[#000] leading-none tracking-tighter uppercase">GUTSY</h1>
        </div>

        {/* Hero image - less aggressive parallax */}
        <div 
          style={{ transform: `translate(${mousePos.x * -12}px, ${(mousePos.y * -12) + (scrollY * 0.05)}px) rotate(-2deg)` }}
          className="relative z-20 w-[85vw] md:w-[45vw] transition-transform duration-500 ease-out"
        >
          <img src={bikerImg} className="w-full h-auto drop-shadow-[0_15px_30px_rgba(86,0,51,0.12)]" alt="Gutsy Biker" />
        </div>

        {/* Hero copy */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center px-5">
          <h2 className="font-black leading-[0.88] tracking-tight mb-6 md:mb-8">
            <span className="block text-[15vw] md:text-[8rem] text-[#000] uppercase">The lightest</span>
            <span className="block text-[15vw] md:text-[8rem] text-[#f20028] uppercase italic">protein in</span>
            <span className="block text-[15vw] md:text-[8rem] text-[#000] uppercase">the world</span>
          </h2>
        </div>

        {/* CTA section */}
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full flex flex-col items-center z-50 px-5 md:px-8">
          <p className="max-w-sm md:max-w-lg text-center text-base md:text-2xl font-bold text-[#560033] mb-8 md:mb-12 normal-case leading-relaxed">
            No bloat. No regret. Just clean fuel for people who move.
          </p>
          <div id="join" className="w-full max-w-xl">
             <EmailForm />
             <p className="mt-5 md:mt-6 text-center font-bold text-[10px] md:text-[11px] tracking-wide text-[#560033]/50 flex items-center justify-center gap-3 flex-wrap uppercase">
               <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Launching Jan 1, 2026</span>
               <span className="hidden md:inline">·</span>
               <span>{waitlistCount.toLocaleString()} joined</span>
             </p>
          </div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION - warm dark section */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#560033] text-[#fffef9] text-center relative">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tight uppercase leading-tight text-[#ff7cff]">
            Your gut called.<br/>It's tired of heavy proteins.
          </h2>
          <p className="text-lg md:text-2xl font-medium opacity-80 normal-case leading-relaxed max-w-3xl mx-auto">
            Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for. No digestive gymnastics required.
          </p>
        </div>
      </section>

      {/* PRODUCT CARDS - softer approach */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#f3eee4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black italic mb-16 md:mb-24 tracking-tight text-center uppercase leading-tight text-[#560033]">
            Two flavours.<br/>Zero compromises.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
            {/* Vanilla */}
            <div className="bg-[#fffef9] p-8 md:p-12 rounded-[2.5rem] border-3 border-[#560033] hover:shadow-[8px_8px_0_rgba(86,0,51,0.15)] transition-all duration-300 cursor-pointer group">
              <div className="aspect-square bg-[#f3eee4] rounded-[2rem] mb-8 flex items-center justify-center overflow-hidden relative">
                <img src={vanillaImg} alt="Vanilla Calm" className="w-3/4 object-contain group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-[#ffb300] text-[#560033] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">New</div>
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 uppercase text-[#560033]">Vanilla Calm</h3>
              <p className="font-black text-xs md:text-sm mb-5 md:mb-6 bg-[#560033] text-[#fffef9] inline-block px-3 py-1.5 rounded-lg uppercase tracking-wide">23g protein • 132 kcal</p>
              <p className="text-base md:text-xl font-medium text-[#560033]/70 normal-case leading-relaxed">
                Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.
              </p>
            </div>
            
            {/* Cacao */}
            <div className="bg-[#fffef9] p-8 md:p-12 rounded-[2.5rem] border-3 border-[#f20028] hover:shadow-[8px_8px_0_rgba(242,0,40,0.15)] transition-all duration-300 cursor-pointer group">
              <div className="aspect-square bg-[#560033] rounded-[2rem] mb-8 flex items-center justify-center overflow-hidden relative">
                <img src={cocoaImg} alt="Cacao Boost" className="w-3/4 object-contain group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-[#ff5200] text-[#fffef9] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">New</div>
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 uppercase text-[#560033]">Cacao Boost</h3>
              <p className="font-black text-xs md:text-sm mb-5 md:mb-6 bg-[#f20028] text-[#fffef9] inline-block px-3 py-1.5 rounded-lg uppercase tracking-wide">22g protein • 137 kcal</p>
              <p className="text-base md:text-xl font-medium text-[#560033]/70 normal-case leading-relaxed">
                Natural caffeine kick. Rich, smooth, no chalky aftertaste.
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="font-black text-xs md:text-sm uppercase tracking-widest text-[#560033]/40">
              Vegan · Clean label · Made for people who read ingredient lists
            </p>
          </div>
        </div>
      </section>

      {/* REFERRAL SECTION - playful but warm */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#fffef9] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#ff7cff]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#00b453]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <h2 className="text-6xl md:text-[8rem] font-black italic tracking-tight leading-[0.9] uppercase">
              Skip the<br/>
              <span className="text-[#f20028]">queue</span>
            </h2>
            <div className="max-w-md md:text-right space-y-4">
              <div className="inline-block bg-[#560033] text-[#fffef9] px-4 py-2 rounded-2xl">
                <p className="font-black text-sm uppercase tracking-wide">Every 3 sign-ups = move up 5 spots</p>
              </div>
              <p className="font-medium text-base text-[#560033]/60 normal-case leading-relaxed">
                Top referrers get the best perks. No purchase required. Just share what you actually believe in.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {rewards.map((reward, i) => (
              <div 
                key={i} 
                className="bg-[#f3eee4] border-3 border-[#560033] p-7 md:p-9 rounded-[2rem] hover:bg-[#560033] hover:text-[#fffef9] transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                style={{ 
                  boxShadow: `4px 4px 0 ${reward.color}`,
                }}
              >
                <div className="text-3xl md:text-4xl mb-4">{reward.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black mb-2 uppercase group-hover:text-[#fffef9]" style={{ color: reward.color }}>
                  {reward.tier}
                </h3>
                {reward.subtitle && (
                  <p className="font-black text-[10px] uppercase tracking-widest mb-4 opacity-50">
                    {reward.subtitle}
                  </p>
                )}
                <p className="font-medium text-sm leading-relaxed opacity-70 normal-case">
                  {reward.perk}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE - personal, warm */}
      <section className="py-24 md:py-36 px-6 md:px-8 bg-[#f3eee4]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-[#890eff]/10 rounded-[3rem] blur-2xl"></div>
            <img 
              src={meditationImg} 
              className="relative w-full rounded-[2.5rem] border-3 border-[#560033] shadow-[8px_8px_0_rgba(86,0,51,0.1)]" 
              alt="Founder" 
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tight uppercase text-[#560033]">
              Why we built this
            </h2>
            <p className="text-lg md:text-2xl font-medium text-[#560033]/70 normal-case leading-relaxed">
              We got tired of choosing between protein that works and protein that doesn't wreck your stomach. So we spent eight months obsessing over digestion science, taste-testing 47 samples, and annoying every gut health expert we could find.
            </p>
            <p className="text-lg md:text-2xl font-medium text-[#560033]/70 normal-case leading-relaxed">
              GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.
            </p>
            <p className="font-black text-2xl md:text-3xl italic tracking-tight uppercase text-[#f20028]">
              — Lakshmi, Founder
            </p>
          </div>
        </div>
      </section>

      {/* SECOND CTA - punchy accent section */}
      <section className="py-24 md:py-36 px-6 bg-[#ff5200] text-[#fffef9] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fffef9 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tight uppercase leading-tight">
            Be first.<br/>Save more.
          </h2>
          <p className="text-xl md:text-2xl font-medium opacity-90 normal-case max-w-2xl mx-auto leading-relaxed">
            Join the waitlist and lock in launch pricing. Plus early access before we go live in Dubai.
          </p>
          <div className="max-w-lg mx-auto bg-[#560033]/20 backdrop-blur-sm p-5 rounded-[2rem] border border-[#fffef9]/20">
            <Countdown />
          </div>
          <div className="max-w-xl mx-auto">
            <EmailForm variant="light" />
          </div>
        </div>
      </section>

      {/* FAQ - clean, readable */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-[#fffef9]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black italic mb-16 md:mb-24 text-center tracking-tight uppercase text-[#560033]">
            Questions?
          </h2>
          <div className="space-y-4 md:space-y-5">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border-2 border-[#560033] rounded-[1.5rem] overflow-hidden bg-[#f3eee4] hover:bg-[#fffef9] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 md:p-8 flex justify-between items-center text-left gap-4"
                >
                  <span className="font-black text-lg md:text-2xl uppercase text-[#560033]">{faq.q}</span>
                  <ChevronDown 
                    className={`w-6 h-6 md:w-7 md:h-7 flex-shrink-0 transition-transform text-[#560033] ${openFaq === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                    <p className="font-medium text-[#560033]/70 normal-case text-base md:text-xl leading-relaxed border-t-2 border-[#560033]/10 pt-5 md:pt-6">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - warm dark */}
      <footer className="py-16 md:py-24 px-6 md:px-10 bg-[#560033] text-[#fffef9] text-center space-y-10 md:space-y-14 rounded-t-[3rem]">
        <img src={logoWhite} className="h-10 md:h-12 mx-auto" alt="GUTSY" />
        <p className="font-black text-lg md:text-2xl italic tracking-tight uppercase opacity-60">
          Made in Dubai. Built for gut-health obsessives.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-[10px] md:text-[11px] font-bold tracking-wider opacity-50 uppercase">
           <a href="https://instagram.com/gutsyprotein" className="hover:opacity-100 transition-opacity">
             IG: @gutsyprotein
           </a>
           <a href="mailto:hello@gutsyprotein.com" className="hover:opacity-100 transition-opacity">
             hello@gutsyprotein.com
           </a>
        </div>
        <p className="text-[9px] md:text-[10px] font-bold opacity-30 tracking-widest uppercase">
          © 2026 Gutsy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
