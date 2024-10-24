import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserRole } from "src/enums/user-role.enum";
import { Credentials } from "src/modules/credentials/entities/credential.entity";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@ObjectType()
export class Person {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: String = uuid();
  
    @Field(() => String)
    @Column({ type: 'varchar', length: 255 })
    firstname: string;
  
    @Field(() => String)
    @Column({ type: 'varchar', length: 255 })
    lastname: string;
  
    @Field(() => Date)
    @Column({ type: 'date' })
    birthdate: Date;
  
    @Field(() => String)
    @Column({ type: 'varchar', length: 255 })
    address: string;
  
    @Field(() => String,{nullable:true
    })
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER, nullable:true })
    role?: UserRole;
  
    @Field(()=> String)
    @Column({ default: 'https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg' })
    userImg: string
  
    @Field(() => Credentials)
    @OneToOne(() => Credentials, (credentials) => credentials.user)
    @JoinColumn({ name: 'credentials_id' })
    credentials: Credentials;
}