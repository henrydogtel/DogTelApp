"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const config = {
    type: 'postgres',
    url: 'postgresql://dogteldb_user:3OgvZISZWqWmN7vvzjewpTlsWNJPV4LS@dpg-cschsibtq21c7397beag-a/dogteldb',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}']
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map