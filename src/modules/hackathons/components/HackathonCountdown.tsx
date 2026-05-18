"use client";

import { useEffect, useState } from "react";

interface HackathonCountdownProps {
  startDate: string;
  label?: string;
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export function HackathonCountdown({
  startDate,
  label = "Início em",
}: HackathonCountdownProps) {
  const target = new Date(startDate);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  if (!timeLeft) {
    return (
      <p className="text-brasil-verde font-semibold">Hackathon iniciado!</p>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="text-xs text-zinc-400 mb-1">{label}</p>
      <p className="text-2xl font-mono font-bold tracking-widest text-white">
        {timeLeft.days}d {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
        {pad(timeLeft.seconds)}
      </p>
    </div>
  );
}
