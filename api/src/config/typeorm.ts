import { DataSource, DataSourceOptions } from "typeorm";
import { registerAs } from "@nestjs/config";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "src/helpers/developmentEnv";

const config = {
    type: 'postgres',
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}']
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)


    // database: DB_NAME,
    // host: DB_HOST,
    // port: DB_PORT,
    // username: DB_USERNAME,
    // password: DB_PASSWORD,