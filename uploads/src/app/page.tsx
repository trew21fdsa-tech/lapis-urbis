import Image from "next/image";
import { epochs } from "@/data/epochs";
import EpochCard from "@/components/EpochCard";

export default function Home() {
  return (
    <>
      {/* Hero with parallax background */}
      <section className="relative min-h-screen flex items-center justify-center px-6 parallax-wrap overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=1920&q=80"
          alt="Рим с высоты — вид на купола и черепичные крыши"
          fill
          className="object-cover parallax-img"
          priority
          sizes="100vw"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-[var(--color-bg)]" />

        {/* Decorative floating elements */}
        <div className="absolute top-1/4 left-8 w-20 h-20 border border-white/10 rounded-full float-gentle hidden md:block" />
        <div className="absolute bottom-1/3 right-12 w-14 h-14 border border-white/10 rounded-full float-gentle-delayed hidden md:block" />
        <div className="absolute top-1/3 right-1/4 w-1 h-24 bg-white/5 rotate-12 float-gentle hidden md:block" />

        <div className="relative max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-6 hero-anim-label" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            Путеводитель по Вечному городу
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-8xl font-bold text-white mb-6 hero-anim-title" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
            Lapis Urbis
          </h1>
          <div className="h-0.5 bg-white/60 mx-auto mb-6 hero-anim-line" />
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto mb-4 hero-anim-desc" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            Рим — это камень. Травертин, мрамор, туф, бетон.
            Пять эпох, пять историй о городе, который переживал империи,
            пап и диктаторов — и каждый раз становился собой.
          </p>
          <p className="text-sm text-white/60 italic hero-anim-sub" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
            Для тех, кто едет в Рим не фотографировать, а понимать.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-anim-sub flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Листайте</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-white/50 rounded-full scroll-indicator-dot" />
          </div>
        </div>
      </section>

      {/* Timeline / epoch counter */}
      <section className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center gap-8 md:gap-16" data-anim="anim-fade-up">
        {epochs.map((epoch, i) => (
          <a
            key={epoch.slug}
            href={`/epoch/${epoch.slug}`}
            className="group flex flex-col items-center gap-2 transition-all duration-300"
            data-anim="anim-scale-in"
            data-anim-delay={String(i * 120)}
          >
            <span
              className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold transition-colors duration-300 group-hover:text-[var(--color-accent)]"
              style={{ color: epoch.color }}
            >
              {epoch.number}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-lines)] group-hover:bg-[var(--color-accent)] transition-colors duration-300" />
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-harmony)] group-hover:text-[var(--color-accent)] transition-colors duration-300 hidden md:block">
              {epoch.period}
            </span>
          </a>
        ))}
      </section>

      {/* Epoch grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-4" data-anim="anim-slide-left">
          <div className="divider line-expand" />
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
            Пять эпох Рима
          </h2>
        </div>
        <p className="text-sm text-[var(--color-harmony)] mb-12 max-w-lg" data-anim="anim-fade-up" data-anim-delay="200">
          От травертина Колизея до стекла Ричарда Мейера — каждая эпоха оставила свой камень.
        </p>

        {/* First row: 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {epochs.slice(0, 2).map((epoch, i) => (
            <div key={epoch.slug} data-anim="anim-fade-up" data-anim-delay={String(i * 150)}>
              <EpochCard epoch={epoch} large />
            </div>
          ))}
        </div>
        {/* Second row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {epochs.slice(2).map((epoch, i) => (
            <div key={epoch.slug} data-anim="anim-fade-up" data-anim-delay={String((i + 2) * 150)}>
              <EpochCard epoch={epoch} />
            </div>
          ))}
        </div>
      </section>

      {/* Decorative separator */}
      <div className="max-w-xl mx-auto px-6 flex items-center gap-4 opacity-40" data-anim="anim-fade-in">
        <div className="flex-1 h-px bg-[var(--color-lines)]" />
        <span className="text-xs text-[var(--color-harmony)] font-[family-name:var(--font-heading)] italic">ab urbe condita</span>
        <div className="flex-1 h-px bg-[var(--color-lines)]" />
      </div>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center" data-anim="anim-fade-up">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-harmony)] mb-4">
          С чего начать?
        </p>
        <p className="text-lg text-[var(--color-text)]/80 leading-relaxed">
          Начните с{" "}
          <a href="/epoch/panem-et-circenses" className="text-[var(--color-accent)] font-semibold underline underline-offset-4 decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-all">
            Античности
          </a>{" "}
          — там, где родился камень, из которого сложен весь остальной Рим.
        </p>
      </section>
    </>
  );
}
