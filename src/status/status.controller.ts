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
import { StatusService } from './status.service';
import { query } from 'express';
import { error } from 'console';
@Controller('Status')
export class StatusController {
  private StatusService: StatusService;
  constructor(StatusService: StatusService) {
    this.StatusService = StatusService;
  }
  @Get()
  getAllStatus(@Query() query) {
    try {
      return this.StatusService.getAllStatus();
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
  getStatus(@Param('id') id: string) {
    return this.StatusService.getStatus(parseInt(id));
  }
  @Post()
  createStatus(@Body() Status) {
    return this.StatusService.createStatus(Status);
  }
  @Put(':id')
  UpdateStatus(@Param('id') id: string, @Body() Status) {
    return this.StatusService.updateStatus({
      ...Status,
      id_status: parseInt(id),
    });
  }
  @Delete(':id')
  deleteStatus(@Param('id') id: string) {
    return this.StatusService.deleteStatus(parseInt(id));
  }
}
