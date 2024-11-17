"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const sitter_entity_1 = require("../../sitter/entities/sitter.entity");
const dog_entity_1 = require("../../dogs/entities/dog.entity");
const appointment_detail_entity_1 = require("../../appointment_details/entities/appointment_detail.entity");
let AppointmentsService = class AppointmentsService {
    constructor(repositoryAppointment, userRepository, sitterRepository, dogRepository, detailRepository) {
        this.repositoryAppointment = repositoryAppointment;
        this.userRepository = userRepository;
        this.sitterRepository = sitterRepository;
        this.dogRepository = dogRepository;
        this.detailRepository = detailRepository;
    }
    calcularHoras(fechaInicio, horaInicio, fechaFin, horaFin) {
        const fechaHoraInicio = this.convertToUTC(fechaInicio, horaInicio);
        const fechaHoraFin = this.convertToUTC(fechaFin, horaFin);
        if (isNaN(fechaHoraInicio.getTime()) || isNaN(fechaHoraFin.getTime())) {
            throw new Error("Las fechas o horas proporcionadas no son válidas.");
        }
        const diferencia = fechaHoraFin.getTime() - fechaHoraInicio.getTime();
        const horasTotales = diferencia / (1000 * 60 * 60);
        return horasTotales;
    }
    convertToUTC(date, timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const utcDate = new Date(date);
        utcDate.setUTCHours(hours, minutes, 0, 0);
        return utcDate;
    }
    async create(createAppointmentInput) {
        let totalHorasAppointment = 0;
        const { entryDate, departureDate, timeIn, timeOut, note, idSitter, idUser, dogsId } = createAppointmentInput;
        try {
            const userFound = await this.userRepository.findOneBy({ id: idUser });
            if (!userFound)
                throw new common_1.BadRequestException('No existe el usuario que se quiere agregar a la cita');
            const sitterFound = await this.sitterRepository.findOneBy({ id: idSitter });
            if (!sitterFound)
                throw new common_1.BadRequestException('No existe el cuidador que se quiere agregar a la cita');
            totalHorasAppointment = (this.calcularHoras(new Date(entryDate), timeIn, new Date(departureDate), timeOut) * sitterFound.fee);
            const timeInSend = this.convertToUTC(new Date(entryDate), timeIn);
            const timeOutSend = this.convertToUTC(new Date(departureDate), timeOut);
            const newAppointment = this.repositoryAppointment.create({
                entryDate: new Date(entryDate),
                departureDate: new Date(departureDate),
                timeIn: timeInSend,
                timeOut: timeOutSend,
                note,
                createdAt: new Date(),
                total: totalHorasAppointment * dogsId.length,
                sitter: sitterFound,
                user: userFound,
            });
            const appointmentSaved = await this.repositoryAppointment.save(newAppointment);
            if (!appointmentSaved)
                throw new common_1.BadRequestException('Hubo un error al guardar la cita');
            await this.saveDogsDetails(dogsId, totalHorasAppointment, appointmentSaved);
            return await this.repositoryAppointment.findOne({
                where: { id: appointmentSaved.id },
                relations: ['sitter', 'user', 'detail', 'detail.dog']
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async saveDogsDetails(dogsId, totalHorasAppointment, appointment) {
        await Promise.all(dogsId.map(async (element) => {
            const dogFound = await this.dogRepository.findOneBy({ id: element });
            if (!dogFound)
                throw new common_1.BadRequestException('No se pudo encontrar la mascota');
            const newAppointmentDetail = this.detailRepository.create({
                price: totalHorasAppointment,
                dog: dogFound,
                appointment: appointment,
            });
            const savedAppointmentDetail = await this.detailRepository.save(newAppointmentDetail);
            if (!savedAppointmentDetail)
                throw new common_1.BadRequestException('Hubo un error al guardar el detalle de la cita');
        }));
    }
    async getAppointmentsByIdUser(idUser) {
        try {
            if (!idUser)
                throw new common_1.BadRequestException('Se requiere el id del usuario');
            const appointmentsFound = this.repositoryAppointment.find({ where: { user: {
                        id: idUser
                    } } });
            if (!appointmentsFound)
                throw new common_1.BadRequestException('Hubo un error al encontrar los appointments');
            return appointmentsFound;
        }
        catch (error) {
            throw error;
        }
    }
    async getAppointmentsByIdSitter(idSitter) {
        try {
            if (!idSitter)
                throw new common_1.BadRequestException('Se requiere el id del usuario');
            const appointmentsFound = this.repositoryAppointment.find({ where: { sitter: {
                        id: idSitter
                    } } });
            if (!appointmentsFound)
                throw new common_1.BadRequestException('Hubo un error al encontrar los appointments');
            return appointmentsFound;
        }
        catch (error) {
            throw error;
        }
    }
    async confirmAppointment(idAppointment) {
        try {
            const response = await this.repositoryAppointment.update({ id: idAppointment }, { status: appointment_entity_1.typeStatus.APPROVED });
            if (!response)
                throw new common_1.BadRequestException('Hubo un error al aceptar la cita');
            return { message: 'La cita se acepto correctamente', status: true };
        }
        catch (error) {
            throw error;
        }
    }
    async cancelAppointment(idAppointment) {
        try {
            const response = await this.repositoryAppointment.update({ id: idAppointment }, { status: appointment_entity_1.typeStatus.CANCELLED });
            if (!response)
                throw new common_1.BadRequestException('Hubo un error al cancelar la cita');
            return { message: 'La cita se cancelo correctamente', status: true };
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        return this.repositoryAppointment.find({ relations: ['user', 'sitter', 'detail'] });
    }
    async findOne(id) {
        try {
            const appointment = await this.repositoryAppointment.findOneBy({ id });
            if (!appointment)
                throw new common_1.BadRequestException('Hubo un error al encontrar el appointment');
            return appointment;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    update(id, updateAppointmentInput) {
        return `This action updates a #${id} appointment`;
    }
    remove(id) {
        return `This action removes a #${id} appointment`;
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(sitter_entity_1.Sitter)),
    __param(3, (0, typeorm_1.InjectRepository)(dog_entity_1.Dog)),
    __param(4, (0, typeorm_1.InjectRepository)(appointment_detail_entity_1.AppointmentDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository, typeorm_2.Repository, typeorm_2.Repository, typeorm_2.Repository])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map