import React from 'react';

function PlainLinedSizeTable() {
  // بيانات الجدول بناءً على الصورة
  const sizes = [
    { size: '0', age: 'من 0 إلى 9 شهور', length: '40' },
    { size: '2', age: 'من سنة إلى سنتين', length: '45' },
    { size: '4', age: 'من 2 إلى 4 سنوات', length: '50' },
    { size: '6', age: 'من 5 إلى 6 سنوات', length: '60' },
    { size: '8', age: 'من 7 إلى 8 سنوات', length: '70' },
    { size: '10', age: 'من 9 إلى 10 سنوات', length: '80' },
    { size: '12', age: 'من 11 إلى 12 سنة', length: '90' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* الحاوية الرئيسية مع تأثير الظل والحواف */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        
        <table className="w-full text-center border-collapse">
          
          {/* رأس الجدول */}
          <thead>
            <tr className="bg-[#C25B7A] text-white">
              <th className="py-4 px-2 sm:px-4 font-bold text-base sm:text-lg w-1/3 border-l border-white/20 last:border-0">
                المقاس
              </th>
              <th className="py-4 px-2 sm:px-4 font-bold text-base sm:text-lg w-1/3 border-l border-white/20 last:border-0">
                العمر المناسب
              </th>
              <th className="py-4 px-2 sm:px-4 font-bold text-base sm:text-lg w-1/3">
                طول الكولون
              </th>
            </tr>
          </thead>

          {/* جسم الجدول */}
          <tbody>
            {sizes.map((item, index) => (
              <tr 
                key={index}
                className={`
                  transition-colors duration-200 group
                  ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5F7]'} 
                  hover:bg-[#FFEBEF]
                `}
              >
                {/* عمود المقاس */}
                <td className="py-4 px-2 sm:px-4 border-b border-gray-100 last:border-0">
                  <span className="text-xl sm:text-2xl font-black text-[#8B1C3F] group-hover:scale-110 inline-block transition-transform duration-300">
                    {item.size}
                  </span>
                </td>

                {/* عمود العمر */}
                <td className="py-4 px-2 sm:px-4 border-b border-gray-100 last:border-0">
                  <span className="text-sm sm:text-base font-semibold text-gray-700">
                    {item.age}
                  </span>
                </td>

                {/* عمود الطول */}
                <td className="py-4 px-2 sm:px-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg sm:text-xl font-extrabold text-[#8B1C3F]">
                      {item.length}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-500">
                      سم
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>

      {/* ملاحظة أسفل الجدول (اختياري) */}
      <p className="text-center text-xs sm:text-sm text-gray-400 mt-4 font-medium">
        * المقاسات تقريبية وقد تختلف قليلاً حسب تصميم الموديل.
      </p>
    </div>
  );
}

export default PlainLinedSizeTable;