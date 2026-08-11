import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Truck, ShieldCheck, Star, Percent, Copy, Check, Gift, Sparkles, Heart, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

// ————————————————————————————————————————————
// Design tokens
// One confident accent (raspberry) instead of a pink+purple
// gradient everywhere. Blush-white background, deep plum ink.
// The photo is the star of each card — nothing overlaps it.
// ————————————————————————————————————————————
const tokens = {
  bg: '#FBF6F4',
  surface: '#FFFFFF',
  ink: '#2B1620',
  inkMuted: '#8C7680',
  line: '#EFE0E2',
  accent: '#D6396B',
  accentDark: '#B22656',
  accentSoft: '#FBE6EE',
};

function ClothesHomePage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);




  const categories = [
    {
      id: 'top',
      title: 'توبات صيفي',
      subtitle: 'تيشيرتات وبلوزات',
      description: 'تصاميم أنيقة تناسب بناتك الصغار في كل المناسبات',
      count: '١٨ منتج',
      note: 'تشكيلة جديدة',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263587/WhatsApp_Image_2026-07-03_at_4.58.11_AM_x2o3xd.jpg',
      path: '/clothes/top',
    },
    {
      id: 'legging',
      title: 'ليجينز',
      subtitle: 'بناطيل مرنة',
      description: 'مريحة وأنيقة، مثالية للعب والحركة اليومية',
      count: '٢٤ منتج',
      note: 'الأكثر مبيعاً',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615458/WhatsApp_Image_2026-07-09_at_9.07.02_AM_2_pc3is5.jpg',
      path: '/clothes/legging',
    },
    {
      id: 'short',
      title: 'شورتات',
      subtitle: 'شورت صيفي',
      description: 'تصاميم عصرية تناسب أيام الصيف الحارة',
      count: '١٢ منتج',
      note: 'تشكيلة الصيف',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263333/WhatsApp_Image_2026-07-05_at_5.26.23_AM_2_fmvmxg.jpg',
      path: '/clothes/short',
    },
  ];

  const goToCategory = (path) => navigate(path);

  return (
    <div
      style={{
        backgroundColor: tokens.bg,
        color: tokens.ink,
        minHeight: '100vh',
        fontFamily: "'Tajawal', sans-serif",
        direction: 'rtl',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700&family=Tajawal:wght@400;500;700&display=swap');
        .fh-display { font-family: 'Baloo Bhaijaan 2', 'Tajawal', sans-serif; }
        .fh-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -16px rgba(43,22,32,0.18);
        }
        .fh-card:hover .fh-img { transform: scale(1.04); }
        .fh-img { transition: transform 0.5s ease; }
        .fh-card:hover .fh-arrow { transform: translate(-3px,-3px); }
        .fh-arrow { transition: transform 0.25s ease; }
        .fh-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .fh-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -8px rgba(214,57,107,0.35); }
        
        /* تحسينات للموبيل - الصور تظهر دائماً */
        @media (max-width: 720px) {
          .fh-hero-grid { 
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .fh-collage { 
            display: flex !important;
            justify-content: center;
            height: auto !important;
            min-height: 280px;
          }
          .fh-collage-images {
            position: relative !important;
            width: 100% !important;
            height: 280px !important;
          }
          .fh-collage-images > div {
            position: absolute !important;
          }
          .fh-promo { 
            grid-template-columns: 1fr !important;
          }
          .fh-promo-img { 
            min-height: 200px !important;
            order: -1;
          }
          .fh-promo-content {
            padding: 32px 24px !important;
          }
          .fh-stats {
            justify-content: center !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '40px 20px 60px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
        >
          <span style={{ width: '26px', height: '2px', backgroundColor: tokens.accent, borderRadius: '2px' }} />
          <span style={{ fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, color: tokens.accentDark }}>
            تشكيلة صيف ٢٠٢٦ — بناتي
          </span>
          <motion.span
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginRight: 'auto' }}
          >
            <Sparkles size={14} color={tokens.accent} />
          </motion.span>
        </motion.div>

        {/* Hero — الصور تظهر في الموبيل */}
        <div className="fh-hero-grid " style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(220px, 340px)',
          gap: '40px',
          alignItems: 'center',
        }}>
                 {/* Photo collage — تظهر في الموبيل */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="fh-collage"
            style={{ position: 'relative', height: '340px' }}
          >
            <div className="fh-collage-images" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{
                position: 'absolute', top: 0, insetInlineStart: 0, width: '68%', height: '82%',
                borderRadius: '16px', overflow: 'hidden', transform: 'rotate(-4deg)',
                boxShadow: '0 20px 40px -16px rgba(43,22,32,0.28)', border: `6px solid ${tokens.surface}`,
                zIndex: 2
              }}>
                <img src={categories[1].img} alt={categories[1].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, insetInlineEnd: 0, width: '58%', height: '68%',
                borderRadius: '16px', overflow: 'hidden', transform: 'rotate(5deg)',
                boxShadow: '0 20px 40px -16px rgba(43,22,32,0.28)', border: `6px solid ${tokens.surface}`,
                zIndex: 1
              }}>
                <img src={categories[0].img} alt={categories[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute', top: '10%', insetInlineEnd: '4%',
                display: 'flex', alignItems: 'center', gap: '6px',
                backgroundColor: tokens.surface, borderRadius: '999px',
                padding: '8px 14px', fontSize: '11.5px', fontWeight: 700, color: tokens.ink,
                boxShadow: '0 8px 20px -8px rgba(43,22,32,0.25)',
                zIndex: 3
              }}
            >
              <Star size={13} fill={tokens.accent} color={tokens.accent} />
              الأكثر مبيعاً
            </motion.span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h1 className="fh-display" style={{
              fontSize: 'clamp(2rem, 5.2vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.18,
              margin: '0 0 16px',
            }}>
              ملابس بنات تستحق
              <br />
              <span style={{ color: tokens.accent }}>التكرار كل يوم</span>
            </h1>
            <p style={{ maxWidth: '400px', color: tokens.inkMuted, fontSize: '15px', lineHeight: 1.8, margin: '0 0 28px' }}>
              توبات · ليجينز · شورتات — قطع مختارة بعناية لبناتك الصغار، من غير حشو.
            </p>
            <button
              className="fh-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: tokens.ink, color: '#fff', border: 'none',
                padding: '13px 26px', borderRadius: '10px', fontSize: '13.5px',
                fontWeight: 700, cursor: 'pointer', marginBottom: '32px',
              }}
              onClick={() => goToCategory(categories[0].path)}
            >
              اكتشفي التشكيلة
              <ArrowUpRight size={16} strokeWidth={2} />
            </button>

            {/* Stats */}
            <div className="fh-stats" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {[
                { icon: Star, label: '٥٤+ قطعة متوفرة' },
                { icon: Truck, label: 'شحن خلال 5 ايام' },
                { icon: ShieldCheck, label: 'توصيل آمن' },
              ].map((stat, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    backgroundColor: tokens.surface, border: `1px solid ${tokens.line}`,
                    borderRadius: '999px', padding: '8px 16px 8px 8px',
                    fontSize: '12.5px', fontWeight: 600, color: tokens.ink,
                    boxShadow: '0 2px 8px -4px rgba(43,22,32,0.1)',
                  }}
                >
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '26px', height: '26px', borderRadius: '50%',
                    backgroundColor: tokens.accentSoft,
                  }}>
                    <stat.icon size={13} strokeWidth={2} color={tokens.accent} />
                  </span>
                  {stat.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

     
        </div>

        {/* Category grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}>
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => goToCategory(category.path)}
              className="fh-card"
              style={{
                backgroundColor: tokens.surface,
                borderRadius: '18px',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 14px -8px rgba(43,22,32,0.12)',
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                backgroundColor: tokens.accentSoft,
              }}>
                <img
                  src={category.img}
                  alt={category.title}
                  className="fh-img"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />
                <span style={{
                  position: 'absolute', top: '12px', insetInlineStart: '12px',
                  fontSize: '11px', fontWeight: 700, color: '#fff',
                  backgroundColor: tokens.accent, padding: '5px 12px', borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                  {category.note}
                </span>
                <div style={{
                  position: 'absolute', insetInline: 0, bottom: 0, height: '56px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.28), transparent)',
                }} />
                <span style={{
                  position: 'absolute', bottom: '10px', insetInlineEnd: '12px',
                  fontSize: '11.5px', color: '#fff', fontWeight: 600,
                }}>
                  {category.count}
                </span>
              </div>

              <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h2 className="fh-display" style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 3px' }}>
                  {category.title}
                </h2>
                <p style={{ fontSize: '12px', color: tokens.inkMuted, margin: '0 0 10px', fontWeight: 500 }}>
                  {category.subtitle}
                </p>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: tokens.inkMuted, margin: '0 0 18px', flex: 1 }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '14px', borderTop: `1px solid ${tokens.line}`,
                }}>
                  <span style={{ fontSize: '12.5px', letterSpacing: '0.04em', fontWeight: 700, color: tokens.ink }}>
                    تسوقي {category.title}
                  </span>
                  <span className="fh-arrow" style={{ display: 'inline-flex' }}>
                    <ArrowUpRight size={17} strokeWidth={2} color={tokens.accent} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo banner — كلام دعائي جديد ومشوق */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '64px',
            backgroundColor: tokens.ink,
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) minmax(220px, 320px)',
          }}
          className="fh-promo"
        >
          {/* Content - كلام دعائي جديد */}
          <div className="fh-promo-content" style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content',
                backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                padding: '6px 14px', borderRadius: '999px', marginBottom: '16px',
              }}
            >
              <Gift size={12} strokeWidth={2.5} />
              هدية مع كل طلب
            </motion.span>

            <h3 className="fh-display" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, margin: '0 0 10px' }}>
              <Heart size={28} color={tokens.accent} fill={tokens.accent} style={{ display: 'inline-block', marginLeft: '8px' }} />
              أحلى التشكيلات في مكان واحد
            </h3>
            
            <p style={{ color: '#C9AFB8', fontSize: '14px', lineHeight: 1.8, margin: '0 0 8px', maxWidth: '340px' }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>خصم خاص للكميات</span> 
            </p>
            
            <p style={{ color: '#C9AFB8', fontSize: '13px', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '340px' }}>
              <Crown size={14} color={tokens.accent} style={{ display: 'inline', marginLeft: '4px' }} />
              تشكيلة حصرية من أجمل الملابس لبناتك الصغار
            </p>

           
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C9AFB8', fontSize: '12px' }}>
                <Truck size={14} color={tokens.accent} />
                توصيل سريع
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C9AFB8', fontSize: '12px' }}>
                <ShieldCheck size={14} color={tokens.accent} />
                ضمان الجودة
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C9AFB8', fontSize: '12px' }}>
                <Percent size={14} color={tokens.accent} />
                خصم علي الكميات
              </span>
            </div>
          </div>

          {/* Photo */}
          <div className="fh-promo-img" style={{ position: 'relative', minHeight: '220px' }}>
            <img
              src={categories[2].img}
              alt={categories[2].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to left, transparent 30%, ${tokens.ink} 100%)`,
            }} />
            
            {/* Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: tokens.accent,
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(214,57,107,0.4)',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} />
              عرض حصري
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '12px',
            color: tokens.inkMuted,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={12} color={tokens.accent} fill={tokens.accent} />
            <span>© ٢٠٢٦ تشكيلة بنات</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: tokens.accent }} />
            <span>صنع بحب ♡</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default ClothesHomePage;