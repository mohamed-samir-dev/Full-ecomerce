import { ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface FeedbackMessageProps {
  warning?: string;
  suggestions: string[];
  borderColor: string;
}

export default function FeedbackMessage({ warning, suggestions, borderColor }: FeedbackMessageProps) {
  if (!warning && suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      {warning && (
        <div className={`flex items-start space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-orange-500/10 ${borderColor} border`}>
          <ExclamationTriangleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
          <p className="text-xs sm:text-sm text-black leading-relaxed">{warning}</p>
        </div>
      )}
      
      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.slice(0, 2).map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-blue-500/10 border border-blue-200/20">
              <LightBulbIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-black leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
