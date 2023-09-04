import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

  async deleteUserByUserId(id: number) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException('user not found');

    const isClean = await this.usersRepository.deleteUserByUserId(id);
    if (!isClean) {
      throw new InternalServerErrorException('Ops algum erro ao apagar user');
    }
    return true;
  }

  /*update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  

  async deleteUser(user: User, deleteUserDto: DeleteUserDto) {
    const userId = user.id;
    const valid = await bcrypt.compare(deleteUserDto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password');
    try {
      const credentialsIsClean =
        await this.credentialsService.deleteAllCredencialsByUserId(userId);
      const notesIsClean =
        await this.notesService.deleteAllNoteByUserId(userId);
      const cardsIdClean =
        await this.cardsService.deleteAllCardsByUserId(userId);

      if (!credentialsIsClean && notesIsClean && cardsIdClean) {
        await this.usersRepository.deleteUserByUserId(userId);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
}
