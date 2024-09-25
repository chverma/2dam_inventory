//definición del módulo

import { Module } from '@nestjs/common';
import { InventariTypeController } from './inventari_type.controller';
import { InventariTypeService } from './inventari_type.service';

@Module({
  controllers: [InventariTypeController],
  providers: [InventariTypeService],
})
export class InventariTypeModule {}
