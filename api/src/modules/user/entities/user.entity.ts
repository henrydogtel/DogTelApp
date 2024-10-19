import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SITTER = 'sitter',
}

@Entity()
@ObjectType()  // GraphQL
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();  // Asegúrate de usar 'string' en vez de 'String'

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

  @Field(() => String)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field(() => String)
  @Column({ type: 'uuid' })
  credentialId: string;

  // Puedes habilitar estas relaciones cuando las necesites:
  // @Field(() => Credential)
  // @OneToOne(() => Credentials, (credentials) => credentials.user)
  // credentials: Credentials;

  // @Field(() => [Sitter])
  // @OneToMany(() => Sitter, (sitter) => sitter.user)
  // sitters: Sitter[];
}
