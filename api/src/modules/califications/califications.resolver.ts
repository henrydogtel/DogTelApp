import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CalificationsService } from './califications.service';
import { Calification } from './entities/calification.entity';
import { UpdateCalificationDto } from './dto/update-calification.input';
import { CreateCalificationDto } from './dto/create-calification.input';


@Resolver(() => Calification)
export class CalificationsResolver {
  constructor(private readonly calificationsService: CalificationsService) {}

  @Mutation(() => Calification)
  async createCalification(
    @Args('createCalificationDto') createCalificationDto: CreateCalificationDto,
  ): Promise<Calification> {
    return this.calificationsService.createCalification(createCalificationDto);
  }
}