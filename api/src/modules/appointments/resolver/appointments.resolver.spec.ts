import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from '../service/appointments.service';

describe('AppointmentsResolver', () => {
  let resolver: AppointmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsResolver, AppointmentsService],
    }).compile();

    resolver = module.get<AppointmentsResolver>(AppointmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
