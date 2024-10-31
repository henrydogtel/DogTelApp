import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from "uuid"


@Entity()
@ObjectType()
export class Credentials {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: 'The password is required' }) 
  @IsString({ message: 'The password must be a string' })
  @Length(8, 20, { message: 'The password must be between 8 and 20 characters long' })
  password: string;
  
  @Field(() => String)
  @Column({ nullable: true })
  @IsString({ message: 'The passport number must be a string' })
  passport?: string;
  
  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: 'The email is required' }) 
  @IsEmail({}, { message: 'A valid email is required' })
  email: string;
  
  @Field(() => Boolean)
  @Column({ default: false })
  @IsBoolean({ message: 'The verification field must be boolean' })
  verified: boolean;
  
  @Field(() => User) 
  @OneToOne(() => User, (user) => user.credentials)
  user: User;
  
  @Field(() => Sitter) 
  @OneToOne(() => Sitter, (sitter) => sitter.credentials)
  sitter: User;
  
}
