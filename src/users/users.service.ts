import { EditProfileInput } from './dtos/edit-profile.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
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

      // 3. JWT를 만들고 User에게 주기
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    // 1번째 값으로 userId에 해당하는 user 정보를 찾고, 2번째 값으로 수정한 email과 password 값을 받아 업데이트합니다.
    // update() 메서드는 entity를 업데이트 하는 것이 아니라 db에 query를 보냅니다.
    // 따라서 BeforeUpdate() 데코레이터를 사용해도 해시화되지 않는 문제가 발생합니다.

    // 해결방법 : save() 메서드를 사용합니다.
    // save() 메서드는 db에 있는 모든 entity를 저장합니다. db에 해당 데이터가 없으면 생성하고 있으면 update 합니다.

    // return this.users.update(userId, { email, password });
    const user = await this.users.findOne({ where: { id: userId } }); // entity를 가져옵니다.
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
