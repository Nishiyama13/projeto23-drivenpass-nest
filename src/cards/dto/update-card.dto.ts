import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
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
