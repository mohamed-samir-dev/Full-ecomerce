interface LoadingSkeletonProps {
  isDarkMode: boolean;
}

export default function LoadingSkeleton({ isDarkMode }: LoadingSkeletonProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className={`h-12 w-64 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-28 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`} />
            ))}
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-40 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
