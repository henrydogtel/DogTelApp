import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name:'appointment-detail'})
export class AppointmentDetail {

  @PrimaryGeneratedColumn()
  @Field(() => String,{description:'id unico de el detalle de la cita'})
  id:String

  @Field(() => Number, { description: 'price de unnidad por perro' })
  price: number;
}
