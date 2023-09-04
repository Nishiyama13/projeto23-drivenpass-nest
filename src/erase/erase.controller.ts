import { Controller, Body, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(
    @User() user: UserPrisma,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    return await this.eraseService.deleteUser(user, deleteUserDto);
  }
}
