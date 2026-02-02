import { useState } from "react";
import { User, EditData, PasswordStrength } from "../types/types";
import { checkPasswordStrength } from "../utils/passwordStrength";

export const useAccountInfo = (user: User, setUser: (user: User) => void) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    name: user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    message: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handlePasswordChange = (password: string) => {
    setEditData({ ...editData, newPassword: password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSave = async () => {
    if (editData.newPassword) {
      if (!editData.currentPassword) {
        setError("Current password is required to change password");
        return;
      }
      if (passwordStrength.score < 5) {
        setError(
          "Password must be strong (8+ chars, uppercase, lowercase, number, special character)"
        );
        return;
      }
    }

    setLoading(true);
    setError("");
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
        setIsEditing(false);

        const storedUser =
          localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.name = data.data.name;
          userData.email = data.data.email;
          if (localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            sessionStorage.setItem("user", JSON.stringify(userData));
          }
        }
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
    });
    setError("");
    setPasswordStrength({ score: 0, message: "" });
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    editData,
    setEditData,
    loading,
    error,
    passwordStrength,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    handlePasswordChange,
    handleSave,
    handleCancel,
  };
};
