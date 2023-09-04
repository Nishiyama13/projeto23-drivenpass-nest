import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
//import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCredential(user: User, credential: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: {
        ...credential,
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

  getCredentialsByUserId(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  getCredentialByCredentialId(id: number) {
    return this.prisma.credential.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  /*
  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential ${updateCredentialDto}`;
  }
  */

  deleteCredencialById(id: number) {
    return this.prisma.credential.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  deleteAllCredencialsByUserId(userId: number) {
    return this.prisma.credential.deleteMany({
      where: { userId },
    });
  }
}
