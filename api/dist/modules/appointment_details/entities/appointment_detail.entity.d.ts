import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
export declare class AppointmentDetail {
    id: String;
    price: number;
    dog: Dog;
    appointment: Appointment;
}
