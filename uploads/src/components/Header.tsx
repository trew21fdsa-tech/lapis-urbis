"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { epochs } from "@/data/epochs";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-bg)] backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.06)] border-b border-[var(--color-lines)]"
          : "bg-black/30 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          style={{ textDecoration: "none" }}
        >
          <span
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-[family-name:var(--font-heading)] transition-all duration-300 ${
              scrolled
                ? "border-[var(--color-accent)]/60 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white"
                : "border-white/60 text-white group-hover:bg-white group-hover:text-[var(--color-text)]"
            }`}
          >
            LU
          </span>
          <span
            className={`font-[family-name:var(--font-heading)] text-xl font-semibold tracking-wide transition-colors duration-300 ${
              scrolled
                ? "text-[var(--color-text)] group-hover:text-[var(--color-accent)]"
                : "text-white group-hover:text-white/80"
            }`}
          >
            Lapis Urbis
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Главная" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Epochs dropdown */}
          <div className="relative group">
            <button
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Эпохи ▾
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <div className="bg-[var(--color-bg)] border border-[var(--color-lines)] rounded-xl shadow-xl py-2 min-w-[300px] overflow-hidden">
                {epochs.map((epoch) => (
                  <Link
                    key={epoch.slug}
                    href={`/epoch/${epoch.slug}`}
                    className="flex items-center gap-3 px-5 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)] transition-all duration-200 group/item"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--color-lines)] flex items-center justify-center text-xs font-bold text-[var(--color-harmony)] group-hover/item:bg-[var(--color-accent)] group-hover/item:text-white transition-all duration-200">
                      {epoch.number}
                    </span>
                    <div>
                      <div className="font-semibold font-[family-name:var(--font-heading)]">{epoch.title}</div>
                      <div className="text-xs text-[var(--color-harmony)]">{epoch.period}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {[
            { href: "/about", label: "О проекте" },
            { href: "/contacts", label: "Контакты" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-0.5 transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[var(--color-bg)] border-b border-[var(--color-lines)] px-6 pb-4">
          <Link href="/" className="block py-2.5 text-sm text-[var(--color-text)] font-semibold" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <div className="py-1 text-xs uppercase tracking-widest text-[var(--color-harmony)] font-semibold">Эпохи</div>
          {epochs.map((epoch) => (
            <Link
              key={epoch.slug}
              href={`/epoch/${epoch.slug}`}
              className="flex items-center gap-2 py-2 text-sm text-[var(--color-text)] pl-2"
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-5 h-5 rounded-full bg-[var(--color-lines)] flex items-center justify-center text-[10px] font-bold text-[var(--color-harmony)]">
                {epoch.number}
              </span>
              {epoch.subtitle}
            </Link>
          ))}
          <Link href="/about" className="block py-2.5 text-sm text-[var(--color-text)]" onClick={() => setMenuOpen(false)}>
            О проекте
          </Link>
          <Link href="/contacts" className="block py-2.5 text-sm text-[var(--color-text)]" onClick={() => setMenuOpen(false)}>
            Контакты
          </Link>
        </div>
      </div>
    </header>
  );
}
