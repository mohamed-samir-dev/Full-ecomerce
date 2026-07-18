import { RegisterFormData, RegisterResponse } from "../types/register.types";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/check-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data.exists === true;
  } catch {
    return false;
  }
};

export const registerUser = async (formData: RegisterFormData): Promise<RegisterResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        phone: formData.phone || undefined,
      }),
    }
  );

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      throw new Error(data.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }

  return response.json();
};
