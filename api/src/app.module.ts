import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ServicesSitterModule } from './modules/services-sitter/services-sitter.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { SitterModule } from './modules/sitter/sitter.module';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { DogsModule } from './modules/dogs/dogs.module';
import { ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { JWT_SECRET, NODE_ENV } from './helpers/developmentEnv';
import { JwtModule } from '@nestjs/jwt';

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
      playground:false,
      plugins: [
        NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
    }),
    TypeOrmModule.forFeature([User]),
    ServicesSitterModule,
    AppointmentsModule,
    UserModule,
    CredentialsModule,
    SitterModule,
    AuthModule,
    DogsModule,
    JwtModule.register({
      global:true,
      secret: JWT_SECRET,
      signOptions:{
        expiresIn:'1h'
      }
    })
  ],
  providers: [UserService],
})
export class AppModule {}
