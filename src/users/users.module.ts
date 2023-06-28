import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { Verification } from './entities/verification.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UserResolver, UserService, ConfigService],
  exports: [UserService],
})
export class UsersModule {}
