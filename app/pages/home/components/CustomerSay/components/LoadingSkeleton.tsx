import { useTheme } from "@/context/ThemeContext";

export const LoadingSkeleton = () => {
  const { isDarkMode } = useTheme();
  return (
    <section className={`py-16 sm:py-20 lg:py-28 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-pulse mb-12">
          <div className={`h-4 w-28 mx-auto mb-5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className={`h-8 w-64 mx-auto mb-4 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className={`h-0.5 w-16 mx-auto rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
        </div>
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] rounded-2xl p-5 animate-pulse ${
              isDarkMode ? 'bg-white/5' : 'bg-white/60'
            }`}>
              <div className={`h-3 w-20 rounded-full mb-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              <div className={`h-3 w-full rounded-full mb-2 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              <div className={`h-3 w-3/4 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
