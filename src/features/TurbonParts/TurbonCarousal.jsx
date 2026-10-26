import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BandanaTurbonData } from "../../data/Turbon";
import {
  Flower2,
  Ribbon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TurbonCarousal = ({ category }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  // ✅ دالة للحصول على الصور حسب الكاتيجوري
  const getCarouselImages = () => {
    let filteredProducts = [];

    if (!category || category === "all") {
      filteredProducts = BandanaTurbonData;
    } else {
      filteredProducts = BandanaTurbonData.filter((product) => {
        const productCategory = product.category || "";
        switch (category) {
          case "bandana":
            return productCategory === "bandana";
          case "turbon":
            return productCategory === "turbon";
          case "bandana-set":
            return productCategory === "bandana-set";
          case "turbon-set":
            return productCategory === "turbon-set";
          default:
            return true;
        }
      });
    }

    let images = [];

    filteredProducts.forEach((product) => {
      if (product.image) {
        images.push({
          src: product.image,
          alt: product.name || "منتج",
          titleKey: product.name || "منتج جديد",
          subtitleKey:
            product.type === "flower"
              ? "🌸 ورده ناعمة"
              : product.type === "bow"
              ? "🎀 فيونكه أنيقة"
              : product.type === "set-bandana"
              ? "👗 طقم بندانات"
              : product.type === "set-turbon"
              ? "👗 طقم تربونات"
              : "✨ تصميم مميز",
          productId: product.id,
          type: product.type || "ribbon",
        });
      }

      if (product.productColors && product.productColors.length > 0) {
        const colorsToShow = product.productColors.slice(0, 4);
        colorsToShow.forEach((color, index) => {
          if (color.img) {
            images.push({
              src: color.img,
              alt: `${product.name} - لون ${index + 1}`,
              titleKey: product.name || "منتج جديد",
              subtitleKey: `🎨 لون مميز من ${product.name}`,
              productId: `${product.id}-color-${index}`,
              type: product.type || "ribbon",
              isColor: true,
            });
          }
        });
      }
    });

    return images;
  };

  const images = getCarouselImages();
  const totalSlides = images.length;

  // ✅ دوال التنقل
  const goToSlide = useCallback(
    (index) => {
      if (totalSlides === 0) return;
      setCurrentSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // ✅ Autoplay — بإيقاف عند hover وعند prefers-reduced-motion
  useEffect(() => {
    if (totalSlides <= 1) return;
    if (isPaused) return;

    // احترام تفضيل المستخدم لتقليل الحركة
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [totalSlides, isPaused]);

  // ✅ لو الكاتيجوري اتغير، نرجع لأول صورة
  useEffect(() => {
    setCurrentSlide(0);
  }, [category]);

  const getTypeIcon = (type) => {
    if (type === "flower") return <Flower2 className="w-4 h-4 text-pink-600" />;
    if (type === "bow") return <Ribbon className="w-4 h-4 text-purple-600" />;
    if (type === "set-bandana")
      return <Flower2 className="w-4 h-4 text-green-600" />;
    if (type === "set-turbon")
      return <Ribbon className="w-4 h-4 text-blue-600" />;
    return <Ribbon className="w-4 h-4 text-purple-600" />;
  };

  const getTypeBadgeColor = (type) => {
    if (type === "flower")
      return "bg-pink-500/30 border-pink-400/30 text-pink-700";
    if (type === "bow")
      return "bg-purple-500/30 border-purple-400/30 text-purple-700";
    if (type === "set-bandana")
      return "bg-green-500/30 border-green-400/30 text-green-700";
    if (type === "set-turbon")
      return "bg-blue-500/30 border-blue-400/30 text-blue-700";
    return "bg-purple-500/30 border-purple-400/30 text-purple-700";
  };

  const getTypeLabel = (type) => {
    if (type === "flower") return "ورده";
    if (type === "bow") return "فيونكه";
    if (type === "set-bandana") return "طقم بندانات";
    if (type === "set-turbon") return "طقم تربونات";
    return "فيونكه";
  };

  const getPageTitle = () => {
    switch (category) {
      case "bandana":
        return "بندانات";
      case "turbon":
        return "تربونات";
      case "bandana-set":
        return "طقم بندانات";
      case "turbon-set":
        return "طقم تربونات";
      default:
        return "تشكيلتنا";
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full max-w-[95vw] mx-auto relative mt-20 sm:mt-6 px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 bg-white/50 backdrop-blur-sm p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="w-16 h-16 text-pink-400 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-700">لا توجد منتجات</h3>
            <p className="text-gray-500">
              لم يتم العثور على منتجات في قسم {getPageTitle()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto relative mt-20 sm:mt-6 px-4">
      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10">
          {/* ✅ الـ slider نفسه — كل الصور موجودة في الـ DOM بـ opacity، مفيش unmount */}
          <div
            className="relative w-full h-[75vh] sm:h-[550px] lg:h-[600px] overflow-hidden"
            role="region"
            aria-label="Carousel"
            aria-roledescription="carousel"
          >
            {images.map((image, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={`${image.productId}-${index}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-contain"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 via-40% to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20"></div>

                  <div className="absolute top-10 left-10 opacity-20">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute bottom-40 right-10 opacity-10">
                    {getTypeIcon(image.type)}
                    <div className="w-24 h-24 rounded-full border-2 border-white/10"></div>
                  </div>

                  <div
                    className={`absolute top-6 left-6 z-20 px-4 py-2 rounded-full backdrop-blur-md border ${getTypeBadgeColor(
                      image.type
                    )} flex items-center gap-2`}
                  >
                    {getTypeIcon(image.type)}
                    <span className="text-sm font-medium">
                      {getTypeLabel(image.type)}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 z-20">
                    <span className="text-white text-sm font-medium tracking-wider">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(images.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute bottom-16 left-0 right-0 text-center text-white z-10 px-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-pink-400"></div>
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-pink-400"></div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-3 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white">
                          {image.titleKey}
                        </span>
                      </h3>

                      <p className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-200 tracking-wide">
                        {image.subtitleKey}
                      </p>

                      <div className="mt-6 inline-block">
                        <button className="px-8 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
                          تسوق الآن →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ أزرار التنقل — تظهر على hover */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* ✅ Dots — تحت */}
          {totalSlides > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-400 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-2 bg-gradient-to-r from-pink-400 to-rose-500"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* ✅ Progress Bar */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm z-20">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${((currentSlide + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurbonCarousal;