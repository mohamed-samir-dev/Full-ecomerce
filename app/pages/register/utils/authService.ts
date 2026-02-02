import {
  RegisterFormData,
  RegisterResponse,
  User,
} from "../types/register.types";

export const registerUser = async (
  formData: RegisterFormData,
): Promise<RegisterResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      }),
    },
  );

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      throw new Error(data.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }

  const data = await response.json();

  return data;
};

export const saveAuthData = (token: string, user: User) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
