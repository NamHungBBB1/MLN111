import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../../sounds';

// ── CONFIG ────────────────────────────────────────────────
const STATS_META = {
  finance:   { label: 'Tài chính',   short: 'TC', icon: '₫' },
  education: { label: 'Giáo dục',    short: 'GD', icon: '◎' },
  tech:      { label: 'Công nghệ',   short: 'CN', icon: '⌥' },
  social:    { label: 'Quan hệ XH',  short: 'QH', icon: '◈' },
  mindset:   { label: 'Tư duy',      short: 'TD', icon: '◉' },
};
const INIT_STATS = { finance: 0, education: 0, tech: 0, social: 0, mindset: 0 };
const MAX_STAT   = 50;
const MAX_PICK   = 3;

// ── STAGE DATA ────────────────────────────────────────────
const STAGES = [
  {
    id: 0, range: '0–5', label: 'TUỔI THƠ',
    title: 'Những năm đầu đời',
    sub: 'Liệu bạn có thực sự lựa chọn cuộc đời của mình? Hãy cùng khám phá nhé!',
    pool: [
      { id:'s0a', text:'Gia đình khá giả',        pos:true,  fx:[['finance',5],['social',2]] },
      { id:'s0b', text:'Tiếp xúc Internet sớm',   pos:true,  fx:[['tech',5]] },
      { id:'s0c', text:'Được cha mẹ đọc sách',    pos:true,  fx:[['mindset',5],['education',2]] },
      { id:'s0d', text:'Có anh/chị học đại học',  pos:true,  fx:[['education',3],['mindset',2]] },
      { id:'s0e', text:'Gia đình khó khăn',        pos:false, fx:[['finance',-5]] },
      { id:'s0f', text:'Bố mẹ ly hôn',             pos:false, fx:[['social',-3],['mindset',-2]] },
      { id:'s0g', text:'Sống vùng sâu vùng xa',    pos:false, fx:[['tech',-5],['education',-2]] },
      { id:'s0h', text:'Thiếu dinh dưỡng',         pos:false, fx:[['education',-2],['mindset',-2]] },
    ],
  },
  {
    id: 1, range: '5–10', label: 'TIỂU HỌC',
    title: 'Những năm học đầu tiên',
    sub: 'Môi trường quyết định nền tảng.',
    pool: [
      { id:'s1a', text:'Học trường quốc tế',            pos:true,  fx:[['education',7],['social',5]] },
      { id:'s1b', text:'Học trường công chất lượng cao', pos:true,  fx:[['education',5]] },
      { id:'s1c', text:'Tham gia CLB thiếu nhi',         pos:true,  fx:[['social',4]] },
      { id:'s1d', text:'Được học tiếng Anh',             pos:true,  fx:[['education',5],['tech',3]] },
      { id:'s1e', text:'Bán vé số',                      pos:false, fx:[['mindset',2],['education',-4]] },
      { id:'s1f', text:'Phụ giúp gia đình',              pos:false, fx:[['social',2],['education',-3]] },
      { id:'s1g', text:'Nghỉ học dài ngày',              pos:false, fx:[['education',-5]] },
      { id:'s1h', text:'Nghiện game sớm',                pos:false, fx:[['tech',1],['education',-4],['mindset',-2]] },
    ],
  },
  {
    id: 2, range: '10–15', label: 'TRUNG HỌC',
    title: 'Hình thành ý thức',
    sub: 'Tư duy bắt đầu được định hình.',
    pool: [
      { id:'s2a', text:'Tham gia CLB STEM',         pos:true,  fx:[['tech',7],['mindset',5]] },
      { id:'s2b', text:'Đọc sách thường xuyên',     pos:true,  fx:[['mindset',5],['education',3]] },
      { id:'s2c', text:'Học lập trình',              pos:true,  fx:[['tech',7]] },
      { id:'s2d', text:'Hoạt động xã hội',           pos:true,  fx:[['social',5],['mindset',3]] },
      { id:'s2e', text:'Bị bắt nạt học đường',      pos:false, fx:[['social',-5],['mindset',-3]] },
      { id:'s2f', text:'Nghiện mạng xã hội',         pos:false, fx:[['tech',2],['mindset',-4]] },
      { id:'s2g', text:'Gia đình phá sản',           pos:false, fx:[['finance',-10]] },
    ],
  },
];

