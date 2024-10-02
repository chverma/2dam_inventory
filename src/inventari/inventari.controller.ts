import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InventariService } from './inventari.service';

@Controller('inventari')
export class InventariController {
  private inventariService: InventariService;
  constructor(inventariService: InventariService) {
    this.inventariService = inventariService;
  }
  @Get()
  getAllInventaris(@Query('xml') xml: string) {
    try {
      return this.inventariService.getAllInventaris(xml);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }
  @Get(':id')
  getInventari(@Param('id') id: string, @Query('xml') xml: string) {
    return this.inventariService.getInventari(parseInt(id), xml);
  }
  @Post()
  createInventari(@Body() Inventari) {
    return this.inventariService.createInventari(Inventari);
  }
  @Put(':id')
  updateInventari(@Param('id') id: string, @Body() Inventari) {
    return this.inventariService.updateInventari({
      ...Inventari,
      id: parseInt(id),
    });
  }
  @Delete(':id')
  deleteInventari(@Param('id') id: string) {
    return this.inventariService.deleteInventari(parseInt(id));
  }
}
