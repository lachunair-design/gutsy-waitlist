import { useState, useEffect } from "react";

// Individual digit component with corrected container height to prevent clipping
const FlipDigit = ({ value }: { value: string }) => {
  return (
    <div className="relative h-[1.2em] overflow-hidden leading-tight pt-1 flex items-center justify-center">
      <div 
        key={value}
        className="animate-slide-down tabular-nums"
      >
        {value}
      </div>
    </div>
  );
};

export default function Countdown() {
  // Hardcoded target for April 1, 2026 launch
  const targetDate = new Date("2026-04-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const getTimeUnits = (time: number) => {
    const d = Math.floor(time / (1000 * 60 * 60 * 24));
    const h = Math.floor((time / (1000 * 60 * 60)) % 24);
    const m = Math.floor((time / 1000 / 60) % 60);
    const s = Math.floor((time / 1000) % 60);
    
    return {
      days: d.toString().padStart(2, '0'),
      hours: h.toString().padStart(2, '0'),
      min: m.toString().padStart(2, '0'),
      sec: s.toString().padStart(2, '0'),
    };
  };

  const units = getTimeUnits(timeLeft);

  return (
    <div className="w-full flex justify-between items-center gap-2 md:gap-4 select-none">
      {Object.entries(units).map(([label, value], i) => (
        <div key={label} className="flex flex-col items-center flex-1">
          {/* Numbers: Using FlipDigit to enable the mechanical transition */}
          <div className="text-[10vw] md:text-[4.5rem] font-black tracking-tightest tabular-nums flex items-baseline">
            <FlipDigit value={value[0]} />
            <FlipDigit value={value[1]} />
          </div>
          {/* Label: Brutalist tracking */}
          <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
