import { Controller, Get, Post, Patch, Delete, Param, Body, } from '@nestjs/common'; import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() body: any) {
    const user = await this.service.create(body);
    return { ok: true, user };
  }

  @Get()
  async findAll() {
    const list = await this.service.findAll();
    return { ok: true, list };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.service.findOne(parseInt(id));
    return { ok: true, user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const user = await this.service.update(parseInt(id), body);
    return { ok: true, user };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(parseInt(id));
    return { ok: true };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.service.login(body.username, body.password);
    if (!user) {
      return { ok: false, error: 'Usuário ou senha incorretos' };
    }
    return { ok: true, user };
  }

  @Post('me')
  async me(@Body() body: { id: string }) {
    const user = await this.service.findOne(parseInt(body.id));
    if (!user) return { ok: false, error: 'Usuário não encontrado' };
    return { ok: true, user };
  }
}
