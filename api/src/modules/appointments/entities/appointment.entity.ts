import { ObjectType, Field, Int, Float, extend,} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import {v4 as uuid} from 'uuid'

export enum typeStatus {
  PENDING = 'pending',
  CANCELLED = 'canceled',
  ENDING = 'ending',
  FINISHED = 'finished'
}



@Entity({name:'appointments'})
@ObjectType()
export class Appointment {
  @Field(() => String, { description: 'id unico para cada cita' })
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Field(() => Date, {description:'Fecha de incio de la cita', nullable:true })
  @Column({name:'entry_date', nullable:true })
  entryDate?: Date

  @Field(() => Date, {description:'Fecha del final de la cita', nullable:true })
  @Column({name:'derpeture_date', nullable:true })
  departureDate?: Date

  @Field(() => Date, {description:'Hora de la cita', nullable:true })
  @Column({nullable:true})
  time?:Date


  @Field(() => String, {description:'Estado de la cita', nullable:true })
  @Column({default:typeStatus.PENDING,nullable:true})
  status?:typeStatus
  


  @Field(() => Float, {description:'total de la cita', nullable:true })
  @Column({nullable:true})
  total?:number

  @Field(() => String, {description:'Nota del cliente sobre la cita', nullable:true })
  @Column({nullable:true})
  note?:string

}

