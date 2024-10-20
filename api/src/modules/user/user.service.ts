import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { v2 as cloudinary } from 'cloudinary'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sitter } from '../sitter/entities/sitter.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create(createUserInput: CreateUserInput) {
    return this.userRepository.create(createUserInput);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      await this.userRepository.remove(user);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

//subida de imagenes
  async uploadProfilePicture(userId:string, file: Express.Multer.File): Promise<User> {
  
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname.split('.')[0],
    });

    const user = await this.userRepository.findOne({ where: { id: String(userId)} });
    if (!user) {
      throw new Error('User not found');
    }

    user.userImg = uploadResult.secure_url;
    await this.userRepository.save(user);

    return user;
  }
  
}