const PATHS = [
  { id:'p1', text:'Thi Đại Học',      desc:'Con đường học thuật dài hơi',       req:[['education',10]],            fx:[['education',5]] },
  { id:'p2', text:'Học Nghề',         desc:'Kỹ năng thực tiễn, thu nhập sớm',  req:[],                            fx:[['finance',3],['tech',2]] },
  { id:'p3', text:'Khởi Nghiệp Nhỏ', desc:'Mạo hiểm nhưng tiềm năng cao',     req:[['mindset',10]],              fx:[['finance',2],['mindset',3]] },
  { id:'p4', text:'Du Học',           desc:'Cơ hội lớn — chi phí cũng lớn',    req:[['education',15],['finance',5]], fx:[['education',10],['social',5]] },
];

const WORLD_EVENTS = [
  {
    id:'e1', title:'COVID-19 — Đại dịch',
    desc:'Thế giới đóng cửa. Bạn có thích nghi được không?',
    reqAll: [['tech', 8]],
    check: s => s.tech >= 8,
    okText: 'Công nghệ ≥ 8 → Học online thành công',
    noText: 'Công nghệ thấp → Bỏ lỡ năm học',
    okFx: [['education',5]], noFx: [['education',-5]],
  },
  {
    id:'e2', title:'AI Bùng Nổ',
    desc:'Trí tuệ nhân tạo thay đổi mọi ngành nghề.',
    reqAll: [['tech', 18], ['mindset', 12]],
    check: s => s.tech >= 18 && s.mindset >= 12,
    okText: 'Công nghệ ≥ 18 + Tư duy ≥ 12 → Bắt kịp làn sóng AI',
    noText: 'Nền tảng chưa đủ → Khó thích nghi',
    okFx: [['finance',10],['tech',5]], noFx: [['finance',-3]],
  },
  {
    id:'e3', title:'Thực Tập Công Ty Lớn',
    desc:'Cơ hội thực tập tại tập đoàn mở ra.',
    reqAny: [['social', 10], ['education', 15]],
    check: s => s.social >= 10 || s.education >= 15,
    okText: 'Quan hệ ≥ 10 hoặc Giáo dục ≥ 15 → Được nhận',
    noText: 'Không đủ điều kiện → Bỏ lỡ cơ hội',
    okFx: [['finance',5],['social',5]], noFx: [],
  },
];

const CAREERS = [
  { id:'c1', text:'Tập Đoàn',    desc:'Ổn định, thu nhập cao',    req:[['education',18],['social',10]],        fx:[['finance',10]] },
  { id:'c2', text:'Freelancer',  desc:'Tự do, sáng tạo',          req:[['tech',12],['mindset',10]],            fx:[['finance',5],['tech',3]] },
  { id:'c3', text:'Công Chức',   desc:'Ổn định, ít áp lực',       req:[['education',10]],                      fx:[['social',5]] },
  { id:'c4', text:'Công Nhân',   desc:'Không yêu cầu điều kiện',  req:[],                                      fx:[['finance',2]] },
  { id:'c5', text:'Startup AI',  desc:'Rủi ro cao — tiềm năng lớn', req:[['tech',20],['mindset',15],['finance',5]], fx:[['finance',20],['tech',10]] },
];

const ENDINGS = [
  { id:'A', req: s => s.tech >= 25 && s.mindset >= 15,
    title:'Digital Pioneer', role:'AI Engineer',
    color:'var(--red)',
    desc:'Đồng chí đã tận dụng mọi điều kiện để bứt phá. Con đường này không phải ngẫu nhiên — nó được xây dựng từ tồn tại xã hội thuận lợi ngay từ những năm đầu đời.' },
  { id:'C', req: s => s.social >= 15 && s.mindset >= 12,
    title:'Community Leader', role:'Nhà lãnh đạo cộng đồng',
    color:'var(--ink)',
    desc:'Quan hệ xã hội mạnh mẽ mở ra cánh cửa mà tiền bạc không thể mua được. Ý thức hình thành từ tập thể — và tập thể nâng đỡ đồng chí.' },
  { id:'B', req: s => s.finance >= 10,
    title:'The Survivor', role:'Người lao động ổn định',
    color:'var(--ink)',
    desc:'Cuộc sống ổn định, không hào nhoáng. Điều kiện vật chất quyết định lựa chọn — và lựa chọn tích lũy thành số phận.' },
  { id:'D', req: () => true,
    title:'The Lost Potential', role:'Tiềm năng chưa được khai phá',
    color:'var(--red-dark)',
    desc:'Có những thứ đồng chí muốn nhưng điều kiện không cho phép. Marx đã đúng: tồn tại xã hội quyết định ý thức — và đôi khi, cả số phận.' },
];

