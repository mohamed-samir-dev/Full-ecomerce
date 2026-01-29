import {
  LoginFormData,
  LoginResponse,
  User,
} from "../../../pages/login/types/login.types";

export const loginUser = async (
  formData: LoginFormData,
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const saveAuthData = (
  token: string,
  user: User,
  rememberMe: boolean,
) => {
  console.log("Saving auth data:", {
    token: token.substring(0, 20) + "...",
    user,
    rememberMe,
  });
  if (rememberMe) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Saved to localStorage");
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    console.log("Saved to sessionStorage");
  }
};
