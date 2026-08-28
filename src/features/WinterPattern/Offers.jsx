import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Gift,
  Star,
  Crown,
  Flame,
  Tag,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";

const PINK = "#F472B6";
const PINK_LIGHT = "#FCE7F3";
const PINK_DARK = "#EC4899";
const PURPLE = "#A78BFA";
const PURPLE_LIGHT = "#EDE9FE";
const PURPLE_DARK = "#8B5CF6";
const GRAY_50 = "#F9FAFB";
const GRAY_100 = "#F3F4F6";
const GRAY_200 = "#E5E7EB";
const GRAY_300 = "#D1D5DB";
const GRAY_500 = "#6B7280";
const GRAY_600 = "#4B5563";
const GRAY_700 = "#374151";
const GRAY_800 = "#4B5563";

// عروض الكولون الخريفي
const colonOffers = [
  {
    quantity: "3 كولون",
    name: "عرض 3 كولون خريفي",
    price: 315,
    oldPrice: 480,
    value: 3,
    discount: 15,
  },
  {
    quantity: "4 كولون",
    name: "عرض 4 كولون خريفي",
    price: 400,
    oldPrice: 620,
    value: 4,
    discount: 18,
  },
  {
    quantity: "5 كولون",
    name: "عرض 5 كولون خريفي",
    price: 475,
    oldPrice: 740,
    value: 5,
    discount: 20,
    highlight: "عرض خاص",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    quantity: "6 كولون",
    name: "عرض 6 كولون خريفي",
    price: 570,
    oldPrice: 910,
    value: 6,
    discount: 24,
    highlight: "الأكثر مبيعاً",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  {
    quantity: "8 كولون",
    name: "عرض 8 كولون خريفي",
    price: 720,
    oldPrice: 1180,
    value: 8,
    discount: 27,
  },
  {
    quantity: "12 كولون",
    name: "عرض 12 كولون خريفي",
    price: 960,
    oldPrice: 1720,
    value: 12,
    discount: 32,
    highlight: "أفضل عرض",
    icon: <Crown className="w-3.5 h-3.5" />,
  },
];

// عروض الهاف الخريفي
const halfColonOffers = [
  {
    quantity: "3 هاف",
    name: "عرض 3 هاف خريفي",
    price: 210,
    oldPrice: 330,
    value: 3,
    discount: 15,
  },
  {
    quantity: "4 هاف",
    name: "عرض 4 هاف خريفي",
    price: 260,
    oldPrice: 420,
    value: 4,
    discount: 18,
  },
  {
    quantity: "6 هاف",
    name: "عرض 6 هاف خريفي",
    price: 330,
    oldPrice: 540,
    value: 6,
    discount: 24,
    highlight: "الأكثر مبيعاً",
    icon: <Star className="w-3.5 h-3.5" />,
  },
];

function Offers({ setSelectedOffer, scrollToOrderCollection, type = "colon" }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(type);

  const getOffers = () => {
    return activeTab === "colon" ? colonOffers : halfColonOffers;
  };

  const offers = getOffers();

  const handleSelect = (offer) => {
    const offerWithType = { ...offer, type: activeTab };
    setSelectedOffer(offerWithType);
    if (scrollToOrderCollection) {
      scrollToOrderCollection();
    }
  };

  const getPricePerPiece = (price, value) => {
    return (price / value).toFixed(0);
  };

  const getDiscountPercentage = (oldPrice, price) => {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  const isColon = activeTab === "colon";
  const primaryColor = isColon ? PINK : PURPLE;
  const primaryColorLight = isColon ? PINK_LIGHT : PURPLE_LIGHT;
  const primaryColorDark = isColon ? PINK_DARK : PURPLE_DARK;
  const primaryGradient = isColon
    ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`
    : `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`;

  return (
    <div className="relative max-w-6xl mx-auto my-12 sm:my-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border shadow-sm"
          style={{
            background: primaryColorLight,
            borderColor: `${primaryColor}30`,
          }}
        >
          <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: GRAY_800 }}
          >
            {activeTab === "colon"
              ? "🎨 عروض الكولون الخريفي"
              : "🌾 عروض الهاف الخريفي"}
          </h2>
          <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
        </div>
        <p className="text-sm mt-3" style={{ color: GRAY_500 }}>
          اختاري العرض المناسب لكِ ووفري أكثر
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab("colon")}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
            activeTab === "colon" ? "text-white shadow-lg" : "border"
          }`}
          style={{
            background: activeTab === "colon" ? primaryGradient : GRAY_100,
            color: activeTab === "colon" ? "white" : GRAY_500,
            borderColor: activeTab === "colon" ? "transparent" : GRAY_200,
            boxShadow: activeTab === "colon" ? `0 8px 24px ${PINK}40` : "none",
          }}
        >
          <Tag className="w-4 h-4" />
          عروض الكولون
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background:
                activeTab === "colon" ? "rgba(255,255,255,0.2)" : GRAY_200,
              color: activeTab === "colon" ? "white" : GRAY_500,
            }}
          >
            6
          </span>
        </button>
        <button
          onClick={() => setActiveTab("half")}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
            activeTab === "half" ? "text-white shadow-lg" : "border"
          }`}
          style={{
            background:
              activeTab === "half"
                ? `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})`
                : GRAY_100,
            color: activeTab === "half" ? "white" : GRAY_500,
            borderColor: activeTab === "half" ? "transparent" : GRAY_200,
            boxShadow: activeTab === "half" ? `0 8px 24px ${PURPLE}40` : "none",
          }}
        >
          <Flame className="w-4 h-4" />
          عروض الهاف
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background:
                activeTab === "half" ? "rgba(255,255,255,0.2)" : GRAY_200,
              color: activeTab === "half" ? "white" : GRAY_500,
            }}
          >
            3
          </span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer, index) => {
          const isHovered = hoveredIndex === index;
          const pricePerPiece = getPricePerPiece(offer.price, offer.value);
          const discountPercent = getDiscountPercentage(
            offer.oldPrice,
            offer.price,
          );
          const isHighlight = offer.highlight;

          return (
            <div
              onClick={() => handleSelect(offer)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={index}
              className="relative group cursor-pointer"
            >
              {/* Glow Effect */}
              {isHovered && (
                <div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-30 transition-opacity duration-500"
                  style={{
                    background: primaryGradient,
                  }}
                ></div>
              )}

              {/* Main Card */}
              <div
                className={`relative bg-white rounded-2xl transition-all duration-500 border ${
                  isHighlight ? `shadow-lg` : "shadow-sm"
                } ${isHovered ? "transform -translate-y-1 shadow-2xl" : ""}`}
                style={{
                  borderColor: isHighlight ? `${primaryColor}50` : GRAY_200,
                  boxShadow: isHighlight
                    ? `0 8px 24px ${primaryColor}25`
                    : "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                {/* Card Header - Gradient Bar */}
                <div
                  className="h-1.5 rounded-t-2xl"
                  style={{
                    background: isHighlight
                      ? primaryGradient
                      : `linear-gradient(90deg, ${GRAY_200}, ${GRAY_300})`,
                  }}
                ></div>

                {/* Discount Badge */}
                <div className="absolute -top-2 -left-2 z-20">
                  <div
                    className="text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
                    style={{
                      background: primaryGradient,
                    }}
                  >
                    <Tag className="w-3 h-3" />-{discountPercent}%
                  </div>
                </div>

                {/* Highlight Badge */}
                {isHighlight && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div
                      className="text-white font-bold px-3 py-1 rounded-full text-[8px] shadow-xl flex items-center gap-1"
                      style={{
                        background: primaryGradient,
                      }}
                    >
                      <span className="w-3 h-3">{offer.icon}</span>
                      <span>{offer.highlight}</span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 pt-5 text-center">
                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: `${primaryColor}15`,
                      }}
                    >
                      <Gift
                        className="w-5 h-5"
                        style={{ color: primaryColor }}
                      />
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: primaryColor }}
                    >
                      {offer.quantity}
                    </span>
                  </div>

                  {/* Name */}
                  <p className="text-xs mb-2" style={{ color: GRAY_500 }}>
                    {offer.name}
                  </p>

                  {/* Price Per Piece */}
                  <div
                    className="inline-block px-3 py-1 rounded-full mb-3"
                    style={{
                      background: `${primaryColor}10`,
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: primaryColor }}
                    >
                      {pricePerPiece} ج.م / قطعة
                    </span>
                  </div>

                  {/* Prices */}
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="text-sm line-through"
                      style={{ color: GRAY_300 }}
                    >
                      {offer.oldPrice}
                    </span>
                    <span
                      className="text-2xl font-extrabold"
                      style={{
                        color: GRAY_800,
                      }}
                    >
                      {offer.price}
                    </span>
                    <span className="text-xs" style={{ color: GRAY_500 }}>
                      ج.م
                    </span>
                  </div>

                  {/* Stock Indicator */}
                  {isHighlight && (
                    <div
                      className="mt-3 pt-3 border-t"
                      style={{ borderColor: GRAY_100 }}
                    >
                      <div
                        className="flex justify-between text-[10px] mb-1"
                        style={{ color: GRAY_500 }}
                      >
                        <span>🔥 محدود</span>
                        <span>70%</span>
                      </div>
                      <div
                        className="w-full h-1 rounded-full overflow-hidden"
                        style={{ background: GRAY_100 }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: "70%",
                            background: primaryGradient,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    className={`mt-3 w-full py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isHovered ? "text-white shadow-lg" : ""
                    }`}
                    style={{
                      background: isHovered ? primaryGradient : GRAY_100,
                      color: isHovered ? "white" : GRAY_600,
                      boxShadow: isHovered
                        ? `0 4px 16px ${primaryColor}40`
                        : "none",
                    }}
                  >
                    {isHovered ? "اختر العرض 🛒" : "اختر العرض"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-10 text-center">
        <p
          className="text-sm flex items-center justify-center gap-2 px-6 py-3 rounded-full max-w-md mx-auto"
          style={{
            color: GRAY_500,
            background: `${primaryColor}8`,
            border: `1px solid ${primaryColor}20`,
          }}
        >
          <Clock className="w-4 h-4" style={{ color: primaryColor }} />
          {t(
            "offers.note",
            "أسعار خاصة للكميات الكبيرة - وفر أكثر مع كل قطعة إضافية",
          )}
        </p>
      </div>
    </div>
  );
}

export default Offers;