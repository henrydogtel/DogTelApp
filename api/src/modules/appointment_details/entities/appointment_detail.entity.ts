import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'appointment-detail' })
export class AppointmentDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique ID for the appointment detail' })
  id: String;

  @Column({ name: 'price', type: 'decimal' })
  @Field(() => Number, { description: 'Unit price per dog' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ManyToOne(() => Dog, (dog) => dog.details)
  @Field(() => Dog)
  @JoinColumn({ name: 'dog' })
  @IsNotEmpty({ message: 'This field cannot be empty' })
  dog: Dog;

  @ManyToOne(() => Appointment, (appointment) => appointment.detail)
  @Field(() => Appointment)
  @JoinColumn({ name: 'appointment' })
  @IsNotEmpty({ message: 'The appointment cannot be empty' })
  appointment: Appointment;
}
