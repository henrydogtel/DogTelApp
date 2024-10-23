import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { BadRequestException, ParseUUIDPipe, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuardJwt } from '../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}



  @Mutation(() => User)
  async createUser(
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('birthdate') birthdate: Date,
    @Args('address') address: string,
    @Args('role') role: UserRole | null,
    @Args('password') password: string,
    @Args('email') email: string,
  ): Promise<User> {
    try {
      const userSaved:User = await this.userService.create({firstname,lastname,birthdate,address,role,password,email})
      if(!userSaved) throw new BadRequestException('Hubo un error al crear el usuario')
      return userSaved
    } catch (error) {
      return error
    }

    
  }
  

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id', { type: () => String }) id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string): Promise<void> {
    return this.userService.removeUser(id);
  }

  // subida de imagenes
  @Mutation(() => User)
  // @UseGuards(AuthGuardJwt)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Args('userId', { type: () => String }) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.uploadProfilePicture(userId, file);
  }
}