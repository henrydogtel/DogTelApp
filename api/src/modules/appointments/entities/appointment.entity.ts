import { ObjectType, Field, Int, Float, extend, registerEnumType, ID,} from '@nestjs/graphql';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import {v4 as uuid} from 'uuid'

export enum typeStatus {
  PENDING = 'pending',
  CANCELLED = 'canceled',
  ENDING = 'ending',
  FINISHED = 'finished'
}

registerEnumType(typeStatus, {
  name: 'typeStatus',
  description: 'Los estados de la cita soportados.',
})


@Entity({name:'appointments'})
@ObjectType()
export class Appointment {
  @Field(() => ID, { description: 'id unico para cada cita' })
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


  @Field(() => typeStatus, {description:'Estado de la cita', nullable:true })
  @Column({default:typeStatus.PENDING,nullable:true})
  status?:typeStatus
  


  @Field(() => Float, {description:'total de la cita', nullable:true })
  @Column({nullable:true})
  total?:number

  @Field(() => String, {description:'Nota del cliente sobre la cita', nullable:true })
  @Column({nullable:true})
  note?:string


  @Field(() => Sitter)
  @ManyToOne(() => Sitter, (sitter) => sitter.appointments)
  @JoinColumn({name:'sitter'})
  sitter:Sitter

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({name:'user'})
  user:User


 


}

