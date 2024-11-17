import { CreateCalificationDto } from './create-calification.input';
declare const UpdateCalificationDto_base: import("@nestjs/common").Type<Partial<CreateCalificationDto>>;
export declare class UpdateCalificationDto extends UpdateCalificationDto_base {
    rate?: number;
    comment?: string;
}
export {};
