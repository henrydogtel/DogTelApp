import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private repositoryAppointment: Repository<Appointment>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Sitter) private sitterRepository: Repository<Sitter>) {

  }

  async create(createAppointmentInput: CreateAppointmentInput) {
    const {status,entryDate,departureDate,timeIn,timeOut,total,note,idSitter,idUser} = createAppointmentInput

    try {
      const userFound:User = await this.userRepository.findOneBy({id:idUser})
      if(!userFound) throw new BadRequestException('No existe el usuario que se quiere agregar a la cita')
      const sitter: Sitter = await this.sitterRepository.findOneBy({id:idUser})
      if(!sitter) throw new BadRequestException('No exist el cuidador que se quiere agregar a la cita')
      
      const newAppointment = this.repositoryAppointment.create({
        status,
        entryDate,
        departureDate,
        timeIn,
        timeOut,
        
      })


    } catch(error){
      
    }
    
   


    return this.repositoryAppointment.save(createAppointmentInput);
  }

  findAll() {
    return this.repositoryAppointment.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
