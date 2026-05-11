"use client";

import { useEffect, useRef } from "react";

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    const bg = hero.querySelector<HTMLElement>(".parallax-target");
    if (!bg) return;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0) return; // off screen
      const offset = window.scrollY * 0.35;
      bg.style.transform = `translateY(${offset}px) scale(1.1)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div ref={ref} className="absolute inset-0 overflow-hidden" />;
}
