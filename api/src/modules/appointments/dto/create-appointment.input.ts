import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { typeStatus } from '../entities/appointment.entity';
import { Timestamp } from 'typeorm';

@InputType()
export class CreateAppointmentInput {
  


  @Field(() => String, {
    description: 'Fecha de inicio de la cita',
    nullable: true,
  })
  entryDate?: Date;

  @Field(() => String, {
    description: 'Fecha de finalización de la cita',
    nullable: true,
  })
  departureDate?: Date;

  @Field(() => String, { description: 'Hora de la cita', nullable: true })
  timeIn?: string;

  @Field(() => String, {
    description: 'Hora del final de la cita',
    nullable: true,
  })
  timeOut?:string;

  @Field(() => String, {
    description: 'Nota del cliente sobre la cita',
    nullable: true,
  })
  note?: string;

  @Field(() => String, { description: 'id del usuario de la cita' })
  idUser?: string;

  @Field(() => String, { description: 'id del sitter a cuidar en la cita' })
  idSitter?: string;

  @Field(() => [String], {description:'id dogs to appointment'})
  dogsId:string[]
}
