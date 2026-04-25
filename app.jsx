/* Main app - assembles everything, tweaks panel, edit-mode host protocol */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentTheme": "rainbow",
  "heroVariant": "split"
}/*EDITMODE-END*/;

const ACCENT_THEMES = {
  rainbow: null, // per-section colors
  coral:   "var(--c-red)",
  green:   "var(--c-green)",
  blue:    "var(--c-blue)",
  yellow:  "var(--c-yellow)"
};

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = React.useState(false);

  // Apply accent override globally when not rainbow
  React.useEffect(() => {
    const override = ACCENT_THEMES[tweaks.accentTheme];
    const root = document.documentElement;
    if (override) root.style.setProperty("--accent-override", override);
    else root.style.removeProperty("--accent-override");
    // toggle body class so sections can read override
    document.body.classList.toggle("accent-mono", !!override);
  }, [tweaks.accentTheme]);

  // host protocol for Tweaks toggle
  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setEditMode(true);
      if (e.data.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", handler);
    // now announce availability
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  function update(key, val) {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
  }

  return (
    <>
      <Nav />
      <Hero variant={tweaks.heroVariant} />
      <FeatureRow />
      <HowItWorks />
      <Privacy />
      <Models />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      {editMode && <TweaksPanel tweaks={tweaks} update={update} />}
    </>
  );
}

function Nav() {
  return (
    <header className="nav">
      <div className="container nav-row">
        <a className="brand" href="#">
          <img src="assets/parrot-icon.png" alt="Parrot" />
          <span className="brand-name">Parrot</span>
          <span className="beta">beta</span>
        </a>
        <nav className="nav-links">
          <a href="#what">Что умеет</a>
          <a href="#how">Как работает</a>
          <a href="#privacy">Приватность</a>
          <a href="#models">Модели</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a className="nav-cta" href="#install" aria-label="Установить Parrot через Терминал">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          <span className="nav-cta-label-full">Установить</span>
          <span className="nav-cta-label-short">Install</span>
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <a className="brand" href="#">
          <img src="assets/parrot-icon.png" alt="" />
          Parrot
        </a>
        <span>© 2026 Parrot · Разработано Александром Унгуренко</span>
        <span className="spacer" />
        <a href="https://github.com/ungurenko/parrot" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign:"-4px", marginRight:"6px"}}><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.4-2.68 5.37-5.24 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.22 21.37 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
          GitHub
        </a>
      </div>
    </footer>
  );
}

function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector("section.hero");
    const footer = document.querySelector(".footer");
    if (!hero || !footer) return;

    let heroPassed = false;
    let footerReached = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) {
            heroPassed = e.boundingClientRect.top < 0 && !e.isIntersecting;
          }
          if (e.target === footer) {
            footerReached = e.isIntersecting;
          }
        });
        setVisible(heroPassed && !footerReached);
      },
      { threshold: 0 }
    );
    io.observe(hero);
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a className="btn btn-primary" href="#install" tabIndex={visible ? 0 : -1}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        Установить за 15 секунд
      </a>
    </div>
  );
}

function TweaksPanel({ tweaks, update }) {
  const swatches = [
    { key: "rainbow", color: "linear-gradient(135deg, var(--c-red), var(--c-yellow), var(--c-green), var(--c-blue))" },
    { key: "coral",   color: "var(--c-red)" },
    { key: "green",   color: "var(--c-green)" },
    { key: "blue",    color: "var(--c-blue)" },
    { key: "yellow",  color: "var(--c-yellow)" }
  ];
  const layouts = [
    { key: "split",    label: "Split" },
    { key: "stack",    label: "Stack" },
    { key: "big-type", label: "Типограф." }
  ];
  return (
    <div className="tweaks">
      <div className="tweaks-h">
        Tweaks
        <span style={{fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--ink-mute)", letterSpacing:"0.06em"}}>LIVE</span>
      </div>
      <div className="tweaks-group">
        <div className="tweaks-label">Акцент</div>
        <div className="tweaks-swatches">
          {swatches.map(s => (
            <div
              key={s.key}
              className={`tweaks-swatch ${tweaks.accentTheme === s.key ? "on" : ""}`}
              style={{ background: s.color }}
              onClick={() => update("accentTheme", s.key)}
              title={s.key}
            />
          ))}
        </div>
      </div>
      <div className="tweaks-group">
        <div className="tweaks-label">Hero layout</div>
        <div className="tweaks-segments">
          {layouts.map(l => (
            <button
              key={l.key}
              className={tweaks.heroVariant === l.key ? "on" : ""}
              onClick={() => update("heroVariant", l.key)}
            >{l.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
