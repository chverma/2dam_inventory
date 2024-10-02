import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';

const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/classroom.json',
);
const classroomData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(classroomData));
}

@Injectable()
export class ClassroomService {
  getAllClassrooms() {
    return classroomData;
  }

  createClassroom(Classroom: any) {
    classroomData.push({
      id_classroom: classroomData[classroomData.length - 1].id_classroom + 1,
      ...Classroom,
    });
    saveData();
    return { message: 'Aula creada satisfactoriamente' };
  }

  getClassroom(id: number) {
    let i = 0;
    while (i < classroomData.length && classroomData[i].id_classroom != id) {
      i++;
    }
    if (classroomData[i]) return classroomData[i];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateClassroom(ClassroomUpdated) {
    let i = 0;
    while (
      i < classroomData.length &&
      classroomData[i].id_classroom != ClassroomUpdated.id_classroom
    ) {
      i++;
    }
    if (classroomData[i]) {
      classroomData[i] = ClassroomUpdated;
      saveData();
      return classroomData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteClassroom(id: number) {
    let i = 0;
    while (i < classroomData.length && classroomData[i].id_classroom != id) {
      i++;
    }
    if (classroomData[i]) {
      const deletedClassroom = classroomData.splice(i, 1);
      saveData();
      return deletedClassroom;
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
