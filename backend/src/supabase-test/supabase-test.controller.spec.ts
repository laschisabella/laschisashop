import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseTestController } from './supabase-test.controller';

describe('SupabaseTestController', () => {
  let controller: SupabaseTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupabaseTestController],
    }).compile();

    controller = module.get<SupabaseTestController>(SupabaseTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
