import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';


@Resolver(() => Credentials)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Mutation(() => Credentials)
  createCredential(@Args('createCredentialInput') createCredentialInput: CreateCredentialInput) {
    return this.credentialsService.create(createCredentialInput);
  }

  @Query(() => [Credentials], { name: 'credentials' })
  findAll() {
    return this.credentialsService.findAll();
  }

  // @Query(() => Credentials, { name: 'credential' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.credentialsService.findOne(id);
  // }

  // @Mutation(() => Credentials)
  // updateCredential(@Args('updateCredentialInput') updateCredentialInput: UpdateCredentialInput) {
  //   return this.credentialsService.update(updateCredentialInput.credentialId, updateCredentialInput);
  // }

  // @Mutation(() => Credentials)
  // removeCredential(@Args('id', { type: () => String }) id: string) {
  //   return this.credentialsService.remove(id);
  // }
}
