import { Person } from 'src/global-entities/person.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Calification } from 'src/modules/califications/entities/calification.entity';
import { Credentials } from 'src/modules/credentials/entities/credential.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';
export declare class User extends Person {
    dogs: Dog[];
    appointments: Appointment[];
    credentials: Credentials;
    califications: Calification[];
}
