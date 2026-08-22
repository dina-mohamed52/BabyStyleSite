import { useState, useEffect, useRef } from "react";
import { X, Calendar, Sparkles, Shirt, ShoppingBag, Timer, Star, Gift, Book, Pen, Ruler, School } from "lucide-react";
import { Clothes } from "../data/Clothes";
import { BandanaTurbonData } from "../data/Turbon";

// ===============================================================

function Pin({ className = "" }) {
  return (
    <span
      className={`absolute w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full z-20 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #fff 0%, #ffd23f 25%, #e0a900 70%, #8a6600 100%)",
        boxShadow: "0 2px 3px rgba(0,0,0,0.45)",
      }}
    />
  );
}

function Sticker({ children, className = "", rotate = 0, bg }) {
  return (
    <div
      className={`absolute select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative">
        <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />
        <div
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-base sm:text-2xl border-2 sm:border-[3px] border-white"
          style={{
            background: bg,
            boxShadow:
              "0 10px 18px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ✅ مكون الصورة العائمة الجانبية (حجم أكبر)
function FloatingProductImage({ src, alt, className = "", delay = 0, size = "large" }) {
   const sizeClasses = {
    small: "w-14 h-14 sm:w-24 sm:h-24",
    medium: "w-16 h-16 sm:w-32 sm:h-32",
    large: "w-20 h-20 sm:w-36 sm:h-36",
  };

  return (
    <div
      className={`absolute ${className}`}
      style={{
        animation: `floatImage ${4 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div className="relative mt-10 sm:px-8 px-4">
        <div className={`${sizeClasses[size]} rounded-xl sm:rounded-2xl
         overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-3
          border-white/90 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl`}
          style={{
            transform: `rotate(${(Math.random() - 0.5) * 8}deg)`,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-pink-300/30 to-blue-300/30 rounded-xl sm:rounded-2xl blur-md -z-10" />
      </div>
    </div>
  );
}

// ✅ مكون الأكسسوارات المعلقة من فوق
function HangingAccessory({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        animation: `swing ${3 + Math.random() * 1.5}s ease-in-out ${delay}s infinite`,
        transformOrigin: "top center",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* خيط التعليق */}
        <div className="w-[2px] h-4 sm:h-6 bg-gradient-to-b from-gray-400 to-transparent" />
        {/* الأكسسوار */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2.5 shadow-lg border-2 border-white/50 hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BackToSchoolModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // ✅ جمع صور المنتجات من البيانات
  const getAllProductImages = () => {
    const images = [];
    
    Clothes.forEach(item => {
      if (item.image) {
        images.push({ src: item.image, alt: item.name });
      }
      if (item.productColors && item.productColors.length > 0) {
        item.productColors.forEach(color => {
          if (color.img) {
            images.push({ src: color.img, alt: item.name });
          }
        });
      }
    });
    
    BandanaTurbonData.forEach(item => {
      if (item.image) {
        images.push({ src: item.image, alt: item.name });
      }
      if (item.productColors && item.productColors.length > 0) {
        item.productColors.forEach(color => {
          if (color.img) {
            images.push({ src: color.img, alt: item.name });
          }
        });
      }
    });
    
    return images;
  };

  const productImages = getAllProductImages();
  
  const getRandomImages = (count = 7) => {
    const shuffled = [...productImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const randomImages = getRandomImages(7);

  // ✅ دالة إغلاق المودال
  const handleClose = () => {
    setIsOpen(false);
    // إعادة التركيز للعنصر السابق
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  // ✅ التعامل مع الضغط على ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // ✅ التركيز على زر الإغلاق عند فتح المودال
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // ✅ ظهور المودال
  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  // ✅ العد التنازلي
  useEffect(() => {
    if (!isOpen) return;
    const int = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(int);
  }, [isOpen]);

  // ✅ منع التمرير
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      dir="rtl" 
      className="fixed inset-0 z-[9999] font-[Cairo,sans-serif] flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Changa:wght@600;700;800&family=Cairo:wght@500;600;700;800&display=swap');
        .display-font { font-family: 'Changa', 'Cairo', sans-serif; }
        .body-font { font-family: 'Cairo', sans-serif; }
        
        @keyframes fadeIn { 
          from { opacity: 0 } 
          to { opacity: 1 } 
        }
        
        @keyframes riseIn { 
          from { opacity: 0; transform: translateY(18px) scale(.95) } 
          to { opacity: 1; transform: translateY(0) scale(1) } 
        }
        
        @keyframes floaty { 
          0%,100% { transform: translateY(0) rotate(var(--r,0deg)) } 
          50% { transform: translateY(-6px) rotate(var(--r,0deg)) } 
        }
        
        @keyframes floatImage {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes swing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        
        .fade-in { animation: fadeIn .35s ease-out; }
        .rise-in { animation: riseIn .45s cubic-bezier(.2,.8,.2,1); }
        .floaty { animation: floaty 3.6s ease-in-out infinite; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        
        @media (prefers-reduced-motion: reduce) {
          .fade-in, .rise-in, .floaty, .sparkle, .swing { animation: none !important; }
        }
      `}</style>

      {/* ✅ خلفية معتمة - الضغط عليها يغلق المودال */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm fade-in cursor-pointer"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ✅ خلفية مبهجة بيبي بينك وبيبي بلو */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[98vh] sm:max-h-[95vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
        role="document"
      >
        {/* الخلفية بتدرج بيبي بينك وبيبي بلو */}
        <div
          className="absolute inset-0 fade-in"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%),
              linear-gradient(135deg, #FFE4E9 0%, #FFD6E0 25%, #F8D6E8 50%, #D6E8F8 75%, #C5E0F0 100%)
            `,
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease-in-out infinite",
          }}
        />
        
        {/* عناصر زخرفية مبهجة */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[8%] w-20 h-20 bg-pink-300/20 rounded-full blur-2xl" />
          <div className="absolute bottom-[15%] left-[5%] w-28 h-28 bg-blue-300/20 rounded-full blur-2xl" />
          <div className="absolute top-[40%] left-[20%] w-16 h-16 bg-yellow-200/20 rounded-full blur-xl" />
          <div className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-purple-200/20 rounded-full blur-xl" />
          
          <Sparkles className="absolute top-[12%] left-[15%] w-4 h-4 text-pink-300/60 sparkle" />
          <Sparkles className="absolute top-[25%] right-[20%] w-3 h-3 text-blue-300/60 sparkle" style={{ animationDelay: "0.5s" }} />
          <Sparkles className="absolute bottom-[20%] left-[25%] w-4 h-4 text-yellow-300/60 sparkle" style={{ animationDelay: "1s" }} />
          <Sparkles className="absolute bottom-[35%] right-[18%] w-3 h-3 text-purple-300/60 sparkle" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* ✅ لوجو/بادج "العودة للمدرسة" في الشمال */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-[#FF8FAB] to-[#FF5A8A] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg shadow-[#FF5A8A]/30 flex items-center gap-1.5 sm:gap-2 border-2 border-white/50">
            <School className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-sm font-bold" id="modal-title">العودة للمدرسة</span>
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>

        {/* ✅ أكسسوارات مدرسية معلقة من فوق */}
        <HangingAccessory className="top-1 sm:top-2 right-[18%] sm:right-[22%]" delay={0}>
          <Book className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF5A8A]" />
        </HangingAccessory>
        <HangingAccessory className="top-1 sm:top-2 right-[8%] sm:right-[12%]" delay={0.5}>
          <Pen className="w-4 h-4 sm:w-6 sm:h-6 text-[#4A9FC7]" />
        </HangingAccessory>
        <HangingAccessory className="top-1 sm:top-2 left-[8%] sm:left-[12%]" delay={1}>
          <Ruler className="w-4 h-4 sm:w-6 sm:h-6 text-[#FFD93D]" />
        </HangingAccessory>
        <HangingAccessory className="top-1 sm:top-2 left-[18%] sm:left-[22%]" delay={1.5}>
          <span className="text-lg sm:text-3xl">🎒</span>
        </HangingAccessory>

        {/* ✅ صور المنتجات العائمة الجانبية (حجم أكبر) */}
        {randomImages.length >= 7 && (
          <>
            <FloatingProductImage
              src={randomImages[0].src}
              alt={randomImages[0].alt}
              className="top-[6%] right-[0%] sm:top-[4%] sm:right-[2%]"
              delay={0}
              size="large"
            />
            <FloatingProductImage
              src={randomImages[1].src}
              alt={randomImages[1].alt}
              className="top-[5%] left-[0%] sm:top-[8%] sm:left-[2%]"
              delay={0.7}
              size="large"
            />
            <FloatingProductImage
              src={randomImages[2].src}
              alt={randomImages[2].alt}
              className="top-[26%] right-[0%] sm:top-[30%] sm:right-[1%]"
              delay={1.4}
              size="medium"
            />
            <FloatingProductImage
              src={randomImages[3].src}
              alt={randomImages[3].alt}
              className="top-[24%] left-[0%] sm:top-[28%] sm:left-[1%]"
              delay={1.8}
              size="medium"
            />
            <FloatingProductImage
              src={randomImages[4].src}
              alt={randomImages[4].alt}
              className="bottom-[8%] right-[0%] sm:bottom-[6%] sm:right-[2%]"
              delay={0.5}
              size="large"
            />
            <FloatingProductImage
              src={randomImages[5].src}
              alt={randomImages[5].alt}
              className="bottom-[15%] left-[0%] sm:bottom-[10%] sm:left-[2%]"
              delay={1.2}
              size="large"
            />
            <FloatingProductImage
              src={randomImages[6].src}
              alt={randomImages[6].alt}
              className="bottom-[25%] right-[16%] sm:bottom-[16%] sm:right-[18%]"
              delay={2.0}
              size="medium"
            />
          </>
        )}

     
       

        {/* ✅ زر الإغلاق - مع إمكانية التركيز عليه */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF5A8A] focus:ring-offset-2"
          aria-label="إغلاق النافذة"
          tabIndex={0}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* المحتوى الرئيسي */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-3 py-4 sm:px-6 sm:py-8">
          <div className="rise-in w-full max-w-sm flex flex-col items-center">
            {/* شريط لاصق فوق العنوان */}
            <div
              className="w-16 h-4 sm:w-20 sm:h-5 -mb-2 sm:-mb-3 z-20 opacity-90"
              style={{
                background:
                  "repeating-linear-gradient(45deg,#FFB6C1,#FFB6C1 6px,#FF9EB5 6px,#FF9EB5 12px)",
                transform: "rotate(-4deg)",
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              }}
            />

            {/* العنوان */}
            <div className="text-center relative mt-4">
              <Star className="absolute -top-3 -right-4 sm:-top-4 sm:-right-6 w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF6B8A] animate-pulse fill-[#FF6B8A]" />
              <Star className="absolute -top-1.5 -left-4 sm:-top-2 sm:-left-6 w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#4A9FC7] animate-pulse delay-150 fill-[#4A9FC7]" />
              
              <h2
                id="modal-title"
                className="display-font text-2xl sm:text-4xl font-extrabold text-[#4A2B5C] leading-tight"
                style={{ textShadow: "0 2px 0 #FF8FAB30, 0 4px 12px rgba(0,0,0,0.08)" }}
              >
                عروض العودة
              </h2>
              <h3
                className="display-font text-2xl sm:text-4xl font-extrabold leading-tight -mt-1"
                style={{
                  color: "#FF5A8A",
                  textShadow: "0 2px 0 #FF8FAB30, 0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                للمدرسة
              </h3>
            </div>

            {/* تاريخ العرض */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mt-3 sm:mt-4 shadow-lg border border-white/50">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5A8A]" />
              <span className="body-font text-[10px] sm:text-sm font-bold text-[#4A2B5C]">
                ١٩ أغسطس – ٠٦ سبتمبر
              </span>
            </div>

            {/* تشكيلة المنتجات */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 body-font bg-white/60 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1 border border-white/30">
              <div className="flex -space-x-1.5 sm:-space-x-2 rtl:space-x-reverse">
                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center bg-gradient-to-br from-[#FF8FAB] to-[#FF5A8A] text-white text-[10px] sm:text-sm shadow">
                  <Shirt className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center bg-gradient-to-br from-[#7EC8E3] to-[#4A9FC7] text-white text-sm sm:text-base shadow">
                  👖
                </span>
              </div>
              <span className="text-[10px] sm:text-sm font-semibold text-[#4A2B5C]">
                تيشرتات وكولونات بناتي
              </span>
            </div>

            {/* ختم الخصم */}
            <div
              className="relative mt-3 sm:mt-4 w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{
                clipPath:
                  "polygon(50% 0%,61% 7%,73% 2%,79% 13%,92% 13%,93% 26%,100% 35%,93% 45%,97% 57%,87% 63%,88% 76%,75% 76%,69% 88%,58% 82%,50% 93%,42% 82%,31% 88%,25% 76%,12% 76%,13% 63%,3% 57%,7% 45%,0% 35%,7% 26%,8% 13%,21% 13%,27% 2%,39% 7%)",
                background: "linear-gradient(160deg,#FF8FAB 0%,#FF5A8A 50%,#E8436A 100%)",
                boxShadow: "0 10px 24px rgba(255,90,138,0.4)",
              }}
            >
              <div className="text-center relative z-10">
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/90" />
                  <span className="body-font text-[8px] sm:text-[10px] font-bold text-white/95">
                    خصم يوصل لـ
                  </span>
                </div>
                <div className="display-font text-3xl sm:text-5xl font-black text-white leading-none">
                  ٪٧٠
                </div>
                <p className="body-font text-[8px] sm:text-[10px] text-white/95 mt-0.5">
                  على تشكيلة العودة للمدرسة
                </p>
              </div>
            </div>

            {/* العداد التنازلي */}
            <div className="text-center mt-3 sm:mt-4">
              <p className="body-font text-[9px] sm:text-[11px] text-[#4A2B5C]/70 mb-0.5 sm:mb-1">
                ينتهي العرض خلال
              </p>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 shadow-lg border border-white/50">
                <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5A8A]" />
                <span className="font-mono text-base sm:text-xl font-bold text-[#4A2B5C]">
                  {formatTime(countdown)}
                </span>
              </div>
            </div>

            {/* زر التسوق */}
            <button
              className="body-font mt-4 sm:mt-5 w-full max-w-xs bg-gradient-to-r from-[#FF8FAB] to-[#FF5A8A] text-white font-bold py-2.5 sm:py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg shadow-[#FF5A8A]/30 flex items-center justify-center gap-1.5 sm:gap-2 group text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A8A] focus:ring-offset-2"
              onClick={() => {
                window.location.href = "/offers";
              }}
              tabIndex={0}
            >
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>تسوقي العروض الآن</span>
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <p className="body-font text-center text-[8px] sm:text-[10px] text-[#4A2B5C]/50 mt-1.5 sm:mt-2">
              * العرض ساري حتى ٠٦ سبتمبر أو نفاذ الكمية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}