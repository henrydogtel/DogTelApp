import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';

@Resolver(() => Credentials)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Mutation(() => Credentials)
  async createCredential(
    @Args('createCredentialInput') createCredentialInput: CreateCredentialInput,
  ) {
    try {
      return await this.credentialsService.create(createCredentialInput);
    } catch (error) {
      console.error('Error creating credential:', error);
      throw new Error(
        'An error occurred while creating the credential. Please try again.',
      );
    }
  }

  @Query(() => [Credentials], { name: 'credentials' })
  async findAll() {
    try {
      return await this.credentialsService.findAll();
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      throw new Error(
        'An error occurred while retrieving credentials. Please try again.',
      );
    }
  }

  // Uncomment these methods and add try/catch as shown:

  // @Query(() => Credentials, { name: 'credential' })
  // async findOne(@Args('id', { type: () => String }) id: string) {
  //   try {
  //     return await this.credentialsService.findOne(id);
  //   } catch (error) {
  //     console.error(`Error finding credential with ID ${id}:`, error);
  //     throw new Error('An error occurred while finding the credential. Please try again.');
  //   }
  // }

  // @Mutation(() => Credentials)
  // async updateCredential(@Args('updateCredentialInput') updateCredentialInput: UpdateCredentialInput) {
  //   try {
  //     return await this.credentialsService.update(updateCredentialInput.credentialId, updateCredentialInput);
  //   } catch (error) {
  //     console.error(`Error updating credential with ID ${updateCredentialInput.credentialId}:`, error);
  //     throw new Error('An error occurred while updating the credential. Please try again.');
  //   }
  // }

  // @Mutation(() => Credentials)
  // async removeCredential(@Args('id', { type: () => String }) id: string) {
  //   try {
  //     return await this.credentialsService.remove(id);
  //   } catch (error) {
  //     console.error(`Error removing credential with ID ${id}:`, error);
  //     throw new Error('An error occurred while removing the credential. Please try again.');
  //   }
  // }
}
