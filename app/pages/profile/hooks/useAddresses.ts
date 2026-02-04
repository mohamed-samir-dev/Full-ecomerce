import { useState } from "react";
import { AddressFormData, User } from "../types/types";

export const useAddresses = (user: User, setUser: (user: User) => void) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<AddressFormData>({
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAddAddress = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(
        "https://backend-for-global-shop-production-a385.up.railway.app/api/users/addresses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddress),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, addresses: data.data });
        setNewAddress({
          label: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(
        `https://backend-for-global-shop-production-a385.up.railway.app/api/users/addresses/${addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, addresses: data.data });
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return {
    showAddForm,
    setShowAddForm,
    newAddress,
    setNewAddress,
    loading,
    handleAddAddress,
    handleDeleteAddress,
  };
};
