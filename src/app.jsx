// Main app — assembles all sections + tweaks panel.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "ink",
  "displayItalic": true,
  "showGrain": true,
  "showCrosshair": false,
  "ledeSize": 22
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.luTheme = tweaks.theme;
    root.dataset.luItalic = String(tweaks.displayItalic);
    root.dataset.luGrain = String(tweaks.showGrain);
    root.dataset.luCross = String(tweaks.showCrosshair);
    root.style.setProperty("--lu-lede", `${tweaks.ledeSize}px`);
  }, [tweaks]);

  // Scroll progress bar
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(window.scrollY / Math.max(1, max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="lu-progress" style={{ transform: `scaleX(${progress})` }} />
      {tweaks.showCrosshair && <div className="lu-crosshair" aria-hidden="true" />}

      <window.Hero />
      <window.ManifestoTicker />
      <window.EpochIndex />
      <window.RomeMapSection />

      <div id="epochs-start" className="lu-epochs-wrap">
        {window.EPOCHS.map((ep, i) => (
          <window.EpochSlab key={ep.slug} epoch={ep} idx={i} />
        ))}
      </div>

      <window.CatalogIndex />
      <window.Manifesto />
      <window.Colophon />
      <window.LandmarkPage />
      <window.ArticlePage />

      <window.TweaksPanel>
        <window.TweakSection label="Тема">
          <window.TweakRadio
            label="Палитра"
            value={tweaks.theme}
            options={["ink", "travertine", "carbon"]}
            onChange={(v) => setTweak("theme", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Типографика">
          <window.TweakToggle
            label="Italic display"
            value={tweaks.displayItalic}
            onChange={(v) => setTweak("displayItalic", v)}
          />
          <window.TweakSlider
            label="Размер лида"
            min={16}
            max={32}
            step={1}
            unit="px"
            value={tweaks.ledeSize}
            onChange={(v) => setTweak("ledeSize", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Эффекты">
          <window.TweakToggle
            label="Film grain"
            value={tweaks.showGrain}
            onChange={(v) => setTweak("showGrain", v)}
          />
          <window.TweakToggle
            label="Crosshair"
            value={tweaks.showCrosshair}
            onChange={(v) => setTweak("showCrosshair", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
