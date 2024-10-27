import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calification } from './entities/calification.entity';
import { CreateCalificationDto } from './dto/create-calification.input';
import { UpdateCalificationDto } from './dto/update-calification.input';

@Injectable()
export class CalificationsService {
  constructor(
    @InjectRepository(Calification)
    private readonly calificationRepository: Repository<Calification>,
  ) {}

  async create(createCalificationDto: CreateCalificationDto): Promise<Calification> {
    const calification = this.calificationRepository.create(createCalificationDto);
    return this.calificationRepository.save(calification);
  }

  async update(id: string, updateCalificationDto: UpdateCalificationDto): Promise<Calification> {
    const calification = await this.calificationRepository.preload({
      id,
      ...updateCalificationDto,
    });

    if (!calification) {
      throw new NotFoundException(`Calification with id ${id} not found`);
    }

    return this.calificationRepository.save(calification);
  }

  async findAll(): Promise<Calification[]> {
    return this.calificationRepository.find();
  }

  async findOne(id: string): Promise<Calification> {
    const calification = await this.calificationRepository.findOne({ where: { id } });
    if (!calification) throw new NotFoundException(`Calification with id ${id} not found`);
    return calification;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.calificationRepository.delete(id);
    return result.affected > 0;
  }
}
