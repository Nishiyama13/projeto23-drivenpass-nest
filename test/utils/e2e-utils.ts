import { PrismaService } from '../../src/prisma/prisma.service';

export class E2EUtils {
  static async cleanDB(prisma: PrismaService) {
    await prisma.card.deleteMany();
    await prisma.credential.deleteMany();
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
  }
}
