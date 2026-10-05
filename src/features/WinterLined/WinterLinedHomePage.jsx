import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Truck, ShieldCheck, Star, Percent, Gift,
  Sparkles, Heart, Snowflake, Thermometer, Crown, ShoppingBag, Candy,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ————————————————————————————————————————————
// Design tokens — "Velvet Winter Dream"
// ————————————————————————————————————————————
const tokens = {
  bg: '#FBF6FF',
  surface: '#FFFFFF',
  ink: '#3D2A5F',
  inkMuted: '#8B7BA8',
  line: '#EDE0F5',
  bubblegum: '#FF7BB5',
  bubblegumDeep: '#E04A8F',
  lavender: '#C4A8FF',
  lavenderDeep: '#9B7BE8',
  mint: '#7DE8C1',
  mintDeep: '#3FC79A',
  lemon: '#FFE066',
  lemonDeep: '#F5B800',
  sky: '#A8D8FF',
  skyDeep: '#5BA8E8',
  peach: '#FFB088',
  peachDeep: '#FF8752',
  cream: '#FFF9E8',
  ice: '#E8F4FF',
  silver: '#E8ECF5',
  silverDeep: '#C7D0E0',
};

const categories = [
  {
    id: 'legging',
    title: 'ليجينز',
    subtitle: 'مرن ومريح زي الحرير',
    description: 'قصة مريحة بتخلي بنوتتك تلعب وتجري من غير ما تحس بأي ضيق',
    count: '٢٤',
    countLabel: 'منتج',
    note: 'الأكثر مبيعاً',
    warmth: 3,
    tint: '#EDE4FF',
    accent: '#9B7BE8',
    accentLight: '#F5EEFF',
    emoji: '🎀',
    img: 'https://res.cloudinary.com/sauyrrk8/image/upload/v1791203164/WhatsApp_Image_2026-10-02_at_9.57.42_AM.jpg',
    path: '/clothes/legging',
  },
  {
    id: 'colon',
    title: 'كولونات مبطنة',
    subtitle: 'دفا ناعم من جوه',
    description: 'بطانة قطنية بتدفّي من غير ما تتقل — مثالية لأبرد أيام الشتا',
    count: '١٨',
    countLabel: 'منتج',
    note: 'دفا زيادة',
    warmth: 5,
    tint: '#FFE0EC',
    accent: '#E04A8F',
    accentLight: '#FFF0F7',
    emoji: '🧸',
    img: 'https://res.cloudinary.com/sauyrrk8/image/upload/v1791203068/WhatsApp_Image_2026-10-02_at_10.00.47_AM.jpg',
    path: '/clothes/colon',
  },
  {
    id: 'turbon',
    title: 'تربونات',
    subtitle: 'ألوان بتفرّح القلب',
    description: 'تربونات ناعمة بألوان مبهجة — بتخلي كل يوم شتوي حكاية',
    count: '١٢',
    countLabel: 'منتج',
    note: 'جديد',
    warmth: 4,
    tint: '#FFF3C4',
    accent: '#F5B800',
    accentLight: '#FFFAE0',
    emoji: '☃️',
    img: 'https://res.cloudinary.com/sauyrrk8/image/upload/v1791202985/WhatsApp_Image_2026-10-02_at_10.03.17_AM.jpg',
    path: '/clothes/turbon',
  },
];

const byId = (id) => categories.find((c) => c.id === id);

function recommend(temp) {
  if (temp <= 8)
    return { cat: byId('colon'), text: 'برد قارص؟ الكولون المبطن صديقك', color: tokens.sky, emoji: '❄️' };
  if (temp <= 14)
    return { cat: byId('legging'), text: 'جو متوسط؟ ليجينز مع بلوفر دافي', color: tokens.lavender, emoji: '🌸' };
  return { cat: byId('turbon'), text: 'جو لطيف؟ تربون ملون يكمل الإطلالة', color: tokens.lemon, emoji: '☀️' };
}

const marqueeItems = [
  'شتا دافي', 'ألوان فرحانة', 'بطانة ناعمة', '🎀 ليجينز',
  '🧸 كولونات مبطنة', '☃️ تربونات', '🎁 اطلبي الان', '💝 خصم للكميات',
];

