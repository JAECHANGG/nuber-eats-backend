import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    // Nest.js가 시작할 때마다 이 곳의 코드를 테스트합니다.
  }

  // email을 보내는 메서드
  async sendEmail(subject: string, template: string, emailVars: EmailVar[]) {
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: 'Nuber',
      key: this.options.apiKey, // 나의 apiKey
    });

    const messageData = {
      from: 'Nuber@mailgun-test.com', // 보낸 주소
      to: 'abcwockd95@naver.com', // 받는 주소
      subject: subject, // 제목
      template: template, // 템플릿
    };
    emailVars.forEach((eVar) => (messageData[`v:${eVar.key}`] = eVar.value));

    try {
      await client.messages.create(
        this.options.domain, // 나의 domain
        messageData, // 보낼 데이터 형식
      );
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
