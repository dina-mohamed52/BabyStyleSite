import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { winterLined } from "../data/WinterLined";
import OfferesSec from "../features/WinterLined/OfferesSec";
import SizesSec from "../features/WinterLined/SizesSec";
import LinedOrderCollection from "../features/WinterLined/LinedOrderCollection";
import RealLife from "../features/WinterLined/RealLife";
import { CATEGORY_IMAGES } from "../features/WinterLined/CategoryHeroSecImages";

const COLOR_HEX = {
  أبيض: "#ffffff",
  أسود: "#2b2b2b",
  بينك: "#ff9ec4",
  رصاصي: "#9aa0a6",
  كشمير: "#d4b291",
  بيج: "#eedcbf",
  سكري: "#f6d9c4",
};

const CATEGORY_LABEL = {
  lined: "🧸 مبطن",
  fur: "❄️ فرو",
};

const DEFAULT_IMAGES = CATEGORY_IMAGES.lined;

/* ✅ تحسين رابط الصورة */
const optimizeImage = (url, width = 600) => {
  if (!url) return "";
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
  }
  if (url.includes("images.baby-style-store.com")) {
    return `${url}${url.includes("?") ? "&" : "?"}w=${width}&q=80&auto=format`;
  }
  return url;
};

const CATEGORY_CONTENT = {
  lined: {
    heroTitle: "كولون مبطن",
    heroSubtitle: "بطانة فوطه ناعمة ودافئة — مثالي للشتا",
    features: [
      { icon: "🧸", title: "بطانة فوطه", text: "دافية من الداخل ومريحة طول اليوم", rotate: "-3deg", color: "#FFE7F1" },
      { icon: "🎀", title: "قطن ناعم", text: "مرن على بشرتها الحساسة", rotate: "2deg", color: "#E5F1FF" },
      { icon: "🌈", title: "ألوان كيوت", text: "درجات حلوة تختاري اللي يعجبك", rotate: "-2deg", color: "#F0E7FF" },
      { icon: "🦋", title: "حرية الحركة", text: "مرن يسمح لها تلعب براحتها", rotate: "3deg", color: "#DFF7EA" },
    ],
  },
fur: {
  heroTitle: "كولونات شتوية لبنوتك",
  heroSubtitle: "اختاري موديلك المفضل 🎀",
  features: [
    {
      icon: "❄️",
      title: "كولون سادة مبطن فرو",
      text: "دفء خالص من غير أي زيادة — فرو ناعم جوّه، شكل بسيط وأنيق برّه، مثالي لكل يوم شتوي",
      rotate: "-3deg",
      color: "#E5F1FF",
    },
    {
      icon: "🎀",
      title: "كولون فيونكة مبطن فرو",
      text: "لمسة أنثوية ساحرة — فيونكة كيوت على كولون دافي، يخلي بنوتك أميرة الشتا بجد 👑",
      rotate: "2deg",
      color: "#FFE7F1",
    },
     { icon: "🌈", title: "ألوان كيوت", text: "درجات حلوة تختاري اللي يعجبك", rotate: "-2deg", color: "#F0E7FF" },
      { icon: "🦋", title: "حرية الحركة", text: "مرن يسمح لها تلعب براحتها", rotate: "3deg", color: "#DFF7EA" },
   
  ],

},
};

const FAQS = [
  { q: "الكولون مبطن من الداخل؟", a: "أيوه، مبطن من الداخل بخامة ناعمة ودافئة ❄️" },
  { q: "هل يوجد ضمان على المنتج؟", a: "طبعًا! ضمان ضد عيوب الصناعة لمدة 30 يوم ✅" },
  { q: "المقاسات المتاحة إيه؟", a: "من حديثي الولادة لحد 12 سنة 👶👧" },
  { q: "أختار المقاس إزاي؟", a: "شوفي جدول المقاسات، ولو محتارة اكتبي طول بنتك من الوسط للقدم 💌" },
  { q: "هل يوجد معاينة عند الاستلام؟", a: "نعم، تعايني المنتج كامل قبل ما تدفعي 👀" },
  { q: "هل يوجد استرجاع أو استبدال؟", a: "خلال 14 يوم من الاستلام، بشرط المنتج ما اتلبسش 🔄" },
  { q: "متى يوصل وهل الشحن لكل المحافظات؟", a: "لكل المحافظات 🚚 والتوصيل من 3 لـ 5 أيام عمل" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const Cloud = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 120 60" fill="none">
    <path d="M15 45 Q5 45 5 33 Q5 22 18 22 Q20 8 35 8 Q50 8 55 20 Q60 12 72 12 Q88 12 90 26 Q102 26 105 38 Q107 45 100 45 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const Star = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="none">
    <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
  </svg>
);
const Heart = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="none">
    <path d="M20 34 C20 34 6 25 6 15 C6 9 11 5 16 5 C19 5 20 7 20 9 C20 7 21 5 24 5 C29 5 34 9 34 15 C34 25 20 34 20 34 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
  </svg>
);
const Squiggle = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
    <path d="M2 12 Q20 2 40 12 T80 12 T120 12 T160 12 T198 12"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

const IMG_POLAROID = [
  "w-full h-auto",
  "max-h-[60vh] object-contain object-center",
  "sm:max-h-none sm:aspect-[4/5] sm:object-cover sm:object-top",
  "rounded-sm block",
].join(" ");

const IMG_DUO = [
  "w-full h-auto",
  "max-h-[45vh] object-contain object-center",
  "sm:max-h-none sm:aspect-[3/4] sm:object-cover sm:object-center",
  "rounded-sm block",
].join(" ");

