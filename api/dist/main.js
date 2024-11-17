"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const developmentEnv_1 = require("./helpers/developmentEnv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(developmentEnv_1.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map