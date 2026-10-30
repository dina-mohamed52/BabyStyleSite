// 📁 RealLife.jsx
import { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   🖼️ صور "لحظات حقيقية" لكل كاتيجوري
   ───────────────────────────────────────────── */
const CATEGORY_IMAGES = {
  lined: [
    "https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/%D8%B7%D8%A8%D9%8A%D8%B9%D9%871.jpeg",
    "https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/%D8%B7%D8%A8%D9%8A%D8%B9%D9%87%20%D9%85%D8%A8%D8%B7%D9%863.jpeg",
    "https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/%D8%B7%D8%A8%D9%8A%D8%B9%D9%87%20%D9%85%D8%A8%D8%B7%D9%862.jpeg",
    "https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/%D8%B7%D8%A8%D9%8A%D8%B9%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%205.jpeg",
    "https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/%D8%B7%D8%A8%D9%8A%D8%B9%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%204.jpeg",
  ],
  fur: [
    "https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/%D8%B75.jpeg",
    "https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/%D8%B72.jpeg",
    "https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/%D8%B73.jpeg",
    "https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/%D8%B76.jpeg",
    "https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/%D8%B77.jpeg",
  ],
};

const DEFAULT_IMAGES = CATEGORY_IMAGES.lined;

function RealLife({ category = "lined" }) {
  const IMAGES = CATEGORY_IMAGES[category] || DEFAULT_IMAGES;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const touchStartX = useRef(0);

  /* ✅ إعادة تعيين لما الكاتيجوري يتغير */
  useEffect(() => {
    setActiveIdx(0);
    setIsOpen(false);
    setLoaded(false);
  }, [category]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  const next = () => setActiveIdx((i) => (i + 1) % IMAGES.length);
  const prev = () =>
    setActiveIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") prev();
      if (e.key === "ArrowLeft") next();
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <section className="rl-section">
      <style>{rlCss}</style>

      {/* Head */}
      <div className="rl-head">
        <span className="rl-pill">📸 لحظات حقيقية</span>
        <h2>
          بنوتاتنا <em>بتلبسها</em> في الواقع
        </h2>
        <p className="rl-sub">
          صور من عملائنا — دفء ونعومة زي ما وعدنا 💗
        </p>
        <svg
          className="rl-squiggle"
          viewBox="0 0 200 20"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M2 12 Q20 2 40 12 T80 12 T120 12 T160 12 T198 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Hero image + thumbnails */}
      <div className="rl-grid">
        <div className="rl-hero" onClick={() => setIsOpen(true)}>
          <span className="rl-tape rl-tape-tl" />
          <span className="rl-tape rl-tape-br" />

          <img
            key={IMAGES[activeIdx]}
            src={IMAGES[activeIdx]}
            alt={`صورة ${activeIdx + 1}`}
            onLoad={() => setLoaded(true)}
            className={loaded ? "loaded" : ""}
          />

          <span className="rl-hero-caption">✨ لحظة #{activeIdx + 1}</span>

          <span className="rl-zoom">🔍 اضغطي للتكبير</span>

          <button
            className="rl-nav rl-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="السابق"
          >
            ‹
          </button>
          <button
            className="rl-nav rl-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="التالي"
          >
            ›
          </button>
        </div>

        <div className="rl-thumbs">
          {IMAGES.map((img, i) => (
            <button
              key={img}
              className={`rl-thumb ${i === activeIdx ? "active" : ""}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`صورة ${i + 1}`}
            >
              <img src={img} alt={`مصغرة ${i + 1}`} loading="lazy" />
              {i === activeIdx && <span className="rl-thumb-dot" />}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="rl-lightbox"
          onClick={() => setIsOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="rl-lb-close"
            onClick={() => setIsOpen(false)}
            aria-label="إغلاق"
          >
            ✕
          </button>

          <button
            className="rl-lb-nav rl-lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="السابق"
          >
            ‹
          </button>

          <img
            className="rl-lb-img"
            src={IMAGES[activeIdx]}
            alt={`صورة ${activeIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="rl-lb-nav rl-lb-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="التالي"
          >
            ›
          </button>

          <div className="rl-lb-counter">
            {activeIdx + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}

const rlCss = `
.rl-section{
  --ink:#3A2E45;
  --ink-soft:#7C6E88;
  --paper:#FFFDF7;
  --paper-2:#FFF7EE;
  --line:#E8E0D4;
  --pink:#FF9EC4;
  --pink-d:#F06292;
  --lav:#B69CFF;
  --sun:#FFD166;
  --tape:#F4E4B8;
  position:relative;
  max-width:1140px;
  margin:0 auto;
  padding:90px 22px;
  direction:rtl;
  font-family:'Cairo','Tajawal',system-ui,sans-serif;
  color:var(--ink);
}

/* ── Head ── */
.rl-head{text-align:center;max-width:660px;margin:0 auto 44px}
.rl-pill{
  display:inline-flex;align-items:center;gap:6px;
  font-weight:700;font-size:13px;
  padding:8px 20px;border-radius:999px;
  background:#fff;border:2px solid var(--ink);margin-bottom:16px;
}
.rl-head h2{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(28px,4.6vw,46px);
  font-weight:400;line-height:1.25;margin:0 0 12px;
}
.rl-head h2 em{
  font-style:normal;
  background:linear-gradient(120deg,var(--pink-d),var(--lav));
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;padding:0 6px;
}
.rl-sub{color:var(--ink-soft);font-size:14.5px;margin:0}
.rl-squiggle{
  display:block;width:160px;height:16px;color:var(--pink);
  margin:12px auto 0;
}

/* ── Grid ── */
.rl-grid{
  display:grid;
  grid-template-columns:1.4fr 1fr;
  gap:26px;
  align-items:start;
}

/* ── Hero image ── */
.rl-hero{
  position:relative;
  background:#fff;
  padding:14px 14px 60px;
  border:2.5px solid var(--ink);
  box-shadow:8px 8px 0 var(--pink);
  cursor:pointer;
  transition:.3s ease;
}
.rl-hero:hover{
  transform:translate(-3px,-3px);
  box-shadow:12px 12px 0 var(--pink-d);
}
.rl-hero img{
  width:100%;
  aspect-ratio:4/5;
  object-fit:cover;
  display:block;
  opacity:0;
  transition:opacity .4s ease;
  background:var(--paper-2);
}
.rl-hero img.loaded{opacity:1}

.rl-hero-caption{
  position:absolute;
  bottom:16px;left:0;right:0;
  text-align:center;
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:20px;
  color:var(--ink-soft);
}

.rl-zoom{
  position:absolute;
  top:22px;left:22px;
  background:rgba(58,46,69,.85);
  color:#fff;
  font-size:11px;
  font-weight:800;
  padding:6px 12px;
  border-radius:999px;
  backdrop-filter:blur(4px);
  opacity:0;
  transition:opacity .25s ease;
  pointer-events:none;
}
.rl-hero:hover .rl-zoom{opacity:1}

.rl-tape{
  position:absolute;
  width:70px;height:22px;
  background:var(--tape);
  opacity:.9;
  box-shadow:0 2px 6px rgba(0,0,0,.08);
  pointer-events:none;
  z-index:2;
}
.rl-tape-tl{top:-11px;left:20px;transform:rotate(-6deg)}
.rl-tape-br{bottom:-11px;right:20px;transform:rotate(-4deg)}

/* Nav arrows on hero */
.rl-nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:42px;height:42px;
  border-radius:50%;
  background:#fff;
  border:2px solid var(--ink);
  color:var(--ink);
  font-size:24px;
  font-weight:900;
  line-height:1;
  display:grid;
  place-items:center;
  cursor:pointer;
  opacity:0;
  transition:.25s ease;
  z-index:3;
}
.rl-hero:hover .rl-nav{opacity:1}
.rl-nav:hover{background:var(--pink);color:#fff;border-color:var(--pink-d)}
.rl-nav-prev{right:20px}
.rl-nav-next{left:20px}

/* ── Thumbs ── */
.rl-thumbs{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:14px;
}
.rl-thumb{
  position:relative;
  background:#fff;
  padding:6px;
  border:2px solid var(--ink);
  cursor:pointer;
  transition:.25s ease;
  overflow:hidden;
}
.rl-thumb img{
  width:100%;
  aspect-ratio:1;
  object-fit:cover;
  display:block;
}
.rl-thumb:hover{
  transform:translate(-2px,-2px);
  box-shadow:5px 5px 0 var(--lav);
}
.rl-thumb.active{
  border-color:var(--pink-d);
  box-shadow:5px 5px 0 var(--pink);
  transform:translate(-2px,-2px);
}
.rl-thumb-dot{
  position:absolute;
  bottom:10px;right:10px;
  width:10px;height:10px;
  border-radius:50%;
  background:var(--pink-d);
  box-shadow:0 0 0 3px #fff;
}

/* ── Lightbox ── */
.rl-lightbox{
  position:fixed;
  inset:0;
  z-index:200;
  background:rgba(20,14,25,.92);
  backdrop-filter:blur(8px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:30px;
  animation:rlFade .25s ease;
}
@keyframes rlFade{from{opacity:0}to{opacity:1}}

.rl-lb-img{
  max-width:min(900px,90vw);
  max-height:85vh;
  object-fit:contain;
  border:3px solid #fff;
  box-shadow:0 20px 60px rgba(0,0,0,.5);
  animation:rlZoom .35s cubic-bezier(.2,.8,.2,1);
}
@keyframes rlZoom{
  from{transform:scale(.85);opacity:0}
  to{transform:scale(1);opacity:1}
}

.rl-lb-close{
  position:absolute;
  top:24px;left:24px;
  width:44px;height:44px;
  border-radius:50%;
  background:#fff;
  color:var(--ink);
  font-size:20px;
  border:2px solid var(--ink);
  cursor:pointer;
  display:grid;place-items:center;
  transition:.2s ease;
}
.rl-lb-close:hover{background:var(--pink-d);color:#fff;border-color:var(--pink-d)}

.rl-lb-nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:54px;height:54px;
  border-radius:50%;
  background:#fff;
  color:var(--ink);
  font-size:30px;
  font-weight:900;
  border:2px solid var(--ink);
  display:grid;place-items:center;
  cursor:pointer;
  transition:.2s ease;
}
.rl-lb-nav:hover{background:var(--pink);border-color:var(--pink-d);color:#fff}
.rl-lb-prev{right:24px}
.rl-lb-next{left:24px}

.rl-lb-counter{
  position:absolute;
  bottom:24px;left:50%;
  transform:translateX(-50%);
  background:rgba(255,255,255,.15);
  color:#fff;
  font-weight:800;
  font-size:13px;
  padding:8px 18px;
  border-radius:999px;
  backdrop-filter:blur(6px);
  border:1.5px solid rgba(255,255,255,.3);
}

/* ── Responsive ── */
@media(max-width:900px){
  .rl-grid{grid-template-columns:1fr;gap:22px}
  .rl-thumbs{grid-template-columns:repeat(4,1fr)}
  .rl-nav{opacity:1;width:36px;height:36px;font-size:20px}
  .rl-zoom{opacity:1;font-size:10px;padding:5px 10px}
}

@media(max-width:600px){
  .rl-section{padding:70px 16px}
  .rl-head h2{font-size:26px}
  .rl-thumbs{grid-template-columns:repeat(3,1fr);gap:10px}
  .rl-hero{padding:10px 10px 48px}
  .rl-hero-caption{font-size:17px;bottom:12px}
  .rl-nav{width:32px;height:32px;font-size:18px}
  .rl-nav-prev{right:12px}
  .rl-nav-next{left:12px}
  .rl-lb-nav{width:42px;height:42px;font-size:24px}
  .rl-lb-prev{right:12px}
  .rl-lb-next{left:12px}
  .rl-lb-close{top:14px;left:14px;width:38px;height:38px}
  .rl-lb-counter{font-size:11px;padding:6px 14px;bottom:14px}
}
`;

export default RealLife;