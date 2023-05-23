// dto = data transfer object

import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

// ArgsType는 InputType의 object를 풀어서 하나하나 argument로 전달한다.
@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  // dto의 유효성 검사 npm i class-validator
  // main.ts에 app에calidation-pipeline을 만들어줘야 정상 작동한다.
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  ownerName: string;
}

// InputType는 argument로써 graphql에 전달하기 위한 object
// @InputType()
// export class CreateRestaurantDto {
//   @Field((type) => String)
//   name: string;
//   @Field((type) => Boolean)
//   isVegan: boolean;
//   @Field((type) => String)
//   address: string;
//   @Field((type) => String)
//   ownerName: string;
// }
