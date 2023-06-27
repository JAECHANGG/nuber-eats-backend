import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from './../../common/dtos/output.dto';

@ObjectType()
export class EditProfileOutput extends CoreOutput {}

// PartialType은 Pick해 온 email과 Password 둘 중 하나만 쓰거나 둘 다 쓸 수 있도록 해줍니다.
@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
