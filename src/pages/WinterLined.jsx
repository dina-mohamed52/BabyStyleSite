import {
  memo,
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { winterLined } from "../data/WinterLined";
import OfferesSec from "../features/WinterLined/OfferesSec";
import LinedOrderCollection from "../features/WinterLined/LinedOrderCollection";
import { CATEGORY_IMAGES } from "../features/WinterLined/CategoryHeroSecImages";
import "../features/WinterLined/WinterLined.css";


/* ⚡ أقسام تحت الشاشة → تتحمل بعد الأساسي */
const SizesSec = lazy(() => import("../features/WinterLined/SizesSec"));
const RealLife = lazy(() => import("../features/WinterLined/RealLife"));

/* ─────────────────────────────────────────────
   ⚡ جدول المقاسات المخصص للكاتيجوري المبطن (Lined)
   ───────────────────────────────────────────── */
const PlainLinedSizeTable = memo(function PlainLinedSizeTable() {
  const sizes = [
    { size: '0', age: 'من 0 إلى 9 شهور', length: '40' },
    { size: '2', age: 'من سنة إلى سنتين', length: '45' },
    { size: '4', age: 'من 2 إلى 4 سنوات', length: '50' },
    { size: '6', age: 'من 5 إلى 6 سنوات', length: '60' },
    { size: '8', age: 'من 7 إلى 8 سنوات', length: '70' },
    { size: '10', age: 'من 9 إلى 10 سنوات', length: '80' },
    { size: '12', age: 'من 11 إلى 12 سنة', length: '90' },
  ];

  return (
    <section className="wl-section wl-section-plain-sizes" style={{ padding: '60px 22px' }}>
      <div style={{
        maxWidth: '650px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px -10px rgba(58,46,69,0.08)',
        border: '2px solid var(--line)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ background: 'var(--pink-d)', color: '#fff' }}>
              <th style={{ padding: '16px 12px', fontWeight: 'bold', fontSize: '16px', width: '33.33%', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>المقاس</th>
              <th style={{ padding: '16px 12px', fontWeight: 'bold', fontSize: '16px', width: '33.33%', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>العمر المناسب</th>
              <th style={{ padding: '16px 12px', fontWeight: 'bold', fontSize: '16px', width: '33.33%' }}>طول الكولون</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((item, index) => (
              <tr
                key={index}
                style={{
                  background: index % 2 === 0 ? '#fff' : '#FFF5F7',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FFEBEF'}
                onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#FFF5F7'}
              >
                <td style={{ padding: '16px 12px', borderBottom: index === sizes.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--ink)' }}>{item.size}</span>
                </td>
                <td style={{ padding: '16px 12px', borderBottom: index === sizes.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-soft)' }}>{item.age}</span>
                </td>
                <td style={{ padding: '16px 12px', borderBottom: index === sizes.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--pink-d)' }}>{item.length}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-soft)', marginRight: '4px' }}>سم</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--ink-soft)', marginTop: '16px', fontWeight: 600 }}>
        * المقاسات تقريبية وقد تختلف قليلاً حسب تصميم الموديل.
      </p>
    </section>
  );
});

/* ─────────────────────────────────────────────
   ⚡ مكون جدول المقاسات المخصص للكاتيجوري السحري
   ───────────────────────────────────────────── */
const MagicalSizeTable = memo(function MagicalSizeTable() {
  const sizes = [
    { label: "S", age: "من 3 لـ 6 سنين" },
    { label: "M", age: "من 6 لـ 8 سنين" },
    { label: "L", age: "من 8 لـ 12 سنة" },
  ];

  return (
    <section className="wl-section wl-section-magical-sizes" style={{ padding: '60px 22px' }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: '#FFFDF7',
        borderRadius: '24px',
        padding: '32px 24px',
        boxShadow: '0 20px 40px -15px rgba(58,46,69,0.1)',
        border: '2.5px solid var(--ink)',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* العنوان */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontFamily: "'Lalezar', sans-serif",
            fontSize: '32px',
            fontWeight: 400,
            color: 'var(--ink)',
            margin: '0 0 10px'
          }}>
            اختاري مقاس بنتك صح
          </h2>
          <span style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--pink-d)',
            background: '#FFF0F7',
            padding: '6px 18px',
            borderRadius: '999px',
            border: '2px solid var(--pink)'
          }}>
            المقاسات
          </span>
        </div>

        {/* البطاقات */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {sizes.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fff',
              padding: '16px 20px',
              borderRadius: '16px',
              border: '2.5px solid var(--ink)',
              boxShadow: '4px 4px 0 rgba(58,46,69,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '6px 6px 0 var(--pink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '4px 4px 0 rgba(58,46,69,0.08)';
            }}
            >
              <div style={{
                fontSize: '22px',
                fontWeight: 900,
                color: 'var(--pink-d)',
                fontFamily: "'Cairo', sans-serif",
                width: '40px',
                textAlign: 'center'
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--ink)',
                flex: 1,
                textAlign: 'right',
                paddingRight: '16px'
              }}>
                {item.age}
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--line)'
              }} />
            </div>
          ))}
        </div>

        {/* ملاحظة */}
        <p style={{
          fontSize: '13px',
          color: 'var(--ink-soft)',
          lineHeight: 1.8,
          margin: 0
        }}>
          محتارة؟ ابعتيلنا سن ووزن بنتك على واتساب ونقولك المقاس.
        </p>
      </div>
    </section>
  );
});

/* ─────────────────────────────────────────────
   ثوابت
   ───────────────────────────────────────────── */
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
  magical: "✨ سحري",
};

