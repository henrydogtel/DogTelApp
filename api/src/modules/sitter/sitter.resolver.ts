import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SitterService } from './sitter.service';
import { Sitter } from './entities/sitter.entity';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';

@Resolver(() => Sitter)
export class SitterResolver {
  constructor(private readonly sitterService: SitterService) {}

  @Mutation(() => Sitter, { description: 'Crea un nuevo cuidador.' })
  createSitter(@Args('createSitterInput') createSitterInput: CreateSitterInput) {
    return this.sitterService.create(createSitterInput);
  }

  @Query(() => [Sitter], { name: 'sitters', description: 'Obtiene una lista de todos los cuidadores.' })
  findAll() {
    return this.sitterService.findAll();
  }

  @Query(() => Sitter, { name: 'sitter', description: 'Obtiene un cuidador por su ID.' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sitterService.findOne(id);
  }

  @Mutation(() => Sitter, { description: 'Actualiza la información de un cuidador existente.' })
  updateSitter(@Args('updateSitterInput') updateSitterInput: UpdateSitterInput) {
    return this.sitterService.update(updateSitterInput.id, updateSitterInput);
  }

  @Mutation(() => Sitter, { description: 'Elimina un cuidador por su ID.' })
  removeSitter(@Args('id', { type: () => String }) id: string) {
    return this.sitterService.remove(id);
  }
}
