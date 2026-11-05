import { BandanaTurbonData } from "../../data/Turbon";
import { useTranslation } from "react-i18next";
import { Sparkles, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../features/products/ProductCard";

function TurbonProductList({ category }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ✅ فلترة المنتجات حسب الكاتيجوري
  const getFilteredProducts = () => {
    if (!category || category === 'all') {
      return BandanaTurbonData;
    }

    return BandanaTurbonData.filter(product => {
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
  };

  const turbonProducts = getFilteredProducts();

  // ⭐ جديد: هل اللون ده كله sold out (كل مقاساته)؟
  const isColorSoldOut = (product, colorName) => {
    const colorEntry = (product.productColors || []).find(
      (pc) => pc.color === colorName
    );
    if (!colorEntry) return false;
    if (colorEntry.soldOut === true) return true;
    const sizes = colorEntry.sizes || [];
    if (sizes.length === 0) return false;
    return sizes.every((s) => s.soldOut === true);
  };

  // ⭐ جديد: هل اللون ده sold out باستخدام index (لما مفيش colorName)؟
  const isColorSoldOutByIndex = (product, index) => {
    const colorEntry = product.productColors?.[index];
    if (!colorEntry) return false;
    const sizes = colorEntry.sizes || [];
    if (sizes.length === 0) return false;
    return sizes.every((s) => s.soldOut === true);
  };

  // ⭐ جديد: هل المنتج كله sold out (كل الألوان)؟
  const isProductSoldOut = (product) => {
    const colors = product.avalibeColors || [];
    if (colors.length === 0) return false;
    return colors.every((c) => isColorSoldOut(product, c));
  };

  const handleProductClick = (product) => {
    if (isProductSoldOut(product)) return; // ⭐ منع فتح المنتج لو كله خلص
    navigate(`/product/${product.id}`);
  };

  // ✅ الحصول على عنوان الصفحة حسب الكاتيجوري
  const getPageTitle = () => {
    switch (category) {
      case 'bandana': return 'بندانات';
      case 'turbon': return 'تربونات';
      case 'bandana-set': return 'أطقم بندانات';
      case 'turbon-set': return 'أطقم تربونات';
      default: return 'تربونات بيبي ستايل';
    }
  };

  // ✅ الحصول على الوصف حسب الكاتيجوري
  const getPageDescription = () => {
    switch (category) {
      case 'bandana':
        return 'تشكيلة راقية من البندانات العصرية، تناسب جميع الأذواق';
      case 'turbon':
        return 'تربونات مصنوعة من أجود الخامات، بتصاميم عصرية وأنيقة';
      case 'bandana-set':
        return 'أطقم من البندانات المتناسقة بالألوان والتصاميم المتكاملة';
      case 'turbon-set':
        return 'أطقم من التربونات المتناسقة بأشكال وألوان متكاملة';
      default:
        return 'موديلين حصريين: فيونكه أنيقة ووردة ناعمة، مصممة بعناية لراحة طفلتك';
    }
  };

  // ✅ الحصول على الأيقونة المناسبة
  const getCategoryIcon = () => {
    switch (category) {
      case 'bandana': return '🎀';
      case 'turbon': return '🌸';
      case 'bandana-set': return '👗';
      case 'turbon-set': return '👗';
      default: return '✨';
    }
  };

  // ✅ لو مفيش منتجات
  if (turbonProducts.length === 0) {
    return (
      <div className="min-h-[40vh] bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">لا توجد منتجات</h2>
            <p className="text-gray-500">لم يتم العثور على منتجات في قسم {getPageTitle()}</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ التحقق مما إذا كان هناك منتج واحد فقط لعرض جميع صوره
  const isSingleProduct = turbonProducts.length === 1;

  // ✅ دالة للحصول على اسم اللون للمنتج
  const getColorName = (product, index) => {
    // لو المنتج عنده avalibeColors، نستخدمه
    if (product.avalibeColors && product.avalibeColors[index]) {
      return product.avalibeColors[index];
    }
    // لو productColors فيها color، نستخدمها
    if (product.productColors && product.productColors[index]?.color) {
      return product.productColors[index].color;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full px-5 py-2 text-sm font-medium mb-5 shadow-lg shadow-pink-200">
              <Sparkles className="w-4 h-4" />
              <span>تشكيلة الربيع 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {getPageTitle()}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
                بيبي ستايل
              </span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              {getPageDescription()}
            </p>

            {/* ✅ عرض عدد المنتجات */}
            <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
              <span className="text-sm text-gray-600">
                {isSingleProduct ? `${turbonProducts[0].productColors?.length || 0} لون` : `${turbonProducts.length} منتج`}
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isSingleProduct ? (
          // ✅ حالة وجود منتج واحد: عرض كل صور المنتج في شبكة
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {turbonProducts[0].name}
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                {turbonProducts[0].description}
              </p>
            </div>

            {/* شبكة عرض جميع صور المنتج مع اسم اللون كبادج */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {turbonProducts[0].productColors?.map((colorItem, index) => {
                const colorName = getColorName(turbonProducts[0], index);
                const colorSoldOut =
                  colorName
                    ? isColorSoldOut(turbonProducts[0], colorName)
                    : isColorSoldOutByIndex(turbonProducts[0], index); // ⭐ جديد

                return (
                  <div
                    key={index}
                    onClick={() => !colorSoldOut && handleProductClick(turbonProducts[0])} // ⭐ منع الفتح لو اللون خلص
                    className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                      colorSoldOut
                        ? "cursor-not-allowed opacity-90"
                        : "cursor-pointer hover:-translate-y-1"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      <img
                        src={colorItem.img}
                        alt={`${turbonProducts[0].name} - ${colorName || `صورة ${index + 1}`}`}
                        className={`w-full h-full object-contain transition-transform duration-500 ${
                          colorSoldOut
                            ? "grayscale opacity-60"
                            : "group-hover:scale-105"
                        }`}
                        loading="lazy"
                      />

                      {/* ⭐ Overlay "نفد المخزون" على اللون ده */}
                      {colorSoldOut && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                          <div className="flex flex-col items-center gap-1.5 bg-white/95 px-4 py-2.5 rounded-xl shadow-xl border border-red-100 transform -rotate-6">
                            <Ban className="w-5 h-5 text-red-500" />
                            <span
                              className="text-red-500 font-extrabold text-xs tracking-wider"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              نفد المخزون
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ✅ بادج اسم اللون في أسفل الصورة */}
                    {colorName && (
                      <div className="absolute bottom-3 left-3 right-3 z-30">
                        <span
                          className={`inline-block text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium shadow-lg ${
                            colorSoldOut
                              ? "bg-red-500/85 text-white line-through decoration-white/70 decoration-[1.5px]"
                              : "bg-black/70 backdrop-blur-sm text-white"
                          }`}
                        >
                          {colorName}
                          {colorSoldOut && (
                            <span className="mr-1 text-[10px] font-bold">
                              — نفد
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {/* ✅ أيقونة تكبير عند الهوفر */}
                    {!colorSoldOut && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2 shadow-lg">
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* عرض المقاسات */}
            {turbonProducts[0].sizes && turbonProducts[0].sizes.length > 0 && (
              <div className="mt-10 text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-3">المقاسات المتاحة:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {turbonProducts[0].sizes.map((size, index) => {
                    const sizeSoldOut = size.soldOut === true; // ⭐ جديد
                    return (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm border font-medium transition-all duration-200 ${
                          sizeSoldOut
                            ? "bg-red-50 text-gray-400 border-red-100 line-through decoration-red-400/70"
                            : "bg-pink-50 text-pink-600 border-pink-200"
                        }`}
                      >
                        {size.size} - {size.age}
                        {sizeSoldOut && (
                          <span className="mr-1 text-[10px] font-bold text-red-500 no-underline inline-block">
                            — نفد
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          // ✅ حالة وجود منتجات متعددة: عرض البطاقات العادية
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {turbonProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPreview={() => handleProductClick(product)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                خامة قطن ناعمة
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                مصنوعة من قطن عالي الجودة يناسب بشرة طفلتك
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                ألوان متعددة
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                تشكيلة واسعة من الألوان تناسب جميع الأذواق
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                هدية مثالية
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                اختيار رائع كهدية لأطفالك أو لأطفال المقربين
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurbonProductList;