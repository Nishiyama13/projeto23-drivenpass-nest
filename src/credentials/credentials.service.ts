import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { CredentialsRepository } from './credentials.repository';
import { CredentialWithUser } from './interfaces/credentials-with-user.interface';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
  cryptor: Cryptr;
  cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async createCredential(user: User, credentialDto: CreateCredentialDto) {
    const { title } = credentialDto;
    const userId = user.id;
    const encryptedPassword = this.cryptr.encrypt(credentialDto.sitePassword);
    const checkCredential =
      await this.credentialsRepository.getCredentialByTitleAndUserId(
        userId,
        title,
      );

    if (checkCredential) {
      throw new ConflictException('title already exists');
    }

    const newCredential = await this.credentialsRepository.createCredential(
      user,
      {
        ...credentialDto,
        sitePassword: encryptedPassword,
      },
    );

    return {
      id: newCredential.id,
      title: newCredential.title,
      siteUrl: newCredential.siteUrl,
      username: newCredential.username,
      sitePassword: newCredential.sitePassword,
      userId: newCredential.userId,
    };
  }

  async getCredentialsByUserId(user: User) {
    let credentials: CredentialWithUser[] = [];
    const userId: number = user.id;
    credentials =
      await this.credentialsRepository.getCredentialsByUserId(userId);
    return this.formatCredentials(credentials);
  }

  async getCredentialByCredentialId(user: User, id: number) {
    const credential =
      await this.credentialsRepository.getCredentialByCredentialId(id);

    if (!credential) throw new NotFoundException('credential not found');
    if (user.id !== credential.userId) {
      throw new ForbiddenException(
        'This credential does not belong to this user',
      );
    }

    return {
      id: credential.id,
      title: credential.title,
      siteUrl: credential.siteUrl,
      username: credential.username,
      sitePassword: this.cryptr.decrypt(credential.sitePassword),
      userId: credential.userId,
    };
  }

  /*
  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential ${updateCredentialDto}`;
  }*/

  async deleteCredencialById(user: User, id: number) {
    const credential =
      await this.credentialsRepository.getCredentialByCredentialId(id);
    if (!credential) throw new NotFoundException('credential not found');
    if (user.id !== credential.userId) {
      throw new ForbiddenException(
        'This credential does not belong to this user',
      );
    }

    return this.credentialsRepository.deleteCredencialById(id);
  }

  private formatCredentials(credentials: CredentialWithUser[]) {
    return credentials.map((credential) => {
      const { id } = credential.user;
      return {
        id: credential.id,
        title: credential.title,
        siteUrl: credential.siteUrl,
        username: credential.username,
        sitePassword: this.cryptr.decrypt(credential.sitePassword),
        userId: id,
      };
    });
  }
}
