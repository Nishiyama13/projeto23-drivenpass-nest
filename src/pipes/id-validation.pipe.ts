import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class IdValidationPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const id = Number(value);
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid id');
    }
    return id;
  }
}
