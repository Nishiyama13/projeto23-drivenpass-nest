import { PrismaService } from '../../src/prisma/prisma.service';

export class CredentialFactory {
  private title: string;
  private siteUrl: string;
  private username: string;
  private sitePassword: string;
  private user: { connect: { id: number } };

  constructor(private readonly prisma: PrismaService) {}

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withSiteUrl(siteUrl: string) {
    this.siteUrl = siteUrl;
    return this;
  }

  withUsername(username: string) {
    this.username = username;
    return this;
  }

  withSitePassword(sitePassword: string) {
    this.sitePassword = sitePassword;
    return this;
  }

  withUser(userId: number) {
    this.user = { connect: { id: userId } };
    return this;
  }

  build() {
    return {
      title: this.title,
      siteUrl: this.siteUrl,
      username: this.username,
      sitePassword: this.sitePassword,
      user: this.user,
    };
  }

  async persist() {
    const credential = this.build();
    return await this.prisma.credential.create({
      data: credential,
    });
  }
}
