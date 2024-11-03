import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calification } from './entities/calification.entity';
import { CreateCalificationDto } from './dto/create-calification.input';
import { Sitter } from '../sitter/entities/sitter.entity';

@Injectable()
export class CalificationsService {
  constructor(
    @InjectRepository(Calification)
    private readonly calificationsRepository: Repository<Calification>,
    @InjectRepository(Sitter)
    private readonly sittersRepository: Repository<Sitter>,
  ) {}

  async createCalification(
    createCalificationDto: CreateCalificationDto,
  ): Promise<Calification> {
    const { sitterId, userId, rate, comment } = createCalificationDto;
    const calification = this.calificationsRepository.create({
      sitter: { id: sitterId },
      user: { id: userId },
      rate,
      comment,
    });

    await this.calificationsRepository.save(calification);
    await this.updateSitterRate(sitterId);
    return calification;
  }

  private async updateSitterRate(sitterId: string) {
    const sitter = await this.sittersRepository.findOne({
      where: { id: sitterId },
      relations: ['califications'],
    });

    if (!sitter) {
      throw new NotFoundException(`Sitter with ID ${sitterId} not found`);
    }

    const totalScore = sitter.califications.reduce(
      (sum, calification) => sum + calification.rate,
      0,
    );
    const rate = totalScore / sitter.califications.length;

    sitter.rate = rate;
    await this.sittersRepository.save(sitter);
  }
}
