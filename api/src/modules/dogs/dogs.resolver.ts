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
    try {
      const { name, birthdate, race, size, images } = createDogInput;
      return await this.dogsService.createDog(idUser, createDogInput);
    } catch (error) {
      console.error('Error creating dog:', error);
      throw new Error(
        'An error occurred while creating the dog. Please try again.',
      );
    }
  }

  @Query(() => [Dog], { name: 'dogs' })
  async findAll(@Args('idUser', { type: () => String }) id: string) {
    try {
      return await this.dogsService.findAll(id);
    } catch (error) {
      console.error('Error retrieving dogs:', error);
      throw new Error(
        'An error occurred while retrieving the dogs. Please try again.',
      );
    }
  }

  @Query(() => Dog, { name: 'dog' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.dogsService.findOne(id);
    } catch (error) {
      console.error(`Error finding dog with ID ${id}:`, error);
      throw new Error(
        'An error occurred while finding the dog. Please try again.',
      );
    }
  }

  @Mutation(() => Dog)
  async updateDog(@Args('updateDogInput') updateDogInput: UpdateDogInput) {
    try {
      return await this.dogsService.update(updateDogInput.id, updateDogInput);
    } catch (error) {
      console.error(`Error updating dog with ID ${updateDogInput.id}:`, error);
      throw new Error(
        'An error occurred while updating the dog. Please try again.',
      );
    }
  }

  @Mutation(() => RemoveDogResponse)
  async removeDog(@Args('id') id: string): Promise<RemoveDogResponse> {
    try {
      const success = await this.dogsService.removeDog(id);
      return {
        success,
        message: success
          ? 'Dog removed successfully'
          : 'Failed to remove the dog',
      };
    } catch (error) {
      console.error(`Error removing dog with ID ${id}:`, error);
      throw new Error(
        'An error occurred while removing the dog. Please try again.',
      );
    }
  }

  @Mutation(() => Dog)
  async updateDogStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<Dog> {
    try {
      return await this.dogsService.DogStatus(id, isActive);
    } catch (error) {
      console.error('Error updating dog status:', error);
      throw new error(
        'An error occurred while updating the dog status. Please try again.',
      );
    }
  }
}
