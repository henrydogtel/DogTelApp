import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid"

@Entity()
@ObjectType()
export class ServicesSitter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  @IsUUID('4', { message: 'The ID must be a valid UUID' })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field({ nullable: false })
  @IsNotEmpty({ message: 'The name is required' })
  @IsString({ message: 'The name must be a string' })
  @Length(1, 50, { message: 'The name must be between 1 and 50 characters' })
  name: string

  @Column('text')
  @Field({ nullable: false })
  @IsNotEmpty({ message: 'The description is required' })
  @IsString({ message: 'The description must be a string' })
  description: string

  @ManyToOne(() => Sitter, sitter => sitter.services)
  @JoinColumn({ name: 'sitter_id' })
  @Field(() => Sitter)
  sitter: Sitter;
}

