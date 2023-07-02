import { CONFIG_OPTIONS } from './../common/common.constants';
import { Test } from '@nestjs/testing';
import { JwtService } from 'src/jwt/jwt.service';

const TEST_KEY = 'testKey';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    console.log('');
  });

  it.todo('sign');
  it.todo('verify');
});
