import { ShoppingBag, Shirt } from "lucide-react";
import { BackToSchoolData } from "../data/BackToSchool";

const FEATURED_IDS = [6, 3, 9, 4, 11, 2];

const ProductHero = () => {
  const featured = FEATURED_IDS.map((id) =>
    BackToSchoolData.find((p) => p.id === id)
  ).filter(Boolean);

  const [anchor, ...rest] = featured;

  const totalColors = new Set(
    BackToSchoolData.flatMap((p) => p.avalibeColors || [])
  ).size;

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#F8F2E7] py-14 sm:py-20"
    >
      {/* خط الخطوط + الخلفية */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lalezar&family=Tajawal:wght@400;500;700;900&display=swap');
        .hero-display { font-family: 'Lalezar', 'Tajawal', sans-serif; }
        .hero-body { font-family: 'Tajawal', sans-serif; }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .rise-in { animation: riseIn 0.7s cubic-bezier(.21,.9,.32,1) both; }
      `}</style>

      {/* أشكال خلفية عضوية هادية */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl opacity-40"
        style={{ background: "#DCA53C" }}
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ background: "#7E8B6E" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8">
        {/* ============ النص (تحت على الموبايل، شمال على الديسكتوب) ============ */}
        <div
          className="rise-in text-center lg:text-right order-2 lg:order-1"
          style={{ animationDelay: "60ms" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#22303F]/30 bg-white/60 px-4 py-1.5 hero-body text-sm font-medium text-[#22303F]">
            <Shirt className="h-4 w-4" style={{ color: "#C1622D" }} />
            تشكيلة الخريف
          </div>

          <h1 className="hero-display mt-5 text-4xl leading-[1.15] text-[#22303F] sm:text-5xl lg:text-6xl">
            كل صباح ... طلة جديدة تفرّحهم
          </h1>

          <p className="hero-body mx-auto mt-5 max-w-md text-base leading-relaxed text-[#22303F]/70 sm:text-lg lg:mx-0">
            كولونات وليجنز قطن ناعم، مقاسات من حديثي الولادة لسن 14 سنة، وألوان
            تكفي كل الأذواق.
          </p>

          <div className="hero-body mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 lg:justify-start">
            <div className="text-right">
              <div className="text-2xl font-black text-[#22303F]">
                {BackToSchoolData.length}+
              </div>
              <div className="text-xs text-[#22303F]/60">تصميم متاح</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#22303F]">
                {totalColors}
              </div>
              <div className="text-xs text-[#22303F]/60">لون مختلف</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#22303F]">0-14</div>
              <div className="text-xs text-[#22303F]/60">سنة</div>
            </div>
          </div>

         
        </div>

        {/* ============ كولاج الصور (فوق على الموبايل، يمين على الديسكتوب) ============ */}
        <div className="grid h-[420px] grid-cols-6 grid-rows-6 gap-3 sm:h-[520px] lg:h-[560px] order-1 lg:order-2">
          {/* الصورة الرئيسية الكبيرة */}
          <div
            className="rise-in relative col-span-4 col-start-1 row-span-4 row-start-1 overflow-hidden rounded-[2.5rem] rounded-bl-lg bg-white shadow-xl"
            style={{ animationDelay: "0ms" }}
          >
            <img
              src={anchor.image}
              alt={anchor.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 right-3 rounded-xl bg-white/90 px-3 py-1.5 hero-body text-xs font-bold text-[#22303F] shadow">
              {anchor.name} · {anchor.avalibeColors?.length || 0} ألوان
            </div>
          </div>

          {featured[1] && (
            <div
              className="rise-in col-span-2 col-start-5 row-span-2 row-start-1 overflow-hidden rounded-[1.75rem] bg-white shadow-lg"
              style={{ animationDelay: "120ms" }}
            >
              <img
                src={featured[1].image}
                alt={featured[1].name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {featured[2] && (
            <div
              className="rise-in col-span-2 col-start-5 row-span-2 row-start-3 overflow-hidden rounded-[1.75rem] rounded-tr-3xl bg-white shadow-lg"
              style={{ animationDelay: "180ms" }}
            >
              <img
                src={featured[2].image}
                alt={featured[2].name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {featured[3] && (
            <div
              className="rise-in col-span-2 col-start-1 row-span-2 row-start-5 -rotate-2 overflow-hidden rounded-[1.5rem] bg-white shadow-lg"
              style={{ animationDelay: "240ms" }}
            >
              <img
                src={featured[3].image}
                alt={featured[3].name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {featured[4] && (
            <div
              className="rise-in col-span-2 col-start-3 row-span-2 row-start-5 overflow-hidden rounded-[1.5rem] bg-white shadow-lg"
              style={{ animationDelay: "300ms" }}
            >
              <img
                src={featured[4].image}
                alt={featured[4].name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {featured[5] && (
            <div
              className="rise-in col-span-2 col-start-5 row-span-2 row-start-5 rotate-2 overflow-hidden rounded-[1.5rem] bg-white shadow-lg"
              style={{ animationDelay: "360ms" }}
            >
              <img
                src={featured[5].image}
                alt={featured[5].name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;