import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from './entities/sitter.entity';
import { Repository } from 'typeorm';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { Credentials } from '../credentials/entities/credential.entity';
import { AuthService } from '../auth/auth.service';
import { AuthRepository } from '../auth/auth.repository';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class SitterService {
  constructor(@InjectRepository(Sitter) private readonly sitterRepository:Repository<Sitter>, private readonly credentialRepository: CredentialsRepository, private readonly authService: AuthRepository) {}

  async create(
    firstname: string,
    lastname: string,
    birthdate: Date,
    address: string,
    role: UserRole | null,
    password: string,
    email: string,
    fee: number,
    descripcion: string,
  ): Promise<Sitter> {
    const hashedPassword = await this.authService.hashPassword(password);

    try {
      const credentials: Credentials = await this.credentialRepository.create({ password: hashedPassword, email });
      if (!credentials) throw new BadRequestException('Hubo un error al crear las credenciales');

      const newSitter = this.sitterRepository.create({
        firstname,
        lastname,
        birthdate,
        address,
        role,
        credentials,
        fee,
        descripcion,
      });

      const sitterSaved = await this.sitterRepository.save(newSitter);
      if (!sitterSaved) throw new BadRequestException('Hubo un error al guardar el sitter');

      return sitterSaved;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error desconocido');
    }
  }
  findAll() {
    return ;
  }

  findOne(id: string) {
    return ;
  }

  update(id: string, updateSitterInput: UpdateSitterInput) {
    return ;
  }

  remove(id: string) {
    return ;
  }
}
