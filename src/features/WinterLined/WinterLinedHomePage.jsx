import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Truck, ShieldCheck, Star, Percent, Gift,
  Sparkles, Heart, Snowflake, Thermometer,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ————————————————————————————————————————————
// Design tokens — Winter Candy
// خلفية بلون الجليد + حبر كحلي عميق + ألوان فرحانة (مرجاني، أصفر شمس،
// ليلكي، وردي، نعناع). كل قسم له لونه الخاص بدل لون واحد مكرر.
// ————————————————————————————————————————————
const tokens = {
  bg: '#F2F6FC',
  surface: '#FFFFFF',
  ink: '#1F1B3D',
  inkMuted: '#6F6C8F',
  line: '#DFE5F3',
  coral: '#FF6B4A',
  sun: '#FFC53D',
  mint: '#7ADBC0',
  lilac: '#B9A7FF',
  pink: '#FF9FC2',
  sky: '#8EC5FF',
};

// ————————————————————————————————————————————
// الأقسام — غيّري الصور والأعداد بصور ومنتجات الشتاء الحقيقية
// ————————————————————————————————————————————
const categories = [
  {
    id: 'legging',
    title: 'ليجينز',
    subtitle: 'بناطيل مرنة',
    description: 'مريحة وأنيقة، بتتلبس لوحدها أو تحت الجيبة في كل يوم شتوي',
    count: '٢٤ منتج',
    note: 'الأكثر مبيعاً',
    warmth: 3,
    tint: '#E7E0FF',
    accent: '#6C4DFF',
    img: 'https://res.cloudinary.com/cj2kp1ke/image/upload/v1789723445/WhatsApp_Image_2026-07-05_at_10.24.30_AM.jpg',
    path: '/clothes/legging',
  },
  {
    id: 'colon',
    title: 'كولونات مبطنة',
    subtitle: 'تدفئة من جوه',
    description: 'بطانة ناعمة بتحافظ على الدفا من غير ما تتقل على بنوتتك',
    count: '١٨ منتج',
    note: 'دفا زيادة',
    warmth: 5,
    tint: '#FFDDE9',
    accent: '#E8467C',
    img: 'https://res.cloudinary.com/cj2kp1ke/image/upload/v1789721484/WhatsApp_Image_2026-07-03_at_4.58.11_AM.jpg',
    path: '/clothes/colon',
  },
  {
    id: 'turbon',
    title: 'تربونات',
    subtitle: 'شتوي بألوان مبهجة',
    description: 'تربونات ملونة وناعمة، بتخلي الشتا أحلى وأكتر فرحة',
    count: '١٢ منتج',
    note: 'جديد',
    warmth: 4,
    tint: '#FFEFB8',
    accent: '#E8590C',
    img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263333/WhatsApp_Image_2026-07-05_at_5.26.23_AM_2_fmvmxg.jpg',
    path: '/clothes/turbon',
  },
];

const byId = (id) => categories.find((c) => c.id === id);

// توصية حسب الطقس
function recommend(temp) {
  if (temp <= 8)
    return { cat: byId('colon'), text: 'برد جامد؟ الكولون المبطن بيدفّي من جوه', color: tokens.sky };
  if (temp <= 14)
    return { cat: byId('legging'), text: 'جو متوسط؟ ليجينز مع جاكيت خفيف وخلاص', color: tokens.lilac };
  return { cat: byId('turbon'), text: 'جو لطيف؟ تربون ملون يكفي وزيادة', color: tokens.sun };
}

const marqueeItems = [
  'شتا دافي', 'ألوان فرحانة', 'بطانة ناعمة', 'ليجينز', 'كولونات مبطنة',
  'تربونات', 'هدية مع كل طلب', 'خصم للكميات',
];

const snowflakes = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 4 + ((i * 5) % 7),
  duration: 9 + ((i * 3) % 9),
  delay: (i * 0.7) % 8,
  drift: ((i % 2 === 0 ? 1 : -1) * (10 + ((i * 7) % 30))),
}));

function WarmthMeter({ level, color }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: '9px', height: '9px', borderRadius: '50%',
            backgroundColor: n <= level ? color : 'transparent',
            border: `1.5px solid ${color}`,
          }}
        />
      ))}
    </span>
  );
}

