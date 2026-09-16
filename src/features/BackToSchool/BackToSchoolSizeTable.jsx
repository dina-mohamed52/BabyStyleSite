import React from 'react';
import { useState } from 'react';
import { Ruler, Baby, User, Star, Sparkles, Heart, Crown, Shield, CheckCircle, HelpCircle, ArrowRightCircle } from 'lucide-react';

const BackToSchoolSizeTable = () => {
  const [showTip, setShowTip] = useState(false);

  const sizeData = [
    { size: "0", age: "حديثي الولادة - 9 شهور", length: "40 سم", icon: <Baby className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#F472B6", bg: "bg-pink-50" },
    { size: "1", age: "9 شهور - سنة ونصف", length: "50 سم", icon: <Baby className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#A78BFA", bg: "bg-purple-50" },
    { size: "2", age: "سنة ونصف - 3 سنوات", length: "55 سم", icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#60A5FA", bg: "bg-blue-50" },
    { size: "4", age: "3 - 5 سنوات", length: "63 سم", icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#34D399", bg: "bg-emerald-50" },
    { size: "6", age: "5 - 7 سنوات", length: "70 سم", icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#FBBF24", bg: "bg-amber-50" },
    { size: "8", age: "7 - 9 سنوات", length: "80 سم", icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#FB923C", bg: "bg-orange-50" },
    { size: "10", age: "9 - 11 سنة", length: "90 سم", icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#EC4899", bg: "bg-rose-50" },
    { size: "12", age: "12 - 14 سنة", length: "95 سم", icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5" />, color: "#8B5CF6", bg: "bg-violet-50" },
  ];

  return (
    <div className="relative max-w-4xl mx-auto my-8 sm:my-12 px-3 sm:px-4">
      {/* Main Container */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="relative pt-8 sm:pt-10 pb-6 px-4 sm:px-6 md:px-8 text-center border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              دليل مقاسات الكولون البناتي
            </h2>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
          </div>
          <p className="sm:text-sm text-xs text-gray-500 max-w-2xl mx-auto">
            ✨ اختاري المقاس المناسب حسب عمر طفلتك وطول الكولون ✨
          </p>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          <div className="min-w-[280px] sm:min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-gray-100 rounded-xl py-2.5 px-3 text-center">
                <span className="text-gray-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-gray-400" />
                  <span>المقاس</span>
                </span>
              </div>
              <div className="bg-gray-100 rounded-xl py-2.5 px-3 text-center">
                <span className="text-gray-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-gray-400" />
                  <span>العمر المناسب</span>
                </span>
              </div>
              <div className="bg-gray-100 rounded-xl py-2.5 px-3 text-center">
                <span className="text-gray-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-gray-400" />
                  <span>طول الكولون</span>
                </span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {sizeData.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-2 rounded-xl transition-all duration-300 hover:shadow-md ${item.bg} border border-gray-100/50`}
                >
                  {/* Size Column */}
                  <div className="rounded-xl py-3 px-2 text-center flex items-center justify-center">
                    <span className="font-extrabold text-lg sm:text-xl md:text-2xl flex items-center gap-1.5 sm:gap-2" style={{ color: item.color }}>
                      {item.icon}
                      {item.size}
                    </span>
                  </div>

                  {/* Age Column */}
                  <div className="rounded-xl py-3 px-2 text-center flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-[10px] sm:text-xs md:text-sm">
                      {item.age}
                    </span>
                  </div>

                  {/* Length Column */}
                  <div className="rounded-xl py-3 px-2 text-center flex items-center justify-center">
                    <span className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
                      {item.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Measurement Note */}
        <div className="px-4 sm:px-6 md:px-8 pb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2 text-right">
              <span className="text-amber-500 text-lg">📏</span>
              <div className="space-y-2">
                <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">
                  طول الكولون يتم قياسه من أعلى الخصر حتى أسفل القدم
                </p>
                <p className="text-amber-600 text-xs sm:text-sm leading-relaxed">
                  • المقاسات تقريبية وقد تختلف قليلًا حسب طول جسم الطفلة
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-100 pt-4 pb-5 px-4 sm:px-6 md:px-8 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Shield className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-500">
              🎀 اختاري المقاس المناسب لطفلتك لضمان الراحة والأناقة 🎀
            </span>
            <Shield className="w-4 h-4 text-pink-400" />
          </div>
        </div>

        {/* Stylish Tip Tab */}
        <div className="px-4 sm:px-6 md:px-8 pb-6">
          <div className="relative">
            {/* Toggle Button */}
            <button
              onClick={() => setShowTip(!showTip)}
              className="w-full group/tip relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600/20 to-pink-500/10 p-4 border border-pink-500/30 hover:border-pink-400 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover/tip:opacity-10 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <HelpCircle className="w-6 h-6 text-pink-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping"></span>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {showTip ? "اخفاء النصيحة" : "محتار بين مقاسين؟"}
                  </span>
                </div>
                <div className={`transform transition-transform duration-300 ${showTip ? 'rotate-180' : ''}`}>
                  <ArrowRightCircle className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            </button>

            {/* Tip Content with Animation */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showTip ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-pink-50/50 backdrop-blur-sm border border-pink-500/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl"></div>

                {/* Tip Content */}
                <div className="relative text-right">
                  <h3 className="text-lg font-bold text-pink-500 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    نصيحة مهمة
                    <Sparkles className="w-5 h-5" />
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    إذا كان طفلك بين مقاسين، ننصحك باختيار المقاس الأكبر.
                    هذا يضمن راحة طفلك ويتيح له مساحة للنمو.
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">مقاس أصغر</span>
                      <span className="text-red-400">✕</span>
                    </div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-700 font-medium">المقاس الأكبر</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                    <p className="text-pink-600 text-sm flex items-start gap-2">
                      <span className="text-pink-400 text-lg">💡</span>
                      <span>المقاس الأكبر يوفر راحة أكثر ومدة استخدام أطول لطفلك</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackToSchoolSizeTable;