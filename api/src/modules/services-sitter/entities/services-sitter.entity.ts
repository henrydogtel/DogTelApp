import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid"

@Entity()
@ObjectType()
export class ServicesSitter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field({ nullable: false })
  name: string

  @Column('text')
  @Field({ nullable: false })
  description: string

  @ManyToOne(() => Sitter, sitter => sitter.services)
  @JoinColumn({ name: 'sitter_id' })
  @Field(() => Sitter)
  sitter: Sitter;
}

