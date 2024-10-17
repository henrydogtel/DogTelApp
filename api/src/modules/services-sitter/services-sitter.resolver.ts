import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitter } from './entities/services-sitter.entity';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';

@Resolver(() => ServicesSitter)
export class ServicesSitterResolver {
  constructor(private readonly servicesSitterService: ServicesSitterService) {}

  @Mutation(() => ServicesSitter)
  createServicesSitter(@Args('createServicesSitterInput') createServicesSitterInput: CreateServicesSitterInput) {
    return this.servicesSitterService.create(createServicesSitterInput);
  }

  @Query(() => [ServicesSitter], { name: 'servicesSitter' })
  findAll() {
    return this.servicesSitterService.findAll();
  }

  @Query(() => ServicesSitter, { name: 'servicesSitter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.servicesSitterService.findOne(id);
  }

  @Mutation(() => ServicesSitter)
  updateServicesSitter(@Args('updateServicesSitterInput') updateServicesSitterInput: UpdateServicesSitterInput) {
    return this.servicesSitterService.update(updateServicesSitterInput.id, updateServicesSitterInput);
  }

  @Mutation(() => ServicesSitter)
  removeServicesSitter(@Args('id', { type: () => Int }) id: number) {
    return this.servicesSitterService.remove(id);
  }
}
