import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Truck, ShieldCheck, Star, Gift, Sparkles, Heart, Crown, Award, Zap, Layers, CheckCircle, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function TurbonHomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'bandana',
      title: 'بندانات',
      subtitle: 'إكسسوارات أنيقة',
      description: 'تشكيلة راقية من البندانات العصرية، تناسب جميع الأذواق',
      count: '٢٥+ منتج',
      badge: 'جديد',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1786139965/WhatsApp_Image_2026-08-08_at_12.50.42_AM_qky1zc.jpg',
      path: '/turbon/bandana', // ✅ route مع category
      icon: Award,
    },
    {
      id: 'turbon',
      title: 'تربونات',
      subtitle: 'تصاميم فاخرة',
      description: 'تربونات مصنوعة من أجود الخامات، بتصاميم عصرية وأنيقة',
      count: '٣٠+ منتج',
      badge: 'الأكثر مبيعاً',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1787228192/WhatsApp_Image_2026-08-20_at_5.14.29_AM_vagugt.jpg',
      path: '/turbon/turbon', // ✅ route مع category
      icon: Zap,
    },
    {
      id: 'bandana-set',
      title: 'طقم بندانات',
      subtitle: 'بندانات متناسقة',
      description: 'أطقم من البندانات المتناسقة بالألوان والتصاميم المتكاملة',
      count: '٨+ أطقم',
      badge: 'حصري',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1783006087/WhatsApp_Image_2026-06-28_at_5.38.23_PM_d7vhmp.jpg',
      path: '/turbon/bandana-set', // ✅ route مع category
      icon: Package,
    },
    {
      id: 'turbon-set',
      title: 'طقم تربونات',
      subtitle: 'تربونات متناسقة',
      description: 'أطقم من التربونات المتناسقة بأشكال وألوان متكاملة',
      count: '٧+ أطقم',
      badge: 'عرض خاص',
      img: 'https://res.cloudinary.com/dxenvgjv5/image/upload/v1787236966/WhatsApp_Image_2026-08-20_at_7.07.45_AM_vvifjl.jpg',
      path: '/turbon/turbon-set', // ✅ route مع category
      icon: Layers,
    },
  ];

  // ✅ دالة للتنقل مع تمرير الكاتيجوري
  const goToCategory = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F8] to-[#FAFAF9] font-['Inter','Tajawal',sans-serif] direction-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-pink-200"
            >
              T
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-[#1C1C1E]">تربون</span>
          </div>
          
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1.5 bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-pink-100"
          >
            <Sparkles size={13} />
            تشكيلة ٢٠٢٦
          </motion.span>
        </motion.div>

        {/* ================ HERO ================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-pink-100 mb-6"
            >
              <TrendingUp size={13} />
              تشكيلة ربيع ٢٠٢٦
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-4"
            >
              <span className="text-[#1C1C1E] ml-2">تصاميم</span>
              <span className="text-pink-500 mr-2">البندانات</span>
              <br />
              <span className="text-[#1C1C1E]">والتربونات</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[#8E8E93] text-base leading-relaxed max-w-md mb-8"
            >
              تشكيلة راقية من البندانات والتربونات والأطقم المتناسقة،
              بتصاميم عصرية تناسب جميع الأذواق.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all"
                onClick={() => goToCategory(categories[1].path)}
              >
                تسوقي الآن
                <ArrowUpRight size={17} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm border-2 border-[#F0F0F0] text-[#1C1C1E] hover:border-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-all flex items-center gap-2"
                onClick={() => goToCategory(categories[0].path)}
              >
                <ShoppingBag size={17} />
                استكشفي
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Award, label: '٧٠+ منتج', sub: 'تشكيلة متنوعة' },
                { icon: Truck, label: 'شحن سريع', sub: 'خلال 5 أيام' },
                { icon: ShieldCheck, label: 'جودة عالية', sub: 'مضمونة' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#F0F0F0] transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center">
                    <stat.icon size={14} className="text-pink-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1C1C1E]">{stat.label}</div>
                    <div className="text-[10px] text-[#8E8E93]">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ========== Right - HERO IMAGES ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 lg:order-2 relative h-[450px] sm:h-[520px] lg:h-[560px] w-full max-w-[620px] mx-auto"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-pink-100/50 via-pink-50/20 to-transparent" />
            </div>

            {/* Main Image - Turbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="absolute right-[5%] bottom-0 w-[65%] sm:w-[58%] lg:w-[60%] h-[82%] sm:h-[84%] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-pink-100/40 border-2 border-white/80 z-10"
            >
              <img
                src={categories[1].img}
                alt="تربونات"
                className="w-full h-full object-contain bg-[#fafafa] p-2"
              />
              <div className="absolute bottom-4 right-4 bg-pink-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Zap size={12} />
                تربونات فاخرة
              </div>
            </motion.div>

            {/* Bandana */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              whileHover={{ scale: 1.03 }}
              className="absolute left-[2%] top-[4%] w-[38%] sm:w-[36%] lg:w-[38%] h-[42%] sm:h-[40%] rounded-2xl overflow-hidden bg-white shadow-xl shadow-pink-100/30 border-2 border-white/80 z-20"
            >
              <img
                src={categories[0].img}
                alt="بندانات"
                className="w-full h-full object-contain bg-[#fafafa] p-2"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-pink-600/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-semibold">
                بندانات
              </div>
            </motion.div>

            {/* Sets */}
            <motion.div
              initial={{ opacity: 0, x: -15, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              whileHover={{ scale: 1.03 }}
              className="absolute left-[10%] bottom-[5%] w-[35%] sm:w-[34%] lg:w-[36%] h-[38%] sm:h-[37%] rounded-2xl overflow-hidden bg-white shadow-xl shadow-pink-100/30 border-2 border-white/80 z-30"
            >
              <img
                src={categories[3].img}
                alt="أطقم"
                className="w-full h-full object-contain bg-[#fafafa] p-2"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-pink-600/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-semibold">
                أطقم
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] left-0 z-40 hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/90 shadow-xl border border-white/80"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center"
              >
                <Crown size={16} className="text-white" />
              </motion.div>
              <div>
                <div className="text-[10px] text-[#8E8E93] font-medium">تشكيلة حصرية</div>
                <div className="font-bold text-sm text-pink-600">أطقم ٢٠٢٦</div>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-[6%] right-[6%] w-2 h-2 rounded-full bg-pink-400 opacity-20 z-0"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-[32%] left-[4%] w-1.5 h-1.5 rounded-full bg-pink-500 opacity-15 z-0"
            />
          </motion.div>
        </div>

        {/* ================ PROMO BANNER ================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-white shadow-xl border border-black/5 mb-20"
        >
          <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center relative z-10">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit mb-3 border border-pink-100"
            >
              <Sparkles size={12} />
              أطقم حصرية
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-[#1C1C1E]">
              أطقم متناسقة
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                بندانات وتربونات
              </span>
            </h3>

            <p className="text-[#8E8E93] text-sm leading-relaxed max-w-sm mb-5">
              أطقم منسقة بعناية بألوان وتصاميم متكاملة تناسب جميع الأذواق
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md shadow-pink-200 hover:shadow-pink-300 transition-all"
                onClick={() => goToCategory(categories[2].path)}
              >
                استكشفي الأطقم
                <ArrowUpRight size={15} />
              </button>
              
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-black/10 text-[#1C1C1E] hover:bg-pink-50 hover:border-pink-400 hover:text-pink-600 transition-all flex items-center gap-1.5"
                onClick={() => goToCategory(categories[3].path)}
              >
                <Heart size={14} />
                تربونات
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-black/5">
              {[
                { icon: Package, label: 'طقم بندانات' },
                { icon: Layers, label: 'طقم تربونات' },
                { icon: Gift, label: 'هدية جميلة لاطفالك' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5">
                  <item.icon size={12} className="text-pink-400" />
                  <span className="text-[#8E8E93] text-[11px] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Images Grid */}
          <div className="relative min-h-[260px] md:min-h-[300px] overflow-hidden bg-gradient-to-br from-pink-50/30 to-white">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-3.5">
              <div className="row-span-2 rounded-xl overflow-hidden relative bg-white shadow-md">
                <img
                  src="https://res.cloudinary.com/dxenvgjv5/image/upload/v1777471515/WhatsApp_Image_2026-04-28_at_4.04.18_AM_7_bxi2rz.jpg"
                  alt="طقم بندانات"
                  className="w-full h-full object-contain bg-[#fafafa] p-2 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-pink-600/90 px-3 py-1 rounded-full text-white text-[10px] font-semibold backdrop-blur-sm">
                  طقم بندانات
                </div>
              </div>
              <div className="rounded-xl overflow-hidden relative bg-white shadow-md">
                <img
                  src="https://res.cloudinary.com/dxenvgjv5/image/upload/v1777556379/WhatsApp_Image_2026-04-29_at_11.12.02_AM_3_ruhdvo.jpg"
                  alt="طقم تربونات"
                  className="w-full h-full object-contain bg-[#fafafa] p-2 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-pink-600/90 px-3 py-1 rounded-full text-white text-[10px] font-semibold backdrop-blur-sm">
                  طقم تربونات
                </div>
              </div>
              <div className="rounded-xl overflow-hidden relative bg-white shadow-md">
                <img
                  src="https://res.cloudinary.com/dxenvgjv5/image/upload/v1777400594/WhatsApp_Image_2026-04-28_at_4.04.18_AM_3_ydjfak.jpg"
                  alt="أطقم متنوعة"
                  className="w-full h-full object-contain bg-[#fafafa] p-2 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-pink-600/90 px-3 py-1 rounded-full text-white text-[10px] font-semibold backdrop-blur-sm">
                  أطقم متنوعة
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-5 left-5 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-lg shadow-pink-200 z-10 flex items-center gap-1.5"
            >
              <Crown size={13} />
              أطقم ٢٠٢٦
            </motion.div>
          </div>
        </motion.div>

        {/* ================ CATEGORIES ================ */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-between mb-7"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C1C1E]">تشكيلتنا</h2>
              <p className="text-[#8E8E93] text-sm">اختاري من أجمل التصاميم العصرية</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-2 hover:shadow-2xl hover:border-pink-100 transition-all duration-300 cursor-pointer"
                onClick={() => goToCategory(category.path)}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#fafafa]">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-3.5 py-1 rounded-full text-[10px] font-bold shadow-md shadow-pink-200">
                    {category.badge}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-4 bg-gradient-to-t from-black/40 to-transparent">
                    <div className="text-white text-[11px] font-medium">{category.count}</div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-[#1C1C1E]">{category.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 group-hover:bg-pink-100 transition-colors">
                      <category.icon size={14} />
                    </div>
                  </div>
                  <p className="text-xs text-[#8E8E93] mb-1">{category.subtitle}</p>
                  <p className="text-sm text-[#8E8E93] leading-relaxed mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
                    <span className="text-xs font-semibold text-pink-600 group-hover:text-pink-700 transition-colors">تسوقي الآن</span>
                    <ArrowUpRight size={16} className="text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================ FOOTER ================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-7 border-t border-[#F0F0F0] flex items-center justify-between flex-wrap gap-3"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
              T
            </div>
            <span className="text-xs font-semibold text-[#1C1C1E]">تربون © ٢٠٢٦</span>
          </div>
          
          <div className="flex items-center gap-3.5 text-[#8E8E93] text-[11px]">
            <span className="flex items-center gap-1.5">
              <Heart size={11} className="text-pink-400" />
              صنع بحب
            </span>
            <span>•</span>
            <span>جميع الحقوق محفوظة</span>
          </div>
        </motion.div>
      </div>

      {/* RTL Direction & Fonts */}
      <style>{`
        .direction-rtl {
          direction: rtl;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Tajawal:wght@400;500;700&display=swap');
      `}</style>
    </div>
  );
}

export default TurbonHomePage;