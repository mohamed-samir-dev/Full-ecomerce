import { RegisterFormData } from "../types/register.types";

export const validateRegisterForm = (
  formData: RegisterFormData,
): string | null => {
  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match";
  }
  if (formData.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (!formData.agreeToTerms) {
    return "You must agree to the Terms of Service";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Invalid email format";
  }
  return null;
};
