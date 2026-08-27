import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Pencil, 
  Ruler, 
  Star, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  GraduationCap,
  Backpack,
  Heart,
  Clock,
  Scissors,
  PenTool,
  BookMarked,
  Paintbrush,
  Compass,
  Calculator,
  Globe,
  Palette,
  Tag,
  Ruler as RulerIcon,
  Brush,
  Eraser,
  NotebookPen
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { BackToSchoolData } from "../../data/BackToSchool";

const BackToSchoolHeroSec = ({scrollToOffers,scrollToProducts}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hanging ropes from ceiling - 3D effect with different lengths (responsive)
  const hangingItems = [
    { 
      icon: <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />, 
      x: "3%", 
      color: "text-pink-500", 
      bg: "bg-pink-100/90",
      ropeColor: "from-pink-400 to-pink-600",
      ropeLength: "h-36 sm:h-64",
      delay: 0,
      swingDuration: 3.2,
      shadowColor: "shadow-pink-500/30"
    },
    { 
      icon: <Pencil className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "12%", 
      color: "text-purple-500", 
      bg: "bg-purple-100/90",
      ropeColor: "from-purple-400 to-purple-600",
      ropeLength: "h-24 sm:h-32",
      delay: 0.3,
      swingDuration: 3.5,
      shadowColor: "shadow-purple-500/30"
    },
    { 
      icon: <Ruler className="w-7 h-7 sm:w-9 sm:h-9" />, 
      x: "21%", 
      color: "text-blue-500", 
      bg: "bg-blue-100/90",
      ropeColor: "from-blue-400 to-blue-600",
      ropeLength: "h-28 sm:h-40",
      delay: 0.6,
      swingDuration: 2.8,
      shadowColor: "shadow-blue-500/30"
    },
    { 
      icon: <Scissors className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "30%", 
      color: "text-pink-500", 
      bg: "bg-pink-100/90",
      ropeColor: "from-pink-400 to-pink-600",
      ropeLength: "h-20 sm:h-24",
      delay: 0.9,
      swingDuration: 3.3,
      shadowColor: "shadow-pink-500/30"
    },
    { 
      icon: <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />, 
      x: "45%", 
      color: "text-purple-500", 
      bg: "bg-purple-100/90",
      ropeColor: "from-purple-400 to-purple-600",
      ropeLength: "h-24 sm:h-36",
      delay: 0.2,
      swingDuration: 3.7,
      shadowColor: "shadow-purple-500/30"
    },
    { 
      icon: <BookMarked className="w-7 h-7 sm:w-9 sm:h-9" />, 
      x: "48%", 
      color: "text-blue-500", 
      bg: "bg-blue-100/90",
      ropeColor: "from-blue-400 to-blue-600",
      ropeLength: "h-22 sm:h-28",
      delay: 0.5,
      swingDuration: 3.1,
      shadowColor: "shadow-blue-500/30"
    },
    { 
      icon: <Paintbrush className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "57%", 
      color: "text-pink-500", 
      bg: "bg-pink-100/90",
      ropeColor: "from-pink-400 to-pink-600",
      ropeLength: "h-30 sm:h-44",
      delay: 0.8,
      swingDuration: 3.4,
      shadowColor: "shadow-pink-500/30"
    },
    { 
      icon: <Compass className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "66%", 
      color: "text-purple-500", 
      bg: "bg-purple-100/90",
      ropeColor: "from-purple-400 to-purple-600",
      ropeLength: "h-18 sm:h-24",
      delay: 0.4,
      swingDuration: 2.9,
      shadowColor: "shadow-purple-500/30"
    },
    { 
      icon: <Calculator className="w-7 h-7 sm:w-9 sm:h-9" />, 
      x: "75%", 
      color: "text-blue-500", 
      bg: "bg-blue-100/90",
      ropeColor: "from-blue-400 to-blue-600",
      ropeLength: "h-32 sm:h-20",
      delay: 0.7,
      swingDuration: 3.3,
      shadowColor: "shadow-blue-500/30"
    },
    { 
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "84%", 
      color: "text-pink-500", 
      bg: "bg-pink-100/90",
      ropeColor: "from-pink-400 to-pink-600",
      ropeLength: "h-28 sm:h-24",
      delay: 0.1,
      swingDuration: 3.6,
      shadowColor: "shadow-pink-500/30"
    },
    { 
      icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />, 
      x: "89%", 
      color: "text-purple-500", 
      bg: "bg-purple-100/90",
      ropeColor: "from-purple-400 to-purple-600",
      ropeLength: "h-48 sm:h-64",
      delay: 0.5,
      swingDuration: 3.0,
      shadowColor: "shadow-purple-500/30"
    },
  ];

  // Hanging items for mobile (less items, better visibility)
  const mobileHangingItems = hangingItems.filter((_, index) => index % 2 === 0);

  // Floating items that continuously fall from top
  const floatingItems = [
    { icon: <Star className="w-4 h-4 sm:w-6 sm:h-6" />, x: "6%", delay: 0, duration: 12, color: "text-yellow-400", bg: "bg-yellow-100/70" },
    { icon: <Palette className="w-4 h-4 sm:w-6 sm:h-6" />, x: "16%", delay: 0, duration: 14, color: "text-purple-400", bg: "bg-purple-100/70" },
    { icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, x: "26%", delay: 0.2, duration: 10, color: "text-pink-400", bg: "bg-pink-100/70" },
    { icon: <Brush className="w-4 h-4 sm:w-5 sm:h-5" />, x: "36%", delay: 0.3, duration: 13, color: "text-blue-400", bg: "bg-blue-100/70" },
    { icon: <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />, x: "46%", delay: 0.4, duration: 11, color: "text-pink-400", bg: "bg-pink-100/70" },
    { icon: <NotebookPen className="w-4 h-4 sm:w-6 sm:h-6" />, x: "56%", delay: 0.2, duration: 15, color: "text-purple-400", bg: "bg-purple-100/70" },
    { icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, x: "66%", delay: 0.5, duration: 12, color: "text-blue-400", bg: "bg-blue-100/70" },
    { icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />, x: "76%", delay: 0.4, duration: 11, color: "text-yellow-400", bg: "bg-yellow-100/70" },
    { icon: <Tag className="w-4 h-4 sm:w-5 sm:h-5" />, x: "86%", delay: 0.9, duration: 13, color: "text-pink-400", bg: "bg-pink-100/70" },
    { icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, x: "94%", delay: 0.1, duration: 14, color: "text-purple-400", bg: "bg-purple-100/70" },
  ];

  // Use BackToSchoolData for slides
  const slides = BackToSchoolData.map((item) => ({
    id: item.id,
    image: item.image,
    name: item.name,
    colors: item.avalibeColors,
    sizes: item.sizes,
    productColors: item.productColors,
  }));

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [isHovering, slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Get color for background based on slide index
  const getGradientColors = (index) => {
    const gradients = [
      "from-pink-100 via-purple-100 to-blue-100",
      "from-purple-100 via-pink-100 to-rose-100",
      "from-blue-100 via-indigo-100 to-purple-100",
      "from-rose-100 via-pink-100 to-purple-100",
      "from-yellow-100 via-orange-100 to-pink-100",
      "from-pink-100 via-purple-100 to-blue-100",
      "from-purple-100 via-blue-100 to-pink-100",
    ];
    return gradients[index % gradients.length];
  };

  const displayItems = isMobile ? mobileHangingItems : hangingItems;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-gradient-to-br ${getGradientColors(currentSlide)} transition-all duration-1000 min-h-[500px] sm:min-h-[600px]`}
    >
      {/* Hanging Ropes from Ceiling - 3D effect with responsive design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {displayItems.map((item, index) => (
          <div
            key={`hanging-${index}`}
            className="absolute animate-swing"
            style={{
              left: item.x,
              top: "-8%",
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.swingDuration}s`,
            }}
          >
            <div className="flex flex-col items-center">
              {/* 3D Rope with shadow and gradient - responsive */}
              <div className="relative">
                {/* Rope shadow */}
                <div className={`absolute left-0.5 top-0 w-0.5 ${item.ropeLength} bg-black/10 rounded-full blur-sm`}></div>
                {/* Main rope - looks like real rope */}
                <div className={`relative w-1 ${item.ropeLength} bg-gradient-to-b ${item.ropeColor} rounded-full shadow-lg`}>
                  {/* Rope texture lines - real rope effect */}
                  <div className="absolute inset-0 flex flex-col justify-around opacity-30">
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                  </div>
                  {/* Rope shine effect */}
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              {/* Rope knot with 3D effect */}
              <div className="relative -mt-0.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md border border-white/30"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/20 blur-sm"></div>
              </div>
              {/* Icon with 3D shadow - responsive */}
              <div className={`${item.bg} backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl ${item.shadowColor} border border-white/50 hover:scale-110 transition-transform duration-300 relative`}>
                {/* 3D shadow under icon */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${item.shadowColor} blur-xl opacity-50 -z-10`}></div>
                <div className={item.color}>
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Items - responsive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {floatingItems.map((item, index) => (
          <div
            key={`floating-${index}`}
            className={`absolute ${item.color} animate-float-down`}
            style={{
              left: isMobile ? parseFloat(item.x) - 5 + '%' : item.x,
              top: `${-10 - (index * 3)}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            <div className={`${item.bg} backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-lg border border-white/40`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #8B5CF6 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Container */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          
          {/* Left Side - Content */}
          <div className="relative z-10 order-2 lg:order-1">
            {/* Back to School Badge - responsive */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg shadow-purple-500/30 animate-pulse-slow">
              <Backpack className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>🎒 العودة إلى المدرسة</span>
              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
            </div>

            {/* Animated Title - responsive */}
            <div className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
                <span className="text-gray-800 text-sm sm:text-base lg:text-3xl xl:text-4xl">استعدي لعام</span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient text-xl sm:text-3xl lg:text-5xl xl:text-6xl">
                  دراسي مميز
                </span>
              </h1>
            </div>

            {/* Description - responsive */}
            <p className="text-gray-600 text-xs sm:text-base lg:text-xl mb-4 sm:mb-8 max-w-lg">
              تشكيلة كولونات أنيقة وعصرية لأطفالك في العودة إلى المدرسة.
              <span className="block text-purple-500 font-semibold mt-1 sm:mt-2 text-[10px] sm:text-base">
                ✨ جاهزين لأجمل سنة دراسية!
              </span>
            </p>

            {/* Stats - responsive */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center shadow-lg border border-purple-100/50 hover:scale-105 transition-transform duration-300">
                <div className="text-base sm:text-2xl font-bold text-purple-600">{slides.length}</div>
                <div className="text-[8px] sm:text-xs text-gray-500">تصميم</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center shadow-lg border border-pink-100/50 hover:scale-105 transition-transform duration-300">
                <div className="text-base sm:text-2xl font-bold text-pink-600">
                  {new Set(slides.flatMap(s => s.colors || [])).size}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500">لون</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center shadow-lg border border-blue-100/50 hover:scale-105 transition-transform duration-300">
                <div className="text-base sm:text-2xl font-bold text-blue-600">%30</div>
                <div className="text-[8px] sm:text-xs text-gray-500">خصم</div>
              </div>
            </div>

            {/* CTA Buttons - responsive */}
            {/* CTA Buttons - responsive */}
<div className="flex flex-wrap gap-2 sm:gap-4">
  <button 
    onClick={scrollToOffers}
    className="group relative px-4 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-base shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
      تسوقي الآن
      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-spin-slow" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
  </button>
  
  <button 
    onClick={scrollToProducts}
    className="px-4 sm:px-8 py-2.5 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-600 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-base hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105"
  >
    <span className="flex items-center gap-1.5 sm:gap-2">
      <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
      اكتشفي المزيد
    </span>
  </button>
</div>
</div>

          {/* Right Side - Image Carousel - responsive */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              {/* Current Slide */}
              <div className="relative w-full h-full">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].name}
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                {/* Slide Info - responsive */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[90%] max-w-xs">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-2xl border border-white/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <h3 className="text-[10px] sm:text-sm font-bold text-gray-800 truncate">
                        {slides[currentSlide].name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                      {slides[currentSlide].colors && slides[currentSlide].colors.length > 0 && (
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {slides[currentSlide].colors.slice(0, 3).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full border border-gray-200 shadow-sm"
                              style={{ 
                                backgroundColor: getColorCode(color),
                                border: color === 'أبيض' ? '1px solid #E5E7EB' : 'none'
                              }}
                              title={color}
                            />
                          ))}
                          {slides[currentSlide].colors.length > 3 && (
                            <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium">
                              +{slides[currentSlide].colors.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="w-px h-3 sm:h-4 bg-gray-200"></div>

                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <RulerIcon className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400" />
                        <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">
                          {slides[currentSlide].sizes?.length || 0} مقاسات
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-100/50 flex items-center justify-between">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Tag className="w-2 h-2 sm:w-3 sm:h-3 text-pink-500" />
                        <span className="text-[8px] sm:text-[10px] text-gray-400">عرض خاص</span>
                      </div>
                      <span className="text-[8px] sm:text-[10px] text-pink-500 font-medium bg-pink-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                        خصم 30%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slide Number - responsive */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/40 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                  <span className="text-white text-[8px] sm:text-[10px] font-medium">
                    {currentSlide + 1}/{slides.length}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows - responsive */}
              <button
                onClick={prevSlide}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>

              {/* Dots - responsive */}
              <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-4 sm:w-6 h-1 sm:h-1.5 bg-white"
                        : "w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style */}
      <style jsx>{`
        @keyframes swing {
          0% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
          100% { transform: translateY(0) rotate(-4deg); }
        }
        .animate-swing {
          animation: swing ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes float-down {
          0% {
            transform: translateY(-100vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg) scale(1.1);
            opacity: 0;
          }
        }
        .animate-float-down {
          animation: float-down linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

// Helper function for color codes
function getColorCode(colorName) {
  const colorMap = {
    'أبيض': '#FFFFFF',
    'أسود': '#000000',
    'بينك': '#F6A6C1',
    'وردي': '#FFB6C1',
    'احمر': '#D6483D',
    'لافندر': '#C9BBEE',
    'اصفر': '#FBCB5C',
    'بيج': '#FFF0DB',
    'سكري': '#FFF0DB',
    'كيوي': '#9CC084',
    'اورنج': '#F0924A',
    'لبني': '#BFD7EA',
    'نبيتي': '#6B2D5E',
    'أوف وايت': '#FDF5E6',
    'كحلي': '#1E2F4F',
    'رصاصي': '#9CA3AF',
    'أحمر': '#D6483D',
    'أصفر': '#FBCB5C',
  };
  return colorMap[colorName] || '#E5E7EB';
}

// ShoppingBag icon component
const ShoppingBag = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export default BackToSchoolHeroSec;