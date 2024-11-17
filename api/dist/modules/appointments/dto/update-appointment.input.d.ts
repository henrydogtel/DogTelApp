import { CreateAppointmentInput } from './create-appointment.input';
declare const UpdateAppointmentInput_base: import("@nestjs/common").Type<Partial<CreateAppointmentInput>>;
export declare class UpdateAppointmentInput extends UpdateAppointmentInput_base {
    id: number;
}
export declare class ResponseAprobarAppointment {
    message: string;
    status: boolean;
}
export {};
