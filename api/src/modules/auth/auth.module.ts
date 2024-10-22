import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { CredentialsModule } from '../credentials/credentials.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [
    CredentialsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),

  ],
  providers: [AuthService, AuthRepository, AuthResolver],
  exports: [AuthService, AuthRepository],
})
export class AuthModule { };