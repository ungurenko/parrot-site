/* Sections: Features, How it works (mockup flow), Privacy, Models, CTA */

function FeatureRow() {
  const items = [
    {
      n: "01",
      title: "Аудио и диктофон",
      text: "Загрузите MP3, WAV, M4A или любой другой аудиофайл — получите готовый текст.",
      color: "var(--c-red)",
      kind: "audio"
    },
    {
      n: "02",
      title: "Видео и встречи",
      text: "Закиньте запись встречи, лекции или созвона. По тексту удобнее делать заметки и статьи.",
      color: "var(--c-green)",
      kind: "video"
    },
    {
      n: "03",
      title: "YouTube-ссылки",
      text: "Вставьте ссылку на ролик — Parrot сам скачает звук и начнёт расшифровку.",
      color: "var(--c-blue)",
      kind: "youtube"
    }
  ];
  return (
    <section id="what" className="sec sec-features" style={{ "--accent": "var(--c-red)" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="eyebrow"><span className="dot" />Что умеет</span>
            <h2 className="section-kicker">Когда запись<br /><em>удобнее читать</em></h2>
          </div>
          <p className="sec-lead">
            Удобно для интервью, лекций, встреч и длинных голосовых —
            всего, к чему проще вернуться текстом, чем перематывать запись.
          </p>
        </div>
        <div className="feature-grid">
          {items.map((it, i) => (
            <article className="feat" key={i} style={{ "--accent": it.color }}>
              <div className="feat-head">
                <span className="feat-n">{it.n}</span>
                <FeatVisual kind={it.kind} />
              </div>
              <h3 className="feat-title">{it.title}</h3>
              <p className="feat-text">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatVisual({ kind }) {
  if (kind === "audio") {
    return (
      <div className="fv fv-audio">
        <div className="fv-bars">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ height: `${15 + Math.abs(Math.sin(i * 1.3) * 75)}%` }} />
          ))}
        </div>
        <span className="fv-tag">mp3 · wav · m4a</span>
      </div>
    );
  }
  if (kind === "video") {
    return (
      <div className="fv fv-video">
        <div className="fv-vid">
          <div className="fv-vid-top"><span /><span /><span /></div>
          <div className="fv-vid-tl">
            <div className="fv-vid-track" />
            <div className="fv-vid-head" />
          </div>
        </div>
        <span className="fv-tag">mp4 · mov · встречи</span>
      </div>
    );
  }
  // youtube
  return (
    <div className="fv fv-yt">
      <div className="fv-url">
        <span className="fv-url-icon">▶</span>
        <span className="fv-url-text">youtube.com/watch?v=…</span>
      </div>
      <span className="fv-tag">ссылка → текст</span>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Добавьте файл или ссылку",
      text: "Подойдёт аудио, видео или ролик с YouTube.",
      color: "var(--c-red)"
    },
    {
      n: "02",
      title: "Дайте Mac поработать",
      text: "Parrot обрабатывает запись локально и ничего не отправляет на сервер.",
      color: "var(--c-yellow)"
    },
    {
      n: "03",
      title: "Заберите текст",
      text: "Скопируйте результат или сохраните — можно вернуться к нему позже.",
      color: "var(--c-green)"
    }
  ];
  return (
    <section id="how" className="sec sec-how" style={{ "--accent": "var(--c-yellow)" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="eyebrow"><span className="dot" />Как работает</span>
            <h2 className="section-kicker">Как получить<br /><em>текст</em></h2>
          </div>
          <p className="sec-lead">
            Добавили запись, подождали обработки, забрали текст.
            Аккаунт и регистрация не нужны.
          </p>
        </div>

        <div className="how-grid">
          <div className="how-steps">
            {steps.map((s, i) => (
              <div className="how-step" key={i} style={{ "--accent": s.color }}>
                <span className="how-n">{s.n}</span>
                <div>
                  <h3 className="how-title">{s.title}</h3>
                  <p className="how-text">{s.text}</p>
                </div>
                <span className="how-bar" />
              </div>
            ))}
          </div>

          <div className="how-mock">
            <AppMockup variant="how" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const pts = [
    { title: "На вашем Mac", sub: "файлы никуда не уходят", color: "var(--c-red)" },
    { title: "Чистая аналитика", sub: "никаких трекеров", color: "var(--c-yellow)" },
    { title: "Скачал и работаешь", sub: "подписка не нужна", color: "var(--c-green)" }
  ];
  return (
    <section id="privacy" className="sec sec-privacy">
      <div className="container">
        <div className="privacy-card">
          <div className="privacy-head">
            <span className="eyebrow"><span className="dot" />Приватность</span>
            <h2 className="section-kicker-invert">
              Записи остаются<br /><em>на вашем Mac.</em>
            </h2>
            <p className="privacy-lead">
              Parrot работает локально. Удобно для рабочих встреч,
              интервью и личных заметок, которые не хочется
              отдавать в облако.
            </p>
          </div>
          <div className="privacy-pts">
            {pts.map((p, i) => (
              <div className="pp" key={i} style={{ "--accent": p.color }}>
                <span className="pp-check">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div className="pp-title">{p.title}</div>
                <div className="pp-sub">{p.sub}</div>
              </div>
            ))}
          </div>
          {/* decorative lock-on-parrot */}
          <div className="privacy-deco" aria-hidden="true">
            <div className="pd-disc">
              <img src="assets/parrot-icon.png" alt="" />
            </div>
            <div className="pd-ring" />
            <div className="pd-ring pd-ring-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Models() {
  const models = [
    {
      name: "Qwen3-ASR 0.6B",
      tag: "Рекомендуемый",
      tagColor: "var(--c-red)",
      size: "~1.2 ГБ",
      text: "Лёгкая модель для обычных записей.",
      spec: [["Скорость", 5], ["Качество", 3], ["Ресурс", 2]]
    },
    {
      name: "Qwen3-ASR 1.7B",
      tag: "Для мощных Mac",
      tagColor: "var(--c-purple)",
      size: "~3.4 ГБ",
      text: "Пригодится на длинных записях и когда звук грязный.",
      spec: [["Скорость", 3], ["Качество", 5], ["Ресурс", 4]]
    },
    {
      name: "Whisper Large-v3 Turbo",
      tag: "Популярный",
      tagColor: "var(--c-blue)",
      size: "~1.2 ГБ",
      text: "Удобно, если в записи говорят на разных языках.",
      spec: [["Скорость", 4], ["Качество", 4], ["Ресурс", 3]]
    },
    {
      name: "Parakeet V3",
      tag: "Быстрый",
      tagColor: "var(--c-green)",
      size: "~1.3 ГБ",
      text: "Длинную запись перегоняет в текст быстрее других.",
      spec: [["Скорость", 5], ["Качество", 4], ["Ресурс", 2]]
    }
  ];
  return (
    <section id="models" className="sec sec-models" style={{ "--accent": "var(--c-blue)" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="eyebrow"><span className="dot" />Модели</span>
            <h2 className="section-kicker">
              Разные модели<br />для <em>разных записей</em>
            </h2>
          </div>
          <p className="sec-lead">
            Для обычных записей хватит лёгкой модели. Если звук сложный
            или запись длинная, берите что помощнее.
          </p>
        </div>

        <div className="models-grid">
          {models.map((m, i) => (
            <article className="model" key={i} style={{ "--accent": m.tagColor }}>
              <header className="model-head">
                <span className="model-tag">{m.tag}</span>
                <span className="model-size">{m.size}</span>
              </header>
              <h3 className="model-name">{m.name}</h3>
              <p className="model-text">{m.text}</p>
              <div className="model-spec">
                {m.spec.map(([label, val], j) => (
                  <div className="ms-item2" key={j}>
                    <span className="ms-label">{label}</span>
                    <span className="ms-dots">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <span key={k} className={k < val ? "on" : ""} />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              <button className="model-dl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Скачать модель
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="sec sec-cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-ribbon">
            <i style={{background:"var(--c-red)"}} />
            <i style={{background:"var(--c-coral)"}} />
            <i style={{background:"var(--c-yellow)"}} />
            <i style={{background:"var(--c-green)"}} />
            <i style={{background:"var(--c-blue)"}} />
            <i style={{background:"var(--c-purple)"}} />
          </div>
          <h2 className="cta-h">
            Попробуйте Parrot<br />на <em>первой записи</em>.
          </h2>
          <p className="cta-sub">
            Бесплатно, работает локально на вашем Mac.
            Нужен Apple Silicon.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={window.PARROT_DOWNLOAD || "#"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.37 12.6c-.02-2.6 2.13-3.85 2.22-3.9-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.95-3.95.95-.83 0-2.08-.92-3.42-.9-1.76.03-3.38 1.02-4.29 2.6-1.83 3.17-.47 7.87 1.32 10.45.87 1.26 1.9 2.68 3.25 2.63 1.31-.05 1.8-.85 3.39-.85 1.58 0 2.03.85 3.41.82 1.41-.02 2.3-1.28 3.16-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.72-1.04-2.74-4.14z"/></svg>
              Скачать для macOS
            </a>
            <span className="cta-meta">Apple Silicon · macOS 13+</span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FeatureRow, HowItWorks, Privacy, Models, FinalCTA });
