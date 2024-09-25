import { Module } from '@nestjs/common';
import { InventariController } from './inventari.controller';
import { InventariService } from './inventari.service';

@Module({
  controllers: [InventariController],
  providers: [InventariService],
})
export class InventariModule {}