const DEFAULT_IMAGES = CATEGORY_IMAGES.lined;

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
        title: "كولون فيونكة مبطن فوطة",
        text: "لمسة أنثوية ساحرة — فيونكة كيوت على كولون دافي، يخلي بنوتك أميرة الشتا بجد 👑",
        rotate: "2deg",
        color: "#FFE7F1",
      },
      { icon: "🌈", title: "ألوان كيوت", text: "درجات حلوة تختاري اللي يعجبك", rotate: "-2deg", color: "#F0E7FF" },
      { icon: "🦋", title: "حرية الحركة", text: "مرن يسمح لها تلعب براحتها", rotate: "3deg", color: "#DFF7EA" },
    ],
  },
  magical: {
    heroTitle: "كولون سحري",
    heroSubtitle: "مبطن بتقنية السحر لتدفئة مضاعفة ✨",
    subtitle: "ألوان بتفرّح القلب",
    description: "كولونات ناعمة بألوان مبهجة — بتخلي كل يوم شتوي حكاية",
    features: [
      {
        icon: "✨",
        title: "سحر الدفء",
        text: "بطانة سحرية بتحبس الحرارة وتحافظ على دفء بنوتك مهما كان الجو بارد",
        rotate: "-3deg",
        color: "#F0E7FF",
      },
      {
        icon: "🖤",
        title: "أناقة الأسود",
        text: "لون أسود كلاسيكي وشيك بيكمل أي لوك، وسهل يتنسق مع أي هدوم",
        rotate: "2deg",
        color: "#E5F1FF",
      },
      {
        icon: "🌬️",
        title: "خفيف ومريح",
        text: "رغم دفئه، خفيف جداً ومش بيخنق، بتتحرك فيه براحتها طول اليوم",
        rotate: "-2deg",
        color: "#FFE7F1",
      },
      {
        icon: "🧶",
        title: "مرونة عالية",
        text: "بيتمدد مع الحركة وملمسه حريري ناعم على البشرة الحساسة",
        rotate: "3deg",
        color: "#DFF7EA",
      },
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
   ⚡ نظام الصور
   ───────────────────────────────────────────── */
const STEPS = [200, 400, 600, 800, 1200, 1600];
const snap = (w) => STEPS.find((s) => s >= w) || STEPS[STEPS.length - 1];

const IMG = {
  hero: { widths: [400, 600, 800, 1200], sizes: "(max-width:900px) 80vw, 490px", width: 800 },
  stage: { widths: [400, 600, 800, 1200], sizes: "(max-width:900px) 88vw, 490px", width: 800 },
  card: { widths: [200, 400, 600], sizes: "(max-width:700px) 46vw, 280px", width: 400 },
  feature: { widths: [200, 400, 600], sizes: "(max-width:900px) 42vw, 230px", width: 400 },
  material: { widths: [200, 400, 600], sizes: "(max-width:900px) 42vw, 230px", width: 400 },
  lifestyle: { widths: [600, 800, 1200, 1600], sizes: "100vw", width: 1200 },
};

const urlCache = new Map();

const optimizeImage = (url, width = 600) => {
  if (!url) return "";
  const w = snap(width);
  const key = `${url}|${w}`;
  const cached = urlCache.get(key);
  if (cached !== undefined) return cached;

  let out = url;
  if (url.includes("cloudinary.com")) {
    const q = w <= 400 ? "q_auto:eco" : "q_auto";
    out = url.replace("/upload/", `/upload/c_limit,w_${w},${q},f_auto/`);
  } else if (url.includes("images.baby-style-store.com")) {
    out = `${url}${url.includes("?") ? "&" : "?"}w=${w}&q=80&auto=format`;
  }
  urlCache.set(key, out);
  return out;
};

const getLqip = (url) =>
  url && url.includes("cloudinary.com")
    ? url.replace("/upload/", "/upload/c_limit,w_32,q_20,e_blur:200,f_auto/")
    : "";

const responsive = (url, cfg = {}) => {
  const { widths, sizes, width = 600 } = cfg;
  const src = optimizeImage(url, width);
  if (!widths || !src || src === url) return { src: src || undefined };
  return {
    src,
    srcSet: widths.map((w) => `${optimizeImage(url, w)} ${snap(w)}w`).join(", "),
    sizes,
  };
};

const preloaded = new Set();
const preloadImage = (url, cfg) => {
  if (!url || typeof Image === "undefined") return;
  const p = responsive(url, cfg);
  const key = `${p.src}|${p.sizes || ""}`;
  if (!p.src || preloaded.has(key)) return;
  preloaded.add(key);
  const img = new Image();
  img.decoding = "async";
  if (p.srcSet) {
    img.sizes = p.sizes;
    img.srcset = p.srcSet;
  }
  img.src = p.src;
};

const canPrefetch = () => {
  const c = typeof navigator !== "undefined" ? navigator.connection : null;
  if (!c) return true;
  if (c.saveData) return false;
  return !/2g|3g/.test(c.effectiveType || "");
};

const whenIdle = (fn) =>
  typeof requestIdleCallback === "function"
    ? requestIdleCallback(fn, { timeout: 3000 })
    : setTimeout(fn, 1500);

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Lalezar&family=Cairo:wght@400;600;700;900&family=Caveat:wght@500;700&display=swap";

const PRECONNECT = [
  "https://res.cloudinary.com",
  "https://images.baby-style-store.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];

function useWinterHead() {
  useEffect(() => {
    if (document.getElementById("wl-fonts")) return;
    const add = (attrs) => {
      const l = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => l.setAttribute(k, v));
      document.head.appendChild(l);
    };
    PRECONNECT.forEach((href) =>
      add({
        rel: "preconnect",
        href,
        ...(href.includes("gstatic") ? { crossorigin: "" } : {}),
      }),
    );
    add({ id: "wl-fonts", rel: "stylesheet", href: FONTS_HREF });
  }, []);
}

let sharedIO = null;
const revealCallbacks = new WeakMap();

function getIO() {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          revealCallbacks.get(e.target)?.();
          revealCallbacks.delete(e.target);
          sharedIO.unobserve(e.target);
        }
      },
      { threshold: 0.12 },
    );
  }
  return sharedIO;
}

