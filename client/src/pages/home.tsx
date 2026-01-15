import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Sparkles, Shield, Leaf, Zap, Clock, ArrowRight } from "lucide-react";
import EmailForm from "@/components/EmailForm";

import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import runnerImg from "@/assets/images/RUNNER2.png";
import logoImg from "@/assets/images/logo-black.svg";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const rewards = [
    { tier: "Top 500", icon: "🥉", perk: "Early access 48hrs before launch", discount: "15% off first order", color: "#ffb300" },
    { tier: "Top 100", icon: "🥈", perk: "Priority delivery on launch day", discount: "20% off + early flavors", color: "#ff5200" },
    { tier: "Top 50", icon: "🥇", perk: "Exclusive content & updates", discount: "25% off first order", color: "#890eff" },
    { tier: "Top 10", icon: "💎", perk: "Inner Circle: Private group with founder", discount: "Influence product decisions", color: "#f20028" },
  ];

  const features = [
    { icon: Leaf, title: "Plant-Based", desc: "Pea & rice protein blend" },
    { icon: Shield, title: "Gut-Friendly", desc: "No bloating, no discomfort" },
    { icon: Zap, title: "Fast Absorbing", desc: "Hydrolyzed for quick uptake" },
    { icon: Sparkles, title: "Clean Label", desc: "No artificial sweeteners" },
  ];

  const faqs = [
    { q: "When does Gutsy launch?", a: "We're launching January 2026. Waitlist members get first access before the public launch." },
    { q: "What's in the protein?", a: "A premium blend of hydrolyzed pea and rice protein. No artificial sweeteners, no gums, no fillers." },
    { q: "How does the referral system work?", a: "Share your unique link. For every 3 friends who join, you move up 5 spots in line. Top referrers get exclusive perks." },
    { q: "What's the Inner Circle?", a: "Our top 10 referrers join a private WhatsApp group with our founder Lakshmi, getting direct input on flavors and products." },
  ];

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm border border-black/5">
          <img src={logoImg} alt="Gutsy" className="h-7" />
          <a href="#join" className="bg-[#f20028] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-all duration-300">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-black/60 shadow-sm border border-black/5">
                <span className="w-2 h-2 bg-[#00b453] rounded-full animate-pulse"></span>
                Launching January 2026
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-black">
                Protein that loves your gut back.
              </h1>

              <p className="text-xl text-black/60 leading-relaxed max-w-lg">
                The world's lightest protein powder. No bloating. No breakouts. Just clean, plant-based fuel that actually works.
              </p>

              <div id="join" className="pt-4">
                <EmailForm />
                <p className="mt-4 text-sm text-black/40">
                  Join {waitlistCount.toLocaleString()}+ others on the waitlist
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div
                className="relative z-10"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              >
                <img
                  src={bikerImg}
                  alt="Active lifestyle"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating accent cards */}
              <div className="absolute top-10 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-black/5 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00b453]/10 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#00b453]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">100% Plant-Based</p>
                    <p className="text-xs text-black/40">Pea & Rice Protein</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-black/5 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f20028]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#f20028]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Zero Bloating</p>
                    <p className="text-xs text-black/40">Gut-friendly formula</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Gutsy?</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              We spent 2 years perfecting a formula that your body will actually thank you for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#f3eee4] p-8 rounded-3xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-[#f20028]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-black/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skip the Queue</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Refer friends and unlock exclusive rewards. The more you share, the higher you climb.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ backgroundColor: `${reward.color}15` }}
                >
                  {reward.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: reward.color }}>{reward.tier}</h3>
                <p className="text-black/80 font-medium mb-2">{reward.perk}</p>
                <p className="text-black/50 text-sm">{reward.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={meditationImg}
                alt="Wellness"
                className="rounded-3xl opacity-80"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why I Built Gutsy</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                "I tried every protein on the market. They all promised the world but left me bloated and breaking out. So I spent two years creating the protein I wish existed."
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 bg-[#f20028] rounded-full flex items-center justify-center font-bold">
                  L
                </div>
                <div>
                  <p className="font-semibold">Lakshmi</p>
                  <p className="text-white/50 text-sm">Founder, Gutsy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Questions?</h2>
            <p className="text-xl text-black/60">Everything you need to know about Gutsy.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-black/[0.02] transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-black/40 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-black/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#f20028]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to feel the difference?</h2>
          <p className="text-xl text-white/80 mb-10">
            Join the waitlist and be first to experience protein that actually works with your body.
          </p>
          <EmailForm variant="dark" />
          <div className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            Launching January 2026
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logoImg} alt="Gutsy" className="h-6 invert" />
          <p className="text-white/40 text-sm">© 2026 Gutsy. Dubai, UAE.</p>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
