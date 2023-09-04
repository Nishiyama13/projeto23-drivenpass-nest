import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { UsersModule } from '../users/users.module';
import { NotesRepository } from './notes.repository';
import { NotesController } from './notes.controller';

@Module({
  imports: [UsersModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  exports: [NotesService],
})
export class NotesModule {}
