import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';
import * as convert from 'xml-js';

const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_type.json',
);
const inventoryTypeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(inventoryTypeData));
}

@Injectable()
export class InventariTypeService {
  getAllInventariType(xml?: string) {
    if (xml === 'true') {
      const jsonformatted = { inventory_type: inventoryTypeData };
      const json = JSON.stringify(jsonformatted);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = convert.json2xml(json, options);
      return result;
    } else {
      return inventoryTypeData;
    }
  }

  createInventariType(inventari_type: any) {
    inventoryTypeData.push({
      id_type: inventoryTypeData[inventoryTypeData.length - 1].id_type + 1,
      ...inventari_type,
    });
    saveData();
    return { message: 'Estado creado satisfactoriamente' };
  }

  getInventariType(id: number, xml?: string) {
    let i = 0;
    while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
      i++;
    }
    if (inventoryTypeData[i]) {
      const result = inventoryTypeData[i];
      if (xml === 'true') {
        const jsonformatted = { inventory_type: result };
        const json = JSON.stringify(jsonformatted);
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlResult = convert.json2xml(json, options);
        return xmlResult;
      }else{
        return result;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateInventariType(inventariTypeUpdated) {
    let i = 0;
    while (
      i < inventoryTypeData.length &&
      inventoryTypeData[i].id_type != inventariTypeUpdated.id_type
    ) {
      i++;
    }
    if (inventoryTypeData[i]) {
      inventoryTypeData[i] = inventariTypeUpdated;
      saveData();
      return inventoryTypeData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteInventariType(id: number) {
    let i = 0;
    while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
      i++;
    }
    if (inventoryTypeData[i]) {
      saveData();
      return inventoryTypeData.splice(i, 1);
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
