interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export default function LoadingSpinner({ isDarkMode }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="relative">
        <div className={`w-20 h-20 border-4 rounded-full animate-spin ${isDarkMode ? 'border-gray-700 border-t-blue-400' : 'border-gray-200 border-t-blue-600'}`}></div>
      </div>
    </div>
  );
}
