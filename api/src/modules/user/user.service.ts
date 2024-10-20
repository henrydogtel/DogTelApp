import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { v2 as cloudinary } from 'cloudinary'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

 create(createUserInput: CreateUserInput) {   
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns user #${id}`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates user #${id}`;
  }

  remove(id: number) {
    return `This action removes user #${id}`;
  }

//subida de imagenes
  async uploadProfilePicture(userId:string, file: Express.Multer.File): Promise<User> {
  
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname.split('.')[0],
    });

    const user = await this.userRepository.findOne({ where: { id: (userId)} });
    if (!user) {
      throw new Error('User not found');
    }

    user.userImg = uploadResult.secure_url;
    await this.userRepository.save(user);

    return user;
  }
  
}
