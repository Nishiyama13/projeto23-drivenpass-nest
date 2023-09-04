import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { E2EUtils } from './utils/e2e-utils';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateUserDto } from '../src/users/dto/login.dto';
import { UserFactory } from './factories/user.factory';
import * as bcrypt from 'bcrypt';

describe('User E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;

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
    userFactory = new UserFactory(prisma);

    await E2EUtils.cleanDB(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('POST /users/sign-up => should not create a user with properties missing', async () => {
    const userDto: CreateUserDto = new CreateUserDto();

    await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send(userDto)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('POST /users/sign-up => should not create a user with duplicate email', async () => {
    const user = await userFactory
      .withEmail('driven@email.com')
      .withPassword('$enh@Br@b!ssim4')
      .persist();

    await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send(user)
      .expect(HttpStatus.CONFLICT);
  });

  it('POST /users/sign-up => should create a new user', async () => {
    const userData = {
      email: 'drivenCreate@email.com',
      password: '$enh@Br@b!ssim4',
    };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const response = await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send({ email: userData.email, password: hashedPassword })
      .expect(HttpStatus.CREATED);
    expect(response.body.email).toEqual(userData.email);
  });

  it('POST /users/sign-in => should authenticate a user', async () => {
    const userData = {
      email: 'drivent@email.com',
      password: '$enh@Br@b!ssim4',
    };

    await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send(userData)
      .expect(HttpStatus.CREATED);

    const response = await supertest(app.getHttpServer())
      .post('/users/sign-in')
      .send(userData)
      .expect(HttpStatus.OK);
    expect(response.body).toHaveProperty('token');
    //const token = response.body.token;
  });

  it('POST /users/sign-in => should return unauthorized when send invalid password', async () => {
    const userData = {
      email: 'drivent@email.com',
      password: '$enh@Br@b!ssim4',
    };
    const userInvalidData = {
      email: 'drivent@email.com',
      password: '$enh@Br@b!ssim4123',
    };

    await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send(userData)
      .expect(HttpStatus.CREATED);

    const response = await supertest(app.getHttpServer())
      .post('/users/sign-in')
      .send(userInvalidData)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('POST /users/sign-in => should return bad request when send invalid body', async () => {
    const userData = {
      email: 'drivent@email.com',
      password: '$enh@Br@b!ssim4',
    };
    const userInvalidData = { email: 'drivent@email.com' };

    await supertest(app.getHttpServer())
      .post('/users/sign-up')
      .send(userData)
      .expect(HttpStatus.CREATED);

    const response = await supertest(app.getHttpServer())
      .post('/users/sign-in')
      .send(userInvalidData)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
