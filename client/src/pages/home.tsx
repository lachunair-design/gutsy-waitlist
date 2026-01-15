import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock, ArrowRight } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      return res.json();
    },
  });
  const waitlistCount = countData?.count || 1280;

  const rewards = [
    { tier: "Top 500", perk: "Early access + 15% off", color: "border-gutsyYellow" },
    { tier: "Top 100", perk: "Priority delivery + 20% off", color: "border-gutsyOrange" },
    { tier: "Top 50", perk: "Exclusive content + 25% off", color: "border-gutsyPurple" },
    { tier: "Top 10", perk: "Inner Circle WhatsApp Group", color: "border-gutsyRed" },
  ];

  const faqs = [
    { q: "When does it launch?", a: "January 2026. Waitlist gets first dibs." },
    { q: "What's actually in it?", a: "Pea and rice protein base. No artificial sweeteners, no soy, no dairy. Just enzymatically pre-broken peptides." },
    { q: "Is it actually easy to digest?", a: "Yes. If you usually bloat on protein, this won't do that. It's designed specifically for sensitive guts." },
  ];

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack selection:bg-gutsyRed selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. MINIMAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <img src={logoBlack} alt="GUTSY" className="h-6 md:h-8" />
        <a href="#join" className="btn-pill">Join Waitlist</a>
      </nav>

      {/* 2. EDITORIAL HERO - Static & High-End */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
          <h1 className="text-[30vw] font-black uppercase tracking-tightest">GUTSY</h1>
        </div>

        <div className="relative z-10 max-w-5xl">
          <span className="inline-block bg-gutsyYellow px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-8">
            Gut-First Nutrition
          </span>
          <h2 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase italic">
            The Lightest <br />
            <span className="font-serif font-light lowercase text-gutsyRed">protein in</span> <br />
            the world.
          </h2>
          <p className="mt-12 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed italic opacity-70">
            No bloat. No heavy stomach. Just clean fuel for people who move.
          </p>
          
          <div id="join" className="mt-16 w-full max-w-lg mx-auto">
            <EmailForm />
            <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Jan 2026</span>
              <span className="w-1 h-1 bg-black rounded-full" />
              <span>{waitlistCount.toLocaleString()} Joined</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[45vw] md:w-[28vw] z-0 pointer-events-none">
          <img src={bikerImg} alt="" className="w-full h-auto object-contain grayscale-[20%]" />
        </div>
      </section>

      {/* 3. THE "FUN FACT" STRIP */}
      <section className="py-24 border-y border-gutsyBlack/5 bg-[#e8dfd3]/30">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="w-16 h-16 bg-gutsyBlack text-gutsyCream rounded-full flex items-center justify-center mx-auto mb-8 font-serif italic text-2xl">?</div>
          <h3 className="text-3xl md:text-5xl font-serif italic leading-tight">
            Why do other powders bloat you? <br />
            <span className="text-gutsyRed">They aren't pre-broken.</span> Gutsy uses peptides that your body absorbs instantly, bypassing the digestive "brick" feeling.
          </h3>
        </div>
      </section>

      {/* 4. PRODUCT CARDS - Provisions Style */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
        {[
          { name: "Vanilla Calm", img: vanillaImg, color: "bg-[#f9f5f0]", meta: "Adaptogen Blend" },
          { name: "Cacao Boost", img: cocoaImg, color: "bg-[#f5f5f5]", meta: "Natural Caffeine" }
        ].map((prod) => (
          <div key={prod.name} className="group cursor-pointer">
            <div className={`${prod.color} rounded-[3rem] aspect-[4/5] flex items-center justify-center overflow-hidden border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]`}>
              <img src={prod.img} className="w-2/3 group-hover:scale-105 transition-transform duration-700" alt={prod.name} />
            </div>
            <div className="mt-8 flex justify-between items-end px-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter">{prod.name}</h3>
                <p className="text-lg font-serif italic opacity-50">{prod.meta} • 23g Protein</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-gutsyBlack group-hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. REWARDS - The Perk List */}
      <section className="py-32 px-6 bg-[#fffef9] border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tightest mb-20 text-center">Exclusive Perks</h2>
          <div className="space-y-3">
            {rewards.map((reward, i) => (
              <div key={i} className={`card-premium flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-8 ${reward.color}`}>
                <div>
                  <h4 className="text-2xl font-black uppercase">{reward.tier}</h4>
                  <p className="font-serif italic opacity-60">{reward.perk}</p>
                </div>
                <div className="text-xs font-black uppercase tracking-widest opacity-30">Unlock on Launch</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER NOTE */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2">
            <img src={meditationImg} className="rounded-[3rem] border border-black/5" alt="Lakshmi" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Why we built this</h2>
            <p className="text-xl font-medium leading-relaxed italic opacity-70 font-serif">
              "We spent eight months obsessing over digestion science because we were tired of choosing between protein that works and protein that doesn't wreck your gut."
            </p>
            <p className="text-gutsyRed font-black uppercase tracking-widest">— Lakshmi, Founder</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-32 px-6 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tightest mb-12">Doubts?</h2>
          <div className="divide-y divide-black/5">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-xl font-black uppercase">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="mt-4 font-serif italic opacity-60 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gutsyBlack text-gutsyCream py-20 px-6 text-center">
        <img src={logoBlack} alt="GUTSY" className="h-8 mx-auto invert opacity-20 mb-12" />
        <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          <a href="#">Instagram</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
        <p className="mt-12 text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY PROVISIONS</p>
      </footer>
    </div>
  );
}
