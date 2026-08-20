import { Carousel } from "antd";
import { useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BandanaTurbonData } from "../../data/Turbon";
import { Flower2, Ribbon, Sparkles } from "lucide-react";

const TurbonCarousal = ({ category }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // ✅ دالة للحصول على الصور حسب الكاتيجوري
  const getCarouselImages = () => {
    let filteredProducts = [];

    // ✅ لو مفيش كاتيجوري أو الكاتيجوري "all" → اعرض الكل
    if (!category || category === 'all') {
      filteredProducts = BandanaTurbonData;
    } else {
      // ✅ فلترة دقيقة حسب الكاتيجوري
      filteredProducts = BandanaTurbonData.filter(product => {
        const productCategory = product.category || '';
        
        switch (category) {
          case 'bandana':
            return productCategory === 'bandana';
          case 'turbon':
            return productCategory === 'turbon';
          case 'bandana-set':
            return productCategory === 'bandana-set';
          case 'turbon-set':
            return productCategory === 'turbon-set';
          default:
            return true;
        }
      });
    }

    // ✅ بناء مصفوفة الصور من المنتجات وألوانها
    let images = [];

    filteredProducts.forEach((product) => {
      // ✅ نضيف الصورة الرئيسية للمنتج
      if (product.image) {
        images.push({
          src: product.image,
          alt: product.name || 'منتج',
          titleKey: product.name || 'منتج جديد',
          subtitleKey: product.type === "flower" ? "🌸 ورده ناعمة" : 
                       product.type === "bow" ? "🎀 فيونكه أنيقة" : 
                       product.type === "set-bandana" ? "👗 طقم بندانات" :
                       product.type === "set-turbon" ? "👗 طقم تربونات" :
                       "✨ تصميم مميز",
          productId: product.id,
          type: product.type || 'ribbon',
        });
      }

      // ✅ نضيف صور الألوان المتاحة (productColors)
      if (product.productColors && product.productColors.length > 0) {
        // نأخذ أول 4 ألوان فقط عشان ما نكررش كتير
        const colorsToShow = product.productColors.slice(0, 4);
        colorsToShow.forEach((color, index) => {
          if (color.img) {
            images.push({
              src: color.img,
              alt: `${product.name} - لون ${index + 1}`,
              titleKey: product.name || 'منتج جديد',
              subtitleKey: `🎨 لون مميز من ${product.name}`,
              productId: `${product.id}-color-${index}`,
              type: product.type || 'ribbon',
              isColor: true,
            });
          }
        });
      }
    });

    // ✅ خلط الصور عشان تظهر بشكل متنوع
    // (اختياري - لو عايز ترتيب معين امسح السطرين دول)
    // images = images.sort(() => Math.random() - 0.5);

    return images;
  };

  const images = getCarouselImages();

  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to);
  };

  const getTypeIcon = (type) => {
    if (type === "flower") {
      return <Flower2 className="w-4 h-4 text-pink-600" />;
    } else if (type === "bow") {
      return <Ribbon className="w-4 h-4 text-purple-600" />;
    } else if (type === "set-bandana") {
      return <Flower2 className="w-4 h-4 text-green-600" />;
    } else if (type === "set-turbon") {
      return <Ribbon className="w-4 h-4 text-blue-600" />;
    }
    return <Ribbon className="w-4 h-4 text-purple-600" />;
  };

  const getTypeBadgeColor = (type) => {
    if (type === "flower") {
      return "bg-pink-500/30 border-pink-400/30 text-pink-700";
    } else if (type === "bow") {
      return "bg-purple-500/30 border-purple-400/30 text-purple-700";
    } else if (type === "set-bandana") {
      return "bg-green-500/30 border-green-400/30 text-green-700";
    } else if (type === "set-turbon") {
      return "bg-blue-500/30 border-blue-400/30 text-blue-700";
    }
    return "bg-purple-500/30 border-purple-400/30 text-purple-700";
  };

  const getTypeLabel = (type) => {
    if (type === "flower") return "ورده";
    if (type === "bow") return "فيونكه";
    if (type === "set-bandana") return "طقم بندانات";
    if (type === "set-turbon") return "طقم تربونات";
    return "فيونكه";
  };

  // ✅ الحصول على عنوان الصفحة حسب الكاتيجوري
  const getPageTitle = () => {
    switch (category) {
      case 'bandana': return 'بندانات';
      case 'turbon': return 'تربونات';
      case 'bandana-set': return 'طقم بندانات';
      case 'turbon-set': return 'طقم تربونات';
      default: return 'تشكيلتنا';
    }
  };

  // ✅ لو مفيش صور → اعرض رسالة
  if (images.length === 0) {
    return (
      <div className="w-full max-w-[95vw] mx-auto relative mt-20 sm:mt-6 px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 bg-white/50 backdrop-blur-sm p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="w-16 h-16 text-pink-400 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-700">لا توجد منتجات</h3>
            <p className="text-gray-500">لم يتم العثور على منتجات في قسم {getPageTitle()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto relative mt-20 sm:mt-6 px-4">
      <div className="relative group">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10">
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={3000}
            dotPosition="bottom"
            effect="fade"
            className="w-full"
            beforeChange={handleBeforeChange}
            arrows
            prevArrow={
              <div className="slick-arrow custom-prev">
                <LeftOutlined className="text-white text-xl" />
              </div>
            }
            nextArrow={
              <div className="slick-arrow custom-next">
                <RightOutlined className="text-white text-xl" />
              </div>
            }
          >
            {images.map((image, index) => (
              <div key={`${image.productId}-${index}`} className="relative">
                <div className="relative w-full h-[75vh] sm:h-[550px] lg:h-[600px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain transform transition-transform duration-[10000ms] scale-105 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 via-40% to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20"></div>

                  <div className="absolute top-10 left-10 opacity-20">
                    <Sparkles className="w-16 h-16 text-white animate-pulse" />
                  </div>
                  <div className="absolute bottom-40 right-10 opacity-10">
                    {getTypeIcon(image.type)}
                    <div className="w-24 h-24 rounded-full border-2 border-white/10"></div>
                  </div>

                  <div className={`absolute top-6 left-6 z-20 px-4 py-2 rounded-full backdrop-blur-md border ${getTypeBadgeColor(image.type)} flex items-center gap-2`}>
                    {getTypeIcon(image.type)}
                    <span className="text-sm font-medium">
                      {getTypeLabel(image.type)}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 z-20">
                    <span className="text-white text-sm font-medium tracking-wider">
                      {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
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
              </div>
            ))}
          </Carousel>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm z-20">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
          />
        </div>
      </div>

      <style jsx global>{`
        .ant-carousel .slick-dots-bottom {
          bottom: 20px;
          z-index: 20;
        }
        
        .ant-carousel .slick-dots li {
          margin: 0 4px;
        }
        
        .ant-carousel .slick-dots li button {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }
        
        .ant-carousel .slick-dots li.slick-active button {
          width: 32px;
          background: linear-gradient(90deg, #ec4899, #f43f5e) !important;
          border-radius: 4px;
        }
        
        .ant-carousel .slick-dots li button:hover {
          background: rgba(255, 255, 255, 0.6) !important;
        }
        
        .ant-carousel .slick-arrow {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(12px);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 30;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        
        .ant-carousel .slick-arrow:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: rgba(236, 72, 153, 0.5);
          transform: scale(1.1);
        }
        
        .group:hover .slick-arrow {
          opacity: 1;
        }
        
        .ant-carousel .slick-prev {
          left: 20px;
        }
        
        .ant-carousel .slick-next {
          right: 20px;
        }
        
        .ant-carousel .slick-prev::before,
        .ant-carousel .slick-next::before {
          display: none;
        }
        
        .custom-prev,
        .custom-next {
          width: 50px;
          height: 50px;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        
        .slick-slide {
          opacity: 0.4;
          transition: opacity 0.8s ease;
        }
        
        .slick-active {
          opacity: 1;
        }
        
        @media (max-width: 640px) {
          .ant-carousel .slick-arrow {
            width: 40px;
            height: 40px;
          }
          
          .ant-carousel .slick-prev {
            left: 10px;
          }
          
          .ant-carousel .slick-next {
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TurbonCarousal;