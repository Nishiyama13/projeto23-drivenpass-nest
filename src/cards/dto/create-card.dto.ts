import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateCardDto {
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
  @Length(3, 3)
  cvv: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, {
    message: 'Invalid date format. Use MM/YY',
  })
  expirationDate: string;

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
