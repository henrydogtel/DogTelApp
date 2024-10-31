import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DogsService } from './dogs.service';
import { Dog } from './entities/dog.entity';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { RemoveDogResponse } from './dto/remove-dog.input';

@Resolver(() => Dog)
export class DogsResolver {
  constructor(private readonly dogsService: DogsService) {}

  @Mutation(() => Dog)

async createDog(
  @Args('idUser', ParseUUIDPipe) idUser: string,
  @Args('createDogInput') createDogInput: CreateDogInput,
): Promise<Dog> {
  const { name, birthdate, race, size, images } = createDogInput;
  return await this.dogsService.createDog(idUser, createDogInput);
}

  @Query(() => [Dog], { name: 'dogs' })
  findAll(@Args('idUser', { type: () => String }) id: string) {
    return this.dogsService.findAll(id);
  }

  @Query(() => Dog, { name: 'dog' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.dogsService.findOne(id);
  }

  @Mutation(() => Dog)
  updateDog(@Args('updateDogInput') updateDogInput: UpdateDogInput) {
    return this.dogsService.update(updateDogInput.id, updateDogInput);
  }

  @Mutation(() => RemoveDogResponse) 
  async removeDog(@Args('id') id: string): Promise<RemoveDogResponse> {
    const success = await this.dogsService.removeDog(id);
    return {
      success,
      message: success ? 'Mascota eliminada con éxito' : 'Error al eliminar la mascota',
    };
  }
  
}
