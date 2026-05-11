import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться с командой проекта Lapis Urbis.",
};

export default function ContactsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-harmony)] mb-4 hero-anim-label">
        Связь
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 hero-anim-title">
        Контакты
      </h1>
      <div className="divider mb-8 hero-anim-line" />

      <div className="space-y-8 article-anim">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-text)] mb-2">
            Команда проекта
          </h2>
          <p className="text-base text-[var(--color-text)]/80 leading-relaxed">
            Lapis Urbis создан студенческой командой в рамках курса
            «Командообразование». Если у вас есть вопросы, замечания или
            предложения — мы будем рады обратной связи.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-[var(--color-lines)] rounded-lg p-5 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-md" data-anim="anim-fade-up" data-anim-delay="100">
            <p className="text-xs uppercase tracking-widest text-[var(--color-harmony)] mb-2">
              Email
            </p>
            <a
              href="mailto:lapis.urbis@example.com"
              className="text-[var(--color-accent)] hover:underline transition-colors"
            >
              lapis.urbis@example.com
            </a>
          </div>
          <div className="border border-[var(--color-lines)] rounded-lg p-5 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-md" data-anim="anim-fade-up" data-anim-delay="250">
            <p className="text-xs uppercase tracking-widest text-[var(--color-harmony)] mb-2">
              Университет
            </p>
            <p className="text-base text-[var(--color-text)]">
              Факультет культурологии
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-lines)] pt-6" data-anim="anim-fade-in">
          <p className="text-sm text-[var(--color-harmony)]">
            Все материалы сайта подготовлены в учебных целях.
            При использовании материалов ссылка на источник обязательна.
          </p>
        </div>
      </div>
    </section>
  );
}
