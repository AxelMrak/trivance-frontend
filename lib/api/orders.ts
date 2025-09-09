import { Order } from "@/types/Order";

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}?include=appointment`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "Failed to fetch order status",
    }));
    throw new Error(errorData.message || "Failed to fetch order status");
  }

  return response.json();
};

export const confirmOrderDemo = async (orderId: string): Promise<Order> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/demo-confirm`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "No se pudo confirmar la orden" }));
    throw new Error(errorData.message || "No se pudo confirmar la orden");
  }
  return response.json();
};
