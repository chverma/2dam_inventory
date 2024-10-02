import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';
import * as convert from 'xml-js';
const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory.json',
);
const inventariData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(inventariData));
}

@Injectable()
export class InventariService {
  getAllInventaris(xml: string) {
    if (xml === 'true') {
      const jsonFormatted = { inventory_list: inventariData };
      const json = JSON.stringify(jsonFormatted);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = convert.json2xml(json, options);
      return result;
    } else {
      return inventariData;
    }
  }

  createInventari(task: any) {
    inventariData.push({
      id_inventory: inventariData[inventariData.length - 1].id_inventory + 1,
      ...task,
    });
    saveData();
    return { message: 'Inventario creado satisfactoriamente' };
  }

  getInventari(id: number, xml: string) {
    let i = 0;
    while (i < inventariData.length && inventariData[i].id_inventory != id) {
      i++;
    }
    if (inventariData[i]) {
      if (xml === 'xml') {
        const jsonFormatted = { inventory_type: inventariData[i] };
        const json = JSON.stringify(jsonFormatted);
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const result = convert.json2xml(json, options);
        return result;
      } else {
        return inventariData;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateInventari(taskUpdated: any) {
    let i = 0;
    while (
      i < inventariData.length &&
      inventariData[i].id_inventory != taskUpdated.id_inventory
    ) {
      i++;
    }
    if (inventariData[i]) {
      saveData();
      inventariData[i] = taskUpdated;
      return inventariData[i];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  deleteInventari(id: number) {
    let i = 0;
    while (i < inventariData.length && inventariData[i].id_inventory != id) {
      i++;
    }
    if (inventariData[i]) {
      saveData();
      return inventariData.splice(i, 1);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
