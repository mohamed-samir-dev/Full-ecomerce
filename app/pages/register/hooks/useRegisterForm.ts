import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RegisterFormData } from '../types/register.types';
import { validateRegisterForm } from '../utils/validation';
import { registerUser, checkEmailExists } from '../utils/authService';
import { migrateLocalWishlistToDatabase } from '@/services/wishlistMigration';
import { useLanguage } from '@/context/LanguageContext';

export const useRegisterForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [success, setSuccess] = useState<'' | 'done' | 'verify'>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setError('');
    if (name === 'email') setEmailError('');
    if (name === 'phone') setPhoneError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPhoneError('');

    const phoneRegex = /^01\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setPhoneError(isArabic ? 'رقم الهاتف يجب أن يبدأ بـ 01 ويكون 10 أرقام' : 'Phone number must start with 01 and be 10 digits');
      return;
    }

    const validationError = validateRegisterForm(formData, isArabic);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const exists = await checkEmailExists(formData.email);
      if (exists) {
        setEmailError(isArabic ? 'المستخدم موجود بالفعل' : 'User already exists');
        setLoading(false);
        return;
      }

      const data = await registerUser(formData);

      if (data.success) {
        if (data.token) {
          login({ ...data.user, name: data.user.name || `${formData.firstName} ${formData.lastName}` }, data.token);
          await migrateLocalWishlistToDatabase();
          setSuccess('done');
          setTimeout(() => {
            router.refresh();
            router.push('/');
          }, 1500);
        } else {
          setSuccess('verify');
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : (isArabic ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during registration');
      const translatedMsg = errorMsg === 'User already exists'
        ? (isArabic ? 'المستخدم موجود بالفعل' : errorMsg)
        : errorMsg;
      setError(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    error,
    emailError,
    phoneError,
    success,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword,
  };
};
