import { ConflictException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import Cryptr from 'cryptr';
import { NotesRepository } from './notes.repository';
import { User } from '@prisma/client';
import { NoteWithUser } from './interfaces/notes-with-user.inteface';

@Injectable()
export class NotesService {
  cryptor: Cryptr;
  cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  constructor(private readonly notesRepository: NotesRepository) {}

  async createNote(user: User, noteDto: CreateNoteDto) {
    const { text, title } = noteDto;
    const userId = user.id;
    const encryptedText = this.cryptr.encrypt(text);
    const checkNote = await this.notesRepository.getNotesByTitleAndUserId(
      userId,
      title,
    );

    if (checkNote) {
      throw new ConflictException('title already exists');
    }

    const newNote = await this.notesRepository.createNote(user, {
      ...noteDto,
      text: encryptedText,
    });

    return {
      id: newNote.id,
      title: newNote.title,
      text: newNote.text,
      userId: newNote.userId,
    };
  }

  async getNotesByUserId(user: User) {
    let notes: NoteWithUser[] = [];
    const userId: number = user.id;
    notes = await this.notesRepository.getNotesByUserId(userId);
    return this.formatNotes(notes);
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }

  private formatNotes(notes: NoteWithUser[]) {
    return notes.map((note) => {
      const { id } = note.user;
      return {
        id: note.id,
        title: note.title,
        text: this.cryptr.decrypt(note.text),
        userId: id,
      };
    });
  }
}
