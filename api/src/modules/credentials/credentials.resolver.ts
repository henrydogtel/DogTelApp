import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';


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

  @Mutation(() => Credentials)
  async updateCredential
  ( @Args('userId', { type: () => String }) userId: string,
    @Args('updateCredentialInput') updateCredentialInput: UpdateCredentialInput):Promise<Credentials> {
    return this.credentialsService.update(userId,updateCredentialInput);
  }

  // @Mutation(() => Credentials)
  // removeCredential(@Args('id', { type: () => String }) id: string) {
  //   return this.credentialsService.remove(id);
  // }
}
