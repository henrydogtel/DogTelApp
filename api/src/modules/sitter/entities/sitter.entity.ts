import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ServicesSitter } from 'src/modules/services-sitter/entities/services-sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
@ObjectType()
export class Sitter extends User {

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  area: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  rate: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  fee: number;

  @OneToMany(() => ServicesSitter, (services) => services.sitter)
  @Field(() => [ServicesSitter])
  services: ServicesSitter[];
}
