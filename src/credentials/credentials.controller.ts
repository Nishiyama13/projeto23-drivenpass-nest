import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@Controller('credentials')
//@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createCredential(
    @Body() credentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    try {
      return await this.credentialsService.createCredential(
        user,
        credentialDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get()
  findAll() {
    return this.credentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credentialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    return this.credentialsService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialsService.remove(+id);
  }
}
