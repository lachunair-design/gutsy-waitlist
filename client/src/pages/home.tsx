import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock, ArrowRight, MapPin, Trophy, Gem, Medal } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

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

  const launchDate = "2026-01-01T00:00:00"; // Launching January 1, 2026

  const rewards = [
    { tier: "Top 500", icon: <Medal className="w-5 h-5 text-[#ffb300]" />, perk: "Early access 48hrs before launch + 15% off first order", color: "border-gutsyYellow" },
    { tier: "Top 100", icon: <Trophy className="w-5 h-5 text-[#ff5200]" />, perk: "Launch-day priority delivery + 20% off first order + early access to new flavours", color: "border-gutsyOrange" },
    { tier: "Top 50", icon: <Trophy className="w-5 h-5 text-[#890eff]" />, perk: "Launch-day priority delivery + 25% off first order + early access to new flavours + exclusive content", color: "border-gutsyPurple" },
    { tier: "Top 10 - Inner Circle", icon: <Gem className="w-5 h-5 text-gutsyRed" />, perk: "Private WhatsApp group with Lakshmi. Behind-the-scenes updates, influence product decisions, and ask anything. First 100 waitlist members only.", color: "border-gutsyRed" },
  ];

  const faqs = [
    { q: "When does it launch?", a: "January 2026. Waitlist gets first dibs." },
    { q: "Where do you ship?", a: "Dubai and UAE to start. Expanding soon." },
    { q: "What's actually in it?", a: "Pea and rice protein base. No artificial sweeteners, no soy, no dairy, no nonsense. Full ingredient list drops at launch." },
    { q: "Is it actually easy to digest?", a: "Yes. The peptides are pre-broken, so your gut doesn't have to work overtime. If you usually bloat on protein, this won't do that." },
    { q: "How do I use it?", a: "Mix with water, milk, or whatever you're into. Works in smoothies, oats, or straight up in a shaker." },
    { q: "How does the referral system work?", a: "Share your unique link. When someone signs up through it, you both move up. Every 3 successful referrals moves you up 5 spots. Track your progress anytime on your personal dashboard." },
    { q: "What's 'Inner Circle'?", a: "Top 10 referrers get added to a private WhatsApp group with Lakshmi. Get behind-the-scenes updates on building GUTSY, vote on new flavours, ask questions about gut health or business, and influence what we build next. It's a small group (first 100 waitlist members only), so you get real access and real influence." },
    { q: "When do rewards get delivered?", a: "Launch day perks kick in when we go live in January 2026. Early access means you get notified 48 hours before public launch. Inner Circle WhatsApp invites go out in the first week of launch." },
    { q: "Can I lose my position?", a: "Nope. You only move up, never down." },
  ];

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack selection:bg-gutsyRed selection:text-white font-gutsy overflow-x-hidden">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <div className="flex flex-col">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-7" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mt-1 flex items-center gap-1">
            <MapPin className="w-2 h-2" /> Born in Dubai
          </span>
        </div>
        <button onClick={scrollToJoin} className="btn-pill scale-90 md:scale-100">
          Join the waitlist
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="relative z-10 max-w-5xl">
          <h2 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase">
            The lightest <br />
            <span className="text-gutsyRed">protein in</span> <br />
            the world
          </h2>
          <p className="mt-8 text-lg md:text-2xl font-black uppercase tracking-widest opacity-70">
            No bloat. No regret. Just clean fuel.
          </p>
          
          <div ref={joinRef} className="mt-12 w-full max-w-lg mx-auto">
            <div className="mb-10 p-8 bg-white/40 rounded-[2.5rem] border border-black/5 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">
                Launching January 1, 2026
              </p>
              <Countdown targetDate={launchDate} />
            </div>
            <EmailForm buttonText="Join the waitlist" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[45vw] md:w-[25vw] pointer-events-none">
          <img src={bikerImg} alt="" className="w-full h-auto grayscale-[15%]" />
        </div>
      </section>

      {/* PROBLEM/SOLUTION BLOCK */}
      <section className="py-32 px-6 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center text-left">
          <div className="space-y-8">
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest leading-none">
              Your gut called. <br />
              <span className="text-gutsyRed">It's tired of</span> <br />
              heavy proteins.
            </h3>
            <p className="text-lg md:text-xl font-medium uppercase tracking-tight opacity-70 leading-relaxed">
              Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for. No digestive gymnastics required.
            </p>
          </div>
          <div className="bg-gutsyCream rounded-[4rem] aspect-square flex items-center justify-center overflow-hidden">
             <img src={meditationImg} className="w-full h-full object-cover grayscale opacity-60" />
          </div>
        </div>
      </section>

      {/* PRODUCT TEASE */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center font-gutsy">
        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest mb-20">Two flavours. <br/> Zero compromises.</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="group cursor-pointer" onClick={scrollToJoin}>
            <div className="bg-[#f9f5f0] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              <img src={vanillaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-700" alt="Vanilla Calm" />
            </div>
            <div className="mt-8 text-left px-4">
              <h4 className="text-4xl font-black uppercase tracking-tighter">Vanilla Calm</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">23g protein • 132 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50">Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.</p>
            </div>
          </div>
          <div className="group cursor-pointer" onClick={scrollToJoin}>
            <div className="bg-[#f5f5f5] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              <img src={cocoaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-700" alt="Cacao Boost" />
            </div>
            <div className="mt-8 text-left px-4">
              <h4 className="text-4xl font-black uppercase tracking-tighter">Cacao Boost</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">22g protein • 137 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50">Natural caffeine kick. Rich, smooth, no chalky aftertaste.</p>
            </div>
          </div>
        </div>
        <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Vegan. Clean label. Made for people who read ingredient lists.</p>
      </section>

      {/* HOW THE WAITLIST WORKS / REWARDS */}
      <section className="py-32 px-6 bg-gutsyBlack text-gutsyCream text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-6xl md:text-[8rem] font-black uppercase tracking-tightest mb-12">Skip the queue</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 opacity-80 uppercase text-[10px] font-black tracking-widest">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full border border-gutsyCream/20 flex items-center justify-center mx-auto text-lg">1</div>
              <p>Join the waitlist</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full border border-gutsyCream/20 flex items-center justify-center mx-auto text-lg">2</div>
              <p>Share your unique link</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full border border-gutsyCream/20 flex items-center justify-center mx-auto text-lg">3</div>
              <p>Every 3 sign-ups = you move up 5 spots</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {rewards.map((reward, i) => (
              <div key={i} className={`card-premium bg-white/5 border-l-8 ${reward.color} text-left flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 transition-all hover:bg-white/10`}>
                <div className="flex items-center gap-6">
                  {reward.icon}
                  <div>
                    <h4 className="text-2xl font-black uppercase">{reward.tier}</h4>
                    <p className="text-sm font-medium uppercase opacity-60 mt-1">{reward.perk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[10px] font-black uppercase tracking-widest opacity-40">No purchase required. Just share what you actually believe in.</p>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="py-32 px-6 bg-gutsyCream text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-5xl font-black uppercase tracking-tightest">Why we built this</h3>
          <div className="space-y-8 text-xl font-medium uppercase tracking-tight opacity-70 leading-relaxed">
            <p>We got tired of choosing between protein that works and protein that doesn't wreck your stomach. So we spent eight months obsessing over digestion science, taste-testing 47 samples, and annoying every gut health expert we could find.</p>
            <p>GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.</p>
          </div>
          <p className="text-gutsyRed font-black uppercase tracking-[0.2em] text-2xl">— Lakshmi, Founder</p>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="py-32 px-6 bg-gutsyYellow text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tightest">Be first. Save more.</h3>
          <p className="text-sm font-black uppercase tracking-widest opacity-60">Join the waitlist and lock in launch pricing. Plus early access before we go live in Dubai.</p>
          <EmailForm buttonText="Count me in" />
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">No spam. Just launch updates and the occasional gut health nerd-out.</p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 px-6 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-black uppercase tracking-tightest mb-16 text-center">Questions?</h3>
          <div className="divide-y divide-black/5">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center text-left">
                  <span className="text-xl font-black uppercase">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gutsyBlack text-gutsyCream py-24 px-6 text-center font-gutsy">
        <div className="space-y-12">
          <img src={logoBlack} alt="GUTSY" className="h-8 mx-auto invert opacity-20" />
          <p className="font-black uppercase tracking-widest text-[10px] opacity-40">Made in Dubai. Built for gut-health obsessives.</p>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            <a href="https://instagram.com/gutsyprotein" target="_blank">IG: @gutsyprotein</a>
            <a href="mailto:hello@gutsyprotein.com">hello@gutsyprotein.com</a>
          </div>
          <p className="text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY PROVISIONS</p>
        </div>
      </footer>
    </div>
  );
}
