import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUser(xml?: string): Promise<User[] | string> {
    if (xml == 'true') {
      const jsonformatted = JSON.stringify({
        Users: await this.usersRepository.find(),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonformatted);
      return xmlResult;
    } else {
      return this.usersRepository.find();
    }
  }

  async createUser(Users: any): Promise<User[]> {
    const newUser = this.usersRepository.create(Users);
    return this.usersRepository.save(newUser);
  }

  async getUser(id_user: number, xml?: string): Promise<User | string | null> {
    const user = await this.usersRepository.findOneBy({ id_user });

    if (user != null) {
      if (xml == 'true') {
        const jsonformatted = JSON.stringify(user);
        return this.utilsService.convertJSONtoXML(jsonformatted);
      } else {
        return user;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(UsersUpdated: any): Promise<User> {
    const user = await this.usersRepository.findOne(UsersUpdated.id_user);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    this.usersRepository.merge(user, UsersUpdated);
    return this.usersRepository.save(user);
  }

  async deleteUser(id_user: number): Promise<void> {
    await this.usersRepository.delete(id_user);
  }
}
