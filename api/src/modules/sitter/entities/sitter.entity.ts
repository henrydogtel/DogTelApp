import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
@ObjectType()  // Para GraphQL 
export class Sitter extends User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  sitterId: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  area: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  rate: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  fee: number;  // Cuota

  
  //@ManyToOne(() => User, (user) => user.sitters)
  //user: User;
}
