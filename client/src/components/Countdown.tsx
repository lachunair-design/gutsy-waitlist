import { useState, useEffect } from "react";

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
    return {
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
      hours: Math.floor((time / (1000 * 60 * 60)) % 24),
      min: Math.floor((time / 1000 / 60) % 60),
      sec: Math.floor((time / 1000) % 60),
    };
  };

  const units = getTimeUnits(timeLeft);

  return (
    <div className="w-full flex justify-between items-center gap-2 md:gap-4 select-none">
      {Object.entries(units).map(([label, value], i) => (
        <div key={label} className="flex flex-col items-center flex-1">
          {/* Numbers: Using text-clamp to prevent bleeding and fit all screens */}
          <div className="text-[10vw] md:text-[4.5rem] font-black leading-none tracking-tightest tabular-nums">
            {value.toString().padStart(2, '0')}
          </div>
          {/* Label: Small, high-authority tracking */}
          <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2">
            {label}
          </div>
          {/* Separator dots logic */}
          {i < 3 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block opacity-10">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
