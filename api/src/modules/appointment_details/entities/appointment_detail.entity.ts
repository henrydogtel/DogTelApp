import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name:'appointment-detail'})
export class AppointmentDetail {

  @PrimaryGeneratedColumn()
  @Field(() => String,{description:'id unico de el detalle de la cita'})
  id:String

  @Column({name:'price',type:'decimal'})
  @Field(() => Number, { description: 'price de unnidad por perro' })
  price: number;

  @ManyToOne(() => Dog, (dog) => dog.details)
  @Field(() => Dog)
  @JoinColumn({name:'dog'})
  dog: Dog

  @ManyToOne(() => Appointment,(appointment) => appointment.detail)
  @Field(() => Appointment)
  @JoinColumn({name:'appointment'})
  appointment: Appointment
}
