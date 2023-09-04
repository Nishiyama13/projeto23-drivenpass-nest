import { PrismaService } from '../../src/prisma/prisma.service';

export class NoteFactory {
  private title: string;
  private text: string;
  private user: { connect: { id: number } };

  constructor(private readonly prisma: PrismaService) {}

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withText(text: string) {
    this.text = text;
    return this;
  }

  withUser(userId: number) {
    this.user = { connect: { id: userId } };
    return this;
  }

  build() {
    return {
      title: this.title,
      text: this.text,
      user: this.user,
    };
  }

  async persist() {
    const note = this.build();
    return await this.prisma.note.create({
      data: note,
    });
  }
}
