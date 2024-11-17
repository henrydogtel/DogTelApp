import { ServicesSitter } from 'src/modules/services-sitter/entities/services-sitter.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Person } from 'src/global-entities/person.entity';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Calification } from 'src/modules/califications/entities/calification.entity';
export declare class Sitter extends Person {
    rate: number;
    fee: number;
    descripcion: string;
    services: ServicesSitter[];
    appointments: Appointment[];
    credentials: Credentials;
    califications: Calification[];
}
