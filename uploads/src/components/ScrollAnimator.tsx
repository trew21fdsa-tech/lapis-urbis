"use client";

import { useEffect } from "react";

/**
 * Global scroll-triggered animation observer.
 * Handles:
 * - [data-anim] scroll-triggered animations with stagger
 * - Article content h3/p reveal
 * - Scroll progress bar
 * - Parallax on hero backgrounds
 * - Image reveal on scroll
 * - Line expand on scroll
 * - Cursor follower dot (desktop only)
 */
export default function ScrollAnimator() {
  useEffect(() => {
    // --- Scroll progress bar ---
    let progressBar = document.querySelector<HTMLElement>(".scroll-progress");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "scroll-progress";
      document.body.prepend(progressBar);
    }

    // --- Animate elements with data-anim ---
    const elements = document.querySelectorAll<HTMLElement>("[data-anim]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const anim = el.dataset.anim || "anim-fade-up";
            const delay = parseInt(el.dataset.animDelay || "0", 10);

            setTimeout(() => {
              el.style.opacity = "";
              el.classList.add(anim);
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });

    // --- Article content animations (staggered by index) ---
    const articleEls = document.querySelectorAll<HTMLElement>(
      ".article-anim h3, .article-anim p"
    );

    const articleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Stagger siblings slightly
            const siblings = Array.from(el.parentElement?.children || []);
            const idx = siblings.indexOf(el);
            const stagger = Math.min(idx * 60, 300);
            setTimeout(() => el.classList.add("visible"), stagger);
            articleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    articleEls.forEach((el) => articleObserver.observe(el));

    // --- Image reveal on scroll ---
    const imgReveals = document.querySelectorAll<HTMLElement>(".img-reveal");
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            imgObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    imgReveals.forEach((el) => imgObserver.observe(el));

    // --- Line expand on scroll ---
    const lines = document.querySelectorAll<HTMLElement>(".line-expand");
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    lines.forEach((el) => lineObserver.observe(el));

    // --- Parallax on hero backgrounds ---
    const heroes = document.querySelectorAll<HTMLElement>(".parallax-wrap");
    const handleScrollAll = () => {
      // Progress bar
      if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      }

      // Parallax
      heroes.forEach((hero) => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const speed = 0.3;
        const offset = rect.top * speed;
        const img = hero.querySelector<HTMLElement>(".parallax-img");
        if (img) {
          img.style.transform = `translateY(${offset}px) scale(1.15)`;
        }
      });
    };

    window.addEventListener("scroll", handleScrollAll, { passive: true });
    handleScrollAll();

    // --- Cursor follower dot (desktop only, non-touch) ---
    let cursorDot: HTMLElement | null = null;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      cursorDot = document.createElement("div");
      cursorDot.className = "cursor-dot hidden";
      document.body.appendChild(cursorDot);

      let mouseX = 0, mouseY = 0;
      let dotX = 0, dotY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot?.classList.contains("hidden")) {
          cursorDot.classList.remove("hidden");
        }
      };

      const onMouseLeave = () => {
        cursorDot?.classList.add("hidden");
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);

      let raf: number;
      const followCursor = () => {
        dotX += (mouseX - dotX) * 0.12;
        dotY += (mouseY - dotY) * 0.12;
        if (cursorDot) {
          cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
        }
        raf = requestAnimationFrame(followCursor);
      };
      raf = requestAnimationFrame(followCursor);

      // Cleanup cursor
      const cleanupCursor = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        cursorDot?.remove();
      };

      // Store cleanup for return
      (window as unknown as Record<string, unknown>).__cursorCleanup = cleanupCursor;
    }

    return () => {
      observer.disconnect();
      articleObserver.disconnect();
      imgObserver.disconnect();
      lineObserver.disconnect();
      window.removeEventListener("scroll", handleScrollAll);
      progressBar?.remove();
      const cleanupCursor = (window as unknown as Record<string, unknown>).__cursorCleanup as (() => void) | undefined;
      if (cleanupCursor) cleanupCursor();
    };
  }, []);

  return null;
}
