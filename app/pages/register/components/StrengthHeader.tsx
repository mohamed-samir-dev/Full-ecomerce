import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface StrengthHeaderProps {
  strengthText: string;
  isStrong: boolean;
  textColor: string;
}

export default function StrengthHeader({ strengthText, isStrong, textColor }: StrengthHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <span className="text-xs sm:text-sm font-medium text-gray-300">
        Password Strength
      </span>
      <div className="flex items-center space-x-1 sm:space-x-2">
        {isStrong && <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />}
        <span className={`text-xs sm:text-sm font-semibold ${textColor}`}>
          {strengthText}
        </span>
      </div>
    </div>
  );
}
