import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CredentialsRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  async createCredential(user: User, credential: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: {
        ...credential,
        sitePassword: bcrypt.hashSync(credential.sitePassword, this.SALT),
        user: {
          connect: user,
        },
      },
    });
  }

  getCredentialByTitleAndUserId(userId: number, title: string) {
    return this.prisma.credential.findFirst({
      where: {
        title,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential ${updateCredentialDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
