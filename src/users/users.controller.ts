import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { query } from 'express';
@Controller('users')
export class UsersController {
  private UsersService: UsersService;
  constructor(UsersService: UsersService) {
    this.UsersService = UsersService;
  }
  @Get()
  getAllUser(@Query() query) {
    console.log(query);
    return this.UsersService.getAllUser();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.UsersService.getUser(parseInt(id));
  }
  @Post()
  createUser(@Body() User) {
    return this.UsersService.createUser(User);
  }
  @Put(':id')
  UpdateUser(@Param('id') id: string, @Body() User) {
    return this.UsersService.updateUser({
      ...User,
      id: parseInt(id),
    });
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.UsersService.deleteUser(parseInt(id));
  }
}
