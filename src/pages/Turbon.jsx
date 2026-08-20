import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ استخدام useParams بدلاً من useLocation
import TurbonCarousal from "../features/TurbonParts/TurbonCarousal";
import TurbonOffers from "../features/TurbonParts/TurbonOffers";
import TurbonProductList from "../features/TurbonParts/TurbonProductList";
import TurbonOrderCollection from "../features/TurbonParts/TurbonOrderCollection";
import OfferCountdown from "../ui/OfferCountDown";
import ProductBenefits from "../features/products/ProductBenifits";
import TurbonOfferBtn from "../features/TurbonParts/TurbonOfferBtn";
import PurchaseNotifications from "../ui/PurchaseNotifications";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Ribbon, Flower2, ArrowDown } from "lucide-react";

function Turbon() {
  const { t } = useTranslation();
  const { category } = useParams(); // ✅ استقبال الكاتيجوري من URL
  
  const [selectedOffer, setSelectedOffer] = useState(null);

  const orderCollectionRef = useRef(null);
  const formRef = useRef(null);
  const offersRef = useRef(null);

  const scrollToOrderCollection = () => {
    if (orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToOffers = () => {
    if (offersRef.current) {
      offersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (selectedOffer) {
      const timer = setTimeout(() => {
        if (orderCollectionRef.current) {
          orderCollectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedOffer]);

  // ✅ تحديد النص المعروض حسب الكاتيجوري
  const getCategoryTitle = () => {
    switch (category) {
      case 'bandana': return 'بندانات';
      case 'turbon': return 'تربونات';
      case 'bandana-set': return 'طقم بندانات';
      case 'turbon-set': return 'طقم تربونات';
      default: return 'تربون';
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      
      {/* ===== Brand Badge ===== */}
      <section className="relative w-full pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <div className="flex justify-center mb-4 px-4">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-pink-200">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-gray-700">
                {t("turbonPage.brand", "BabyStyle Turbans")} - {getCategoryTitle()}
              </span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>
          </div>
          
          {/* ✅ تمرير الكاتيجوري للكروزال */}
          <div className="relative w-full">
            <TurbonCarousal category={category} />
          </div>
        </motion.div>
      </section>

      {/* ===== PURCHASE NOTIFICATIONS ===== */}
      <PurchaseNotifications />

      {/* ===== OFFER BUTTON ===== */}
      <TurbonOfferBtn />

      {/* ===== PRODUCT LIST ===== */}
      {/* ✅ تمرير الكاتيجوري لقائمة المنتجات */}
      <TurbonProductList category={category} />

      {/* ===== OFFERS ===== */}
      <div ref={offersRef} className="scroll-mt-20">
        {/* ✅ تمرير الكاتيجوري للعروض */}
        <TurbonOffers
          category={category}
          setSelectedOffer={setSelectedOffer}
          scrollToOrderCollection={scrollToOrderCollection}
        />
      </div>

      {/* ===== ORDER COLLECTION ===== */}
      <div ref={orderCollectionRef} className="scroll-mt-20">
        <TurbonOrderCollection
          selectedOffer={selectedOffer}
          formRef={formRef}
          scrollToOffers={scrollToOffers}
        />
      </div>

      <OfferCountdown />
      
      {/* ===== PRODUCT BENEFITS ===== */}
      <ProductBenefits />

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Turbon;