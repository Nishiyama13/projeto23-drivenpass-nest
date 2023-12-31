import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
//import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() noteDto: CreateNoteDto, @User() user: UserPrisma) {
    try {
      return await this.notesService.createNote(user, noteDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get()
  async findAllNotesByUser(@User() user: UserPrisma) {
    return await this.notesService.getNotesByUserId(user);
  }

  @Get(':id')
  async getNotesByNoteId(
    @User() user: UserPrisma,
    @Param('id', new IdValidationPipe()) id: number,
  ) {
    return await this.notesService.getNotesByNoteId(user, +id);
  }

  /*
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }
  */

  @Delete(':id')
  async deleteNoteById(
    @User() user: UserPrisma,
    @Param('id', new IdValidationPipe()) id: number,
  ) {
    return await this.notesService.deleteNoteById(user, +id);
  }
}
