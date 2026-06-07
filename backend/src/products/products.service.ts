import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updates: any) {
    return this.prisma.product.update({
      where: { id },
      data: updates,
    });
  }

  async delete(id: number) {
    await this.prisma.product.delete({
      where: { id },
    });
    return true;
  }
}
