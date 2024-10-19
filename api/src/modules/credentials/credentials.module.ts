import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsResolver } from './credentials.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './entities/credential.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Credentials])],
  providers: [CredentialsResolver, CredentialsService],
})
export class CredentialsModule {}
