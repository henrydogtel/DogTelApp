import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitter } from './entities/services-sitter.entity';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
import { RemoveServicesSitter } from './dto/remove-services-sitter';

@Resolver(() => ServicesSitter)
export class ServicesSitterResolver {
  constructor(private readonly servicesSitterService: ServicesSitterService) {}

  @Mutation(() => ServicesSitter)
  async createServicesSitter(
    @Args('sitter_id') idSitter: string,
    @Args('CreateServicesSitterInput')
    createServicesSitterInput: CreateServicesSitterInput,
  ): Promise<ServicesSitter> {
    try {
      const { name, description } = createServicesSitterInput;
      return await this.servicesSitterService.create(
        idSitter,
        createServicesSitterInput,
      );
    } catch (error) {
      console.error('Error creating services sitter:', error);
      throw new Error(
        'An error occurred while creating the services sitter. Please try again.',
      );
    }
  }

  @Query(() => [ServicesSitter], { name: 'servicesSitter' })
  async findAll() {
    try {
      return await this.servicesSitterService.findAll();
    } catch (error) {
      console.error('Error retrieving services sitters:', error);
      throw new Error(
        'An error occurred while retrieving the services sitters. Please try again.',
      );
    }
  }

  @Query(() => ServicesSitter, { name: 'servicesSitter' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.servicesSitterService.findOne(id);
    } catch (error) {
      console.error(`Error finding service sitter with ID ${id}:`, error);
      throw new Error(
        'An error occurred while finding the services sitter. Please try again.',
      );
    }
  }

  @Mutation(() => ServicesSitter)
  async updateServicesSitter(
    @Args('updateServicesSitterInput')
    updateServicesSitterInput: UpdateServicesSitterInput,
  ) {
    try {
      return await this.servicesSitterService.update(
        updateServicesSitterInput.id,
        updateServicesSitterInput,
      );
    } catch (error) {
      console.error(
        `Error updating services sitter with ID ${updateServicesSitterInput.id}:`,
        error,
      );
      throw new Error(
        'An error occurred while updating the services sitter. Please try again.',
      );
    }
  }

  @Mutation(() => RemoveServicesSitter)
  async removeServicesSitter(
    @Args('id') id: string,
  ): Promise<RemoveServicesSitter> {
    try {
      const success = await this.servicesSitterService.removeService(id);
      return {
        success,
        message: success
          ? 'The service was deleted successfully'
          : 'Error deleting the service',
      };
    } catch (error) {
      console.error(`Error removing service sitter with ID ${id}:`, error);
      throw new Error(
        'An error occurred while deleting the services sitter. Please try again.',
      );
    }
  }
}
