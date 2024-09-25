import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(id);
  }

  @Post()
  create(@Body() createClassroomDto: any) {
    return this.classroomService.create(createClassroomDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: any) {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(id);
  }
}