// ── HELPERS ───────────────────────────────────────────────
const clamp    = (v, min=0, max=MAX_STAT) => Math.max(min, Math.min(max, v));
const shuffle  = arr => [...arr].sort(() => Math.random() - 0.5);
const applyFx  = (stats, fxList) => {
  const next = { ...stats };
  fxList.forEach(([k, v]) => { next[k] = clamp(next[k] + v); });
  return next;
};
const canUnlock = (req, stats) => req.every(([k, v]) => stats[k] >= v);
const fxLabel  = ([k, v]) => `${v > 0 ? '+' : ''}${v} ${STATS_META[k].label}`;

// ── SUB COMPONENTS ────────────────────────────────────────
function Timeline({ phase, stageIdx }) {
  const steps = ['0–5','5–10','10–15','15–18','18–22','22–25'];
  const phaseMap = { stage: stageIdx, path: 3, events: 4, career: 5, ending: 5 };
  const current  = phaseMap[phase] ?? 0;
  return (
    <div className="g-timeline">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`g-tl-node ${i < current ? 'done' : i === current ? 'active' : ''}`}>
            <div className="g-tl-dot" />
            <div className="g-tl-label">{s}</div>
          </div>
          {i < steps.length - 1 && <div className={`g-tl-line ${i < current ? 'done' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function StatBars({ stats, delta }) {
  return (
    <div className="g-stats">
      <div className="g-stats-title">HỒ SƠ NHÂN VẬT</div>
      {Object.entries(STATS_META).map(([key, meta]) => {
        const val  = stats[key] ?? 0;
        const diff = delta?.[key];
        return (
          <div key={key} className="g-stat-row">
            <div className="g-stat-head">
              <span className="g-stat-icon">{meta.icon}</span>
              <span className="g-stat-label">{meta.label}</span>
              <span className="g-stat-val">
                {val}
                {diff !== undefined && diff !== 0 && (
                  <span className={`g-stat-delta ${diff > 0 ? 'pos' : 'neg'}`}>
                    {diff > 0 ? `+${diff}` : diff}
                  </span>
                )}
              </span>
            </div>
            <div className="g-bar-track">
              <div className="g-bar-fill" style={{ width: `${(val / MAX_STAT) * 100}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContextCard({ ctx, selected, disabled, onClick }) {
  return (
    <button
      className={`g-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${ctx.pos ? 'pos' : 'neg'}`}
      onClick={onClick}
      disabled={disabled && !selected}
    >
      <div className="g-card-badge">{ctx.pos ? '▲' : '▼'}</div>
      <div className="g-card-text">{ctx.text}</div>
      <div className="g-card-fx">
        {ctx.fx.map(([k, v]) => (
          <span key={k} className={`g-fx-tag ${v > 0 ? 'pos' : 'neg'}`}>
            {v > 0 ? '+' : ''}{v} {STATS_META[k].short}
          </span>
        ))}
      </div>
      {selected && <div className="g-card-check">✓</div>}
    </button>
  );
}

function PathCard({ path, stats, selected, onClick }) {
  const locked = !canUnlock(path.req, stats);
  return (
    <button
      className={`g-path-card ${selected ? 'selected' : ''} ${locked ? 'locked' : ''}`}
      onClick={() => !locked && onClick()}
    >
      {locked && <div className="g-lock-stamp">THIẾU<br/>ĐIỀU KIỆN</div>}
      <div className="g-path-title">{path.text}</div>
      <div className="g-path-desc">{path.desc}</div>
      {path.req.length > 0 && (
        <div className="g-path-req">
          Yêu cầu:{' '}
          {path.req.map(([k, v]) => (
            <span key={k} className={`g-req-tag ${stats[k] >= v ? 'met' : 'unmet'}`}>
              {STATS_META[k].label} ≥ {v} · bạn có: {stats[k]}
            </span>
          ))}
        </div>
      )}
      <div className="g-card-fx">
        {path.fx.map(([k, v]) => (
          <span key={k} className="g-fx-tag pos">+{v} {STATS_META[k].short}</span>
        ))}
      </div>
    </button>
  );
}

// ── SCREENS ───────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div className="g-intro">
      <div className="g-intro-label">MINI GAME — STAGE 2</div>
      <h1 className="g-intro-title">
        Bạn có thật sự<br />tự quyết định<br />
        <span className="g-intro-accent">cuộc đời mình?</span>
      </h1>
      <p className="g-intro-desc">
        Trải qua hành trình từ <strong>0 → 25 tuổi</strong>. Mỗi lựa chọn tích lũy thành con người bạn.
        Nhưng… liệu bạn có thực sự được lựa chọn?
      </p>
      <div className="g-intro-stats">
        {Object.entries(STATS_META).map(([k, m]) => (
          <div key={k} className="g-intro-stat-chip">{m.icon} {m.label}</div>
        ))}
      </div>
      <button className="g-btn-primary" onClick={() => { soundManager.startBg(); onStart(); }}>
        BẮT ĐẦU HÀNH TRÌNH →
      </button>
    </div>
  );
}

function StageScreen({ stage, stats, onConfirm }) {
  const [cards]    = useState(() => shuffle(stage.pool).slice(0, 6));
  const [selected, setSelected] = useState([]);
  const [done, setDone]         = useState(false);
  const [delta, setDelta]       = useState(null);

  const toggle = (id) => {
    if (done) return;
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length < MAX_PICK ? [...prev, id] : prev
    );
  };

  const confirm = () => {
    const chosen = cards.filter(c => selected.includes(c.id));
    const allFx  = chosen.flatMap(c => c.fx);
    const d      = {};
    allFx.forEach(([k, v]) => { d[k] = (d[k] || 0) + v; });
    setDelta(d);
    setDone(true);
    soundManager.play('stageResult');
  };

  return (
    <div className="g-stage">
      <div className="g-stage-header">
        <div className="g-stage-meta">{stage.range} tuổi · {stage.label}</div>
        <h2 className="g-stage-title">{stage.title}</h2>
        <p className="g-stage-sub">{stage.sub}</p>
      </div>

      {!done ? (
        <>
          <div className="g-pick-info">
            Chọn tối đa <strong>{MAX_PICK}</strong> ngữ cảnh &nbsp;
            <span className="g-pick-count">{selected.length}/{MAX_PICK}</span>
          </div>
          <div className="g-cards-grid">
            {cards.map(c => (
              <ContextCard
                key={c.id} ctx={c}
                selected={selected.includes(c.id)}
                disabled={selected.length >= MAX_PICK && !selected.includes(c.id)}
                onClick={() => toggle(c.id)}
              />
            ))}
          </div>
          <button
            className="g-btn-primary"
            onClick={confirm}
            disabled={selected.length === 0}
          >
            XÁC NHẬN {selected.length > 0 ? `(${selected.length})` : ''} →
          </button>
        </>
      ) : (
        <div className="g-result">
          <div className="g-result-title">KẾT QUẢ GIAI ĐOẠN</div>
          <div className="g-result-list">
            {Object.entries(delta).filter(([,v]) => v !== 0).map(([k, v]) => (
              <div key={k} className={`g-result-row ${v > 0 ? 'pos' : 'neg'}`}>
                <span>{STATS_META[k].icon} {STATS_META[k].label}</span>
                <span className="g-result-val">{v > 0 ? `+${v}` : v}</span>
              </div>
            ))}
            {Object.keys(delta).length === 0 && (
              <div className="g-result-row">Không có thay đổi nào.</div>
            )}
          </div>
          <button className="g-btn-primary" onClick={() => onConfirm(delta)}>
            TIẾP THEO →
          </button>
        </div>
      )}
    </div>
  );
}

