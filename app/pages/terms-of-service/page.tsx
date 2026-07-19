"use client";

import { useTranslation } from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import { ScrollText } from "lucide-react";

const gold = "#C9A84C";
const goldGradient = "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)";

export default function TermsOfServicePage() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const sections = [
    { title: t("terms.s1.title"), content: t("terms.s1.content") },
    { title: t("terms.s2.title"), content: t("terms.s2.content") },
    { title: t("terms.s3.title"), content: t("terms.s3.content") },
    { title: t("terms.s4.title"), content: t("terms.s4.content") },
    { title: t("terms.s5.title"), content: t("terms.s5.content") },
    { title: t("terms.s6.title"), content: t("terms.s6.content") },
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-10 relative z-10 text-center space-y-4">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mx-auto"
            style={{ background: `${gold}15`, border: `1px solid ${gold}40` }}
          >
            <ScrollText size={24} style={{ color: gold }} />
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {t("terms.title")}
          </h1>

          <p className={`text-sm ${isDarkMode ? "text-white/40" : "text-gray-400"}`}>
            {t("terms.lastUpdated")}
          </p>

          <div className="flex justify-center pt-1">
            <div className="h-[2px] w-16 rounded-full" style={{ background: goldGradient }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
        {/* Intro card */}
        <div
          className={`rounded-2xl p-6 border ${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-100"
          }`}
        >
          <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
            {t("terms.intro")}
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 border transition-all duration-300 hover:border-[#C9A84C]/40 ${
              isDarkMode
                ? "bg-[#1A1A1A] border-white/8"
                : "bg-white border-gray-100"
            }`}
          >
            <h2
              className="text-base font-bold mb-3"
              style={{ color: gold }}
            >
              {section.title}
            </h2>
            <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
              {section.content}
            </p>
          </div>
        ))}

        {/* Contact note */}
        <p
          className={`text-xs sm:text-sm text-center pt-2 pb-4 ${
            isDarkMode ? "text-white/30" : "text-gray-400"
          }`}
        >
          {t("terms.contact")}
        </p>
      </div>
    </div>
  );
}
