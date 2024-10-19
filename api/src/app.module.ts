import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesSitterModule } from './modules/services-sitter/services-sitter.module';
import typeorm from 'src/config/typeorm';
import { AppointmentsModule } from './modules/appointments/appointments.module';


// import typeorm from 'config/typeorm';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { SitterModule } from './modules/sitter/sitter.module';
import { UserService } from './modules/user/user.service';
// import typeorm from 'src/config/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    }),
    ServicesSitterModule,AppointmentsModule,
    ServicesSitterModule,
    UserModule,
    CredentialsModule,
    SitterModule,

  ],
  providers: [UserService]

})
export class AppModule { }

