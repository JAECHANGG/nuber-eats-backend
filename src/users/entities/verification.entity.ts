import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  // onDelete: "CASCADE"를 정의하지 않으면 user를 삭제했을 시 verification만 남기때문에 삭제할 수 없습니다.
  // user와 붙어있는 verification도 같이 삭제한다는 의미
  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
