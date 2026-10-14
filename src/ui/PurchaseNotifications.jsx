import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackToSchoolData } from "../data/BackToSchoolData";
import { ShoppingBag, MapPin, Clock, Crown, Zap, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

const names = [
  "تقي",
  "سارة",
  "محمود",
  "ليلى",
  "يوسف",
  "مريم",
  "علي",
  "أحمد",
  "عمر",
  "ندى",
  "هاجر",
  "سلمى",
  "ملك",
  "رحمة",
  "زين",
  "آدم",
  "نور",
  "جميلة",
  "إسراء",
  "أميرة",
  "خالد",
  "إبراهيم",
  "ياسمين",
  "فاطمة",
  "حسن",
  "عائشة",
  "كارما",
];

const cities = [
  "قنا",
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "المنصورة",
  "سوهاج",
  "أسيوط",
  "طنطا",
  "بورسعيد",
  "الفيوم",
  "دمياط",
  "بني سويف",
  "الأقصر",
  "أسوان",
  "كفر الشيخ",
  "المحلة",
  "حلوان",
  "شبين الكوم",
  "مرسى مطروح",
  "العريش",
];

const offers = ["4", "6", "8", "12"];

// عروض الكولون
const colonOffers = [
  {
    quantity: "3 كولون",
    name: "عرض 3 كولون ",
    price: 330,
    oldPrice: 480,
    value: 3,
    discount: 16,
  },
  {
    quantity: "4 كولون",
    name: "عرض 4 كولون ",
    price: 400,
    oldPrice: 620,
    value: 4,
    discount: 18,
  },
  {
    quantity: "5 كولون",
    name: "عرض 5 كولون ",
    price: 475,
    oldPrice: 740,
    value: 5,
    discount: 20,
    highlight: "عرض خاص",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    quantity: "6 كولون",
    name: "عرض 6 كولون ",
    price: 570,
    oldPrice: 910,
    value: 6,
    discount: 24,
    highlight: "الأكثر مبيعاً",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  {
    quantity: "8 كولون",
    name: "عرض 8 كولون ",
    price: 720,
    oldPrice: 1180,
    value: 8,
    discount: 27,
  },
  {
    quantity: "12 كولون",
    name: "عرض 12 كولون ",
    price: 960,
    oldPrice: 1720,
    value: 12,
    discount: 32,
    highlight: "أفضل عرض",
    icon: <Crown className="w-3.5 h-3.5" />,
  },
];

// عروض الهاف الخريفي
const halfColonOffers = [
  {
    quantity: "3 هاف",
    name: "عرض 3 هاف ",
    price: 210,
    oldPrice: 330,
    value: 3,
    discount: 15,
  },
  {
    quantity: "4 هاف",
    name: "عرض 4 هاف ",
    price: 260,
    oldPrice: 420,
    value: 4,
    discount: 18,
  },
  {
    quantity: "6 هاف",
    name: "عرض 6 هاف ",
    price: 330,
    oldPrice: 540,
    value: 6,
    discount: 24,
    highlight: "الأكثر مبيعاً",
    icon: <Star className="w-3.5 h-3.5" />,
  },
];

export default function PurchaseNotifications() {
  const [notification, setNotification] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      // 40% فرصة لظهور عرض (كولون أو هاف)
      const showSpecialOffer = Math.random() < 0.4;

      if (showSpecialOffer) {
        // 60% كولون، 40% هاف
        const isColonOffer = Math.random() < 0.6;
        const offersList = isColonOffer ? colonOffers : halfColonOffers;
        const randomOffer = offersList[Math.floor(Math.random() * offersList.length)];

        setNotification({
          id: Date.now(),
          name: randomName,
          city: randomCity,
          type: "offer",
          offerType: isColonOffer ? "colon" : "half",
          offer: randomOffer,
          image: BackToSchoolData.find((p) =>
            isColonOffer ? p.category === "colon" : p.category === "half"
          )?.image,
        });
      } else {
        // منتج عادي
        const randomOffer = offers[Math.floor(Math.random() * offers.length)];
        const randomProduct =
          BackToSchoolData[Math.floor(Math.random() * BackToSchoolData.length)];
        setNotification({
          id: Date.now(),
          name: randomName,
          city: randomCity,
          type: "regular",
          offer: randomOffer,
          product: randomProduct,
        });
      }

      setTimeout(() => setNotification(null), 5000);
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  // تحديد نوع الإشعار
  const isSpecialOffer = notification?.type === "offer";
  const isColonOffer = notification?.offerType === "colon";
  const isHalfOffer = notification?.offerType === "half";

  // لون مميز حسب النوع
  const accentColor = isColonOffer
    ? "from-purple-500 to-pink-600"
    : isHalfOffer
    ? "from-amber-500 to-orange-600"
    : "from-pink-500 to-pink-600";

  const accentBorder = isColonOffer
    ? "border-purple-500/30"
    : isHalfOffer
    ? "border-amber-500/30"
    : "border-pink-500/30";

  const accentBg = isColonOffer
    ? "from-purple-900 to-gray-950"
    : isHalfOffer
    ? "from-amber-900 to-gray-950"
    : "from-gray-900 to-gray-950";

  const accentText = isColonOffer
    ? "text-purple-300"
    : isHalfOffer
    ? "text-amber-300"
    : "text-pink-300";

  const accentTextStrong = isColonOffer
    ? "text-purple-400"
    : isHalfOffer
    ? "text-amber-400"
    : "text-pink-400";

  const accentBgLight = isColonOffer
    ? "bg-purple-500/30"
    : isHalfOffer
    ? "bg-amber-500/30"
    : "bg-pink-500/30";

  const accentBgBadge = isColonOffer
    ? "bg-purple-500/20"
    : isHalfOffer
    ? "bg-amber-500/20"
    : "bg-pink-500/20";

  return (
    <div className="fixed bottom-20 left-0 right-0 sm:left-auto sm:right-8 sm:bottom-24 z-[80] flex justify-center sm:block px-3 sm:px-0">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="relative group w-full max-w-[320px] sm:max-w-sm mx-auto"
          >
            {/* Glow Effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${accentColor}`}
            ></div>

            {/* Main Notification Card */}
            <div
              className={`relative flex items-start gap-2.5 bg-gradient-to-br px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl border overflow-hidden ${accentBg} ${accentBorder}`}
            >
              {/* شعار خاص للعروض المميزة */}
              {isSpecialOffer && (
                <div
                  className={`absolute top-0 right-0 bg-gradient-to-l px-2.5 py-0.5 rounded-bl-lg rounded-tr-lg z-30 ${
                    isColonOffer
                      ? "from-purple-500 to-pink-500"
                      : "from-amber-500 to-orange-500"
                  }`}
                >
                  <span className="text-white text-[10px] sm:text-xs font-bold flex items-center gap-1">
                    {notification.offer.icon || <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                    <span className="hidden xs:inline">
                      {notification.offer.highlight ||
                        (isColonOffer ? "عرض كولون" : "عرض هاف")}
                    </span>
                    <span className="xs:hidden">
                      {isColonOffer ? "كولون" : "هاف"}
                    </span>
                  </span>
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className={`absolute -top-10 -right-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full filter blur-2xl ${
                    isColonOffer
                      ? "bg-purple-500"
                      : isHalfOffer
                      ? "bg-amber-500"
                      : "bg-pink-500"
                  }`}
                ></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gray-500 rounded-full filter blur-2xl"></div>
              </div>

              {/* Product Image Container */}
              <div
                className={`relative flex-shrink-0 ${
                  isSpecialOffer ? "mt-5 sm:mt-6" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r rounded-lg blur-md opacity-50 animate-pulse ${accentColor}`}
                ></div>
                <img
                  src={
                    isSpecialOffer
                      ? notification.image
                      : notification.product.image
                  }
                  alt={
                    isSpecialOffer
                      ? notification.offer.name
                      : notification.product.name
                  }
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg border-2 shadow-lg object-cover transform transition-transform duration-300 group-hover:scale-110 ${
                    isColonOffer
                      ? "border-purple-400"
                      : isHalfOffer
                      ? "border-amber-400"
                      : "border-pink-400"
                  }`}
                />
                {/* Live Badge */}
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-pink-500"></span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`relative flex-1 min-w-0 ${
                  isSpecialOffer ? "mt-5 sm:mt-6" : ""
                }`}
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-1 mb-0.5">
                  <ShoppingBag
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${accentTextStrong}`}
                  />
                  <span className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {isSpecialOffer
                      ? "✨ عرض خاص"
                      : t("purchaseNotifications.newPurchase")}
                  </span>
                </div>

                {/* Buyer Info */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-200 font-medium text-[11px] sm:text-sm truncate">
                    {t("purchaseNotifications.buyer", {
                      name: notification.name,
                      city: notification.city,
                    })}
                  </span>

                  {/* City with Icon */}
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
                    <MapPin
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 ${accentTextStrong}`}
                    />
                    <span className="truncate">{notification.city}</span>
                  </div>

                  {/* Product/Offer Details */}
                  {isSpecialOffer ? (
                    // تفاصيل العرض المميز
                    <div className="mt-1 space-y-1">
                      <span
                        className={`text-[11px] sm:text-sm font-bold block truncate ${accentText}`}
                      >
                        {notification.offer.name}
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-[9px] sm:text-xs line-through text-gray-500">
                          {notification.offer.oldPrice} ج.م
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-bold ${accentTextStrong}`}
                        >
                          {notification.offer.price} ج.م
                        </span>
                        <span
                          className={`text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${accentBgLight} ${accentText}`}
                        >
                          وفر {notification.offer.oldPrice - notification.offer.price} ج.م
                        </span>
                      </div>
                      <span className="text-[8px] sm:text-xs text-gray-400 block truncate">
                        {notification.offer.quantity} •{" "}
                        {Math.round(
                          notification.offer.price / notification.offer.value
                        )}{" "}
                        ج.م / قطعة • خصم {notification.offer.discount}%
                      </span>
                    </div>
                  ) : (
                    // منتج عادي
                    <>
                      <span className="text-[10px] sm:text-xs text-gray-300 line-clamp-1">
                        {lang === "ar"
                          ? notification.product.name
                          : notification.product.nameEn}
                      </span>
                      {/* Offer and Order Time */}
                      <div className="flex items-center justify-between mt-0.5">
                        <div
                          className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full ${accentBgBadge}`}
                        >
                          <span
                            className={`text-[9px] sm:text-xs font-bold whitespace-nowrap ${accentText}`}
                          >
                            {t("purchaseNotifications.offer", {
                              offer: notification.offer,
                            })}
                          </span>
                          <span className="text-gray-400 text-[8px] sm:text-xs">
                            •
                          </span>
                          <span className="text-gray-400 text-[8px] sm:text-xs flex items-center gap-0.5 whitespace-nowrap">
                            <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            الآن
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* WhatsApp Icon */}
                  <div className="absolute bottom-0 right-0">
                    <FaWhatsapp
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${accentTextStrong} opacity-60`}
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r rounded-full ${accentColor}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}