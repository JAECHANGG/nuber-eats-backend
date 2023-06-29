import { MailService } from './../mail/mail.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Verification } from './entities/verification.entity';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// 가짜 함수
// UserService를 독립적으로 테스트하기 위해 Injection한 Repository를 사용하지 않고 가짜 레퍼스토리 사용
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

// 유닛 테스트는 service, resolver 등 독립적으로 테스트하기 위해 사용합니다.

describe('UserService', () => {
  // 서비스를 module 밖에서 사용하기 위한 변수
  let service: UserService;

  // 모든 테스트를 하기 전에 테스트 모듈을 만듭니다.
  beforeAll(async () => {
    // 모듈로 import 하고 싶은 것들을 넣어줍니다.
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 테스트할 함수들
  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
