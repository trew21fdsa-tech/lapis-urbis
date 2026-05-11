import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Lapis Urbis — учебный проект по дисциплине «Командообразование». Путеводитель по Риму через пять эпох.",
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-harmony)] mb-4 hero-anim-label">
        О проекте
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 hero-anim-title">
        Lapis Urbis
      </h1>
      <div className="divider mb-8 hero-anim-line" />

      <div className="space-y-6 text-base text-[var(--color-text)]/85 leading-[1.8] article-anim">
        <p>
          <strong>Lapis Urbis</strong> — «Камень города». Рим построен из камня:
          травертин Колизея, мрамор Пантеона, туф средневековых башен, бетон
          муссолиниевского EUR. Название подчёркивает материальность архитектуры —
          то, из чего сделаны шедевры.
        </p>

        <p>
          Этот сайт — путеводитель по Вечному городу, организованный
          не по географии, а по <em className="text-[var(--color-accent)] not-italic font-semibold">времени</em>.
          Пять эпох, пять взглядов на один и тот же город, который менялся,
          разрушался и каждый раз находил способ стать чем-то новым.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--color-text)] pt-4">
          Цель проекта
        </h2>
        <p>
          Сформировать представление о социокультурном развитии одного из самых
          влиятельных городов Европы. Сконструировать путь римского гражданина по
          культурным достопримечательностям и приобщить современного туриста к
          традициям публичного досуга, религиозной жизни и политической рефлексии
          разных эпох.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--color-text)] pt-4">
          Для кого
        </h2>
        <p>
          Для студентов культурологии и истории, для путешественников, готовящихся
          к поездке в Рим, и для всех, кто хочет понять этот город глубже, чем
          позволяет путеводитель из аэропорта.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--color-text)] pt-4">
          Источники
        </h2>
        <p>
          Материалы подготовлены на основе исследований по истории культуры,
          политической и социальной истории Рима, визуальных материалов проекта
          Aquae Urbis Romae (Katherine Wentworth Rinne) и других академических
          источников. Все ссылки указаны в тексте.
        </p>

        <div className="border-t border-[var(--color-lines)] pt-6 mt-8">
          <p className="text-sm text-[var(--color-harmony)]">
            Учебный проект по дисциплине «Командообразование», 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
