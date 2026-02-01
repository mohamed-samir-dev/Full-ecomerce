'use client';

interface CartLoadingProps {
  isDarkMode: boolean;
}

export default function CartLoading({ isDarkMode }: CartLoadingProps) {
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl p-6 animate-pulse ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`h-6 rounded w-1/3 mb-4 ${
          isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
        }`}></div>
        <div className={`h-4 rounded w-2/3 ${
          isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
        }`}></div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className={`rounded-2xl p-6 animate-pulse ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className="flex gap-4">
            <div className={`w-24 h-24 rounded-lg ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
            }`}></div>
            <div className="flex-1 space-y-3">
              <div className={`h-4 rounded w-3/4 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}></div>
              <div className={`h-4 rounded w-1/2 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
