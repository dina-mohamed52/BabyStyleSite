import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  RefreshCw, 
  Truck, 
  CreditCard, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Heart,
  Ruler,
  AlertCircle,
  CheckCircle,
  Award,
  Clock,
  Wallet,
  RotateCw,
  ArrowLeft
} from 'lucide-react';

const FAQItem = ({ question, answer, icon, isOpen, onClick, index }) => {
  const colors = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-pink-500", 
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500"
  ];
  
  const gradient = colors[index % colors.length];

  return (
    <div 
      className={`group rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-white shadow-lg shadow-pink-200/50 border-pink-400"
          : "bg-white border-gray-200 hover:border-pink-300 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 text-right"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div
            className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isOpen ? `bg-gradient-to-br ${gradient} shadow-lg` : 'bg-gray-200'
            }`}
          >
            {React.cloneElement(icon, {
              className: `w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'text-white' : 'text-gray-600'}`,
            })}
          </div>
          <span
            className={`text-sm sm:text-base md:text-lg font-bold text-right flex-1 transition-colors duration-300 ${
              isOpen ? 'text-pink-600' : 'text-gray-800'
            }`}
          >
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-pink-500' : 'text-gray-400'}`} />
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-right border-t border-gray-100">
          <div className="flex items-start gap-3 bg-pink-50/80 rounded-xl p-3 sm:p-4 border border-pink-100">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "هل يوجد ضمان على المنتج؟",
      answer: "نعم، جميع منتجاتنا عليها ضمان ضد عيوب الصناعة لمدة 30 يوم من تاريخ الاستلام.",
      icon: <Award />
    },
    {
      question: "هل يوجد معاينة عند الاستلام؟",
      answer: "نعم، يتاح لك معاينة المنتج بالكامل قبل إتمام عملية الدفع، للتأكد من جودة وسلامة المنتج.",
      icon: <Eye />
    },
    {
      question: "هل يوجد استرجاع أو استبدال؟",
      answer: "يتاح الاسترجاع أو الاستبدال خلال 14 يوم من تاريخ الاستلام، مع تحمل العميل مصاريف الشحن، بشرط أن يكون المنتج لم يُلبس أو يُغسل.",
      icon: <RotateCw />
    },
    {
      question: "متى يصل المنتج؟",
      answer: "يتم توصيل طلبك خلال 2 إلى 5 أيام عمل حسب منطقتك. نحرص على سرعة التوصيل لوصول منتجك في أسرع وقت.",
      icon: <Clock />
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نوفر طرق دفع مرنة: الدفع عند الاستلام نقدًا، التحويل البنكي، أو عبر المحافظ الإلكترونية (فودافون كاش، إنستاباي).",
      icon: <Wallet />
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative max-w-4xl mx-auto my-8 sm:my-12 px-3 sm:px-4" dir="rtl">
      {/* Main Container */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="relative pt-8 sm:pt-10 pb-6 px-4 sm:px-6 md:px-8 text-center border-b border-gray-100">
          <div className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-1.5 text-xs font-medium mb-4 border-2 border-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span className="text-pink-700 font-bold">مركز المساعدة</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            الأسئلة <span className="text-pink-500">الشائعة</span>
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3 text-pink-400" />
            كل اللي محتاجة تعرفيه قبل ما تطلبي
            <ArrowLeft className="w-3 h-3 text-pink-400" />
          </p>
        </div>

        {/* FAQ List */}
        <div className="relative px-4 sm:px-6 md:px-8 py-6 space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              icon={faq.icon}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Important Notes */}
        <div className="px-4 sm:px-6 md:px-8 pb-6">
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-4 sm:p-6 border-2 border-pink-300/50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30 mt-0.5">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📌</span>
                  <span>ملاحظات هامة</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 text-base font-bold">•</span>
                    <span>الاستبدال والاسترجاع بمصاريف شحن على العميل، بشرط أن يكون المنتج لم يُلبس أو يُغسل</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 text-base font-bold">•</span>
                    <span>طول الكولون يتم قياسه من أعلى الخصر حتى أسفل القدم</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 text-base font-bold">•</span>
                    <span>المقاسات تقريبية وقد تختلف قليلًا حسب طول جسم الطفلة</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-pink-200 pt-4 pb-5 px-4 sm:px-6 md:px-8 text-center bg-pink-50/50">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-sm text-gray-600 font-medium">🎀 نسعد بخدمتك - فريق متخصص لمساعدتك</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;