function PathScreen({ stats, onConfirm }) {
  const [chosen, setChosen] = useState(null);
  const [locked, setLocked] = useState(null);

  const tryPick = (path) => {
    if (!canUnlock(path.req, stats)) {
      setLocked(path);
      setTimeout(() => setLocked(null), 2000);
      return;
    }
    setChosen(path.id);
  };

  const confirm = () => {
    const path = PATHS.find(p => p.id === chosen);
    const d = {};
    path.fx.forEach(([k, v]) => { d[k] = v; });
    onConfirm(d, path.text);
  };

  return (
    <div className="g-stage">
      <div className="g-stage-header">
        <div className="g-stage-meta">15–18 tuổi · NGÃ RẼ ĐẦU TIÊN</div>
        <h2 className="g-stage-title">Chọn con đường của bạn</h2>
        <p className="g-stage-sub">Đây là lần đầu tiên bạn thực sự có lựa chọn. Nhưng lựa chọn có mở ra không?</p>
      </div>

      {locked && (
        <div className="g-locked-banner">
          ✕ Bạn muốn chọn <strong>{locked.text}</strong> — nhưng điều kiện sống trước đó chưa cho bạn đủ cơ hội.
        </div>
      )}

      <div className="g-path-grid">
        {PATHS.map(path => (
          <PathCard
            key={path.id} path={path} stats={stats}
            selected={chosen === path.id}
            onClick={() => tryPick(path)}
          />
        ))}
      </div>

      <button className="g-btn-primary" onClick={confirm} disabled={!chosen}>
        CHỐT LỰA CHỌN →
      </button>
    </div>
  );
}

