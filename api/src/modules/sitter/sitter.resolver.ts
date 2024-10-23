import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SitterService } from './sitter.service';
import { Sitter } from './entities/sitter.entity';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';

@Resolver(() => Sitter)
export class SitterResolver {
  constructor(private readonly sitterService: SitterService) {}

  @Mutation(() => Sitter)
  createSitter(@Args('createSitterInput') createSitterInput: CreateSitterInput) {
    return this.sitterService.create(createSitterInput);
  }

  @Query(() => [Sitter], { name: 'sitter' })
  findAll() {
    return this.sitterService.findAll();
  }

  @Query(() => Sitter, { name: 'sitter' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sitterService.findOne(id);
  }

  @Mutation(() => Sitter)
  updateSitter(@Args('updateSitterInput') updateSitterInput: UpdateSitterInput) {
    return this.sitterService.update(updateSitterInput.id, updateSitterInput);
  }

  @Mutation(() => Sitter)
  removeSitter(@Args('id', { type: () => String }) id: string) {
    return this.sitterService.remove(id);
  }
}
