/*
En NestJS, cada módulo encapsula un grupo de controladores (routes) y servicios (lógica de negocio). 
La estructura general sería la siguiente:
Módulo: Define el contexto de tu funcionalidad (en tu caso, la tabla classroom).
Controlador: Define las rutas y las acciones HTTP (GET, POST, PUT, DELETE).
Servicio: Implementa la lógica de la aplicación (por ejemplo, la lógica para interactuar con la base de datos).
*/

import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
