import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateCardFormatDateDto } from './dto/create-card-format-Date.dto';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(user: User, card: CreateCardFormatDateDto) {
    return await this.prisma.card.create({
      data: {
        ...card,
        user: {
          connect: user,
        },
      },
    });
  }

  getCardByTitleAndUserId(userId: number, title: string) {
    return this.prisma.card.findFirst({
      where: {
        title,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  getAllCardsByUserId(userId: number) {
    return this.prisma.card.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  getCardByCardId(id: number) {
    return this.prisma.card.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card ${updateCardDto}`;
  }

  deleteCardById(id: number) {
    return this.prisma.card.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  deleteAllCardsByUserId(userId: number) {
    return this.prisma.card.deleteMany({
      where: { userId },
    });
  }
}
