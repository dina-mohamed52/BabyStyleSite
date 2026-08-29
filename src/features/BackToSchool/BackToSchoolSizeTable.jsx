import React from 'react';
import { Ruler, Baby, User, Star, Sparkles, Heart, Crown, Shield, CheckCircle } from 'lucide-react';

const BackToSchoolSizeTable = () => {
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
      </div>
    </div>
  );
};

export default BackToSchoolSizeTable;