import { RegisterFormData } from "../types/register.types";

export const validateRegisterForm = (
  formData: RegisterFormData,
  isArabic: boolean = false
): string | null => {
  if (!formData.firstName.trim()) {
    return isArabic ? "يرجى إدخال الاسم الأول" : "First name is required";
  }
  if (!formData.lastName.trim()) {
    return isArabic ? "يرجى إدخال اسم العائلة" : "Last name is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format";
  }
  if (formData.password.length < 8) {
    return isArabic ? "يجب أن تكون كلمة المرور 8 أحرف على الأقل" : "Password must be at least 8 characters";
  }
  if (formData.password !== formData.confirmPassword) {
    return isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match";
  }
  const phoneRegex = /^01\d{8}$/;
  if (!phoneRegex.test(formData.phone)) {
    return isArabic ? "رقم الهاتف يجب أن يبدأ بـ 01 ويكون 10 أرقام" : "Phone number must start with 01 and be 10 digits";
  }
  if (!formData.agreeToTerms) {
    return isArabic ? "يجب الموافقة على شروط الخدمة" : "You must agree to the Terms of Service";
  }
  return null;
};