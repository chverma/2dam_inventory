import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const fs = require('node:fs');
const path = require('path');
const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_status.json',
);
const statusData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(statusData));
}
@Injectable()
export class StatusService {
  getAllStatus() {
    return statusData;
  }

  createStatus(Status: any) {
    statusData.push({
      id_status: statusData[statusData.length - 1].id_status + 1,
      ...Status,
    });
    saveData();
    return { message: 'Estado creado satisfactoriamente' };
  }

  getStatus(id: number) {
    let i = 0;
    while (i < statusData.length && statusData[i].id_status != id) {
      i++;
    }
    if (statusData[i]) return statusData[i];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateStatus(StatusUpdated) {
    let i = 0;
    while (
      i < statusData.length &&
      statusData[i].id_status != StatusUpdated.id_status
    ) {
      i++;
    }
    if (statusData[i]) {
      statusData[i] = StatusUpdated;
      return statusData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteStatus(id: number) {
    let i = 0;
    while (i < statusData.length && statusData[i].id_status != id) {
      i++;
    }
    if (statusData[i]) {
      return statusData.splice(i, 1);
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
