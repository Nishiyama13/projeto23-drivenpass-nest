import { PrismaService } from '../../src/prisma/prisma.service';

export class UserFactory {
  private email: string;
  private password: string;

  constructor(private readonly prisma: PrismaService) {}

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withPassword(password: string) {
    this.password = password;
    return this;
  }

  build() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  async persist() {
    const user = this.build();
    return await this.prisma.user.create({
      data: user,
    });
  }
}
