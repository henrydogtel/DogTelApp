import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum typeRace {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

@Entity({ name: 'dogs' })
@ObjectType()
export class Dog {
  @Field(() => String, { description: 'Unique ID for the dog' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', name: 'name' })
  @Field(() => String, { description: 'The name of the pet' })
  @IsNotEmpty({ message: 'The name is required' })
  @IsString({ message: 'The name must be a text string' })
  name: string;

  @Column({ type: 'date', name: 'birthdate' })
  @Field(() => String, { description: 'The birthdate of the dog' })
  @IsNotEmpty({ message: 'The birthdate is required' })
  @IsDate({ message: 'The birthdate must be a valid date' })
  birthdate: Date;

  @Column('simple-array', { name: 'images' })
  @Field(() => [String], { description: 'List of image URLs for the dog' })
  @IsArray({ message: 'Images must be in an array' })
  @IsString({ each: true, message: 'Each image URL must be a text string' })
  images?: string[];

  @Column({ type: 'varchar', name: 'race' })
  @Field(() => String, { description: 'Race of the dog' })
  @IsNotEmpty({ message: 'The race is required' })
  @IsString({ message: 'The race must be a text string' })
  race: string;

  @Column({ type: 'enum', enum: typeRace })
  @Field(() => String, { description: 'Size of the dog' })
  @IsNotEmpty({ message: 'The size is required' })
  @IsEnum(typeRace, {
    message: 'The size must be one of the allowed values: SMALL, MEDIUM, LARGE',
  })
  size: typeRace;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.dogs)
  @Field(() => User)
  user: User;

  @OneToMany(() => AppointmentDetail, (details) => details.dog)
  @Field(() => [AppointmentDetail])
  details: AppointmentDetail[];

}
