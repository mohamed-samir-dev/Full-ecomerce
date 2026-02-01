interface LoadingSkeletonProps {
  isDarkMode: boolean;
}

export default function LoadingSkeleton({ isDarkMode }: LoadingSkeletonProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1d24]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className={`h-12 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-24 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            ))}
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-48 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
