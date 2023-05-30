import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } }); // 새로운 user 확인
      if (exists) {
        return { ok: false, error: 'There is a user with that email already.' };
      }
      await this.users.save(this.users.create({ email, password, role })); // 없으면 user 생성후 저장
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account." };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // 3. JWT를 만들고 User에게 주기

    try {
      // 1. email을 가진 User을 찾아라
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      // 2. password가 맞는지 확인해라
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      return {
        ok: true,
        token: 'lalalalala',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
