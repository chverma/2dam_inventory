//lógica de negocio
//Este archivo se encarga de implementar la lógica real de los métodos que definimos en el controlador.
//Aquí se haría la interacción con la base de datos

import { Injectable } from '@nestjs/common';

@Injectable()
export class InventariTypeService {
  private inventariTypes = [];

  findAll() {
    return this.inventariTypes;
  }

  findOne(id: string) {
    return this.inventariTypes.find((item) => item.id === id);
  }

  create(createInventariTypeDto: any) {
    this.inventariTypes.push(createInventariTypeDto);
    return createInventariTypeDto;
  }

  update(id: string, updateInventariTypeDto: any) {
    const index = this.inventariTypes.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.inventariTypes[index] = updateInventariTypeDto;
    }
    return updateInventariTypeDto;
  }

  remove(id: string) {
    this.inventariTypes = this.inventariTypes.filter((item) => item.id !== id);
  }
}
