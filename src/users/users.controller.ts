import {
  Body,
  Controller,
  //Delete,
  //Get,
  HttpException,
  HttpStatus,
  Param,
  //Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
@Controller('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getAllUser() {
  //   try {
  //     return this.usersService.getAllUser();
  //   } catch (err) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.INTERNAL_SERVER_ERROR,
  //         error: err,
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       {
  //         cause: err,
  //       },
  //     );
  //   }
  // }
  // @Get(':id')
  // getUser(@Param('id') id: string) {
  //   const userId = parseInt(id);
  //   if (isNaN(userId)) {
  //     throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
  //   }
  //   return this.usersService.getUser(userId);
  // }

  // @Post()
  // createUser(@Body() Users: any) {
  //   return this.usersService.createUser(Users);
  // }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() Users: User) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.updateUser({
      ...Users,
      id_user: userId,
    });
  }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   const userId = parseInt(id);
  //   if (isNaN(userId)) {
  //     throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
  //   }
  //   return this.usersService.deleteUser(userId);
  // }
}