// ───────── كرات ثلج فضية متساقطة ─────────
const snowBalls = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 31) % 100}%`,
  size: 5 + ((i * 5) % 9),
  duration: 10 + ((i * 3) % 12),
  delay: (i * 0.5) % 10,
  drift: (i % 2 === 0 ? 1 : -1) * (15 + ((i * 7) % 45)),
  opacity: 0.6 + ((i * 13) % 40) / 100,
}));

function WarmthMeter({ level, color }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.span
          key={n}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: n * 0.06, type: 'spring', stiffness: 400 }}
          style={{
            width: '9px', height: '9px', borderRadius: '50%',
            backgroundColor: n <= level ? color : 'transparent',
            border: `2px solid ${color}`,
            boxShadow: n <= level ? `0 0 8px ${color}88` : 'none',
          }}
        />
      ))}
    </span>
  );
}

// ───────── كارت قسم ─────────
function CategoryCard({ category: c, index }) {
  const navigate = useNavigate();
  const goTo = () => navigate(c.path);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onClick={goTo}
      className="fw-velvet-card"
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '36px',
        background: `linear-gradient(160deg, ${c.tint}, ${c.accentLight})`,
        padding: '24px 24px 26px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: `0 20px 50px -22px ${c.accent}66, 0 4px 16px -8px rgba(61,42,95,.1), inset 0 2px 0 rgba(255,255,255,.9), inset 0 -3px 12px ${c.accent}22`,
      }}
    >
      {/* طبقة مخملية */}
      <div
        className="fw-velvet-texture"
        style={{
          position: 'absolute', inset: 0, borderRadius: '36px',
          pointerEvents: 'none', opacity: 0.7,
        }}
      />

      {/* هالة */}
      <div style={{
        position: 'absolute', top: '-30%', insetInlineEnd: '-20%',
        width: '220px', height: '220px', borderRadius: '50%',
        background: `radial-gradient(circle, ${c.accent}33, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* إيموجي عائم */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '32px', insetInlineEnd: '28px', zIndex: 4,
          width: '52px', height: '52px', borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px',
          boxShadow: `0 10px 24px -6px ${c.accent}88, 0 0 0 4px ${c.accentLight}`,
        }}
      >
        {c.emoji}
      </motion.div>

      {/* الصورة */}
      <div
        className="fw-velvet-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.15',
          overflow: 'hidden',
          borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
          backgroundColor: '#fff',
          border: `5px solid #fff`,
          boxShadow: `0 12px 28px -12px ${c.accent}55, 0 0 0 1px ${c.accent}22`,
          zIndex: 1,
        }}
      >
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="fw-velvet-img"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${c.accent}55 0%, transparent 40%)`,
          pointerEvents: 'none',
        }} />

        <motion.span
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '16px', insetInlineStart: '16px',
            fontSize: '11.5px', fontWeight: 800, color: '#fff',
            background: `linear-gradient(135deg, ${c.accent}, ${c.accent}dd)`,
            padding: '6px 14px', borderRadius: '999px',
            boxShadow: `0 8px 18px -6px ${c.accent}cc`,
            border: '2px solid #fff',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
          }}
        >
          <Sparkles size={12} fill="#fff" />
          {c.note}
        </motion.span>
      </div>

      {/* المحتوى */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '22px' }}>
        <div style={{
          height: '3px', width: '48px', borderRadius: '2px',
          background: `linear-gradient(90deg, ${c.accent}, transparent)`,
          marginBottom: '14px',
        }} />

        <h3 className="fw-display" style={{
          fontSize: '26px', fontWeight: 800, margin: '0 0 6px',
          color: tokens.ink, lineHeight: 1.2,
        }}>
          {c.title}
        </h3>

        <p style={{
          fontSize: '13px', color: c.accent, margin: '0 0 12px',
          fontWeight: 700,
        }}>
          {c.subtitle}
        </p>

        <p style={{
          fontSize: '13.5px', lineHeight: 1.75,
          color: tokens.ink, opacity: 0.78,
          margin: '0 0 20px',
        }}>
          {c.description}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: 'rgba(255,255,255,.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '18px',
          border: `1.5px solid #fff`,
          boxShadow: 'inset 0 1px 0 #fff, 0 4px 12px -6px rgba(61,42,95,.15)',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <span className="fw-display" style={{
              fontSize: '24px', fontWeight: 800, color: c.accent,
              lineHeight: 1,
            }}>
              {c.count}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: tokens.inkMuted }}>
              {c.countLabel}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: tokens.inkMuted }}>دفا</span>
            <WarmthMeter level={c.warmth} color={c.accent} />
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '13.5px', fontWeight: 800, color: tokens.ink }}>
            تسوقي الآن
          </span>
          <motion.span
            whileHover={{ scale: 1.15, rotate: -8 }}
            className="fw-velvet-arrow"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)`,
              boxShadow: `0 10px 20px -6px ${c.accent}aa, inset 0 1px 0 rgba(255,255,255,.5)`,
              border: '2px solid #fff',
            }}
          >
            <ArrowUpRight size={18} strokeWidth={2.6} color="#fff" />
          </motion.span>
        </div>
      </div>
    </motion.div>
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
        backgroundImage: `
          radial-gradient(circle at 10% 5%, ${tokens.bubblegum}18 0%, transparent 35%),
          radial-gradient(circle at 90% 20%, ${tokens.lavender}18 0%, transparent 35%),
          radial-gradient(circle at 50% 95%, ${tokens.mint}12 0%, transparent 40%),
          radial-gradient(circle at 5% 60%, ${tokens.sky}12 0%, transparent 30%)
        `,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap');
        .fw-display { font-family: 'Baloo Bhaijaan 2', 'Tajawal', sans-serif; }

        /* ─── إحساس القطيفة (Fuzzy/Felt) — نقاط ناعمة عشوائية ─── */
        .fw-velvet-page {
          position: relative;
        }
        .fw-velvet-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image:
            radial-gradient(circle at 25% 35%, rgba(255,255,255,.5) 0%, rgba(255,255,255,.15) 0.8%, transparent 1.6%),
            radial-gradient(circle at 65% 55%, rgba(255,255,255,.45) 0%, rgba(255,255,255,.12) 0.7%, transparent 1.5%),
            radial-gradient(circle at 15% 75%, rgba(255,255,255,.4) 0%, rgba(255,255,255,.1) 0.7%, transparent 1.4%),
            radial-gradient(circle at 85% 25%, rgba(255,255,255,.5) 0%, rgba(255,255,255,.15) 0.8%, transparent 1.6%),
            radial-gradient(circle at 45% 85%, rgba(255,255,255,.4) 0%, rgba(255,255,255,.1) 0.6%, transparent 1.3%),
            radial-gradient(circle at 75% 15%, rgba(255,255,255,.45) 0%, rgba(255,255,255,.12) 0.7%, transparent 1.5%),
            radial-gradient(circle at 35% 25%, rgba(255,255,255,.35) 0%, rgba(255,255,255,.08) 0.5%, transparent 1.2%),
            radial-gradient(circle at 55% 45%, rgba(255,255,255,.4) 0%, rgba(255,255,255,.1) 0.6%, transparent 1.3%);
          background-size: 90px 90px, 110px 110px, 100px 100px, 120px 120px, 95px 95px, 105px 105px, 85px 85px, 115px 115px;
          background-position: 0 0, 30px 30px, 60px 10px, 20px 70px, 80px 50px, 45px 90px, 10px 40px, 70px 80px;
          opacity: 0.75;
        }

        /* طبقة زغب ناعمة إضافية — بدون خطوط */
        .fw-velvet-page::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            radial-gradient(ellipse 3px 2px at 12% 18%, rgba(255,255,255,.5), transparent 60%),
            radial-gradient(ellipse 2px 3px at 28% 42%, rgba(255,255,255,.45), transparent 60%),
            radial-gradient(ellipse 3px 2px at 47% 22%, rgba(255,255,255,.5), transparent 60%),
            radial-gradient(ellipse 2px 2px at 68% 58%, rgba(255,255,255,.4), transparent 60%),
            radial-gradient(ellipse 3px 3px at 82% 32%, rgba(255,255,255,.45), transparent 60%),
            radial-gradient(ellipse 2px 3px at 22% 78%, rgba(255,255,255,.4), transparent 60%),
            radial-gradient(ellipse 3px 2px at 58% 88%, rgba(255,255,255,.45), transparent 60%),
            radial-gradient(ellipse 2px 2px at 88% 72%, rgba(255,255,255,.4), transparent 60%);
          background-size: 220px 220px, 190px 190px, 240px 240px, 200px 200px, 230px 230px, 210px 210px, 250px 250px, 195px 195px;
          background-position: 0 0, 40px 40px, 80px 20px, 30px 80px, 100px 60px, 60px 120px, 20px 60px, 90px 100px;
          opacity: 0.6;
          mix-blend-mode: soft-light;
        }

        .fw-velvet-texture {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,.6) 0%, rgba(255,255,255,.2) 3%, transparent 8%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,.5) 0%, rgba(255,255,255,.15) 2.5%, transparent 7%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,.45) 0%, rgba(255,255,255,.12) 2%, transparent 6%),
            radial-gradient(circle at 85% 20%, rgba(255,255,255,.55) 0%, rgba(255,255,255,.18) 3%, transparent 7.5%);
          mix-blend-mode: overlay;
        }

        /* ─── كارت مخملي ─── */
        .fw-velvet-card {
          transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease;
        }
        .fw-velvet-card:hover {
          transform: translateY(-12px) rotate(-.6deg);
          box-shadow: 0 30px 60px -22px rgba(61,42,95,.35), 0 8px 24px -12px rgba(61,42,95,.2), inset 0 2px 0 rgba(255,255,255,.95), inset 0 -3px 16px rgba(0,0,0,.05);
        }
        .fw-velvet-card:hover .fw-velvet-img {
          transform: scale(1.06);
        }
        .fw-velvet-img {
          transition: transform .7s cubic-bezier(.34,1.56,.64,1);
        }

        .fw-btn { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease; }
        .fw-btn:hover { transform: translateY(-3px) scale(1.03); }
        .fw-btn:active { transform: translateY(0) scale(.98); }

        @keyframes fw-marquee { from { transform: translateX(0); } to { transform: translateX(50%); } }
        .fw-track { display: flex; width: max-content; animation: fw-marquee 32s linear infinite; }

        .fw-range { -webkit-appearance: none; appearance: none; width: 100%; height: 14px; border-radius: 999px;
          background: linear-gradient(to left, ${tokens.sky}, ${tokens.lavender} 35%, ${tokens.lemon} 65%, ${tokens.peach});
          outline: none; direction: ltr; border: 2px solid #fff;
          box-shadow: inset 0 2px 6px rgba(61,42,95,.15), 0 4px 14px rgba(61,42,95,.1); }
        .fw-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 32px; height: 32px; border-radius: 50%;
          background: #fff; border: 4px solid ${tokens.bubblegum}; cursor: grab;
          box-shadow: 0 6px 16px rgba(255,123,181,.5);
          background-image: radial-gradient(circle, ${tokens.bubblegum} 40%, #fff 45%); }
        .fw-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .fw-range::-moz-range-thumb { width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 4px solid ${tokens.bubblegum}; cursor: grab; }

        .fw-stripe-bg {
          background-image: repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,.35) 10px, rgba(255,255,255,.35) 20px);
        }

        @media (max-width: 760px) {
          .fw-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .fw-collage { height: 340px !important; }
          .fw-picker { grid-template-columns: 1fr !important; }
          .fw-promo { grid-template-columns: 1fr !important; }
          .fw-promo-img { min-height: 220px !important; }
          .fw-promo-content { padding: 28px 22px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fw-track { animation: none; }
          .fw-velvet-card:hover { transform: none; }
        }
      `}</style>

      {/* ───────── كرات ثلج فضية متساقطة ───────── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
        {snowBalls.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: -30, x: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              x: [0, s.drift, 0],
              opacity: [0, s.opacity, s.opacity, 0],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #FFFFFF, ${tokens.silver} 45%, ${tokens.silverDeep} 100%)`,
              boxShadow: `0 0 ${s.size}px rgba(232,236,245,.9), 0 0 ${s.size * 2}px rgba(199,208,224,.6), inset -1px -1px 2px rgba(199,208,224,.7), inset 1px 1px 2px rgba(255,255,255,.9)`,
            }}
          />
        ))}
      </div>

      {/* المحتوى الرئيسي */}
      <div className="fw-velvet-page" style={{ position: 'relative', zIndex: 2 }}>

       {/* ───────── HERO ───────── */}
