"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./modules/user/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = __importDefault(require("./config/typeorm"));
const services_sitter_module_1 = require("./modules/services-sitter/services-sitter.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const credentials_module_1 = require("./modules/credentials/credentials.module");
const sitter_module_1 = require("./modules/sitter/sitter.module");
const user_service_1 = require("./modules/user/user.service");
const user_entity_1 = require("./modules/user/entities/user.entity");
const auth_module_1 = require("./modules/auth/auth.module");
const dogs_module_1 = require("./modules/dogs/dogs.module");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const developmentEnv_1 = require("./helpers/developmentEnv");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const send_mails_module_1 = require("./modules/send-mails/send-mails.module");
const send_mails_service_1 = require("./modules/send-mails/send-mails.service");
const appointment_details_module_1 = require("./modules/appointment_details/appointment_details.module");
const califications_module_1 = require("./modules/califications/califications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: developmentEnv_1.EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: developmentEnv_1.EMAIL_USERNAME,
                        pass: developmentEnv_1.EMAIL_PASSWORD,
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: false,
                plugins: [
                    developmentEnv_1.NODE_ENV === 'production'
                        ? (0, default_1.ApolloServerPluginLandingPageProductionDefault)({
                            footer: false,
                        })
                        : (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
                ],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            services_sitter_module_1.ServicesSitterModule,
            appointments_module_1.AppointmentsModule,
            appointment_details_module_1.AppointmentDetailsModule,
            user_module_1.UserModule,
            credentials_module_1.CredentialsModule,
            sitter_module_1.SitterModule,
            auth_module_1.AuthModule,
            dogs_module_1.DogsModule,
            send_mails_module_1.SendMailsModule,
            califications_module_1.CalificationsModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: developmentEnv_1.JWT_SECRET,
                signOptions: {
                    expiresIn: '1h',
                },
            }),
            califications_module_1.CalificationsModule,
        ],
        providers: [user_service_1.UserService, send_mails_service_1.SendMailsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map