import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData } from "../types/login.types";
import { loginUser } from "../../login/utils/authService";
import { migrateLocalWishlistToDatabase } from "@/services/wishlistMigration";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export const useLoginForm = () => {
  const { isArabic } = useLanguage();
  const { login, user } = useAuth();
  const router = useRouter();
  const attemptCount = useRef(0);
  const windowStart = useRef<number>(0);

  const savedEmail = typeof window !== 'undefined' && localStorage.getItem('rememberMe') === 'true'
    ? localStorage.getItem('rememberedEmail') || ''
    : '';

  const [formData, setFormData] = useState<LoginFormData>({
    email: savedEmail,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    typeof window !== 'undefined' && localStorage.getItem('rememberMe') === 'true'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    if (name === 'email') {
      setEmailError(value && !EMAIL_REGEX.test(value)
        ? (isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format")
        : ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(isArabic ? "يرجى إدخال البريد الإلكتروني وكلمة المرور" : "Please provide email and password");
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError(isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format");
      return;
    }

    const now = Date.now();
    if (now - windowStart.current > RATE_LIMIT_WINDOW_MS) {
      attemptCount.current = 0;
      windowStart.current = now;
    }
    if (attemptCount.current >= RATE_LIMIT_MAX) {
      setError(isArabic ? "محاولات كثيرة، انتظر دقيقة وحاول مجدداً" : "Too many attempts, please wait a minute");
      return;
    }
    attemptCount.current += 1;

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData, isArabic);

      if (data.success && data.token) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        setFormData({ email: "", password: "" });

        login(data.user, data.token, rememberMe);
        await migrateLocalWishlistToDatabase();

        setTimeout(() => {
          if (data.user.role === "admin") {
            localStorage.setItem("localAdminLoggedIn", "true");
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }, 1500);
      } else {
        setError(isArabic ? "فشل تسجيل الدخول" : "Login failed");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : (isArabic ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password"),
      );
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
    emailError,
    handleChange,
    handleSubmit,
    setShowPassword,
    setRememberMe,
  };
};
