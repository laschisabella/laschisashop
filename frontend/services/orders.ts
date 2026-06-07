import { api } from "@/lib/api";
import type { Order } from "@/types/order";

export const OrdersService = {
  async findAll(): Promise<Order[]> {
    const res = await api.get("/orders");
    return res.data;
  },

  async findByUser(userId: number): Promise<Order[]> {
    const res = await api.get(`/orders/user/${userId}`);
    return res.data;
  },

  async create(userId: number): Promise<Order> {
    const res = await api.post("/orders", {
      userId,
    });

    return res.data;
  },
};