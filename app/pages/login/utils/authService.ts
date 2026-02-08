import {
  LoginFormData,
  LoginResponse,
  User,
} from "../../../pages/login/types/login.types";

export const loginUser = async (
  formData: LoginFormData,
  isArabic: boolean = false,
): Promise<LoginResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      }),
    },
  );

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      const errorMsg = data.message?.toLowerCase().includes("credential") || data.message?.toLowerCase().includes("invalid")
        ? (isArabic ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password")
        : data.message;
      throw new Error(errorMsg || (isArabic ? "فشل تسجيل الدخول" : "Login failed"));
    }
    throw new Error(isArabic ? "فشل تسجيل الدخول" : "Login failed");
  }

  const data = await response.json();

  return data;
};

export const saveAuthData = (
  token: string,
  user: User,
) => {
  const loginTime = new Date().getTime();
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loginTime", loginTime.toString());
};
