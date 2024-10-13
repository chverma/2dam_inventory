import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventariController } from './inventari.controller';
import { InventariService } from './inventari.service';
import { Inventari } from './inventari.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventari]), UtilsModule],
  exports: [TypeOrmModule],
  controllers: [InventariController],
  providers: [InventariService],
})
export class InventariModule {}
