import Link from "next/link";
import Image from "next/image";
import type { Epoch } from "@/data/epochs";

export default function EpochCard({ epoch, large = false }: { epoch: Epoch; large?: boolean }) {
  return (
    <Link
      href={`/epoch/${epoch.slug}`}
      className="group block bg-[var(--color-bg)] border border-[var(--color-lines)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/30 transition-all duration-500 hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2"
    >
      {/* Image with zoom + color accent bar */}
      <div className={`${large ? "h-72 md:h-80" : "h-52"} relative overflow-hidden`}>
        <Image
          src={epoch.heroImage}
          alt={epoch.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

        {/* Colored overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 mix-blend-multiply"
          style={{ backgroundColor: epoch.color }}
        />

        {/* Period badge */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="text-[11px] uppercase tracking-widest text-white font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md transition-all duration-300 group-hover:bg-black/60 group-hover:px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            {epoch.period}
          </span>
        </div>

        {/* Epoch number */}
        <div className="absolute top-4 right-5 z-10">
          <span
            className={`font-[family-name:var(--font-heading)] ${large ? "text-8xl" : "text-6xl"} font-bold text-white/10 transition-all duration-500 group-hover:text-white/25 epoch-number-glow`}
          >
            {epoch.number}
          </span>
        </div>

        {/* Color accent line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-1.5"
          style={{ backgroundColor: epoch.color }}
        />
      </div>

      {/* Content */}
      <div className={`${large ? "p-6" : "p-5"}`}>
        <h3 className={`font-[family-name:var(--font-heading)] ${large ? "text-3xl" : "text-2xl"} font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1.5`}>
          {epoch.title}
        </h3>
        <p className={`text-sm text-[var(--color-harmony)] italic mb-3 ${large ? "text-base" : ""}`}>
          {epoch.subtitle}
        </p>
        <p className="text-sm text-[var(--color-text)]/50 leading-relaxed line-clamp-2">
          {epoch.landmarks.slice(0, 3).map((l) => l.name).join(" · ")}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-[var(--color-accent)] transition-all duration-300 group-hover:gap-3">
          <span>Читать</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
