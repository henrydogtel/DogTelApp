import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
export declare class CreateSitterInput extends CreateUserInput {
    rate: number;
    fee: number;
    descripcion: string;
}
