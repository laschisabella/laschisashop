import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() body: { userId: number }) {
    return this.service.createFromCart(body.userId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(Number(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}