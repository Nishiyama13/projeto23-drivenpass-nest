import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
//import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}
  //private cryptor = new Cryptr(process.env.CRYPTR_SECRET);

  async createCredential(user: User, credential: CreateCredentialDto) {
    //const encryptedPassword = this.cryptor.encrypt(credential.sitePassword);
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
/*
  private SALT = 10;
  private cryptor: Cryptr;

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

  getCredentialsByUserId(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  }*/
