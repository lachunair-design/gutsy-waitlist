import { useState, useEffect } from "react";

// Updated Launch Date to March 15, 2026
const LAUNCH_DATE = new Date("2026-03-15T00:00:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = LAUNCH_DATE - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 font-gutsy">
      <TimeUnit value={timeLeft.days} label="days" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="hours" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="min" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="sec" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter text-gutsyBlack">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gutsyBlack/30 mt-1">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-2xl md:text-4xl font-light text-gutsyBlack/10 self-start mt-2">
      :
    </div>
  );
}
