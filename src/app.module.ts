import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CredentialsModule, NotesModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
