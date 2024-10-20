import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { CredentialsResolver } from './credentials.resolver';
import { Credentials } from './entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  providers: [CredentialsService, CredentialsRepository, CredentialsResolver],
  exports: [CredentialsService, CredentialsRepository, TypeOrmModule],
})
export class CredentialsModule { }

