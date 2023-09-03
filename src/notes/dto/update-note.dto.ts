import { PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
