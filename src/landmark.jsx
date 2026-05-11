// LandmarkPage — fullscreen overlay-page for an individual landmark.
// Opens via hash #landmark/{epochSlug}/{landmarkSlug}; closes on overlay/back/Esc.

const LandmarkPage = () => {
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // parse #landmark/<epoch>/<landmark>
  const match = hash.match(/^#landmark\/([^/]+)\/([^/]+)/);
  const epoch = match ? window.EPOCHS.find((e) => e.slug === match[1]) : null;
  const landmark = epoch ? epoch.landmarks.find((l) => l.slug === match[2]) : null;

  // collect all landmarks flat (across epochs) for prev/next
  const flat = React.useMemo(() => {
    const out = [];
    window.EPOCHS.forEach((ep) =>
      ep.landmarks.forEach((l) => out.push({ ...l, epoch: ep }))
    );
    return out;
  }, []);

  const idx = landmark ? flat.findIndex((l) => l.slug === landmark.slug) : -1;
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 && idx >= 0 ? flat[idx + 1] : null;

  // body lock + Esc
  React.useEffect(() => {
    if (!landmark) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && prev) goTo(prev);
      if (e.key === "ArrowRight" && next) goTo(next);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
    };
  }, [landmark, prev, next]);

  // scroll content to top on landmark change
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [landmark?.slug]);

  if (!epoch || !landmark) return null;

  const coords = window.LANDMARK_COORDS[landmark.slug];
  const heroSrc = window.thumb(landmark.image, 2400);

  const goTo = (l) => {
    window.location.hash = `#landmark/${l.epoch.slug}/${l.slug}`;
  };
  const close = () => {
    // remove hash without jump
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setHash("");
  };

  const orderInEpoch = epoch.landmarks.findIndex((l) => l.slug === landmark.slug) + 1;

  return (
    <div className="lu-lp" data-screen-label={`Landmark: ${landmark.name}`} style={{ "--epoch-color": epoch.color }}>
      <div className="lu-lp__overlay" onClick={close} />

      <div className="lu-lp__sheet" ref={scrollRef}>
        {/* Top bar */}
        <header className="lu-lp__bar">
          <div className="lu-lp__crumbs">
            <a href="#index" onClick={close}>Lapis Urbis</a>
            <span>/</span>
            <a href={`#epoch-${epoch.slug}`} onClick={close}>{epoch.period}</a>
            <span>/</span>
            <span className="lu-lp__crumb-cur">{landmark.name}</span>
          </div>
          <button className="lu-lp__close" onClick={close} aria-label="Закрыть">
            <span>Закрыть</span>
            <span className="lu-lp__close-x">×</span>
          </button>
        </header>

        {/* Hero */}
        <section className="lu-lp__hero">
          <div className="lu-lp__heroimg">
            <img src={heroSrc} alt={landmark.name} />
            <div className="lu-lp__heroshade" />
          </div>
          <div className="lu-lp__herotxt">
            <div className="lu-lp__epoch-tag">
              <span className="lu-lp__epoch-num">{epoch.number}</span>
              <span className="lu-lp__epoch-name">{epoch.period}</span>
              <span className="lu-lp__epoch-years">{epoch.years}</span>
            </div>
            <div className="lu-lp__order">
              Памятник {orderInEpoch} из {epoch.landmarks.length} · эпоха {epoch.title}
            </div>
            <h1 className="lu-lp__title">{landmark.name}</h1>
            <div className="lu-lp__year">{landmark.year}</div>
          </div>
        </section>

        {/* Meta strip */}
        <section className="lu-lp__meta">
          <div className="lu-lp__metacol">
            <div className="lu-lp__metalbl">Где</div>
            <div className="lu-lp__metaval">{landmark.location}</div>
          </div>
          <div className="lu-lp__metacol">
            <div className="lu-lp__metalbl">Материал</div>
            <div className="lu-lp__metaval">{landmark.material}</div>
          </div>
          <div className="lu-lp__metacol">
            <div className="lu-lp__metalbl">Год</div>
            <div className="lu-lp__metaval">{landmark.year}</div>
          </div>
          <div className="lu-lp__metacol">
            <div className="lu-lp__metalbl">Эпоха</div>
            <div className="lu-lp__metaval">
              <span className="lu-lp__metadot" />
              {epoch.period}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="lu-lp__body">
          <div className="lu-lp__intro">{landmark.intro}</div>

          <div className="lu-lp__cols">
            <div className="lu-lp__copy">
              {landmark.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <aside className="lu-lp__aside">
              <div className="lu-lp__why-lbl">Зачем смотреть</div>
              <div className="lu-lp__why">{landmark.why}</div>

              {coords && (
                <div className="lu-lp__map">
                  <div className="lu-lp__map-head">
                    <span className="lu-lp__map-lbl">Где это в Риме</span>
                    <span className="lu-lp__map-coords">
                      {coords[0].toFixed(4)}°, {coords[1].toFixed(4)}°
                    </span>
                  </div>
                  <div className="lu-lp__map-frame">
                    <iframe
                      title={`Карта: ${landmark.name}`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords[1] - 0.0035},${coords[0] - 0.0018},${coords[1] + 0.0035},${coords[0] + 0.0018}&layer=mapnik&marker=${coords[0]},${coords[1]}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    className="lu-lp__map-open"
                    href={`https://www.openstreetmap.org/?mlat=${coords[0]}&mlon=${coords[1]}#map=18/${coords[0]}/${coords[1]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть в OpenStreetMap →
                  </a>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* Other landmarks of same epoch */}
        <section className="lu-lp__siblings">
          <div className="lu-lp__siblings-head">
            <span className="lu-tag lu-tag--dark">Эпоха {epoch.number} · {epoch.period}</span>
            <span className="lu-rule" />
            <span>Остальные памятники этой главы</span>
          </div>
          <div className="lu-lp__siblings-list">
            {epoch.landmarks.map((l) => {
              const cur = l.slug === landmark.slug;
              return (
                <a
                  key={l.slug}
                  className={`lu-lp__sib ${cur ? "is-cur" : ""}`}
                  href={`#landmark/${epoch.slug}/${l.slug}`}
                  onClick={(e) => {
                    if (cur) e.preventDefault();
                  }}
                >
                  <span className="lu-lp__sib-img">
                    <img src={window.thumb(l.image, 600)} alt="" loading="lazy" />
                  </span>
                  <span className="lu-lp__sib-name">{l.name}</span>
                  <span className="lu-lp__sib-year">{l.year}</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Bottom nav */}
        <nav className="lu-lp__nav">
          <a
            className={`lu-lp__navbtn lu-lp__navbtn--prev ${prev ? "" : "is-disabled"}`}
            href={prev ? `#landmark/${prev.epoch.slug}/${prev.slug}` : "#"}
            onClick={(e) => !prev && e.preventDefault()}
            style={prev ? { "--nav-color": prev.epoch.color } : undefined}
          >
            <span className="lu-lp__navlbl">← Предыдущий памятник</span>
            <span className="lu-lp__navname">{prev ? prev.name : "—"}</span>
            {prev && <span className="lu-lp__navepoch">{prev.epoch.period}, {prev.year}</span>}
          </a>
          <a className="lu-lp__navbtn lu-lp__navbtn--up" href={`#epoch-${epoch.slug}`} onClick={close}>
            <span className="lu-lp__navlbl">↑ К эпохе</span>
            <span className="lu-lp__navname">{epoch.title}</span>
          </a>
          <a
            className={`lu-lp__navbtn lu-lp__navbtn--next ${next ? "" : "is-disabled"}`}
            href={next ? `#landmark/${next.epoch.slug}/${next.slug}` : "#"}
            onClick={(e) => !next && e.preventDefault()}
            style={next ? { "--nav-color": next.epoch.color } : undefined}
          >
            <span className="lu-lp__navlbl">Следующий памятник →</span>
            <span className="lu-lp__navname">{next ? next.name : "—"}</span>
            {next && <span className="lu-lp__navepoch">{next.epoch.period}, {next.year}</span>}
          </a>
        </nav>
      </div>
    </div>
  );
};

window.LandmarkPage = LandmarkPage;
