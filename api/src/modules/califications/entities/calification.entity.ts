import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('califications')
export class Calification {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Float)
  @Column()
  @IsNotEmpty({ message: 'The rating is required' })
  @IsInt({ message: 'The rating must be an integer' })
  @Min(1, { message: 'The rating must be at least 1' })
  @Max(5, { message: 'The rating cannot exceed 5' })
  rate: number;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: 'The user ID is required' })
  @IsUUID('4', { message: 'The user ID must be a valid UUID' })
  userId: string;

  @Field(() => String)
  @Column()
  @IsNotEmpty({ message: 'The sitter ID is required' })
  @IsUUID('4', { message: 'The sitter ID must be a valid UUID' })
  sitterId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'The comment must be a string' })
  comment?: string;

  @ManyToOne(() => User, (user) => user.califications, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Sitter, (sitter) => sitter.califications, {
    onDelete: 'CASCADE',
  })
  sitter: Sitter;
}
