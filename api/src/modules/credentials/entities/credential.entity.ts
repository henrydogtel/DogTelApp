import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Credentials {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  credentialId: string;

  @Field(()=> String)
  @Column()
  username: string;

  @Field(()=> String)
  @Column()
  password: string;

  @Field(()=> String)
  @Column()
  passport: string;

  @Field(()=> String)
  @Column()
  email: string;

  @Field(()=> Boolean)
  @Column({ default: false })
  verified: boolean;

  // @Field(() => User) 
  // @OneToOne(() => User, (user) => user.credentials)
  // user: User;
}
