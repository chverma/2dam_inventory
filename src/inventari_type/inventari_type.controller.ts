import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InventariTypeService } from './inventari_type.service';
import { CreateInventariTypeDto, UpdateInventariTypeDto } from './inventari_type.dto';

@Controller('inventari_type')
export class InventariTypeController {
  constructor(private readonly inventariTypeService: InventariTypeService) {}

  @Get()
  async getAllInventariType(@Query('format') format?: string) {
    const data = await this.inventariTypeService.getAllInventariType(format);
    return data;
  }

  @Get(':id')
  async getInventariType(
    @Param('id') id: string,
    @Query('format') format?: string,
  ) {
    const data = await this.inventariTypeService.getInventariType(
      parseInt(id),
      format,
    );
    return data;
  }

  @Post()
  async createInventariType(@Body() createInventariTypeDto: CreateInventariTypeDto) {
    return this.inventariTypeService.createInventariType(createInventariTypeDto);
  }

  @Put(':id')
  async updateInventariType(
    @Param('id') id: string,
    @Body() updateInventariTypeDto: UpdateInventariTypeDto,
  ) {
    return this.inventariTypeService.updateInventariType(
      parseInt(id),
      updateInventariTypeDto,
    );
  }

  @Delete(':id')
  async deleteInventariType(@Param('id') id: string) {
    return this.inventariTypeService.deleteInventariType(parseInt(id));
  }
}
