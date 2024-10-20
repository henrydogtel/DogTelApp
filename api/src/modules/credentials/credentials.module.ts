import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './entities/credential.entity';
import { CredentialsService } from './credentials.service'; // Asegúrate de que este archivo exista


@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  providers: [CredentialsService], // Asegúrate de que este servicio exista
  exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos puedan usar el repositorio
})
export class CredentialsModule {}