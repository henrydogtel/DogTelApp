import { AppointmentDetail } from 'src/modules/appointment_details/entities/appointment_detail.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare enum typeRace {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
export declare class Dog {
    id: string;
    name: string;
    birthdate: Date;
    images?: string[];
    race: string;
    size: typeRace;
    user: User;
    details: AppointmentDetail[];
}
