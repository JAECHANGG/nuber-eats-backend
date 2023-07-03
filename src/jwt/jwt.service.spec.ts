import { CONFIG_OPTIONS } from './../common/common.constants';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { JwtService } from 'src/jwt/jwt.service';

const TEST_KEY = 'testKey';
const USER_ID = 1;

// 외부 라이브러리를 mock 하는 방법 (여기서는 jsonwebtoken 라이브러리)
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'), // jwt.sign() 리턴 값을 'TOKEN'으로 대체합니다.
    verify: jest.fn(() => ({
      id: USER_ID, // decode된 token을 return 합니다.
    })),
  };
});

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        // constructor 안의 값들을 가져오기 위해 JwtService로 내보내기 위해 providers option을 사용합니다.
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    it('should return a signed token', () => {
      const token = service.sign(USER_ID);
      expect(typeof token).toBe('string');
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: USER_ID }, TEST_KEY);
    });
  });

  describe('verify', () => {
    it('should return the decoded token', () => {
      const TOKEN = 'TOKEN';
      const decodedToken = service.verify(TOKEN);
      expect(decodedToken).toEqual({ id: USER_ID }); // decodedToken === 14번 째 줄
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(TOKEN, TEST_KEY);
    });
  });
});
