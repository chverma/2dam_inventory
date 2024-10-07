/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as UsersData } from '../data/inventory_users';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  //   private dataSource: DataSource,
  // ) {}

  // getAllUser(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // async createUser(users: User): Promise<User> {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   let savedUser;
  //   try {
  //     // Guarda el usuario y asigna el resultado a savedUser
  //     savedUser = await queryRunner.manager.save(users);
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // Si hay un error, revertir los cambios
  //     await queryRunner.rollbackTransaction();
  //     throw err; // Lanzar el error para que el llamador lo maneje
  //   } finally {
  //     // Liberar el queryRunner que fue instanciado manualmente
  //     await queryRunner.release();
  //   }
  //   return savedUser; // Devuelve el usuario guardado
  // }

  // getUser(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  updateUser(UsersUpdated: any) {
    let i = 0;
    while (
      i < UsersData.length &&
      UsersData[i].id_user != UsersUpdated.id_user
    ) {
      i++;
    }
    if (i < UsersData.length) {
      UsersData[i] = UsersUpdated;

      return { message: `Usuario actualizado satisfactoriamente` };
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  // async deleteUser(id: number) {
  //   await this.usersRepository.delete(id);
  // }
}
