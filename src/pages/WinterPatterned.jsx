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

  // useEffect لتفعيل scroll بعد ظهور OrderCollection
  useEffect(() => {
    if (selectedOffer && orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [selectedOffer]);

  // Functions to scroll to sections
  const scrollToOffers = () => {
    if (offersRef.current) {
      offersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToProducts = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Offer Button - خارج الـ container عشان يثبت في الشاشة كلها */}
      <div className="bg-[#FFFf]">
        <OfferButton />

        <div dir="rtl" className="container mx-auto">
          {/* Hero Section with scroll functions */}
          <BackToSchoolHeroSec 
            scrollToOffers={scrollToOffers}
            scrollToProducts={scrollToProducts}
          />

                {/* <WHeader /> */}
          
          {/* Product List with ref */}
          <div ref={productListRef}>
            <ProductList products={BackToSchoolData} />
          </div>

          {/* Offers with ref */}
          <div ref={offersRef} id="offersSection">
            <Offers 
              setSelectedOffer={setSelectedOffer} 
              scrollToOrderCollection={() => {
                if (orderCollectionRef.current) {
                  orderCollectionRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            />
          </div>

          {selectedOffer && (
            <div ref={orderCollectionRef}>
              <OrderCollection selectedOffer={selectedOffer} formRef={formRef} />
            </div>
          )}
<OfferCountdown />
          <BackToSchoolSizeTable />
          <FAQ />

          <Header1st />
        </div>

        <div>
          
          <PurchaseNotifications />
          <div className="p-6">
            <ProductBenefits />
          </div>
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default WinterPatterned;