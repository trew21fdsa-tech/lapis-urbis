// Manifesto ticker — horizontal marquee of Latin phrases
const ManifestoTicker = () => {
  const items = window.MANIFESTO_TICKER || [];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="lu-ticker" data-screen-label="02 Ticker">
      <div className="lu-ticker__track">
        {doubled.map((t, i) => (
          <span key={i} className="lu-ticker__item">
            <span>{t}</span>
            <span className="lu-ticker__sep">◇</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// EpochIndex — primary navigation. Big visual list of 5 epochs right after hero.
const EpochIndex = () => {
  const [hover, setHover] = React.useState(null);
  return (
    <section className="lu-index" id="index" data-screen-label="03 Index">
      <div className="lu-index__head">
        <div className="lu-tag lu-tag--dark">§ Index · Содержание</div>
        <h2 className="lu-index__title">
          Пять <em>эпох</em> Рима
        </h2>
        <p className="lu-index__sub">
          Каждая эпоха — отдельная глава со своими камнями, своим цветом и своей логикой.
          Выберите начало пути.
        </p>
      </div>

      <div className="lu-index__list" onMouseLeave={() => setHover(null)}>
        {window.EPOCHS.map((e, i) => (
          <a
            key={e.slug}
            href={`#epoch-${e.slug}`}
            className={`lu-idx-row ${hover !== null && hover !== i ? "is-dim" : ""} ${hover === i ? "is-active" : ""}`}
            onMouseEnter={() => setHover(i)}
            style={{ "--epoch-color": e.color }}
          >
            <span className="lu-idx-row__num">{e.number}</span>
            <span className="lu-idx-row__period">
              <span className="lu-idx-row__period-name">{e.period}</span>
              <span className="lu-idx-row__years">{e.years}</span>
            </span>
            <span className="lu-idx-row__title">
              {e.title}
              <span className="lu-idx-row__sub"><em>«{e.subtitle}»</em></span>
            </span>
            <span className="lu-idx-row__count">
              {e.landmarks.length} памятников
            </span>
            <span className="lu-idx-row__thumb">
              <img src={window.thumb(e.heroImage, 480)} alt="" loading="lazy" />
            </span>
            <span className="lu-idx-row__cta">Открыть →</span>
          </a>
        ))}
      </div>
    </section>
  );
};

// StickyRail — vertical fixed nav showing epoch progress while reading slabs
const StickyRail = () => {
  const [active, setActive] = React.useState(-1);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const slabs = document.querySelectorAll("[data-slab-idx]");
      const wrap = document.getElementById("epochs-start");
      const catalog = document.getElementById("catalog");
      const wrapTop = wrap?.getBoundingClientRect().top ?? 9999;
      const catalogTop = catalog?.getBoundingClientRect().top ?? 9999;
      setVisible(wrapTop < window.innerHeight * 0.5 && catalogTop > 200);
      let cur = -1;
      slabs.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.4) cur = parseInt(s.dataset.slabIdx, 10);
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={`lu-rail ${visible ? "is-vis" : ""}`} aria-label="Эпохи">
      <a href="#index" className="lu-rail__back" title="К списку эпох">
        <span>↑</span>
        <span className="lu-rail__back-lbl">INDEX</span>
      </a>
      <div className="lu-rail__list">
        {window.EPOCHS.map((e, i) => (
          <a
            key={e.slug}
            href={`#epoch-${e.slug}`}
            className={`lu-rail__dot ${i === active ? "is-active" : ""}`}
            style={{ "--epoch-color": e.color }}
            title={e.title}
          >
            <span className="lu-rail__num">{e.number}</span>
            <span className="lu-rail__hover">
              <span className="lu-rail__hover-period">{e.period}</span>
              <span className="lu-rail__hover-title">{e.title}</span>
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
};

// Epoch slab — full-screen editorial block per epoch
const EpochSlab = ({ epoch, idx }) => {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVis(e.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const reverse = idx % 2 === 1;
  const prev = idx > 0 ? window.EPOCHS[idx - 1] : null;
  const next = idx < window.EPOCHS.length - 1 ? window.EPOCHS[idx + 1] : null;

  return (
    <section
      ref={ref}
      id={`epoch-${epoch.slug}`}
      data-slab-idx={idx}
      className={`lu-slab ${vis ? "is-vis" : ""} ${reverse ? "lu-slab--rev" : ""}`}
      data-screen-label={`0${idx + 4} ${epoch.title}`}
      style={{ "--epoch-color": epoch.color }}
    >
      <div className="lu-slab__rule">
        <a href="#index" className="lu-slab__back">← К списку эпох</a>
        <span className="lu-rule" />
        <span>fig. 0{idx + 2}</span>
        <span className="lu-rule" />
        <span>{epoch.years}</span>
      </div>

      <div className="lu-slab__grid">
        <div className="lu-slab__media">
          <div className="lu-slab__imgwrap">
            <img src={epoch.heroImage} alt={epoch.title} loading="lazy" />
            <div className="lu-slab__imgtint" />
          </div>
          <div className="lu-slab__keyword">{epoch.keyword}</div>
        </div>

        <div className="lu-slab__text">
          <div className="lu-slab__head">
            <div className="lu-slab__numwrap">
              <div className="lu-slab__num">{epoch.number}</div>
              <div className="lu-slab__numlbl">CAPVT</div>
            </div>
            <div className="lu-slab__period">
              <span className="lu-tag lu-tag--dark">{epoch.period}</span>
              <span className="lu-fineprint lu-fineprint--dark">{epoch.years}</span>
            </div>
          </div>

          <h2 className="lu-slab__title">{epoch.title}</h2>
          <p className="lu-slab__sub"><em>«{epoch.subtitle}»</em></p>

          <p className="lu-slab__lede">{epoch.lede}</p>

          <blockquote className="lu-slab__pull">
            <span className="lu-pull__mark">“</span>
            {epoch.pull}
          </blockquote>

          <div className="lu-slab__landmarks">
            <div className="lu-slab__landmarks-head">
              <span>Памятники эпохи</span>
              <span className="lu-rule lu-rule--mini" />
              <span>{epoch.landmarks.length}</span>
            </div>
            <ul className="lu-slab__landmarks-list">
              {epoch.landmarks.map((l, i) => (
                <li key={i}>
                  <a href={`#landmark/${epoch.slug}/${l.slug}`} className="lu-landmark__link">
                    <span className="lu-landmark__bullet">—</span>
                    <span className="lu-landmark__name">{l.name}</span>
                    <span className="lu-landmark__dots" />
                    <span className="lu-landmark__year">{l.year}</span>
                    <span className="lu-landmark__arr">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {window.ARTICLES?.[epoch.slug] && (
            <a href={`#article/${epoch.slug}`} className="lu-slab__article">
              <div className="lu-slab__article-meta">
                <span className="lu-tag lu-tag--dark">§ Очерк эпохи</span>
                <span className="lu-fineprint lu-fineprint--dark">
                  {window.ARTICLES[epoch.slug].author || "Lapis Urbis"}
                </span>
              </div>
              <div className="lu-slab__article-title">
                <em>«{window.ARTICLES[epoch.slug].title}»</em>
              </div>
              {window.ARTICLES[epoch.slug].kicker && (
                <div className="lu-slab__article-kick">
                  {window.ARTICLES[epoch.slug].kicker}
                </div>
              )}
              <div className="lu-slab__article-cta">
                <span className="lu-rule lu-rule--mini" />
                <span>Читать полностью</span>
                <span className="lu-slab__article-arr">→</span>
              </div>
            </a>
          )}
        </div>
      </div>

      <div className="lu-slab__nav">
        <a
          href={prev ? `#epoch-${prev.slug}` : "#index"}
          className="lu-slab__navbtn lu-slab__navbtn--prev"
          style={prev ? { "--nav-color": prev.color } : undefined}
        >
          <span className="lu-slab__navbtn-lbl">← Предыдущая</span>
          <span className="lu-slab__navbtn-name">
            {prev ? `${prev.number}. ${prev.title}` : "К списку эпох"}
          </span>
        </a>
        <a href="#index" className="lu-slab__navbtn lu-slab__navbtn--idx">
          <span className="lu-slab__navbtn-lbl">↑ Все эпохи</span>
          <span className="lu-slab__navbtn-name">Index</span>
        </a>
        <a
          href={next ? `#epoch-${next.slug}` : "#catalog"}
          className="lu-slab__navbtn lu-slab__navbtn--next"
          style={next ? { "--nav-color": next.color } : undefined}
        >
          <span className="lu-slab__navbtn-lbl">Следующая →</span>
          <span className="lu-slab__navbtn-name">
            {next ? `${next.number}. ${next.title}` : "Каталог памятников"}
          </span>
        </a>
      </div>
    </section>
  );
};

// Catalog — flat archival list of all 25 landmarks
const CatalogIndex = () => {
  const all = [];
  window.EPOCHS.forEach((ep) => {
    ep.landmarks.forEach((l) => all.push({ ...l, epoch: ep }));
  });
  return (
    <section className="lu-catalog" id="catalog" data-screen-label="09 Catalog">
      <div className="lu-catalog__head">
        <div className="lu-tag">§ Каталог</div>
        <h2 className="lu-catalog__title">
          Двадцать пять <em>камней</em>
        </h2>
        <p className="lu-catalog__sub">
          Полный индекс памятников, расположенных по эпохам.
          Каждая запись — точка на карте Вечного города.
        </p>
      </div>

      <div className="lu-catalog__rows">
        <div className="lu-catalog__head-row">
          <span>№</span>
          <span>Памятник</span>
          <span>Эпоха</span>
          <span>Год</span>
          <span>Foto</span>
        </div>
        {all.map((l, i) => (
          <a
            key={i}
            href={`#landmark/${l.epoch.slug}/${l.slug}`}
            className="lu-catalog__row"
            style={{ "--row-color": l.epoch.color }}
          >
            <span className="lu-catalog__num">{String(i + 1).padStart(3, "0")}</span>
            <span className="lu-catalog__name">{l.name}</span>
            <span className="lu-catalog__epoch">
              <span className="lu-catalog__dot" />
              {l.epoch.period}
            </span>
            <span className="lu-catalog__year">{l.year}</span>
            <span className="lu-catalog__thumb">
              <img src={window.thumb(l.image, 320)} alt="" loading="lazy" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

// Manifesto block — about the project
const Manifesto = () => (
  <section className="lu-manifesto" id="manifesto" data-screen-label="10 About">
    <div className="lu-manifesto__inner">
      <aside className="lu-manifesto__aside">
        <div className="lu-tag lu-tag--dark">§ О проекте</div>
        <div className="lu-fineprint lu-fineprint--dark">
          <span>De urbe</span>
          <span>Folia I—V</span>
        </div>
      </aside>
      <div className="lu-manifesto__body">
        <p className="lu-manifesto__lede">
          <span className="lu-dropcap">Р</span>им принято называть «Вечным городом»,
          но эта вечность — не абстракция. Она осязаема. И в ней есть история
          социальных драм, политических интриг и человеческих идей, героизма и трусости,
          скорби и триумфа.
        </p>
        <p className="lu-manifesto__copy">
          Lapis Urbis вырос из простого убеждения: архитектура — это не фотозона
          и не референсы для учебных пособий. Мы создали этот ресурс для тех, кто хочет
          углубиться в организм городского пространства бывшего центра всего цивилизованного
          мира, а сейчас — источника талантливых людей и вдохновения.
        </p>
        <p className="lu-manifesto__copy">
          Мы не пересказываем даты правления императоров. Наша цель — проследить, как
          городская среда формировала человека, и как человек ломал и перестраивал город
          под свои нужды. Мы смотрим на Рим как на геологический разрез истории:
          материальность важнее открыточных видов, критика — важнее восторженных эпитетов.
        </p>
        <div className="lu-manifesto__team">
          <div className="lu-manifesto__team-h">
            <span>Команда</span>
            <span className="lu-rule lu-rule--mini" />
            <span>группа 5101-460401D</span>
          </div>
          <ul className="lu-manifesto__team-list">
            <li><span>Рыбочкин Артём</span><em>главный редактор</em></li>
            <li><span>Елизавета Фоминых</span><em>куратор</em></li>
            <li><span>Николай Татаровский</span><em>дизайнер</em></li>
            <li><span>Елена Яковенко</span><em>«Panem et Circenses»</em></li>
            <li><span>Илья Майоров, Арина Волкова</span><em>«Militia Est Vita Hominis»</em></li>
            <li><span>Иван Сивков</span><em>«Quo Vadis, Папа?»</em></li>
            <li><span>Фархат Клушев, Екатерина Харенкова, Елизавета Куванова</span><em>«Белый травертин чёрного времени»</em></li>
            <li><span>Виктория Носкова, Полина Вытченкова</span><em>«Via della Conciliazione: улица примирения?»</em></li>
          </ul>
        </div>
        <div className="lu-manifesto__byline">
          <span className="lu-hairline lu-hairline--dark" />
          <span>Lapis Urbis · Рим · MMXXVI</span>
        </div>
      </div>
      <aside className="lu-manifesto__counter">
        <div className="lu-counter">
          <div className="lu-counter__num">05</div>
          <div className="lu-counter__lbl">эпох</div>
        </div>
        <div className="lu-counter">
          <div className="lu-counter__num">25</div>
          <div className="lu-counter__lbl">памятников</div>
        </div>
        <div className="lu-counter">
          <div className="lu-counter__num">28</div>
          <div className="lu-counter__lbl">веков</div>
        </div>
      </aside>
    </div>
  </section>
);

// Footer / colophon
const Colophon = () => (
  <footer className="lu-colophon" id="contacts" data-screen-label="11 Colophon">
    <div className="lu-colophon__top">
      <div className="lu-colophon__brand">
        <span className="lu-mark lu-mark--big">◬</span>
        <div>
          <div className="lu-colophon__name">Lapis Urbis</div>
          <div className="lu-colophon__tag">— Камень города —</div>
        </div>
      </div>
      <div className="lu-colophon__cols">
        <div>
          <div className="lu-colophon__h">Эпохи</div>
          {window.EPOCHS.map((e) => (
            <a key={e.slug} href={`#epoch-${e.slug}`}>
              <span className="lu-colophon__num">{e.number}</span> {e.title}
            </a>
          ))}
        </div>
        <div>
          <div className="lu-colophon__h">Проект</div>
          <a href="#manifesto">О проекте</a>
          <a href="#index">Эпохи</a>
          <a href="#catalog">Каталог памятников</a>
          <a href="#">Источники</a>
        </div>
        <div>
          <div className="lu-colophon__h">Связь</div>
          <a href="mailto:mrwerewolf4@gmail.com">mrwerewolf4@gmail.com</a>
          <a href="https://vk.com/club232485922" target="_blank" rel="noreferrer">VK · club232485922</a>
          <span className="lu-colophon__hint">Пишите, если готовите реферат,<br/>защищаетесь или хотите поспорить<br/>о «Спине Борго».</span>
        </div>
      </div>
    </div>

    <div className="lu-colophon__rule" />

    <div className="lu-colophon__bottom">
      <div>
        <em>«Ab urbe condita»</em>
        <span className="lu-dot">·</span>
        Путеводитель по Риму в пяти эпохах
      </div>
      <div className="lu-colophon__roma">ROMÆ · MMXXVI</div>
      <div>
        Set in <em>Cormorant</em>, <em>PT&nbsp;Serif</em>, <em>JetBrains&nbsp;Mono</em>
      </div>
    </div>
  </footer>
);

Object.assign(window, { ManifestoTicker, EpochIndex, StickyRail, Manifesto, EpochSlab, CatalogIndex, Colophon });
