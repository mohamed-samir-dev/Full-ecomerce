import { useTheme } from '@/context/ThemeContext';

export default function WishlistLoading() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-10 animate-pulse">
          <div className={`h-4 w-16 rounded-full mb-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-8 w-40 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
          <div className={`h-3 w-56 rounded mt-2 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className={`h-px w-full mt-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden border ${
                isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
              }`}
            >
              <div className={`h-52 sm:h-60 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
              <div className="p-4 space-y-3">
                <div className={`h-4 w-3/4 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className={`h-4 w-1/2 rounded ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                <div className={`h-6 w-1/3 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                <div className={`h-10 w-full rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
