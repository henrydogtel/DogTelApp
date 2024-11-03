import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private repositoryAppointment: Repository<Appointment>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Sitter) private sitterRepository: Repository<Sitter>,@InjectRepository(Dog) private dogRepository: Repository<Dog>, @InjectRepository(AppointmentDetail) private detailRepository:Repository<AppointmentDetail>) {

  }

  private calcularHoras(
    fechaInicio: Date, 
    horaInicio: Timestamp, 
    fechaFin: Date, 
    horaFin: Timestamp
): number {
    // Combina la fecha con la hora en un formato Date
    const fechaHoraInicio = new Date(`${fechaInicio}T${horaInicio}`);
    const fechaHoraFin = new Date(`${fechaFin}T${horaFin}`);

    // Verifica si las fechas son válidas
    if (isNaN(fechaHoraInicio.getTime()) || isNaN(fechaHoraFin.getTime())) {
        throw new Error("Las fechas o horas proporcionadas no son válidas.");
    }

    // Calcula la diferencia en milisegundos
    const diferencia = fechaHoraFin.getTime() - fechaHoraInicio.getTime();

    // Convierte la diferencia a horas
    const horasTotales = diferencia / (1000 * 60 * 60);

    return horasTotales;
}

  async create(createAppointmentInput: CreateAppointmentInput) {
    let totalAppointment = 0
    let totalHorasAppointment = 0

    const date = new Date();
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
    ];

    const {status,entryDate,departureDate,timeIn,timeOut,total,note,idSitter,idUser, dogsId} = createAppointmentInput

    try {
      const userFound:User = await this.userRepository.findOneBy({id:idUser})
      if(!userFound) throw new BadRequestException('No existe el usuario que se quiere agregar a la cita')
      const sitterFound: Sitter = await this.sitterRepository.findOneBy({id:idUser})
      if(!sitterFound) throw new BadRequestException('No exist el cuidador que se quiere agregar a la cita')

      totalHorasAppointment = this.calcularHoras(entryDate,timeIn,departureDate,timeOut)
      
      
      const transaction = await Promise.all(
        dogsId.map(async (element) => {

          const dogFound:Dog = await this.dogRepository.findOneBy({id:element})
          if(!dogFound) throw new BadRequestException('No se pudo encontrar la masccota')


        }) 
      )
      
      const newAppointment = this.repositoryAppointment.create({
        status,
        entryDate,
        departureDate,
        timeIn,
        timeOut,
        note,
        createdAt: `${month}/${day}/${year}`

        
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
