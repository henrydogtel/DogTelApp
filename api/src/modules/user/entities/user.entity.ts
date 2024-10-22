import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SITTER = 'sitter',
}

@Entity()
@ObjectType()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: String = uuid();

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Field(() => Date)
  @Column({ type: 'date' })
  birthdate: Date;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Field(() => String,{nullable:true
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER, nullable:true })
  role?: UserRole;

  

  @Field(()=> String)
  @Column({ default: 'https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg' })
  userImg: string

  @Field(() => Credentials)
  @OneToOne(() => Credentials, (credentials) => credentials.user)
  @JoinColumn({ name: 'credentials_id' })
  credentials: Credentials;



}
