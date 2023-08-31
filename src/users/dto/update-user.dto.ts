import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './login.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
