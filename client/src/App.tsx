import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Check,
  X as XIcon,
  Leaf,
  FlaskConical,
  XCircle,
  Clock,
  Gift,
  Zap,
  Heart,
  Quote,
  ChevronDown,
  Activity,
  Salad,
  Ban,
  Sparkles,
  Star,
  Calendar,
} from "lucide-react";

// ASSET IMPORTS
import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import jumpingImg from "@/assets/images/JUMPING.png";
import logoImg from "@/assets/images/logo-black.svg";
import squiggleImg from "@/assets/images/Screenshot 2026-01-15 at 11.36.49 am.png";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showFounderStory, setShowFounderStory] = useState(false);

  // 1. KINETIC ENGINE: Track scroll position for Parallax Lifts
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      return res.json();
    },
  });
  const waitlistCount = countData?.count || 128;

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden uppercase">
      
      {/* HEADER & COUNTDOWN (Existing Logic) */}
      <header className="bg-accent border-b-2 border-black z-[60] relative">
        <div className="max-w-7xl mx-auto px-10 py-3 flex items-center justify-between">
          <div className="h-7 md:h-10">
            <img src={logoImg} alt="GUTSY" className="h-full w-auto object-contain" />
          </div>
          <div className="text-xs md:text-base font-medium text-black">Born in Dubai. Launching 2026</div>
          <div className="w-10" />
        </div>
      </header>

      {/* HERO SECTION: MOTION LAYER APPLIED */}
      <section className="relative bg-[#f3eee4] py-12 lg:py-24 overflow-visible min-h-[90vh] flex items-center">
        
        {/* PARALLAX STICKERS: Dynamic "Lifts" based on scroll */}
        <img 
          src={bikerImg} 
          style={{ transform: `translateY(${scrollY * 0.12}px) rotate(-5deg)` }}
          className="absolute top-[10%] -right-12 w-[45vw] md:w-[32vw] z-20 pointer-events-none drop-shadow-2xl transition-transform duration-75 ease-out" 
        />
        <img 
          src={meditationImg} 
          style={{ transform: `translateY(${scrollY * -0.06}px) rotate(12deg)` }}
          className="absolute bottom-[5%] -left-10 w-[35vw] md:w-[25vw] z-0 opacity-20 grayscale pointer-events-none transition-transform duration-75 ease-out" 
        />
        <img src={squiggleImg} className="absolute top-[20%] left-[10%] w-16 rotate-45 opacity-60 z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto px-10 w-full z-10">
          <div className="grid lg:grid-cols-[60%_40%] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-accent text-black px-3 py-2 font-bold text-sm border-2 border-black">GUT-FIRST PROTEIN</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter">The lightest protein in the world</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl normal-case font-bold">No bloat. No regret. Just clean fuel.</p>

              <button onClick={() => setShowFounderStory(true)} className="text-primary font-black italic border-2 border-primary px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-all text-xl">
                why we built this →
              </button>

              <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative group">
                <EmailForm variant="hero" />
                <div 
                   style={{ transform: `translateY(${scrollY * 0.05}px) rotate(10deg)` }}
                   className="absolute -top-12 -right-10 bg-[#ffb300] p-5 rounded-3xl shadow-2xl font-black text-[12px] border-4 border-white animate-bounce-slow"
                >
                  {waitlistCount}+ JOINED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RETAINED SECTIONS (Untouched Copy) */}
      <ProductBenefitsSection />
      <TwoBlendsSection />
      <TestimonialWallSection />
      <MidScrollCTASection />

      {/* REBELLION SECTION WITH MOTION STICKER */}
      <section id="rebellion" className="relative">
        <FounderStorySection />
        <img 
          src={jumpingImg} 
          style={{ transform: `translateY(${scrollY * -0.1}px) rotate(-8deg)` }}
          className="absolute -bottom-10 right-10 w-52 z-40 drop-shadow-2xl pointer-events-none transition-transform duration-75 ease-out" 
        />
      </section>

      

      <GutScienceSection />
      <WhyGutsyWorksSection />
      <EarlyBirdPerksSection />
      <FAQSection />
      <ComparisonChartSection />

      <footer className="border-t-4 border-black py-20 bg-white text-center">
        <img src={logoImg} className="h-16 mx-auto mb-8" alt="GUTSY" />
        <p className="text-sm font-bold opacity-40 uppercase tracking-widest">© 2026 GUTSY. DUBAI BIOTECH.</p>
      </footer>
    </div>
  );
}
