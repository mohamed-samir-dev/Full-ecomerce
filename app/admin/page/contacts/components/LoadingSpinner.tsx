interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export const LoadingSpinner = ({ isDarkMode }: LoadingSpinnerProps) => (
  <div className="flex items-center justify-center h-64">
    <div className="relative">
      <div className={`animate-spin rounded-full h-16 w-16 border-4 ${isDarkMode ? 'border-gray-700' : 'border-blue-200'}`}></div>
      <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent absolute top-0 left-0 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
    </div>
  </div>
);
