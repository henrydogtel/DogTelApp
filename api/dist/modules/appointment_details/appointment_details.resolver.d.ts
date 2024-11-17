import { AppointmentDetailsService } from './appointment_details.service';
import { CreateAppointmentDetailInput } from './dto/create-appointment_detail.input';
import { UpdateAppointmentDetailInput } from './dto/update-appointment_detail.input';
export declare class AppointmentDetailsResolver {
    private readonly appointmentDetailsService;
    constructor(appointmentDetailsService: AppointmentDetailsService);
    createAppointmentDetail(createAppointmentDetailInput: CreateAppointmentDetailInput): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    updateAppointmentDetail(updateAppointmentDetailInput: UpdateAppointmentDetailInput): Promise<string>;
    removeAppointmentDetail(id: number): Promise<string>;
}
