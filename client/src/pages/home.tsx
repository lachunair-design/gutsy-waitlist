import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Instagram, Mail } from "lucide-react";
import EmailForm from "@/components/EmailForm";
import Countdown from "@/components/Countdown";

import bikerImg from "@/assets/images/BIKER2.png";
import meditationImg from "@/assets/images/MEDITATION.png";
import vanillaImg from "@/assets/images/VANILLA.png";
import cocoaImg from "@/assets/images/COCOA.png";
import logoImg from "@/assets/images/logo-black.svg";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      return res.json();
    },
  });
  const waitlistCount = countData?.count || 128;

  const rewards = [
    {
      tier: "Top 500",
      icon: "🥉",
      perk: "Early access 48hrs before launch + 15% off first order",
      color: "#ffb300"
    },
    {
      tier: "Top 100",
      icon: "🥈",
      perk: "Launch-day priority delivery + 20% off first order + early access to new flavours",
      color: "#ff5200"
    },
    {
      tier: "Top 50",
      icon: "🥇",
      perk: "Launch-day priority delivery + 25% off first order + early access to new flavours + exclusive content",
      color: "#890eff"
    },
    {
      tier: "Top 10",
      icon: "💎",
      subtitle: "Inner Circle",
      perk: "Private WhatsApp group with Lakshmi. Behind-the-scenes updates, influence product decisions, and ask anything. First 100 waitlist members only.",
      color: "#f20028"
    },
  ];

  const howItWorks = [
    { step: "1", title: "Join the waitlist", desc: "Enter your email to secure your spot" },
    { step: "2", title: "Share your unique link", desc: "Get a personal referral link to share" },
    { step: "3", title: "Every 3 sign-ups = you move up 5 spots", desc: "The more you share, the higher you climb" },
    { step: "4", title: "Top referrers get the best perks", desc: "Unlock rewards as you climb the ranks" },
  ];

  const faqs = [
    {
      q: "When does it launch?",
      a: "January 2026. Waitlist gets first dibs."
    },
    {
      q: "Where do you ship?",
      a: "Dubai and UAE to start. Expanding soon."
    },
    {
      q: "What's actually in it?",
      a: "Pea and rice protein base. No artificial sweeteners, no soy, no dairy, no nonsense. Full ingredient list drops at launch."
    },
    {
      q: "Is it actually easy to digest?",
      a: "Yes. The peptides are pre-broken, so your gut doesn't have to work overtime. If you usually bloat on protein, this won't do that."
    },
    {
      q: "How do I use it?",
      a: "Mix with water, milk, or whatever you're into. Works in smoothies, oats, or straight up in a shaker."
    },
    {
      q: "How does the referral system work?",
      a: "Share your unique link. When someone signs up through it, you both move up. Every 3 successful referrals moves you up 5 spots. Track your progress anytime on your personal dashboard."
    },
    {
      q: "What's \"Inner Circle\"?",
      a: "Top 10 referrers get added to a private WhatsApp group with Lakshmi. Get behind-the-scenes updates on building GUTSY, vote on new flavours, ask questions about gut health or business, and influence what we build next. It's a small group (first 100 waitlist members only), so you get real access and real influence."
    },
    {
      q: "When do rewards get delivered?",
      a: "Launch day perks (discounts, priority delivery, early flavour access) kick in when we go live in January 2026. Early access means you get notified 48 hours before public launch. Inner Circle WhatsApp invites go out in the first week of launch."
    },
    {
      q: "Can I lose my position?",
      a: "Nope. You only move up, never down."
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm border border-black/5">
          <img src={logoImg} alt="Gutsy" className="h-7" />
          <a href="#join" className="bg-[#f20028] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-all duration-300">
            Join the waitlist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-black">
                The lightest protein in the world
              </h1>

              <p className="text-2xl text-black/60 leading-relaxed">
                No bloat. No regret. Just clean fuel.
              </p>

              {/* Countdown */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 inline-block">
                <p className="text-sm text-black/40 mb-3 font-medium">Launching January 1, 2026</p>
                <Countdown />
              </div>

              <div id="join" className="pt-4">
                <EmailForm />
                <p className="mt-4 text-sm text-black/40">
                  Join {waitlistCount.toLocaleString()}+ others on the waitlist
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block">
              <img
                src={bikerImg}
                alt="Active lifestyle"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Block */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Your gut called. It's tired of heavy proteins.
          </h2>
          <p className="text-xl text-black/60 leading-relaxed">
            Most protein powders sit in your stomach like a brick. Ours doesn't. We use enzymatically pre-broken peptides so your body actually absorbs what you're paying for. No digestive gymnastics required.
          </p>
        </div>
      </section>

      {/* Product Tease */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Two flavours. Zero compromises.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vanilla Calm */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-[#f3eee4] rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img src={vanillaImg} alt="Vanilla Calm" className="w-3/4 object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Vanilla Calm</h3>
              <p className="text-black/60 font-medium mb-4">23g protein • 132 kcal</p>
              <p className="text-black/50">
                Adaptogens for steady energy. Tastes like actual vanilla, not a chemistry experiment.
              </p>
            </div>

            {/* Cacao Boost */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-[#1a1a1a] rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img src={cocoaImg} alt="Cacao Boost" className="w-3/4 object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Cacao Boost</h3>
              <p className="text-black/60 font-medium mb-4">22g protein • 137 kcal</p>
              <p className="text-black/50">
                Natural caffeine kick. Rich, smooth, no chalky aftertaste.
              </p>
            </div>
          </div>

          <p className="text-center mt-8 text-black/40">
            Vegan. Clean label. Made for people who read ingredient lists.
          </p>
        </div>
      </section>

      {/* How Waitlist Works */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skip the queue</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {howItWorks.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#f20028] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Rewards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{reward.icon}</div>
                <h3 className="text-xl font-bold mb-1" style={{ color: reward.color }}>
                  {reward.tier}
                </h3>
                {reward.subtitle && (
                  <p className="text-white/40 text-sm mb-2">{reward.subtitle}</p>
                )}
                <p className="text-white/70 text-sm leading-relaxed">{reward.perk}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-white/40 text-sm">
            No purchase required. Just share what you actually believe in.
          </p>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={meditationImg}
                alt="Wellness"
                className="rounded-3xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why we built this</h2>
              <p className="text-black/60 text-lg leading-relaxed">
                We got tired of choosing between protein that works and protein that doesn't wreck your stomach. So we spent eight months obsessing over digestion science, taste-testing 47 samples, and annoying every gut health expert we could find.
              </p>
              <p className="text-black/60 text-lg leading-relaxed">
                GUTSY is what we wished existed: stupid-easy to digest, actually tasty, and clean enough that you don't need a biochemistry degree to understand the label.
              </p>
              <p className="font-bold text-lg">— Lakshmi, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Email Capture */}
      <section className="py-24 px-6 bg-[#f20028]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Be first. Save more.</h2>
          <p className="text-xl text-white/80 mb-10">
            Join the waitlist and lock in launch pricing. Plus early access before we go live in Dubai.
          </p>

          <div className="bg-white/10 p-6 rounded-2xl inline-block mb-10">
            <Countdown />
          </div>

          <div className="max-w-lg mx-auto">
            <EmailForm variant="dark" />
          </div>

          <p className="mt-6 text-white/50 text-sm">
            No spam. Just launch updates and the occasional gut health nerd-out.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#f3eee4] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-black/[0.02] transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-black/40 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-black/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <img src={logoImg} alt="Gutsy" className="h-8 invert mx-auto md:mx-0 mb-4" />
              <p className="text-white/40 text-sm">Made in Dubai. Built for gut-health obsessives.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/gutsyprotein"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@gutsyprotein</span>
              </a>
              <a
                href="mailto:hello@gutsyprotein.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">hello@gutsyprotein.com</span>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
            © 2026 Gutsy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
