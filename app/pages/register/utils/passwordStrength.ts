import zxcvbn from 'zxcvbn';

export const analyzePassword = (password: string) => {
  if (!password) return null;
  return zxcvbn(password);
};

export const getStrengthColor = (score: number) => {
  switch (score) {
    case 0: return { text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-200' };
    case 1: return { text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-200' };
    case 2: return { text: 'text-yellow-500', bg: 'bg-yellow-500', border: 'border-yellow-200' };
    case 3: return { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-200' };
    case 4: return { text: 'text-green-500', bg: 'bg-green-500', border: 'border-green-200' };
    default: return { text: 'text-gray-400', bg: 'bg-gray-400', border: 'border-gray-200' };
  }
};

export const getStrengthText = (score: number, t: (key: string) => string) => {
  switch (score) {
    case 0: return t('register.strength.veryWeak');
    case 1: return t('register.strength.weak');
    case 2: return t('register.strength.fair');
    case 3: return t('register.strength.good');
    case 4: return t('register.strength.strong');
    default: return '';
  }
};