function WinterLinedHomePage() {
  const navigate = useNavigate();
  const [temp, setTemp] = useState(10);
  const rec = recommend(temp);

  const goTo = (path) => navigate(path);

  return (
    <div
      style={{
        backgroundColor: tokens.bg,
        color: tokens.ink,
        minHeight: '100vh',
        fontFamily: "'Tajawal', sans-serif",
        direction: 'rtl',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700&family=Tajawal:wght@400;500;700&display=swap');
        .fw-display { font-family: 'Baloo Bhaijaan 2', 'Tajawal', sans-serif; }

        .fw-card { transition: transform .3s ease, box-shadow .3s ease; }
        .fw-card:hover { transform: translateY(-8px) rotate(-.6deg); box-shadow: 0 22px 40px -20px rgba(31,27,61,.35); }
        .fw-card:hover .fw-img { transform: scale(1.05); }
        .fw-img { transition: transform .5s ease; }
        .fw-card:hover .fw-arrow { transform: translate(-3px,-3px); }
        .fw-arrow { transition: transform .25s ease; }

        .fw-btn { transition: transform .2s ease, box-shadow .2s ease; }
        .fw-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -10px rgba(255,107,74,.55); }

        /* شريط متحرك */
        @keyframes fw-marquee { from { transform: translateX(0); } to { transform: translateX(50%); } }
        .fw-track { display: flex; width: max-content; animation: fw-marquee 28s linear infinite; }

        /* سلايدر الحرارة */
        .fw-range { -webkit-appearance: none; appearance: none; width: 100%; height: 10px; border-radius: 999px;
          background: linear-gradient(to left, ${tokens.sun}, ${tokens.lilac} 55%, ${tokens.sky}); outline: none; direction: ltr; }
        .fw-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 28px; height: 28px; border-radius: 50%;
          background: #fff; border: 4px solid ${tokens.ink}; cursor: grab; box-shadow: 0 4px 10px rgba(31,27,61,.3); }
        .fw-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #fff; border: 4px solid ${tokens.ink}; cursor: grab; }

        /* حافة مسننة زي حافة الكروشيه */
        .fw-scallop {
          height: 14px;
          background: radial-gradient(circle at 10px 14px, ${tokens.bg} 9px, transparent 10px) repeat-x;
          background-size: 20px 14px;
        }

        @media (max-width: 760px) {
          .fw-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .fw-collage { height: 320px !important; order: -1; }
          .fw-picker { grid-template-columns: 1fr !important; }
          .fw-promo { grid-template-columns: 1fr !important; }
          .fw-promo-img { min-height: 220px !important; order: -1; }
          .fw-promo-content { padding: 32px 24px !important; }
        }
      `}</style>

      {/* ───────── HERO ───────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* ثلج متساقط */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {snowflakes.map((s, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, x: 0, opacity: 0 }}
              animate={{ y: ['0%', '105vh'], x: [0, s.drift], opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', top: 0, left: s.left,
                width: s.size, height: s.size, borderRadius: '50%',
                backgroundColor: '#fff', boxShadow: '0 0 6px rgba(142,197,255,.9)',
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '40px 20px 56px' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}
          >
            <span style={{ width: '26px', height: '2px', backgroundColor: tokens.coral, borderRadius: '2px' }} />
            <span style={{ fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, color: tokens.coral }}>
              تشكيلة شتا ٢٠٢٦ — بناتي
            </span>
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ marginRight: 'auto', display: 'inline-flex' }}
            >
              <Snowflake size={16} color={tokens.sky} />
            </motion.span>
          </motion.div>

          <div
            className="fw-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 1fr) minmax(260px, 420px)',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* النص */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h1
                className="fw-display"
                style={{ fontSize: 'clamp(2.2rem, 5.6vw, 3.9rem)', fontWeight: 700, lineHeight: 1.15, margin: '0 0 16px' }}
              >
                الشتا جاي
                <br />
                <span
                  style={{
                    display: 'inline-block', color: tokens.ink, padding: '0 14px',
                    background: `linear-gradient(transparent 58%, ${tokens.sun} 58%)`,
                  }}
                >
                  بألوان فرحانة
                </span>
              </h1>
              <p style={{ maxWidth: '420px', color: tokens.inkMuted, fontSize: '15px', lineHeight: 1.9, margin: '0 0 28px' }}>
                ليجينز · كولونات مبطنة · تربونات — دفا وألوان مبهجة لبناتك الصغار، من غير ما الشتا يبقى كئيب.
              </p>
              <button
                className="fw-btn"
                onClick={() => goTo(categories[0].path)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: tokens.coral, color: '#fff', border: 'none',
                  padding: '14px 28px', borderRadius: '999px', fontSize: '14px',
                  fontWeight: 700, cursor: 'pointer', marginBottom: '32px',
                }}
              >
                اكتشفي تشكيلة الشتا
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </button>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { icon: Star, label: '٥٤+ قطعة متوفرة', bg: '#FFF0C2' },
                  { icon: Truck, label: 'شحن خلال 5 ايام', bg: '#DDF6EE' },
                  { icon: ShieldCheck, label: 'توصيل آمن', bg: '#E7E0FF' },
                ].map((stat, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '9px',
                      backgroundColor: tokens.surface, border: `1px solid ${tokens.line}`,
                      borderRadius: '999px', padding: '7px 16px 7px 7px',
                      fontSize: '12.5px', fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '28px', height: '28px', borderRadius: '50%', backgroundColor: stat.bg,
                      }}
                    >
                      <stat.icon size={14} strokeWidth={2.2} color={tokens.ink} />
                    </span>
                    {stat.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* كولاج بإطارات قوسية (شبابيك) */}
            <motion.div
              className="fw-collage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ position: 'relative', height: '400px' }}
            >
              {/* شمس شتوية */}
              <div
                style={{
                  position: 'absolute', top: '6%', insetInlineEnd: '2%', width: '150px', height: '150px',
                  borderRadius: '50%', backgroundColor: tokens.sun,
                }}
              />
              {/* حلقة غرز دوّارة */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '2%', borderRadius: '50%',
                  border: `2px dashed ${tokens.coral}`, opacity: 0.55,
                }}
              />
              <div
                style={{
                  position: 'absolute', top: 0, insetInlineStart: '2%', width: '56%', height: '88%',
                  borderRadius: '999px 999px 22px 22px', overflow: 'hidden', border: `6px solid ${tokens.surface}`,
                  backgroundColor: '#FFDDE9', boxShadow: '0 24px 40px -18px rgba(31,27,61,.4)', zIndex: 2,
                  transform: 'rotate(-3deg)',
                }}
              >
                <img src={categories[1].img} alt={categories[1].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
              <div
                style={{
                  position: 'absolute', bottom: 0, insetInlineEnd: '2%', width: '50%', height: '70%',
                  borderRadius: '999px 999px 22px 22px', overflow: 'hidden', border: `6px solid ${tokens.surface}`,
                  boxShadow: '0 24px 40px -18px rgba(31,27,61,.4)', zIndex: 3,
                  transform: 'rotate(4deg)',
                }}
              >
                <img src={categories[2].img} alt={categories[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
              {/* ستيكر */}
              <motion.span
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: '8%', insetInlineStart: '0', zIndex: 4,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  backgroundColor: tokens.ink, color: '#fff', borderRadius: '14px',
                  padding: '9px 14px', fontSize: '12px', fontWeight: 700,
                  boxShadow: '0 10px 20px -8px rgba(31,27,61,.5)',
                }}
              >
                <Snowflake size={14} color={tokens.sky} />
                دفا لحد ٥ درجات
              </motion.span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── شريط متحرك ───────── */}
      <div style={{ backgroundColor: tokens.ink, color: '#fff', overflow: 'hidden', transform: 'rotate(-1deg)', margin: '0 -10px' }}>
        <div className="fw-track" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span
              key={i}
              className="fw-display"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', padding: '13px 18px', fontSize: '16px', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              {t}
              <Snowflake size={15} color={[tokens.sun, tokens.pink, tokens.mint, tokens.sky][i % 4]} />
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '56px 20px 60px' }}>
        {/* ───────── اختاري حسب الطقس ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="fw-picker"
          style={{
            display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '28px',
            backgroundColor: tokens.surface, border: `1px solid ${tokens.line}`,
            borderRadius: '26px', padding: '30px', alignItems: 'center',
            boxShadow: '0 10px 30px -18px rgba(31,27,61,.2)',
          }}
        >
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: tokens.coral, marginBottom: '10px' }}>
              <Thermometer size={14} /> مش عارفة تلبسيها إيه؟
            </span>
            <h2 className="fw-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '0 0 18px', lineHeight: 1.3 }}>
              حركي السلايدر على درجة حرارة النهاردة
            </h2>
            <input
              className="fw-range"
              type="range"
              min={3}
              max={22}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              aria-label="درجة الحرارة"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: tokens.inkMuted, marginTop: '10px', fontWeight: 600 }}>
              <span>٣° برد</span>
              <span>٢٢° دافي</span>
            </div>
          </div>

          <motion.div
            key={rec.cat.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: rec.cat.tint, borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                className="fw-display"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '64px', height: '64px', borderRadius: '50%', backgroundColor: rec.color,
                  fontSize: '24px', fontWeight: 700, color: tokens.ink,
                }}
              >
                {temp}°
              </span>
              <div>
                <div className="fw-display" style={{ fontSize: '20px', fontWeight: 700 }}>{rec.cat.title}</div>
                <div style={{ fontSize: '12.5px', color: tokens.inkMuted }}>{rec.text}</div>
              </div>
            </div>
            <button
              className="fw-btn"
              onClick={() => goTo(rec.cat.path)}
              style={{
                alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: tokens.ink, color: '#fff', border: 'none',
                padding: '10px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              }}
            >
              شوفي {rec.cat.title}
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        </motion.div>

        {/* ───────── الأقسام ───────── */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '26px', marginTop: '48px',
          }}
        >
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="fw-card"
              onClick={() => goTo(c.path)}
              style={{
                backgroundColor: c.tint, borderRadius: '26px', padding: '14px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* صورة بقوس */}
              <div
                style={{
                  position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden',
                  borderRadius: '999px 999px 16px 16px', backgroundColor: '#fff',
                }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="fw-img"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                />
                <span
                  style={{
                    position: 'absolute', bottom: '12px', insetInlineStart: '12px',
                    fontSize: '11px', fontWeight: 700, color: '#fff', backgroundColor: c.accent,
                    padding: '5px 12px', borderRadius: '999px',
                  }}
                >
                  {c.note}
                </span>
              </div>

              <div style={{ padding: '18px 8px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                  <h2 className="fw-display" style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>{c.title}</h2>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: c.accent }}>{c.count}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: tokens.inkMuted, margin: '2px 0 10px', fontWeight: 600 }}>{c.subtitle}</p>
                <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: tokens.ink, opacity: 0.8, margin: '0 0 16px', flex: 1 }}>
                  {c.description}
                </p>

                {/* مقياس الدفا */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>مقياس الدفا</span>
                  <WarmthMeter level={c.warmth} color={c.accent} />
                </div>

                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '14px', borderTop: `1.5px dashed ${c.accent}66`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>تسوقي {c.title}</span>
                  <span
                    className="fw-arrow"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '30px', height: '30px', borderRadius: '50%', backgroundColor: c.accent,
                    }}
                  >
                    <ArrowUpRight size={16} strokeWidth={2.2} color="#fff" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ───────── البانر الترويجي (وشاح مقلّم) ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="fw-promo"
          style={{
            marginTop: '64px', backgroundColor: tokens.ink, borderRadius: '26px', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(220px, 340px)',
          }}
        >
          <div style={{ gridColumn: '1 / -1', height: '14px',
            background: `repeating-linear-gradient(90deg, ${tokens.coral} 0 28px, ${tokens.sun} 28px 56px, ${tokens.mint} 56px 84px, ${tokens.lilac} 84px 112px, ${tokens.pink} 112px 140px)` }} />

          <div className="fw-promo-content" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content',
                backgroundColor: tokens.sun, color: tokens.ink, fontSize: '11.5px', fontWeight: 700,
                padding: '6px 14px', borderRadius: '999px', marginBottom: '16px',
              }}
            >
              <Gift size={13} strokeWidth={2.5} />
              هدية مع كل طلب
            </motion.span>

            <h3 className="fw-display" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 700, lineHeight: 1.3, margin: '0 0 12px' }}>
              <Heart size={26} color={tokens.pink} fill={tokens.pink} style={{ display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle' }} />
              لفّي بنوتتك في الدفا والفرحة
            </h3>
            <p style={{ color: '#C9C6E6', fontSize: '14px', lineHeight: 1.8, margin: '0 0 6px', maxWidth: '360px' }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>خصم خاص للكميات</span> — تشكيلة شتوية من أجمل الملابس لبناتك الصغار
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginTop: '22px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
              {[
                { icon: Truck, label: 'توصيل سريع' },
                { icon: ShieldCheck, label: 'ضمان الجودة' },
                { icon: Percent, label: 'خصم علي الكميات' },
              ].map((f, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C9C6E6', fontSize: '12px' }}>
                  <f.icon size={14} color={tokens.mint} />
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          <div className="fw-promo-img" style={{ position: 'relative', minHeight: '240px' }}>
            <img src={categories[2].img} alt={categories[2].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, transparent 30%, ${tokens.ink} 100%)` }} />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute', top: '22px', left: '22px', zIndex: 2,
                backgroundColor: tokens.coral, color: '#fff', padding: '8px 16px', borderRadius: '14px',
                fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 6px 20px rgba(255,107,74,.45)',
              }}
            >
              <Sparkles size={14} />
              عرض حصري
            </motion.div>
          </div>
        </motion.div>

        {/* ───────── Footer ───────── */}
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: tokens.inkMuted }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Snowflake size={12} color={tokens.sky} />
            <span>© ٢٠٢٦ تشكيلة بنات</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: tokens.coral }} />
            <span>صنع بحب ♡</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WinterLinedHomePage;