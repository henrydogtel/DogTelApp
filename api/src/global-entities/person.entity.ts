import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@ObjectType()
export class Person {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'Firstname must be a string' })
  @Length(1, 255, { message: 'Firstname must be between 1 and 255 characters' })
  firstname: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'Lastname must be a string' })
  @Length(1, 255, { message: 'Lastname must be between 1 and 255 characters' })
  lastname: string;

  @Field(() => Date)
  @Column({ type: 'date' })
  @IsDate({ message: 'Birthdate must be a valid date' })
  birthdate: Date;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'Address must be a string' })
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be a valid UserRole' })
  role?: UserRole;

  @Field(() => String)
  @Column({
    default:
      'https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg',
  })
  @IsUrl({}, { message: 'User image must be a valid URL' })
  userImg: string;

  @Field(() => Boolean)
  @Column({ default: true })
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive: boolean;
}
