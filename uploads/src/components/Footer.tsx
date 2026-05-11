import Link from "next/link";
import { epochs } from "@/data/epochs";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-lines)] mt-24 relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-anim="anim-fade-up">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3">
              Lapis Urbis
            </h3>
            <p className="text-sm text-[var(--color-harmony)] leading-relaxed">
              Путеводитель по Риму через пять эпох.
              <br />
              Камень, вера, власть, идеология, память.
            </p>
          </div>

          {/* Epochs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-harmony)] mb-3">
              Эпохи
            </h4>
            <ul className="space-y-1.5">
              {epochs.map((epoch) => (
                <li key={epoch.slug}>
                  <Link
                    href={`/epoch/${epoch.slug}`}
                    className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {epoch.subtitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-harmony)] mb-3">
              Навигация
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-lines)] text-center text-sm text-[var(--color-harmony)]">
          &copy; 2026 Lapis Urbis. Учебный проект по дисциплине &laquo;Командообразование&raquo;.
        </div>
      </div>
    </footer>
  );
}
