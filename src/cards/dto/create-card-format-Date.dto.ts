import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateCardFormatDateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  cardName: string;

  @IsNotEmpty()
  @Length(16, 16)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  @IsNotEmpty()
  @IsDate()
  expirationDate: Date;

  @IsNotEmpty()
  @IsString()
  cardPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  isVirtual: boolean;

  @IsNotEmpty()
  @IsIn(['credito', 'debito', 'ambos'])
  type: string;
}
