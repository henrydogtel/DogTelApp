import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class DogsRepository {
  constructor(
    @InjectRepository(Dog) private readonly dogsRepository: Repository<Dog>, private readonly userRepository: UserRepository
  ) { }

  async createDog(idUser: string, createDogInput: CreateDogInput): Promise<Partial<Dog>> {
    const { name, birthdate, race, size } = createDogInput;
    try {
      const userFound = await this.userRepository.findOne(idUser)
      if (!userFound) throw new BadRequestException('No se encontro el usuario');
      const dogCreated = this.dogsRepository.create({ name, birthdate, race, size, user: userFound });
      if (!dogCreated) throw new BadRequestException('Hubo un error al crear la mascota');

      const dogSaved = await this.dogsRepository.save(dogCreated);
      if (!dogSaved) throw new BadRequestException('Hubo un error al guardar la mascota');

      return dogSaved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(idUser: string): Promise<Dog[]> {
    try {
      const dogs = await this.dogsRepository.find({
        where: {
          user: {
            id: idUser
          }
        }
      });
      if (!dogs.length) throw new NotFoundException('No se encontraron mascotas');
      return dogs;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Dog> {
    try {
      const dog = await this.dogsRepository.findOne({ where: { id } });
      if (!dog) throw new NotFoundException('Mascota no encontrada');
      return dog;
    } catch (error) {
      throw error;
    }
  }

  async updateDog(id: string, updateDogInput: UpdateDogInput): Promise<Dog> {
    try {
      const dog = await this.findOne(id);
      if (!dog) throw new NotFoundException('Mascota no encontrada para actualizar');

      await this.dogsRepository.update(id, updateDogInput);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }
  async removeDog(id: string): Promise<boolean> {
    try {
      const dog = await this.findOne(id);
      if (!dog) {
        throw new NotFoundException('Mascota no encontrada para eliminar');
      }

      await this.dogsRepository.remove(dog);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}