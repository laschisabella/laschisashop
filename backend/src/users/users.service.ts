import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(id: number, updates: any) {
    return this.prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  async delete(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });

    return true;
  }

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
}
