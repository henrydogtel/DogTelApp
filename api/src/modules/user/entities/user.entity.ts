import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserRole } from 'src/enums/user-role.enum';
import { Person } from 'src/global-entities/person.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Calification } from 'src/modules/califications/entities/calification.entity';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Status } from 'src/enums/status.enum';
@Entity({ name: 'user' })
@ObjectType()
export class User extends Person {
  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  @Field(() => Status)  
  status?: Status;

  @Field(() => [Dog])
  @OneToMany(() => Dog, (dog) => dog.user, { cascade: true, onDelete: 'CASCADE' })
  dogs: Dog[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.user, { cascade: true, onDelete: 'CASCADE' })
  appointments: Appointment[];

  @Field(() => Credentials)
  @OneToOne(() => Credentials, (credentials) => credentials.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credentials_id' })
  credentials: Credentials;

  @OneToMany(() => Calification, (calification) => calification.user, { cascade: true, onDelete: 'CASCADE' })
  califications: Calification[];
}
