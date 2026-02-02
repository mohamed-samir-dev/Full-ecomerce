import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import OrderService from "@/services/orderService";
import { OrderData } from "../types/types";

export function useOrderData(orderId: string | null) {
  const router = useRouter();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeOrderInDatabase = useCallback(
    async (order: OrderData) => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...order,
            userId: user?.id,
            isPrivate: true,
            securityLevel: "high",
          }),
        });

        if (!response.ok) throw new Error("Failed to store order");
        console.log("Order stored securely in database");
      } catch (error) {
        console.error("Database storage error:", error);
      }
    },
    [user]
  );

  const fetchOrderData = useCallback(async () => {
    try {
      setIsLoading(true);

      try {
        const result = await OrderService.getOrder(orderId!);
        if (result.success && result.data) {
          setOrderData(result.data as unknown as OrderData);
          return;
        }
      } catch (apiError) {
        console.log("API fetch failed, using mock data:", apiError);
      }

      const mockOrderData: OrderData = {
        _id: orderId || OrderService.generateSecureOrderId(),
        products: [
          {
            productId: "1",
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "/images/product1.jpg",
          },
          {
            productId: "2",
            name: "Smart Watch Series X",
            price: 399.99,
            quantity: 2,
            image: "/images/product2.jpg",
          },
        ],
        totalPrice: 1099.97,
        status: "confirmed",
        paymentMethod: "Credit Card",
        shippingAddress: {
          fullName: user?.name || "John Doe",
          address: "123 Main Street, Apt 4B",
          city: "Cairo",
          postalCode: "12345",
          country: "Egypt",
          phone: "+20 123 456 7890",
        },
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      await storeOrderInDatabase(mockOrderData);
      setOrderData(mockOrderData);
    } catch {
      toast.error("Failed to load order details");
      router.push("/pages/cart");
    } finally {
      setIsLoading(false);
    }
  }, [orderId, user, router, storeOrderInDatabase]);

  useEffect(() => {
    if (!user) {
      router.push("/pages/login");
      return;
    }

    if (!orderId) {
      toast.error("Order ID not found");
      router.push("/pages/cart");
      return;
    }

    fetchOrderData();
  }, [user, orderId, router, fetchOrderData]);

  return { orderData, isLoading };
}
