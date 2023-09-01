import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CredentialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