<section className="relative overflow-hidden">
  <div className="relative z-[1] max-w-[1180px] mx-auto px-5 pt-12 pb-14">

    {/* صف العنوان */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2.5 mb-[22px]"
    >
      <span className="w-7 h-[3px] rounded-sm" style={{ backgroundColor: tokens.bubblegum }} />
      <span className="text-[12.5px] tracking-[0.16em] font-extrabold" style={{ color: tokens.bubblegumDeep }}>
        تشكيلة شتا ٢٠٢٦ — للبنوتات
      </span>
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="mr-auto inline-flex"
      >
        <Sparkles size={18} color={tokens.lemonDeep} />
      </motion.span>
    </motion.div>

    {/* ─── الشبكة: موبايل = عمود واحد بترتيب مخصص | ديسكتوب = عمودين + شريط تحت ─── */}
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-12 md:items-center">

      {/* ── الكلام ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="order-3 md:order-none"
      >
        <h1
          className="fw-display text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.15] mb-[18px] m-0"
          style={{ color: tokens.ink }}
        >
          الشتا جاي
          <br />
          <span
            className="inline-block px-4 -rotate-1"
            style={{
              color: tokens.ink,
              background: `linear-gradient(transparent 55%, ${tokens.lemon} 55%, ${tokens.lemon} 88%, transparent 88%)`,
            }}
          >
            بألوان فرحانة ✨
          </span>
        </h1>
        <p
          className="max-w-[440px] text-[15.5px] leading-[1.9] mb-[30px] m-0"
          style={{ color: tokens.inkMuted }}
        >
          ليجينز · كولونات مبطنة · تربونات — دفا ناعم وألوان بتفرّح قلب بنوتتك، عشان الشتا يبقى أحلى فصل في السنة 🌸
        </p>
        <button
          onClick={() => goTo(categories[0].path)}
          className="fw-btn inline-flex items-center gap-2.5 text-white border-0 px-8 py-[15px] rounded-full text-[15px] font-extrabold cursor-pointer mb-8 font-[inherit]"
          style={{
            background: `linear-gradient(135deg, ${tokens.bubblegum}, ${tokens.bubblegumDeep})`,
            boxShadow: `0 12px 32px -8px ${tokens.bubblegum}88, inset 0 1px 0 rgba(255,255,255,.4)`,
          }}
        >
          اكتشفي تشكيلة الشتا
          <ArrowUpRight size={17} strokeWidth={2.4} />
        </button>

        <div className="flex gap-2.5 flex-wrap">
          {[
            { icon: Star, label: '٥٤+ قطعة', bg: tokens.lemon, color: tokens.lemonDeep },
            { icon: Truck, label: 'شحن سريع', bg: tokens.mint, color: tokens.mintDeep },
            { icon: ShieldCheck, label: 'توصيل آمن', bg: tokens.lavender, color: tokens.lavenderDeep },
          ].map((stat, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08, rotate: -3 }}
              className="flex items-center gap-2.5 rounded-full py-[7px] pr-[7px] pl-4 text-[12.5px] font-bold"
              style={{
                backgroundColor: tokens.surface,
                border: `2px solid ${tokens.line}`,
                boxShadow: '0 4px 12px rgba(61,42,95,.06), inset 0 1px 0 #fff',
              }}
            >
              <span
                className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon
                  size={15}
                  strokeWidth={2.4}
                  color={stat.color}
                  fill={stat.icon === Star ? stat.color : 'none'}
                />
              </span>
              {stat.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── الصور ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative h-[340px] md:h-[460px] order-1 md:order-none"
      >
        <div
          className="absolute rounded-full"
          style={{
            top: '4%', insetInlineEnd: '4%',
            width: '160px', height: '160px',
            background: `radial-gradient(circle at 30% 30%, ${tokens.lemon}, ${tokens.peach})`,
            boxShadow: `0 20px 60px -20px ${tokens.peach}88`,
          }}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-40"
          style={{ borderColor: tokens.bubblegum }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[12%] rounded-full border-2 border-dashed opacity-30"
          style={{ borderColor: tokens.lavenderDeep }}
        />

        <div
          className="absolute overflow-hidden z-[2]"
          style={{
            top: '6%', insetInlineStart: '4%',
            width: '54%', height: '84%',
            borderRadius: '999px 999px 28px 28px',
            border: `7px solid ${tokens.surface}`,
            backgroundColor: '#FFDDE9',
            boxShadow: '0 30px 50px -22px rgba(61,42,95,.45), inset 0 2px 0 #fff',
            transform: 'rotate(-4deg)',
          }}
        >
          <img
            src={categories[1].img}
            alt={categories[1].title}
            className="w-full h-full object-cover object-top block"
          />
        </div>

        <div
          className="absolute overflow-hidden z-[3]"
          style={{
            bottom: '2%', insetInlineEnd: '2%',
            width: '48%', height: '66%',
            borderRadius: '999px 999px 24px 24px',
            border: `7px solid ${tokens.surface}`,
            boxShadow: '0 24px 44px -18px rgba(61,42,95,.45), inset 0 2px 0 #fff',
            transform: 'rotate(5deg)',
          }}
        >
          <img
            src={categories[2].img}
            alt={categories[2].title}
            className="w-full h-full object-cover object-top block"
          />
        </div>

        <motion.span
          animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-[4] flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-[12.5px] font-extrabold text-white"
          style={{
            bottom: '14%', insetInlineStart: '0',
            backgroundColor: tokens.bubblegum,
            boxShadow: `0 12px 24px -6px ${tokens.bubblegum}99, inset 0 1px 0 rgba(255,255,255,.4)`,
            border: '2px solid #fff',
          }}
        >
          <Snowflake size={15} color="#fff" />
          دفا لحد ٥ درجات
        </motion.span>

        <motion.span
          animate={{ rotate: [6, -6, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-[4] flex items-center gap-1.5 rounded-[14px] px-3.5 py-2 text-[11.5px] font-extrabold"
          style={{
            top: '16%', insetInlineStart: '-2%',
            backgroundColor: tokens.lemon,
            color: tokens.ink,
            boxShadow: `0 10px 20px -4px ${tokens.lemonDeep}66, inset 0 1px 0 rgba(255,255,255,.6)`,
            border: '2px solid #fff',
          }}
        >
          <Sparkles size={13} />
          جديد ٢٠٢٦
        </motion.span>
      </motion.div>

      {/* ── الشريط المتحرك ── */}
      <div
        className="order-2 md:order-none md:col-span-2 md:mt-2 overflow-hidden text-white -mx-2.5 -rotate-[1.2deg]"
        style={{
          background: `linear-gradient(135deg, ${tokens.bubblegum}, ${tokens.lavenderDeep}, ${tokens.skyDeep})`,
          boxShadow: '0 12px 32px -12px rgba(61,42,95,.3), inset 0 2px 0 rgba(255,255,255,.2)',
        }}
      >
        <div className="fw-track" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span
              key={i}
              className="fw-display inline-flex items-center gap-[18px] px-5 py-[15px] text-[17px] font-bold whitespace-nowrap"
              style={{ textShadow: '0 2px 6px rgba(61,42,95,.2)' }}
            >
              {t}
              <span className="inline-flex">
                {i % 4 === 0 && <Snowflake size={16} color="#fff" />}
                {i % 4 === 1 && <Heart size={16} color="#fff" fill="#fff" />}
                {i % 4 === 2 && <Star size={16} color="#fff" fill="#fff" />}
                {i % 4 === 3 && <Sparkles size={16} color="#fff" />}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

       
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '70px 20px 60px' }}>
          {/* ───────── اختاري حسب الطقس ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="fw-picker"
            style={{
              display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '28px',
              backgroundColor: tokens.surface, border: `2px solid ${tokens.line}`,
              borderRadius: '32px', padding: '34px', alignItems: 'center',
              boxShadow: '0 20px 48px -24px rgba(61,42,95,.25), inset 0 2px 0 #fff',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div className="fw-stripe-bg" style={{
              position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative' }}>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '12.5px', fontWeight: 800, color: tokens.bubblegumDeep,
                  backgroundColor: tokens.bubblegum + '20',
                  padding: '6px 14px', borderRadius: '999px', marginBottom: '12px',
                }}
              >
                <Thermometer size={14} /> مش عارفة تلبسيها إيه؟
              </span>
              <h2 className="fw-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0 0 20px', lineHeight: 1.3, fontWeight: 800 }}>
                حركي السلايدر على درجة حرارة النهاردة 🌡️
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: tokens.inkMuted, marginTop: '12px', fontWeight: 700 }}>
                <span>🥶 ٣° برد</span>
                <span>😊 ١٢° معتدل</span>
                <span>☀️ ٢٢° دافي</span>
              </div>
            </div>

            <motion.div
              key={rec.cat.id}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
              style={{
                backgroundColor: rec.cat.tint, borderRadius: '24px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '14px',
                border: `2px solid ${rec.cat.accent}33`,
                position: 'relative', overflow: 'hidden',
                boxShadow: `inset 0 2px 0 rgba(255,255,255,.7), 0 8px 20px -12px ${rec.cat.accent}66`,
              }}
            >
              <div style={{
                position: 'absolute', top: '-20%', insetInlineEnd: '-10%',
                width: '120px', height: '120px', borderRadius: '50%',
                background: rec.color, opacity: 0.25,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="fw-display"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '72px', height: '72px', borderRadius: '50%',
                    backgroundColor: rec.color,
                    fontSize: '24px', fontWeight: 800, color: tokens.ink,
                    boxShadow: `0 8px 20px -6px ${rec.color}aa, inset 0 2px 0 rgba(255,255,255,.6)`,
                    border: `3px solid #fff`,
                  }}
                >
                  {temp}°
                </motion.span>
                <div>
                  <div className="fw-display" style={{ fontSize: '21px', fontWeight: 800 }}>
                    {rec.emoji} {rec.cat.title}
                  </div>
                  <div style={{ fontSize: '13px', color: tokens.inkMuted, fontWeight: 600, marginTop: '2px' }}>
                    {rec.text}
                  </div>
                </div>
              </div>
              <button
                className="fw-btn"
                onClick={() => goTo(rec.cat.path)}
                style={{
                  alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '7px',
                  backgroundColor: tokens.ink, color: '#fff', border: 'none',
                  padding: '11px 22px', borderRadius: '999px', fontSize: '13.5px',
                  fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 8px 20px -8px rgba(61,42,95,.5), inset 0 1px 0 rgba(255,255,255,.2)',
                  position: 'relative',
                }}
              >
                شوفي {rec.cat.title}
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </button>
            </motion.div>
          </motion.div>

          {/* ───────── الأقسام ───────── */}
          <div style={{ marginTop: '80px', marginBottom: '24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '44px' }}
            >
              <span
                className="fw-display"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: 800, color: tokens.lavenderDeep,
                  backgroundColor: tokens.lavender + '25',
                  padding: '8px 18px', borderRadius: '999px', marginBottom: '14px',
                }}
              >
                <Candy size={15} />
                مجموعتنا السحرية
              </span>
              <h2 className="fw-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
                اختاري من قلب التشكيلة 💝
              </h2>
              <p style={{ color: tokens.inkMuted, fontSize: '14.5px', margin: 0 }}>
                قطع مختارة بحب عشان بنوتتك تبقى أحلى وأدفى
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '32px',
              }}
            >
              {categories.map((c, i) => (
                <CategoryCard key={c.id} category={c} index={i} />
              ))}
            </div>
          </div>

          {/* ───────── البانر الترويجي ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="fw-promo"
            style={{
              marginTop: '80px',
              background: `linear-gradient(135deg, ${tokens.ink}, #4A3272)`,
              borderRadius: '32px', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(220px, 340px)',
              boxShadow: '0 30px 60px -25px rgba(61,42,95,.5), inset 0 2px 0 rgba(255,255,255,.1)',
              position: 'relative',
            }}
          >
            <div style={{
              gridColumn: '1 / -1', height: '16px',
              background: `repeating-linear-gradient(90deg, 
                ${tokens.bubblegum} 0 30px, 
                ${tokens.lemon} 30px 60px, 
                ${tokens.mint} 60px 90px, 
                ${tokens.lavender} 90px 120px, 
                ${tokens.sky} 120px 150px, 
                ${tokens.peach} 150px 180px)`,
            }} />

            <div className="fw-promo-content" style={{ padding: '44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              <motion.span
                animate={{ scale: [1, 1.06, 1], rotate: [-2, 2, -2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px', width: 'fit-content',
                  background: `linear-gradient(135deg, ${tokens.lemon}, ${tokens.lemonDeep})`,
                  color: tokens.ink, fontSize: '12px', fontWeight: 800,
                  padding: '8px 16px', borderRadius: '999px', marginBottom: '18px',
                  boxShadow: `0 8px 20px -6px ${tokens.lemonDeep}88, inset 0 1px 0 rgba(255,255,255,.5)`,
                  border: '2px solid #fff',
                }}
              >
                <Gift size={14} strokeWidth={2.5} />
                هدية مع كل طلب 🎁
              </motion.span>

              <h3 className="fw-display" style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', fontWeight: 800, lineHeight: 1.3, margin: '0 0 14px' }}>
                لفّي بنوتتك في الدفا والفرحة 💕
              </h3>
              <p style={{ color: '#C9C6E6', fontSize: '14.5px', lineHeight: 1.85, margin: '0 0 6px', maxWidth: '380px' }}>
                <span style={{ color: tokens.lemon, fontWeight: 800 }}>خصم خاص للكميات</span> — تشكيلة شتوية مختارة بحب لبناتك الصغار
              </p>

              <div style={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px',
                marginTop: '24px', paddingTop: '20px',
                borderTop: '1px dashed rgba(255,255,255,.15)',
              }}>
                {[
                  { icon: Truck, label: 'توصيل سريع', color: tokens.mint },
                  { icon: ShieldCheck, label: 'ضمان الجودة', color: tokens.sky },
                  { icon: Percent, label: 'خصم على الكميات', color: tokens.lemon },
                ].map((f, i) => (
                  <span key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    color: '#E5E0F5', fontSize: '12.5px', fontWeight: 600,
                  }}>
                    <f.icon size={15} color={f.color} />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="fw-promo-img" style={{ position: 'relative', minHeight: '260px' }}>
              <img src={categories[2].img} alt={categories[2].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, transparent 25%, ${tokens.ink} 100%)` }} />
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                style={{
                  position: 'absolute', top: '24px', left: '24px', zIndex: 2,
                  background: `linear-gradient(135deg, ${tokens.bubblegum}, ${tokens.bubblegumDeep})`,
                  color: '#fff', padding: '10px 18px', borderRadius: '16px',
                  fontSize: '12.5px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', gap: '7px',
                  boxShadow: `0 12px 28px -8px ${tokens.bubblegum}aa, inset 0 1px 0 rgba(255,255,255,.4)`,
                  border: '2px solid #fff',
                }}
              >
                <Sparkles size={14} />
                عرض حصري
              </motion.div>
            </div>
          </motion.div>

          {/* ───────── Footer ───────── */}
          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '12.5px', color: tokens.inkMuted }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
              {[Heart, Star, Snowflake, Sparkles, Candy].map((Icon, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Icon size={16} color={[tokens.bubblegum, tokens.lemonDeep, tokens.skyDeep, tokens.lavenderDeep, tokens.mintDeep][i]}
                    fill={[Heart, Star, Candy].includes(Icon) ? [tokens.bubblegum, tokens.lemonDeep, tokens.mintDeep][i] : 'none'} />
                </motion.span>
              ))}
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <span>© ٢٠٢٦ تشكيلة بنات</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: tokens.bubblegum }} />
              <span>صنع بحب 💝</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinterLinedHomePage;