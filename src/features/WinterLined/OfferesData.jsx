// 📁 OfferesData.js

/* ─────────────────────────────────────────────
   🧸 عروض المبطن العادي (بيبي + بناتي)
   ───────────────────────────────────────────── */
const linedOffers = [
  {
    name: "ال3 كولون",
    count: 3,
    prices: { baby: 330, girls: 390 },
  },
  {
    name: "ال4 كولون",
    count: 4,
    prices: { baby: 420, girls: 480 },
  },
  {
    name: "ال6 كولون",
    count: 6,
    prices: { baby: 570, girls: 660 },
  },
  {
    name: "ال8 كولون",
    count: 8,
    prices: { baby: 720, girls: 800 },
  },
  {
    name: "ال10 كولون",
    count: 10,
    prices: { baby: 850, girls: 950 },
  },
  {
    name: "ال12 كولون",
    count: 12,
    prices: { baby: 960, girls: 1080 },
  },
];

/* ─────────────────────────────────────────────
   ❄️ عروض الفرو (سعر واحد — مفيش بيبي/بناتي)
   ───────────────────────────────────────────── */
const furOffers = [
  { name: "ال3 كولون", count: 3, prices: { single: 390 } },
  { name: "ال4 كولون", count: 4, prices: { single: 480 } },
  { name: "ال6 كولون", count: 6, prices: { single: 660 } },
  { name: "ال8 كولون", count: 8, prices: { single: 800 } },
  { name: "ال10 كولون", count: 10, prices: { single: 950 } },
  { name: "ال12 كولون", count: 12, prices: { single: 1080 } },
];

/* ✅ اختيار العروض حسب الكاتيجوري */
export function getOffersByCategory(category) {
  return category === "fur" ? furOffers : linedOffers;
}

/* ─────────────────────────────────────────────
   الفئات العمرية
   ───────────────────────────────────────────── */
export const AGE_GROUPS = {
  baby: "من حديثي الولادة حتى 9 شهور 👶",
  girls: "من سنتين حتى 14 سنة 🎀",
};

export default linedOffers;