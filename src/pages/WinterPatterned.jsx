import { useRef, useState, useEffect } from "react";
import Offers from "../features/WinterPattern/Offers";
import OrderCollection from "../features/products/OrderCollection";
import CustomCarousel from "../ui/CustomCarousel";
import ProductList from "../features/WinterPattern/ProductList";
import Header1st from "../ui/Header1st";
import SizeTable from "./SizeTable";
import OfferButton from "../features/offer/OfferButton";
import OfferCountdown from "../ui/OfferCountDown";
import PurchaseNotifications from "../ui/PurchaseNotifications";
import ProductBenefits from "../features/products/ProductBenifits";
import { useTranslation } from "react-i18next";
import Reviews from "./Reviews";
import { BackToSchoolData } from "../data/BackToSchool";
import WHeader from "../features/WinterPattern/WHeader";
import BackToSchoolSizeTable from "../features/BackToSchool/BackToSchoolSizeTable";
import FAQ from "../features/BackToSchool/FAQ";
import BackToSchoolHeroSec from "../features/BackToSchool/BackToSchoolHeroSec";

function WinterPatterned() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const formRef = useRef(null);
  const orderCollectionRef = useRef(null);
  const offersRef = useRef(null);
  const productListRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedOffer && orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [selectedOffer]);

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="bg-[#FFF]">
        {/* <OfferButton /> */}

        <div dir="rtl" className="container mx-auto">
          {/* 1️⃣ Hero Section - */}
          {/* <BackToSchoolHeroSec
            scrollToOffers={scrollToOffers}
            scrollToProducts={scrollToProducts}
          /> */}
          <CustomCarousel/>
{/* <WHeader/> */}
          {/* 2️⃣ العدّاد التنازلي - يخلق إلحاح فوري فوق الطية */}
          <OfferCountdown />

          {/* 3️⃣ العروض - قلب عملية البيع (لازم يكون فوق) */}
          <div ref={offersRef} id="offersSection">
            <Offers
              setSelectedOffer={setSelectedOffer}
              scrollToOrderCollection={() => {
                orderCollectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            />
          </div>

          {/* 4️⃣ نموذج الطلب - يظهر فوراً بعد اختيار العرض */}
          {selectedOffer && (
            <div ref={orderCollectionRef}>
              <OrderCollection selectedOffer={selectedOffer} formRef={formRef} />
            </div>
          )}

          {/* 5️⃣ قائمة المنتجات - دليل اجتماعي بصري */}
          <div ref={productListRef}>
            <ProductList products={BackToSchoolData} />
          </div>

          {/* 6️⃣ الصور التوضيحية - تعزيز الرغبة */}
          <div className="grid grid-cols-2 gap-2 my-4">
            <img
              src="https://res.cloudinary.com/cj2kp1ke/image/upload/v1789572273/WhatsApp_Image_2026-09-14_at_9.16.20_AM_1.jpg"
              alt="Back to School"
              className="w-full h-auto rounded-lg object-cover"
            />
            <img
              src="https://res.cloudinary.com/cj2kp1ke/image/upload/v1789572344/WhatsApp_Image_2026-09-14_at_9.16.20_AM.jpg"
              alt="Back to School"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* 7️⃣ المزايا - تقليل الاعتراضات */}
          <div className="p-6">
            <ProductBenefits />
          </div>

          {/* 8️⃣ التقييمات - إثبات اجتماعي قوي */}
          <Reviews />

          {/* 9️⃣ جدول المقاسات - يحل شكوك المقاس */}
          <BackToSchoolSizeTable />

          {/* 🔟 الأسئلة الشائعة - إزالة آخر الاعتراضات */}
          <FAQ />

          {/* 1️⃣1️⃣ الهيدر الختامي - CTA أخير */}
          <Header1st />
        </div>

        {/* الإشعارات العائمة */}
        <div>
          <PurchaseNotifications />
        </div>
      </div>
    </>
  );
}

export default WinterPatterned;