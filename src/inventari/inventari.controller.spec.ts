import { Test, TestingModule } from '@nestjs/testing';
import { InventariController } from './inventari.controller';

describe('InventariController', () => {
  let controller: InventariController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventariController],
    }).compile();

    controller = module.get<InventariController>(InventariController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
