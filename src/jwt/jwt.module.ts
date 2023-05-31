import { CONFIG_OPTIONS } from './jwt.constants';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  // options을 JwtService로 내보내는 방법은 providers object를 사용한다.
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS, // 제공자
          useValue: options, // 그 값은 app.module.ts 파일에서 넘겨받은 options(SECRET_KEY)
        },
        JwtService,
      ],
    };
  }
}
