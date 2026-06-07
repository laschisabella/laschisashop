import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @Post()
  create(@Body() body: { userId: number }) {
    return this.service.create(body.userId);
  }

  @Get(':cartId/items')
  getCartItems(@Param('cartId') cartId: string) {
    return this.service.getCartItems(parseInt(cartId));
  }

  @Get('/user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.service.getByUser(parseInt(userId));
  }

  @Post(':cartId/items')
  addItem(
    @Param('cartId') cartId: string,
    @Body()
    body: {
      productId: number;
      quantity: number;
    },
  ) {
    return this.service.addItem(
      parseInt(cartId),
      body.productId,
      body.quantity,
    );
  }

  @Patch('/items/:itemId')
  updateItem(
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.service.updateItemQuantity(parseInt(itemId), body.quantity);
  }

  @Delete('/items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.service.removeItem(parseInt(itemId));
  }
}
