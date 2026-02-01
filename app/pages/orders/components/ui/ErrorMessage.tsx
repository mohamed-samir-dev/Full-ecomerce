interface ErrorMessageProps {
  message: string;
  isDarkMode: boolean;
}

export default function ErrorMessage({ message, isDarkMode }: ErrorMessageProps) {
  return (
    <div className={`p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl mb-4 sm:mb-6 ${
      isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'
    }`}>
      {message}
    </div>
  );
}
