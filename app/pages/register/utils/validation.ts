import { RegisterFormData } from "../types/register.types";

export const validateRegisterForm = (
  formData: RegisterFormData,
  isArabic: boolean = false
): string | null => {
  if (formData.password !== formData.confirmPassword) {
    return isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match";
  }
  if (formData.password.length < 6) {
    return isArabic ? "يجب أن تكون كلمة المرور 6 أحرف على الأقل" : "Password must be at least 6 characters";
  }
  if (!formData.agreeToTerms) {
    return isArabic ? "يجب الموافقة على شروط الخدمة" : "You must agree to the Terms of Service";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format";
  }
  return null;
};
