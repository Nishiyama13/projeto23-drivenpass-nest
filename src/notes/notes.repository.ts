import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(user: User, noteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        ...noteDto,
        user: {
          connect: user,
        },
      },
    });
  }

  getNotesByTitleAndUserId(userId: number, title: string) {
    return this.prisma.note.findFirst({
      where: {
        title,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  getNotesByUserId(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
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
}
