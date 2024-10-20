import { InputType, Field, Float } from '@nestjs/graphql';
import { typeStatus } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput {
  @Field(() => String, { description: 'Estado de la cita', nullable:true  })
  status?: typeStatus;

  @Field(() => Date, { description: 'Fecha de inicio de la cita' , nullable:true })
  entryDate?: Date; 

  @Field(() => Date, { description: 'Fecha de finalización de la cita' , nullable:true })
  departureDate?: Date; 

  @Field(() => Date, { description: 'Hora de la cita', nullable:true  })
  time?: Date; 

  @Field(() => Float, { description: 'Total de la cita', nullable:true })
  total?: number; 

  @Field(() => String, { description: 'Nota del cliente sobre la cita', nullable: true })
  note?: string;
}
