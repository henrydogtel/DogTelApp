import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { typeStatus } from '../entities/appointment.entity';
import { Timestamp } from 'typeorm';

@InputType()
export class CreateAppointmentInput {
  @Field(() => String, { description: 'Estado de la cita', nullable: true })
  status?: typeStatus;

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
  timeIn?: Timestamp;

  @Field(() => String, {
    description: 'Hora del final de la cita',
    nullable: true,
  })
  timeOut?: Timestamp;

  @Field(() => Float, { description: 'Total de la cita', nullable: true })
  total?: number;

  @Field(() => String, {
    description: 'Nota del cliente sobre la cita',
    nullable: true,
  })
  note?: string;

  @Field(() => ID, { description: 'id del usuario de la cita' })
  idUser?: string;

  @Field(() => ID, { description: 'id del sitter a cuidar en la cita' })
  idSitter?: string;

  @Field(() => [ID], {description:'id dogs to appointment'})
  dogsId:string[]
}
