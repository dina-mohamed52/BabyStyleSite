import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
    alt: "Slide 1",
    titleKey: "carousel.slide1.title",
    subtitleKey: "carousel.slide1.subtitle",
  },
  {
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578818/5879927343848475497_f2vrqs.jpg",
    alt: "Slide 2",
    titleKey: "carousel.slide2.title",
    subtitleKey: "carousel.slide2.subtitle",
  },
  {
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784154/WhatsApp_Image_2026-02-22_at_3.25.31_AM_cynsay.jpg",
    alt: "Slide 3",
    titleKey: "carousel.slide3.title",
    subtitleKey: "carousel.slide3.subtitle",
  },
  {
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578733/5879927343848475498_hbb6kj.jpg",
    alt: "Slide 4",
    titleKey: "carousel.slide4.title",
    subtitleKey: "carousel.slide4.subtitle",
  },
  {
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575014/468075933_931535155737215_2422425145619665420_n_r6ulp9.jpg",
    alt: "Slide 5",
    titleKey: "carousel.slide5.title",
    subtitleKey: "carousel.slide5.subtitle",
  },
];

const CustomCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const autoplayRef = useRef(null);
  const totalSlides = images.length;

  const { t } = useTranslation();

  // ✅ احترام تفضيل تقليل الحركة
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // ✅ Autoplay — يوقف عند hover أو prefers-reduced-motion
  useEffect(() => {
    if (isHovering || prefersReducedMotion || totalSlides <= 1) return;

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovering, prefersReducedMotion, totalSlides]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  return (
    <div className="w-full relative">
      <div
        className="relative w-full group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* ✅ الـ slider — كل الصور في الـ DOM بـ opacity */}
        <div
          className="relative w-full h-[70vh] sm:h-[600px] overflow-hidden"
          role="region"
          aria-label="Hero carousel"
          aria-roledescription="carousel"
        >
          {images.map((image, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
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
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                    isHovering && isActive ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-32 z-20">
                  <div className="text-center">
                    <h3 className="text-4xl sm:text-6xl font-bold mb-4 text-white">
                      {t(image.titleKey)}
                    </h3>
                    <p className="text-xl sm:text-3xl text-gray-200 font-light mb-6">
                      {t(image.subtitleKey)}
                    </p>
                  </div>
                </div>

                {/* Slide Indicator */}
                <div className="absolute top-6 right-6 bg-black/50 px-4 py-2 rounded-full z-20">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <span>{index + 1}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{images.length}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Arrows — تظهر على hover */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute top-1/2 -translate-y-1/2 right-6 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="absolute top-1/2 -translate-y-1/2 left-6 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}

        {/* ✅ Dots — تحت */}
        {totalSlides > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-[30px] h-1 bg-white"
                    : "w-3 h-1 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;