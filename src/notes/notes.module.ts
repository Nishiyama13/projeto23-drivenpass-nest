import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from '../users/users.module';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [UsersModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
