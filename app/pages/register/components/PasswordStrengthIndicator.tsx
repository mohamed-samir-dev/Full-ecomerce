'use client';

import { useMemo } from 'react';
import { analyzePassword, getStrengthColor, getStrengthText } from '../utils/passwordStrength';
import StrengthHeader from './StrengthHeader';
import StrengthBar from './StrengthBar';
import FeedbackMessage from './FeedbackMessage';
import { useTranslation } from '@/i18n';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export default function PasswordStrengthIndicator({ password, className = '' }: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();
  const analysis = useMemo(() => analyzePassword(password), [password]);

  if (!analysis) return null;

  const colors = getStrengthColor(analysis.score);
  const strengthText = getStrengthText(analysis.score, t);
  const isStrong = analysis.score >= 3;

  return (
    <div className={`mt-2 sm:mt-3 ${className}`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
        <StrengthHeader strengthText={strengthText} isStrong={isStrong} textColor={colors.text} />
        <StrengthBar score={analysis.score} colors={colors} />
        <FeedbackMessage 
          warning={analysis.feedback.warning}
          suggestions={analysis.feedback.suggestions}
          borderColor={colors.border}
        />
      </div>
    </div>
  );
}
