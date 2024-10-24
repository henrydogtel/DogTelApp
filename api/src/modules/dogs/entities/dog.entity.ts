import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


export enum typeRace {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

@Entity({ name: 'dogs' })
@ObjectType()
export class Dog {
  
  @Field(() => String, { description: 'Unique ID for the dog' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid(); 

  @Column({ type: 'varchar', name: 'name' }) 
  @Field(() => String, { description: 'The name of the pet' })
  name: string; 

  @Column({ type: 'date', name: 'birthdate' }) 
  @Field(() => String, { description: 'The birthdate of the dog' })
  birthdate: Date; 

  @Column('simple-array', { name: 'images' }) 
  @Field(() => [String], { description: 'List of image URLs for the dog' })
  images: string[]; 

  @Column({ type: 'varchar', name: 'race' }) 
  @Field(() => String, { description: 'Race of the dog' })
  race: string; 

  @Column({ type: 'enum', enum: typeRace }) 
  @Field(() => String, { description: 'Size of the dog' })
  size: typeRace;

  @ManyToOne(() => User, (user) => user.dogs)
  @Field(() => User)
  user:User

  
}
