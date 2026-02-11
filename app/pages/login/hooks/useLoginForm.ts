import { useState } from "react";
import { LoginFormData } from "../types/login.types";
import { loginUser, saveAuthData } from "../../login/utils/authService";
import { migrateLocalWishlistToDatabase } from "@/services/wishlistMigration";
import { useLanguage } from "@/context/LanguageContext";

export const useLoginForm = () => {
  const { isArabic } = useLanguage();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(isArabic ? "يرجى إدخال البريد الإلكتروني وكلمة المرور" : "Please provide email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData, isArabic);
      console.log("Login response:", data);

      if (data.success && data.token) {
        saveAuthData(data.token, data.user);
        console.log("User role:", data.user.role);

        await migrateLocalWishlistToDatabase();

        if (data.user.role === "admin") {
          localStorage.setItem("localAdminLoggedIn", "true");
          console.log("Redirecting to admin page");
          window.location.href = "/admin";
        } else {
          console.log("Redirecting to home page");
          window.location.href = "/";
        }
      } else {
        console.error("Login failed:", data);
        setError(isArabic ? "فشل تسجيل الدخول" : "Login failed");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
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
    handleChange,
    handleSubmit,
    setShowPassword,
    setRememberMe,
  };
};
