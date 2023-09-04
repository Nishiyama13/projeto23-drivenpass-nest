export interface CardWithUser {
  id: number;
  title: string;
  cardName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: Date;
  cardPassword: string;
  isVirtual: boolean;
  type: string;
  user: {
    id: number;
    email: string;
  };
}
