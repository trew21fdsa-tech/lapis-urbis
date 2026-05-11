"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Landmark {
  name: string;
  description: string;
  image?: string;
}

interface Props {
  landmarks: Landmark[];
  color: string;
}

export default function LandmarkGrid({ landmarks, color }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  useEffect(() => {
    if (activeIndex !== null && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex]);

  const active = activeIndex !== null ? landmarks[activeIndex] : null;

  return (
    <div>
      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {landmarks.map((landmark, i) => (
          <button
            key={landmark.name}
            onClick={() => toggle(i)}
            className={`landmark-card group text-left transition-all duration-300 ${
              activeIndex === i
                ? "ring-2 rounded-lg"
                : "hover:scale-[1.02]"
            }`}
            style={activeIndex === i ? { ringColor: color } : undefined}
            data-anim="anim-scale-in"
            data-anim-delay={String(i * 120)}
          >
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-2.5 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
              {landmark.image ? (
                <Image
                  src={landmark.image}
                  alt={landmark.name}
                  fill
                  className="object-cover landmark-img"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color + "20" }}
                />
              )}
              {/* Color accent overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: color }}
              />
              {/* Active indicator */}
              {activeIndex === i && (
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />
              )}
            </div>
            <h4 className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
              activeIndex === i ? "text-[var(--color-accent)]" : "text-[var(--color-text)] group-hover:text-[var(--color-accent)]"
            }`}>
              {landmark.name}
            </h4>
            <p className="text-xs text-[var(--color-harmony)] mt-0.5 line-clamp-2">
              {landmark.description}
            </p>
          </button>
        ))}
      </div>

      {/* Expanded panel */}
      <div
        ref={panelRef}
        className={`overflow-hidden transition-all duration-500 ease-out ${
          active ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {active && (
          <div className="border border-[var(--color-lines)] rounded-xl overflow-hidden bg-[var(--color-surface)]">
            <div className="flex flex-col md:flex-row">
              {/* Large image */}
              {active.image && (
                <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[300px]">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: color }}
                  />
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <p
                  className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold"
                  style={{ color }}
                >
                  Достопримечательность
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
                  {active.name}
                </h3>
                <div className="h-0.5 w-12 mb-4" style={{ backgroundColor: color }} />
                <p className="text-base text-[var(--color-text)]/85 leading-relaxed">
                  {active.description}
                </p>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="mt-6 self-start text-sm text-[var(--color-harmony)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span>×</span> Свернуть
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
