import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import { Column, Entity,JoinColumn,OneToMany, OneToOne,} from 'typeorm';
import { ServicesSitter } from 'src/modules/services-sitter/entities/services-sitter.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Person } from 'src/global-entities/person.entity';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Calification } from 'src/modules/califications/entities/calification.entity';
import { IsInt, IsString, Length, Min } from 'class-validator';



@Entity()
@ObjectType()
export class Sitter extends Person {

  @Field(() => Float)
  @Column({ type: 'float', default:0.0 })
  @IsInt({ message: 'Rate must be an integer' })
  @Min(0, { message: 'Rate must be zero or greater' })
  rate: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  @IsInt({ message: 'Fee must be an integer' })
  @Min(0, { message: 'Fee must be zero or greater' })
  fee: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @IsString({ message: 'Description must be a string' })
  @Length(1, 255, { message: 'Description must be between 1 and 255 characters' })
  descripcion: string

  @OneToMany(() => ServicesSitter, (services) => services.sitter)
  @Field(() => [ServicesSitter])
  services: ServicesSitter[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.sitter)
  appointments: Appointment[]

  @Field(() => Credentials)
    @OneToOne(() => Credentials, (credentials) => credentials.user)
    @JoinColumn({ name: 'credentials_id' })
    credentials: Credentials;
    
    @OneToMany(() => Calification, (calification) => calification.sitter)
    califications: Calification[];
}
