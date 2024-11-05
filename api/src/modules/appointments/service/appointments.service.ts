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
import { error } from 'console';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private repositoryAppointment: Repository<Appointment>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Sitter) private sitterRepository: Repository<Sitter>,@InjectRepository(Dog) private dogRepository: Repository<Dog>, @InjectRepository(AppointmentDetail) private detailRepository:Repository<AppointmentDetail>) {

  }

  private calcularHoras(
    fechaInicio: Date, 
    horaInicio: string, // Cambia Timestamp a string
    fechaFin: Date, 
    horaFin: string // Cambia Timestamp a string
): number {
    // Convierte las horas a UTC y combina con la fecha
    const fechaHoraInicio = this.convertToUTC(fechaInicio, horaInicio);
    const fechaHoraFin = this.convertToUTC(fechaFin, horaFin);

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

convertToUTC(date: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const utcDate = new Date(date);
    
    // Establece la hora en UTC
    utcDate.setUTCHours(hours, minutes, 0, 0);
    return utcDate;
}

async create(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
    let totalHorasAppointment = 0;

    const { entryDate, departureDate, timeIn, timeOut, note, idSitter, idUser, dogsId } = createAppointmentInput;

    try {
        const userFound: User = await this.userRepository.findOneBy({ id: idUser });
        if (!userFound) throw new BadRequestException('No existe el usuario que se quiere agregar a la cita');

        const sitterFound: Sitter = await this.sitterRepository.findOneBy({ id: idSitter });
        if (!sitterFound) throw new BadRequestException('No existe el cuidador que se quiere agregar a la cita');

        totalHorasAppointment = (this.calcularHoras(new Date(entryDate), timeIn, new Date(departureDate), timeOut) * sitterFound.fee);

        const timeInSend = this.convertToUTC(new Date(entryDate), timeIn);
        const timeOutSend = this.convertToUTC(new Date(departureDate), timeOut);

        const newAppointment: Appointment = this.repositoryAppointment.create({
            entryDate: new Date(entryDate),
            departureDate: new Date(departureDate),
            timeIn: timeInSend,
            timeOut: timeOutSend,
            note,
            createdAt: new Date(),
            total: totalHorasAppointment * dogsId.length,
            sitter: sitterFound,
            user: userFound,
        });

        // Primero guardamos la cita para obtener su ID
        const appointmentSaved = await this.repositoryAppointment.save(newAppointment);
        if (!appointmentSaved) throw new BadRequestException('Hubo un error al guardar la cita');

        // Luego guardamos los detalles de la cita
        await this.saveDogsDetails(dogsId, totalHorasAppointment, appointmentSaved);

        return await this.repositoryAppointment.findOne({
            where: { id: appointmentSaved.id },
            relations: ['sitter', 'user', 'detail', 'detail.dog']
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

async saveDogsDetails(dogsId: string[], totalHorasAppointment: number, appointment: Appointment) {
    await Promise.all(dogsId.map(async (element) => {
        const dogFound: Dog = await this.dogRepository.findOneBy({ id: element });
        if (!dogFound) throw new BadRequestException('No se pudo encontrar la mascota');

        const newAppointmentDetail = this.detailRepository.create({
            price: totalHorasAppointment,
            dog: dogFound,
            appointment: appointment, // Aquí asignamos la cita a la que pertenece el detalle
        });

        const savedAppointmentDetail = await this.detailRepository.save(newAppointmentDetail);
        if (!savedAppointmentDetail) throw new BadRequestException('Hubo un error al guardar el detalle de la cita');
    }));
}




  findAll() {
    return this.repositoryAppointment.find({relations:['user','sitter','detail']});
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
