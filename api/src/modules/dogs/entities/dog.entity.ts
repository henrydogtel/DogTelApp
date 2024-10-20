import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name:'dogs'})
export class Dog {

  @Field(() => String, {description:'Id unico para la tabla dogs'})
  @PrimaryGeneratedColumn()
  id:String

  name:String

  

}
