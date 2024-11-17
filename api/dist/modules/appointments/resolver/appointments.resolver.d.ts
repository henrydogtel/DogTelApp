import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { ResponseAprobarAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
export declare class AppointmentsResolver {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    createAppointment(createAppointment: CreateAppointmentInput): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    updateAppointment(updateAppointmentInput: UpdateAppointmentInput): Promise<string>;
    removeAppointment(id: number): Promise<string>;
    getAppointmentsByIdUser(idUser: string): Promise<Appointment[]>;
    getAppointmentsByIdSitter(idSitter: string): Promise<Appointment[]>;
    confirmAppointment(idAppointment: string): Promise<ResponseAprobarAppointment>;
    rejectAppointment(idAppointment: string): Promise<ResponseAprobarAppointment>;
}
