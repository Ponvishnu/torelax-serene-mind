import { useState, useEffect } from "react";

function getTimeLeft() {
  const target = new Date("2025-04-15T23:59:59").getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.mins },
    { label: "Secs", value: time.secs },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="bg-card rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
            <span className="font-display text-2xl font-bold text-foreground">
              {String(u.value).padStart(2, "0")}
            </span>
          </div>
          <span className="font-accent text-xs text-muted mt-1 uppercase tracking-wider">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
