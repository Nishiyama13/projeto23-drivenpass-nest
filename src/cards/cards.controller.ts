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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
//import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ReturnCardFormatDateDto } from './dto/return-card-Date.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(
    @Body() cardDto: CreateCardDto,
    @User() user: UserPrisma,
  ): Promise<ReturnCardFormatDateDto> {
    try {
      return await this.cardsService.createCard(user, cardDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get()
  async findAllCardByUser(@User() user: UserPrisma) {
    return await this.cardsService.getAllCardsByUserId(user);
  }

  @Get(':id')
  async getCardByCardId(
    @User() user: UserPrisma,
    @Param('id', new IdValidationPipe()) id: number,
  ) {
    return await this.cardsService.getCardByCardId(user, +id);
  }

  /*
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }
  */

  @Delete(':id')
  async deleteCardById(
    @User() user: UserPrisma,
    @Param('id', new IdValidationPipe()) id: number,
  ) {
    return await this.cardsService.deleteCardById(user, +id);
  }
}
