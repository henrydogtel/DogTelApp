// src/modules/califications/califications.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CalificationsService } from './califications.service';
import { Calification } from './entities/calification.entity';
import { CreateCalificationDto } from './dto/create-calification.input';
import { UpdateCalificationDto } from './dto/update-calification.input';

@Resolver(() => Calification)
export class CalificationsResolver {
  constructor(private readonly calificationsService: CalificationsService) {}

  @Mutation(() => Calification)
  async createCalification(
    @Args('createCalificationDto') createCalificationDto: CreateCalificationDto,
  ): Promise<Calification> {
    return this.calificationsService.create(createCalificationDto);
  }

  @Mutation(() => Calification)
  async updateCalification(
    @Args('id') id: string,
    @Args('updateCalificationDto') updateCalificationDto: UpdateCalificationDto,
  ): Promise<Calification> {
    return this.calificationsService.update(id, updateCalificationDto);
  }

  @Mutation(() => Boolean)
  async removeCalification(@Args('id') id: string): Promise<boolean> {
    return this.calificationsService.remove(id);
  }

  @Query(() => [Calification])
  async califications(): Promise<Calification[]> {
    return this.calificationsService.findAll();
  }

  @Query(() => Calification)
  async calification(@Args('id') id: string): Promise<Calification> {
    return this.calificationsService.findOne(id);
  }
}
