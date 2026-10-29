// 📁 OfferesSec.jsx
import { getOffersByCategory, AGE_GROUPS } from "./OfferesData";

function OfferCard({ offer, index, onSelect, category }) {
  const accent = index % 2 === 0 ? "pink" : "lav";
  const isFur = category === "fur";

  return (
    <button
      type="button"
      onClick={() => onSelect(offer)}
      className={`of-card of-${accent}`}
    >
      <span className="of-tape" />

      {offer.highlight && (
        <span className="of-badge of-badge-top">✨ {offer.highlight}</span>
      )}

      <div className="of-card-head">
        <h3 className="of-name">{offer.name}</h3>
        <span className="of-count">{offer.count} قطع</span>
      </div>

      {/* ✅ الفرو: سعر واحد — المبطن: بيبي + بناتي */}
      <div className="of-prices">
        {isFur ? (
          <div className="of-price of-single">
            <div className="of-price-top">
              <span className="of-price-label">❄️ مبطن فرو</span>
              <span className="of-price-value">
                {offer.prices.single}
                <small>ج</small>
              </span>
            </div>
            <p className="of-age">كل المقاسات بنفس السعر 🎀</p>
          </div>
        ) : (
          <>
            <div className="of-price of-baby">
              <div className="of-price-top">
                <span className="of-price-label">👶 بيبي</span>
                <span className="of-price-value">
                  {offer.prices.baby}
                  <small>ج</small>
                </span>
              </div>
              <p className="of-age">{AGE_GROUPS.baby}</p>
            </div>

            <div className="of-price of-girls">
              <div className="of-price-top">
                <span className="of-price-label">🎀 بناتي</span>
                <span className="of-price-value">
                  {offer.prices.girls}
                  <small>ج</small>
                </span>
              </div>
              <p className="of-age">{AGE_GROUPS.girls}</p>
            </div>
          </>
        )}
      </div>

      <span className="of-cta">
        اختاري العرض <span>←</span>
      </span>
    </button>
  );
}

function OfferesSec({ setSelectedOffer, scrollToOrderCollection, category = "lined" }) {
  /* ✅ اختيار العروض حسب الكاتيجوري */
  const offers = getOffersByCategory(category);

  const handleSelect = (offer) => {
    const normalized = {
      name: offer.name,
      count: offer.count,
      value: offer.count,
      prices: offer.prices,
      category,
    };
    if (setSelectedOffer) setSelectedOffer(normalized);
    setTimeout(() => scrollToOrderCollection?.(), 100);
  };

  return (
    <section id="offersSection" className="of-section">
      <style>{ofCss}</style>

      <div className="of-head">
        <span className="of-pill">🛍️ عروض الكولونات</span>
        <h2>
          كل ما تاخدي <em>أكتر</em>… توفري أكتر
        </h2>
        <p className="of-sub">
          {category === "fur"
            ? "أسعار موحدة لكل المقاسات — اختاري العرض اللي يناسبك 💗"
            : "أسعار خاصة لكل فئة — اختاري العرض اللي يناسب بنتك 💗"}
        </p>
        <svg
          className="of-squiggle"
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

      <div className="of-grid">
        {offers.map((offer, i) => (
          <OfferCard
            key={offer.count}
            offer={offer}
            index={i}
            onSelect={handleSelect}
            category={category}
          />
        ))}
      </div>

      <div className="of-foot">
        <p>✨ الأسعار بالجنيه المصري — للاستفسار عن عروض الجملة كلمينا</p>
      </div>
    </section>
  );
}

