interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}

export const Pagination = ({ page, totalPages, setPage, isDarkMode, isArabic }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center items-center gap-2">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-4 py-2 border-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'}`}
      >
        {isArabic ? 'السابق' : 'Previous'}
      </button>
      
      <div className="flex gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === pageNum
                  ? isDarkMode ? 'bg-blue-600 text-white border-2 border-blue-600' : 'bg-gray-900 text-white border-2 border-gray-900'
                  : isDarkMode ? 'bg-gray-800 border-2 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-2 border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-4 py-2 border-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'}`}
      >
        {isArabic ? 'التالي' : 'Next'}
      </button>
    </div>
  );
};
