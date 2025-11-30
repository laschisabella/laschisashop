import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor(private configService: ConfigService) {
    console.log('SupabaseService constructor rodou!');

    console.log('URL=', process.env.SUPABASE_URL);
    console.log('KEY=', process.env.SUPABASE_KEY ? 'OK' : 'FALTA');

    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    this.client = createClient(url!, key!);
  }

  getClient() {
    return this.client;
  }
}