const ofCss = `
.of-section{
  --ink:#3A2E45;
  --ink-soft:#7C6E88;
  --paper:#FFFDF7;
  --paper-2:#FFF7EE;
  --line:#E8E0D4;
  --pink:#FF9EC4;
  --pink-d:#F06292;
  --lav:#B69CFF;
  --sun:#FFD166;
  --mint:#7BD9B0;
  --tape:#F4E4B8;
  position:relative;
  padding:90px 22px;
  background:linear-gradient(180deg,#FFF7EE 0%, #FFFDF7 100%);
  border-radius:60px;
  margin:0 12px;
  overflow:hidden;
  direction:rtl;
  font-family:'Cairo','Tajawal',system-ui,sans-serif;
  color:var(--ink);
}
.of-section::before{
  content:"";
  position:absolute;inset:0;pointer-events:none;
  background-image:
    repeating-linear-gradient(0deg, transparent 0 39px, rgba(126,182,255,.07) 39px 40px),
    radial-gradient(circle at 12% 20%, rgba(255,158,196,.14), transparent 42%),
    radial-gradient(circle at 88% 85%, rgba(182,156,255,.14), transparent 42%);
}

.of-head{
  position:relative;text-align:center;max-width:660px;
  margin:0 auto 50px;z-index:1;
}
.of-pill{
  display:inline-flex;align-items:center;gap:6px;
  font-weight:700;font-size:13px;
  padding:8px 20px;border-radius:999px;
  background:#fff;border:2px solid var(--ink);
  margin-bottom:18px;
}
.of-head h2{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(30px,4.8vw,50px);
  font-weight:400;line-height:1.25;margin:0 0 14px;
}
.of-head h2 em{
  font-style:normal;
  background:linear-gradient(120deg,var(--pink-d),var(--lav));
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  padding:0 6px;
}
.of-sub{color:var(--ink-soft);font-size:15px;margin:0}
.of-squiggle{display:block;width:160px;height:16px;color:var(--pink);margin:12px auto 0}

.of-grid{
  position:relative;z-index:1;
  max-width:1140px;margin:0 auto;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:26px;
}

/* Card */
.of-card{
  position:relative;
  text-align:right;
  background:#fff;
  border:2.5px solid var(--ink);
  padding:26px 22px 22px;
  box-shadow:6px 6px 0 rgba(58,46,69,.15);
  transition:.3s cubic-bezier(.2,.7,.2,1);
  font-family:inherit;color:inherit;cursor:pointer;
}
.of-card:hover{
  transform:translate(-4px,-4px);
  box-shadow:12px 12px 0 rgba(58,46,69,.2);
}
.of-card.of-pink{box-shadow:6px 6px 0 var(--pink)}
.of-card.of-pink:hover{box-shadow:12px 12px 0 var(--pink-d)}
.of-card.of-lav{box-shadow:6px 6px 0 var(--lav)}
.of-card.of-lav:hover{box-shadow:12px 12px 0 var(--lav)}

.of-tape{
  position:absolute;top:-12px;left:50%;
  width:70px;height:22px;
  background:var(--tape);opacity:.9;
  transform:translateX(-50%) rotate(-4deg);
  box-shadow:0 2px 6px rgba(0,0,0,.08);
  pointer-events:none;
}
.of-badge{
  position:absolute;font-size:11px;font-weight:800;
  padding:4px 10px;border-radius:999px;
  background:var(--pink-d);color:#fff;
  box-shadow:0 2px 6px rgba(0,0,0,.1);
  z-index:2;
}
.of-badge-top{top:-12px;right:14px;background:var(--ink);color:var(--sun)}

.of-card-head{
  display:flex;align-items:center;justify-content:space-between;
  gap:10px;padding-bottom:14px;margin-bottom:16px;
  border-bottom:2px dashed var(--line);
}
.of-name{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:22px;font-weight:400;margin:0;
}
.of-count{
  font-size:12px;font-weight:800;
  padding:5px 12px;
  background:var(--sun);
  border:2px solid var(--ink);
  border-radius:999px;
  white-space:nowrap;
}

.of-prices{display:flex;flex-direction:column;gap:12px}

.of-price{
  padding:14px 16px;
  border:2px solid var(--ink);
  border-radius:14px;
  position:relative;
  transition:.25s ease;
}
.of-price:hover{transform:translateY(-2px)}
.of-price.of-baby{background:#E9F3FF}
.of-price.of-girls{background:#FFE7F1}
.of-price.of-single{background:#E5F5EE}

.of-price-top{
  display:flex;align-items:center;justify-content:space-between;
  gap:10px;margin-bottom:6px;
}
.of-price-label{font-weight:800;font-size:14.5px}
.of-price-value{
  font-family:'Lalezar',sans-serif;
  font-size:26px;line-height:1;
  color:var(--ink);
  display:inline-flex;align-items:baseline;gap:2px;
}
.of-price-value small{font-size:14px;font-weight:600;opacity:.7}
.of-age{
  margin:0;font-size:12.5px;
  color:var(--ink-soft);font-weight:700;
}

.of-cta{
  display:flex;align-items:center;justify-content:space-between;
  margin-top:16px;padding-top:12px;
  border-top:2px solid var(--ink);
  font-weight:800;font-size:13.5px;
}
.of-cta span{color:var(--pink-d);transition:transform .3s}
.of-card:hover .of-cta span{transform:translateX(-4px)}

.of-foot{
  position:relative;z-index:1;
  text-align:center;margin-top:44px;
  font-size:13.5px;color:var(--ink-soft);font-weight:700;
}
.of-foot p{margin:0}

@media(max-width:700px){
  .of-section{padding:70px 16px;border-radius:40px;margin:0 8px}
  .of-grid{grid-template-columns:repeat(2,1fr);gap:14px}
  .of-card{padding:20px 14px 16px}
  .of-name{font-size:17px}
  .of-count{font-size:10.5px;padding:4px 9px}
  .of-price{padding:10px 12px;border-radius:12px}
  .of-price-label{font-size:12.5px}
  .of-price-value{font-size:20px}
  .of-price-value small{font-size:11px}
  .of-age{font-size:10.5px;line-height:1.5}
  .of-price-top{margin-bottom:4px;gap:6px}
  .of-tape{width:55px;height:18px;top:-10px}
  .of-badge{font-size:9.5px;padding:3px 8px}
  .of-cta{font-size:12px;margin-top:10px;padding-top:10px}
}

@media(max-width:380px){
  .of-grid{gap:10px}
  .of-card{padding:16px 10px 14px}
  .of-name{font-size:15px}
  .of-count{font-size:9.5px;padding:3px 8px}
  .of-price{padding:8px 10px}
  .of-price-label{font-size:11px}
  .of-price-value{font-size:17px}
  .of-price-value small{font-size:10px}
  .of-age{font-size:9.5px}
}
`;

export default OfferesSec;