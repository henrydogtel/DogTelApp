import { Field, ObjectType, ID,  } from '@nestjs/graphql';
import { UserRole } from 'src/enums/user-role.enum';
import { Person } from 'src/global-entities/person.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';





@Entity({name:'user'})
@ObjectType()
export class User extends Person   {
  


  @Field(() => [Dog])
  @OneToMany(() => Dog, (dog) => dog.user)
  dogs:Dog[]

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[]

  

}

