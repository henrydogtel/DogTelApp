import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SitterService } from './sitter.service';
import { Sitter } from './entities/sitter.entity';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';
import { RemoveSitterResponse } from './dto/remove-siterr.input';

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
        descripcion,
      );

      return sitter;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al crear el sitter',
      );
    }
  }

  @Query(() => [Sitter], { name: 'sitters' })
  async findAll(): Promise<Sitter[]> {
    try {
      return await this.sitterService.findAll();
    } catch (error) {
      throw new BadRequestException('Error al obtener la lista de sitters');
    }
  }
  @Query(() => Sitter, { name: 'sitter' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Sitter> {
    try {
      return await this.sitterService.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Error al obtener el sitter con id: ${id}`);
    }
  }

  @Mutation(() => Sitter)
  async updateSitter(
    @Args('updateSitterInput', { type: () => UpdateSitterInput })
    updateSitterInput: Partial<UpdateSitterInput>,
  ): Promise<Sitter> {
    try {
      const { id, ...updateData } = updateSitterInput;
      return await this.sitterService.update(id, updateData);
    } catch (error) {
      console.error('Error updating sitter:', error);
      throw new BadRequestException(
        'An error occurred while updating the sitter',
      );
    }
  }

  @Mutation(() => RemoveSitterResponse)
  async removeSitter(@Args('id') id: string): Promise<RemoveSitterResponse> {
    try {
      const success = await this.sitterService.removeSitter(id);
      return {
        success,
        message: success
          ? 'Sitter successfully deleted'
          : 'Error deleting the sitter',
      };
    } catch (error) {
      console.error(`Error removing sitter with id ${id}:`, error);
      throw new BadRequestException(
        'An error occurred while deleting the sitter',
      );
    }
  }
}
