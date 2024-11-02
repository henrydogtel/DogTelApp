import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async findAll(): Promise<Sitter[]> {
    try {
      return await this.sitterRepository.find({relations:['services','appointments']});
    } catch (error) {
      throw new BadRequestException('Error al obtener la lista de sitters');
    }
  }


  async findOne(id: string): Promise<Sitter> {
    try {
      const sitter = await this.sitterRepository.findOne({ where: { id }, relations:['services', 'appointments'] });
      if (!sitter) {
        throw new NotFoundException(`Sitter con id ${id} no encontrado`);
      }
      return sitter;
    } catch (error) {
      throw new NotFoundException(`Error al obtener el sitter con id ${id}`);
    }
  }


  async update(id: string, updateSitterInput: Partial<UpdateSitterInput>): Promise<Sitter> {
    const sitter = await this.sitterRepository.findOne({ where: { id } });

    if (!sitter) {
      throw new NotFoundException(`Sitter with ID ${id} not found`);
    }

    Object.assign(sitter, updateSitterInput); 

    return this.sitterRepository.save(sitter);
  }

  async removeSitter(id: string): Promise<boolean> {
    try {
      // Verifica si el sitter existe
      const sitter = await this.findOne(id); // Lanzará NotFoundException si no existe
      if (!sitter) {
        throw new NotFoundException(`Sitter con ID ${id} no encontrado`);
      }
  
      // Elimina el sitter (cambia a la lógica específica de tu aplicación)
      await this.sitterRepository.delete(id); // Usa tu método de eliminación aquí
      return true;
    } catch (error) {
      console.error('Error al eliminar el sitter:', error);
      return false;
    }
  }
}
