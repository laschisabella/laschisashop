import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  private table() {
    return this.supabase.getClient().from('users');
  }

  async create(data: any) {
    const { data: created, error } = await this.table()
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async findAll() {
    const { data, error } = await this.table().select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.table()
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async findByUsername(username: string) {
    const { data, error } = await this.table()
      .select('*')
      .eq('username', username)
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updates: any) {
    const { data, error } = await this.table()
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await this.table().delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // login simples
  async login(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
}
