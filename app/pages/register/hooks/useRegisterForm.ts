import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RegisterFormData } from '../types/register.types';
import { validateRegisterForm } from '../utils/validation';
import { registerUser } from '../utils/authService';
import { migrateLocalWishlistToDatabase } from '@/services/wishlistMigration';

export const useRegisterForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateRegisterForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(formData);

      if (data.success && data.token) {
        login({ ...data.user, name: data.user.name || `${formData.firstName} ${formData.lastName}` }, data.token);
        await migrateLocalWishlistToDatabase();
        router.refresh();
        router.push('/');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
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
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword,
  };
};
