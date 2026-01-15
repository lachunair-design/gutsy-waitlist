import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-01-01T00:00:00").getTime();

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
    <div className="flex items-center gap-4">
      <TimeUnit value={timeLeft.days} label="days" />
      <span className="text-2xl font-light text-black/20">:</span>
      <TimeUnit value={timeLeft.hours} label="hours" />
      <span className="text-2xl font-light text-black/20">:</span>
      <TimeUnit value={timeLeft.minutes} label="min" />
      <span className="text-2xl font-light text-black/20">:</span>
      <TimeUnit value={timeLeft.seconds} label="sec" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs text-black/40 uppercase tracking-wider">{label}</div>
    </div>
  );
}
