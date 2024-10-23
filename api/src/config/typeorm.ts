import { DataSource, DataSourceOptions } from "typeorm";
import { registerAs } from "@nestjs/config";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "src/helpers/developmentEnv";

const config = {
    type: 'postgres',
    url:'postgresql://dogteldb_user:3OgvZISZWqWmN7vvzjewpTlsWNJPV4LS@dpg-cschsibtq21c7397beag-a/dogteldb',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}']
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
