import { useState, useEffect } from "react";
import bikerImg from "./assets/images/BIKER2.png";
import meditationImg from "./assets/images/MEDITATION.png";
import logoImg from "./assets/images/logo-black.svg";
import squiggleImg from "./assets/images/squiggle.svg";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalizing mouse position to a -1 to 1 range
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

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy antialiased overflow-x-hidden selection:bg-[#f20028] selection:text-white">

      {/* 1. STICKY NAV PILL */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl bg-white/70 backdrop-blur-xl rounded-full px-8 py-4 flex justify-between items-center border border-white/20 shadow-xl">
        <div className="h-6 md:h-8">
          <img src={logoImg} alt="GUTSY" className="h-full w-auto object-contain" />
        </div>
        <button className="bg-black text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#f20028] transition-all shadow-lg">JOIN</button>
      </nav>

      {/* 2. THE BURST HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-visible">

        {/* LAYER: DEEP BACKGROUND TEXT */}
        <div
          style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-transform duration-500 ease-out"
        >
          <h1 className="text-[28vw] font-black text-white leading-none tracking-tighter opacity-70 uppercase">
            LIGHT
          </h1>
        </div>

        {/* LAYER: THE SUBJECT (BIKER) */}
        <div
          style={{
            transform: `translate(${mousePos.x * -25}px, ${(mousePos.y * -25) + (scrollY * 0.1)}px) rotate(-4deg)`
          }}
          className="relative z-20 w-[85vw] md:w-[48vw] transition-transform duration-300 ease-out"
        >
          <img
            src={bikerImg}
            className="w-full h-auto drop-shadow-[0_45px_55px_rgba(0,0,0,0.18)]"
            alt="Kinetic Biker"
          />
          <img
            src={squiggleImg}
            className="absolute top-0 -left-12 w-24 rotate-12 opacity-80 animate-pulse drop-shadow-lg"
            alt=""
          />
        </div>

        {/* LAYER: OVERLAY TYPOGRAPHY */}
        <div
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none transition-transform duration-200 ease-out"
        >
          <h2 className="text-[16vw] md:text-[13rem] font-black leading-none tracking-tightest mt-[10vh] uppercase text-center">
            <span className="block text-black drop-shadow-xl">PROTEIN</span>
            <span className="block text-transparent italic [webkit-text-stroke:2px_black] md:[webkit-text-stroke:4px_black] drop-shadow-sm">
              RE-IMAGINED
            </span>
          </h2>
        </div>

        {/* LAYER: BOTTOM CTA FLOW */}
        <div className="absolute bottom-12 left-0 w-full flex flex-col items-center z-50 px-6">
          <p className="max-w-md text-center text-sm md:text-xl font-bold opacity-60 mb-10 normal-case leading-snug">
            The lightest protein in the world. No bloating. No breakouts. Just clean, plant-based fuel.
          </p>

          <div className="w-full max-w-lg bg-white p-2 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex border-2 border-black pointer-events-auto hover:scale-[1.02] transition-transform duration-300">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="flex-1 bg-transparent px-8 font-black text-xs outline-none uppercase tracking-[0.2em]"
            />
            <button className="bg-[#f20028] text-white px-10 py-5 rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-black transition-colors">
              GET ACCESS
            </button>
          </div>
        </div>

        {/* BACKGROUND ACCENTS */}
        <img
          src={meditationImg}
          style={{ transform: `translate(${mousePos.x * -15}px, ${(mousePos.y * -15) + (scrollY * -0.05)}px) rotate(15deg)` }}
          className="absolute top-[25%] left-[8%] w-[20vw] md:w-[12vw] z-10 opacity-30 grayscale pointer-events-none transition-transform duration-500 ease-out"
        />
      </section>
    </div>
  );
}
