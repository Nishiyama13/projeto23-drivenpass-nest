import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/login.dto';

export class SignUpDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
