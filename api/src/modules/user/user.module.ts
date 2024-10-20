import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { Credentials } from '../credentials/entities/credential.entity';
import { CredentialsService } from '../credentials/credentials.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials]),HttpModule ,
  MulterModule.register()],
  providers: [UserResolver, UserService, CredentialsService],
})
export class UserModule { }
