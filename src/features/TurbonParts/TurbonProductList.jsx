import { BandanaTurbonData } from "../../data/Turbon";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
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

  const handleProductClick = (product) => {
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
                {turbonProducts.length} منتج
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {turbonProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={() => handleProductClick(product)}
            />
          ))}
        </div>

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