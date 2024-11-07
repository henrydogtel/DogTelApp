import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Credentials } from '../credentials/entities/credential.entity';
import { v2 as cloudinary } from 'cloudinary';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { AuthRepository } from '../auth/auth.repository';
import { SendMailsService } from '../send-mails/send-mails.service';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly credentialRepository: CredentialsRepository,
    private readonly authRepository: AuthRepository,
    private readonly sendMailService: SendMailsService,
  ) { }

  async updateUserImage(id: string, userImg: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.userImg = userImg;
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { credentials: { email } },
      relations: ['credentials'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await this.authRepository.hashPassword(
      createUserInput.password,
    );
    const { firstname, lastname, birthdate, role, address, password, email } =
      createUserInput;

    try {
      const credentials: Credentials = await this.credentialRepository.create({
        password: hashedPassword,
        email,
      });
      if (!credentials)
        throw new BadRequestException(
          'Hubo un error al crear las credenciales',
        );
      const newUser = this.userRepository.create({
        firstname,
        lastname,
        birthdate,
        address,
        role,
        credentials,
      });
      const userSaved = await this.userRepository.save(newUser);
      if (!userSaved)
        throw new BadRequestException('Hubo un error al guardar el usuario');
      const response = await this.sendMailService.sendMail({
        to: userSaved.credentials.email,
        subject: '¡Bienvenido a nuestra comunidad de cuidadores de mascotas!',
        text: '¡Gracias por unirte a nosotros!',
        html: `
            <html>
            <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 800px; margin: auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #4CAF50;">¡Bienvenido a nuestra comunidad!</h1>
                    <img src='https://firebasestorage.googleapis.com/v0/b/dogtel-8ee94.appspot.com/o/marron.png?alt=media&token=55fae421-15ae-453d-bed9-82010c30d8c3' alt="Cuidado de mascotas" style="width: 100%; border-radius: 8px;"/>
                    <p style="font-size: 16px; color: #555;">
                    <strong>${userSaved.firstname}!</strong> Nos alegra que te hayas unido. Aquí encontrarás cuidadores apasionados que se encargarán de tu perro con mucho amor y dedicación. 
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                    </p>
                    <p style="font-size: 16px; color: #555;">¡Esperamos que tu experiencia sea maravillosa!</p>
                    <footer style="margin-top: 20px; font-size: 14px; color: #777;">
                        &copy; 2025 Dogtel
                    </footer>
                </div>
            </body>
            </html>
        `,
      });

      if (!response)
        throw new BadRequestException(
          'Hubo un error al enviar el email de bienvenida',
        );
      return userSaved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['credentials'] });
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


  async removeUser(id: string): Promise<string> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);

    return `User with id: ${id} was removed successfully`;
  }



  // Subida de imágenes
  async uploadProfilePicture(
    userId: string,
    file: Express.Multer.File,
  ): Promise<User> {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname.split('.')[0],
    });

    const user = await this.userRepository.findOne({
      where: { id: String(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.userImg = uploadResult.secure_url;
    await this.userRepository.save(user);

    return user;
  }

  async updateUserStatus(id: string, status: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.status = status as Status; 
    return this.userRepository.save(user); 
  }
  


}
