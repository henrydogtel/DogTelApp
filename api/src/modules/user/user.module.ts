import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { Credentials } from '../credentials/entities/credential.entity';
import { CredentialsService } from '../credentials/credentials.service';
import { CredentialsModule } from '../credentials/credentials.module';
import { AuthModule } from '../auth/auth.module';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials]),
    AuthModule,
    HttpModule,
    MulterModule.register(),
    CredentialsModule,
  ],
  providers: [UserResolver, UserService, CredentialsService],
  exports: [TypeOrmModule], 

})
export class UserModule { }