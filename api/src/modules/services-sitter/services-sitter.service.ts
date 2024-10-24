import { Injectable } from '@nestjs/common';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';

@Injectable()
export class ServicesSitterService {
  create(createServicesSitterInput: CreateServicesSitterInput) {
    return 'This action adds a new servicesSitter';
  }

  findAll() {
    return `This action returns all servicesSitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicesSitter`;
  }

  update(id: number, updateServicesSitterInput: UpdateServicesSitterInput) {
    return `This action updates a #${id} servicesSitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicesSitter`;
  }
}