function EventsScreen({ stats, onConfirm }) {
  const results = WORLD_EVENTS.map(e => ({ ...e, pass: e.check(stats) }));
  const delta   = {};
  results.forEach(r => {
    (r.pass ? r.okFx : r.noFx).forEach(([k, v]) => { delta[k] = (delta[k] || 0) + v; });
  });

  return (
    <div className="g-stage">
      <div className="g-stage-header">
        <div className="g-stage-meta">18–22 tuổi · BIẾN CỐ THỜI ĐẠI</div>
        <h2 className="g-stage-title">Thế giới thay đổi</h2>
        <p className="g-stage-sub">Bạn không chọn biến cố — bạn chỉ có thể phản ứng với nó.</p>
      </div>

      <div className="g-events-list">
        {results.map(r => (
          <div key={r.id} className={`g-event-card ${r.pass ? 'pass' : 'fail'}`}>
            <div className="g-event-verdict">{r.pass ? '✓ VƯỢT QUA' : '✕ BỊ ẢNH HƯỞNG'}</div>
            <div className="g-event-title">{r.title}</div>
            <div className="g-event-desc">{r.desc}</div>
            <div className="g-event-req">
              {r.reqAll && (
                <>
                  <span className="g-event-req-label">YÊU CẦU (tất cả):</span>
                  {r.reqAll.map(([k, v]) => (
                    <span key={k} className={`g-req-tag ${stats[k] >= v ? 'met' : 'unmet'}`}>
                      {STATS_META[k].label} ≥ {v} · có: {stats[k]}
                    </span>
                  ))}
                </>
              )}
              {r.reqAny && (
                <>
                  <span className="g-event-req-label">CẦN ÍT NHẤT 1:</span>
                  {r.reqAny.map(([k, v]) => (
                    <span key={k} className={`g-req-tag ${stats[k] >= v ? 'met' : 'unmet'}`}>
                      {STATS_META[k].label} ≥ {v} · có: {stats[k]}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="g-event-result">{r.pass ? r.okText : r.noText}</div>
            <div className="g-card-fx">
              {(r.pass ? r.okFx : r.noFx).map(([k, v]) => (
                <span key={k} className={`g-fx-tag ${v >= 0 ? 'pos' : 'neg'}`}>
                  {v > 0 ? '+' : ''}{v} {STATS_META[k].short}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="g-btn-primary" onClick={() => onConfirm(delta)}>
        TIẾP THEO →
      </button>
    </div>
  );
}

function CareerScreen({ stats, onConfirm }) {
  const [chosen, setChosen] = useState(null);
  const [locked, setLocked] = useState(null);

  const tryPick = (career) => {
    if (!canUnlock(career.req, stats)) {
      setLocked(career);
      setTimeout(() => setLocked(null), 2200);
      return;
    }
    setChosen(career.id);
  };

  const confirm = () => {
    const c = CAREERS.find(c => c.id === chosen);
    const d = {};
    c.fx.forEach(([k, v]) => { d[k] = v; });
    onConfirm(d, c.text);
  };

  return (
    <div className="g-stage">
      <div className="g-stage-header">
        <div className="g-stage-meta">22–25 tuổi · SỰ NGHIỆP</div>
        <h2 className="g-stage-title">Bước vào xã hội</h2>
        <p className="g-stage-sub">Cuộc đời bạn phản ánh hành trình đã qua.</p>
      </div>

      {locked && (
        <div className="g-locked-banner">
          ✕ <strong>{locked.text}</strong> — Điều kiện sống trước đó không cho bạn đủ cơ hội để chọn con đường này.
        </div>
      )}

      <div className="g-path-grid">
        {CAREERS.map(career => (
          <PathCard
            key={career.id} path={career} stats={stats}
            selected={chosen === career.id}
            onClick={() => tryPick(career)}
          />
        ))}
      </div>

      <button className="g-btn-primary" onClick={confirm} disabled={!chosen}>
        CHỐT SỰ NGHIỆP →
      </button>
    </div>
  );
}

function EndingScreen({ stats, career, onRestart }) {
  const ending = ENDINGS.find(e => e.req(stats));

  useEffect(() => {
    soundManager.play(ending.id === 'D' ? 'badEnding' : 'goodEnding');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="g-ending">
      <div className="g-ending-label">KẾT THÚC · {ending.id}</div>
      <div className="g-ending-title" style={{ color: ending.color }}>{ending.title}</div>
      <div className="g-ending-role">{ending.role}</div>
      {career && <div className="g-ending-career">Sự nghiệp: {career}</div>}
      <p className="g-ending-desc">{ending.desc}</p>

      <div className="g-ending-stats">
        {Object.entries(STATS_META).map(([k, m]) => (
          <div key={k} className="g-ending-stat">
            <div className="g-ending-stat-val">{stats[k]}</div>
            <div className="g-ending-stat-label">{m.icon} {m.label}</div>
          </div>
        ))}
      </div>

      <div className="g-ending-marx">
        "Không phải ý thức quyết định đời sống —<br />
        chính đời sống quyết định ý thức."
        <span> — Karl Marx, 1859</span>
      </div>

      <button className="g-btn-secondary" onClick={onRestart}>
        ↺ CHƠI LẠI
      </button>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────
export default function GamePanel() {
  const [screen, setScreen]       = useState('intro');
  const [stageIdx, setStageIdx]   = useState(0);
  const [stats, setStats]         = useState(INIT_STATS);
  const [delta, setDelta]         = useState(null);
  const [career, setCareer]       = useState(null);
  const [muted, setMuted]         = useState(false);
  const wrapperRef                = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handler = (e) => { if (e.target.closest('button')) soundManager.playClick(); };
    el.addEventListener('click', handler, true);
    return () => el.removeEventListener('click', handler, true);
  }, []);

  const applyDelta = (d) => {
    setStats(prev => applyFx(prev, Object.entries(d)));
    setDelta(d);
  };

  const handleStageConfirm = (d) => {
    applyDelta(d);
    if (stageIdx < STAGES.length - 1) {
      setStageIdx(i => i + 1);
    } else {
      setScreen('path');
    }
  };

  const handlePathConfirm = (d) => {
    applyDelta(d);
    setScreen('events');
  };

  const handleEventsConfirm = (d) => {
    applyDelta(d);
    setScreen('career');
  };

  const handleCareerConfirm = (d, careerName) => {
    soundManager.stopBg();
    applyDelta(d);
    setCareer(careerName);
    setScreen('ending');
  };

  const restart = () => {
    setScreen('intro');
    setStageIdx(0);
    setStats(INIT_STATS);
    setDelta(null);
    setCareer(null);
    soundManager.startBg();
  };

  const toggleMute = () => {
    const nowMuted = soundManager.toggle();
    setMuted(nowMuted);
  };

  const phaseForTimeline = screen === 'stage' ? 'stage' : screen;

  return (
    <div className="tab-panel">
      <div className="g-wrapper" ref={wrapperRef}>
        <button className="g-mute-btn" onClick={toggleMute} title={muted ? 'Bật nhạc' : 'Tắt nhạc'}>
          {muted ? '🔇' : '🔊'}
        </button>
        {screen !== 'intro' && screen !== 'ending' && (
          <>
            <Timeline phase={phaseForTimeline} stageIdx={stageIdx} />
            <div className="g-body">
              <StatBars stats={stats} delta={screen !== 'stage' ? delta : null} />
              <div className="g-content">
                {screen === 'stage' && (
                  <StageScreen
                    key={stageIdx}
                    stage={STAGES[stageIdx]}
                    stats={stats}
                    onConfirm={handleStageConfirm}
                  />
                )}
                {screen === 'path'   && <PathScreen   stats={stats} onConfirm={handlePathConfirm} />}
                {screen === 'events' && <EventsScreen stats={stats} onConfirm={handleEventsConfirm} />}
                {screen === 'career' && <CareerScreen stats={stats} onConfirm={handleCareerConfirm} />}
              </div>
            </div>
          </>
        )}
        {screen === 'intro'  && <IntroScreen onStart={() => setScreen('stage')} />}
        {screen === 'ending' && <EndingScreen stats={stats} career={career} onRestart={restart} />}
      </div>
    </div>
  );
}
