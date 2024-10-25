import { Module } from '@nestjs/common';
import { SitterService } from './sitter.service';
import { SitterResolver } from './sitter.resolver';
import { Sitter } from './entities/sitter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from '../auth/auth.repository';
import { CredentialsService } from '../credentials/credentials.service';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { AuthModule } from '../auth/auth.module';
import { CredentialsModule } from '../credentials/credentials.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Sitter, User]),AuthModule, CredentialsModule, UserModule],
  providers: [SitterResolver, SitterService, CredentialsService],
})
export class SitterModule {}
