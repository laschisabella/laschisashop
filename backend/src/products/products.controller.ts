import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(@Body() body: any) {
    const product = await this.service.create(body);
    return { ok: true, product };
  }

  @Get()
  async findAll() {
    const list = await this.service.findAll();
    return { ok: true, list };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.service.findOne(id);
    return { ok: true, product };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const product = await this.service.update(id, body);
    return { ok: true, product };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.service.delete(id);
    return { ok: true, deleted };
  }
}
