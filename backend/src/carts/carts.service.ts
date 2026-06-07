import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number) {
    const existing = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async getByUser(userId: number) {
    return this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });
  }

  async getCartItems(cartId: number) {
    return this.prisma.cartItem.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });
  }
  P;

  async addItem(cartId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  async updateItemQuantity(itemId: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity,
      },
    });
  }

  async removeItem(itemId: number) {
    return this.prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });
  }
}
