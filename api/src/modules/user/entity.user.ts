import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SITTER = 'sitter',
}

@ObjectType()  
@Entity()  
export class User {
  @Field(() => ID)  
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Field()
  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Field()
  @Column({ type: 'date' })
  birthdate: Date;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field()
  @Column({ type: 'uuid' })
  credentialsId: string;  
}
