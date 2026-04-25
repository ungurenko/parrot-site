/* Sections: Features, How it works (mockup flow), Privacy, Models, CTA */

function FeatureRow() {
  const items = [
    {
      n: "01",
      title: "Аудио и диктофон",
      text: "Загрузите MP3, WAV, M4A или любой другой аудиофайл - получите готовый текст.",
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
      text: "Вставьте ссылку на ролик - Parrot сам скачает звук и начнёт расшифровку.",
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
            Удобно для интервью, лекций, встреч и длинных голосовых -
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
      text: "Скопируйте результат или сохраните - можно вернуться к нему позже.",
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

  const trackRef = React.useRef(null);
  const [active, setActive] = React.useState(0);

  const cardOffset = (t, i) => {
    const card = t.children[i];
    return card ? card.offsetLeft - t.offsetLeft : 0;
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    const left = t.scrollLeft;
    // найти ближайшую карточку к текущему scrollLeft
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < models.length; i++) {
      const d = Math.abs(cardOffset(t, i) - left);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    setActive(best);
  };

  const goTo = (i) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: cardOffset(t, i), behavior: "smooth" });
  };

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

        <div className="models-grid" ref={trackRef} onScroll={onScroll}>
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

        <div className="models-dots" role="tablist" aria-label="Навигация по моделям">
          {models.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`models-dot ${active === i ? "on" : ""}`}
              aria-label={`Модель ${i + 1} из ${models.length}`}
              aria-selected={active === i}
              role="tab"
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Что такое Терминал и где его взять?",
      a: <>
        <p>Терминал - это стандартное приложение macOS, оно уже есть на вашем Mac. Устанавливать ничего не нужно.</p>
        <p>Откройте его так: нажмите <span className="kbd-combo"><kbd>⌘</kbd><kbd>Space</kbd></span>, напечатайте <b>Терминал</b> и нажмите <kbd>Enter</kbd>. Появится тёмное окно с мигающим курсором - это и есть Терминал.</p>
      </>
    },
    {
      q: "Безопасно ли вставлять команду из интернета?",
      a: <>
        <p>Скрипт установки <code>install.sh</code> открыт на GitHub - его можно прочитать построчно перед запуском.</p>
        <p>Он не запрашивает пароль администратора и не лезет в системные папки. Установка идёт только в <code>/Applications</code> - туда же, куда любое обычное приложение для Mac.</p>
        <p><a href="https://github.com/ungurenko/parrot/blob/main/install.sh" target="_blank" rel="noopener">Посмотреть код установщика на GitHub →</a></p>
      </>
    },
    {
      q: "macOS пишет «файл повреждён» или блокирует запуск",
      a: <>
        <p>Это срабатывает Gatekeeper - защита macOS от неподписанных приложений. Решение в одну команду:</p>
        <div className="faq-code"><span className="install-prompt-inline">$</span><code>xattr -cr /Applications/Parrot.app</code></div>
        <p>Скопируйте, вставьте в Терминал, нажмите <kbd>Enter</kbd>. После этого Parrot откроется как обычно. Можно также просто запустить установочную команду заново - она перепишет атрибуты сама.</p>
      </>
    },
    {
      q: "Терминал пишет command not found или ничего не происходит",
      a: <>
        <p>Чаще всего - потеряны пробелы в команде при ручном выделении. Используйте кнопку <b>«Скопировать»</b> в блоке установки, она копирует команду целиком и без искажений.</p>
        <p>Если кнопка скопировала, но команда всё равно не запускается - проверьте интернет и попробуйте ещё раз.</p>
      </>
    },
    {
      q: "Куда установится Parrot и как его удалить?",
      a: <>
        <p>Parrot ставится в <code>/Applications/Parrot.app</code> - стандартная папка «Программы». Иконка появится там и в Launchpad.</p>
        <p>Удалить - перетащите иконку Parrot в Корзину, как любое приложение Mac. Никаких следов в системе не остаётся.</p>
      </>
    },
    {
      q: "Нужны ли права администратора или пароль?",
      a: <p>Нет. Скрипт работает только в пользовательских папках, пароль <b>sudo</b> не запрашивается ни на одном шаге. Если что-то требует у вас пароль - это не Parrot.</p>
    },
    {
      q: "Какая macOS поддерживается? M1/M2/M3/M4 или Intel?",
      a: <>
        <p>macOS 12 Monterey и новее. Parrot работает на Apple Silicon - это любой Mac на чипах серии M (M1, M2, M3, M4 и новее).</p>
        <p>На Intel-маках Parrot пока не запускается - модели распознавания речи требуют Neural Engine от Apple Silicon.</p>
      </>
    },
    {
      q: "Как обновить Parrot до новой версии?",
      a: <p>Запустите ту же команду установки заново - она поставит свежую версию поверх старой. Ваши записи и настройки останутся на месте.</p>
    },
    {
      q: "Где хранятся мои записи и расшифровки?",
      a: <>
        <p>Всё локально - на вашем Mac. Parrot не отправляет аудио, видео или текст в облако, не использует чужие серверы и не требует подключения к интернету для работы (после установки).</p>
        <p>Подробности - в секции <a href="#privacy">Приватность</a>.</p>
      </>
    },
  ];

  return (
    <section id="faq" className="sec sec-faq" style={{ "--accent": "var(--c-purple)" }}>
      <div className="container">
        <div className="eyebrow"><span className="dot" /> Вопрос - ответ</div>
        <h2 className="section-kicker">Если что-то <em>смущает</em> - здесь ответы.</h2>
        <p className="sec-faq-lead">Восемь самых частых сомнений и ошибок. Если не нашли своё - напишите в <a href="https://github.com/ungurenko/parrot/issues" target="_blank" rel="noopener">issues на GitHub</a>.</p>

        <div className="faq-list">
          {items.map((item, i) => (
            <details className="faq-item" key={i}>
              <summary className="faq-q">
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-q-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const command = "curl -fsSL https://raw.githubusercontent.com/ungurenko/parrot/main/install.sh | bash";
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }).catch(() => {});
  };
  return (
    <section className="sec sec-cta" id="install">
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

          <div className="install-tabs install-tabs--single">
            <div className="install-tab install-tab--primary">
              <div className="install-tab-head">
                <h3>⌨ Установка в Терминале</h3>
                <span className="install-tab-badge">Единственный способ</span>
              </div>
              <p>Одна команда - Parrot скачается, установится и откроется сам. macOS не задаст ни одного вопроса.</p>
              <div className="install-code" onClick={handleCopy}>
                <span className="install-prompt">$</span>
                <code>{command}</code>
                <button
                  type="button"
                  className={`install-copy${copied ? " copied" : ""}`}
                  onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                  aria-label="Скопировать команду"
                >
                  {copied ? "✓ Скопировано" : "Скопировать"}
                </button>
              </div>
              <div className="install-meta">~15 секунд · 72 МБ · без прав администратора</div>

              <div className="install-steps">
                <div className="install-steps-title">Никогда не открывали Терминал? Это четыре шага.</div>
                <div className="install-step">
                  <span className="install-step-num">1</span>
                  <div className="install-step-body">
                    <div className="install-step-title">Скопируйте команду выше</div>
                    <p>Нажмите кнопку <b>«Скопировать»</b> - она подсветится зелёным и покажет ✓. Команда уже в буфере обмена.</p>
                  </div>
                </div>
                <div className="install-step">
                  <span className="install-step-num">2</span>
                  <div className="install-step-body">
                    <div className="install-step-title">Откройте Терминал</div>
                    <p>
                      Нажмите <span className="kbd-combo"><kbd>⌘</kbd><kbd>Space</kbd></span> - это вызов поиска Spotlight. Напечатайте <b>Терминал</b> и нажмите <kbd>Enter</kbd>.
                    </p>
                    <p className="install-step-hint">Терминал - стандартное приложение macOS. Устанавливать ничего не нужно, оно уже есть на вашем Mac.</p>
                  </div>
                </div>
                <div className="install-step">
                  <span className="install-step-num">3</span>
                  <div className="install-step-body">
                    <div className="install-step-title">Вставьте команду и нажмите Enter</div>
                    <p>
                      В окне Терминала нажмите <span className="kbd-combo"><kbd>⌘</kbd><kbd>V</kbd></span> - команда появится после знака <code className="install-prompt-inline">$</code>. Затем нажмите <kbd>Enter</kbd>.
                    </p>
                    <p className="install-step-hint">Появятся строки «Скачивание…», «Установка…», «Готово». Это нормально - так и должно быть.</p>
                  </div>
                </div>
                <div className="install-step">
                  <span className="install-step-num">4</span>
                  <div className="install-step-body">
                    <div className="install-step-title">Parrot откроется сам</div>
                    <p>Через 15–30 секунд иконка Parrot появится в папке <b>«Программы»</b>, а само приложение запустится. Можно закрывать Терминал.</p>
                  </div>
                </div>
              </div>

              <div className="install-help">
                Что-то пошло не так? <a href="#faq">Ответы на частые вопросы →</a>
              </div>
            </div>
          </div>

          <span className="cta-meta">Apple Silicon · macOS 12+</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FeatureRow, HowItWorks, Privacy, Models, FAQ, FinalCTA });
