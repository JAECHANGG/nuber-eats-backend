import { UserService } from './users.service';
import { Test } from '@nestjs/testing';

// 유닛 테스트는 service, resolver 등 독립적으로 테스트하기 위해 사용합니다.

describe('UserService', () => {
  // 서비스를 module 밖에서 사용하기 위한 변수
  let service: UserService;

  // 모든 테스트를 하기 전에 테스트 모듈을 만듭니다.
  beforeAll(async () => {
    // 모듈로 import 하고 싶은 것들을 넣어줍니다.
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
