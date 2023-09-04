import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { E2EUtils } from './utils/e2e-utils';
import { PrismaService } from '../src/prisma/prisma.service';
//import { NoteFactory } from './factories/note.fartory';
//import { CreateNoteDto } from '../src/notes/dto/create-note.dto';

describe('Note E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  //let noteFactory: NoteFactory;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    //noteFactory = new NoteFactory(prisma);

    await E2EUtils.cleanDB(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('POST /notes => should not create a note not send valid token', async () => {
    const noteData = {
      title: 'title test1',
      text: 'text text text',
    };

    await supertest(app.getHttpServer())
      .post('/notes')
      .send(noteData)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  /*it('POST /notes => should not create a user with duplicate title', async () => {
    const noteData = {
      title: 'title test1',
      text: 'text text text',
    };

    await supertest(app.getHttpServer())
      .post('/notes')
      .send(noteData)
      .expect(HttpStatus.CREATED);
    await supertest(app.getHttpServer())
      .post('/notes')
      .send(noteData)
      .expect(HttpStatus.CREATED);
  });*/
});
