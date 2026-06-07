import { api } from "@/lib/api";
import { User } from "@/types/user";

export const UsersService = {
  async findAll(): Promise<User[]> {
    const res = await api.get("/users");
    return res.data.list;
  },

  async findOne(id: number): Promise<User> {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  async create(payload: Omit<User, "id">): Promise<User> {
    const res = await api.post("/users", payload);
    return res.data;
  },

  async update(id: number, payload: Partial<User>): Promise<User> {
    const res = await api.patch(`/users/${id}`, payload);
    return res.data;
  },

  async delete(id: number): Promise<boolean> {
    await api.delete(`/users/${id}`);
    return true;
  },

  async login(email: string, password: string): Promise<User> {
    const res = await api.post("/users/login", { email, password });
    return res.data;
  },

  async getMe(): Promise<User> {
    const res = await api.get("/users/me");
    return res.data;
  },
};
