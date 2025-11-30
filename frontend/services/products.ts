import { api } from "@/lib/api";
import type { Product } from "@/types/product";

export const ProductsService = {
  async findAll(): Promise<Product[]> {
    const res = await api.get("/products");
    return res.data.list;
  },

  async findOne(id: string): Promise<Product> {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  async create(payload: Omit<Product, "id">): Promise<Product> {
    const res = await api.post("/products", payload);
    return res.data;
  },

  async update(id: string, payload: Partial<Product>): Promise<Product> {
    const res = await api.patch(`/products/${id}`, payload);
    return res.data;
  },

  async delete(id: string): Promise<boolean> {
    await api.delete(`/products/${id}`);
    return true;
  },
};
