import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { Sitter } from '../sitter/entities/sitter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Sitter])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
