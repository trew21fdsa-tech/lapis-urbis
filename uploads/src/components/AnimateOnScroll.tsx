"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  animation?: string;       // CSS class to add when visible
  delay?: number;            // ms delay before animation
  threshold?: number;        // 0-1, how much must be visible
  className?: string;        // extra classes on wrapper
  as?: "div" | "section" | "article" | "nav" | "p" | "h3";
}

export default function AnimateOnScroll({
  children,
  animation = "anim-fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("anim-hidden");
            el.classList.add(animation);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, threshold]);

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={`anim-hidden ${className}`}>
      {children}
    </Tag>
  );
}
