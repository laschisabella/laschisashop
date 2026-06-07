import { api } from "@/lib/api";
import type { CartItem } from "@/types/cart";

export const CartsService = {
  async create(userId: number) {
    const res = await api.post("/carts", {
      userId,
    });

    return res.data;
  },

  async getByUser(userId: number) {
    const res = await api.get(`/carts/user/${userId}`);
    return res.data;
  },

  async addItem(
    cartId: number,
    productId: number,
    quantity: number,
  ) {
    const res = await api.post(
      `/carts/${cartId}/items`,
      {
        productId,
        quantity,
      },
    );

    return res.data;
  },

  async getItems(
    cartId: number,
  ): Promise<CartItem[]> {
    const res = await api.get(
      `/carts/${cartId}/items`,
    );

    return res.data;
  },

  async updateItem(
    itemId: number,
    quantity: number,
  ) {
    const res = await api.patch(
      `/carts/items/${itemId}`,
      {
        quantity,
      },
    );

    return res.data;
  },

  async removeItem(
    itemId: number,
  ) {
    await api.delete(
      `/carts/items/${itemId}`,
    );

    return true;
  },
};