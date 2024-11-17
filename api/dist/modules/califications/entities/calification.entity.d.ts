import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Calification {
    id: string;
    rate: number;
    userId: string;
    sitterId: string;
    comment?: string;
    user: User;
    sitter: Sitter;
}
