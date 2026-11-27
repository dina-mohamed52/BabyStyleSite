import React from 'react';
import { motion, MotionConfig, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft, ArrowUpLeft, ShoppingBag, Truck, Eye, RefreshCw,
  Star, Plus, Check, Sparkles, Snowflake
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

// ─── Images ───
const IMG_WOMEN =
  'https://images.baby-style-store.com/%D9%83%D9%88%D9%84%D9%88%D9%86%D8%A7%D8%AA%20%D8%B3%D8%A7%D8%AF%D9%87%20%D9%85%D8%A8%D8%B7%D9%86%D9%87/WhatsApp%20Image%202026-10-02%20at%209.57.42%20AM.jpeg';
const IMG_GIRLS =
  'https://images.baby-style-store.com/%D9%85%D8%A8%D8%B7%D9%86%20%D9%81%D8%B1%D9%88/WhatsApp%20Image%202026-10-21%20at%204.15.36%20PM.jpeg';

const pages = [
  { href: '/women-leggings', tag: 'حريمي', title: 'ليجن مبطن حريمي', desc: 'خصر عالي ودفا طول اليوم.', price: '١٩٩', img: IMG_WOMEN },
  { href: '/girls-leggings', tag: 'بناتي', title: 'ليجن مبطن بناتي', desc: 'بطانة فرو ناعمة للعب والجري.', price: '١٤٩', img: IMG_GIRLS },
  { href: '/warm-socks', tag: 'حريمي وبناتي', title: 'شربات دفاية', desc: 'سميكة وناعمة وتكمّل اللوك.', price: '٦٩', img: IMG_GIRLS },
];

const bestSellers = [
  { name: 'ليجن مبطن — أسود', tag: 'الأكثر مبيعاً', price: '١٩٩', oldPrice: '٢٤٠', img: IMG_WOMEN, rating: '٤.٩', reviews: '٢٤٠' },
  { name: 'طقم بناتي — وردي', tag: 'جديد', price: '١٤٩', oldPrice: '١٨٠', img: IMG_GIRLS, rating: '٤.٨', reviews: '١٨٧' },
  { name: 'شربات دفاية — بيج', tag: 'مميز', price: '٦٩', oldPrice: '٩٠', img: IMG_WOMEN, rating: '٥.٠', reviews: '٣١٢' },
  { name: 'ليجن مبطن — كحلي', tag: 'الأكثر مبيعاً', price: '١٩٩', oldPrice: '٢٤٠', img: IMG_GIRLS, rating: '٤.٧', reviews: '١٥٦' },
];

// ═══════════════════════════════════════════
// HERO — موبايل وديسكتوب نفس الفكرة: صورة كاملة + نص فوقها
// ═══════════════════════════════════════════
function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 600], [0, 60]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <section className="relative w-full overflow-hidden bg-[#1C1C19]">
      <div className="relative h-[88vh] min-h-[560px] md:h-[92vh] md:min-h-[680px]">
        {/* Image full-bleed + parallax */}
        <motion.div style={{ y: yImage, scale }} className="absolute inset-0">
          <img
            src={IMG_WOMEN}
            alt="ليجن مبطن"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:bg-gradient-to-l md:from-black md:via-black/60 md:to-black/10" />

        {/* Content — mobile: bottom stack / desktop: bottom-start with wider width */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 md:px-16 md:pb-16 lg:px-20 lg:pb-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="max-w-[620px]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] md:text-[12px] font-medium mb-4 md:mb-5">
              <Snowflake size={12} />
              Winter 2026
            </span>

            <h1 className="text-[clamp(2.2rem,10vw,3.6rem)] md:text-[clamp(3.2rem,5.5vw,5rem)] font-semibold leading-[1.05] md:leading-[0.98] tracking-tight mb-3 md:mb-5">
              دفا بشياكة
              <br />
              <span className="text-[#D7ED7C]">لكِ ولبنوتك.</span>
            </h1>

            <p className="text-[14px] md:text-[16px] text-white/70 leading-relaxed mb-6 md:mb-8 max-w-[340px] md:max-w-[440px]">
              ليجن مبطن وشربات دفاية — خامات ناعمة ومقاسات مظبوطة.
            </p>

            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="#collections"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white text-[#1C1C19] px-6 md:px-7 text-[14px] font-bold active:scale-95 hover:bg-[#D7ED7C] transition-all"
              >
                تسوقي الآن
                <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href="#best"
                className="text-[13px] md:text-[14px] font-medium text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
              >
                الأكثر مبيعاً
              </a>
            </div>

            {/* Trust row — shows on desktop only */}
            <div className="hidden md:flex items-center gap-6 mt-10 text-[12px] text-white/50">
              {[
                { Icon: Truck, text: 'شحن 5 أيام' },
                { Icon: Eye, text: 'معاينة قبل الاستلام' },
                { Icon: RefreshCw, text: ' استبدال في حاله الديفوه ' },
              ].map(({ Icon, text }, i) => (
                <React.Fragment key={text}>
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} strokeWidth={2} />
                    {text}
                  </div>
                  {i < 2 && <span className="w-1 h-1 rounded-full bg-white/30" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating rating card — top left mobile / top right desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="absolute top-20 left-4 md:top-24 md:left-auto md:right-12 bg-white/95 backdrop-blur rounded-2xl px-3 py-2 md:px-4 md:py-2.5 flex items-center gap-2 shadow-lg"
        >
          <Star size={12} fill="#1C1C19" className="text-[#1C1C19] md:w-[14px] md:h-[14px]" />
          <span className="text-[11px] md:text-[12px] font-bold text-[#1C1C19]">٤.٩</span>
          <span className="text-[10px] md:text-[11px] text-[#5A5C5C]">· ٢٤٠ تقييم</span>
        </motion.div>

        {/* Floating cozy badge — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1, ease }}
          className="hidden md:flex absolute bottom-16 right-12 bg-[#D7ED7C] rounded-2xl px-4 py-3 shadow-lg items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-[#1C1C19] flex items-center justify-center">
            <Snowflake size={16} className="text-[#D7ED7C]" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-[#1C1C19]">دفا ٥ درجات</div>
            <div className="text-[10px] text-[#3F4C00]/70">مختبرة فعلياً</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative bg-[#1C1C19] border-t border-white/10 py-3 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-white/40 text-[11px] font-medium">
          {[...Array(2)].map((_, k) => (
            <React.Fragment key={k}>
              <span>✦ ليجن مبطن حريمي</span>
              <span>✦ ليجن مبطن بناتي</span>
              <span>✦ شربات دفاية</span>
              <span>✦اسعار خاصه لطلبات الجمله</span>
              <span>✦ ضمان ضد عيوب الصناعه  </span>
              <span>✦ خامات ناعمة</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Page card ───
function PageCard({ page, index }) {
  return (
    <motion.a
      href={page.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] bg-[#EBE8E3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A53656]"
    >
      <img
        src={page.img}
        alt={page.title}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1C1C19] backdrop-blur">
        {page.tag}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{page.title}</h3>
          <p className="mt-1 text-[13px] text-white/80">{page.desc}</p>
          <p className="mt-3 text-[13px]">
            يبدأ من <span className="text-base font-bold">{page.price}</span> ج.م
          </p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1C1C19] transition-colors group-hover:bg-[#A53656] group-hover:text-white">
          <ArrowUpLeft size={18} strokeWidth={2.2} />
        </span>
      </div>
    </motion.a>
  );
}

// ─── Best sellers ───
function BestSellerCard({ item, index }) {
  const [added, setAdded] = React.useState(false);
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#EBE8E3]">
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur ${
            item.tag === 'الأكثر مبيعاً' ? 'bg-[#A53656] text-white'
            : item.tag === 'جديد' ? 'bg-[#D7ED7C] text-[#3F4C00]'
            : 'bg-white/95 text-[#1C1C19]'
          }`}
        >
          {item.tag}
        </span>
        <button
          onClick={handleAdd}
          aria-label="أضيفي للسلة"
          className={`absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
            added ? 'bg-[#3F4C00] text-white' : 'bg-white text-[#1C1C19] hover:bg-[#1C1C19] hover:text-white'
          }`}
        >
          {added ? <Check size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
        </button>
      </div>
      <div className="pt-3 px-0.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[14px] font-medium leading-tight text-[#1C1C19]">{item.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={11} fill="#1C1C19" className="text-[#1C1C19]" />
            <span className="text-[11px] font-semibold">{item.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="font-bold text-[#1C1C19]">{item.price} ج.م</span>
          <span className="text-[#5A5C5C]/60 line-through">{item.oldPrice}</span>
          <span className="text-[10px] text-[#5A5C5C]">({item.reviews})</span>
        </div>
      </div>
    </motion.a>
  );
}

function BestSellers() {
  return (
    <section id="best" className="mx-auto max-w-[1280px] px-6 py-16 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F6E4E4]/30 to-transparent pointer-events-none" />
      <div className="relative">
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 mb-3 text-[11px] uppercase tracking-[0.15em] font-medium text-[#A53656]"
            >
              <Sparkles size={13} />
              Best Sellers
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-medium tracking-tight leading-tight"
            >
              الأكثر مبيعاً هذا الشتاء
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1C1C19] hover:text-[#A53656] transition-colors pb-1 border-b border-transparent hover:border-[#A53656]"
          >
            شوفي كل المنتجات
            <ArrowLeft size={13} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((item, i) => (
            <BestSellerCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───
export default function LegginLinedGirlsHomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        dir="rtl"
        lang="ar"
        className="min-h-screen overflow-x-hidden bg-[#FDF9F4] text-[#1C1C19]"
        style={{ fontFamily: "'Readex Pro', 'Rubik', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600&display=swap');`}</style>

        <main>
          <Hero />

          <section id="collections" className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium tracking-tight">
                اختاري القسم
              </h2>
              <p className="hidden max-w-[300px] text-[14px] font-light text-[#5A5C5C] sm:block">
                كل قسم له صفحته بكل الألوان والمقاسات.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {pages.map((p, i) => (
                <PageCard key={p.href} page={p} index={i} />
              ))}
            </div>
          </section>

          <BestSellers />
        </main>
      </div>
    </MotionConfig>
  );
}