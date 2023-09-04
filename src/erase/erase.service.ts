import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { NotesService } from '../notes/notes.service';
import { CredentialsService } from '../credentials/credentials.service';
import { CardsService } from '../cards/cards.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EraseService {
  constructor(
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
    private readonly credentialsService: CredentialsService,
    private readonly cardsService: CardsService,
  ) {}
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

      if (credentialsIsClean && notesIsClean && cardsIdClean) {
        await this.usersService.deleteUserByUserId(userId);
      }
      return {
        message: 'usuário apagado com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
