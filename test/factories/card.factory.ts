import { PrismaService } from '../../src/prisma/prisma.service';

export class CardFactory {
  private title: string;
  private cardName: string;
  private cardNumber: string;
  private cvv: string;
  private expirationDate: Date;
  private cardPassword: string;
  private isVirtual: boolean;
  private type: string;
  private user: { connect: { id: number } };

  constructor(private readonly prisma: PrismaService) {}

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withCardName(cardName: string) {
    this.cardName = cardName;
    return this;
  }

  withCardNumber(cardNumber: string) {
    this.cardNumber = cardNumber;
    return this;
  }

  withCvv(cvv: string) {
    this.cvv = cvv;
    return this;
  }

  withExpirationDate(expirationDate: Date) {
    this.expirationDate = expirationDate;
    return this;
  }

  withCardPassword(cardPassword: string) {
    this.cardPassword = cardPassword;
    return this;
  }

  withIsVirtual(isVirtual: boolean) {
    this.isVirtual = isVirtual;
    return this;
  }

  withType(type: string) {
    this.type = type;
    return this;
  }

  withUser(userId: number) {
    this.user = { connect: { id: userId } };
    return this;
  }

  build() {
    return {
      title: this.title,
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expirationDate: this.expirationDate,
      cardPassword: this.cardPassword,
      isVirtual: this.isVirtual,
      type: this.type,
      user: this.user,
    };
  }

  async persist() {
    const card = this.build();
    return await this.prisma.card.create({
      data: card,
    });
  }
}