function useReveal(immediate) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const io = getIO();
    if (!io) {
      setVisible(true);
      return;
    }
    revealCallbacks.set(el, () => setVisible(true));
    io.observe(el);
    return () => {
      revealCallbacks.delete(el);
      io.unobserve(el);
    };
  }, [immediate]);

  return [ref, visible];
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  immediate = false,
  style,
  ...rest
}) {
  const [ref, visible] = useReveal(immediate);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const Cloud = memo(function Cloud({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" aria-hidden="true">
      <path d="M15 45 Q5 45 5 33 Q5 22 18 22 Q20 8 35 8 Q50 8 55 20 Q60 12 72 12 Q88 12 90 26 Q102 26 105 38 Q107 45 100 45 Z"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
});
const Star = memo(function Star({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z"
        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
});
const Heart = memo(function Heart({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 34 C20 34 6 25 6 15 C6 9 11 5 16 5 C19 5 20 7 20 9 C20 7 21 5 24 5 C29 5 34 9 34 15 C34 25 20 34 20 34 Z"
        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
});
const Squiggle = memo(function Squiggle({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 20" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 12 Q20 2 40 12 T80 12 T120 12 T160 12 T198 12"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
});

/* ─────────────────────────────────────────────
   ✅ FadeImg — مع fallback لو الصورة فشلت
   failStage: 0 = الرابط المحسّن | 1 = الرابط الأصلي | 2 = فشل نهائي
   ───────────────────────────────────────────── */
const FadeImg = memo(function FadeImg({
  url,
  alt,
  cfg,
  eager = false,
  priority = false,
  ratio = "4/5",
  position = "center",
  onLoaded,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failStage, setFailStage] = useState(0);
  const imgRef = useRef(null);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    onLoaded?.();
  }, [onLoaded]);

  const handleError = useCallback(() => {
    // أول فشل: جرّب الرابط الأصلي من غير تحويلات
    setFailStage((s) => {
      if (s === 0 && url) return 1;
      return 2;
    });
  }, [url]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) handleLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const p = responsive(url, cfg);
  const lqip = failStage === 0 ? getLqip(url) : "";
  const failed = failStage === 2;

  // المرحلة 1: الرابط الأصلي بدون srcSet
  const imgSrc = failStage === 0 ? p.src : url;
  const imgSrcSet = failStage === 0 ? p.srcSet : undefined;
  const imgSizes = failStage === 0 ? p.sizes : undefined;

  return (
    <div
      className="wl-imgbox"
      style={{
        aspectRatio: ratio,
        ...(lqip && !loaded
          ? {
              backgroundImage: `url(${lqip})`,
              backgroundSize: "cover",
              backgroundPosition: position,
            }
          : null),
      }}
    >
      {!loaded && !failed && !lqip && <div className="wl-shimmer" />}

      {failed ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 40,
            color: "var(--ink-soft)",
            background: "#f7f2ee",
          }}
          role="img"
          aria-label={alt}
        >
          🧦
        </div>
      ) : (
        <img
          ref={imgRef}
          key={failStage}
          src={imgSrc}
          srcSet={imgSrcSet}
          sizes={imgSizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          onLoad={handleLoaded}
          onError={handleError}
          style={{ objectPosition: position, opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
});

const ColorPicker = memo(function ColorPicker({
  product,
  title = false,
  animate = false,
  eager = false,
}) {
  const [colorIdx, setColorIdx] = useState(0);
  const current = product.productColors[colorIdx];
  const warmedRef = useRef(false);

  const warmOthers = useCallback(() => {
    if (warmedRef.current || !canPrefetch()) return;
    warmedRef.current = true;
    whenIdle(() => {
      product.productColors.forEach((c) => preloadImage(c.img, IMG.stage));
    });
  }, [product]);

  /* ✅ الصورة الكبيرة بقت بتعرض صورة اللون المختار (مش product.image) */
  const stageUrl = current.img || product.image;

  const stage = (
    <div className="wl-polaroid">
      <span className="wl-tape wl-tape-tl" />
      <span className="wl-tape wl-tape-tr" />
      <FadeImg
        key={stageUrl}
        url={stageUrl}
        alt={`${product.name} - ${current.color}`}
        cfg={IMG.stage}
        eager={eager}
        onLoaded={warmOthers}
      />
      <span className="wl-polaroid-caption">{current.color}</span>
    </div>
  );

  const panel = (
    <>
      <h3 className="wl-panel-title">الدرجات المتوفرة</h3>
      <div className="wl-swatches">
        {product.productColors.map((c, i) => (
          <button
            type="button"
            key={c.color}
            className={`wl-swatch ${i === colorIdx ? "active" : ""}`}
            aria-pressed={i === colorIdx}
            onClick={() => setColorIdx(i)}
            onPointerEnter={() => preloadImage(c.img, IMG.stage)}
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
            type="button"
            key={c.color}
            className={`wl-thumb ${i === colorIdx ? "active" : ""}`}
            aria-pressed={i === colorIdx}
            onClick={() => setColorIdx(i)}
            onPointerEnter={() => preloadImage(c.img, IMG.stage)}
          >
            <img
              src={optimizeImage(c.img, 200)}
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
    </>
  );

  return (
    <div className="wl-product-block">
      {title && (
        <h3 className="wl-panel-title wl-product-title">{product.name}</h3>
      )}
      <div className="wl-colors-grid">
        {animate ? (
          <Reveal className="wl-color-stage" delay={100}>{stage}</Reveal>
        ) : (
          <div className="wl-color-stage">{stage}</div>
        )}
        {animate ? (
          <Reveal className="wl-colors-panel" delay={150}>{panel}</Reveal>
        ) : (
          <div className="wl-colors-panel">{panel}</div>
        )}
      </div>
    </div>
  );
});

const ProductColorCard = memo(function ProductColorCard({ product, onOpen }) {
  const firstImg = product.image;

  return (
    <button
      type="button"
      className="wl-pcard"
      onClick={() => onOpen(product)}
      onPointerEnter={() => preloadImage(firstImg, IMG.stage)}
    >
      <div className="wl-pcard-img">
        <FadeImg
          url={firstImg}
          alt={product.name}
          cfg={IMG.card}
          position="top"
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
});

const ProductColorModal = memo(function ProductColorModal({ product, onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="wl-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="wl-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="wl-modal-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          ✕
        </button>
        <h3 className="wl-modal-title">{product.name}</h3>
        <ColorPicker key={product.id} product={product} eager />
      </div>
    </div>
  );
});

const Hero = memo(function Hero({ heroImg, name, content, categoryLabel, onColors }) {
  const isArray = Array.isArray(heroImg);
  const imgList = isArray ? heroImg : [heroImg];

  return (
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
        <Reveal className="wl-hero-img" delay={150} immediate>
          <div className="wl-polaroid wl-polaroid-hero">
            <span className="wl-tape wl-tape-tl" />
            <span className="wl-tape wl-tape-br" />

            <div style={{ display: 'flex', gap: '10px' }}>
              {imgList.map((img, idx) => (
                <div key={idx} style={{ flex: 1 }}>
                  <FadeImg
                    url={img}
                    alt={name}
                    cfg={IMG.hero}
                    eager
                    priority={idx === 0}
                    position="top"
                  />
                </div>
              ))}
            </div>

            <span className="wl-polaroid-caption">— دفء الشتا ❄️ —</span>
          </div>
          <svg className="wl-arrow" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path d="M8 12 Q40 40 90 78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" fill="none"/>
            <path d="M78 68 L90 78 L80 88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span className="wl-hand-note">جديد ✨</span>
        </Reveal>

        <Reveal className="wl-hero-text" immediate>
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
            {content.subtitle ? content.subtitle : content.heroSubtitle}
            <br />
            {content.description ? content.description : "مريح، كيوت، ومناسب للبيت والخروج 🎀"}
          </p>
          <div className="wl-cta">
            <button type="button" className="wl-btn" onClick={onColors}>
              <span>🎨</span> اختاري اللون
            </button>
            <button type="button" className="wl-btn-ghost" onClick={onColors}>
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
  );
});

const Marquee = memo(function Marquee() {
  return (
    <div className="wl-strip">
      <div className="wl-strip-track">
        {[0, 1].map((k) => (
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
  );
});

const FeaturesSection = memo(function FeaturesSection({ content, img }) {
  const featureImgs = useMemo(() => [].concat(img || []), [img]);

  return (
    <section className="wl-section wl-section-features">
      <Reveal className="wl-head">
        <span className="wl-pill">💭 ليه هي مميزة؟</span>
        <h2>
          حاجات صغيرة <em>تخليها أحلى</em>
        </h2>
        <Squiggle className="wl-squiggle" />
      </Reveal>

      <div className="wl-features-layout">
        <Reveal className="wl-features-img" delay={80}>
          <div className="wl-polaroid wl-polaroid-tilt-left wl-polaroid-collage">
            <span className="wl-tape wl-tape-tl" />
            {featureImgs.map((src, i) => (
              <div className="wl-collage-item" key={`${src}-${i}`}>
                <FadeImg
                  url={src}
                  alt="تفاصيل المنتج"
                  cfg={IMG.feature}
                  ratio={featureImgs.length > 1 ? "3/4" : "4/5"}
                  position="top"
                />
              </div>
            ))}
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
  );
});

/* ✅ تم تحديث ColorsSection لدعم الماجيكل */
const ColorsSection = memo(function ColorsSection({ products, category }) {
  const [openProduct, setOpenProduct] = useState(null);
  const closeModal = useCallback(() => setOpenProduct(null), []);
  const single = products.length === 1;

  // لو الكاتيجوري سحري وفيه أكتر من منتج (ساده وقلوب)
  const isMagicalMultiple = category === "magical" && !single;

  return (
    <>
      <section className="wl-section wl-section-colors" id="wl-colors">
        <Reveal className="wl-head">
          <span className="wl-pill">🎨 الألوان</span>
          <h2>
            {isMagicalMultiple ? (
              <>
                بنتك بتحب <em>الساده</em> ولا <em>القلوب</em> أكتر؟
              </>
            ) : single ? (
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

        {single ? (
          <ColorPicker product={products[0]} title animate />
        ) : isMagicalMultiple ? (
          /* ✨ التصميم الجديد المخصص للماجيكل ✨ */
          <div className="wl-magical-grid">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 80} className="wl-magical-card-wrapper">
                <button
                  type="button"
                  className="wl-magical-card"
                  onClick={() => setOpenProduct(product)}
                  onPointerEnter={() => preloadImage(product.image, IMG.stage)}
                >
                  <div className="wl-magical-img-box">
                    <FadeImg
                      url={product.image}
                      alt={product.name}
                      cfg={IMG.stage}
                      position="center"
                    />
                    <span className="wl-magical-badge">
                      {product.productColors.length} ألوان متاحة
                    </span>
                  </div>
                  <div className="wl-magical-body">
                    <h4 className="wl-magical-title">
                      {product.name.includes("قلوب") ? "موديل القلوب 🖤" : "موديل الساده ✨"}
                    </h4>
                    <span className="wl-magical-cta">
                      اكتشفي الألوان <span>←</span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          /* التصميم العادي لباقي الكاتيجوريز */
          <div className="wl-products-grid">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductColorCard product={product} onOpen={setOpenProduct} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {openProduct && (
        <ProductColorModal product={openProduct} onClose={closeModal} />
      )}
    </>
  );
});

const MaterialSection = memo(function MaterialSection({ category, img1, img2 }) {
  const isFur = category === "fur";
  const isMagical = category === "magical";

  const m1 = responsive(img1, IMG.material);
  const m2 = responsive(img2, IMG.material);

  return (
    <section className="wl-section wl-section-material">
      <div className="wl-split">
        <Reveal className="wl-split-imgs">
          <div className="wl-imgs-duo">
            <div className="wl-polaroid wl-polaroid-tilt">
              <span className="wl-tape wl-tape-tl" />
              <img
                src={m1.src}
                srcSet={m1.srcSet}
                sizes={m1.sizes}
                alt="خامة الكولون 1"
                loading="lazy"
                decoding="async"
                className={IMG_DUO}
              />
            </div>
            <div className="wl-polaroid wl-polaroid-tilt-r">
              <span className="wl-tape wl-tape-tr" />
              <img
                src={m2.src}
                srcSet={m2.srcSet}
                sizes={m2.sizes}
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
            {isMagical
              ? "خامة سحرية بتحبس الحرارة وتدفي من غير ما تثقّل. أسود أنيق وشيك يناسب كل اللوكات."
              : isFur
              ? "فرو ناعم من الداخل + خامة خارجية أنيقة. دفء مضاعف للشتا القارس."
              : "بطانة فوطه دافئة من الداخل + تصميم خطوط أنيقة. توازن مثالي بين الدفء والشكل."}
          </p>
          <ul className="wl-list">
            <li>
              <span className="wl-bullet">1</span>
              {isMagical
                ? "تقنية سحرية لتدفئة مضاعفة ✨"
                : isFur
                ? "فرو ناعم من الداخل ☁️"
                : "بطانة فوطه ناعمة 🧸"}
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
  );
});

const LifestyleSection = memo(function LifestyleSection({ img }) {
  const p = responsive(img, IMG.lifestyle);
  return (
    <section className="wl-lifestyle">
      <img
        src={p.src}
        srcSet={p.srcSet}
        sizes={p.sizes}
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
  );
});

const FaqSection = memo(function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
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
            <button
              type="button"
              aria-expanded={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            >
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
  );
});

const FinalSection = memo(function FinalSection({ onOrder }) {
  return (
    <section className="wl-final">
      <Cloud className="wl-doodle wl-doodle-c3" />
      <Star className="wl-doodle wl-doodle-s4" />
      <Heart className="wl-doodle wl-doodle-h3" />
      <Reveal className="wl-final-inner">
        <span className="wl-pill wl-pill-light">🎀 الشتا أحلى معاها</span>
        <h2>خلّي بنوتك دافية الشتا ده 🌸</h2>
        <button type="button" className="wl-btn wl-btn-light" onClick={onOrder}>
          🛍️ اطلبي دلوقتي
        </button>
      </Reveal>
    </section>
  );
});

function WinterLined() {
  const { category = "lined" } = useParams();
  useWinterHead();

  const products = useMemo(() => {
    const list = winterLined.filter((p) => p.category === category);
    return list.length ? list : [winterLined[0]];
  }, [category]);
  const heroProduct = products[0];

  const IMAGES = CATEGORY_IMAGES[category] || DEFAULT_IMAGES;
  const content = CATEGORY_CONTENT[category] || CATEGORY_CONTENT.lined;
  const categoryLabel = CATEGORY_LABEL[category] || "🧸";

  const [selectedOffer, setSelectedOffer] = useState(null);
  const orderCollectionRef = useRef(null);

  useEffect(() => {
    setSelectedOffer(null);
  }, [category]);

  const scrollToOrderCollection = useCallback(() => {
    orderCollectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollToOffers = useCallback(() => {
    document
      .getElementById("offersSection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToColors = useCallback(() => {
    document
      .getElementById("wl-colors")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="wl" dir="rtl">
      {/* {styleEl} */}

      <Hero
        heroImg={IMAGES.hero}
        name={heroProduct.name}
        content={content}
        categoryLabel={categoryLabel}
        onColors={goToColors}
      />

      <Marquee />

      <FeaturesSection content={content} img={IMAGES.features} />

      <OfferesSec
        setSelectedOffer={setSelectedOffer}
        scrollToOrderCollection={scrollToOrderCollection}
        category={category}
      />

      {/* ✅ تم تمرير category هنا */}
      <ColorsSection key={category} products={products} category={category} />

      <div ref={orderCollectionRef}>
        <LinedOrderCollection
          selectedOffer={selectedOffer}
          scrollToOffers={scrollToOffers}
          category={category}
        />
      </div>

      <MaterialSection
        category={category}
        img1={IMAGES.material1}
        img2={IMAGES.material2}
      />

      <LifestyleSection img={IMAGES.lifestyle} />

      <Suspense fallback={<div style={{ minHeight: 400 }} />}>
        {/* ⚡ عرض جدول المقاسات المخصص لكل كاتيجوري */}
        {category === "magical" ? (
          <MagicalSizeTable />
        ) : category === "lined" ? (
          <PlainLinedSizeTable />
        ) : (
          <SizesSec product={heroProduct} category={category} />
        )}
        <RealLife category={category} />
      </Suspense>

      <FaqSection key={`faq-${category}`} />

      <FinalSection onOrder={goToColors} />
    </div>
  );
}

export default WinterLined;