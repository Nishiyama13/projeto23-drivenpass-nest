import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { UsersModule } from '../users/users.module';
import { CredentialsModule } from '../credentials/credentials.module';
import { NotesModule } from '../notes/notes.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [UsersModule, CredentialsModule, NotesModule, CardsModule],
  controllers: [EraseController],
  providers: [EraseService],
})
export class EraseModule {}
