/*import { Controller, Delete, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { DeleteUserDto } from '../erase/dto/delete-user.dto';

@Controller('erase')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Body() deleteUserDto: DeleteUserDto,
    @User() user: UserPrisma,
  ) {
    return await this.usersService.deleteUser(user, deleteUserDto);
  }
}*/
