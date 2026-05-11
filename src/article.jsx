// ArticlePage — fullscreen overlay for the long-form article attached to an epoch.
// Opens via hash #article/<epochSlug>. Mirrors LandmarkPage chrome but lays content
// as a single editorial column with structured blocks.

const ArticlePage = () => {
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const match = hash.match(/^#article\/([^/]+)/);
  const epoch = match ? window.EPOCHS.find((e) => e.slug === match[1]) : null;
  const article = epoch ? window.ARTICLES?.[epoch.slug] : null;

  // prev / next article (only across epochs that have one)
  const epochsWithArticle = React.useMemo(
    () => window.EPOCHS.filter((e) => window.ARTICLES?.[e.slug]),
    []
  );
  const aIdx = article ? epochsWithArticle.findIndex((e) => e.slug === epoch.slug) : -1;
  const prevEp = aIdx > 0 ? epochsWithArticle[aIdx - 1] : null;
  const nextEp = aIdx >= 0 && aIdx < epochsWithArticle.length - 1 ? epochsWithArticle[aIdx + 1] : null;

  // body lock + Esc + arrow keys
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (!article) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && prevEp) window.location.hash = `#article/${prevEp.slug}`;
      if (e.key === "ArrowRight" && nextEp) window.location.hash = `#article/${nextEp.slug}`;
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
    };
  }, [article, prevEp, nextEp]);

  if (!epoch || !article) return null;

  const close = () => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setHash("");
  };

  // Render one block by kind
  const renderBlock = (b, i) => {
    switch (b.k) {
      case "h2":
        return (
          <h2 key={i} className="lu-art__h2">
            <span className="lu-art__h2-rule" />
            <span>{b.t}</span>
          </h2>
        );
      case "h3":
        return <h3 key={i} className="lu-art__h3">{b.t}</h3>;
      case "p":
        return <p key={i} className="lu-art__p">{b.t}</p>;
      case "pull":
        return (
          <blockquote key={i} className="lu-art__pull">
            <span className="lu-art__pull-mark">“</span>
            {b.t}
          </blockquote>
        );
      case "listItem":
        return (
          <div key={i} className="lu-art__li">
            <span className="lu-art__li-bullet">—</span>
            <span>{b.t}</span>
          </div>
        );
      case "meta":
        return (
          <dl key={i} className="lu-art__meta">
            {b.items.map(([lbl, val], j) => (
              <div key={j} className="lu-art__meta-row">
                <dt>{lbl}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
        );
      case "caption":
        return (
          <div key={i} className="lu-art__cap">
            <span className="lu-art__cap-mark">фиг.</span>
            <span className="lu-art__cap-txt">
              {b.t}
              {b.url && (
                <>
                  {" "}
                  <a href={b.url} target="_blank" rel="noreferrer" className="lu-art__cap-url">
                    [источник →]
                  </a>
                </>
              )}
            </span>
          </div>
        );
      case "figureCredit":
        return (
          <div key={i} className="lu-art__fc">
            {b.t}
            {b.url && (
              <>
                {" "}
                <a href={b.url} target="_blank" rel="noreferrer">[ссылка]</a>
              </>
            )}
          </div>
        );
      case "source":
        return (
          <li key={i} className="lu-art__src">
            <span className="lu-art__src-txt">{b.t}</span>
            {b.url && (
              <a href={b.url} target="_blank" rel="noreferrer" className="lu-art__src-url">
                {b.url}
              </a>
            )}
          </li>
        );
      default:
        return null;
    }
  };

  // Group consecutive sources into a single <ul> for proper list semantics.
  const renderBlocks = (blocks) => {
    const out = [];
    let bucket = null;
    blocks.forEach((b, i) => {
      if (b.k === "source") {
        if (!bucket) bucket = [];
        bucket.push(b);
      } else {
        if (bucket) {
          out.push(
            <ul key={`src-${i}`} className="lu-art__sources">
              {bucket.map((bb, j) => renderBlock(bb, `${i}-${j}`))}
            </ul>
          );
          bucket = null;
        }
        out.push(renderBlock(b, i));
      }
    });
    if (bucket) {
      out.push(
        <ul key="src-final" className="lu-art__sources">
          {bucket.map((bb, j) => renderBlock(bb, `final-${j}`))}
        </ul>
      );
    }
    return out;
  };

  return (
    <div
      className="lu-art"
      data-screen-label={`Article: ${article.title}`}
      style={{ "--epoch-color": epoch.color }}
    >
      <div className="lu-art__overlay" onClick={close} />

      <article className="lu-art__sheet" ref={scrollRef}>
        {/* Top bar */}
        <header className="lu-art__bar">
          <div className="lu-art__crumbs">
            <a href="#index" onClick={close}>Lapis Urbis</a>
            <span>/</span>
            <a href={`#epoch-${epoch.slug}`} onClick={close}>{epoch.period}</a>
            <span>/</span>
            <span className="lu-art__crumb-cur">К статье</span>
          </div>
          <button className="lu-art__close" onClick={close} aria-label="Закрыть">
            <span>Закрыть</span>
            <span className="lu-art__close-x">×</span>
          </button>
        </header>

        {/* Hero */}
        <section className="lu-art__hero">
          <div className="lu-art__heroimg">
            <img src={epoch.heroImage} alt={epoch.title} />
            <div className="lu-art__heroshade" />
          </div>
          <div className="lu-art__herotxt">
            <div className="lu-art__epoch-tag">
              <span className="lu-art__epoch-num">{epoch.number}</span>
              <span className="lu-art__epoch-name">{epoch.period}</span>
              <span className="lu-art__epoch-years">{epoch.years}</span>
            </div>
            <div className="lu-art__order">
              Статья {aIdx + 1} из {epochsWithArticle.length} · эпоха «{epoch.title}»
            </div>
            <h1 className="lu-art__title">{article.title}</h1>
            {article.kicker && (
              <div className="lu-art__kicker"><em>«{article.kicker}»</em></div>
            )}
            {article.author && (
              <div className="lu-art__author">{article.author}</div>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="lu-art__body">
          <div className="lu-art__col">
            {renderBlocks(article.blocks)}
          </div>
        </section>

        {/* Bottom nav */}
        <nav className="lu-art__nav">
          <a
            className={`lu-art__navbtn lu-art__navbtn--prev ${prevEp ? "" : "is-disabled"}`}
            href={prevEp ? `#article/${prevEp.slug}` : "#"}
            onClick={(e) => !prevEp && e.preventDefault()}
            style={prevEp ? { "--nav-color": prevEp.color } : undefined}
          >
            <span className="lu-art__navlbl">← Предыдущая статья</span>
            <span className="lu-art__navname">{prevEp ? prevEp.title : "—"}</span>
            {prevEp && <span className="lu-art__navepoch">{prevEp.period}, {prevEp.years}</span>}
          </a>
          <a
            className="lu-art__navbtn lu-art__navbtn--up"
            href={`#epoch-${epoch.slug}`}
            onClick={close}
          >
            <span className="lu-art__navlbl">↑ К эпохе</span>
            <span className="lu-art__navname">{epoch.title}</span>
          </a>
          <a
            className={`lu-art__navbtn lu-art__navbtn--next ${nextEp ? "" : "is-disabled"}`}
            href={nextEp ? `#article/${nextEp.slug}` : "#"}
            onClick={(e) => !nextEp && e.preventDefault()}
            style={nextEp ? { "--nav-color": nextEp.color } : undefined}
          >
            <span className="lu-art__navlbl">Следующая статья →</span>
            <span className="lu-art__navname">{nextEp ? nextEp.title : "—"}</span>
            {nextEp && <span className="lu-art__navepoch">{nextEp.period}, {nextEp.years}</span>}
          </a>
        </nav>
      </article>
    </div>
  );
};

window.ArticlePage = ArticlePage;
