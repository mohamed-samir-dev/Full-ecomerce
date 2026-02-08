import { PasswordStrength } from "../types/types";

export const checkPasswordStrength = (password: string, t: (key: string) => string): PasswordStrength => {
  if (!password) {
    return { score: 0, message: "" };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  const messages = [
    t('profile.passwordStrength.veryWeak'),
    t('profile.passwordStrength.weak'),
    t('profile.passwordStrength.fair'),
    t('profile.passwordStrength.good'),
    t('profile.passwordStrength.strong')
  ];
  return { score, message: messages[score - 1] || t('profile.passwordStrength.veryWeak') };
};
