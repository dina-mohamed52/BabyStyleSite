import { useState } from "react";
import { Package, Shirt, Sparkles, ShoppingBag, Flame, TrendingUp, Zap } from "lucide-react";
import { ClothesOffersData } from "./ClothesOfferesData";

function ClothesOffers({ 
  setSelectedOffer, 
  scrollToOrderCollection,
  category = null // ✅ إضافة category
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ✅ تصفية العروض بناءً على الكاتيجوري
  const filteredOffers = ClothesOffersData.filter(offer => {
    if (!category) return true; // إذا لم يوجد كاتيجوري، اعرض الكل
    
    // ✅ تطابق الكاتيجوري مع tabType
    return offer.tabType === category;
  });

  const getOfferIcon = (type) => {
    switch(type) {
      case "legging": return <Package className="w-5 h-5" />;
      case "short": return <Shirt className="w-5 h-5" />;
      case "top": return <Sparkles className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "legging": return "from-pink-400 to-rose-400";
      case "short": return "from-purple-400 to-violet-400";
      case "top": return "from-amber-400 to-orange-400";
      default: return "from-pink-400 to-rose-400";
    }
  };

  const getTypeLightColor = (type) => {
    switch(type) {
      case "legging": return "bg-pink-50";
      case "short": return "bg-purple-50";
      case "top": return "bg-amber-50";
      default: return "bg-pink-50";
    }
  };

  const getTypeTextColor = (type) => {
    switch(type) {
      case "legging": return "text-pink-500";
      case "short": return "text-purple-500";
      case "top": return "text-amber-500";
      default: return "text-pink-500";
    }
  };

  const handleSelect = (offer) => {
    console.log("Offer selected:", offer);
    if (setSelectedOffer) {
      setSelectedOffer(offer);
    }
    if (scrollToOrderCollection) {
      setTimeout(() => {
        scrollToOrderCollection();
      }, 100);
    }
  };

  // ✅ عرض رسالة إذا لم توجد عروض للكاتيجوري
  if (filteredOffers.length === 0) {
    return (
      <div dir="rtl" style={{ padding: "40px 0", textAlign: "center" }}>
        <p style={{ color: "#8A6E86", fontSize: "16px" }}>
          لا توجد عروض متاحة لهذه الفئة حالياً
        </p>
      </div>
    );
  }

  return (
    <div 
      dir="rtl" 
      style={{ 
        background: "linear-gradient(160deg, #FFF8F0 0%, #FFEFE8 50%, #FFF5F0 100%)",
        padding: "60px 0 80px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Styles and Background Decorations... */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&family=Cairo:wght@400;500;600;700&display=swap');

        .offers-display-font { font-family: 'Baloo Bhaijaan 2', 'Cairo', sans-serif; }
        .offers-body-font { font-family: 'Cairo', sans-serif; }

        @keyframes offersSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .offers-slide-up { animation: offersSlideUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .offers-card {
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease;
          will-change: transform;
        }
        .offers-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 28px 50px -18px rgba(59,31,56,0.25) !important;
        }

        @media (max-width: 640px) {
          .offers-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 12px !important;
          }
          .offers-header h2 {
            font-size: 24px !important;
          }
          .offers-header p {
            font-size: 13px !important;
            padding: 0 16px !important;
          }
          .offers-price {
            font-size: 26px !important;
          }
          .offers-card-content {
            padding: 16px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* Background Blobs */}
      <div
        style={{
          position: "absolute",
          width: "min(500px, 60vw)",
          height: "min(500px, 60vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #F6A6C1, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.15,
          top: -80,
          right: -60,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "min(400px, 50vw)",
          height: "min(400px, 50vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #C9BBEE, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.12,
          bottom: -60,
          left: -40,
          zIndex: 0,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 offers-header">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 offers-slide-up"
            style={{
              background: "linear-gradient(135deg, #FBCB5C, #F5A623)",
              color: "#3B1F38",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 4px 14px rgba(251,203,92,0.3)",
            }}
          >
            <Zap className="w-4 h-4" />
            <span className="offers-body-font">عروض الحزم</span>
          </div>
          <h2 className="offers-display-font text-3xl md:text-4xl font-bold" style={{ color: "#3B1F38" }}>
            {category === "top" && "اختاري توبات صيفية"}
            {category === "legging" && "اختاري ليجينز مريحة"}
            {category === "short" && "اختاري شورتات عصرية"}
            {!category && "اختاري الكمية المناسبة لكِ"}
          </h2>
          <p className="offers-body-font text-gray-500 mt-2 text-sm max-w-md mx-auto" style={{ color: "#5B4458" }}>
            {category === "top" && "تصاميم أنيقة تناسب بناتك الصغار في كل المناسبات"}
            {category === "legging" && "مريحة وأنيقة، مثالية للعب والحركة اليومية"}
            {category === "short" && "تصاميم عصرية تناسب أيام الصيف الحارة"}
            {!category && "كلما زادت الكمية، زاد التوفير! استفيدي من عروضنا المميزة"}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 offers-grid">
          {filteredOffers.map((offer, index) => {
            const savingsPercentage = offer.savings > 0 
              ? Math.round((offer.savings / offer.originalPrice) * 100)
              : 0;
            const pricePerItem = Math.round(offer.price / offer.quantity);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`offers-card bg-white rounded-3xl border border-white/60 overflow-hidden shadow-lg shadow-gray-100/30 cursor-pointer ${
                  isHovered ? "ring-2 ring-pink-400/50" : ""
                }`}
                style={{ 
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0,
                  animation: `offersSlideUp 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.08}s forwards`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(offer)}
              >
                {/* Gradient Top Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${getTypeColor(offer.tabType)}`}></div>

                {/* Content */}
                <div className="p-6 offers-card-content">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl ${getTypeLightColor(offer.tabType)}`}>
                        <div className={getTypeTextColor(offer.tabType)}>
                          {getOfferIcon(offer.tabType)}
                        </div>
                      </div>
                      <div>
                        <h3 className="offers-body-font font-bold" style={{ color: "#3B1F38" }}>{offer.name}</h3>
                        <span className="offers-body-font text-xs" style={{ color: "#8A6E86" }}>{offer.quantity} قطعة</span>
                      </div>
                    </div>
                    
                    {offer.popular && (
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 offers-body-font">رائج</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-end gap-3">
                      <span className="offers-display-font text-3xl font-bold offers-price" style={{ color: "#3B1F38" }}>
                        {offer.price} 
                        <span className="offers-body-font text-sm font-normal" style={{ color: "#8A6E86" }}> ج.م</span>
                      </span>
                      {offer.savings > 0 && (
                        <span className="offers-body-font text-sm line-through" style={{ color: "#B65C7C" }}>
                          {offer.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="offers-body-font text-xs" style={{ color: "#8A6E86" }}>سعر القطعة</span>
                      <span className="offers-body-font text-sm font-semibold" style={{ color: "#5B4458" }}>{pricePerItem} ج.م</span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  {offer.savings > 0 && (
                    <div className="flex items-center gap-2 bg-emerald-50/70 px-3 py-2 rounded-xl mb-4 border border-emerald-200/30">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="offers-body-font text-sm font-medium text-emerald-700">
                        وفر {offer.savings} ج.م 
                        <span className="text-emerald-500 mr-1">({savingsPercentage}%)</span>
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button 
                    className="offers-cta w-full py-3.5 rounded-2xl text-white font-medium offers-body-font flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #3B1F38 0%, #6B2D5E 50%, #3B1F38 100%)",
                      backgroundSize: "200% 200%",
                      transition: "all 0.3s ease",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundPosition = "100% 100%";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 16px 36px -12px rgba(59,31,56,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundPosition = "0% 0%";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(offer);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    اختر العرض
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ClothesOffers;