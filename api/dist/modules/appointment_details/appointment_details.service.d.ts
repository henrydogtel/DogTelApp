import { CreateAppointmentDetailInput } from './dto/create-appointment_detail.input';
import { UpdateAppointmentDetailInput } from './dto/update-appointment_detail.input';
export declare class AppointmentDetailsService {
    create(createAppointmentDetailInput: CreateAppointmentDetailInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAppointmentDetailInput: UpdateAppointmentDetailInput): string;
    remove(id: number): string;
}
