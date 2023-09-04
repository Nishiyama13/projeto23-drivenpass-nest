import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';
import Cryptr from 'cryptr';
import { User } from '@prisma/client';
import { CardWithUser } from './interfaces/cards-with-user.interface';
//import { CreateCardFormatDateDto } from './dto/create-card-format-Date.dto';
import { ReturnCardFormatDateDto } from './dto/return-card-Date.dto';

@Injectable()
export class CardsService {
  cryptor: Cryptr;
  cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  constructor(private readonly cardsRepository: CardsRepository) {}

  private formatCards(cards: CardWithUser[]) {
    return cards.map((card) => {
      const { id } = card.user;
      return {
        id: card.id,
        title: card.title,
        cardName: card.cardName,
        cardNumber: card.cardNumber,
        cvv: this.cryptr.decrypt(card.cvv),
        expirationDate: card.expirationDate,
        cardPassword: this.cryptr.decrypt(card.cardPassword),
        isVirtual: card.isVirtual,
        type: card.type,
        userId: id,
      };
    });
  }

  private formatExpirationDate(expirationDate: string): Date {
    const [month, year] = expirationDate.split('/');
    const lastDayOfMonth = new Date(Number(`20${year}`), Number(month), 0);
    return lastDayOfMonth;
  }

  async createCard(
    user: User,
    cardDto: CreateCardDto,
  ): Promise<ReturnCardFormatDateDto> {
    const { title } = cardDto;
    const userId = user.id;
    const encryptedPassword = this.cryptr.encrypt(cardDto.cardPassword);
    const encryptedSecurityCode = this.cryptr.encrypt(cardDto.cvv);
    const checkCard = await this.cardsRepository.getCardByTitleAndUserId(
      userId,
      title,
    );
    if (checkCard) throw new ConflictException('title already exists');
    const formatExpirationDate = this.formatExpirationDate(
      cardDto.expirationDate,
    );

    const newCard = await this.cardsRepository.createCard(user, {
      ...cardDto,
      cvv: encryptedSecurityCode,
      cardPassword: encryptedPassword,
      expirationDate: formatExpirationDate,
    });

    return {
      id: newCard.id,
      title: newCard.title,
      cardName: newCard.cardName,
      cardNumber: newCard.cardNumber,
      cvv: this.cryptr.decrypt(newCard.cvv),
      expirationDate: newCard.expirationDate,
      cardPassword: this.cryptr.decrypt(newCard.cardPassword),
      isVirtual: newCard.isVirtual,
      type: newCard.type,
      userId: newCard.userId,
    };
  }

  async getAllCardsByUserId(user: User) {
    let cards: CardWithUser[] = [];
    const userId = user.id;
    cards = await this.cardsRepository.getAllCardsByUserId(userId);
    return this.formatCards(cards);
  }

  getCardByCardId(user: User, id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card ${updateCardDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
