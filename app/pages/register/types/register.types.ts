export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface RegisterResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}
export interface RegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
