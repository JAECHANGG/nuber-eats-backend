// ObjectType를 만드는 파일

import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // GraphQL의 스키마를 빌드하기 위한 역할
@Entity() // TypeORM의 Entity - DB에 저장되는 실제 데이터의 형식
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;

  @Field(() => String)
  @Column()
  @IsString()
  @IsOptional()
  ownerName: string;

  @Field(() => String)
  @Column()
  @IsString()
  @IsOptional()
  categoryName: string;
}
