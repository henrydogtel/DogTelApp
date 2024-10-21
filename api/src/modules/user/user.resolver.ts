import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ParseUUIDPipe, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuardJwt } from '../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { 
    name: 'createUser', 
    description: 'Crea un nuevo usuario.' 
  })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { 
    name: 'users', 
    description: 'Obtiene una lista de todos los usuarios.' 
  })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { 
    name: 'user', 
    description: 'Obtiene un usuario por su ID.' 
  })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { 
    name: 'updateUser', 
    description: 'Actualiza la información de un usuario existente.' 
  })
  async updateUser(
    @Args('id', { type: () => String }) id: string, 
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User, { 
    name: 'removeUser', 
    description: 'Elimina un usuario por su ID.' 
  })
  async removeUser(@Args('id', { type: () => String }) id: string): Promise<void> {
    return this.userService.removeUser(id);
  }

  // Subida de imágenes
  @Mutation(() => User, { 
    name: 'uploadProfilePicture', 
    description: 'Sube una imagen de perfil para un usuario.' 
  })
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Args('userId', { type: () => String }) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.uploadProfilePicture(userId, file);
  }
}
