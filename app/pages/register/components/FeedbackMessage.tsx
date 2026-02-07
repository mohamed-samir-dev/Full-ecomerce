import { ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { translateWarning, translateSuggestion } from '../utils/translateFeedback';

interface FeedbackMessageProps {
  warning?: string;
  suggestions: string[];
  borderColor: string;
}

export default function FeedbackMessage({ warning, suggestions, borderColor }: FeedbackMessageProps) {
  const { isArabic } = useTranslation();
  
  if (!warning && suggestions.length === 0) return null;

  const translatedWarning = warning ? translateWarning(warning, isArabic) : '';
  const translatedSuggestions = suggestions.map(s => translateSuggestion(s, isArabic));

  return (
    <div className="space-y-2">
      {translatedWarning && (
        <div className={`flex items-start ${isArabic ? 'space-x-reverse' : ''} space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-orange-500/10 ${borderColor} border`}>
          <ExclamationTriangleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
          <p className="text-xs sm:text-sm text-black leading-relaxed">{translatedWarning}</p>
        </div>
      )}
      
      {translatedSuggestions.length > 0 && (
        <div className="space-y-2">
          {translatedSuggestions.slice(0, 2).map((suggestion, index) => (
            <div key={index} className={`flex items-start ${isArabic ? 'space-x-reverse' : ''} space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-blue-500/10 border border-blue-200/20`}>
              <LightBulbIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-black leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
