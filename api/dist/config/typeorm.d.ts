import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    url: string;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    url: string;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
