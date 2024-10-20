import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum typeRace {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

@ObjectType()
@Entity({ name: 'dogs' })
export class Dog {
  
  @Field(() => Int, { description: 'Unique ID for the dog' })
  @PrimaryGeneratedColumn()
  id: number; // Change to number

  @Column({ type: 'varchar', name: 'name' }) // Use 'varchar' instead of 'string'
  @Field(() => String, { description: 'The name of the pet' })
  name: string; // Change to string

  @Column({ type: 'date', name: 'birthdate' }) // Use 'date'
  @Field(() => String, { description: 'The birthdate of the dog' })
  birthdate: Date; // Keep as Date

  @Column('simple-array', { name: 'images' }) // Store images as a simple array
  @Field(() => [String], { description: 'List of image URLs for the dog' })
  images: string[]; // Change to string[]

  @Column({ type: 'varchar', name: 'race' }) // Use 'varchar'
  @Field(() => String, { description: 'Race of the dog' })
  race: string; // Change to string

  @Column({ type: 'enum', enum: typeRace }) // Use enum for size
  @Field(() => typeRace, { description: 'Size of the dog' })
  size: typeRace;
}
