import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ArrowRight, MapPin, Medal, Trophy, Gem, Microscope } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";
import WaitlistPopup from "@/components/WaitlistPopup";

// Assets
import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

// Helper for image placeholders
const ImagePlaceholder = ({ className, text }: { className?: string; text?: string }) => (
  <div className={`bg-gutsyBlack/5 flex items-center justify-center border border-dashed border-gutsyBlack/20 ${className}`}>
    <span className="text-[10px] uppercase font-black opacity-20">{text || "Image Loading..."}</span>
  </div>
);

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
    { tier: "1. Join the waitlist", icon: <Medal className="w-5 h-5" />, perk: "Secure your spot in the queue." },
    { tier: "2. Share your unique link", icon: <ArrowRight className="w-5 h-5" />, perk: "Help others find protein that sits light." },
    { tier: "3. Move up 5 spots", icon: <Trophy className="w-5 h-5" />, perk: "Every 3 signups moves you up the list." },
    { tier: "4. Founder pricing", icon: <Gem className="w-5 h-5 text-gutsyRed" />, perk: "First 500 get founder pricing (25% off)." },
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

      <nav className="fixed top-0 w-full z-[100] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <div className="flex flex-col">
          <img src={logoBlack} alt="GUTSY" className="h-5 md:h-8" />
          <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mt-1 flex items-center gap-1">
            <MapPin className="w-2 h-2" /> Born in Dubai
          </span>
        </div>
        <button onClick={scrollToJoin} className="btn-pill px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-xs">
          Join the waitlist
        </button>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center overflow-hidden">
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
            <div className="mb-10 p-6 md:p-8 bg-white/40 rounded-[2.5rem] border border-black/5 backdrop-blur-sm shadow-premium">
              <p className="text-[11px] md:text-sm font-black uppercase mb-6 leading-tight">
                First 500 lock in founder pricing (25% off). After that, it is gone.
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Launching April 1, 2026</p>
              <Countdown />
            </div>
            <EmailForm buttonText="Join the waitlist" placeholder="Enter email for early access" />
            
            {/* SOCIAL PROOF: Center-aligned to fix awkward spacing */}
            <p className="mt-6 text-[10px] font-black uppercase tracking-widest opacity-40 text-center mx-auto">
              Join {waitlistCount.toLocaleString()}+ Health Obsessives
            </p>
          </div>
        </div>

        {/* ILLUSTRATION: Enlarged for mobile impact (85vw) */}
        <div className="absolute bottom-[-5%] right-[-10%] w-[85vw] md:w-[25vw] pointer-events-none opacity-10 md:opacity-100 transition-all duration-1000">
          {bikerImg ? (
            <img src={bikerImg} alt="" className="w-full h-auto grayscale-[20%]" />
          ) : (
            <ImagePlaceholder className="w-full aspect-square rounded-full" text="Biker Visual" />
          )}
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12 md:space-y-16">
          <h3 className="text-5xl md:text-[7rem] font-black uppercase tracking-tightest leading-[0.85]">
            Your Gut <br /> 
            <span className="text-gutsyRed italic font-normal lowercase">Is Finally</span> <br /> 
            At Peace.
          </h3>
          <div className="max-w-3xl space-y-10">
            <p className="text-lg md:text-2xl font-medium uppercase tracking-tight opacity-60 leading-relaxed">
              Most protein powders sit in your stomach like a brick. We use hydrolysed protein, pre-digested before it hits your gut, so your body can absorb it more easily. Designed to sit lighter and be easier on digestion.
            </p>
            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gutsyRed">
                  <Microscope className="w-4 h-4" />
                  Authority in Digestion Science
               </div>
               <p className="text-[10px] md:text-xs font-medium uppercase opacity-40 max-w-md">No digestive gymnastics required. Just science that respects your motility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-gutsyCream border-b border-black/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tightest">How much have you spent on protein that never felt good?</h3>
          <p className="text-base md:text-lg font-medium uppercase opacity-60 leading-relaxed">
            If you have tried three brands at AED 150 to 200 each, that is AED 450 to 600 spent feeling uncomfortable. GUTSY costs less than one of those failed experiments, but it is designed to be the last one you try.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
            Most people spend more money avoiding the solution than solving it.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto text-center font-gutsy">
        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tightest mb-16 md:mb-20">Two flavours. <br/> Zero compromises.</h3>
        <div className="grid md:grid-cols-2 gap-8 md:gap-4">
          <div className="group cursor-pointer text-left" onClick={scrollToJoin}>
            <div className="bg-[#f9f5f0] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              {vanillaImg ? (
                <img src={vanillaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-1000" alt="Vanilla Calm" />
              ) : (
                <ImagePlaceholder className="w-full h-full rounded-[3rem]" text="Vanilla Calm" />
              )}
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Vanilla Calm</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">23g protein • 132 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">Hydrolysed pea and rice protein. Reishi for calm. Designed to sit lighter. Real vanilla taste.</p>
            </div>
          </div>
          <div className="group cursor-pointer text-left" onClick={scrollToJoin}>
            <div className="bg-[#f5f5f5] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-[0.98]">
              {cocoaImg ? (
                <img src={cocoaImg} className="w-2/3 group-hover:scale-105 transition-transform duration-1000" alt="Cacao Boost" />
              ) : (
                <ImagePlaceholder className="w-full h-full rounded-[3rem]" text="Cacao Boost" />
              )}
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Cacao Boost</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">22g protein • 137 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed">Hydrolysed pea and rice protein. Maca for energy. Designed to sit lighter. Smooth, not chalky.</p>
            </div>
          </div>
        </div>
        <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Vegan • Clean label • Made for people who read ingredient lists.</p>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tightest mb-16">I quit protein for 2 years. GUTSY brought me back.</h3>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <p className="text-base md:text-lg font-medium italic">“I’ve tried every vegan protein. They all left me feeling heavy. GUTSY is the first one that feels light. I actually look forward to my post workout shake now.”</p>
              <p className="text-[10px] font-black uppercase opacity-40">Sarah, Dubai (Beta Tester)</p>
            </div>
            <div className="space-y-4">
              <p className="text-base md:text-lg font-medium italic">“Tastes like a milkshake. Sits light. I didn’t think that was possible with protein powder.”</p>
              <p className="text-[10px] font-black uppercase opacity-40">Ahmed, Abu Dhabi (Beta Tester)</p>
            </div>
            <div className="space-y-4">
              <p className="text-base md:text-lg font-medium italic">“I read every label. GUTSY is the cleanest, easiest protein I’ve found. And it actually tastes good.”</p>
              <p className="text-[10px] font-black uppercase opacity-40">Priya, Dubai (Beta Tester)</p>
            </div>
          </div>
          <p className="mt-16 text-[10px] font-black uppercase tracking-widest opacity-30">47 beta testers. 4.8/5 average rating. Launching April 2026.</p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-gutsyBlack text-gutsyCream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 space-y-4 text-center">
             <h3 className="text-5xl md:text-[8rem] font-black uppercase tracking-tightest">How it works</h3>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Refer 3 friends moves you up 5 spots</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
            {rewards.map((reward, i) => (
              <div key={i} className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="mb-6 md:mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">{reward.icon}</div>
                <h4 className="text-lg md:text-xl font-black uppercase mb-2">{reward.tier}</h4>
                <p className="text-[10px] uppercase font-medium opacity-50 leading-relaxed">{reward.perk}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[10px] font-black uppercase tracking-widest opacity-40 italic text-center">No purchase required. Just share if you believe in it.</p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-gutsyCream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {meditationImg ? (
            <img src={meditationImg} className="rounded-[3rem] md:rounded-[4rem] grayscale opacity-80" alt="Lakshmi" />
          ) : (
            <ImagePlaceholder className="w-full aspect-square rounded-[3rem] md:rounded-[4rem]" text="Founder Image" />
          )}
          <div className="space-y-8 md:space-y-10">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Why we built this</h3>
            <div className="space-y-6 text-base md:text-lg font-medium uppercase tracking-tight opacity-70 leading-relaxed">
              <p>I’m Lakshmi. I quit protein powder for two years because every brand, vegan, whey, isolate, fermented, left me feeling bloated.</p>
              <p>I spent eight years scaling food delivery and marketplace businesses across MENA. I know how to build products people want. But I could not find a protein powder I could actually stomach.</p>
              <p>GUTSY is what I wished existed when I quit: hydrolysed protein, pre-digested for faster absorption, designed to sit lighter and be easier on digestion. Clean ingredients. Tastes like something you would actually want to drink.</p>
            </div>
            <p className="text-gutsyRed font-black uppercase tracking-[0.2em] text-xl md:text-2xl">Lakshmi, Founder</p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-gutsyRed text-white text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tightest leading-tight">Be first. Save more.</h3>
          <p className="text-sm font-black uppercase tracking-widest opacity-80">First 500 signups lock in founder pricing (25% off). Everyone else gets 15%.</p>
          <EmailForm buttonText="Count me in" placeholder="Enter email for early access" />
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">No spam. Just launch updates and the occasional gut health nerd-out.</p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white border-t border-black/5">
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

      <footer className="bg-gutsyBlack text-gutsyCream py-16 md:py-24 px-6 text-center">
        <div className="space-y-8 md:space-y-12">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-8 mx-auto invert opacity-20" />
          <p className="font-black uppercase tracking-widest text-[9px] md:text-[10px] opacity-40 px-4">Made in Dubai. Built for gut-health obsessives.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            <a href="/story" className="hover:text-gutsyRed transition-colors">Story</a>
            <a href="https://instagram.com/gutsyprotein" target="_blank" className="hover:text-gutsyRed transition-colors">Instagram</a>
            <a href="mailto:hello@gutsyprotein.com" className="hover:text-gutsyRed transition-colors">Email</a>
          </div>
          <p className="text-[9px] md:text-[10px] opacity-20 uppercase tracking-widest font-black pt-4">© 2026 GUTSY PROVISIONS</p>
        </div>
      </footer>
    </div>
  );
}
