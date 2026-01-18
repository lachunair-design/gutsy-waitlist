import { useState, useRef, useEffect } from "react";
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
  const [showSticky, setShowSticky] = useState(false);
  const [displayCount, setDisplayCount] = useState(0); 
  const joinRef = useRef<HTMLDivElement>(null);

  // STICKY CTA logic
  useEffect(() => {
    const handleScroll = () => {
      if (joinRef.current) {
        const rect = joinRef.current.getBoundingClientRect();
        setShowSticky(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // REAL-TIME BASELINE: Fetches your 1 live signup
  const waitlistCount = countData?.count || 1;

  // REAL-TIME COUNT-UP ANIMATION
  useEffect(() => {
    if (waitlistCount > 0) {
      let start = 0;
      const end = waitlistCount;
      const duration = 2000; 
      const increment = Math.ceil(end / (duration / 16));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayCount(end);
          clearInterval(timer);
        } else {
          setDisplayCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [waitlistCount]);

  const faqs = [
    { q: "When does it launch?", a: "April 1, 2026. Waitlist members get first access." },
    { q: "Is it actually easy to digest?", a: "The protein is hydrolysed, pre-digested into smaller peptides before you drink it. This makes it easier to digest than standard protein isolates." },
    { q: "What is founder pricing?", a: "First 500 get founder pricing (25% off). Everyone else gets 15%." },
    { q: "Where do you ship?", a: "We are launching exclusively in Dubai and the UAE to start." },
  ];

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy antialiased selection:bg-gutsyRed selection:text-white overflow-x-hidden">
      <WaitlistPopup />

      {/* MOBILE STICKY CTA */}
      <div className={`fixed bottom-0 left-0 w-full p-4 z-[100] md:hidden transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <button onClick={scrollToJoin} className="w-full btn-pill py-4 shadow-2xl bg-gutsyRed text-white font-black uppercase tracking-[0.2em]">
          Join the waitlist
        </button>
      </div>

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

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-[14vw] md:text-[9rem] font-black leading-[0.82] tracking-tightest uppercase text-balance">
            The lightest <br />
            <span className="text-gutsyRed font-normal lowercase">protein in</span> <br />
            the world
          </h1>
          
          <div className="mt-8 mb-4 animate-pulse-urgency">
            <p className="text-lg md:text-2xl font-black uppercase tracking-widest text-gutsyRed">
              First 500 lock in founder pricing (25% off).
            </p>
            <p className="text-sm md:text-base font-black uppercase tracking-widest opacity-60">
              After that, it is gone.
            </p>
          </div>
          
          <div ref={joinRef} className="mt-12 w-full max-w-lg mx-auto">
            <div className="mb-10 p-6 md:p-8 bg-white/40 rounded-[2.5rem] border border-black/5 backdrop-blur-sm shadow-premium">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Launching April 1, 2026</p>
              <Countdown />
            </div>
            
            <EmailForm buttonText="Join the waitlist" placeholder="Enter email for early access" />
            
            <p className="mt-8 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-center mx-auto">
              Join <span className="text-gutsyRed text-lg md:text-xl font-black tabular-nums">
                {displayCount.toLocaleString()}+
              </span> Gut Health Obsessives
            </p>
          </div>
        </div>

        <div className="absolute 
            bottom-[-5%] right-[-10%] w-[85vw] opacity-10 
            md:bottom-[10%] md:right-[2%] md:w-[48vw] md:opacity-10 
            pointer-events-none transition-all duration-1000 animate-slow-float">
          {bikerImg && <img src={bikerImg} alt="" className="w-full h-auto grayscale-[20%]" />}
        </div>
      </section>

      {/* AUTHORITY SECTION: THE WALL OF PROOF */}
      <section className="py-24 md:py-40 px-6 bg-white border-y border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          
          {/* Brutalist Anatomical Icon (No Smile) */}
          <div className="w-24 h-24 mb-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gutsyBlack" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M45 20C40 20 30 25 25 40C20 60 35 85 55 85C75 85 85 65 80 45C75 25 60 20 55 20" strokeLinecap="round" />
              <path d="M45 35C45 35 50 45 60 40" strokeLinecap="round" opacity="0.4" />
              <path d="M40 55C40 55 50 65 65 60" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>

          <h3 className="text-5xl md:text-[8rem] font-black uppercase tracking-tightest leading-[0.82]">
            Your Gut <br /> 
            <span className="text-gutsyRed italic font-normal lowercase">is finally</span> <br /> 
            at peace.
          </h3>

          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center pt-12 md:pt-24">
            <div className="text-left space-y-8">
              <p className="text-lg md:text-2xl font-medium uppercase tracking-tight opacity-70 leading-relaxed text-balance">
                Most protein powders sit in your stomach like a brick. We use <span className="font-black text-gutsyBlack">HYDROLYSED PROTEIN</span>, pre-digested before it hits your gut.
              </p>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gutsyRed">
                <Microscope className="w-5 h-5" />
                Authority in Digestion Science
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="text-8xl md:text-[10rem] font-black text-gutsyRed leading-none tracking-tightest">2X</div>
              <div className="text-3xl md:text-5xl font-black uppercase tracking-tightest mt-2">FASTER</div>
              <div className="text-xl md:text-2xl font-black uppercase opacity-40">Absorption*</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto text-center font-gutsy">
        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tightest mb-16 md:mb-20 text-balance">Two flavours. <br/> Zero compromises.</h3>
        <div className="grid md:grid-cols-2 gap-8 md:gap-4">
          <div className="group cursor-pointer text-left transition-transform duration-500 hover:scale-[1.02]" onClick={scrollToJoin}>
            <div className="bg-[#f9f5f0] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5">
              {vanillaImg && <img src={vanillaImg} className="w-2/3 group-hover:-translate-y-4 transition-transform duration-700" alt="Vanilla Calm" />}
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Vanilla Calm</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">23g protein • 132 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed text-balance">Hydrolysed pea and rice protein. Reishi for calm. Designed to sit lighter. Real vanilla taste.</p>
            </div>
          </div>
          <div className="group cursor-pointer text-left transition-transform duration-500 hover:scale-[1.02]" onClick={scrollToJoin}>
            <div className="bg-[#f5f5f5] rounded-[3rem] aspect-[4/5] flex items-center justify-center border border-black/5">
              {cocoaImg && <img src={cocoaImg} className="w-2/3 group-hover:-translate-y-4 transition-transform duration-700" alt="Cacao Boost" />}
            </div>
            <div className="mt-8 px-4">
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Cacao Boost</h4>
              <p className="font-black text-xs text-gutsyRed mt-2 tracking-widest uppercase">22g protein • 137 kcal</p>
              <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed text-balance">Hydrolysed pea and rice protein. Maca for energy. Designed to sit lighter. Smooth, not chalky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 bg-white border-y border-black/5 text-center">
          <div className="max-w-7xl mx-auto space-y-16">
            <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tightest text-balance">I quit protein for 2 years. GUTSY brought me back.</h3>
            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <p className="text-base md:text-lg font-medium italic">“I’ve tried every vegan protein. They all left me feeling heavy. GUTSY is the first one that feels light.”</p>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Sarah, Dubai (Beta Tester)</p>
              </div>
              <div className="space-y-4">
                <p className="text-base md:text-lg font-medium italic">“Tastes like a milkshake. Sits light. I didn’t think that was possible.”</p>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Ahmed, Abu Dhabi (Beta Tester)</p>
              </div>
              <div className="space-y-4">
                <p className="text-base md:text-lg font-medium italic">“I read every label. GUTSY is the cleanest, easiest protein I’ve found.”</p>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Priya, Dubai (Beta Tester)</p>
              </div>
            </div>
          </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-24 md:py-32 px-6 bg-gutsyCream border-b border-black/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {meditationImg && (
            <img src={meditationImg} className="rounded-[3rem] md:rounded-[4rem] grayscale opacity-80" alt="Lakshmi" />
          )}
          <div className="space-y-8 md:space-y-10">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gutsyRed">Why we built this</h3>
            <div className="space-y-6 text-base md:text-lg font-medium uppercase tracking-tight opacity-70 leading-relaxed text-balance">
              <p>I quit protein for two years. The bloating was constant. The breakouts shattered my confidence.</p>
              <p className="text-gutsyBlack/100 font-bold normal-case text-balance">Then my mum was diagnosed with colon cancer.</p>
              <p>That’s when I got paranoid about everything I was putting in my body. GUTSY is what I built when I couldn’t find protein that worked.</p>
            </div>
            <div className="pt-4 flex flex-col gap-6">
              <p className="text-gutsyBlack font-black uppercase tracking-[0.2em] text-xl md:text-2xl">— Lakshmi</p>
              <a href="/story" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gutsyRed hover:translate-x-2 transition-transform group">
                Read the full story <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RED WAITLIST SECTION: RESTORED */}
      <section className="bg-gutsyRed py-24 md:py-40 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-[7rem] font-black uppercase tracking-tightest leading-[0.85] text-balance">
            Lock in <br /> founder pricing.
          </h2>
          <div className="max-w-lg mx-auto bg-white/10 p-2 rounded-full backdrop-blur-md">
             <EmailForm buttonText="Get Access" placeholder="Enter email" invert />
          </div>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] opacity-80">
            First 500 only. We launch April 1st.
          </p>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-black uppercase tracking-tightest mb-16 text-center">Questions</h3>
          <div className="divide-y divide-black/5">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center text-left group">
                  <span className="text-xl font-black uppercase group-hover:text-gutsyRed transition-colors">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="mt-4 text-sm font-medium uppercase opacity-50 leading-relaxed text-balance">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gutsyBlack text-gutsyCream py-16 md:py-24 px-6 text-center">
        <div className="space-y-12">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-8 mx-auto invert opacity-20" />
          <p className="font-black uppercase tracking-widest text-[10px] opacity-40 px-4">Born in Dubai. Built for gut-health obsessives.</p>
          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            <a href="/story" className="hover:text-gutsyRed transition-colors">Story</a>
            <a href="https://instagram.com/gutsyprotein" target="_blank" className="hover:text-gutsyRed hover:scale-110 transition-transform">Instagram</a>
            <a href="mailto:hello@gutsyprotein.com" className="hover:text-gutsyRed hover:scale-110 transition-transform">Email</a>
          </div>
          <p className="text-[10px] opacity-20 uppercase tracking-widest font-black pt-4">© 2026 GUTSY PROVISIONS</p>
        </div>
      </footer>
    </div>
  );
}
