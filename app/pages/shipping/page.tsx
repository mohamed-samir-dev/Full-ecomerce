"use client";

import { useTranslation } from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import { Truck, Clock, MapPin, Package, ShieldCheck, PhoneCall } from "lucide-react";

const gold = "#C9A84C";
const goldGradient = "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)";

export default function ShippingPage() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const cards = [
    {
      icon: <Truck size={22} />,
      title: isArabic ? "الشحن المجاني" : "Free Shipping",
      desc: isArabic
        ? "شحن مجاني على جميع الطلبات التي تتجاوز 15,000 جنيه مصري."
        : "Free shipping on all orders over 15,000 EGP.",
    },
    {
      icon: <Clock size={22} />,
      title: isArabic ? "وقت التوصيل" : "Delivery Time",
      desc: isArabic
        ? "يتم التوصيل خلال 3-5 أيام عمل داخل القاهرة والجيزة، و5-7 أيام للمحافظات الأخرى."
        : "Delivery within 3-5 business days in Cairo & Giza, and 5-7 days for other governorates.",
    },
    {
      icon: <MapPin size={22} />,
      title: isArabic ? "مناطق التوصيل" : "Delivery Areas",
      desc: isArabic
        ? "نوصل لجميع محافظات مصر. يتم التواصل معك لتأكيد الطلب قبل الشحن."
        : "We deliver to all Egyptian governorates. We will contact you to confirm before shipping.",
    },
    {
      icon: <Package size={22} />,
      title: isArabic ? "تغليف آمن" : "Secure Packaging",
      desc: isArabic
        ? "جميع المنتجات تُغلَّف بعناية لضمان وصولها بحالة ممتازة."
        : "All products are carefully packaged to ensure they arrive in perfect condition.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: isArabic ? "تتبع الشحنة" : "Order Tracking",
      desc: isArabic
        ? "ستصلك رسالة تأكيد بعد الشحن. يمكنك متابعة طلبك من صفحة طلباتي."
        : "You will receive a confirmation message after shipping. Track your order from My Orders page.",
    },
    {
      icon: <PhoneCall size={22} />,
      title: isArabic ? "الدعم والمساعدة" : "Support & Help",
      desc: isArabic
        ? "فريق خدمة العملاء متاح من الإثنين إلى السبت من 9 صباحاً حتى 6 مساءً."
        : "Customer support is available Monday to Saturday from 9AM to 6PM.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-[#141414]" : "bg-[#F5F0EA]"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-10 relative z-10 text-center space-y-4">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mx-auto"
            style={{ background: `${gold}15`, border: `1px solid ${gold}40` }}
          >
            <Truck size={24} style={{ color: gold }} />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {isArabic ? "معلومات الشحن" : "Shipping Information"}
          </h1>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${isDarkMode ? "text-white/50" : "text-gray-500"}`}>
            {isArabic
              ? "كل ما تحتاج معرفته عن الشحن والتوصيل لطلباتك"
              : "Everything you need to know about shipping and delivery for your orders"}
          </p>
          <div className="flex justify-center pt-1">
            <div className="h-[2px] w-16 rounded-full" style={{ background: goldGradient }} />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border transition-all duration-300 hover:border-[#C9A84C]/40 hover:-translate-y-1 ${
                isDarkMode ? "bg-[#1A1A1A] border-white/8" : "bg-white border-gray-100"
              }`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${gold}15`, color: gold }}
              >
                {card.icon}
              </div>
              <h2 className={`font-bold text-base mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {card.title}
              </h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-white/55" : "text-gray-500"}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className={`mt-8 rounded-2xl p-5 border text-sm leading-relaxed ${
            isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-white border-gray-100 text-gray-500"
          }`}
        >
          <span style={{ color: gold }} className="font-bold">
            {isArabic ? "ملاحظة: " : "Note: "}
          </span>
          {isArabic
            ? "قد تتأخر أوقات التوصيل في أيام الإجازات الرسمية والمناسبات. سيتم إخطارك بأي تأخير محتمل."
            : "Delivery times may be extended during public holidays and special occasions. You will be notified of any potential delays."}
        </div>
      </div>
    </div>
  );
}
