import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [waitlistCount, setWaitlistCount] = useState(12); // Starting at your baseline
  const [email, setEmail] = useState('');

  // The "Viral Ticker" logic: Fetches the real count from your Neon DB
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist/count');
        const data = await response.json();
        setWaitlistCount(data.count + 12); // Baseline + Real Signups
      } catch (error) {
        console.error("Database connection failed", error);
      }
    };
    fetchCount();
  }, []);

  return (
    <section className="bg-cream min-h-screen flex flex-col items-center justify-center p-6 border-b-8 border-black">
      {/* Social Proof Badge */}
      <div className="bg-gutsyRed text-white font-bold py-2 px-6 border-4 border-black mb-8 transform -rotate-2">
        {waitlistCount.toLocaleString()} PEOPLE ARE PUTTING GUT FIRST
      </div>

      {/* Main Headline */}
      <h1 className="text-6xl md:text-9xl font-black text-black leading-none text-center uppercase mb-10 tracking-tighter">
        Stop Being <br /> 
        <span className="bg-black text-gutsyRed px-4">Weak</span>
      </h1>

      {/* Authority Subheadline */}
      <p className="max-w-xl text-xl md:text-2xl text-black font-bold text-center mb-12">
        High-performance protein for high-performance guts. No fillers. No bloating. Just the raw building blocks for a resilient system.
      </p>

      {/* The Viral Capture Box */}
      <div className="w-full max-w-lg flex flex-col md:flex-row gap-0">
        <input 
          type="email"
          placeholder="ENTER YOUR EMAIL"
          className="flex-1 bg-white border-4 border-black p-5 text-xl font-bold focus:outline-none focus:bg-gutsyCream placeholder-black uppercase"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-gutsyRed text-white border-4 border-l-0 border-black p-5 text-xl font-black hover:bg-black hover:text-gutsyRed transition-colors uppercase">
          JOIN THE LIST
        </button>
      </div>

      <p className="mt-6 font-bold text-black uppercase tracking-widest text-sm">
        Priority access for those who share.
      </p>
    </section>
  );
};

export default Hero;
