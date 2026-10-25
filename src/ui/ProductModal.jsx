import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

function ProductModal({ product, open, OnClose }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  const DURATION = 250;
  const initialRenderRef = useRef(true);

  // ✅ mount / unmount مع أنيميشن
  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setShown(true));
      });
      return () => cancelAnimationFrame(raf1);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), DURATION);
    return () => clearTimeout(t);
  }, [open]);

  // ✅ إعادة تعيين الحالة عند الفتح
  useEffect(() => {
    if (open && product?.previewImages?.length > 0) {
      setIsImageReady(false);
      setSelectedImage(product.previewImages[0]);
      setCurrentIndex(0);
      setIsZoomed(false);

      const timer = setTimeout(() => setIsImageReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [open, product]);

  // ✅ معالج back button
  useEffect(() => {
    if (!open) return;
    const handleBack = () => OnClose();
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [open, OnClose]);

  // ✅ history state
  useEffect(() => {
    if (open) window.history.pushState({ modal: true }, "");
  }, [open]);

  // ✅ منع scroll + Escape
  useEffect(() => {
    if (!mounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") OnClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, OnClose]);

  const handleNext = useCallback(() => {
    if (product?.previewImages?.length > 0) {
      setIsImageReady(false);
      const nextIndex = (currentIndex + 1) % product.previewImages.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(product.previewImages[nextIndex]);
      setTimeout(() => setIsImageReady(true), 50);
    }
  }, [currentIndex, product]);

  const handlePrev = useCallback(() => {
    if (product?.previewImages?.length > 0) {
      setIsImageReady(false);
      const prevIndex =
        (currentIndex - 1 + product.previewImages.length) %
        product.previewImages.length;
      setCurrentIndex(prevIndex);
      setSelectedImage(product.previewImages[prevIndex]);
      setTimeout(() => setIsImageReady(true), 50);
    }
  }, [currentIndex, product]);

  const handleThumbnailClick = (img, index) => {
    setIsImageReady(false);
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  if (!product) return null;
  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-3 sm:px-4"
      style={{ pointerEvents: shown ? "auto" : "none" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        style={{
          opacity: shown ? 1 : 0,
          transitionDuration: `${DURATION}ms`,
        }}
        onClick={OnClose}
      />

      {/* Modal Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[1000px] max-h-[95vh] overflow-y-auto rounded-2xl transition-all"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.95)",
          transitionDuration: `${DURATION}ms`,
        }}
      >
        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={OnClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
            {/* Left - Thumbnails */}
            <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[500px] lg:w-24 px-2 lg:px-0 py-2 lg:py-0">
              {product.previewImages?.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 cursor-pointer"
                  onClick={() => handleThumbnailClick(img, index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg blur-md transition-opacity duration-300 ${
                      selectedImage === img ? "opacity-30" : "opacity-0"
                    }`}
                  ></div>
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg border-2 transition-all duration-300 ${
                      selectedImage === img
                        ? "border-pink-500 shadow-lg shadow-pink-500/20 scale-105"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                  {selectedImage === img && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full hidden lg:block"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Center - Main Image */}
            <div className="order-1 lg:order-2 flex-1 relative">
              <div
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl border border-gray-200 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full filter blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-400 rounded-full filter blur-xl"></div>
                </div>

                <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Product"
                    loading="eager"
                    decoding="async"
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      isZoomed ? "scale-150" : "scale-100"
                    }`}
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onLoad={() => setIsImageReady(true)}
                  />

                  {!isImageReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90">
                      <div className="w-8 h-8 border-[3px] border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/30 pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-pink-400" />
                </div>
              </div>

              {/* Arrows */}
              {product.previewImages?.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group z-10"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group z-10"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Right - Info */}
            <div className="order-3 lg:w-80 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-pink-500/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                {product.name}
              </h3>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {product.description || "توصيف المنتج هنا"}
              </p>

              {(product.availableColors || product.avalibeColors) && (
                <div className="mb-6">
                  <h4 className="text-pink-400 text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
                    الألوان المتاحة:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {(product.availableColors || product.avalibeColors).map(
                      (color, index) => (
                        <div key={index} className="group/color relative">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50"
                            style={{
                              backgroundColor: getColorCode(color),
                              boxShadow:
                                getColorCode(color) === "#FFFFFF"
                                  ? "0 0 0 1px #ccc, 0 2px 8px rgba(0,0,0,0.2)"
                                  : "0 2px 8px rgba(0,0,0,0.2)",
                            }}
                            title={color}
                          >
                            {getColorCode(color) === "#FFFFFF" && (
                              <div className="w-full h-full rounded-full border border-gray-300"></div>
                            )}
                          </div>
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-pink-300 text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
                            {color}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {product.price && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-2xl font-bold text-pink-400">
                    {product.price} {product.currency || "ج.م"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ✅ دالة getColorCode — بره الكومبوننت عشان ما تتعادش كل render
const getColorCode = (colorName) => {
  if (!colorName) return "#CCCCCC";

  const normalized = colorName.trim().toLowerCase();

  const colorMap = {
    أبيض: "#FFFFFF",
    "أوف وايت": "#F8F8F0",
    أسود: "#000000",
    رمادي: "#808080",
    روز: "#FFC0CB",
    بينك: "#FF69B4",
    كحلي: "#000080",
    بيج: "#F5F5DC",
    لبني: "#FDF5E6",
    أصفر: "#FFD700",
    موف: "#800080",
    أحمر: "#FF0000",
    لافندر: "#E6E6FA",
    "موف فاتح": "#E6E6FA",
    أخضر: "#00FF00",
    أزرق: "#0000FF",
    برتقالي: "#FFA500",
    بني: "#8B4513",
    ذهبي: "#FFD700",
    فضي: "#C0C0C0",
    فيروزي: "#40E0D0",
    خوخي: "#FFDAB9",
    كريمي: "#FFFDD0",
    white: "#FFFFFF",
    "off white": "#F8F8F0",
    black: "#000000",
    gray: "#808080",
    grey: "#808080",
    pink: "#FF69B4",
    navy: "#000080",
    beige: "#F5F5DC",
    cream: "#FDF5E6",
    yellow: "#FFD700",
    purple: "#800080",
    red: "#FF0000",
    lavender: "#E6E6FA",
    green: "#00FF00",
    blue: "#0000FF",
    orange: "#FFA500",
    brown: "#8B4513",
    gold: "#FFD700",
    silver: "#C0C0C0",
    turquoise: "#40E0D0",
    peach: "#FFDAB9",
  };

  return (
    colorMap[normalized] ||
    colorMap[normalized.split(" ")[0]] ||
    "#CCCCCC"
  );
};

export default React.memo(ProductModal);