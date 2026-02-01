import { Order } from "../types/types";

export const calculateOrderStats = (orders: Order[]) => {
  return {
    total: orders.length,
    processing: orders.filter((o) => o.status.toLowerCase() === "processing")
      .length,
    shipped: orders.filter((o) => o.status.toLowerCase() === "shipped").length,
    delivered: orders.filter((o) => o.status.toLowerCase() === "delivered")
      .length,
  };
};
