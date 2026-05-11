import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { epochs, getEpochBySlug } from "@/data/epochs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return epochs.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const epoch = getEpochBySlug(slug);
  if (!epoch) return {};
  return {
    title: `${epoch.title} — ${epoch.subtitle}`,
    description: `${epoch.period}. ${epoch.landmarks.map((l) => l.name).join(", ")}`,
  };
}

export default async function EpochPage({ params }: Props) {
  const { slug } = await params;
  const epoch = getEpochBySlug(slug);
  if (!epoch) return notFound();

  const currentIndex = epochs.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? epochs[currentIndex - 1] : null;
  const next = currentIndex < epochs.length - 1 ? epochs[currentIndex + 1] : null;

  return (
    <>
      {/* Hero with parallax */}
      <section className="relative min-h-[60vh] flex items-end parallax-wrap overflow-hidden">
        <Image
          src={epoch.heroImage}
          alt={epoch.title}
          fill
          className="object-cover parallax-img"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Decorative epoch number watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-[family-name:var(--font-heading)] text-[20rem] md:text-[28rem] font-bold text-white/[0.04] leading-none">
            {epoch.number}
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto w-full px-6 pb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3 hero-anim-label">
            Эпоха {epoch.number} &middot; {epoch.period}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-white mb-2 hero-anim-title">
            {epoch.title}
          </h1>
          <p className="text-xl text-white/80 italic font-[family-name:var(--font-heading)] hero-anim-desc">
            {epoch.subtitle}
          </p>
          {/* Accent line under title */}
          <div className="h-0.5 w-0 bg-white/40 mt-4 hero-anim-line" />
        </div>
      </section>

      {/* Landmarks gallery */}
      <section className="border-b border-[var(--color-lines)] bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="divider line-expand" />
            <p className="text-xs uppercase tracking-widest text-[var(--color-harmony)]" data-anim="anim-fade-in">
              Ключевые достопримечательности
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {epoch.landmarks.map((landmark, i) => (
              <div
                key={landmark.name}
                className="landmark-card group"
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
                      style={{ backgroundColor: epoch.color + "20" }}
                    />
                  )}
                  {/* Color accent overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: epoch.color }}
                  />
                </div>
                <h4 className="text-sm font-semibold text-[var(--color-text)] leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {landmark.name}
                </h4>
                <p className="text-xs text-[var(--color-harmony)] mt-0.5 line-clamp-2">
                  {landmark.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12 article-anim">
        {/* Decorative quote mark */}
        <div className="text-6xl text-[var(--color-accent)]/10 font-[family-name:var(--font-heading)] leading-none mb-2 select-none" data-anim="anim-fade-in">
          &ldquo;
        </div>
        <div
          className="
            prose prose-lg max-w-none
            [&_h3]:font-[family-name:var(--font-heading)]
            [&_h3]:text-2xl [&_h3]:font-semibold
            [&_h3]:text-[var(--color-text)] [&_h3]:mt-10 [&_h3]:mb-4
            [&_p]:text-[var(--color-text)] [&_p]:leading-[1.8] [&_p]:mb-5
            [&_strong]:text-[var(--color-text)] [&_strong]:font-bold
            [&_em]:text-[var(--color-harmony)] [&_em]:not-italic
            [&_em]:text-sm [&_em]:tracking-wide
          "
          dangerouslySetInnerHTML={{ __html: epoch.content }}
        />
      </article>

      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-6 pb-16" data-anim="anim-fade-up">
        <div className="border-t border-[var(--color-lines)] pt-8 flex justify-between items-center">
          {prev ? (
            <Link
              href={`/epoch/${prev.slug}`}
              className="group flex flex-col transition-transform duration-300 hover:-translate-x-2"
            >
              <span className="text-xs uppercase tracking-widest text-[var(--color-harmony)] mb-1">
                &larr; Предыдущая эпоха
              </span>
              <span className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/epoch/${next.slug}`}
              className="group flex flex-col text-right transition-transform duration-300 hover:translate-x-2"
            >
              <span className="text-xs uppercase tracking-widest text-[var(--color-harmony)] mb-1">
                Следующая эпоха &rarr;
              </span>
              <span className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex flex-col text-right transition-transform duration-300 hover:translate-x-2"
            >
              <span className="text-xs uppercase tracking-widest text-[var(--color-harmony)] mb-1">
                Вернуться &rarr;
              </span>
              <span className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                На главную
              </span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
