//rutas/acciones HTTP
//Este archivo define las rutas HTTP que usarás para crear, editar, eliminar o listar.
//Su única responsabilidad es gestionar las solicitudes HTTP y delegar el trabajo al servicio.

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InventariTypeService } from './inventari_type.service'; //inyectar y utilizar el servicio InventariTypeService dentro del controlador.

@Controller('inventari-type')
export class InventariTypeController {
  constructor(private readonly inventariTypeService: InventariTypeService) {}

  @Get()
  findAll() {
    return this.inventariTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventariTypeService.findOne(id);
  }

  @Post()
  create(@Body() createInventariTypeDto: any) {
    return this.inventariTypeService.create(createInventariTypeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInventariTypeDto: any) {
    return this.inventariTypeService.update(id, updateInventariTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventariTypeService.remove(id);
  }
}
