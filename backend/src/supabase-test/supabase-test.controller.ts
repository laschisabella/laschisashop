import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('supabase-test')
export class SupabaseTestController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async test() {
    const client = this.supabaseService.getClient();

    const { data, error } = await client.from('products').select('*').limit(1);

    if (error) {
      return { ok: false, error };
    }

    return { ok: true, found: data };
  }
}