const IMG_LIFESTYLE = [
  "absolute inset-0 w-full h-full",
  "object-cover object-[center_30%]",
  "sm:object-[center_25%]",
].join(" ");

/* ─────────────────────────────────────────────
   🎨 بلوك ألوان (لما يكون منتج واحد بس)
   ───────────────────────────────────────────── */
function ProductColorsBlock({ product }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const current = product.productColors[colorIdx];

  return (
    <div className="wl-product-block">
      <h3
        className="wl-panel-title"
        style={{
          textAlign: "center",
          marginTop: 40,
          marginBottom: 24,
          fontSize: 26,
        }}
      >
        {product.name}
      </h3>

      <div className="wl-colors-grid">
        <Reveal className="wl-color-stage" delay={100}>
          <div className="wl-polaroid">
            <span className="wl-tape wl-tape-tl" />
            <span className="wl-tape wl-tape-tr" />

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
              }}
            >
              {!loadedImages[current.img] && <div className="wl-shimmer" />}
              <img
                key={current.color}
                src={optimizeImage(current.img, 700)}
                alt={current.color}
                loading="eager"
                decoding="async"
                onLoad={() =>
                  setLoadedImages((prev) => ({
                    ...prev,
                    [current.img]: true,
                  }))
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: loadedImages[current.img] ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  display: "block",
                }}
              />
            </div>

            <span className="wl-polaroid-caption">{current.color}</span>
          </div>
        </Reveal>

        <Reveal className="wl-colors-panel" delay={150}>
          <h3 className="wl-panel-title">الدرجات المتوفرة</h3>
          <div className="wl-swatches">
            {product.productColors.map((c, i) => (
              <button
                key={c.color}
                className={`wl-swatch ${i === colorIdx ? "active" : ""}`}
                onClick={() => setColorIdx(i)}
              >
                <span
                  className="wl-dot"
                  style={{ background: COLOR_HEX[c.color] || "#ddd" }}
                />
                <span className="wl-swatch-name">{c.color}</span>
              </button>
            ))}
          </div>

          <div className="wl-thumbs">
            {product.productColors.map((c, i) => (
              <button
                key={c.color}
                className={`wl-thumb ${i === colorIdx ? "active" : ""}`}
                onClick={() => setColorIdx(i)}
              >
                <img
                  src={optimizeImage(c.img, 150)}
                  alt={c.color}
                  loading="lazy"
                  decoding="async"
                  width={88}
                  height={88}
                />
                <span>{c.color}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   🎴 كارت منتج (لما يكون أكتر من منتج)
   ───────────────────────────────────────────── */
function ProductColorCard({ product, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const firstColor = product.productColors?.[0];
  const displayImg = firstColor?.img;

  return (
    <button
      type="button"
      className="wl-pcard"
      onClick={() => onOpen(product)}
    >
      <div className="wl-pcard-img">
        {!loaded && <div className="wl-shimmer" />}
        <img
          src={optimizeImage(displayImg, 400)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        <span className="wl-pcard-badge">
          {product.productColors.length} ألوان
        </span>
      </div>
      <div className="wl-pcard-body">
        <h4 className="wl-pcard-name">{product.name}</h4>
        <span className="wl-pcard-cta">
          اختاري اللون <span>←</span>
        </span>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   🪟 Modal اختيار اللون
   ───────────────────────────────────────────── */
function ProductColorModal({ product, onClose }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const current = product.productColors[colorIdx];

  useEffect(() => {
    setColorIdx(0);
    setLoaded(false);
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!product) return null;

  return (
    <div className="wl-modal" onClick={onClose}>
      <div className="wl-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="wl-modal-close" onClick={onClose} aria-label="إغلاق">
          ✕
        </button>

        <h3 className="wl-modal-title">{product.name}</h3>

        <div className="wl-colors-grid">
          <div className="wl-color-stage">
            <div className="wl-polaroid">
              <span className="wl-tape wl-tape-tl" />
              <span className="wl-tape wl-tape-tr" />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/5",
                }}
              >
                {!loaded && <div className="wl-shimmer" />}
                <img
                  key={current.color}
                  src={optimizeImage(current.img, 700)}
                  alt={current.color}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setLoaded(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    display: "block",
                  }}
                />
              </div>
              <span className="wl-polaroid-caption">{current.color}</span>
            </div>
          </div>

          <div className="wl-colors-panel">
            <h3 className="wl-panel-title">الدرجات المتوفرة</h3>
            <div className="wl-swatches">
              {product.productColors.map((c, i) => (
                <button
                  key={c.color}
                  className={`wl-swatch ${i === colorIdx ? "active" : ""}`}
                  onClick={() => {
                    setColorIdx(i);
                    setLoaded(false);
                  }}
                >
                  <span
                    className="wl-dot"
                    style={{ background: COLOR_HEX[c.color] || "#ddd" }}
                  />
                  <span className="wl-swatch-name">{c.color}</span>
                </button>
              ))}
            </div>

            <div className="wl-thumbs">
              {product.productColors.map((c, i) => (
                <button
                  key={c.color}
                  className={`wl-thumb ${i === colorIdx ? "active" : ""}`}
                  onClick={() => {
                    setColorIdx(i);
                    setLoaded(false);
                  }}
                >
                  <img
                    src={optimizeImage(c.img, 150)}
                    alt={c.color}
                    loading="lazy"
                    decoding="async"
                    width={88}
                    height={88}
                  />
                  <span>{c.color}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   الكومبوننت الرئيسي
   ───────────────────────────────────────────── */
function WinterLined() {
  const { category = "lined" } = useParams();

  const products = winterLined.filter((p) => p.category === category);
  const safeProducts = products.length ? products : [winterLined[0]];
  const heroProduct = safeProducts[0];

  const IMAGES = CATEGORY_IMAGES[category] || DEFAULT_IMAGES;
  const content = CATEGORY_CONTENT[category] || CATEGORY_CONTENT.lined;
  const categoryLabel = CATEGORY_LABEL[category] || "🧸";

  const [openFaq, setOpenFaq] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [openProduct, setOpenProduct] = useState(null);
  const orderCollectionRef = useRef(null);

  useEffect(() => {
    setSelectedOffer(null);
    setOpenFaq(0);
    setOpenProduct(null);
  }, [category]);

  const scrollToOrderCollection = () =>
    orderCollectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const scrollToOffers = () => {
    document
      .getElementById("offersSection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToColors = () =>
    document.getElementById("wl-colors")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="wl" dir="rtl">
      <style>{css}</style>

      {/* HERO */}
      <section className="wl-hero">
        <div className="wl-paper-bg" />
        <Cloud className="wl-doodle wl-doodle-c1" />
        <Cloud className="wl-doodle wl-doodle-c2" />
        <Star className="wl-doodle wl-doodle-s1" />
        <Star className="wl-doodle wl-doodle-s2" />
        <Star className="wl-doodle wl-doodle-s3" />
        <Heart className="wl-doodle wl-doodle-h1" />
        <Heart className="wl-doodle wl-doodle-h2" />

        <div className="wl-hero-inner">
          <Reveal className="wl-hero-img" delay={150}>
            <div className="wl-polaroid wl-polaroid-hero">
              <span className="wl-tape wl-tape-tl" />
              <span className="wl-tape wl-tape-br" />

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/5",
                }}
              >
                {!heroLoaded && <div className="wl-shimmer" />}
                <img
                  src={optimizeImage(IMAGES.hero, 800)}
                  alt={heroProduct.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onLoad={() => setHeroLoaded(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    opacity: heroLoaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    display: "block",
                  }}
                />
              </div>

              <span className="wl-polaroid-caption">— دفء الشتا ❄️ —</span>
            </div>
            <svg className="wl-arrow" viewBox="0 0 120 100" fill="none">
              <path d="M8 12 Q40 40 90 78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" fill="none"/>
              <path d="M78 68 L90 78 L80 88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="wl-hand-note">جديد ✨</span>
          </Reveal>

          <Reveal className="wl-hero-text">
            <div className="wl-tape-label">
              <span className="wl-tape" />
              <span className="wl-label">
                {categoryLabel} Winter Collection 2026 ✨
              </span>
            </div>
            <h1>
              حكاية <span className="wl-hl">دفء</span>
              <br />
              {content.heroTitle}
            </h1>
            <p className="wl-lead">
              {content.heroSubtitle}
              <br />
              مريح، كيوت، ومناسب للبيت والخروج 🎀
            </p>
            <div className="wl-cta">
              <button className="wl-btn" onClick={goToColors}>
                <span>🎨</span> اختاري اللون
              </button>
              <button className="wl-btn-ghost" onClick={goToColors}>
                <span>📏</span> المقاسات
              </button>
            </div>
            <div className="wl-trust">
              <span>🚚 شحن لكل المحافظات</span>
              <span>•</span>
              <span>👀 معاينة قبل الدفع</span>
              <span>•</span>
              <span>✅ ضمان 30 يوم</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="wl-strip">
        <div className="wl-strip-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div className="wl-strip-group" key={k}>
              <span>🧸 دفء</span><i>✦</i>
              <span>🌈 نعومة</span><i>✦</i>
              <span>🎀 كيوت</span><i>✦</i>
              <span>💗 مريح</span><i>✦</i>
              <span>✨ أنيق</span><i>✦</i>
              <span>🧦 كولون كامل</span><i>✦</i>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="wl-section wl-section-features">
        <Reveal className="wl-head">
          <span className="wl-pill">💭 ليه هي مميزة؟</span>
          <h2>حاجات صغيرة <em>تخليها أحلى</em></h2>
          <Squiggle className="wl-squiggle" />
        </Reveal>

        <div className="wl-features-layout">
          <Reveal className="wl-features-img" delay={80}>
            <div className="wl-polaroid wl-polaroid-tilt-left">
              <span className="wl-tape wl-tape-tl" />
              <img
                src={optimizeImage(IMAGES.features, 600)}
                alt="تفاصيل المنتج"
                loading="lazy"
                decoding="async"
                className={IMG_POLAROID}
              />
              <span className="wl-polaroid-caption">تفاصيل كيوت 🎀</span>
            </div>
          </Reveal>

          <div className="wl-features">
            {content.features.map((f, i) => (
              <Reveal
                key={f.title}
                className="wl-feature"
                delay={i * 80}
                style={{ background: f.color, "--rot": f.rotate }}
              >
                <span className="wl-tape wl-tape-sm" />
                <div className="wl-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <OfferesSec
        setSelectedOffer={setSelectedOffer}
        scrollToOrderCollection={scrollToOrderCollection}
        category={category}
      />
     
       {/* COLORS */}
      <section className="wl-section wl-section-colors" id="wl-colors">
        <Reveal className="wl-head">
          <span className="wl-pill">🎨 الألوان</span>
          <h2>
            {safeProducts.length === 1 ? (
              <>
                اختاري اللون اللي <em>يحبه قلبها</em>
              </>
            ) : (
              <>
                اختاري المنتج <em>واللون</em>
              </>
            )}
          </h2>
          <Squiggle className="wl-squiggle" />
        </Reveal>

        {/* ✅ منتج واحد → العرض القديم */}
        {safeProducts.length === 1 ? (
          <ProductColorsBlock product={safeProducts[0]} />
        ) : (
          /* ✅ أكتر من منتج → كروت + Modal */
          <div className="wl-products-grid">
            {safeProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductColorCard
                  product={product}
                  onOpen={(p) => setOpenProduct(p)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>


{/* الاوردر كولكشن */}

 <div ref={orderCollectionRef}>
        <LinedOrderCollection
          selectedOffer={selectedOffer}
          scrollToOffers={scrollToOffers}
          category={category}
        />
      </div>

      {/* MATERIAL */}
      <section className="wl-section wl-section-material">
        <div className="wl-split">
          <Reveal className="wl-split-imgs">
            <div className="wl-imgs-duo">
              <div className="wl-polaroid wl-polaroid-tilt">
                <span className="wl-tape wl-tape-tl" />
                <img
                  src={optimizeImage(IMAGES.material1, 500)}
                  alt="خامة الكولون 1"
                  loading="lazy"
                  decoding="async"
                  className={IMG_DUO}
                />
              </div>
              <div className="wl-polaroid wl-polaroid-tilt-r">
                <span className="wl-tape wl-tape-tr" />
                <img
                  src={optimizeImage(IMAGES.material2, 500)}
                  alt="خامة الكولون 2"
                  loading="lazy"
                  decoding="async"
                  className={IMG_DUO}
                />
              </div>
            </div>
          </Reveal>
          <Reveal className="wl-split-text" delay={120}>
            <span className="wl-pill">🧵 الخامة</span>
            <h2>
              نعومة <span className="wl-underline">تحسّيها</span> من أول لمسة
            </h2>
            <p>
              {category === "fur"
                ? "فرو ناعم من الداخل + خامة خارجية أنيقة. دفء مضاعف للشتا القارس."
                : "بطانة فوطه دافئة من الداخل + تصميم خطوط أنيقة. توازن مثالي بين الدفء والشكل."}
            </p>
            <ul className="wl-list">
              <li>
                <span className="wl-bullet">1</span>
                {category === "fur" ? "فرو ناعم من الداخل ☁️" : "بطانة فوطه ناعمة 🧸"}
              </li>
              <li>
                <span className="wl-bullet">2</span> قطن مرن يسمح بالحركة 🌈
              </li>
              <li>
                <span className="wl-bullet">3</span> خياطة دقيقة وتشطيب نظيف ✨
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

     

      {/* LIFESTYLE */}
      <section className="wl-lifestyle">
        <img
          src={optimizeImage(IMAGES.lifestyle, 1200)}
          alt=""
          loading="lazy"
          decoding="async"
          className={IMG_LIFESTYLE}
        />
        <div className="wl-lifestyle-overlay">
          <span className="wl-pill wl-pill-light">✨ لحظاتها اليومية</span>
          <h2>تتحرك براحتها... وإنتِ مطمنة 🤍</h2>
          <p>للعب، للمشي، وللجلوس في البيت — تصميم مرن يخليها حرة وتدفي.</p>
        </div>
      </section>

      {/* SIZES */}
      <SizesSec product={heroProduct} category={category} />
      <RealLife category={category} />

      {/* FAQ */}
      <section className="wl-section wl-section-faq">
        <Reveal className="wl-head">
          <span className="wl-pill">❓ أسئلة شائعة</span>
          <h2>
            كل اللي محتاجة <em>تعرفيه</em>
          </h2>
          <Squiggle className="wl-squiggle" />
        </Reveal>
        <div className="wl-faqs">
          {FAQS.map((f, i) => (
            <Reveal
              className={`wl-faq ${openFaq === i ? "open" : ""}`}
              key={f.q}
              delay={i * 50}
            >
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="wl-faq-q">
                  <span className="wl-faq-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.q}
                </span>
                <span className="wl-faq-icon">{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className="wl-faq-body">
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL */}
      <section className="wl-final">
        <Cloud className="wl-doodle wl-doodle-c3" />
        <Star className="wl-doodle wl-doodle-s4" />
        <Heart className="wl-doodle wl-doodle-h3" />
        <Reveal className="wl-final-inner">
          <span className="wl-pill wl-pill-light">🎀 الشتا أحلى معاها</span>
          <h2>خلّي بنوتك دافية الشتا ده 🌸</h2>
          <button className="wl-btn wl-btn-light" onClick={goToColors}>
            🛍️ اطلبي دلوقتي
          </button>
        </Reveal>
      </section>

      {/* ✅ Modal */}
      {openProduct && (
        <ProductColorModal
          product={openProduct}
          onClose={() => setOpenProduct(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CSS
   ───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Lalezar&family=Cairo:wght@400;600;700;900&family=Caveat:wght@500;700&display=swap');

.wl{
  --paper:#FFFDF7;
  --paper-2:#FFF7EE;
  --line:#E8E0D4;
  --ink:#3A2E45;
  --ink-soft:#7C6E88;
  --pink:#FF9EC4;
  --pink-d:#F06292;
  --lav:#B69CFF;
  --sky:#7EB6FF;
  --mint:#7BD9B0;
  --sun:#FFD166;
  --tape:#F4E4B8;
  font-family:'Cairo','Tajawal',system-ui,sans-serif;
  color:var(--ink);
  background:var(--paper);
  overflow-x:hidden;
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
}
.wl *{box-sizing:border-box}
.wl img{max-width:100%;display:block}
.wl button{font-family:inherit;cursor:pointer;background:none;border:0;color:inherit}

.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)}
.reveal.in{opacity:1;transform:translateY(0)}

.wl-paper-bg{
  position:absolute;inset:0;pointer-events:none;
  background-image:
    repeating-linear-gradient(0deg, transparent 0, transparent 39px, rgba(126,182,255,.08) 39px, rgba(126,182,255,.08) 40px),
    radial-gradient(circle at 15% 25%, rgba(255,158,196,.15), transparent 40%),
    radial-gradient(circle at 85% 75%, rgba(182,156,255,.15), transparent 40%);
}

.wl-doodle{position:absolute;color:var(--ink-soft);opacity:.45;pointer-events:none}
.wl-doodle-c1{width:110px;top:8%;right:6%;color:var(--sky);animation:wlFloat 6s ease-in-out infinite}
.wl-doodle-c2{width:80px;top:22%;left:8%;color:var(--sky);animation:wlFloat 5s ease-in-out infinite .5s}
.wl-doodle-c3{width:120px;top:15%;right:12%;color:#fff;opacity:.35;animation:wlFloat 6s ease-in-out infinite}
.wl-doodle-s1{width:32px;top:14%;left:18%;color:var(--sun);animation:wlSpin 8s linear infinite}
.wl-doodle-s2{width:24px;top:70%;right:10%;color:var(--pink);animation:wlSpin 6s linear infinite reverse}
.wl-doodle-s3{width:28px;bottom:15%;left:10%;color:var(--lav);animation:wlSpin 10s linear infinite}
.wl-doodle-s4{width:36px;bottom:20%;left:14%;color:#fff;opacity:.5;animation:wlSpin 9s linear infinite}
.wl-doodle-h1{width:34px;top:60%;left:6%;color:var(--pink);animation:wlFloat 5s ease-in-out infinite 1s}
.wl-doodle-h2{width:26px;bottom:22%;right:8%;color:var(--pink-d);animation:wlFloat 4.5s ease-in-out infinite}
.wl-doodle-h3{width:30px;top:22%;left:22%;color:#fff;opacity:.45;animation:wlFloat 5s ease-in-out infinite}
@keyframes wlFloat{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-16px) rotate(4deg)}}
@keyframes wlSpin{to{transform:rotate(360deg)}}

@keyframes wlShimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.wl-shimmer{
  position:absolute;inset:0;
  background:linear-gradient(135deg,#f0e6e0 0%,#e8d8d0 50%,#f0e6e0 100%);
  background-size:200% 200%;
  animation:wlShimmer 1.5s ease-in-out infinite;
  border-radius:4px;
}

.wl-pill,.wl-pill-light{
  display:inline-flex;align-items:center;gap:6px;
  font-weight:700;font-size:13px;padding:8px 20px;border-radius:999px;margin-bottom:18px;
}
.wl-pill{background:var(--paper);color:var(--ink);border:2px solid var(--ink)}
.wl-pill-light{background:rgba(255,255,255,.25);color:#fff;border:2px solid rgba(255,255,255,.5);backdrop-filter:blur(6px)}

.wl-tape{
  position:absolute;
  width:80px;height:26px;
  background:var(--tape);
  opacity:.85;
  box-shadow:0 2px 6px rgba(0,0,0,.08);
  transform:rotate(-3deg);
  pointer-events:none;
}
.wl-tape-sm{width:60px;height:20px;top:-8px;left:50%;transform:translateX(-50%) rotate(-4deg)}
.wl-tape-tl{top:-12px;left:14px;transform:rotate(-6deg)}
.wl-tape-tr{top:-12px;right:14px;transform:rotate(6deg)}
.wl-tape-br{bottom:-12px;right:20px;transform:rotate(-4deg)}

.wl-tape-label{position:relative;display:inline-block;margin-bottom:22px}
.wl-tape-label .wl-tape{top:-8px;left:-18px;width:70px}
.wl-label{
  display:inline-block;
  font-family:'Caveat','Cairo',cursive;
  font-size:22px;font-weight:700;
  color:var(--pink-d);
  padding:6px 20px;
  background:#fff;
  border:2px dashed var(--pink);
  border-radius:20px;
  transform:rotate(-2deg);
}

.wl-section{padding:90px 22px;max-width:1140px;margin:0 auto;position:relative}
.wl-section-features{background:var(--paper-2);max-width:none;border-radius:60px;margin:0 12px}
.wl-section-features>*{max-width:1140px;margin-inline:auto}
.wl-section-colors{background:linear-gradient(180deg,transparent,#FFF0F7 40%,#FFF0F7 60%,transparent)}
.wl-section-faq{max-width:900px}

.wl-head{text-align:center;max-width:660px;margin:0 auto 46px;position:relative}
.wl-head h2{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(30px,4.8vw,50px);
  font-weight:400;line-height:1.25;margin:0;color:var(--ink);
}
.wl-head h2 em{
  font-style:normal;
  background:linear-gradient(120deg,var(--pink-d),var(--lav));
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  padding:0 6px;
}
.wl-squiggle{display:block;margin:14px auto 0;width:160px;height:16px;color:var(--pink)}

.wl-underline{
  position:relative;display:inline-block;
  background:linear-gradient(180deg,transparent 60%,var(--sun) 60% 92%,transparent 92%);
  padding:0 4px;
}

.wl-btn{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 34px;border-radius:999px;
  font-size:16px;font-weight:800;
  background:var(--ink);color:#fff;
  border:3px solid var(--ink);
  box-shadow:6px 6px 0 var(--pink);
  transition:.2s ease;
}
.wl-btn:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 var(--pink-d)}
.wl-btn-ghost{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 34px;border-radius:999px;
  font-size:16px;font-weight:800;
  background:#fff;color:var(--ink);
  border:3px solid var(--ink);
  box-shadow:6px 6px 0 var(--lav);
  transition:.2s ease;
}
.wl-btn-ghost:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 var(--lav)}
.wl-btn-light{
  background:#fff;color:var(--ink);
  border-color:var(--ink);
  box-shadow:6px 6px 0 rgba(0,0,0,.25);
}

.wl-hero{
  position:relative;
  padding:90px 22px 110px;
  overflow:hidden;
  background:linear-gradient(180deg,#FFF7EE 0%,#FFF0F7 100%);
}
.wl-hero-inner{
  position:relative;max-width:1140px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;z-index:1;
}
.wl-hero-text h1{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(40px,6.5vw,72px);
  line-height:1.15;margin:0 0 22px;font-weight:400;
  color:var(--ink);
}
.wl-hl{position:relative;display:inline-block;color:var(--pink-d)}
.wl-hl::after{
  content:"";position:absolute;left:-4px;right:-4px;bottom:6px;height:14px;
  background:var(--sun);opacity:.5;z-index:-1;border-radius:8px;transform:rotate(-1deg);
}
.wl-lead{
  font-size:clamp(15px,1.6vw,18px);
  color:var(--ink-soft);margin:0 0 32px;max-width:520px;
  line-height:1.9;
}
.wl-cta{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:30px}
.wl-trust{
  display:flex;flex-wrap:wrap;gap:12px;align-items:center;
  font-size:13.5px;font-weight:700;color:var(--ink-soft);
  padding-top:22px;border-top:2px dashed var(--line);
}
.wl-trust span:nth-child(even){color:var(--pink)}

.wl-polaroid{
  position:relative;
  background:#fff;
  padding:14px 14px 60px;
  box-shadow:0 20px 50px -20px rgba(58,46,69,.3);
  display:inline-block;
  width:100%;
}
.wl-polaroid-caption{
  position:absolute;bottom:16px;left:0;right:0;
  text-align:center;
  font-family:'Caveat','Cairo',cursive;
  font-size:22px;font-weight:700;color:var(--ink-soft);
}
.wl-polaroid-hero{transform:rotate(-3deg);transition:.4s ease}
.wl-polaroid-hero:hover{transform:rotate(0) translateY(-6px)}
.wl-polaroid-tilt{transform:rotate(2.5deg)}
.wl-polaroid-tilt-r{transform:rotate(-2.5deg)}
.wl-polaroid-tilt-left{transform:rotate(-2deg)}

.wl-hero-img{position:relative}
.wl-arrow{
  position:absolute;bottom:-40px;left:20%;width:100px;color:var(--pink-d);
  transform:rotate(-10deg);
}
.wl-hand-note{
  position:absolute;top:-12px;left:-10px;
  font-family:'Caveat','Cairo',cursive;
  font-size:26px;font-weight:700;color:var(--pink-d);
  transform:rotate(-12deg);
  text-shadow:1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}

.wl-strip{background:var(--ink);color:var(--paper);padding:18px 0;overflow:hidden;position:relative;z-index:2}
.wl-strip-track{display:flex;gap:56px;white-space:nowrap;animation:wlSlide 16s linear infinite}
.wl-strip-group{display:flex;gap:56px;align-items:center}
.wl-strip-group span{font-family:'Lalezar',sans-serif;font-size:20px;letter-spacing:.02em}
.wl-strip-group i{color:var(--pink);font-style:normal;font-size:14px}
@keyframes wlSlide{to{transform:translateX(50%)}}

.wl-features-layout{
  display:grid;
  grid-template-columns:0.9fr 1.3fr;
  gap:50px;
  align-items:center;
}
.wl-features-img{position:relative}

.wl-features{
  display:grid;grid-template-columns:repeat(2,1fr);gap:22px;
}
.wl-feature{
  position:relative;
  padding:38px 20px 26px;
  text-align:center;
  border:2.5px solid var(--ink);
  box-shadow:6px 6px 0 rgba(58,46,69,.15);
  transition:.3s cubic-bezier(.2,.7,.2,1);
  transform: rotate(var(--rot, 0deg));
  will-change: transform;
}
.wl-feature:hover{
  transform: rotate(0deg) translate(-3px,-3px);
  box-shadow:10px 10px 0 rgba(58,46,69,.2);
}
.wl-feature-icon{
  font-size:38px;width:76px;height:76px;margin:0 auto 16px;
  display:grid;place-items:center;
  background:#fff;border-radius:50%;
  border:2.5px solid var(--ink);
}
.wl-feature h3{
  font-family:'Lalezar',sans-serif;font-size:20px;font-weight:400;
  margin:0 0 8px;color:var(--ink);
}
.wl-feature p{margin:0;color:var(--ink-soft);font-size:13.5px;line-height:1.75}

.wl-split{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
.wl-split-imgs{position:relative}
.wl-imgs-duo{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px;
  align-items:start;
}
.wl-imgs-duo .wl-polaroid{padding:10px 10px 46px}
.wl-imgs-duo .wl-polaroid-caption{font-size:18px;bottom:12px}
.wl-imgs-duo .wl-polaroid:nth-child(1){margin-top:24px}
.wl-imgs-duo .wl-polaroid:nth-child(2){margin-top:0}

.wl-split-text h2{
  font-family:'Lalezar',sans-serif;
  font-size:clamp(28px,4vw,44px);font-weight:400;
  line-height:1.25;margin:0 0 20px;
}
.wl-split-text p{color:var(--ink-soft);font-size:16px;margin:0 0 24px;max-width:480px;line-height:1.9}
.wl-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px}
.wl-list li{
  display:flex;align-items:center;gap:14px;
  padding:14px 20px;background:#fff;
  border:2.5px solid var(--ink);
  box-shadow:4px 4px 0 rgba(58,46,69,.1);
  font-size:15px;font-weight:700;
}
.wl-bullet{
  flex:none;width:30px;height:30px;border-radius:50%;
  background:var(--pink);color:#fff;
  display:grid;place-items:center;
  font-weight:800;font-size:14px;
}

/* ✅ كروت المنتجات */
.wl-products-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:24px;
  max-width:900px;
  margin:0 auto;
}
.wl-pcard{
  display:block;width:100%;
  background:#fff;
  border:2.5px solid var(--ink);
  box-shadow:6px 6px 0 rgba(58,46,69,.15);
  padding:0;
  overflow:hidden;
  text-align:right;
  transition:.3s cubic-bezier(.2,.7,.2,1);
  cursor:pointer;
}
.wl-pcard:hover{
  transform:translate(-3px,-3px);
  box-shadow:10px 10px 0 var(--pink);
}
.wl-pcard-img{
  position:relative;
  width:100%;
  aspect-ratio:4/5;
  overflow:hidden;
  background:#f7f2ee;
}
.wl-pcard-img img{
  width:100%;height:100%;object-fit:cover;object-position:top;
}
.wl-pcard-badge{
  position:absolute;
  top:10px;left:10px;
  background:rgba(58,46,69,.9);
  color:#fff;
  font-size:11px;
  font-weight:800;
  padding:4px 10px;
  border-radius:999px;
  backdrop-filter:blur(4px);
}
.wl-pcard-body{
  padding:14px 16px 18px;
}
.wl-pcard-name{
  font-family:'Lalezar',sans-serif;
  font-size:17px;
  font-weight:400;
  margin:0 0 10px;
  color:var(--ink);
  line-height:1.3;
}
.wl-pcard-cta{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:10px;
  border-top:2px dashed var(--line);
  font-size:13px;font-weight:800;
  color:var(--pink-d);
}
.wl-pcard-cta span{transition:transform .3s}
.wl-pcard:hover .wl-pcard-cta span{transform:translateX(-4px)}

/* ✅ Modal */
.wl-modal{
  position:fixed;inset:0;z-index:200;
  background:rgba(20,14,25,.85);
  backdrop-filter:blur(6px);
  display:flex;align-items:center;justify-content:center;
  padding:20px;
  animation:wlFade .25s ease;
  overflow-y:auto;
}
@keyframes wlFade{from{opacity:0}to{opacity:1}}
.wl-modal-inner{
  position:relative;
  background:var(--paper);
  border:3px solid var(--ink);
  box-shadow:12px 12px 0 var(--pink);
  max-width:900px;
  width:100%;
  max-height:90vh;
  overflow-y:auto;
  padding:40px 30px 30px;
  border-radius:8px;
}
.wl-modal-close{
  position:absolute;top:12px;left:12px;
  width:38px;height:38px;
  border-radius:50%;
  background:#fff;
  border:2.5px solid var(--ink);
  color:var(--ink);
  font-size:18px;font-weight:900;
  display:grid;place-items:center;
  cursor:pointer;
  transition:.2s ease;
  z-index:5;
}
.wl-modal-close:hover{background:var(--pink-d);color:#fff;border-color:var(--pink-d)}
.wl-modal-title{
  font-family:'Lalezar',sans-serif;
  font-size:clamp(22px,3vw,30px);
  font-weight:400;
  text-align:center;
  margin:0 0 24px;
  color:var(--ink);
}

/* Colors */
.wl-colors-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start;
}
.wl-color-stage{position:relative}
.wl-colors-panel{position:relative}
.wl-panel-title{
  font-family:'Lalezar',sans-serif;
  font-size:22px;font-weight:400;
  margin:0 0 18px;color:var(--ink);
  padding-bottom:10px;
  border-bottom:2px dashed var(--line);
}
.wl-swatches{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}
.wl-swatch{
  display:inline-flex;align-items:center;gap:10px;
  padding:9px 18px 9px 12px;
  background:#fff;font-size:13.5px;font-weight:700;
  border:2.5px solid var(--ink);
  box-shadow:3px 3px 0 rgba(58,46,69,.15);
  transition:.2s ease;
}
.wl-swatch:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 rgba(58,46,69,.25)}
.wl-swatch.active{background:var(--ink);color:#fff;transform:translate(-1px,-1px)}
.wl-dot{width:20px;height:20px;border-radius:50%;border:2px solid rgba(0,0,0,.1)}
.wl-swatch.active .wl-dot{border-color:rgba(255,255,255,.4)}

.wl-thumbs{display:grid;grid-template-columns:repeat(auto-fit,minmax(88px,1fr));gap:12px}
.wl-thumb{
  background:#fff;padding:6px;
  border:2.5px solid var(--ink);
  box-shadow:3px 3px 0 rgba(58,46,69,.15);
  transition:.2s ease;
}
.wl-thumb img{aspect-ratio:1;object-fit:cover;width:100%}
.wl-thumb span{display:block;font-size:12px;font-weight:700;margin-top:6px;color:var(--ink-soft);text-align:center}
.wl-thumb:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 rgba(58,46,69,.25)}
.wl-thumb.active{background:var(--sun)}

/* ✅ فاصل بين بلوكات المنتجات */
.wl-product-block + .wl-product-block {
  margin-top: 70px;
  padding-top: 50px;
  border-top: 3px dashed var(--line);
}

.wl-lifestyle{position:relative;min-height:520px;display:grid;place-items:center;overflow:hidden}
.wl-lifestyle::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,46,69,.35),rgba(240,98,146,.45))}
.wl-lifestyle-overlay{
  position:relative;z-index:1;text-align:center;color:#fff;
  padding:50px 40px;max-width:640px;margin:60px 24px;
  background:rgba(58,46,69,0.1);
  backdrop-filter:blur(1.5px);
  border:3px solid #fff;
  box-shadow:10px 10px 0 rgba(0,0,0,.2);
}
.wl-lifestyle-overlay h2{
  font-family:'Lalezar',sans-serif;
  font-size:clamp(28px,4.5vw,46px);font-weight:400;margin:0 0 14px;
  line-height:1.25;
}
.wl-lifestyle-overlay p{margin:0;font-size:16px;color:rgba(255,255,255,.95);max-width:460px;margin-inline:auto}

.wl-faqs{display:flex;flex-direction:column;gap:16px}
.wl-faq{
  background:#fff;
  border:2.5px solid var(--ink);
  box-shadow:5px 5px 0 rgba(58,46,69,.15);
  overflow:hidden;
  transition:.25s ease;
}
.wl-faq.open{box-shadow:8px 8px 0 var(--pink)}
.wl-faq button{
  width:100%;display:flex;justify-content:space-between;align-items:center;gap:14px;
  padding:20px 24px;font-size:16px;font-weight:700;color:var(--ink);text-align:right;
}
.wl-faq-q{display:flex;align-items:center;gap:14px;flex:1}
.wl-faq-num{
  font-family:'Lalezar',sans-serif;
  font-size:20px;color:var(--pink-d);
  flex:none;min-width:32px;
}
.wl-faq-icon{
  flex:none;width:34px;height:34px;
  background:var(--sun);color:var(--ink);
  border:2.5px solid var(--ink);
  display:grid;place-items:center;
  font-size:20px;font-weight:400;
  transition:.3s ease;
}
.wl-faq.open .wl-faq-icon{transform:rotate(180deg);background:var(--pink);color:#fff;border-color:var(--pink)}
.wl-faq-body{max-height:0;overflow:hidden;transition:max-height .4s ease}
.wl-faq.open .wl-faq-body{max-height:280px}
.wl-faq-body p{margin:0;padding:0 24px 22px 70px;color:var(--ink-soft);font-size:15px;line-height:1.85}

.wl-final{
  position:relative;
  background:var(--ink);color:#fff;
  text-align:center;padding:100px 22px;overflow:hidden;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,158,196,.25), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(182,156,255,.25), transparent 50%);
}
.wl-final-inner{position:relative;max-width:640px;margin:0 auto;z-index:1}
.wl-final h2{
  font-family:'Lalezar',sans-serif;
  font-size:clamp(32px,5vw,54px);font-weight:400;
  margin:0 0 30px;line-height:1.25;color:#fff;
}

.wl img {content-visibility: auto;}
.wl-thumb img {background:#f7f2ee;}
.wl-polaroid img {background:#f7f2ee;}

@media(max-width:900px){
  .wl-features-layout{grid-template-columns:1fr;gap:36px}
  .wl-hero-inner{grid-template-columns:1fr;gap:44px;text-align:center}
  .wl-hero-img{order:-1}
  .wl-hero-text{order:1}
  .wl-lead{margin-inline:auto}
  .wl-cta,.wl-trust{justify-content:center}
  .wl-list li{justify-content:flex-start}
  .wl-doodle{opacity:.3}
  .wl-section{padding:70px 18px}
  .wl-hero{padding:60px 18px 90px}
  .wl-lifestyle-overlay{padding:36px 24px;margin:40px 18px}
  .wl-arrow,.wl-hand-note{display:none}
  .wl-split,.wl-colors-grid{grid-template-columns:1fr;gap:44px;text-align:center}
}

@media(max-width:700px){
  .wl-features{grid-template-columns:repeat(2,1fr);gap:14px;padding-top:10px}
  .wl-feature{padding:28px 12px 20px;box-shadow:5px 5px 0 rgba(58,46,69,.15)}
  .wl-feature-icon{font-size:32px;width:60px;height:60px;margin-bottom:12px;border-width:2px}
  .wl-feature h3{font-size:15px;margin-bottom:6px}
  .wl-feature p{font-size:12px;line-height:1.65}
  .wl-tape-sm{width:50px;height:16px}
  .wl-products-grid{grid-template-columns:repeat(2,1fr);gap:14px}
  .wl-pcard-body{padding:10px 12px 14px}
  .wl-pcard-name{font-size:14px}
  .wl-pcard-cta{font-size:11px}
  .wl-modal-inner{padding:40px 16px 20px}
}

@media(max-width:520px){
  .wl-hero-text h1{font-size:38px}
  .wl-section{padding:56px 16px}
  .wl-section-features{border-radius:40px;margin:0 8px}
  .wl-btn,.wl-btn-ghost{padding:14px 26px;font-size:15px;box-shadow:4px 4px 0}
  .wl-faq-body p{padding-left:24px}
  .wl-faq-num{font-size:18px;min-width:26px}
  .wl-strip-group span{font-size:16px}
  .wl-strip-track{gap:36px}
  .wl-strip-group{gap:36px}
  .wl-features{gap:12px}
  .wl-feature{padding:24px 10px 18px}
  .wl-feature-icon{font-size:28px;width:52px;height:52px}
  .wl-feature h3{font-size:14px}
  .wl-feature p{font-size:11.5px}
  .wl-imgs-duo{gap:12px}
  .wl-imgs-duo .wl-polaroid{padding:8px 8px 40px}
  .wl-imgs-duo .wl-polaroid:nth-child(1){margin-top:16px}
}
`;

export default WinterLined;