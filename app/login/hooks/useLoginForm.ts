import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData } from '../types/login.types';
import { loginUser, saveAuthData } from '../utils/authService';

export const useLoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please provide email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginUser(formData);

      if (data.success && data.token) {
        saveAuthData(data.token, data.user, rememberMe);
        router.push('/');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    rememberMe,
    loading,
    error,
    handleChange,
    handleSubmit,
    setShowPassword,
    setRememberMe,
  };
};
