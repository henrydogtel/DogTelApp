import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitter } from './entities/services-sitter.entity';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
import { RemoveServicesSitter } from './dto/remove-services-sitter';

@Resolver(() => ServicesSitter)
export class ServicesSitterResolver {
  constructor(private readonly servicesSitterService: ServicesSitterService) { }

  @Mutation(() => ServicesSitter)
  async createServicesSitter(
    @Args('sitter_id') idSitter: string,
    @Args('CreateServicesSitterInput') createServicesSitterInput: CreateServicesSitterInput
  ): Promise<ServicesSitter> {
    const { name, description } = createServicesSitterInput;
    return await this.servicesSitterService.create(idSitter, createServicesSitterInput);
  }

  @Query(() => [ServicesSitter], { name: 'servicesSitter' })
  findAll() {
    return this.servicesSitterService.findAll();
  }

  @Query(() => ServicesSitter, { name: 'servicesSitter' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.servicesSitterService.findOne(id);
  }

  @Mutation(() => ServicesSitter)
  updateServicesSitter(@Args('updateServicesSitterInput') updateServicesSitterInput: UpdateServicesSitterInput) {
    return this.servicesSitterService.update(updateServicesSitterInput.id, updateServicesSitterInput);
  }

  @Mutation(() => RemoveServicesSitter)
  async removeServicesSitter(@Args('id') id: string): Promise<RemoveServicesSitter> {
    const success = await this.servicesSitterService.removeService(id);
    return {
      success, message: success ? 'the service was deleted' : 'error at deleting service '
    }
  }
}
