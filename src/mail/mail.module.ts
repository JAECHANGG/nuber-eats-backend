import { MailService } from './mail.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      exports: [MailService],
      providers: [
        {
          provide: CONFIG_OPTIONS, // 제공자
          useValue: options, // 그 값은 app.module.ts 파일에서 넘겨받은 options(SECRET_KEY)
        },
        MailService,
      ],
    };
  }
}
