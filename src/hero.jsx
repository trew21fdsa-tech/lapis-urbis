// Hero — cinematic editorial cover. Dark, full bleed.
const Hero = () => {
  const [scroll, setScroll] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scroll * 0.35, 300);
  const blur = Math.min(scroll / 80, 4);
  const opacity = Math.max(1 - scroll / 700, 0);

  return (
    <section className="lu-hero" data-screen-label="01 Hero">
      {/* Background: archival film image of the Pantheon oculus */}
      <div className="lu-hero__bg" aria-hidden="true">
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Rome-Pantheon-Interieur1.jpg?width=2400"
          alt=""
          style={{
            transform: `translate3d(0, ${parallax}px, 0) scale(${1 + scroll / 4000})`,
            filter: `blur(${blur}px) contrast(1.05) saturate(0.85)`,
          }}
        />
        <div className="lu-hero__vignette" />
        <div className="lu-hero__grain" />
      </div>

      {/* Editorial header strip */}
      <header className="lu-masthead">
        <div className="lu-masthead__brand">
          <span className="lu-mark">◬</span>
          <span className="lu-mark__text">LAPIS · URBIS</span>
        </div>
        <nav className="lu-masthead__nav">
          <a href="#index">Эпохи</a>
          <a href="#catalog">Каталог</a>
          <a href="#manifesto">О проекте</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="lu-masthead__meta">
          <span>VOL. I</span>
          <span className="lu-dot">·</span>
          <span>MMXXVI</span>
        </div>
      </header>

      {/* Main hero content */}
      <div className="lu-hero__content" style={{ opacity, transform: `translateY(${scroll * 0.15}px)` }}>
        <div className="lu-hero__center">
          <div className="lu-hero__kicker">
            <span className="lu-hairline" />
            <span>Путеводитель по Вечному городу</span>
            <span className="lu-hairline" />
          </div>

          <h1 className="lu-hero__title">
            <span className="lu-display lu-display--lapis">Lapis</span>
            <span className="lu-display lu-display--urbis">Urbis</span>
          </h1>

          <p className="lu-hero__lede">
            Рим — это камень. Травертин, мрамор, туф, бетон.<br />
            Пять эпох, пять историй о городе, который переживал империи,
            пап и диктаторов — и каждый раз становился собой.
          </p>

          <div className="lu-hero__cta">
            <a href="#index" className="lu-btn lu-btn--primary">
              <span>К списку эпох</span>
              <span className="lu-btn__arrow">↓</span>
            </a>
            <a href="#manifesto" className="lu-btn lu-btn--ghost">Манифест</a>
          </div>
        </div>
      </div>

      {/* Bottom info row */}
      <div className="lu-hero__footrow">
        <div className="lu-hero__credit">
          fig. 001 · Cupola del Pantheon, c. 126 d.C.
        </div>
        <div className="lu-hero__scroll">
          <span>SCROLL</span>
          <span className="lu-hero__scrolldot" />
        </div>
        <div className="lu-hero__lat">
          <em>«Roma quanta fuit ipsa ruina docet»</em>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
