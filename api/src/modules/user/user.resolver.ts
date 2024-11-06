import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import {
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

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
      const userSaved: User = await this.userService.create({
        firstname,
        lastname,
        birthdate,
        address,
        role,
        password,
        email,
      });
      if (!userSaved)
        throw new BadRequestException('There was an error creating the user');
      return userSaved;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException(
        error.message || 'An error occurred while creating the user',
      );
    }
  }


  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw new BadRequestException('An error occurred while retrieving users');
    }
  }



  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      console.error(`Error retrieving user with id ${id}:`, error);
      throw new BadRequestException(
        `An error occurred while retrieving the user with id: ${id}`,
      );
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.userService.update(id, updateUserInput);
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw new BadRequestException(
        `An error occurred while updating the user with id: ${id}`,
      );
    }
  }

  @Mutation(() => String)
async removeUser(
  @Args('id', { type: () => String }) id: string,
): Promise<string> {
  try {
    const message = await this.userService.removeUser(id);
    return message; 
  } catch (error) {
    console.error(`Error removing user with id ${id}:`, error);
    throw new BadRequestException(
      `An error occurred while removing the user with id: ${id}`,
    );
  }
}



  @Query(() => User, { name: 'userByEmail' })
  async findOneByEmail(@Args('email', { type: () => String }) email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Mutation(() => User)
  async updateUserImage(
    @Args('id') id: string,
    @Args('userImg') userImg: string,
  ): Promise<User> {
    const userUpdated = await this.userService.updateUserImage(id, userImg);
    return userUpdated;
  }

}
