import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Credentials } from '../credentials/entities/credential.entity';
import {v2 as cloudinary}from 'cloudinary';
import { CredentialsRepository } from '../credentials/credentials.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly credentialRepository: CredentialsRepository,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
  
    const {firstname,lastname,birthdate,role,address,password,email} = createUserInput

    try {
      const credentials:Credentials = await this.credentialRepository.create({password,email})
      if(!credentials) throw new BadRequestException('Hubo un error al crear las credenciales')
      const newUser = this.userRepository.create({
        firstname,
        lastname,
        birthdate,
        address,
        role,
        credentials
      });
      const userSaved = await this.userRepository.save(newUser);
      if(!userSaved) throw new BadRequestException('Hubo un error al guardar el usuario')
      return userSaved
    } catch (error) {
      throw error
    }

  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Subida de imágenes
  async uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<User> {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname.split('.')[0],
    });

    const user = await this.userRepository.findOne({ where: { id: String(userId) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.userImg = uploadResult.secure_url;
    await this.userRepository.save(user);

    return user;
  }
}