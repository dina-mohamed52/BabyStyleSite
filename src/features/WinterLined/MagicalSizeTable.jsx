import React from 'react';

function MagicalSizeTable() {
  const sizes = [
    { 
      label: 'S', 
      age: 'من 3 لـ 6 سنين', 
      gradient: 'from-pink-400 to-rose-400',
      bgHover: 'hover:bg-pink-50',
      ringColor: 'ring-pink-200',
      icon: '🌸'
    },
    { 
      label: 'M', 
      age: 'من 6 لـ 8 سنين', 
      gradient: 'from-purple-400 to-fuchsia-400',
      bgHover: 'hover:bg-purple-50',
      ringColor: 'ring-purple-200',
      icon: '🦋'
    },
    { 
      label: 'L', 
      age: 'من 8 لـ 12 سنة', 
      gradient: 'from-sky-400 to-cyan-400',
      bgHover: 'hover:bg-sky-50',
      ringColor: 'ring-sky-200',
      icon: '✨'
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8" dir="rtl">
      {/* الحاوية الرئيسية بتأثير زجاجي وتدرج لوني */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
        
        {/* دوائر ملونة في الخلفية للديكور */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

        {/* العنوان */}
        <div className="relative text-center mb-8 z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3">
            اختاري مقاس بنتك صح
          </h2>
          <span className="inline-block text-xs font-bold text-pink-600 bg-pink-100/80 px-5 py-1.5 rounded-full border border-pink-200 shadow-sm">
            دليل المقاسات
          </span>
        </div>

        {/* جدول المقاسات */}
        <div className="relative space-y-3 z-10">
          {sizes.map((item, index) => (
            <div 
              key={index}
              className={`group relative flex items-center justify-between bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${item.bgHover} hover:-translate-y-1`}
            >
              {/* الحرف (S, M, L) مع تدرج لوني */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white font-black text-xl shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                {item.label}
              </div>
              
              {/* الفئة العمرية */}
              <div className="flex-1 px-4">
                <p className="text-gray-800 font-bold text-base sm:text-lg group-hover:text-gray-900 transition-colors">
                  {item.age}
                </p>
              </div>

              {/* أيقونة تفاعلية */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-white group-hover:${item.ringColor} group-hover:ring-2 transition-all duration-300`}>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ملاحظة أسفل الجدول */}
        <div className="relative mt-8 pt-6 border-t border-dashed border-gray-200 z-10">
          <p className="text-sm text-gray-500 text-center leading-relaxed font-medium">
            محتارة؟ ابعتيلنا سن ووزن بنتك على واتساب <br />
            <span className="text-pink-500 font-bold">ونقولك المقاس المناسب فوراً 💌</span>
          </p>
        </div>
      </div>

      {/* أنماط CSS مخصصة للحركة (اختياري إذا كنت تستخدم Tailwind فقط يمكنك حذفها) */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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

export default MagicalSizeTable;