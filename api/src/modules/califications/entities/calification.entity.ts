import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('califications')
export class Calification {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  rate: number;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column()
  sitterId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  comment?: string;
}
