import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { WaitlistForm } from "./components/WaitlistForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/Accordion";
import { useCountdown } from "./hooks/useCountdown";
import { useWaitlistCount } from "./hooks/useWaitlist";

// Launch date: Q2 2026
const LAUNCH_DATE = new Date("2026-06-01T00:00:00");

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

function HomePage() {
  const [location] = useLocation();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const countdown = useCountdown(LAUNCH_DATE);
  const { data: countData } = useWaitlistCount();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, [location]);

  return (
    <div className="min-h-screen bg-gutsy-cream">
      {/* Header */}
      <header className="border-b-2 border-gutsy-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold uppercase tracking-wider">GUTSY</div>
          <div className="text-sm font-medium uppercase tracking-wide">Born in Dubai</div>
        </div>
      </header>

      {/* Countdown Bar */}
      <div className="border-b-2 border-gutsy-black bg-gutsy-yellow">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-2 text-sm font-bold uppercase">
          <span>Launching 2026</span>
          <div className="flex gap-4">
            <span>{countdown.days}D</span>
            <span>{countdown.hours}H</span>
            <span>{countdown.minutes}M</span>
            <span>{countdown.seconds}S</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold uppercase tracking-tight md:text-6xl">
          The Lightest Protein<br />
          <span className="text-gutsy-red">In The World</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg">
          Plant-based peptides, enzymatically pre-broken for zero bloating and instant absorption.
        </p>

        <div className="flex justify-center">
          <WaitlistForm referralCode={referralCode} />
        </div>

        {countData && (
          <p className="mt-6 text-sm font-medium">
            <span className="font-bold text-gutsy-red">{countData.count}</span> people already on the list
          </p>
        )}
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-gutsy-black bg-gutsy-red py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold uppercase text-white">
              Zero Bloating • Gut-First Formula • No Artificial Sweeteners • Pre-Digested Peptides •
            </span>
          ))}
        </div>
      </div>

      {/* Gut Science Section */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase">The Gut Science</h2>
        <Accordion type="single" collapsible className="border-t-2 border-gutsy-black">
          <AccordionItem value="what">
            <AccordionTrigger>What makes GUTSY different?</AccordionTrigger>
            <AccordionContent>
              Traditional protein powders use intact proteins that require extensive digestion,
              causing bloating and discomfort. GUTSY uses enzymatically pre-broken peptides
              that absorb immediately without taxing your digestive system.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ingredients">
            <AccordionTrigger>What's inside?</AccordionTrigger>
            <AccordionContent>
              100% plant-based hydrolyzed pea protein, natural flavoring, and nothing else.
              No gums, no thickeners, no artificial sweeteners. Just clean protein.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="who">
            <AccordionTrigger>Who is GUTSY for?</AccordionTrigger>
            <AccordionContent>
              Anyone who has experienced bloating, skin breakouts, or digestive discomfort
              from traditional protein supplements. Athletes, fitness enthusiasts, and anyone
              who refuses to compromise on gut health.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gutsy-black py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-bold uppercase">GUTSY</p>
          <p className="mt-2 text-sm">Born in Dubai. Launching 2026.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
