/* Hero section with mac app mockup + live demo */

function Waveform({ playing }) {
  // 40 bars, heights cycle with time if playing
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick(t => t + 1), 90);
    return () => clearInterval(id);
  }, [playing]);
  const bars = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 56; i++) {
      // deterministic pseudo-random base heights
      const base = 0.2 + Math.abs(Math.sin(i * 1.7) * 0.35) + Math.abs(Math.cos(i * 0.43) * 0.35);
      arr.push(base);
    }
    return arr;
  }, []);
  return (
    <div className="wave">
      {bars.map((b, i) => {
        const phase = playing ? Math.sin((tick + i * 0.6) * 0.35) * 0.3 : 0;
        const h = Math.max(0.12, Math.min(1, b + phase));
        return <span key={i} style={{ height: `${h * 100}%` }} />;
      })}
    </div>
  );
}

function TypedLine({ text, speed = 22, start = true, onDone }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    if (n >= text.length) { onDone && onDone(); return; }
    const id = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(id);
  }, [n, start, text, speed]);
  return <span>{text.slice(0, n)}{start && n < text.length && <span className="caret" />}</span>;
}

function AppMockup({ variant }) {
  // states: 0=url pasted, 1=processing w/ wave, 2=transcribing lines, 3=done
  const [stage, setStage] = React.useState(0);
  const [line1Done, setLine1Done] = React.useState(false);
  const [line2Done, setLine2Done] = React.useState(false);
  const [line3Done, setLine3Done] = React.useState(false);

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    if (line3Done) {
      const t = setTimeout(() => {
        // restart loop
        setStage(0);
        setLine1Done(false);
        setLine2Done(false);
        setLine3Done(false);
        setTimeout(() => setStage(1), 1200);
        setTimeout(() => setStage(2), 3200);
      }, 4200);
      return () => clearTimeout(t);
    }
  }, [line3Done]);

  const url = "https://youtube.com/watch?v=parrot-demo-4k";
  const lines = [
    "Короче, главное в интервью - не перебивать.",
    "Человек должен договорить мысль до конца,",
    "и только потом ты задаёшь следующий вопрос."
  ];

  return (
    <div className={`mock mock--${variant || "default"}`}>
      <div className="mock-chrome">
        <span className="dot r" /><span className="dot y" /><span className="dot g" />
        <div className="mock-title">
          <img src="assets/parrot-icon.png" alt="" />
          Parrot
        </div>
        <div className="mock-chrome-spacer" />
      </div>

      <div className="mock-body">
        <div className="mock-sidebar">
          <div className="ms-item active"><span className="ms-i">＋</span>Новая расшифровка</div>
          <div className="ms-item"><span className="ms-i">♪</span>История</div>
          <div className="ms-item"><span className="ms-i">⚙</span>Модели</div>
          <div className="ms-sidebar-bottom">
            <div className="ms-model">
              <span className="ms-model-dot" />
              <div>
                <div className="ms-model-name">Qwen3-ASR 0.6B</div>
                <div className="ms-model-sub">локально · 1.2 ГБ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock-main">
          <div className="mock-tabs">
            <button className="tab active">Ссылка</button>
            <button className="tab">Файл</button>
            <button className="tab">Запись</button>
          </div>

          <div className={`mock-input ${stage === 0 ? "is-typing" : ""}`}>
            <span className="mi-icon">🔗</span>
            <span className="mi-text">{url}</span>
            {stage === 0 && <span className="caret" />}
            <span className="mi-go">↵</span>
          </div>

          <div className={`mock-status stage-${stage}`}>
            <div className="ms-row">
              <div className="ms-status-label">
                {stage === 0 && "Готов к работе"}
                {stage === 1 && "Получаем аудио из YouTube…"}
                {stage >= 2 && "Распознаём речь · локально на Mac"}
              </div>
              <div className="ms-status-meter">
                {stage >= 1 && <Waveform playing={stage >= 1 && !line3Done} />}
              </div>
            </div>
            <div className="ms-progress">
              <div className="ms-progress-bar" style={{
                width: stage === 0 ? "0%" : stage === 1 ? "35%" : line3Done ? "100%" : "78%"
              }} />
            </div>
          </div>

          <div className="mock-transcript">
            <div className="mt-head">
              <span className="mt-time">00:00:04</span>
              <span className="mt-speaker">Интервью · 1 говорящий</span>
            </div>
            <div className="mt-body">
              {stage >= 2 && (
                <>
                  <p className="mt-line">
                    <span className="mt-ts">00:04</span>
                    <TypedLine text={lines[0]} start={stage >= 2} speed={24} onDone={() => setLine1Done(true)} />
                  </p>
                  {line1Done && (
                    <p className="mt-line">
                      <span className="mt-ts">00:09</span>
                      <TypedLine text={lines[1]} start={line1Done} speed={24} onDone={() => setLine2Done(true)} />
                    </p>
                  )}
                  {line2Done && (
                    <p className="mt-line">
                      <span className="mt-ts">00:13</span>
                      <TypedLine text={lines[2]} start={line2Done} speed={24} onDone={() => setLine3Done(true)} />
                    </p>
                  )}
                </>
              )}
              {stage < 2 && (
                <div className="mt-placeholder">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ variant }) {
  const layout = variant || "split"; // split | stack | big-type
  return (
    <section className={`hero hero--${layout}`}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="ribbon">
              <i className="rb" style={{background:"var(--c-red)"}} />
              <i className="rb" style={{background:"var(--c-yellow)"}} />
              <i className="rb" style={{background:"var(--c-green)"}} />
              <i className="rb" style={{background:"var(--c-blue)"}} />
            </span>
            Аудио, видео и YouTube превращаются в текст. Прямо на вашем Mac.
          </div>
          <h1 className="hero-h1">
            Parrot превращает<br />
            <em>речь в текст</em>.
          </h1>
          <p className="hero-sub">
            Загрузите файл или вставьте ссылку на YouTube.
            Распознавание идёт прямо на вашем Mac,
            без отправки в облако.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#install">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              Установить через Терминал
            </a>
            <a className="btn btn-ghost" href="#how">
              Как это работает
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="hero-meta">
            <span className="dot-mono">●</span>
            Для Mac с Apple Silicon: M1, M2, M3 или новее. macOS 12+.
          </div>
          <div className="hero-install-hint">
            Одна команда - и Parrot установится сам. <a href="#faq">Никогда не открывали Терминал?</a>
          </div>
        </div>

        <div className="hero-mock">
          <div className="mock-shadow" />
          <div className="mock-glow" aria-hidden="true" />
          <AppMockup variant="hero" />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, AppMockup, Waveform, TypedLine });
