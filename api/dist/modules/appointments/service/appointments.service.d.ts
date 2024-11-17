import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { ResponseAprobarAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
export declare class AppointmentsService {
    private repositoryAppointment;
    private userRepository;
    private sitterRepository;
    private dogRepository;
    private detailRepository;
    constructor(repositoryAppointment: Repository<Appointment>, userRepository: Repository<User>, sitterRepository: Repository<Sitter>, dogRepository: Repository<Dog>, detailRepository: Repository<AppointmentDetail>);
    private calcularHoras;
    convertToUTC(date: Date, timeString: string): Date;
    create(createAppointmentInput: CreateAppointmentInput): Promise<Appointment>;
    saveDogsDetails(dogsId: string[], totalHorasAppointment: number, appointment: Appointment): Promise<void>;
    getAppointmentsByIdUser(idUser: string): Promise<Appointment[]>;
    getAppointmentsByIdSitter(idSitter: string): Promise<Appointment[]>;
    confirmAppointment(idAppointment: string): Promise<ResponseAprobarAppointment>;
    cancelAppointment(idAppointment: string): Promise<ResponseAprobarAppointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    update(id: number, updateAppointmentInput: UpdateAppointmentInput): string;
    remove(id: number): string;
}
