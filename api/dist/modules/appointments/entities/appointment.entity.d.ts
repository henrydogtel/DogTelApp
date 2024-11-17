import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare enum typeStatus {
    PENDING = "pending",
    CANCELLED = "canceled",
    APPROVED = "approved",
    FINISHED = "finished"
}
export declare class Appointment {
    id: string;
    entryDate?: Date;
    departureDate?: Date;
    timeIn?: Date;
    timeOut?: Date;
    status?: typeStatus;
    total?: number;
    note?: string;
    sitter: Sitter;
    user: User;
    detail: AppointmentDetail[];
    createdAt: Date;
}
