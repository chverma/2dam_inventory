import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class InventariService {
  private invet = [];
  public id = 0;
  getAllInventaris() {
    return `getAllInventaris`;
  }
  createInventari(task: any) {
    return `objeto con id ${this.id} creado`;
  }
  getInventari(id: number) {
    return `createInventari con id ${id}`;
  }
  updateInventari(taskUpdated) {
    return `updateInventari con id ${this.id} `;
  }
  deleteInventari(taskUpdated) {
    return `deleteInventari con id ${this.id} borrado`;
  }
}
