import { ConflictException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential ${updateCredentialDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
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
/*async createCredential(user: User, credentialDto: CreateCredentialDto) {
    const { title } = credentialDto;
    const userId = user.id;
    const encryptedPassword = this.cryptor.encrypt(credentialDto.sitePassword);
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
      credentialDto,
    );

    return {
      id: newCredential.id,
      title: newCredential.title,
      siteUrl: newCredential.siteUrl,
      username: newCredential.username,
      sitePassword: newCredential.sitePassword,
      userId: newCredential.userId,
    };
  }*/
