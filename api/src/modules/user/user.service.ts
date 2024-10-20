import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Credentials } from '../credentials/entities/credential.entity';
import {v2 as cloudinary}from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const credentials = this.credentialsRepository.create({
      username: createUserInput.credentialsId,
      password: createUserInput.password, 
      passport: createUserInput.passport,
      email: createUserInput.email,
    });

    await this.credentialsRepository.save(credentials);

    
    const newUser = this.userRepository.create({
      firstname: createUserInput.firstname,
      lastname: createUserInput.lastname,
      birthdate: createUserInput.birthdate,
      address: createUserInput.address,
      role: createUserInput.role,
      credentials, 
    });

    return await this.userRepository.save(newUser);
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