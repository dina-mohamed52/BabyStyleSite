import { useEffect, useRef, useState } from "react";
import ProductCard from "../products/ProductCard";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";
import { Sparkles, Heart, ShoppingBag, Star } from "lucide-react";

function ProductList({ products }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mounted, setMounted] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.includes("كولون") ||
        product.name.includes("ليجن") ||
        product.name.includes("شورت")
    ) || [];

  const handlePreview = (product) => {
    const allUrls = product.productColors.map((c) => c.img);

    setSelectedProduct({
      ...product,
      previewImages: allUrls,
    });

    setOpen(true);
  };

  const maxDiscount =
    filteredProducts.length > 0
      ? Math.max(...filteredProducts.map((p) => p.discount || 0))
      : 0;

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen mt-4 bg-[#FFFf]  sm:px-0 px-3">
      <div className="container py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBCB5C] to-[#F5A623] text-[#3B1F38] rounded-full px-5 py-2.5 text-sm font-bold mb-5 shadow-lg shadow-yellow-200/50">
              <Sparkles className="w-4 h-4" />
              <span>🎀 كوليكشن مميز</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B1F38] mb-4 font-display">
              تصاميم{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6A6C1] to-[#B65C7C]">
                عصرية
              </span>{" "}
              مميزة
            </h1>

            <p className="text-[#5B4458] text-base sm:text-lg max-w-2xl mx-auto">
              {filteredProducts.length}+ تصاميم بخامات ناعمة ومريحة، بألوان وأشكال مختلفة تناسب طفلتك
            </p>
          </div>
        </div>

        {/* Results Counter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-center">
            <span className="text-sm text-[#8A6E86] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
              {filteredProducts.length} منتج متاح
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto scroll-mt-20"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 0.07}s`,
              }}
            >
              <ProductCard product={product} onPreview={handlePreview} onClick={() => handlePreview(product)} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-bold text-[#3B1F38] mb-2">لا توجد منتجات</h3>
            <p className="text-[#8A6E86]">لا توجد منتجات متاحة حاليًا في هذه الفئة</p>
          </div>
        )}

      
        {/* CTA Banner */}
        {maxDiscount > 0 && (
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3B1F38] to-[#6B2D5E]  text-center">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F6A6C1]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C9BBEE]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm font-medium mb-4 border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  <span>تسوقي الآن</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                  استمتعي بخصم يصل إلى <span className="text-[#FBCB5C]">{maxDiscount}%</span>
                </h2>

                <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
                  على تصاميم مختارة لفترة محدودة
                </p>

                <button
                  className="inline-flex items-center gap-2 bg-[#FBCB5C] hover:bg-[#F5A623] text-[#3B1F38] font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-yellow-500/25"
                  onClick={scrollToProducts}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>تسوقي الكوليكشن</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal open={open} OnClose={() => setOpen(false)} product={selectedProduct} />
      )}
    </div>
  );
}

export default ProductList;