import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { ResponseAprobarAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Appointment, typeStatus } from '../entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
import { error } from 'console';
import { SendMailsService } from 'src/modules/send-mails/send-mails.service';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private repositoryAppointment: Repository<Appointment>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Sitter) private sitterRepository: Repository<Sitter>,@InjectRepository(Dog) private dogRepository: Repository<Dog>, @InjectRepository(AppointmentDetail) private detailRepository:Repository<AppointmentDetail>, private mailService: SendMailsService) {

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

private async sendSitterAppointment(mail: string, appointmentSaved: Appointment) {
  try {
    // Extract details from the appointment to be included in the email
    const appointmentDetails = `
      <h2>Appointment Details</h2>
      <p><strong>Appointment ID:</strong> ${appointmentSaved.id}</p>
      <p><strong>Status:</strong> ${appointmentSaved.status}</p>
      <p><strong>Start Date:</strong> ${appointmentSaved.entryDate}</p>
      <p><strong>End Date:</strong> ${appointmentSaved.departureDate}</p>
      <p><strong>Time In:</strong> ${appointmentSaved.timeIn}</p>
      <p><strong>Time Out:</strong> ${appointmentSaved.timeOut}</p>
      <p><strong>Total Cost:</strong> $${appointmentSaved.total}</p>
      <p><strong>Customer Note:</strong> ${appointmentSaved.note || 'No notes provided'}</p>
      <p><strong>Sitter:</strong> ${appointmentSaved.sitter?.firstname}</p>
      <p><strong>Customer:</strong> ${appointmentSaved.user?.firstname} ${appointmentSaved.user?.lastname}</p>
      <p><strong>Payment Status:</strong> ${appointmentSaved.payment ? 'Paid' : 'Not Paid'}</p>
    `;

    // Prepare the message object
    const messageObject = {
      to: mail,
      subject: `Appointment Confirmation: ${appointmentSaved.id}`,
      text: `You have a new appointment scheduled.\n\nAppointment ID: ${appointmentSaved.id}\nStatus: ${appointmentSaved.status}\n\nPlease refer to the details in the HTML body.`,
      html: appointmentDetails, // Sending the HTML formatted appointment details
    };

    // Send the email using the SendMailsService
    const response = await this.mailService.sendMail(messageObject);
    
    if (!response) {
      throw new BadRequestException('There was an error sending the email');
    }

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
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
            total: Math.round(totalHorasAppointment * dogsId.length),
            sitter: sitterFound,
            user: userFound,
        });

        // Primero guardamos la cita para obtener su ID
        const appointmentSaved = await this.repositoryAppointment.save(newAppointment);
        if (!appointmentSaved) throw new BadRequestException('Hubo un error al guardar la cita');

        // Luego guardamos los detalles de la cita
        await this.saveDogsDetails(dogsId, totalHorasAppointment, appointmentSaved);
        const appointmentSavesDb = await this.repositoryAppointment.findOne({
          where: { id: appointmentSaved.id },
          relations: ['sitter', 'user', 'detail', 'detail.dog','sitter.credentials']
      });
      this.sendSitterAppointment(appointmentSavesDb.sitter.credentials.email,appointmentSavesDb) 
        return appointmentSavesDb

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


async getAppointmentsByIdUser(idUser:string):Promise<Appointment[]> {
  try {
    if(!idUser) throw new BadRequestException('Se requiere el id del usuario')
    const appointmentsFound = this.repositoryAppointment.find({where:{user:{
      id:idUser
    }},relations:['sitter','detail','detail.dog']})
    if(!appointmentsFound) throw new BadRequestException('Hubo un error al encontrar los appointments')
    return appointmentsFound
  } catch (error) {
    throw error
  }
}

async getAppointmentsByIdSitter(idSitter:string):Promise<Appointment[]> {
  try {
    if(!idSitter) throw new BadRequestException('Se requiere el id del usuario')
    const appointmentsFound = this.repositoryAppointment.find({where:{sitter:{
      id:idSitter
    }},relations:['user','detail','detail.dog']})
    if(!appointmentsFound) throw new BadRequestException('Hubo un error al encontrar los appointments')
    return appointmentsFound
  } catch (error) {
    throw error
  }
}

async confirmAppointment(idAppointment:string):Promise<ResponseAprobarAppointment> {
  try {
    const response = await this.repositoryAppointment.update({id:idAppointment},{status:typeStatus.APPROVED})
    if(!response) throw new BadRequestException('Hubo un error al aceptar la cita')
    return {message:'La cita se acepto correctamente', status:true}
  } catch (error) {
    throw error
  }
}

async cancelAppointment(idAppointment:string):Promise<ResponseAprobarAppointment> {
  try {
    const response = await this.repositoryAppointment.update({id:idAppointment},{status:typeStatus.CANCELLED})
    if(!response) throw new BadRequestException('Hubo un error al cancelar la cita')
    return {message:'La cita se cancelo correctamente', status:true}
  } catch (error) {
    throw error
  }
}


  findAll() {
    return this.repositoryAppointment.find({relations:['user','sitter','detail']});
  }

  async findOne(id: string) {
    try {
      const appointment = await this.repositoryAppointment.findOneBy({id})
      if(!appointment) throw new BadRequestException('Hubo un error al encontrar el appointment')
      return appointment
    } catch (error) {
      throw new Error(error)
    }
  }

  async appointmentPaidConfirm(idAppointment:string):Promise<String> {
    try {
      const response = await this.repositoryAppointment.update({id:idAppointment},{payment:true})
      if(!response) throw new BadRequestException('Hubo un error confirmando la compra')
      return 'compra exitosa'
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async markAsFinished(idAppointment:string) {
    let rateAdd = 100
    try {
      const appo = await this.repositoryAppointment.findOne({where:{id:idAppointment},relations:['sitter']})
      if(!appo) throw new BadRequestException('Hubo un error al encontrar la ccita')
      const result = await this.repositoryAppointment.update({id:idAppointment},{status:typeStatus.FINISHED})
      if(!result) throw new BadRequestException('hubo un error al marcar el appointment')
      const response = await this.sitterRepository.update({id:appo.sitter.id},{rate:appo.sitter.rate + 100})
    return true
    } catch (error) {
      throw error
    }
  }

}
