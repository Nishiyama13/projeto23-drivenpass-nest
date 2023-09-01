import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/login.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(userDto: CreateUserDto) {
    const { email } = userDto;
    const checkUser = await this.usersRepository.getUserByEmail(email);
    if (checkUser) throw new ConflictException('Email already in use.');

    return await this.usersRepository.createUser(userDto);
  }

  /*findAll() {
    return `This action returns all users`;
  }*/

  async getUserById(id: number) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    //if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /*update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
