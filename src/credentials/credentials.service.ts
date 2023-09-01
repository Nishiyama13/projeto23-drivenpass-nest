import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}
  async createCredential(user: User, credentialDto: CreateCredentialDto) {
    const { title } = credentialDto;
    const userId = user.id;
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
