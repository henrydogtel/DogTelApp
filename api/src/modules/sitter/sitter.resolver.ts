import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SitterService } from './sitter.service';
import { Sitter } from './entities/sitter.entity';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';

@Resolver(() => Sitter)
export class SitterResolver {
  constructor(private readonly sitterService: SitterService) {}

  @Mutation(() => Sitter)
  async createSitter(
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('birthdate') birthdate: Date,
    @Args('address') address: string,
    @Args('role') role: UserRole | null,
    @Args('password') password: string,
    @Args('email') email: string,
    @Args('fee') fee: number,
    @Args('descripcion') descripcion: string,
  ): Promise<Sitter> {
    try {
      const sitter = await this.sitterService.create(
        firstname,
        lastname,
        birthdate,
        address,
        role,
        password,
        email,
        fee,
        descripcion
      )

      return sitter;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el sitter');
    }
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
