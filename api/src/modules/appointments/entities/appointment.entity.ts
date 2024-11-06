import {
  ObjectType,
  Field,
  Int,
  Float,
  extend,
  registerEnumType,
  ID,
} from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum typeStatus {
  PENDING = 'pending',
  CANCELLED = 'canceled',
  APPROVED = 'approved',
  FINISHED = 'finished',
}

registerEnumType(typeStatus, {
  name: 'typeStatus',
  description: 'Supported appointment statuses.',
});

@Entity({ name: 'appointments' })
@ObjectType()
export class Appointment {
  @Field(() => String, { description: 'Unique ID for each appointment' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Field(() => Date, {
    description: 'Start date of the appointment',
    nullable: true,
  })
  @Column({ name: 'entry_date', nullable: true })
  @IsOptional()
  @IsDate({ message: 'The start date must be a valid date' })
  entryDate?: Date;

  @Field(() => Date, {
    description: 'End date of the appointment',
    nullable: true,
  })
  @Column({ name: 'departure_date', nullable: true })
  @IsOptional()
  @IsDate({ message: 'The end date must be a valid date' })
  departureDate?: Date;

  @Field(() => Date, { description: 'Time of the appointment', nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'The appointment time must be a valid date' })
  timeIn?: Date;

  @Field(() => Date, { description: 'Time of the appointment', nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'The appointment time must be a valid date' })
  timeOut?: Date;

  @Field(() => typeStatus, {
    description: 'Status of the appointment',
    nullable: true,
  })
  @Column({ default: typeStatus.PENDING, nullable: true })
  @IsOptional()
  @IsEnum(typeStatus, {
    message: 'The status must be one of the allowed values',
  })
  status?: typeStatus;

  @Field(() => Float, {
    description: 'Total cost of the appointment',
    nullable: true,
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'The total must be a valid number' })
  total?: number;

  @Field(() => String, {
    description: 'Customer note about the appointment',
    nullable: true,
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'The note cannot be empty' })
  note?: string;

  @Field(() => Sitter)
  @ManyToOne(() => Sitter, (sitter) => sitter.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sitter' })
  @IsNotEmpty({ message: 'The sitter cannot be empty' })
  sitter: Sitter;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  @IsNotEmpty({ message: 'The user cannot be empty' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Field(() => [AppointmentDetail])
  @OneToMany(() => AppointmentDetail, (detail) => detail.appointment)
  detail: AppointmentDetail[];

  @Field(() => Date, { description: 'hour when appointment create was' })
  @Column({ nullable: true })
  createdAt: Date
}
