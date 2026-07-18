'use client';

import { useTranslation } from '@/i18n';

interface Rule {
  key: string;
  ar: string;
  en: string;
  test: (p: string) => boolean;
}

const RULES: Rule[] = [
  { key: 'len',    ar: '8 أحرف على الأقل',   en: 'At least 8 characters',    test: p => p.length >= 8 },
  { key: 'upper', ar: 'حرف كبير',             en: 'Uppercase letter',          test: p => /[A-Z]/.test(p) },
  { key: 'num',   ar: 'رقم',                  en: 'Number',                    test: p => /[0-9]/.test(p) },
  { key: 'sym',   ar: 'رمز خاص',              en: 'Special character',         test: p => /[^A-Za-z0-9]/.test(p) },
];

export default function PasswordRules({ password }: { password: string }) {
  const { isArabic } = useTranslation();

  return (
    <div className="mt-2 grid grid-cols-2 gap-1">
      {RULES.map(rule => {
        const ok = rule.test(password);
        return (
          <div key={rule.key} className={`flex items-center gap-1.5 text-xs transition-colors ${ok ? 'text-green-400' : 'text-gray-400'}`}>
            <span className="text-sm">{ok ? '✅' : '❌'}</span>
            <span>{isArabic ? rule.ar : rule.en}</span>
          </div>
        );
      })}
    </div>
  );
}
