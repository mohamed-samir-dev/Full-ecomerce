export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}
export interface LoginFormProps {
  formData: { email: string; password: string };
  showPassword: boolean;
  rememberMe: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onShowPasswordToggle: () => void;
  onRememberMeChange: (checked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
