import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from "uuid"


@Entity()
@ObjectType()
export class Credentials {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Field(()=> String)
  @Column()
  password: string;

  @Field(()=> String)
  @Column({nullable:true})
  passport?: string;

  @Field(()=> String)
  @Column()
  email: string;

  @Field(()=> Boolean)
  @Column({ default: false })
  verified: boolean;

  @Field(() => User) 
  @OneToOne(() => User, (user) => user.credentials)
  user: User;
}
