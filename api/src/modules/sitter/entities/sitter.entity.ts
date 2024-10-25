import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Column, Entity,OneToMany,} from 'typeorm';
import { ServicesSitter } from 'src/modules/services-sitter/entities/services-sitter.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Person } from 'src/global-entities/person.entity';



@Entity()
@ObjectType()
export class Sitter extends Person {

  @Field(() => Int)
  @Column({ type: 'int', default:0 })
  rate: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  fee: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string

  @OneToMany(() => ServicesSitter, (services) => services.sitter)
  @Field(() => [ServicesSitter])
  services: ServicesSitter[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.sitter)
  appointments: Appointment[]


}
