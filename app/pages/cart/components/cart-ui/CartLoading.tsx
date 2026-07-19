'use client';

interface CartLoadingProps {
  isDarkMode: boolean;
}

export default function CartLoading({ isDarkMode }: CartLoadingProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
      {/* Items skeleton */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className={`h-4 w-20 rounded-full mb-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-8 w-44 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
          <div className={`h-px w-full mt-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
        </div>

        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={`p-5 rounded-2xl border ${
              isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
            }`}
          >
            <div className="flex gap-4">
              <div className={`w-28 h-28 rounded-xl shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
              <div className="flex-1 space-y-3">
                <div className={`h-4 w-3/4 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className={`h-4 w-1/3 rounded ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                <div className={`h-5 w-1/4 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                <div className="flex justify-between items-center">
                  <div className={`h-9 w-28 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                  <div className={`h-6 w-20 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary skeleton */}
      <div
        className={`rounded-2xl border p-6 h-fit ${
          isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-5 w-28 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex justify-between">
              <div className={`h-4 w-24 rounded ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
              <div className={`h-4 w-16 rounded ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
            </div>
          ))}
          <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className={`h-12 w-full rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-10 w-full rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
        </div>
      </div>
    </div>
  );
}
