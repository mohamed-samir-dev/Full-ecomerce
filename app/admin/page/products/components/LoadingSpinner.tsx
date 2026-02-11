interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export const LoadingSpinner = ({ isDarkMode }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
    </div>
  );
};
